const mongoose = require('mongoose');

// Farm model
const FarmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    hours: {
      type: JSON,
      default: null,
    },
    location: {
      type: JSON,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      default: null,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
    photos: [
      {
        type: String,
      },
    ],
    shareUrl: {
      type: String,
      unique: true,
      default: null,
    },
  },
  { timestamps: true, autoGenerate: true }
);

module.exports = mongoose.model('Farm', FarmSchema);
