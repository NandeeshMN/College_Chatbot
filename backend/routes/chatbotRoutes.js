const express = require('express');
const router = express.Router();
const {
    addData,
    getAllData,
    updateData,
    deleteData,
    getChatbotResponse
} = require('../controllers/chatbotController');

router.post('/add', addData);
router.get('/all', getAllData);
router.put('/update/:id', updateData);
router.delete('/delete/:id', deleteData);
router.post('/ask', getChatbotResponse);

module.exports = router;
