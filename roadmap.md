```json
// Customer 👤
{
    "customer_id ":"int auto increment",
    "first_name":"varchar(70)",
    "last_name":"varchar(50)",
    "email":"varchar(100)",
    "password":"varchar and must be hashed",
    "phone_number":"varchar(50)"
}
```
```json
// Customer_Addresses 🏠
{
    "address_id":"int ai",
    "customer_id":"int",
    "province":"varchar(50)",
    "district":"varchar(70)",
    "address":"varchar(250)"
}
```
```json
// Products 🧅
{
    "product_id":"int ai",
    "name":"varchar(100)",
    "description":"varchar(250)",
    "price":"float",
    "image_url":"varchar(300)",
    "category_id":"int foreign key to Categories table"

}
```
```sql
CREATE TABLE Products (
  product_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  sub_catefory_id INT NOT NULL,
  FOREIGN KEY (sub_category_id) REFERENCES Sub_Categories(sub_category_id)
);

CREATE TABLE Categories (
  category_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Sub_Categories (
    sub_category_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
)

CREATE TABLE Customers (
  customer_id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL
);

CREATE TABLE Customer_Addresses (
    address_id INT NOT NULL PRIMARY KEY,
    province VARCHAR(50) NOT NULL,
    district VARCHAR(70) NOT NULL,
    address TEXT NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
)
------------
CREATE TABLE Orders (
  order_id INT NOT NULL PRIMARY KEY,
  order_date DATETIME NOT NULL,
  order_total DECIMAL(10, 2) NOT NULL,
  customer_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_Items (
  order_item_id INT NOT NULL PRIMARY KEY,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Payments (
  payment_id INT NOT NULL PRIMARY KEY,
  payment_method VARCHAR(255) NOT NULL,
  payment_date DATETIME NOT NULL,
  order_id INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Shipping (
  shipping_id INT NOT NULL PRIMARY KEY,
  shipping_date DATETIME NOT NULL,
  carrier VARCHAR(255) NOT NULL,
  tracking_number VARCHAR(255) NOT NULL,
  order_id INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
```
# 1.05.2023 
Category events,
