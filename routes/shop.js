const express = require('express'); // import express

const path = require('path'); // import path

const shopController = require('../controllers/shop'); 

const router = express.Router();

const isAuth = require('../middleware/is-auth')

router.get('/', shopController.getIndex); // use the getIndex method from the shop controller

router.get('/products', shopController.getProducts); 

router.get('/products/:productId', shopController.getProduct); 

 router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct); 

router.post('/create-order', isAuth, shopController.postOrders); 

router.get('/orders', isAuth, shopController.getOrders); 

module.exports = router; // export the router