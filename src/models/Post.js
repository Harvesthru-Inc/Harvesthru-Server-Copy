const mongoose = require('mongoose');

// Define post types
const postTypes = {
  review: 'REVIEW',
  social: 'SOCIAL',
};

// Post model
const PostSchema = new mongoose.Schema(
  {
    media: {
      type: String,
      unique: true,
      default: null,
    },
    caption: {
      type: String,
      default: null,
    },
    postType: {
      type: String,
      default: postTypes.social,
    },
  },
  { timestamps: true, autoGenerate: true }
);

module.exports = mongoose.model('Post', PostSchema);
