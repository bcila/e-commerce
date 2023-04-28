const express = require('express');
const config = require('./config');

config(); // DO NOT MOVE DOWN
const pool = require('./loaders/db');

// loader();
const app = express();
app.use(express.json());
app.use('/api', (req, res) => {
    pool.query('SELECT "hello" FROM DUAL');
    res.status(200).json({
        message: 'Welcome to the API',
    });
});
app.listen(process.env.APP_PORT || 8085, () => {
    console.log(`Server running on ${process.env.APP_PORT || 8085}`);
});
