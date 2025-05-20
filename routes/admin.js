const express = require('express'); // import express

const path = require('path'); // import path

const router = express.Router(); // create a router instance

const mainDir = require('../helper/path'); // import the main directory path

products = []; // create an empty array for products
// /admin/add-product => GET
router.get('/add-product', (req, res, next)=>{ 
    console.log('Middleware add product');
    res.render('add-product', {
        PageTitle:'Add Product', 
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        ActiveAddProduct: true,
    }) // send a response to the client
})

// /admin/add-product => POST
router.post('/add-product', (req, res, next)=>{
    products.push({ // add a new product to the products array
        title: req.body.title, // get the title from the request body
    });
    res.redirect('/'); // redirect to the home page
})

exports.routes = router; // export the router instance
exports.products = products; // export an empty array for products