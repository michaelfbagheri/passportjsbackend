var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');

var app = express();

//create db connection
mongoose.connect('mongodb://localhost/passportlocal')

var user = require('./controllers/user');
//I'm still not certain how you could just require a file without putting it in a variable, but this is critical
require('./config/passport');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());

//using the store: new MongoStore creates a new colection in our dB to store the sessions info (cookie)
//this way the web browser refresh will not delete it
app.use(session({
    secret: 'mysecretsessionkey',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(user);


app.listen(3000, function () {
    console.log('listening on port 3000');
});

