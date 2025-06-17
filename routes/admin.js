const express = require('express'); // import express

const path = require('path'); // import path

const isAuth = require('../middleware/is-auth')

const router = express.Router(); // create a router instance

const adminController = require('../controllers/admin'); // import the admin controller

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct); // use the getAddProduct method from the admin controller)

// /admin/products => GET
router.get('/products' , isAuth, adminController.getProducts); 

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct); 

router.post('/edit-product', isAuth, adminController.postEditProduct); // use the postEditProduct method from the admin controller)

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct); // use the getEditProduct method from the admin controller)

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router; // export the router instance