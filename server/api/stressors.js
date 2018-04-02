const express = require('express');
const Stressor = require('../models/Stressor');

const router = express.Router();

router.get('/', function (req, res) {
  Stressor.find({
    user: req.user._id,
  })
    .then(function (stressors) {
      res.send(stressors);
    })
    .catch(function (err) {
      throw err;
    });
});

module.exports = router;
