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
    },
    hours: [
      {
        type: Date,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
    },
    reviews: [
      {
        type: String,
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Farm', FarmSchema);
