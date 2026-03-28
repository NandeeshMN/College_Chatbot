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

            // Get admin from the token
            req.admin = await Admin.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error('Admin Auth Error:', error.message);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

module.exports = { adminProtected };
