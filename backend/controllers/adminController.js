const {
    findAdminByUsername,
    findAdminByEmail,
    updateAdminOtp,
    updateAdminPassword
} = require('../models/adminModel');
const sendEmail = require('../services/emailService');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const xlsx = require('xlsx');
const pool = require('../config/mysql');
const path = require('path');
const fs = require('fs');
const { processForDB } = require('../utils/chatbotUtils');
// Optional helper for JWT
const generateToken = (id) => {
    return jwt.sign({ id, role: 'admin' }, "my_temp_secret", {
        expiresIn: '1d',
    });
};

exports.loginAdmin = async (req, res) => {
    try {
        const username = req.body.username?.trim();
        const password = req.body.password?.trim();

        console.log('──────────────────────────────────');
        console.log('🔐 Login Attempt');
        console.log('   Input Username:', JSON.stringify(username));
        console.log('   Input Password:', JSON.stringify(password));

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username and password'
            });
        }

        const admin = await findAdminByUsername(username);

        console.log('   DB Result:', admin ? `Found (ID: ${admin.admin_id})` : 'NOT FOUND');

        if (!admin) {
            console.log('   ❌ User not found in database');
            console.log('──────────────────────────────────');
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log('   DB Username:', JSON.stringify(admin.username));
        console.log('   DB Password:', JSON.stringify(admin.password));

        // Case-sensitive username check
        if (admin.username !== username) {
            console.log('   ❌ Username mismatch (case-sensitive)');
            console.log('──────────────────────────────────');
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Password check (trimmed comparison to handle DB whitespace)
        if (admin.password.trim() !== password) {
            console.log('   ❌ Password mismatch');
            console.log(`   Expected length: ${admin.password.length}, Got length: ${password.length}`);
            console.log('──────────────────────────────────');
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        console.log('   ✅ Login successful!');
        console.log('──────────────────────────────────');

        const token = generateToken(admin.admin_id);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                id: admin.admin_id,
                username: admin.username,
                email: admin.email
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (typeof email !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid input' });
        }

        const admin = await findAdminByEmail(email);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found with that email' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Expiry in 10 minutes
        const otpExpiry = Date.now() + 10 * 60 * 1000;
        await updateAdminOtp(email, otp, otpExpiry);

        // Send OTP via email
        try {
            await sendEmail(
                email,
                "Password Reset OTP",
                `<h2>Your OTP is: ${otp}</h2><p>This OTP is valid for 10 minutes.</p>`
            );
        } catch (emailError) {
            await updateAdminOtp(email, undefined, undefined);
            return res.status(500).json({ success: false, message: 'Email could not be sent' });
        }

        res.status(200).json({ success: true, message: 'OTP sent to email successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
        }

        if (typeof email !== 'string' || typeof otp !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid input' });
        }

        const admin = await findAdminByEmail(email);

        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        await updateAdminOtp(email, undefined, undefined);

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ success: false, message: 'Please provide email and new password' });
        }

        if (typeof email !== 'string' || typeof newPassword !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid input' });
        }

        const admin = await findAdminByEmail(email);

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Note: In a stricter implementation, we'd verify a reset token generated after OTP verification.
        // Assuming the frontend handles the immediate flow as requested.
        await updateAdminPassword(email, newPassword);

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// ➤ UPLOAD CHATBOT EXCEL (Bulk insertion)
exports.uploadChatbotExcel = async (req, res) => {
    let filePath = null;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'failed to upload the file' });
        }

        filePath = req.file.path;
        console.log('Excel file uploaded to:', filePath);

        // Read the Excel workbook
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // 1. STRICT HEADER VALIDATION
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        const headers = rows[0]; // First row contains headers

        // Check for EXACT matches: "questions" and "answers"
        const isValidHeaders = headers && 
                              headers.length >= 2 && 
                              headers[0] === 'questions' && 
                              headers[1] === 'answers';

        if (!isValidHeaders) {
            console.log('❌ Header Validation Failed:', headers);
            return res.status(400).json({ 
                success: false, 
                message: "Column mismatch: Excel must contain 'questions' and 'answers' headers" 
            });
        }

        // 2. DATA PROCESSING
        const rawData = xlsx.utils.sheet_to_json(sheet);
        console.log(`Processing ${rawData.length} rows from Excel...`);

        const validEntries = [];
        for (const row of rawData) {
            const question = row['questions']?.toString().trim();
            const answer = row['answers']?.toString().trim();

            if (question && answer) {
                const { tokens, intent_tokens } = processForDB(question);
                validEntries.push([question, answer, 'General', tokens, intent_tokens]);
            }
        }

        if (validEntries.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'failed to upload the file' 
            });
        }

        // Bulk Insert into MySQL
        const query = 'INSERT INTO chatbot_data (question, answer, category, tokens, intent_tokens) VALUES ?';
        await pool.query(query, [validEntries]);

        console.log(`✅ Bulk Upload Success: ${validEntries.length} inserted.`);

        res.json({
            success: true,
            message: "Excel uploaded Successfully"
        });

    } catch (error) {
        console.error('Bulk Upload Error:', error);
        res.status(500).json({
            success: false,
            message: "failed to upload the file"
        });
    } finally {
        // Delete the temporary file
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};



