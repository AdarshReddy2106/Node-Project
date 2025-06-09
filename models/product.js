const mongodb = require('mongodb'); // import mongodb module
const getDb = require('../helper/database').getDb

class Product {
    constructor(title, price, imageUrl, description, id, userId) {
        this.title = title; // set the title of the product
        this.price = price; // set the price of the product
        this.imageUrl = imageUrl; // set the image URL of the product
        this.description = description; // set the description of the product
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId
    }

    save() {
        const db = getDb(); // get the database connection
        let dbOp; // variable to hold the database operation
        if (this._id) {
            //Update the product if it already exists
            dbOp = db.collection('products').updateOne(
                {_id: this._id}, // find the product by id
                {$set: this} // update the product with the new data
            ); 

        } else {
            dbOp = db.collection('products').insertOne(this); // insert the product into the products collection
        }
        
        return dbOp
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

    static findById(prodId) {
        const db =getDb();
        return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}) // find the product by id
            .next() // get the next document in the cursor
            .then(product => {
                console.log(product); // return the product with the given id
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('deleted Product');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product; // export the product model