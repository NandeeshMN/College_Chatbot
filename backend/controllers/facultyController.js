const Faculty = require('../models/Faculty');
const cloudinary = require('../config/cloudinary');

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Public
exports.getFaculty = async (req, res, next) => {
    try {
        const faculty = await Faculty.find().sort('order');
        res.status(200).json({ success: true, count: faculty.length, data: faculty });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create new faculty member
// @route   POST /api/faculty
// @access  Private (Admin)
exports.createFaculty = async (req, res, next) => {
    try {
        let result;

        // Upload image to cloudinary
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const faculty = await Faculty.create({
            ...req.body,
            image: result ? result.secure_url : undefined,
            cloudinaryId: result ? result.public_id : undefined
        });

        res.status(201).json({ success: true, data: faculty });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete faculty member
// @route   DELETE /api/faculty/:id
// @access  Private (Admin)
exports.deleteFaculty = async (req, res, next) => {
    try {
        const faculty = await Faculty.findById(req.params.id);

        if (!faculty) {
            return res.status(404).json({ success: false, error: 'Faculty not found' });
        }

        // Delete image from cloudinary
        if (faculty.cloudinaryId) {
            await cloudinary.uploader.destroy(faculty.cloudinaryId);
        }

        await faculty.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
