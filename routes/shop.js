const express = require('express'); // import express

const path = require('path'); // import path

const mainDir = require('../helper/path'); // import the main directory path

const admindata = require('./admin'); // import the admin routes

const user = express.Router();


user.get('/', (req, res, next)=>{ 
   /*  console.log(admindata.products); // log the products array from the admin routes
    res.sendFile(path.join(mainDir, 'views', 'shop.html')); // send a response to the client */
    const products = admindata.products; // get the products array from the admin routes
    res.render('shop', {prods: products, PageTitle:'Shop', path:'/'})// render the shop view
}) 

module.exports = user; // export the router