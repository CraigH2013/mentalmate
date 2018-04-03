const express = require('express');
const Stressor = require('../../models/Stressor');
const activities = require('../../data/activities');

const router = express.Router();

router.get('/', function (req, res) {
  Stressor.find({ user: req.user._id }).exec(function (err, stressors) {
    if (err) throw err;

    const relevant = {};

    stressors = stressors.filter(s => s.pattern !== 'NONE');

    stressors.forEach((s) => {
      relevant[s.pattern] = true;
    });

    if (stressors.length) {
      relevant.ALL = true;
    }

    const relevantActivities = activities.filter(a => relevant[a.type]);

    res.render('activities', {
      user: req.user,
      activities: relevantActivities,
    });
  });
});

module.exports = router;
