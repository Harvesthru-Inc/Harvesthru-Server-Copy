const mongoose = require('mongoose');
const OrderItem = require('./OrderItem');
const Farm = require('./Farm');
const User = require('./User');

const OrderSchema = new mongoose.Schema({
  orderItems: {
    type: [OrderItem],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  farm: {
    type: Farm,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  buyer: {
    type: User,
    required: true,
  },
});

module.exports = mongoose.model('order', OrderSchema);
