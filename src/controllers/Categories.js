const {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,
} = require('../services/Categories');

// get all categories
const getAllCategories = (req, res) => {
    getAllCategoriesService()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
};
// get category by id
const getCategoryById = (req, res) => {
    getCategoryByIdService(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
};
// create category
const createCategory = (req, res) => {
    createCategoryService(req.body.name)
        .then((result) => {
            res.status(200).json({
                message: 'Category created',
                result: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
};
// update category
const updateCategory = (req, res) => {
    updateCategoryService(req.params.id, req.body.name)
        .then((result) => {
            res.status(200).json({
                message: 'Category updated',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
};
// delete category
const deleteCategory = (req, res) => {
    deleteCategoryService(req.params.id)
        .then((result) => {
            res.status(200).json({
                message: 'Category deleted',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
