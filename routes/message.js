const express = require('express');
const router = express.Router();
const { saveMessage, getMessages } = require('../controllers/messageController');
const authenticateToken = require('../middleware/authMiddleware');

// POST /messages
router.post('/save', authenticateToken, saveMessage);
router.get('/get', authenticateToken, getMessages);

module.exports = router;
