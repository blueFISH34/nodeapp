

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  source: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
