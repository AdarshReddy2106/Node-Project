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
    constructor(t) {
        this.title = t; // set the title property to the value of t

    }

    save() {
        getProductsFromFile(products => { // get the products from the file
            products.push(this); // add the new product to the products array
            fs.writeFile(p, JSON.stringify(products), (err) => { // write the products array to the file
                console.log(err); // log any errors
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb); // static method to fetch all products
    }
}