/**
 * Normalizes text by converting to lowercase and removing punctuation.
 * @param {string} text 
 * @returns {string}
 */
const normalize = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/[^\w\s]/gi, ' ') // Replace non-word/non-space characters with spaces
        .replace(/\s+/g, ' ')       // Replace multiple spaces with a single space
        .trim();
};

/**
 * Tokenizes text into an array of meaningful words (filtering stopwords).
 * @param {string} text 
 * @returns {string[]}
 */
const tokenize = (text) => {
    const normalized = normalize(text);
    const words = normalized.split(' ');
    
    // Basic stopwords to ignore
    const STOPWORDS = new Set([
        'is', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
        'of', 'with', 'by', 'about', 'can', 'you', 'me', 'my', 'your', 'tell', 
        'show', 'give', 'get', 'what', 'where', 'when', 'who', 'how', 'why'
    ]);

    return words.filter(word => word.length > 0 && !STOPWORDS.has(word));
};

/**
 * Calculates Levenshtein distance between two strings
 * @param {string} a 
 * @param {string} b 
 * @returns {number}
 */
const levenshteinDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1  // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

/**
 * Calculates similarity score (0 to 1) based on Levenshtein distance
 * @param {string} a 
 * @param {string} b 
 * @returns {number}
 */
const stringSimilarity = (a, b) => {
    const maxLength = Math.max(a.length, b.length);
    if (maxLength === 0) return 1.0;
    const distance = levenshteinDistance(a, b);
    return (maxLength - distance) / maxLength;
};

const SYNONYMS = {
    faculty: ["faculty", "staff", "teachers", "professors", "lecturer"],
    fees: ["fees", "fee", "cost", "price", "tuition", "amount"],
    duration: ["duration", "time", "period", "length", "years"],
    placement: ["placement", "job", "career", "salary", "package", "recruiters", "companies"],
    admission: ["admission", "apply", "join", "enroll", "process"]
};

// Create a reverse mapping for O(1) lookups
const INTENT_MAP = {};
for (const [intent, words] of Object.entries(SYNONYMS)) {
    for (const word of words) {
        INTENT_MAP[word] = intent;
    }
}

/**
 * Maps a token to its base intent if a synonym exists.
 * @param {string} token 
 * @returns {string} 
 */
const mapToIntent = (token) => {
    return INTENT_MAP[token] || token;
};

/**
 * Pre-processes a question string into token and intent JSON arrays.
 * @param {string} question 
 */
const processForDB = (question) => {
    const rawTokens = tokenize(question);
    const intentTokens = rawTokens.map(token => mapToIntent(token));
    return {
        tokens: JSON.stringify(rawTokens),
        intent_tokens: JSON.stringify(intentTokens)
    };
};

/**
 * Calculates a matching score based on intents, exact matches, partial, and fuzzy.
 * Uses pre-computed logic arrays to drastically reduce runtime processing overhead.
 * 
 * @param {string[]} userTokensRaw 
 * @param {string[]} userTokensIntent 
 * @param {string[]} dbTokensRaw 
 * @param {string[]} dbTokensIntent 
 * @returns {number}
 */
const calculateScore = (userTokensRaw, userTokensIntent, dbTokensRaw, dbTokensIntent) => {
    if (!userTokensRaw.length || !dbTokensRaw.length) return 0;
    
    let totalScore = 0;
    const SIMILARITY_THRESHOLD = 0.7;

    for (let i = 0; i < userTokensRaw.length; i++) {
        const uTokenRaw = userTokensRaw[i];
        const uTokenIntent = userTokensIntent[i];
        let bestTokenScore = 0;

        for (let j = 0; j < dbTokensRaw.length; j++) {
            const dbTokenRaw = dbTokensRaw[j];
            const dbTokenIntent = dbTokensIntent[j];
            let currentScore = 0;

            // 1. Intent Match -> Highest score (+3)
            if (uTokenIntent === dbTokenIntent && INTENT_MAP[uTokenRaw]) {
                currentScore = 3.0; // Synonym/Intent trigger
            }
            // 2. Exact match -> High score (+2)
            else if (uTokenRaw === dbTokenRaw) {
                currentScore = 2.0;
            } 
            // 3. Partial match -> Medium score (+1.5)
            else if (uTokenRaw.length >= 3 && dbTokenRaw.length >= 3 && (dbTokenRaw.includes(uTokenRaw) || uTokenRaw.includes(dbTokenRaw))) {
                currentScore = 1.5;
            } 
            // 4. Fuzzy match -> Backup score (+1)
            else {
                const sim = stringSimilarity(uTokenRaw, dbTokenRaw);
                if (sim > SIMILARITY_THRESHOLD) {
                    currentScore = 1.0;
                }
            }

            if (currentScore > bestTokenScore) {
                bestTokenScore = currentScore;
            }
        }

        totalScore += bestTokenScore;
    }
    
    return totalScore;
};

