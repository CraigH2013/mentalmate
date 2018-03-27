const print = require('debug')('app');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy } = require('passport-local');
const { ensureLoggedIn } = require('connect-ensure-login');
const User = require('./models/User');
const secret = require('./secret');
const api = require('./api');
const themes = require('./data/themes');

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

// Create Express application.
const app = express();

// Connect to database
const dbUsername = secret.db.username;
const dbPassword = secret.db.password;
const dbUrl = secret.db.url;
mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbUrl}`);

// Set up static files
app.use('/static', express.static(path.join(__dirname, 'public')));

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

// Define REST endpoints
app.use('/api', api);

// Define routes.
app.get('/', function (req, res) {
  res.render('home', { user: req.user });
});

app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  function (req, res) {
    res.redirect('/profile');
  },
);

app.get('/login', function (req, res) {
  if (req.user) {
    res.redirect('profile');
  } else {
    res.render('login');
  }
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/signup', function (req, res) {
  if (req.user) {
    res.redirect('profile');
  } else {
    res.render('signup');
  }
});

app.post(
  '/signup',
  function (req, res, next) {
    const { body: { name, email, password } } = req;

    User.findOne({ email }).then((user) => {
      if (user) {
        res.render('already-exists.ejs', { email });
      } else {
        User.create({
          name,
          email,
          password,
        })
          .then(() => {
            next();
          })
          .catch(() => {
            res.render('signup');
          });
      }
    });
  },
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile',
  }),
);

app.get('/profile*', ensureLoggedIn(), function (req, res) {
  res.render('profile', { user: req.user });
});

app.get('/meditate*', ensureLoggedIn(), function (req, res) {
  // prevent users from jumping into the middle of the meditation process
  if (req.path !== '/meditate') {
    return res.redirect('/meditate');
  }

  // setup theme
  const { meditateTheme } = req.user.preferences;
  const theme = themes[meditateTheme];
  const [one, two] = theme.gradient;

  res.render('meditate', {
    gradient: { one, two },
  });
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(500).render('error', { error: err });
  }
});

app.listen(3000, () => print('Server listening on port 3000!'));
