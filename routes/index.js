const express = require('express');

const router = express.Router();
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const profile = require('./profile');
const meditate = require('./meditate');

router.get('/', function (req, res) {
  res.redirect('/login');
});

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/profile', profile);
router.use('/meditate', meditate);

module.exports = router;
