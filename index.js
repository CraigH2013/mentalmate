const print = require('debug')('app');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const secret = require('./secret');
const passport = require('./passport');
const api = require('./api');
const routes = require('./routes');

// Create Express application.
const app = express();

// Connect to database
if (secret) {
  // local variables
  const dbUsername = secret.db.username;
  const dbPassword = secret.db.password;
  const dbUrl = secret.db.url;
  mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbUrl}`);
} else {
  // heroku config vars
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbUrl = process.env.DB_URL;
  mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbUrl}`);
}

// Set up static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Configure view engine to render view templates.
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

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
app.use('/', routes);

// Define REST endpoints
app.use('/api', api);

// catch all errors
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(500).render('error', { error: err });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => print(`Server listening on port ${port}!`));
