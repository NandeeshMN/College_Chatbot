const Admission = require('../models/Admission');

// @desc    Submit admission application
// @route   POST /api/admissions
// @access  Public
exports.submitApplication = async (req, res, next) => {
    try {
        const admission = await Admission.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: admission
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all applications
// @route   GET /api/admissions
// @access  Private (Admin)
exports.getApplications = async (req, res, next) => {
    try {
        const applications = await Admission.find().sort('-createdAt');
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
