const { log } = require('console');
const ProductService = require('../services/Products');
const productService = new ProductService();
const fs = require('fs');

exports.getAllProducts = async (req, res, next) => {
    try {
        const result = await productService.getAllProducts();

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No categories found',
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

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await productService.getProductById(id);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No product found with id ${id}`,
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
exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category_id, sub_category_id } =
            req.body;

        const image_url = req.file.filename;

        const product = await productService.getProductByName(name);

        if (product.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Product already exists',
            });
        }
        const result = await productService.createProduct(
            name,
            description,
            price,
            image_url,
            category_id,
            sub_category_id
        );
        if (result.insertId) {
            res.status(201).json({
                success: true,
                insertId: result.insertId,
                message: `Product '${name}' is created`,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Product cannot be inserted',
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    const imagePath = 'src/public/uploads/';
    let updateImg = false;

    try {
        const { id } = req.params;
        let { name, description, price, category_id, sub_category_id } =
            req.body;

        const product = await productService.getProductById(id);
        if (product.length === 0) {
            return;
        }

        if (req.file) {
            updateImg = true;
        }

        const new_image_url = updateImg ? req.file.filename : product.image_url;

        if (updateImg) {
            const old_image_url = await productService.getOldImageUrl(id);
            if (old_image_url) {
                fs.unlink(imagePath + product.image_url, (err) => {
                    if (err) {
                        next(err);
                    } else {
                        console.log('Old image deleted');
                    }
                });
            }
        }

        if (!name) {
            name = product.name;
        }
        if (!description) {
            description = product.description;
        }
        if (!price) {
            price = product.price;
        }
        if (!category_id) {
            category_id = product.category_id;
        }
        if (!sub_category_id) {
            sub_category_id = product.sub_category_id;
        }

        const result = await productService.updateProduct(
            id,
            name,
            description,
            price,
            new_image_url,
            category_id,
            sub_category_id
        );

        if (result.changedRows > 0) {
            res.status(200).json({
                success: true,
                info: result.info,
                message: `New product name is '${name}'`,
            });
        } else {
            return res.status(304).json({
                success: false,
                info: result.info,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { product_id } = req.params;

        const result = await productService.deleteProduct(product_id);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: 'Product is deleted',
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
