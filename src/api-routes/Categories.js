const express = require('express');

const categoryController = require('../controllers/Categories');

const { createCategoryLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

// get all categories
router.get('/', categoryController.getAllCategories);
// get category by id
router.get('/:id', categoryController.getCategoryById);
// create category
router.post('/', createCategoryLimiter, categoryController.createCategory);
// update category
router.put('/:id', categoryController.updateCategory);
// delete category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
