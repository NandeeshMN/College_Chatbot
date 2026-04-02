const express = require('express');
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

router.post('/login', loginAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Bulk Upload Chatbot Data
router.post('/chatbot/upload', upload.single('file'), uploadChatbotExcel);

module.exports = router;
