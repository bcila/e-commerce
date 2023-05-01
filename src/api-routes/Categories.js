const express = require('express');
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory,
} = require('../controllers/Categories');

const router = express.Router();

// get all categories
router.get('/', getAllCategories);
// get category by id
router.get('/:id', getCategoryById);
// create category
router.post('/', createCategory);
// update category
router.put('/:id', updateCategory);
// delete category
router.delete('/:id', deleteCategory);

module.exports = router;