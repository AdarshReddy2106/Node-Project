const path = require('path'); // import path module
const mongoose = require('mongoose')
const express = require('express'); // import express
const adminRoutes = require('./routes/admin'); // import the admin routes
const ShopRoutes = require('./routes/shop');   // import the shop routes
const bodyParser = require('body-parser'); // import body-parser

const errorController = require('./controllers/error'); // import the controllers
const User = require('./models/user')

const app = express(); // create an instance of express

app.set('view engine', 'ejs'); // set the view engine to handlebars
app.set('views', 'views'); // set the views directory

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the public directory
app.use(bodyParser.urlencoded({extended: false})); // use body-parser middleware to parse the request body  

app.use((req, res, next) => { // middleware to set the user object in the request
    User.findById('68483cebe0264a7def31542b') // find the user with id 1
        .then(user => { // if user is found
            req.user = user;
            next(); // call the next middleware
        })
        .catch(err => console.log(err)); 
}); // end of middleware 

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the public directory

app.use('/admin', adminRoutes); // use the admin routes for any request that starts with /admin
app.use(ShopRoutes);            // use the shop routes for any request that starts with /shop

app.use(errorController.getErrorPage); // end of middleware


mongoose.connect('mongodb+srv://ADARSH:Adarsh%40100%25@cluster0.6anlhot.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(result=>{
        console.log('Connected to MongoDB');
        User.findOne().then(user=>{
            if (!user) {
                const user = new User({
                name: "Adarsh",
                email: "adarsh@gmail.com",
                cart: {
                    items:[]
                }
            });
            user.save();  
            }
        })

        app.listen(2005) // start the server on port 2005
    })
    .catch(err=>{
        console.log(err)
    })
