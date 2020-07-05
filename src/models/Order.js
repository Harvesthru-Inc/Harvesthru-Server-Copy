const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
