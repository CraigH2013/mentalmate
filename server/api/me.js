const express = require('express');
const md5 = require('md5');

const router = express.Router();

router.get('/', function (req, res) {
  const { user: { name, email } } = req;
  const hash = md5(email);
  res.json({
    name,
    hash,
  });
});

module.exports = router;
