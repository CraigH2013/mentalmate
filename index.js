const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const secret = !process.env.HEROKU ? require('./secret') : null;
const passport = require('./passport');
const api = require('./api');
const routes = require('./routes');

// Create Express application.
const app = express();

const dbUsername = secret ? secret.db.username : process.env.DB_USERNAME;
const dbPassword = secret ? secret.db.password : process.env.DB_PASSWORD;
const dbUrl = secret ? secret.db.url : process.env.DB_URL;

mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbUrl}`);

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
  secret: secret ? secret.session : process.env.SESSION,
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

/* eslint-disable no-console */
app.listen(port, () => console.log(`Server listening on port ${port}!`));
