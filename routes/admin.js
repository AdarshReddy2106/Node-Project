const express = require('express'); // import express
const path = require('path'); // import path
const router = express.Router(); // create a router instance

const mainDir = require('../helper/path'); // import the main directory path

// /admin/add-product => GET
router.get('/add-product', (req, res, next)=>{ 
    console.log('Middleware add product');
    res.sendFile(path.join(mainDir, 'views', 'add-product.html')); // send a response to the client
})

// /admin/add-product => POST
router.post('/add-product', (req, res, next)=>{
    console.log(req.body); // log the request body
    res.redirect('/'); // redirect to the home page
})

module.exports = router; // export the router