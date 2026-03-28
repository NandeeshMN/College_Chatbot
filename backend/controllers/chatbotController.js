const pool = require('../config/mysql');

// ➤ ADD DATA
exports.addData = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    await pool.execute(
      'INSERT INTO chatbot_data (question, answer, category) VALUES (?, ?, ?)',
      [question, answer, category]
    );

    res.json({ success: true, message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ➤ GET ALL DATA
exports.getAllData = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM chatbot_data ORDER BY created_at DESC'
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ➤ UPDATE DATA
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, category } = req.body;

    await pool.execute(
      'UPDATE chatbot_data SET question = ?, answer = ?, category = ? WHERE data_id = ?',
      [question, answer, category, id]
    );

    res.json({ success: true, message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ➤ DELETE DATA
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.execute(
      'DELETE FROM chatbot_data WHERE data_id = ?',
      [id]
    );

    res.json({ success: true, message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ➤ GET CHATBOT RESPONSE
exports.getChatbotResponse = async (req, res) => {
  try {
    const { message } = req.body;

    // Find matching question (simple LIKE search)
    const [rows] = await pool.execute(
      'SELECT * FROM chatbot_data WHERE question LIKE ? LIMIT 1',
      [`%${message}%`]
    );

    let response = "Sorry, I don't understand your question.";
    let matchedId = null;

    if (rows.length > 0) {
      response = rows[0].answer;
      matchedId = rows[0].data_id;
    }

    // Log query
    await pool.execute(
      'INSERT INTO query_log (user_query, response, matched_data_id) VALUES (?, ?, ?)',
      [message, response, matchedId]
    );

    res.json({
      success: true,
      response
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
