function errorHandler(err, req, res, next) {
    console.log('hello');
    console.log(`Error: ${err.message}`);
    const status = err.status || 500;
    res.status(status).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;