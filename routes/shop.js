const express = require('express'); // import express

const path = require('path'); // import path

const shopController = require('../controllers/shop'); 

const router = express.Router();


router.get('/', shopController.getIndex); // use the getIndex method from the shop controller

router.get('/products', shopController.getProducts); 

router.get('/products/:productId', shopController.getProduct); 

/* router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct); 

router.post('/create-order', shopController.postOrders); 

router.get('/orders', shopController.getOrders);  */ 

module.exports = router; // export the router