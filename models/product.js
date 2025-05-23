const db = require('../helper/database'); // import the database module
const Cart = require('./cart'); // import the cart module


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) { // constructor to create a new product
        this.id = id; // set the id of the product
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description; 
        this.price = price;
    }

    save() {
        return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.imageUrl, this.description]) // execute the SQL query to insert a new product 
    }

    static deleteById(id) { 
    
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products') // execute the SQL query to fetch all products
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]) // execute the SQL query to find a product by id
    }
}