const pool = require('../config/mysql');

// Temporary placeholder for DB layer (will connect MySQL later)

const findAdminByEmail = async (email) => {
    throw new Error("DB not connected yet");
};

const updateAdminOtp = async (email, otp, otpExpiry) => {
    throw new Error("DB not connected yet");
};

const updateAdminPassword = async (email, password) => {
    throw new Error("DB not connected yet");
};

const findAdminByUsername = async (username) => {
    const [rows] = await pool.execute(
        'SELECT * FROM admin WHERE BINARY username = ?',
        [username]
    );
    return rows[0];
};

module.exports = {
    findAdminByUsername,
    findAdminByEmail,
    updateAdminOtp,
    updateAdminPassword
};
