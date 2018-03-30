const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const { generateIdenticon } = require('../middleware');

const router = express.Router();

router.get('/*', ensureLoggedIn(), generateIdenticon, function (req, res) {
  res.render('profile', { user: req.user });
});

module.exports = router;
