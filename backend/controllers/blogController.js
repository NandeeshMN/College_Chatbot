const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name');

        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private (Admin)
exports.createBlog = async (req, res, next) => {
    try {
        let result;

        // Upload image to cloudinary
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const blog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: result ? result.secure_url : undefined,
            cloudinaryId: result ? result.public_id : undefined,
            author: req.user.id
        });

        res.status(201).json({ success: true, data: blog });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }

        // Delete image from cloudinary
        if (blog.cloudinaryId) {
            await cloudinary.uploader.destroy(blog.cloudinaryId);
        }

        await blog.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
