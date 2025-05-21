const products = []; // Initialize an empty array to store products

module.exports = class Product {
    constructor(t) {
        this.title = t; // set the title property to the value of t

    }

    save() {
        products.push(this); // add the current product instance to the products array
    }

    static fetchAll() {
        return products; // return the products array
    }
}