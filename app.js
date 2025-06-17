const path = require('path'); // import path module
const mongoose = require('mongoose')
const express = require('express'); // import express
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session) 

const adminRoutes = require('./routes/admin'); // import the admin routes
const ShopRoutes = require('./routes/shop');   // import the shop routes
const authRoutes = require('./routes/auth');   

const bodyParser = require('body-parser'); // import body-parser

const errorController = require('./controllers/error'); // import the controllers
const User = require('./models/user')

MONGODB_URI = 'mongodb+srv://ADARSH:Adarsh%40100%25@cluster0.6anlhot.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'

const app = express(); // create an instance of express
const store =new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs'); // set the view engine to handlebars
app.set('views', 'views'); // set the views directory

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the public directory
app.use(bodyParser.urlencoded({extended: false})); // use body-parser middleware to parse the request body  
app.use(session({
    secret: 'my secret',
    resave: false, 
    saveUninitialized: false,
    store: store,
}))

app.use((req, res, next) => {
    if (!req.session.user) {
        // console.log('No user in session');
        return next(); // if user is not found, go to next middleware
    }
    User.findById(req.session.user._id) // find the user with id 1
        .then(user => { // if user is found
            req.user = user;
            req.session.user = user;
            next();
        })
        .catch(err => console.log(err));  
} )

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the public directory

app.use('/admin', adminRoutes); 
app.use(ShopRoutes);            // use the shop routes for any request that starts with /shop
app.use(authRoutes)

app.use(errorController.getErrorPage); // end of middleware


mongoose.connect(MONGODB_URI)
    .then(result=>{
        console.log('Connected to MongoDB');
        app.listen(2005) // start the server on port 2005
    })
    .catch(err=>{
        console.log(err)
    })
