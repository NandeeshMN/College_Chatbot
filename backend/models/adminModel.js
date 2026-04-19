const pool = require('../config/mysql');

// Temporary placeholder for DB layer (will connect MySQL later)

const findAdminByEmail = async (email) => {
    const [rows] = await pool.execute(
        'SELECT * FROM admin WHERE email = ?',
        [email]
    );
    return rows[0];
};

const updateAdminOtp = async (email, otp, otpExpiry) => {
    const [result] = await pool.execute(
        'UPDATE admin SET otp = ?, otp_expiry = ?, otp_attempts = 0, is_otp_verified = 0 WHERE email = ?',
        [otp, otpExpiry, email]
    );
    return result;
};

const incrementOtpAttempts = async (email) => {
    const [result] = await pool.execute(
        'UPDATE admin SET otp_attempts = otp_attempts + 1 WHERE email = ?',
        [email]
    );
    return result;
};

const setOtpVerified = async (email) => {
    const [result] = await pool.execute(
        'UPDATE admin SET is_otp_verified = 1 WHERE email = ?',
        [email]
    );
    return result;
};

const clearOtpData = async (email) => {
    const [result] = await pool.execute(
        'UPDATE admin SET otp = NULL, otp_expiry = NULL, otp_attempts = 0, is_otp_verified = 0 WHERE email = ?',
        [email]
    );
    return result;
};

const updateAdminPassword = async (email, password) => {
    const [result] = await pool.execute(
        'UPDATE admin SET password = ? WHERE email = ?',
        [password, email]
    );
    return result;
};

const findAdminByUsername = async (username) => {
    const [rows] = await pool.execute(
        'SELECT * FROM admin WHERE BINARY username = ?',
        [username]
    );
    return rows[0];
};

const findAdminById = async (id) => {
    const [rows] = await pool.execute(
        'SELECT * FROM admin WHERE admin_id = ?',
        [id]
    );
    return rows[0];
};

module.exports = {
    findAdminById,
    findAdminByUsername,
    findAdminByEmail,
    updateAdminOtp,
    updateAdminPassword,
    incrementOtpAttempts,
    setOtpVerified,
    clearOtpData
};
