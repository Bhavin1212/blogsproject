const express = require('express');

const port = 8080;

const app = express();

const path = require('path');

const db = require('./config/mongoose');

const fs = require('fs');

const passport_local = require('./config/passport');

const passport = require('passport');

const session = require('express-session');

app.use(session({
    name: 'passport',
    secret: 'pass',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60
    }
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('userassets'));
app.use("/uplodes", express.static(path.join(__dirname, 'uplodes')));

app.use(express.urlencoded());

app.use(express.static('assets'));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatrduser);

app.use('/', require('./routes/index'));

app.listen(port, function (err) {
    if (err) {
        console.log('somthing wronge');
        return false;
    }
    console.log('server is running on port:', port)
})