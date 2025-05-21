const e = require("express");

const products = []; // create an empty array for products

exports.getAddProduct = (req, res, next)=>{ 
    console.log('Middleware add product');
    res.render('add-product', {
        PageTitle:'Add Product', 
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        ActiveAddProduct: true,
    }) // send a response to the client
}



exports.postAddProduct = (req, res, next)=>{
    products.push({ // add a new product to the products array
        title: req.body.title, // get the title from the request body
    });
    res.redirect('/'); // redirect to the home page
}   


exports.getProducts = (req, res, next)=>{ 
   /*  console.log(admindata.products); // log the products array from the admin routes
    res.sendFile(path.join(mainDir, 'views', 'shop.html')); // send a response to the client */
    res.render('shop', {
        prods: products, 
        PageTitle:'Shop', 
        path:'/', 
        hasProducts: products.length>0,
        ActiveShop: true,
        productCSS: true,
        //layout: false // use this to disable the default layout
    })// render the shop view
}

