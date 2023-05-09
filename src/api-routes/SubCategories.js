const express = require('express');

const subCategoriesController = require('../controllers/SubCategories');

const { createCategoryLimiter } = require('../middleware/rateLimiters')

const router = express.Router();

// get all sub categories
router.get('/', subCategoriesController.getSubCategories);
// get sub category by id
router.get('/:id', subCategoriesController.getSubCategoryById);
// create sub category
router.post('/', createCategoryLimiter, subCategoriesController.createSubCategory);
// update sub category
router.put('/', subCategoriesController.updateSubCategory);
// delete sub category
router.delete('/:id', subCategoriesController.deleteSubCategory);

module.exports = router;