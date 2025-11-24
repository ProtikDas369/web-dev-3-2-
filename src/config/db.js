const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'taskuser',
    password: 'taskpass123',
    database: 'taskdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
