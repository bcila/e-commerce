const pool = require('../loaders/db');

class ProductsService {
    constructor() {
        this.pool = pool;
    }

    async getAllProducts() {
        try {
            const SQL = 'SELECT * FROM Products';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            const SQL = 'SELECT * FROM Products WHERE product_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [id]);
            connection.release();
            return rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductByName(name) {
        try {
            const SQL = 'SELECT * FROM Products WHERE name = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [name]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct(
        name,
        description,
        price,
        image_url,
        category_id,
        sub_category_id
    ) {
        try {
            const SQL =
                'INSERT INTO Products (name,description,price,image_url,category_id,sub_category_id) VALUES (?,?,?,?,?,?)';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [
                name,
                description,
                price,
                image_url,
                category_id,
                sub_category_id,
            ]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProduct(
        product_id,
        name,
        description,
        price,
        image_url,
        category_id,
        sub_category_id
    ) {
        try {
            const SQL =
                'UPDATE Products SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?, sub_category_id = ? WHERE product_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [
                name,
                description,
                price,
                image_url,
                category_id,
                sub_category_id,
                product_id
            ]);
            connection.release();
            return rows;
        } catch (error) {}
    }

    async deleteProduct(product_id) {
        try {
            const SQL = 'DELETE FROM Products WHERE product_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [product_id]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getOldImageUrl(id) {
        try {
            const SQL =
                'SELECT image_url FROM Products WHERE product_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [id]);
            connection.release();
            return rows[0].image_url;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
module.exports = ProductsService;