/**
 * Normalizes common synonyms for better intent detection.
 */
const normalizeInput = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/\bfree\b/g, "fees")
        .replace(/\bfee\b/g, "fees")
        .replace(/\bcost\b/g, "fees")
        .replace(/\bprice\b/g, "fees");
};

/**
 * Applies spelling corrections based on a list of wrong/correct word pairs.
 * @param {string} text 
 * @param {Array} corrections 
 */
const applySpellingCorrections = (text, corrections) => {
    if (!text || !corrections.length) return text;
    let correctedText = text.toLowerCase();

    corrections.forEach(({ wrong_word, correct_word }) => {
        const regex = new RegExp(`\\b${wrong_word}\\b`, 'gi');
        correctedText = correctedText.replace(regex, correct_word);
    });

    return correctedText;
};

/**
 * Fetches all spelling corrections from the database.
 */
const getSpellingCorrections = async (pool) => {
    const [rows] = await pool.execute('SELECT wrong_word, correct_word FROM spelling_corrections');
    return rows;
};

/**
 * Pre-processes input for structured matching.
 * @param {string} text 
 */
const preprocessInput = (text) => {
    if (!text) return '';
    let processed = normalizeInput(text);
    
    // Remove common conversational noise phrases
    const noiseWords = [
        "can i get",
        "please",
        "information about",
        "details about",
        "tell me",
        "i want to know",
        "can you tell me",
        "do you know",
        "can you",
        "i want",
        "what about",
        "is there",
        "give me",
        "about",
        "the"
    ];

    noiseWords.forEach(word => {
        // Use word boundary to avoid matching parts of larger words
        processed = processed.replace(new RegExp(`\\b${word}\\b`, 'g'), '');
    });
    
    return processed.trim().replace(/\s+/g, " ");
};

/**
 * Detects Intent based on weighted keywords.
 */
const detectIntent = async (pool, text) => {
    const [keywords] = await pool.execute(`
        SELECT ik.keyword, ik.weight, i.id, i.name 
        FROM intent_keywords ik
        JOIN intents i ON ik.intent_id = i.id
    `);

    let scores = {};
    keywords.forEach(ik => {
        if (text.includes(ik.keyword.toLowerCase())) {
            scores[ik.name] = (scores[ik.name] || 0) + ik.weight;
        }
    });

    let bestIntent = null;
    let maxScore = 0;
    for (const [name, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            bestIntent = name;
        }
    }
    return bestIntent;
};

/**
 * Detects Entity based on keywords.
 */
const detectEntity = async (pool, text) => {
    const [keywords] = await pool.execute(`
        SELECT ek.keyword, e.id, e.name 
        FROM entity_keywords ek
        JOIN entities e ON ek.entity_id = e.id
    `);

    for (const ek of keywords) {
        if (text.includes(ek.keyword.toLowerCase())) {
            return ek.name;
        }
    }
    return null;
};

/**
 * Fetches response from priority matrix (Strict Version).
 */
const getStructuredResponse = async (pool, intentName, entityName, input) => {
    // Mandatory Debug Log
    console.log({
        input,
        intent: intentName,
        entity: entityName
    });

    // Ensure entityName is not null for safe parameter binding
    if (!entityName) {
        entityName = "";
    }

    const sql = `
        SELECT r.response
        FROM response_matrix r
        JOIN intents i ON r.intent_id = i.id
        LEFT JOIN entities e ON r.entity_id = e.id
        WHERE i.name = ?
        AND (
             ( ? != '' AND e.name = ? )
             OR
             ( ? = '' AND r.entity_id IS NULL )
        )
        ORDER BY r.priority ASC
        LIMIT 1
    `;
    const [rows] = await pool.execute(sql, [intentName, entityName, entityName, entityName]);
    return rows.length > 0 ? rows[0].response : null;
};

/**
 * Manages user context for entity persistence.
 */
const manageContext = async (pool, sessionId, intentName, entityName) => {
    // If we have a new entity, update it
    if (entityName) {
        await pool.execute(`
            INSERT INTO user_context (session_id, last_intent, last_entity) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE last_intent = ?, last_entity = ?
        `, [sessionId, intentName, entityName, intentName, entityName]);
        return entityName;
    } 
    
    // If no entity in current query, try to get from context
    const [rows] = await pool.execute(`
        SELECT last_entity FROM user_context WHERE session_id = ? LIMIT 1
    `, [sessionId]);
    
    if (rows.length > 0) {
        return rows[0].last_entity;
    }
    
    return null;
};

module.exports = {
    normalize,
    tokenize,
    calculateScore,
    stringSimilarity,
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
};
