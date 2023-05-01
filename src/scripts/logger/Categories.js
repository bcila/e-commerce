const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'categories-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/categories/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/categories/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'src/logs/categories/combined.log' }),
    ],
});

module.exports = logger;