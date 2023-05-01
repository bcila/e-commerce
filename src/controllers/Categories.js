const {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,
    getCategoryByNameService
} = require('../services/Categories');

// get all categories
const getAllCategories = (req, res) => {
    getAllCategoriesService()
        .then((result) => {
            if (result.length === 0) {
                return res.status(404).send({message: 'No categories found'});
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
            });
        });
};
// get category by id
const getCategoryById = (req, res) => {
    getCategoryByIdService(req.params.id)
        .then((result) => {
            if (result.length === 0) {
                return res.status(404).send({message: `Category not found with id ${req.params.id}`});
            }
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
    let name = req.body.name;

    getCategoryByNameService(name)
        .then((result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: 'Category already exists',
                });
            } else {
                createCategoryService(name)
                    .then((result) => {
                        res.status(200).json({
                            message: 'Category created',
                            result: result,
                        });
                    })
                    .catch((err) => {
                        retun
                    res.status(500).json({
                            message: err.message,
                        });
                    });
            }
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
