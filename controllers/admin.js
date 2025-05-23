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
    const description = req.body.description; 
    const price = req.body.price;
    const Product = require('../models/product');
    req.user.createProduct({ 
        title: title, // create a new product with the given title
        price: price, // set the price of the product
        imageUrl: imageUrl, // set the image url of the product
        description: description // set the description of the product
    })
    .then(result => {
        //console.log(result);
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
    req.user.getProducts({where: {id: prodId}}) // get the products for the user with the given id
    // Product.findByPk(prodId)
        .then(products=> { // find the product by id
        const product = products[0]; // get the first product from the array of products
        if (!product) { // if product is not found
            return res.redirect('/'); // redirect to the home page
        }
        res.render('admin/edit-product', {
        PageTitle:'Edit Product', 
        path: '/admin/edit-product',
        editing: editMode, // set the editing flag to true
        product: product, // pass the product to the view  
    }); // send a response to the client
})
        .catch(err => console.log(err)); // find the product by id
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId; // get the product id from the request body
    const updatedTitle = req.body.title; // get the updated title from the request body
    const updatedImageUrl = req.body.imageUrl; // get the updated image url from the request body
    const updatedDescription = req.body.description; // get the updated description from the request body
    const updatedPrice = req.body.price; // get the updated price from the request body
    Product.findByPk(prodId) // find the product by id
        .then(product => { // if product is found
        product.title = updatedTitle; // update the title
        product.imageUrl = updatedImageUrl; // update the image url
        product.description = updatedDescription; // update the description
        product.price = updatedPrice; // update the price
        return product.save(); // save the updated product
    })
        .then(result => {
            console.log('Updated Product'); // log the updated product to the console
            res.redirect('/admin/products'); // redirect to the admin products page
        })
        .catch(err => console.log(err)); // log any errors to the console
}





exports.getProducts = (req, res, next) => {
    req.user.getProducts() // get the products for the user
        .then(products=> { // fetch all products from the product model
            res.render('admin/products', {
            prods: products,
            PageTitle: 'Admin Products',
            path: '/admin/products',
        });
    })
        .catch(err => console.log(err)); // log any errors to the console
};


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; // get the product id from the request body
    Product.findByPk(prodId) // find the product by id
        .then(product => { // if product is found
        return product.destroy(); // destroy the product
    })
        .then(result => {
        console.log('Deleted Product'); // log the deleted product to the console
        res.redirect('/admin/products');
    })
        .catch(err => console.log(err)); // log any errors to the console
}

