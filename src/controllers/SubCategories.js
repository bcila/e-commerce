const SubCategoryService = require('../services/SubCategories');
const subCategoryService = new SubCategoryService();

exports.getSubCategories = async (req, res, next) => {
    try {
        const result = await subCategoryService.getSubCategories();

        if (result.length === 0) {
            return res.status(404).json({
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
        const result = await subCategoryService.getSubCategoryById(id);

        if (result.length === 0) {
            return res.status(404).json({
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
            return res.status(409).json({
                success: false,
                message: 'Sub category already exist',
            });
        }
        const result = await subCategoryService.createSubCategory(name, categoryId);

        console.log(result);
        if (result.insertId) {
            res.status(201).json({
                success: true,
                insertId: result.insertId,
                message: `Sub category '${name}' is created.`,
            });
        } else {
            return res.status(500).json({
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
        const { newname } = req.query;
        console.log(req.query);
        const result = await subCategoryService.updateSubCategory(id, newname);

        if (result.changedRows > 0) {
            res.status(200).json({
                success: true,
                info: result.info,
                message: `New sub category name is '${newname}'`,
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
        const result = await subCategoryService.deleteSubCategory(id);
        if(result.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message:"Sub category is deleted",
            });
        } else {
            return res.status(404).json({
                success: false,
            })
        }
    } catch (error) {
        next(error);
    }
}
