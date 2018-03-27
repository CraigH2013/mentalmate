const express = require('express');
const { ensureUser } = require('../middleware');

const router = express.Router();
const feelings = require('./feelings');
const me = require('./me');

router.use('/me', ensureUser, me);
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