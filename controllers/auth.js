const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.getLogin = ( req, res, next)=>{
    const message = req.flash('error');
    res.render('auth/login', {
        path:'/login',
        PageTitle:'Login',
        errorMessage: message.length > 0 ? message[0] : null, 
        csrfToken: req.csrfToken()
    }) 
}  

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]; // Get the first error message
    }
  res.render('auth/signup', {
    path: '/signup',
    PageTitle: 'Signup',
    isAuthenticated: false,
    errorMessage: message,
    csrfToken: req.csrfToken()
  });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            if (err) console.log('Error saving session:', err);
                            res.redirect('/');
                        });
                    }
                    // If password does not match
                    req.flash('error', 'Invalid email or password.');
                    return res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};  

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email:email})
            .then(userDoc=>{
                req.flash('error', 'Email already exists. Please use a different email.');
                if (password !== confirmPassword) {
                    req.flash('error', 'Passwords do not match. Please try again.');
                    return res.redirect('/signup');
                }
                if (userDoc) {  //if user exists we dont want to create new one with same email
                    return res.redirect('/signup')
                }
            return bcrypt.hash(password, 12 )
                .then(hashedPassword=>{
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: {items: []}
                    })
                    return user.save()
                })
                       
            .then(result=>{
                res.redirect('/login')
            })
            })
            
        .catch(err=>{
            console.log(err)
        })

};

exports.postLogout = ( req, res, next)=>{
    req.session.destroy(err => { // destroy the session
        console.log('Session destroyed:', err);
        res.redirect('/'); // redirect to home page
    });
}
