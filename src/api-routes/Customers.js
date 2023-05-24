const express = require('express');

const customerController = require('../controllers/Customers');

const { createControllerLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

// get all categories
router.get('/', customerController.getAllCustomers);
// get category by id
router.get('/:id', customerController.getCustomerById);
// create category
router.post('/', createControllerLimiter, customerController.createCustomer);
// update category
router.put('/:id', customerController.updateCustomer);
// delete category
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
