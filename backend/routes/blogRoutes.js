const express = require('express');
const { getBlogs, getBlog, createBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../utils/multer');

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, authorize('admin'), upload.single('image'), createBlog);

router.route('/:id')
    .get(getBlog)
    .delete(protect, authorize('admin'), deleteBlog);

module.exports = router;
