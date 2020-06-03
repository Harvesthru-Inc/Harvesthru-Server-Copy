const mongoose = require('mongoose');
const User = require('./User');
const Listing = require('./Listing');

const FarmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  hours: {
    type: [Date],
    required: true,
  },
  owner: {
    type: User,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  listings: {
    type: [Listing],
  },
  photos: {
    type: [String],
  },
  shareUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('order', FarmSchema);
