const express = require('express');
const productsController = require('../controllers/Products');

const router = express.Router();

// get all categories
router.get('/', productsController.getAllProducts);
// get category by id
router.get('/:id', productsController.getProductById);
// create category
router.post('/', productsController.createProduct);
// update category
router.put('/:id', productsController.updateProduct);
// delete category
router.delete('/:id', productsController.deleteProduct);
