const fs = require('fs'); // import the file system module
const path = require('path'); // import the path module
const p = path.join(
        path.dirname(require.main.filename), 
        'data', 
        'cart.json');   // create a path to the products.json file

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }; // create a new cart object
            if (!err) { // if there is no error
                cart = JSON.parse(fileContent); // parse the file content to JSON
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id); // find the index of the product with the given id
            const existingProduct = cart.products[existingProductIndex]; // get the product with the given id
            let updatedProduct; // create a variable to store the updated product
            if (existingProduct) { // if the product exists
                updatedProduct = { ...existingProduct }; // create a copy of the existing product
                updatedProduct.qty = updatedProduct.qty + 1; // increment the quantity of the product
                cart.products = [...cart.products]; // create a new array of products
                cart.products[existingProductIndex] = updatedProduct; // update the product in the array
            } else { // if the product does not exist
                updatedProduct = { id: id, qty: 1 }; // create a new product object with quantity 1
                cart.products = [...cart.products, updatedProduct]; // add the new product to the array of products
            }
            cart.totalPrice = cart.totalPrice + +productPrice; // update the total price of the cart
            fs.writeFile(p, JSON.stringify(cart), err => { // write the updated cart to the file
                console.log(err); // log any errors
            });
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(p, (err, fileContent) => { // read the cart file
            if (err) { // if there is an error
                return; // return
            }
            const updatedCart = { ...JSON.parse(fileContent) }; // parse the file content to JSON and create a copy of the cart
            const product = updatedCart.products.find(prod => prod.id === id); // find the product with the given id
            if (!product) { // if the product does not exist
                return; // return
            }
            const productQty = product.qty; // get the quantity of the product
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id); 
            updatedCart.totalPrice = updatedCart.totalPrice - price * productQty; // update the total price of the cart
            fs.writeFile(p, JSON.stringify(updatedCart), err => { // write the updated cart to the file
                console.log(err); // log any errors
            });
        });
    }
}