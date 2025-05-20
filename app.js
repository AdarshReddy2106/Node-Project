const path = require('path'); // import path module
const express = require('express'); // import express
// const routes = require('./routes/admin'); // import the routes
const bodyParser = require('body-parser'); // import body-parser
const expressHbs = require('express-handlebars'); // import express-handlebars

const app = express(); // create an instance of express

app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts', 
    defaultLayout: 'mainlayout', 
    extname: 'hbs'})); // set up handlebars as the view engine
app.set('view engine', 'hbs'); // set the view engine to handlebars
app.set('views', 'views'); // set the views directory

const admindata = require('./routes/admin'); // import the admin routes
const ShopRoutes = require('./routes/shop'); // import the shop routes

app.use(bodyParser.urlencoded({extended: false})); // use body-parser middleware to parse the request body
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the public directory

app.use('/admin', admindata.routes); // use the admin routes for any request that starts with /admin
app.use(ShopRoutes); // use the shop routes for any request that starts with /shop

app.use((req, res, next) => { // middleware to handle 404 errors
    // res.status(404).sendFile(path.join(__dirname, 'views','error.html')); // send a 404 response
    res.render('error', {PageTitle:'Page Not Found'}); // render the error view
}); // end of middleware 

app.listen(2005); // start the server on port 2005 