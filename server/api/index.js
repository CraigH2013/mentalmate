const express = require('express');

const router = express.Router();
const feelings = require('./feelings');

router.use('/feelings', feelings);

module.exports = router;
