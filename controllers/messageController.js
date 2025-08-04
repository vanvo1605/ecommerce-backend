const pool = require("../db");

const saveMessage = async (req, res) => {
    const user_id = req.user.userId; // Extract userId from the authenticated token
    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const { role, message, bot_response } = req.body;

    if (!role || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await pool.query(
        `INSERT INTO chat_messages (user_id, role, message, bot_response, created_at)
         VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
        [user_id, role, message, bot_response]
        );
    
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

const getMessages = async (req, res) => {
    const userId = req.user.userId; // Extract userId from the authenticated token
    try {
        const result = await pool.query(
            'SELECT * FROM chat_messages WHERE user_id = $1 ORDER BY created_at ASC',
            [userId]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = { saveMessage, getMessages };
