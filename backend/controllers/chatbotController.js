const pool = require('../config/mysql');
const { 
    tokenize, 
    calculateScore, 
    mapToIntent, 
    processForDB,
    normalizeInput,
    preprocessInput,
    detectIntent,
    detectEntity,
    getStructuredResponse,
    manageContext,
    applySpellingCorrections,
    getSpellingCorrections 
} = require('../utils/chatbotUtils');

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

// ➤ GET CHATBOT RESPONSE (Intent + Entity + Token Fallback)
exports.getChatbotResponse = async (req, res) => {
  try {
    const { message, sessionId = 'default_session', type, action } = req.body;
    let response = null;
    let matchedId = null;
    let systemUsed = 'none';

    // 0. Quick Reply Handling (Bypass NLP)
    if (type === "quick_reply") {
        const [rows] = await pool.execute(
            `SELECT r.response
             FROM response_matrix r
             JOIN intents i ON r.intent_id = i.id
             WHERE i.name = ?
             AND r.entity_id IS NULL
             LIMIT 1`,
            [action]
        );

        if (rows.length > 0) {
            console.log(`⚡ Quick Reply Triggered: ${action}`);
            return res.json({ 
                success: true, 
                response: rows[0].response,
                system: 'quick_reply'
            });
        }
    }

    console.log('──────────────────────────────────');
    
    // 1. Spelling Correction Preprocessing
    const corrections = await getSpellingCorrections(pool);
    const cleanedInput = applySpellingCorrections(message, corrections);

    // Logging original vs corrected
    console.log({
        original: message,
        corrected: cleanedInput
    });

    // 2. Structured Matching (New Intent + Entity System)
    const cleanText = preprocessInput(cleanedInput);
    const detectedIntent = await detectIntent(pool, cleanText);
    const detectedEntityRaw = await detectEntity(pool, cleanText);
    
    // Manage context for entity persistence (Context-Safe Logic)
    const contextSafeIntents = ["FEES", "ADMISSION", "PLACEMENTS"];
    let entity = detectedEntityRaw;

    // Fetch previous entity from context if current is missing
    const [contextRows] = await pool.execute(
        'SELECT last_entity FROM user_context WHERE session_id = ? LIMIT 1',
        [sessionId]
    );
    const lastEntity = contextRows.length > 0 ? contextRows[0].last_entity : null;

    // Reuse entity only if intent is context-safe
    if (!entity && lastEntity && detectedIntent && contextSafeIntents.includes(detectedIntent.toUpperCase())) {
        entity = lastEntity;
        console.log('🧠 Context Reused:', entity);
    }
    
    // Save current context if we have an intent and entity
    if (detectedIntent && entity) {
        await pool.execute(`
            INSERT INTO user_context (session_id, last_intent, last_entity) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE last_intent = ?, last_entity = ?
        `, [sessionId, detectedIntent, entity, detectedIntent, entity]);
    }

    console.log('🎯 Detected Intent:', detectedIntent);
    console.log('📦 Detected Entity:', entity);

    const fallbackMessage = `I couldn’t find an exact match for your query.

Here are some things I can help you with:
• Admissions Information  
• Courses Offered  
• Fee Structure  
• Placement Details  
• Contact Information  

👉 You can also fill out the enquiry form on our website, and our team will get in touch with you shortly.`;

    const suggestions = [
        "Admissions Info",
        "Courses Offered",
        "Fee Structure",
        "Placements",
        "Contact Us"
    ];

    // 3. Structured Matching logic with Controlled Fallback
    if (detectedIntent) {
        response = await getStructuredResponse(pool, detectedIntent, entity, message);
        
        if (response) {
            systemUsed = 'structured';
            console.log('✅ Structured Match Found');
        } else {
            // Controlled fallback if intent is detected but no response found in matrix
            response = fallbackMessage;
            systemUsed = 'structured-fallback';
            console.log('⚠️ Intent detected but no structured response. Using controlled fallback.');
        }
    } 
    // 4. Token-based Fallback (Old System) - ONLY if no intent was detected
    else {
        const userTokensRaw = tokenize(cleanedInput);
        const userTokensIntent = userTokensRaw.map(t => mapToIntent(t));

        const [rows] = await pool.execute('SELECT * FROM chatbot_data');

        let bestMatch = null;
        let highestScore = 0;

        for (const row of rows) {
            let dbTokensRaw, dbTokensIntent;
            if (row.tokens && row.intent_tokens) {
                dbTokensRaw = JSON.parse(row.tokens);
                dbTokensIntent = JSON.parse(row.intent_tokens);
            } else {
                dbTokensRaw = tokenize(row.question);
                dbTokensIntent = dbTokensRaw.map(t => mapToIntent(t));
            }
            
            const score = calculateScore(userTokensRaw, userTokensIntent, dbTokensRaw, dbTokensIntent);

            if (score > highestScore) {
                highestScore = score;
                bestMatch = row;
            }
        }

        if (bestMatch && highestScore > 0) {
            response = bestMatch.answer;
            matchedId = bestMatch.data_id;
            systemUsed = 'token';
            console.log(`✅ Token Match: ID ${matchedId} (Score: ${highestScore.toFixed(2)})`);
        }
    }

    // 5. Final Fallback & Unanswered Query Logging
    if (!response) {
        response = fallbackMessage;
        systemUsed = 'fallback';
        console.log('❌ No match found. Logging to unanswered_queries.');
        
        // Fix SQL column name and remove extra parameters
        await pool.execute(
            'INSERT INTO unanswered_queries (query) VALUES (?)',
            [message]
        );
    }

    console.log('──────────────────────────────────');

    // 6. Logging to query_log
    await pool.execute(
      'INSERT INTO query_log (user_query, response, matched_data_id) VALUES (?, ?, ?)',
      [message, response, matchedId]
    );

    res.json({
      success: true,
      response,
      intent: detectedIntent,
      entity: entity,
      system: systemUsed,
      suggestions: systemUsed.includes('fallback') ? suggestions : []
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
