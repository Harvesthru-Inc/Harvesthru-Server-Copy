const mongoose = require('mongoose');

// Order item model
const OrderItemSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, autoGenerate: true }
);

module.exports = mongoose.model('OrderItem', OrderItemSchema);
