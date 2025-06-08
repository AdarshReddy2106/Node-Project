const express = require('express'); // import express

const path = require('path'); // import path

const router = express.Router(); // create a router instance

const adminController = require('../controllers/admin'); // import the admin controller

// /admin/add-product => GET
router.get('/add-product',adminController.getAddProduct); // use the getAddProduct method from the admin controller)

// /admin/products => GET
// router.get('/products' , adminController.getProducts); 

// /admin/add-product => POST
router.post('/add-product',adminController.postAddProduct); 

// router.post('/edit-product', adminController.postEditProduct); // use the postEditProduct method from the admin controller)

// router.get('/edit-product/:productId', adminController.getEditProduct); // use the getEditProduct method from the admin controller)

// router.post('/delete-product', adminController.postDeleteProduct); 

module.exports = router; // export the router instance