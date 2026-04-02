const pool = require('../config/mysql');
const { tokenize, calculateScore } = require('../utils/chatbotUtils');

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

// ➤ GET CHATBOT RESPONSE (Token-based matching logic)
exports.getChatbotResponse = async (req, res) => {
  try {
    const { message } = req.body;

    // Step 1: Tokenize user input
    const userTokens = tokenize(message);

    console.log('──────────────────────────────────');
    console.log('📩 User Input:', message);
    console.log('🔤 User Tokens:', userTokens);

    // Step 2: Fetch all chatbot data rows
    const [rows] = await pool.execute('SELECT * FROM chatbot_data');

    let bestMatch = null;
    let highestScore = 0;

    // Step 3: Score each row by token matches
    for (const row of rows) {
      // Tokenize the database question
      // This handles both full questions and comma-separated keywords
      const dbTokens = tokenize(row.question);
      
      const score = calculateScore(userTokens, dbTokens);

      if (score > 0) {
          console.log(`   🔑 [ID ${row.data_id}] Tokens: [${dbTokens.join(', ')}] → Score: ${score}`);
      }

      // If score is high enough, consider it a match
      // A threshold of 1 might be enough if tokens are descriptive
      if (score > highestScore) {
        highestScore = score;
        bestMatch = row;
      }
    }

    // Step 4: Build response
    let response = "Sorry, I don't understand your question. Please contact administration.";
    let matchedId = null;

    if (bestMatch && highestScore > 0) {
      response = bestMatch.answer;
      matchedId = bestMatch.data_id;
      console.log(`✅ Best Match: ID ${matchedId} (Score: ${highestScore})`);
    } else {
      console.log('❌ No match found');
    }
    console.log('──────────────────────────────────');

    // Step 5: Log query to query_log table
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

