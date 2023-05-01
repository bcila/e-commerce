const express = require('express');
const config = require('./config');
config(); // DO NOT MOVE DOWN

const { CategoriesRoutes } = require('./api-routes');

// loader();
const app = express();
app.use(express.json());

app.listen(process.env.APP_PORT || 8085, () => {
    console.log(`Server running on ${process.env.APP_PORT || 8085}`);
    app.use('/api/categories', CategoriesRoutes);
});
