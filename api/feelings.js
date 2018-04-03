const express = require('express');

const router = express.Router();
const feelings = require('../data/feelings');

router.get('/', function (req, res) {
  res.send(feelings.map(feeling => feeling.emotion).join(' '));
});

module.exports = router;
