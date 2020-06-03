const mongoose = require('mongoose');
const Listing = require('./Listing');

const OrderItemSchema = new mongoose.Schema({
  listing: {
    type: Listing,
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
});

module.exports = mongoose.model('order', OrderItemSchema);
