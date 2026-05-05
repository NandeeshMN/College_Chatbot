const mysql = require('mysql2/promise');
require('dotenv').config();

// Debug logs (Temporary)
console.log("DB USER:", process.env.DB_USER);
console.log("DB PASSWORD:", process.env.DB_PASSWORD);

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'college_chatbot',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;
