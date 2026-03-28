const express = require('express');
const { submitApplication, getApplications } = require('../controllers/admissionController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', submitApplication);
router.get('/', protect, authorize('admin'), getApplications);

module.exports = router;
