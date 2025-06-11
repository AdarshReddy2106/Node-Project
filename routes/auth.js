const express = require('express'); // import express

const path = require('path'); // import path

const authController = require('../controllers/auth')

const router = express.Router(); // create a router instance

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

module.exports = router;

