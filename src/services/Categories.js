const pool = require('../loaders/db');

const getAllCategoriesService = async () => {
    const SQL = `SELECT * FROM Categories`;
    const [rows] =  await pool.query(SQL);
    return rows;
};

const getCategoryByIdService = async (id) => {
    const SQL = `SELECT * FROM Categories WHERE category_id = ?`;
    const [rows] = await pool.query(SQL, [id]);
    return rows;
};

const createCategoryService = async (name) => {
    const SQL = `INSERT INTO Categories (name) VALUES (?)`;
    return await pool.query(SQL, [name]);
};

const updateCategoryService = (id, name) => {
    const SQL = `UPDATE Categories SET name = ? WHERE category_id = ?`;
    return pool.query(SQL, [name, id]);
};

const deleteCategoryService = (id) => {
    const SQL = `DELETE FROM Categories WHERE category_id = ?`;
    return pool.query(SQL, [id]);
};

const getCategoryByNameService = async (name) => {
    const SQL = `SELECT * FROM Categories WHERE name = ?`;
    const [rows] = await pool.query(SQL, [name]);
    return rows;
};

module.exports = {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getCategoryByNameService,
};