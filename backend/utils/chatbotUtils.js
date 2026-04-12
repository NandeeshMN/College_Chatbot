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

module.exports = {
    normalize,
    tokenize,
    calculateScore,
    stringSimilarity,
    mapToIntent,
    processForDB
};
