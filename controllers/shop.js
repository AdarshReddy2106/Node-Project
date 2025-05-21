const Product = require('../models/product'); // import the Product model

exports.getProducts = (req, res, next)=>{ 
    Product.fetchAll((products)=>{ // fetch all products from the product model
        res.render('shop/product-list', {
        prods: products, 
        PageTitle:'Shop', 
        path:'/', 
    })// render the shop view
    }); // fetch all products from the product model
}

exports.getProduct = (req, res, next)=>{
    const prodId = req.params.productId; // get the product id from the request parameters
    Product.findById(prodId, (product)=>{ // find the product by id
        console.log(product); // log the product
        });
        res.redirect('/'); // redirect to the shop view
}


exports.getIndex = (req, res, next)=>{
    Product.fetchAll((products)=>{ // fetch all products from the product model
        res.render('shop/index', {
        prods: products, 
        PageTitle:'Shop', 
        path:'/', 
})
});
}

exports.getCart = ( req, res, next)=>{
    res.render('shop/cart', {
        path:'/cart',
        PageTitle:'Your Cart',
    }
); // render the cart view  
}   

exports.getOrders = ( req, res, next)=>{
    res.render('shop/orders', {
        path:'/orders',
        PageTitle:'Your Orders',
    }
); // render the cart view  
}   

exports.getCheckout = ( req, res, next)=>{
    res.render('shop/checkout', {
        path:'/checkout',
        PageTitle:'Checkout',
    }
); // render the checkout view  
}
