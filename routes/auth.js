const express = require('express'); // import express

const path = require('path'); // import path

const authController = require('../controllers/auth')

const router = express.Router(); // create a router instance

router.get('/login', authController.getLogin)

module.exports = router;

