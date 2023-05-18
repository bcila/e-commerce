const { log } = require('console');
const ProductsService = require('../services/Products');
const productsService = new ProductsService();

exports.getAllProducts = async (req, res, next) => {
    try {
        const result = await productsService.getAllProducts();

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

        const result = await productsService.getProductById(id);

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
    //BCila Adamdır Düzeltir
    try {
        const {
            name,
            description,
            price,
            image_url,
            category_id,
            sub_category_id,
        } = req.body;
        let uploadedImage = req.files.image
        let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;
        console.log(req.files);
        const product = await productsService.getProductByIdByName(name);

        if (product.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Product already exists',
            });
        } 
        // const result = await productsService.createProduct(
        //     name,
        //     description,
        //     price,
        //     image_url,
        //     category_id,
        //     sub_category_id
        // );
        // if (result.insertId) {
        //     res.status(201).json({
        //         success: true,
        //         insertId: result.insertId,
        //         message: `Product '${name}' is created`,
        //     });
        // } else {
        //     return res.status(500).json({
        //         success: false,
        //         message: 'Product cannot be inserted',
        //     });
        // }
        res.status(200).json(req.files)
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    //Bcila Adamdır Düzeltir
    try {
        const { product_id } = req.params;
        const {
            name,
            description,
            price,
            image_url,
            category_id,
            sub_category_id,
        } = req.query;

        const result = await productsService.updateProduct(
            product_id,
            name,
            description,
            price,
            image_url,
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

        const result = await productsService.deleteProduct(product_id);
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
