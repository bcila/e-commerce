//mysql
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000
});

async function getConnection() {
    await pool.getConnection().then((connection) => {
        console.log('Connected to MySQL');
        console.log('DB:',connection.connection.config.database);
        connection.release();
    }).catch((err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        if (err.code === 'ETIMEDOUT') {
            console.error('ETIMEDOUT, trying again!');
            getConnection();
        }
    })
}
getConnection(); 

module.exports = pool;