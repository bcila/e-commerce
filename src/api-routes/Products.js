const express = require('express');
const productsController = require('../controllers/Products');
const {createCategoryLimiter} = require('../middleware/rateLimiters');
const { uploadImage } = require('../middleware/photoUpload'); 

const router = express.Router();

// get all categories
router.get('/', productsController.getAllProducts);
// get category by id
router.get('/:id', productsController.getProductById);
// create category
router.post('/', createCategoryLimiter, uploadImage, productsController.createProduct);
// update category
router.put('/:id', uploadImage, productsController.updateProduct);
// delete category
router.delete('/:id', productsController.deleteProduct);

module.exports = router; 