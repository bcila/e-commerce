const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {message: 'Too many requests from this IP, please try again after 15 minutes'},
    legacyHeaders: false, // Disable X-RateLimit headers
});

const createCategoryLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: {message: 'Too many category create requests from this IP, please try again after a minute'},
    legacyHeaders: false, // Disable X-RateLimit headers
});

module.exports = {
    apiLimiter,
    createCategoryLimiter,
};