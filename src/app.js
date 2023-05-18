const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');
config(); // DO NOT MOVE DOWN

const { CategoriesRoutes, SubCategoriesRoutes, ProductsRoutes } = require('./api-routes');
const { apiLimiter } = require('./middleware/rateLimiters');

// loader();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(apiLimiter);
app.use(errorHandler);

app.listen(process.env.APP_PORT || 8085, () => {
    console.log(`Server running on ${process.env.APP_PORT || 8085}`);
    app.use('/api/categories', CategoriesRoutes);
    app.use('/api/sub-categories', SubCategoriesRoutes);
    app.use('/api/products', ProductsRoutes);
});
