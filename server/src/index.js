const print = require('debug')('app');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('./models/User');
const secret = require('./secret');

// Configure the local strategy for use by Passport.
passport.use(new Strategy(function (username, password, cb) {
  User.findOne({ email: username }, function (err, user) {
    if (err) return cb(err);
    if (!user) return cb(null, false);
    if (user.password !== password) return cb(null, false);
    return cb(null, user);
  });
}));

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

// Create Express application.
const app = express();

// Connect to database
const dbUsername = secret.db.username;
const dbPassword = secret.db.password;
const dbUrl = secret.db.url;
mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbUrl}`);

// Configure view engine to render EJS templates.
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: secret.session,
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/', function (req, res) {
  res.render('home', { user: req.user });
});

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  },
);

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (
  req,
  res,
) {
  res.render('profile', { user: req.user });
});

app.listen(3000, () => print('Server listening on port 3000!'));
