const SubCategoryService = require('../services/SubCategories');
const subCategoryService = new SubCategoryService();

exports.getSubCategories = async (req, res, next) => {
    try {
        const result = await subCategoryService.getSubCategories();

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No Sub Categories found',
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

exports.getSubCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = subCategoryService.getSubCategoryById(id);

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No Sub Category found',
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
exports.createSubCategory = async (req, res, next) => {
    try {
        const { name, categoryId } = req.body;

        const subCategory = await subCategoryService.getSubCategoryByName(name);
        if (subCategory.length > 0) {
            res.status(409).json({
                success: false,
                message: 'Sub category already exist',
            });
        }
        const result = subCategoryService.createSubCategory(name, categoryId);

        if (result.insertId) {
            res.status(201).json({
                success: true,
                insertId: result.insertId,
                message: `Sub category '${name}' is created.`,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Sub category cannot be inserted'
            })
        }
    } catch (error) {
        next(error);
    }
};

exports.updateSubCategory = async (req, res, next) => {
    try {
        // localhost:8000/subcategories/15?new-name=telefon
        const { id } = req.params;
        const { newName } = req.query['new-name'];
        const result = subCategoryService.updateSubCategory(id, newName);

        if (result.changedRows > 0) {
            res.status(200).json({
                success: true,
                info: result.info,
                message: `New sub category name is '${newName}'`,
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

exports.deleteSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = subCategoryService.deleteSubCategory(id);
        if(result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message:"Sub category is deleted",
            });
        }
    } catch (error) {
        next(error);
    }
}
