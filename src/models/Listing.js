const mongoose = require('mongoose');

// Listing model
const ListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    coverPhoto: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farm',
      required: true,
    },
    unit: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', ListingSchema);
