const bcrypt = require('bcryptjs')

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

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    PageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
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
                if (userDoc) {  //if user exists we dont want to create new one with same email
                    return res.redirect('/signup')
                }
            return bcrypt.hash(password, 12 )
                .then(hashedPassword=>{
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: {item:[]}
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
