const getDb = require('../helper/database').getDb

class Product {
    constructor(title, price, imageUrl, description) {
        this.title = title; // set the title of the product
        this.price = price; // set the price of the product
        this.imageUrl = imageUrl; // set the image URL of the product
        this.description = description; // set the description of the product
    }

    save() {
        const db = getDb(); // get the database connection
        return db.collection('products').insertOne(this)
            .then(result => {
                console.log(result); // return the result of the insert operation
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db =getDb(); // get the database connection
        return db.collection('products').find().toArray()
            .then(products => {
                console.log(products); // return all products from the database
                return products;
            })
            .catch(err => {
                console.log(err); 
            });
    }
}

module.exports = Product; // export the product model