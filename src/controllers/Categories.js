const CategoryService = require('../services/Categories');
const categoryService = new CategoryService();

exports.getAllCategories = async (req, res, next) => {
    try {
        const result = await categoryService.getAllCategories();

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

exports.getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await categoryService.getCategoryById(id);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No category found with id ${id}`,
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

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await categoryService.getCategoryByName(name);

        if (category.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Category already exists',
            });
        }
        const result = await categoryService.createCategory(name);
        if (result.insertId) {
            res.status(201).json({
                success: true,
                insertId: result.insertId,
                message: `Category '${name}' is created`,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Category cannot be inserted',
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { newname } = req.query;

        const result = await categoryService.updateCategory(id, newname);

        if (result.changedRows > 0) {
            res.status(200).json({
                success: true,
                info: result.info,
                message: `New category name is '${newname}'`,
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

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await categoryService.deleteCategory(id);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: 'Category is deleted',
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
