const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../models/User');

// Configure the local strategy for use by Passport.
const strategyOptions = {
  usernameField: 'email',
};
const strategyValidation = function (email, password, cb) {
  User.findOne({ email }, function (err, user) {
    if (err) return cb(err);
    if (!user) return cb(null, false);
    if (user.password !== password) return cb(null, false);
    return cb(null, user);
  });
};
const strategy = new Strategy(strategyOptions, strategyValidation);
passport.use(strategy);

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
  User.findOne({ _id: id }, function (err, user) {
    if (err) cb(err);
    cb(null, user);
  });
});

module.exports = passport;
