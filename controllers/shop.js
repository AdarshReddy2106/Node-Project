const Product = require('../models/product'); // import the Product model
const Cart = require('../models/cart'); // import the Cart model


exports.getProducts = (req, res, next)=>{ 
    Product.fetchAll((products)=>{ // fetch all products from the product model
        res.render('shop/product-list', {
        prods: products, 
        PageTitle:'All Products', 
        path:'/products', 
    })// render the shop view
    }); // fetch all products from the product model
}

exports.getProduct = (req, res, next)=>{
    const prodId = req.params.productId; // get the product id from the request parameters
    Product.findById(prodId, (product)=>{ // find the product by id
        res.render('shop/product-detail', {
            product: product, // pass the product to the view
            PageTitle: product.title, // set the page title to the product title
            path:'/products', // set the path to /products
        });
    })
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
    Cart.getCart((cart)=>{ 
        Product.fetchAll((products)=>{ // fetch all products from the product model
            const cartProducts = []; // create an empty array to store the cart products
            for (product of products) { // loop through the products
                const cartProductData = cart.products.find(prod => prod.id === product.id); // find the product in the cart
                if (cartProductData) { // if the product is found in the cart
                    cartProducts.push({ productData: product, qty: cartProductData.qty }); // push the product data and quantity to the cart products array
                } 
            }

        res.render('shop/cart', {
        path:'/cart',
        PageTitle:'Your Cart',
        products: cartProducts, // pass the cart products to the view
    }); // render the cart view
    });    
});
} 

exports.postCart = ( req, res, next)=>{
    const prodId = req.body.productId; 
    Product.findById(prodId, (product)=>{ // find the product by id
        Cart.addProduct(prodId, product.price); // add the product to the cart
    });
    res.redirect('/cart'); // redirect to the cart page
}

exports.postCartDeleteProduct = ( req, res, next)=>{
    const prodId = req.body.productId; // get the product id from the request body
    Product.findById(prodId, (product)=>{ // find the product by id
        Cart.deleteProduct(prodId, product.price); // delete the product from the cart
        res.redirect('/cart'); // redirect to the cart page
    });
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

