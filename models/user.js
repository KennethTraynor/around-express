const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    mnlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]+\/?([a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]+)?#?/.test(v);
      },
    },
  },
});