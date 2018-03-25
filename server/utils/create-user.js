const process = require('process');
const print = require('debug')('create-user');
const mongoose = require('mongoose');
const secret = require('../secret');
const User = require('../models/User');

const dbUsername = secret.db.username;
const dbPassword = secret.db.password;
const dbUrl = secret.db.url;
mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbUrl}`);

mongoose.connection.once('open', function () {
  const [email, password] = process.argv.slice(2);

  User.create({ email, password }, function (err) {
    if (err) throw err;
    print('succesfully created user');
    process.exit();
  });
});
