const mongoose = require('mongoose');

// Post model
const PostSchema = new mongoose.Schema({
  media: {
    type: String,
    required: true,
    unique: true,
  },
  caption: {
    type: String,
  },
});

module.exports = mongoose.model('Post', PostSchema);
