const express = require('express');
const { getFaculty, createFaculty, deleteFaculty } = require('../controllers/facultyController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../utils/multer');

const router = express.Router();

router.route('/')
    .get(getFaculty)
    .post(protect, authorize('admin'), upload.single('image'), createFaculty);

router.route('/:id')
    .delete(protect, authorize('admin'), deleteFaculty);

module.exports = router;
