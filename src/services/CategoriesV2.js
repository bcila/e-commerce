const { log } = require('winston');
const pool = require('../loaders/db');

class CategoryService {
    constructor() {
        this.pool = pool;
    }

    async getAllCategories() {
        try {
            const SQL = `SELECT * FROM Categories ORDER BY category_id`;
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error('Categories can not get from DB');
        }
    }

    async getCategoryById(categoryId) {
        try {
            const SQL = 'SELECT * FROM Categories WHERE category_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [categoryId]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error('Can not get category by id');
        }
    }
}

module.exports = CategoryService;
