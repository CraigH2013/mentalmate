const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const themes = require('../data/themes');

const router = express.Router();

router.get('/*', ensureLoggedIn(), function (req, res) {
  // prevent users from jumping into the middle of the meditation process
  if (req.path !== '/') {
    return res.redirect('/meditate');
  }

  // setup theme
  const { meditateTheme } = req.user.preferences;
  const theme = themes[meditateTheme];
  const [one, two] = theme.gradient;

  res.render('meditate', {
    gradient: { one, two },
  });
});

module.exports = router;
