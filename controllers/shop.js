const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next)=>{ 
    Product.find()
        .then(
           products=> {
                res.render('shop/product-list', {
                prods: products, 
                PageTitle:'All Products', 
                path:'/products', 
                isAuthenticated : req.isLoggedIn,
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
                isAuthenticated : req.isLoggedIn
            });
        })
        .catch(err => console.log(err));
}


exports.getIndex = (req, res, next)=>{
    Product.find()
        .then(
            products=> {
                res.render('shop/index', {
                    prods: products, // pass the products to the view
                    PageTitle:'Shop', // set the page title to All Products
                    path:'/', // set the path to /
                    isAuthenticated : req.isLoggedIn
            }
        )})
        .catch(err => console.log(err));
}


exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            console.log('user.cart.items:', user.cart.items);
            
            // Map the cart items to create products array with quantity
            const products = user.cart.items.map(item => {
                return {
                    ...item.productId._doc, // spread the product data
                    quantity: item.quantity, // add the quantity from cart
                    cartItemId: item._id // optional: include cart item id for delete operations
                };
            });
            
            res.render('shop/cart', {
                path: '/cart',
                PageTitle: 'Your Cart',
                products: products,
                isAuthenticated : req.isLoggedIn
            });
        })
        .catch(err => {
            console.log('Error in getCart:', err);
            res.status(500).render('error', { 
                error: 'Unable to load cart',
                path: '/cart',
                isAuthenticated : req.isLoggedIn
            });
        });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId; // get the product id from the request body
    
    // Check if user exists
    if (!req.user) {
        console.log('Error: req.user is null');
        return res.status(401).redirect('/login'); // or handle as needed
    }
    
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                throw new Error('Product not found');
            }
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log('Product added to cart:', result);
            res.redirect('/cart');
        })
        .catch(err => {
            console.log('Error in postCart:', err);
            res.status(500).redirect('/'); // redirect to home on error
        });
}

exports.postCartDeleteProduct = ( req, res, next)=>{
    const prodId = req.body.productId; 
    
    if (!req.user) {
        console.log('Error: req.user is null');
        return res.status(401).redirect('/login');
    }
    
    req.user
    .removeFromCart(prodId)
    .then(result => {
        res.redirect('/cart'); // redirect to the cart page
    })
    .catch(err => {
        console.log('Error deleting from cart:', err);
        res.redirect('/cart'); // redirect back to cart even on error
    });
}


exports.getOrders = ( req, res, next)=>{
    if (!req.user) {
        console.log('Error: req.user is null');
        return res.status(401).redirect('/login');
    }
    Order.find({"user.userId": req.user._id}) 
    .then(orders =>{
        res.render('shop/orders', {
        path:'/orders',
        PageTitle:'Your Orders',
        orders: orders, // pass the orders to the view
        isAuthenticated : req.isLoggedIn
    })
})
    .catch(err=>{
        console.log('Error fetching orders:', err);
        res.status(500).render('shop/orders', {
            path: '/orders',
            PageTitle: 'Your Orders',
            orders: [],
            isAuthenticated : req.isLoggedIn
        });
    }); 
}  


exports.postOrders = ( req, res, next)=>{
    req.user
        .populate('cart.items.productId')
        .then(user => {
            console.log('user.cart.items:', user.cart.items);
            
            // Map the cart items to create products array with quantity
            const products = user.cart.items
            .map(item => {
                return {
                    quantity: item.quantity, // add the quantity from cart
                    product : {...item.productId._doc}
                };
            });
            const order = new Order({
                user:{
                    name: req.user.name,
                    userId : req.user 
                },
                products: products
            })
            return order.save( )
            })
        .then(result => {
            return req.user.clearCart()
        }) 
        .then(()=>{
            res.redirect('/orders'); // redirect to the orders page
        })
        .catch(err => {
            console.log('Error creating order:', err);
            res.redirect('/cart'); // redirect back to cart on error
        });
}
