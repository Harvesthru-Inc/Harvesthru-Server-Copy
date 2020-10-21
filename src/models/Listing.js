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
      default: null,
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
      default: null,
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
  { timestamps: true, autoGenerate: true }
);

module.exports = mongoose.model('Listing', ListingSchema);
