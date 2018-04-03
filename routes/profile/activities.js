const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('activities', { user: req.user });
});

module.exports = router;
