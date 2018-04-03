const express = require('express');
const createError = require('http-errors');
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

router.get('/new', function (req, res) {
  res.render('new-stressor', { user: req.user });
});

router.get('/:id', function (req, res, next) {
  const stressorId = req.params.id;
  Stressor.findOne({ _id: stressorId }).exec(function (err, stressor) {
    if (err) throw err;

    if (req.user._id.equals(stressor.user)) {
      res.render('view-stressor', { user: req.user, stressor });
    } else {
      return next(createError(401, 'Invalid user'));
    }
  });
});

router.post('/:id', function (req, res) {
  const {
    params: { id },
    body: {
      text, category, rating, notes, pattern,
    },
  } = req;
  Stressor.findOne({ _id: id })
    .then(function (stressor) {
      stressor.text = text;
      stressor.category = category;
      stressor.rating = rating;
      stressor.notes = notes;
      stressor.pattern = pattern;
      stressor.save(function (error) {
        if (error) throw error;
        res.redirect(`/profile/stressors/${id}`);
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

module.exports = router;
