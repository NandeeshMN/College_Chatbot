const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { adminProtected: adminAuth } = require('../middlewares/adminAuthMiddleware');
const {
    addAd,
    getAllAds,
    getActiveAd,
    updateAd,
    deleteAd,
    toggleAdStatus
} = require('../controllers/adController');

// ➤ Multer Config for Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'public/uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpg, png, webp) are allowed'));
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ➤ Public Route
router.get('/active', getActiveAd);

// ➤ Advertisement Management Routes (Admin Protected)
router.post('/add', adminAuth, upload.single('image'), addAd);
router.get('/all', adminAuth, getAllAds);
router.put('/update/:id', adminAuth, upload.single('image'), updateAd);
router.delete('/delete/:id', adminAuth, deleteAd);
router.patch('/toggle/:id', adminAuth, toggleAdStatus);

module.exports = router;
