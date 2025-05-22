const path = require('path'); // import the path module
const fs = require('fs'); // import the file system module
const { get } = require('http');

let products = []; // create an empty array to store the products

    const p = path.join(
        path.dirname(require.main.filename), 
        'data', 
        'products.json'); // create a path to the products.json file

const getProductsFromFile = cb =>{
    fs.readFile(p, (err, fileContent) => { // read the products.json file
        if (err) { // if there is an error
            return cb([]); // return an empty array
        }
        cb(JSON.parse(fileContent)); // parse the file content to JSON and return it
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) { // constructor to create a new product
        this.id = id; // set the id of the product
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description; 
        this.price = price;
    }

    save() {
        
        getProductsFromFile(products => { // get the products from the file
            if (this.id) { // if the product has an id
                const existingProductIndex = products.findIndex(prod => prod.id === this.id); // find the index of the existing product
                if (existingProductIndex >= 0) {
                    const updatedProducts = [...products]; // create a copy of the products array
                    updatedProducts[existingProductIndex] = this; // update the existing product with the new product
                    fs.writeFile(p, JSON.stringify(updatedProducts), err => { // write the updated products array to the file
                        console.log(err); // log any errors
                    });
                } else {
                    // If not found, treat as new product
                    this.id = Math.random().toString(); // generate a random id for the product
                    products.push(this); // add the new product to the products array
                    fs.writeFile(p, JSON.stringify(products), err => { // write the products array to the file
                        console.log(err); // log any errors
                    });
                }
            }   
            else { // if the product does not have an id
                this.id = Math.random().toString(); // generate a random id for the product
                products.push(this); // add the new product to the products array
                fs.writeFile(p, JSON.stringify(products), err => { // write the products array to the file
                    console.log(err); // log any errors
                });
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb); // static method to fetch all products
    }

    static findById(id, cb) { // static method to find a product by id
        getProductsFromFile(products => { // get the products from the file
            const product = products.find(p => p.id === id); // find the product with the given id
            cb(product); // return the product
        });
    }
}