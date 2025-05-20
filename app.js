const path = require('path'); // import path module
const express = require('express'); // import express
// const routes = require('./routes/admin'); // import the routes
const bodyParser = require('body-parser'); // import body-parser


const app = express(); // create an instance of express

app.set('view engine', 'ejs'); // set the view engine to handlebars
app.set('views', 'views'); // set the views directory

const admindata = require('./routes/admin'); // import the admin routes
const ShopRoutes = require('./routes/shop'); // import the shop routes

app.use(bodyParser.urlencoded({extended: false})); // use body-parser middleware to parse the request body
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the public directory

app.use('/admin', admindata.routes); // use the admin routes for any request that starts with /admin
app.use(ShopRoutes); // use the shop routes for any request that starts with /shop

app.use((req, res, next) => { // middleware to handle 404 errors
    res.status(404).render('error', {
        PageTitle: 'Page Not Found',
        path: req.url // or simply '' if you don't want any menu item active
    });
}); // end of middleware 

app.listen(2005); // start the server on port 2005