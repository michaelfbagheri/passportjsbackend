var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/user');


router.get('/', function (req, res) {
    res.render('index');
})

router.get('/signup', function (req, res) {
    res.render('signup');
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: 'profile',
    failureRedirect: 'signup',
    failureFlash: true
}));

router.get('/profile', isLoggedIn, function (req, res) {
    //because post login the passport.deserializeUser function makes the "user" obj globally available 
    //with all the logged in users info, we can use it below as req.user as long as someone is logged in....the "user" in 
    //front of it is simply a key (can be anything)
    console.log(req.user)
    res.render('profile', { user: req.user });
});

//get routed to the login page
router.get('/login', function (req, res) {
    res.render('login');
});

//route used to send login info from form to passport for authentication purposes
router.post('/login', passport.authenticate('local.login', {
    successRedirect: 'profile',
    failureRedirect: 'login',
    failureFlash: true
}));

router.get('/logout', function (req, res) {
    //because post login the passport.deserializeUser function makes the "user" obj globally available 
    //with all the logged in users info, we can use it below as req.user as long as someone is logged in....the "user" in 
    //front of it is simply a key (can be anything)
    //rea.logOut() is a passport function
    req.logOut();
    console.log("you are logged out!")
    res.redirect('/')
});

module.exports = router;


//this cuntion is utlitzing the isAuthenticated method to stop un-authorized/un-authenticated
//users from accessing anypages you don't want them to 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}