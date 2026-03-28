const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root@1234',
    database: 'college_chatbot',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;
