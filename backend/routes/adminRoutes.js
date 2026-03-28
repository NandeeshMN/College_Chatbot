const express = require('express');
const {
    loginAdmin,
    forgotPassword,
    verifyOtp,
    resetPassword
} = require('../controllers/adminController');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
