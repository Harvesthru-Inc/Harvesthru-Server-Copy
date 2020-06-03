const mongoose = require('mongoose');
const Order = require('./Order');
const Farm = require('./Farm');
const Post = require('./Post');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  orders: {
    type: [Order],
  },
  location: {
    type: JSON,
  },
  farms: {
    type: [Farm],
  },
  followers: {
    type: [this],
  },
  following: {
    type: [this],
  },
  bio: {
    type: String,
  },
  photos: {
    type: [String],
  },
  favoriteFarms: {
    type: [Farm],
  },
  paymentInfo: {
    type: JSON,
  },
  posts: {
    type: [Post],
  },
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

module.exports = mongoose.model('user', UserSchema);
