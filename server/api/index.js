const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const feelings = require('./feelings');

function ensureUser(req, res, next) {
  if (!req.user) {
    next(createError(401, 'Login to access this endpoint'));
  } else {
    next();
  }
}

router.use('/feelings', feelings);
router.use('/protected', ensureUser, function (req, res) {
  res.send('private');
});

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(err.status || 500).json(err);
  }
}

router.use(errorHandler);

module.exports = router;
