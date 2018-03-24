const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email address',
    },
    required: [true, 'A valid email address is required'],
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
