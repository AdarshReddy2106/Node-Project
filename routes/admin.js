const express = require('express'); // import express

const path = require('path'); // import path

const router = express.Router(); // create a router instance

const productsController = require('../controllers/product'); // import the product controller

// /admin/add-product => GET
router.get('/add-product',productsController.getAddProduct); // use the getAddProduct method from the product controller)

// /admin/add-product => POST
router.post('/add-product',productsController.postAddProduct); // use the postAddProduct method from the product controller)

module.exports = router; // export the router instance