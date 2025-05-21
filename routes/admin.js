const express = require('express'); // import express

const path = require('path'); // import path

const router = express.Router(); // create a router instance

const adminController = require('../controllers/admin'); // import the admin controller

// /admin/add-product => GET
router.get('/add-product',adminController.getAddProduct); // use the getAddProduct method from the admin controller)

// /admin/products => GET
router.get('/products' , adminController.getProducts); // use the getProducts method from the admin controller)

// /admin/add-product => POST
router.post('/add-product',adminController.postAddProduct); // use the postAddProduct method from the admin controller)



module.exports = router; // export the router instance