const passport = require('passport');

const bcrypt = require('bcrypt');

const passportLocal = require('passport-local').Strategy;

const Admin = require('../models/Admin');

passport.use(new passportLocal({
    usernameField: "email"
}, async function (email, password, done) {
    let AdminData = await Admin.findOne({ email: email });
    console.log(AdminData)
    if (AdminData) {
        let data = await bcrypt.compare(password, AdminData.password);
        if (data) {
            return done(null, AdminData);
        }
        else {
            return done(null, false);
        }
    }
    else {
        return done(null, false);
    }
}))

passport.serializeUser(async function (user, done) {
    return done(null, user.id);
})

passport.deserializeUser(async function (id, done) {
    let Ad = await Admin.findById(id);
    if (Ad) {
        return done(null, Ad);
    }
    else {
        return done(null, false);
    }
})

passport.checkAuthenticatrduser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        return res.redirect('/');
    }
}

passport.setAuthenticatrduser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admins = req.user
    }
    next()
}

module.exports = passport;