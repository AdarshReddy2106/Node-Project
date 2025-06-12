const Product = require('../models/product'); // import the Product model


exports.getAddProduct = (req, res, next)=>{ 
    console.log('Middleware add product');
    res.render('admin/edit-product', {
        PageTitle:'Add Product', 
        path: '/admin/add-product',
        editing: false, // set editing to false to indicate that we are adding a new product
        isAuthenticated : req.session.isLoggedIn
    }) // send a response to the client
}



exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description; 
    const price = req.body.price;
    const product = new Product({
        title: title,  
        price: price , 
        imageUrl: imageUrl, 
        description: description,
        userId : req.user
        }); // create a new product instance
    product 
        .save()
        .then(result => {
            console.log(result);
            console.log('Created Product'); 
            res.redirect('/admin/products'); // redirect to the admin products page
        })
        .catch(err => {
            console.log(err); // log the error to the console
        }) 
};

exports.getEditProduct = (req, res, next)=>{ 
    console.log('Middleware add product');
    const editMode = req.query.edit; // get the edit mode from the query string
    if (!editMode) { // if edit mode is not set
        return res.redirect('/'); // redirect to the home page
    }
    const prodId = req.params.productId; // get the product id from the request parameters
    Product.findById(prodId)
        .then(product=> { // find the product by id
        if (!product) { // if product is not found
            return res.redirect('/'); // redirect to the home page
        }
        res.render('admin/edit-product', {
        PageTitle:'Edit Product', 
        path: '/admin/edit-product',
        editing: editMode, // set the editing flag to true
        product: product, // pass the product to the view  
        isAuthenticated : req.session.isLoggedIn
    }); // send a response to the client
})
        .catch(err => console.log(err)); // find the product by id
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId; // get the product id from the request body
    const updatedTitle = req.body.title; // get the updated title from the request body
    const updatedImageUrl = req.body.imageUrl; // get the updated image url from the request body
    const updatedPrice = req.body.price; // get the updated price from the request body
    const updatedDescription = req.body.description; // get the updated description from the request body
    
    Product.findById(prodId)
        .then(product=>{
            product.title = updatedTitle
            product.imageUrl = updatedImageUrl
            product.price = updatedPrice
            product.description = updatedDescription
            return product.save()
            }) 
            .then(result => {
                console.log('Updated Product'); // log the updated product to the console
                res.redirect('/admin/products'); // redirect to the admin products page
            })
            .catch(err => console.log(err)); // log any errors to the console
}





exports.getProducts = (req, res, next) => {
    Product.find()
        // .populate('userId')
        .then(products=> { // fetch all products from the product model
                console.log(products)
            res.render('admin/products', {
            prods: products,
            PageTitle: 'Admin Products',
            path: '/admin/products',
            isAuthenticated : req.session.isLoggedIn
        });
    })
        .catch(err => console.log(err)); // log any errors to the console
};


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; // get the product id from the request body
    Product.findByIdAndDelete(prodId)
        .then(() => {
        console.log('Deleted Product'); // log the deleted product to the console
        res.redirect('/admin/products');
    })
        .catch(err => console.log(err)); // log any errors to the console
}

