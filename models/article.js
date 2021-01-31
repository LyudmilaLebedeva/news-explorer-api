const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: (link) => validator.isURL(link),
  },
  image: {
    type: String,
    required: true,
    validate: (link) => validator.isURL(link),
  },
  owener: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
