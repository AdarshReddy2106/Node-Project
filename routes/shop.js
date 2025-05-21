const express = require('express'); // import express

const path = require('path'); // import path

const productsController = require('../controllers/products'); // import the product controller

const router = express.Router();


router.get('/', productsController.getProducts); // use the getProducts method from the product controller) 

module.exports = router; // export the router