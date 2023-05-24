const CustomerService = require('../services/Customers');
const customerService = new CustomerService();
const bcrypt = require('bcrypt');

exports.getAllCustomers = async (req, res, next) => {
    try {
        const result = await customerService.getAllCustomers();

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No customers found',
            });
        }
        res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
exports.getCustomerById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await customerService.getCustomerById(id);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No customer found with id ${id}`,
            });
        }
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
//düzenlenecek (password vs gibi)
exports.createCustomer = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, phone_number } =
            req.body;
        const customer = await customerService.getCustomerByEmail(email);

        if (customer.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Customer already exists',
            });
        }

        const password_hash = bcrypt.hashSync('dummy', 10);

        const result = await customerService.createCustomer(
            first_name,
            last_name,
            email,
            password_hash,
            phone_number
        );
        if (result.insertId) {
            res.status(201).json({
                success: true,
                insertId: result.insertId,
                message: `Customer '${first_name} ${last_name}' is created`,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Customer cannot be insterted',
            });
        }
    } catch (error) {
        next(error);
    }
};
// düzenlenecek
exports.updateCustomer = async (req, res, next) => {
    try {
        const password_hash = bcrypt.hashSync('dummy', 10);
        const { id } = req.params;
        const { first_name, last_name, email, password, phone_number } =
            req.body;

        const result = await customerService.updateCustomer(
            id,
            first_name,
            last_name,
            email,
            password_hash,
            phone_number
        );
        if (result.affectedRows > 0) {
            if (result.changedRows > 0) {
                res.status(200).json({
                    success: true,
                    info: result.info,
                    message: `Updated customer '${first_name} ${last_name}'`,
                });
            } else {
                return res.status(304).json({
                    success: false,
                    info: result.info,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await customerService.deleteCustomer(customer_id);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: 'Customer is deleted',
            });
        } else {
            return res.status(404).json({
                success: false,
            });
        }
    } catch (error) {
        next(error);
    }
};

function generatePasswordHash (password) {
    bcrypt.genSalt(12, (err, salt) => {
        if (err) return(err);
        bcrypt.hash(password, salt,(err, hash) => {
            if (err) return(err);
            return hash;
        })
    })
}