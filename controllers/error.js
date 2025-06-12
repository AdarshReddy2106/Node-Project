exports.getErrorPage = (req, res, next) => { // middleware to handle 404 errors
    res.status(404).render('error', {
        PageTitle: 'Page Not Found',
        path: '',
        isAuthenticated : req.session.isLoggedIn,   
    });
}