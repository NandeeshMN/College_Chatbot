const express = require('express');
const router = express.Router();
const {
    addData,
    getAllData,
    updateData,
    deleteData,
    getChatbotResponse
} = require('../controllers/chatbotController');

const { adminProtected } = require('../middlewares/adminAuthMiddleware');

router.post('/add', adminProtected, addData);
router.get('/all', adminProtected, getAllData);
router.put('/update/:id', adminProtected, updateData);
router.delete('/delete/:id', adminProtected, deleteData);
router.post('/ask', getChatbotResponse);

module.exports = router;
