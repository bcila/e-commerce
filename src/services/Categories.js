const pool = require('../loaders/db');

class CategoryService {
    constructor() {
        this.pool = pool;
    }

    async getAllCategories() {
        try {
            const SQL = 'SELECT * FROM Categories ORDER BY category_id';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCategoryById(id) {
        try {
            const SQL = 'SELECT * FROM Categories WHERE category_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [id]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCategoryByName(name) {
        try {
            const SQL = 'SELECT * FROM Categories WHERE name = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [name]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createCategory(name) {
        try {
            const SQL = 'INSERT INTO Categories (name) VALUES (?)';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [name]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * 
     * @param {Number} id
     * @param {String} newName
     * @returns
     */
    async updateCategory(id, newName) {
        const SQL = 'UPDATE Categories SET name = ? WHERE category_id = ?';
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(SQL, [newName, id]);
        connection.release();
        return result;
    }

    /**
     * 
     * @param {*} id 
     * @returns 
     */
    async deleteCategory(id) {
        const SQL = 'DELETE FROM Categories WHERE category_id = ?';
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(SQL, [id]);
        connection.release();
        return result;
    }
}

module.exports = CategoryService;
