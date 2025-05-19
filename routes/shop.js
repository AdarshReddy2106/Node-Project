const express = require('express'); // import express

const path = require('path'); // import path

const mainDir = require('../helper/path'); // import the main directory path

const user = express.Router();


user.get('/', (req, res, next)=>{ 
    // console.log('Middleware');
    res.sendFile(path.join(mainDir, 'views', 'shop.html')); // send a response to the client
})

module.exports = user; // export the router