const express = require('express');
const Stressor = require('../../models/Stressor');

const router = express.Router();

router.get('/', function (req, res) {
  const { user } = req;
  Stressor.find({ user: user._id })
    .then(function (stressors) {
      console.log(stressors);
      res.render('stressors', { user, stressors });
    })
    .catch(function (err) {
      throw err;
    });
});

router.get('/new', function (req, res) {
  res.render('new-stressor', { user: req.user });
});

module.exports = router;
