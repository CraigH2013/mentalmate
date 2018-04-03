const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const { generateIdenticon } = require('../../middleware');
const stressors = require('./stressors');
const insights = require('./insights');
const activities = require('./activities');

const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/profile/stressors');
});

router.use('/stressors', ensureLoggedIn(), generateIdenticon, stressors);
router.use('/insights', ensureLoggedIn(), generateIdenticon, insights);
router.use('/activities', ensureLoggedIn(), generateIdenticon, activities);

router.get('/*', function (req, res) {
  res.redirect('/profile');
});

module.exports = router;
