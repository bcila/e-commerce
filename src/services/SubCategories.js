const pool = require('../loaders/db');

class SubCategoryService {
    constructor() {
        this.pool = pool;
    }

    async getSubCategories() {
        try {
            const SQL = 'SELECT * FROM Sub_Categories ORDER BY sub_category_id';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getSubCategoryById(id) {
        try {
            const SQL =
                'SELECT * FROM Sub_Categories WHERE sub_category_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [id]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async getSubCategoryByName(name){
        try {
            const SQL = "SELECT * FROM Sub_Categories WHERE name = ?";
            const connection=await this.pool.getConnection();
            const [rows]= await connection.query(SQL,[name]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createSubCategory(name, category_id) {
        try {
            const SQL =
                'INSERT INTO Sub_Categories (name,category_id) VALUES (?,?)';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [name, category_id]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async updateSubCategory(id, newName) {
        console.log('asd',newName);
        try {
            const SQL =
                'UPDATE Sub_Categories SET name = ? WHERE sub_category_id= ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [newName, id]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteSubCategory(id) {
        try {
            const SQL = 'DELETE FROM Sub_Categories WHERE sub_category_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [id]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = SubCategoryService;
