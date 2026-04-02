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
 * Calculates a matching score based on common tokens.
 * @param {string[]} userTokens 
 * @param {string[]} dbTokens 
 * @returns {number}
 */
const calculateScore = (userTokens, dbTokens) => {
    if (!userTokens.length || !dbTokens.length) return 0;
    
    let matches = 0;
    const dbSet = new Set(dbTokens);
    
    for (const token of userTokens) {
        if (dbSet.has(token)) {
            matches++;
        }
    }
    
    return matches;
};

module.exports = {
    normalize,
    tokenize,
    calculateScore
};
