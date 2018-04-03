const express = require('express');
const Stressor = require('../../models/Stressor');

const router = express.Router();

router.get('/', function (req, res) {
  Stressor.find({ user: req.user._id }).exec(function (err, stressors) {
    const categoryCount = { None: 0 };
    let unlabledCount = 0;

    stressors.forEach((s) => {
      if (s.pattern === 'NONE') {
        unlabledCount += 1;
      }

      if (categoryCount[s.category]) {
        categoryCount[s.category] += 1;
      } else {
        categoryCount[s.category] = 1;
      }
    });

    let mainCategory = 'None';

    Object.keys(categoryCount).forEach((key) => {
      if (categoryCount[key] > categoryCount[mainCategory]) {
        mainCategory = key;
      }
    });

    res.render('insights', {
      mainCategory,
      stressorCount: stressors.length,
      unlabledCount,
      user: req.user,
    });
  });
});

module.exports = router;
