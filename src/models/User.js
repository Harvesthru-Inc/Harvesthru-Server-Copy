// Import libraries
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define salt factor
const SALT_WORK_FACTOR = 10;

// User model
const UserSchema = new mongoose.Schema(
  {
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
      unique: true,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    location: {
      type: JSON,
      default: null,
    },
    farms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
      },
    ],
    likedFarms: [
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
      default: null,
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
      default: null,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    oneSignalPlayerId: {
      type: String,
      unique: true,
      default: null,
    },
    facebookId: {
      type: String,
      unique: true,
      default: null,
    },
    googleId: {
      type: String,
      unique: true,
      default: null,
    },
    avatar: {
      type: String,
      unique: true,
      default: null,
    },
  },
  { timestamps: true, autoGenerate: true }
);

// Hash passwords before saving
UserSchema.pre('save', function (next) {
  // Hash password if modified
  if (!this.isModified('password')) return next();

  // Generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // Hash password using salt
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error);

      // Replace with hash
      this.password = hash;
      next();
    });
  });
});

// Compare passwords
UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export user model
module.exports = mongoose.model('User', UserSchema);
