const pool = require('../config/mysql');
const { tokenize, calculateScore, mapToIntent, processForDB } = require('../utils/chatbotUtils');

// ➤ ADD DATA
exports.addData = async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    const { tokens, intent_tokens } = processForDB(question);

    await pool.execute(
      'INSERT INTO chatbot_data (question, answer, category, tokens, intent_tokens) VALUES (?, ?, ?, ?, ?)',
      [question, answer, category, tokens, intent_tokens]
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
    const { tokens, intent_tokens } = processForDB(question);

    await pool.execute(
      'UPDATE chatbot_data SET question = ?, answer = ?, category = ?, tokens = ?, intent_tokens = ? WHERE data_id = ?',
      [question, answer, category, tokens, intent_tokens, id]
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

    // Step 1: Tokenize user input natively and by intent
    const userTokensRaw = tokenize(message);
    const userTokensIntent = userTokensRaw.map(t => mapToIntent(t));

    console.log('──────────────────────────────────');
    console.log('📩 User Input:', message);
    console.log('🔤 User Tokens:', userTokensRaw);
    console.log('🎯 Intent Tokens:', userTokensIntent);

    // Step 2: Fetch all chatbot data rows
    const [rows] = await pool.execute('SELECT * FROM chatbot_data');

    let bestMatch = null;
    let highestScore = 0;

    // Step 3: Score each row by token matches
    for (const row of rows) {
      // Fallback: Support old rows that haven't been re-saved yet
      let dbTokensRaw, dbTokensIntent;
      if (row.tokens && row.intent_tokens) {
          dbTokensRaw = JSON.parse(row.tokens);
          dbTokensIntent = JSON.parse(row.intent_tokens);
      } else {
          dbTokensRaw = tokenize(row.question);
          dbTokensIntent = dbTokensRaw.map(t => mapToIntent(t));
      }
      
      const score = calculateScore(userTokensRaw, userTokensIntent, dbTokensRaw, dbTokensIntent);

      if (score > 0) {
          console.log(`   🔑 [ID ${row.data_id}] Tokens: [${dbTokensRaw.join(', ')}] → Score: ${score.toFixed(2)}`);
      }

      // If score is high enough, consider it a match
      if (score > highestScore) {
        highestScore = score;
        bestMatch = row;
      }
    }

    // Step 4: Build response
    let response = "Sorry, I don't understand your question. Please contact administration.";
    let matchedId = null;

    // Notice highestScore > 0 works because valid tokens add >= 0.6 to the total
    if (bestMatch && highestScore > 0) {
      response = bestMatch.answer;
      matchedId = bestMatch.data_id;
      console.log(`✅ Best Match: ID ${matchedId} (Score: ${highestScore.toFixed(2)})`);
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

