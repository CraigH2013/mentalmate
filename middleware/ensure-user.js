const createError = require('http-errors');

function ensureUser(req, res, next) {
  if (!req.user) {
    next(createError(401, 'Login to access this endpoint'));
  } else {
    next();
  }
}

module.exports = ensureUser;
