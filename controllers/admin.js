const Product = require('../models/product'); // import the Product model

exports.getAddProduct = (req, res, next)=>{ 
    console.log('Middleware add product');
    res.render('admin/add-product', {
        PageTitle:'Add Product', 
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        ActiveAddProduct: true,
    }) // send a response to the client
}



exports.postAddProduct = (req, res, next)=>{
    /* products.push({ // add a new product to the products array
        title: req.body.title, // get the title from the request body
    }); */
    const title = req.body.title; // get the title from the request body
    const imageUrl = req.body.imageUrl; 
    const description = req.body.Description; 
    const price = req.body.price; 
    const product = new Product(title, imageUrl, description, price); // create a new product instance
    product.save(); // save the product instance to the products array
    res.redirect('/'); // redirect to the home page
}   


exports.getProducts = (req, res, next)=>{
    Product.fetchAll((products)=>{ // fetch all products from the product model
        res.render('admin/products', {
        prods: products, 
        PageTitle:'Admin Products', 
        path:'/admin/products', 
})
});
}