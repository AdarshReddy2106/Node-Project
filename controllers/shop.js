const Product = require('../models/product'); // import the Product model
const Order = require('../models/order'); // import the Order model

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

    const prodId = req.params.productId; // get the product id from the request parameters
    Product.findAll({ where: { id: prodId } })
    .then(
            products=> {
                res.render('shop/product-detail', {
                product: products[0], 
                PageTitle:'products[0].title', // set the page title to the product title
                path:'/products', 
                })// render the shop view
            })
    .catch(err => console.log(err));
     // find the product by id
    // Note: Using findByPk is more efficient than findAll with where clause
    // because it uses the primary key to find the product

    /* Product.findByPk(prodId)
    .then(
        (product)=> {
            res.render('shop/product-detail', {
                product: product, // pass the product
                PageTitle: product.title, // set the page title to the product title
                path: '/products', // set the path to /products
        }
            ) // render the product detail view
        })
    .catch(
        err => console.log(err)
    ) */
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
    .then(cart =>{
        return cart
        .getProducts()
        })
        .then(products => {
        res.render('shop/cart', {
        path:'/cart',
        PageTitle:'Your Cart',
        products: products,
        })
        .catch(err => console.log(err));})
    .catch(err => console.log(err));
}

exports.postCart = ( req, res, next)=>{
    const prodId = req.body.productId; // get the product id from the request body
    let fetchedCart; // variable to hold the fetched cart
    let newQuantity = 1; // set the new quantity to 1
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart; // assign the fetched cart to the variable
            return cart.getProducts({ where: { id: prodId } }); // get the products in the cart

        })
        .then(products => {
            let product; // declare a variable to hold the product

            if (products.length > 0) { // if the product is already in the cart
                product = products[0]; // get the first product
            }
            
            if (product) { // if the product is already in the cart
                const oldQuantity = product.cartItem.quantity; // get the old quantity
                newQuantity = oldQuantity + 1; // increment the quantity by 1
                return fetchedCart.addProduct(product, { // add the product to the cart
                    through: { quantity: newQuantity } // set the new quantity
                });
            }
            return Product.findByPk(prodId) // find the product by id
                .then(product => {
                    return fetchedCart.addProduct(product, { // add the product to the cart
                        through: { quantity: 1 } // set the quantity to 1
                    });
                }
            ).catch(err => console.log(err));
        })
        .then(  () => {
            res.redirect('/cart'); // redirect to the cart page
        })
        .catch(err => console.log(err)); // get the cart for the user
}

exports.postCartDeleteProduct = ( req, res, next)=>{

    const prodId = req.body.productId; 
    req.user
    .getCart() // get the cart for the user
    .then(cart => {
        return cart.getProducts({ where: { id: prodId } }); // get the products in the cart
    })
    .then(products => {
        const product = products[0]; // get the first product
        return product.cartItem.destroy(); // delete the product from the cart
    })
    .then(result => {
        res.redirect('/cart'); // redirect to the cart page
    })
    .catch(err => console.log(err)); // log any errors to the console
}


exports.getOrders = ( req, res, next)=>{
    req.user
    .getOrders({ include: ['products'] }) // get the orders for the user, including the products
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
        .getCart()
        .then(cart => {
            fetchedCart = cart; // assign the fetched cart to the variable
            return cart.getProducts(); // get the products in the cart
        })
        .then(products => {
            return req.user
                .createOrder() 
                .then(order => {
                    return order.addProducts(
                         products.map(product => { // add the products to the order
                        product.orderItem = { quantity: product.cartItem.quantity }; // set the quantity
                        return product; // return the product
                    }));
                })
                .catch(err => console.log(err));
        })
        .then(result => { 
            return fetchedCart.setProducts(null); // clear the cart after placing the order
        })
        .then(() => {
            res.redirect('/orders'); // redirect to the orders page
        })
        .catch(err => console.log(err)); // log any errors to the console
}





