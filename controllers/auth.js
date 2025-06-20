const bcrypt = require('bcryptjs')

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const User = require('../models/user')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth : {
        api_key : process.env.SENDGRID_API_KEY
    }
}))

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

    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match. Please try again.');
        return res.redirect('/signup');
    }

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'Email already exists. Please use a different email.');
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                    return transporter.sendMail({
                        to: email,
                        from: 'shop@node.com',
                        subject: 'Signup Successful',
                        text: 'Welcome to our application!'
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/signup');
        });
};

exports.postLogout = ( req, res, next)=>{
    req.session.destroy(err => { // destroy the session
        console.log('Session destroyed:', err);
        res.redirect('/'); // redirect to home page
    });
}
