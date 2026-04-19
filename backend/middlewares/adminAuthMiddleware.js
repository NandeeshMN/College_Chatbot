const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const adminProtected = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== 'admin') {
                return res.status(403).json({ success: false, message: 'Not authorized as an admin' });
            }

            // Get admin from the MySQL database
            const admin = await Admin.findAdminById(decoded.id);

            if (!admin) {
                return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
            }

            // Exclude password from the request object for security
            const { password, ...adminData } = admin;
            req.admin = adminData;

            next();
        } catch (error) {
            console.error('Admin Auth Error:', error.message);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

module.exports = { adminProtected };
