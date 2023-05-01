const pool = require('../loaders/db');

const getAllCategoriesService = () => {
    const SQL = `SELECT * FROM categories`;
    return pool.query(SQL);
};

const getCategoryByIdService = (id) => {
    const SQL = `SELECT * FROM categories WHERE id = ?`;
    return pool.query(SQL, [id]);
};

const createCategoryService = (name) => {
    const SQL = `INSERT INTO categories (name) VALUES (?)`;
    return pool.query(SQL, [name]);
};

const updateCategoryService = (id, name) => {
    const SQL = `UPDATE categories SET name = ? WHERE id = ?`;
    return pool.query(SQL, [name, id]);
};

const deleteCategoryService = (id) => {
    const SQL = `DELETE FROM categories WHERE id = ?`;
    return pool.query(SQL, [id]);
};

module.exports = {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
};