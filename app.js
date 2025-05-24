const path = require('path'); // import path module
const express = require('express'); // import express
// const routes = require('./routes/admin'); // import the routes
const bodyParser = require('body-parser'); // import body-parser

const sequelize = require('./helper/database'); // import the database connection

const errorController = require('./controllers/error'); // import the controllers

const app = express(); // create an instance of express

app.set('view engine', 'ejs'); // set the view engine to handlebars
app.set('views', 'views'); // set the views directory

const adminRoutes = require('./routes/admin'); // import the admin routes
const ShopRoutes = require('./routes/shop'); // import the shop routes

const Product = require('./models/product'); // import the Product model
const User = require('./models/user'); // import the User model
const Cart = require('./models/cart'); // import the Cart model
const CartItem = require('./models/cart-item'); // import the CartItem model

app.use(bodyParser.urlencoded({extended: false})); // use body-parser middleware to parse the request body

app.use((req, res, next) => { // middleware to set the user object in the request
    User.findByPk(1) // find the user with id 1
        .then(user => { // if user is found
            req.user = user; // set the user object in the request
            next(); // call the next middleware
        })
        .catch(err => console.log(err)); // log the error to the console
}); // end of middleware 

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the public directory

app.use('/admin', adminRoutes); // use the admin routes for any request that starts with /admin
app.use(ShopRoutes); // use the shop routes for any request that starts with /shop

app.use(errorController.getErrorPage); // end of middleware

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'}); 

User.hasMany(Product); // define the relationship between User and Product

User.hasOne(Cart); // define the relationship between User and Cart
Cart.belongsTo(User); // define the relationship between Cart and User
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem}); // define the relationship between Product and Cart through CartItem
 


sequelize
    .sync() // sync the database, force: true will drop the table if it already exists
    .then(
    result => {
        return User.findByPk(1); // find the user with id 1
        // console.log(result);
    })
    .then(user => {
        if (!user) { // if user is not found
            return User.create({name: 'Max', email: 'test@gmail.com'}); // create a new user
        }
        return user; // return the user
    })
    .then(user => {
        //console.log(user); // log the user to the console
        return user.createCart() // create a cart for the user      
    })
    .then(
        cart => {app.listen(2005);}
    )
    .catch(err => { 
    console.log(err);
}
) // sync the database

