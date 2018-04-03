const express = require('express');
const Stressor = require('../../models/Stressor');

const router = express.Router();

router.get('/', function (req, res) {
  const { user } = req;
  Stressor.find({ user: user._id, open: true })
    .then(function (stressors) {
      const categories = {};
      stressors.forEach((stressor) => {
        if (categories[stressor.category]) {
          categories[stressor.category].push(stressor);
        } else {
          categories[stressor.category] = [stressor];
        }
      });
      Object.keys(categories).forEach((key) => {
        categories[key].sort((a, b) => b.attention - a.attention);
      });
      res.render('stressors', {
        user,
        count: stressors.length,
        stressors: categories,
      });
    })
    .catch(function (err) {
      throw err;
    });
});

router.post('/', function (req, res) {
  const { user: { _id }, body: { text, category, rating } } = req;
  Stressor.create({
    user: _id,
    text,
    category,
    rating,
  })
    .then(function () {
      res.redirect('/profile/stressors');
    })
    .catch(function (err) {
      throw err;
    });
});

router.get('/new', function (req, res) {
  res.render('new-stressor', { user: req.user });
});

module.exports = router;
