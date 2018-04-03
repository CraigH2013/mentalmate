const express = require('express');
const passport = require('../passport');

const router = express.Router();

router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  function (req, res) {
    res.redirect('/profile');
  },
);

router.get('/', function (req, res) {
  if (req.user) {
    res.redirect('profile');
  } else {
    res.render('login');
  }
});

module.exports = router;
