const mongoose = require('mongoose');

// User model
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  location: {
    type: JSON,
  },
  farms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farm',
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bio: {
    type: String,
  },
  photos: [
    {
      type: String,
    },
  ],
  favoriteFarms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farm',
    },
  ],
  paymentInfo: {
    type: JSON,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  oneSignalPlayerId: {
    type: String,
    required: true,
  },
  facebookId: {
    type: String,
  },
  googleId: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
