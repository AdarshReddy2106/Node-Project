const Product = require('../models/product'); // import the Product model

exports.getAddProduct = (req, res, next)=>{ 
    console.log('Middleware add product');
    res.render('admin/edit-product', {
        PageTitle:'Add Product', 
        path: '/admin/add-product',
        editing: false, // set editing to false to indicate that we are adding a new product
    }) // send a response to the client
}



exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.Description; 
    const price = req.body.price;
    const Product = require('../models/product');
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
};

exports.postEditProduct = (req, res, next) => {
        const product = new Product(
        req.body.productId,
        req.body.title,
        req.body.imageUrl,
        req.body.Description,
        req.body.price
    );
    product.save();
    res.redirect('/admin/products'); // redirect to the admin products page
}

exports.getEditProduct = (req, res, next)=>{ 
    console.log('Middleware add product');
    const editMode = req.query.edit; // get the edit mode from the query string
    if (!editMode) { // if edit mode is not set
        return res.redirect('/'); // redirect to the home page
    }
    const prodId = req.params.productId; // get the product id from the request parameters
    Product.findById(prodId, (product) => { // find the product by id
        if (!product) { // if product is not found
            return res.redirect('/'); // redirect to the home page
        }
    res.render('admin/edit-product', {
        PageTitle:'Edit Product', 
        path: '/admin/edit-product',
        editing: editMode, // set the editing flag to true
        product: product, // pass the product to the view  
    }); // send a response to the client
})}



exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => { // fetch all products from the product model
        res.render('admin/products', {
            prods: products,
            PageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; // get the product id from the request body
    Product.deleteById(prodId); // delete the product by id
    res.redirect('/admin/products'); // redirect to the admin products page
}

