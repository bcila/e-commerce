const pool = require('../loaders/db');
const { ROLES } = require('../utils/constants');
class UserService {
    constructor() {
        this.pool = pool;
    }
    async getRole() {
        return this.role;
    }
}

class AdminService extends UserService {
    constructor() {
        super();
        this.role = ROLES.ADMIN;
    }
}

class ModeratorService extends UserService {
    constructor() {
        super();
        this.role = ROLES.MODERATOR;
    }
}

class CustomerService extends UserService {
    constructor() {
        super();
        this.role = ROLES.CUSTOMER;
    }
    async getAllCustomers() {
        try {
            const SQL = 'SELECT * FROM Customers';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCustomerById(id) {
        try {
            const SQL = 'SELECT * FROM Customers WHERE customer_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [id]);
            connection.release();
            return rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCustomerByEmail(email) {
        try {
            const SQL = 'SELECT * FROM Customers WHERE email = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [email]);
            connection.release();
            return rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createCustomer(first_name, last_name, email, password, phone_number) {
        try {
            const SQL =
                'INSERT INTO Customers (first_name,last_name,email,password,phone_number) VALUES (?,?,?,?,?)';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [
                first_name,
                last_name,
                email,
                password,
                phone_number,
            ]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateCustomer(
        customer_id,
        first_name,
        last_name,
        email,
        password,
        phone_number
    ) {
        try {
            const SQL =
                'UPDATE Customers SET first_name = ?,last_name = ?,email = ?,password = ?,phone_number = ? WHERE customer_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [
                first_name,
                last_name,
                email,
                password,
                phone_number,
                customer_id,
            ]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteCustomer(customer_id) {
        try {
            const SQL = 'DELETE FROM Customers WHERE customer_id = ?';
            const connection = await this.pool.getConnection();
            const [rows] = await connection.query(SQL, [customer_id]);
            connection.release();
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
module.exports = {
    AdminService,
    ModeratorService,
    CustomerService,
};
