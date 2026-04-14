const express = require('express');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    loginAdmin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    uploadChatbotExcel
} = require('../controllers/adminController');

const router = express.Router();

// Multer Config for Excel upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /xlsx|xls/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Only Excel files (.xlsx, .xls) are allowed'));
    }
});

// Rate limiter for OTP requests (3 requests per 10 minutes)
const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    message: { success: false, message: "Too many OTP requests. Please try again after 10 minutes." }
});

router.post('/login', loginAdmin);
router.post('/forgot-password', otpLimiter, forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Bulk Upload Chatbot Data
router.post('/chatbot/upload', upload.single('file'), uploadChatbotExcel);

module.exports = router;
