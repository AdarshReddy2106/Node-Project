const Product = require('../models/product'); // import the Product model


exports.getProducts = (req, res, next)=>{ 
    Product.fetchAll()
        .then(
            products=> {
                res.render('shop/product-list', {
                prods: products, 
                PageTitle:'All Products', 
                path:'/products', 
                })// render the shop view
            })
    .catch(err => console.log(err));
}

exports.getProduct = (req, res, next)=>{
    const prodId = req.params.productId; // <-- Add this line
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                PageTitle: product.title,
                path: '/products',
            });
        })
        .catch(err => console.log(err));
}


exports.getIndex = (req, res, next)=>{
    Product.fetchAll()
        .then(
            products=> {
                res.render('shop/index', {
                    prods: products, // pass the products to the view
                    PageTitle:'Shop', // set the page title to All Products
                    path:'/', // set the path to /
            }
        )})
        .catch(err => console.log(err));
}


exports.getCart = ( req, res, next)=>{
    req.user
    .getCart()
    .then(products =>{
        
        res.render('shop/cart', {
        path:'/cart',
        PageTitle:'Your Cart',
        products: products,
        })  
})
    .catch(err => console.log(err));
}

exports.postCart = ( req, res, next)=>{
    const prodId = req.body.productId; // get the product id from the request body
    Product.findById(prodId).then(product=>{
        req.user.addToCart(product);
        res.redirect('/cart');
    }).then(result=>{
        console.log(result)
    })
    // let fetchedCart; // variable to hold the fetched cart
    // let newQuantity = 1; // set the new quantity to 1
    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchedCart = cart; // assign the fetched cart to the variable
    //         return cart.getProducts({ where: { id: prodId } }); // get the products in the cart

    //     })
    //     .then(products => {
    //         let product; // declare a variable to hold the product

    //         if (products.length > 0) { // if the product is already in the cart
    //             product = products[0]; // get the first product
    //         }
            
    //         if (product) { // if the product is already in the cart
    //             const oldQuantity = product.cartItem.quantity; // get the old quantity
    //             newQuantity = oldQuantity + 1; // increment the quantity by 1
    //             return fetchedCart.addProduct(product, { // add the product to the cart
    //                 through: { quantity: newQuantity } // set the new quantity
    //             });
    //         }
    //         return Product.findByPk(prodId) // find the product by id
    //             .then(product => {
    //                 return fetchedCart.addProduct(product, { // add the product to the cart
    //                     through: { quantity: 1 } // set the quantity to 1
    //                 });
    //             }
    //         ).catch(err => console.log(err));
    //     })
    //     .then(  () => {
    //         res.redirect('/cart'); // redirect to the cart page
    //     })
    //     .catch(err => console.log(err)); // get the cart for the user
}

exports.postCartDeleteProduct = ( req, res, next)=>{

    const prodId = req.body.productId; 
    req.user
    .deleteItemFromCart(prodId)
    .then(result => {
        res.redirect('/cart'); // redirect to the cart page
    })
    .catch(err => console.log(err)); // log any errors to the console
}


exports.getOrders = ( req, res, next)=>{
    req.user
    .getOrders()
    .then(orders =>{
        res.render('shop/orders', {
        path:'/orders',
        PageTitle:'Your Orders',
        orders: orders // pass the orders to the view
    })
})
    .catch(err=>(console.log(err))
    
); // render the cart view  
}  


exports.postOrders = ( req, res, next)=>{
    let fetchedCart;
    req.user
        .addOrder()
        .then(() => {
            res.redirect('/orders'); // redirect to the orders page
        })
        .catch(err => console.log(err)); // log any errors to the console
}





