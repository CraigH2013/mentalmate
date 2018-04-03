const express = require('express');
const md5 = require('md5');

const router = express.Router();

router.get('/', function (req, res) {
  const { user: { name, email, preferences } } = req;
  const hash = md5(email);
  res.json({
    name,
    hash,
    preferences,
  });
});

module.exports = router;
