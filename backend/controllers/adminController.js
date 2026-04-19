const {
    findAdminByUsername,
    findAdminByEmail,
    updateAdminOtp,
    updateAdminPassword,
    incrementOtpAttempts,
    setOtpVerified,
    clearOtpData
} = require('../models/adminModel');
const { sendOtpEmail } = require('../services/emailService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const xlsx = require('xlsx');
const pool = require('../config/mysql');
const path = require('path');
const fs = require('fs');
const { processForDB } = require('../utils/chatbotUtils');
// Optional helper for JWT
const generateToken = (id) => {
    return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.loginAdmin = async (req, res) => {
    try {
        const emailInput = req.body.email?.trim().toLowerCase();
        const password = req.body.password?.trim();

        // Basic validation
        if (!emailInput || !password) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const admin = await findAdminByEmail(emailInput);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Secure password check using bcrypt
        const isMatch = await bcrypt.compare(password, admin.password.trim());
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(admin.admin_id);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                id: admin.admin_id,
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

        if (!email || typeof email !== 'string') {
            return res.status(200).json({ success: true, message: 'If this email is registered, OTP has been sent' });
        }

        const emailLower = email.trim().toLowerCase();
        const admin = await findAdminByEmail(emailLower);
        
        // Generic response even if not found
        if (!admin) {
            return res.status(200).json({ success: true, message: 'If this email is registered, OTP has been sent' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Expiry in 5 minutes (user requested 5m)
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await updateAdminOtp(emailLower, otp, otpExpiry);

        // Send OTP via email using Brevo
        try {
            await sendOtpEmail(emailLower, otp);
        } catch (emailError) {
            console.error("Brevo Email error:", emailError);
            // We still return success to the UX but log the error
        }

        res.status(200).json({ success: true, message: 'If this email is registered, OTP has been sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

exports.verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Invalid input' });
        }

        const emailLower = email.trim().toLowerCase();
        const admin = await findAdminByEmail(emailLower);

        if (!admin || !admin.otp) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        // Check attempts
        if (admin.otp_attempts >= 5) {
            return res.status(400).json({ success: false, message: 'Too many attempts. Please request a new OTP.' });
        }

        // Check expiry
        if (new Date() > new Date(admin.otp_expiry)) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        // Verify match
        if (admin.otp !== otp) {
            await incrementOtpAttempts(emailLower);
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Success - mark as verified
        await setOtpVerified(emailLower);

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
        }

        const emailLower = email.trim().toLowerCase();
        const admin = await findAdminByEmail(emailLower);

        if (!admin || admin.is_otp_verified !== 1) {
            return res.status(403).json({ success: false, message: 'Identity not verified' });
        }

        // Hash and Update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateAdminPassword(emailLower, hashedPassword);

        // Clear OTP data
        await clearOtpData(emailLower);

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
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



