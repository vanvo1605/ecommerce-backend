const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /messages
router.post('/save/:sessionId', async (req, res) => {
  const { user_id, role, message, bot_response } = req.body;
  const { sessionId } = req.params;

  if (!user_id || !role || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      `INSERT INTO chat_messages (user_id, role, message, bot_response, session_id, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [user_id, role, message, bot_response, sessionId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
