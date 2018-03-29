const express = require('express');
const passport = require('../passport');
const User = require('../models/User');

const router = express.Router();

router.get('/', function (req, res) {
  if (req.user) {
    res.redirect('profile');
  } else {
    res.render('signup');
  }
});

router.post(
  '/',
  function (req, res, next) {
    const { body: { name, email, password } } = req;

    User.findOne({ email }).then((user) => {
      if (user) {
        res.render('already-exists', { email });
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

module.exports = router;
