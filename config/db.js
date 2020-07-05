// Initialize mongoose
const mongoose = require('mongoose');

// Import models
const User = require('../src/models/User');
const Farm = require('../src/models/Farm');
const Listing = require('../src/models/Listing');
const Order = require('../src/models/Order');
const OrderItem = require('../src/models/OrderItem');
const Post = require('../src/models/Post');

// Get DB URL
const db = process.env.MONGO_URI;
const createMode = process.env.CREATE_MODE;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    // Connected successfully
    console.log('MongoDB Connected...');

    // Create initial instance of models
    if (createMode) {
      // Create new user
      /* const newUser = new User({
        firstName: 'Howard',
        lastName: 'Wang',
        username: 'Maelstrom124    ',
        password: '234Ar234',
        email: 'luw055@ucsd.edu',
        phoneNumber: '+18584057271',
      });

      // Save user
      newUser.save(function (err) {
        if (err) return console.log(err);
        return console.log('User created!');
      }); */
      /* User.find({ firstName: 'Howard' }, (err, data) => {
        if (err) return console.log(err);
        if (data && data.length) {
          // Create new farm
          const newFarm = new Farm({
            title: "Howard's farm",
            owner: data[0],
          });

          // Save user
          newFarm.save((error) => {
            if (error) return console.log(err);
            return console.log('Farm created!');
          });

          return true;
        }

        return false;
      }); */
    }
  } catch (err) {
    // Connection error
    console.error(err.message);
    process.exit(1);
  }
};

// Export connect function
module.exports = connectDB;
