const express = require('express'); // import express

const path = require('path'); // import path

const shopController = require('../controllers/shop'); 

const router = express.Router();


router.get('/', shopController.getIndex); // use the getIndex method from the shop controller

router.get('/products', shopController.getProducts); // use the getProducts method from the shop controller

router.get('/products/:productId', shopController.getProduct); 

router.get('/cart', shopController.getCart); // use the getCart method from the shop controller

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders); // use the getOrders method from the shop controller

router.get('/checkout', shopController.getCheckout); // use the getCheckout method from the shop controller

module.exports = router; // export the router