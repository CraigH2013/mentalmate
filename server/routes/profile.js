const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');

const router = express.Router();

router.get('/*', ensureLoggedIn(), function (req, res) {
  res.render('profile', { user: req.user });
});

module.exports = router;
