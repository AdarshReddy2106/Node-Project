const User = require('../models/user')

exports.getLogin = ( req, res, next)=>{
        // const isLoggedIn = req.get('Cookie').split('=')[1];
        console.log(req.session.isLoggedIn)
        res.render('auth/login', {
        path:'/login',
        PageTitle:'Login',
        isAuthenticated: false
    })
}  
exports.postLogin = ( req, res, next)=>{
        
        User.findById('684843a9e6a5c7b4f624d099') // find the user with id 1
                .then(user => { // if user is found
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save(err=>{
                        console.log('Error saving session:', err);
                        res.redirect('/')
                    })
                    
                })
                .catch(err => console.log(err));  
}  

exports.postLogout = ( req, res, next)=>{
    req.session.destroy(err => { // destroy the session
        console.log('Session destroyed:', err);
        res.redirect('/'); // redirect to home page
    });
}
