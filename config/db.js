// Initialize mongoose
const mongoose = require('mongoose');

// Get DB URL
const db = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async (uri) => {
  try {
    await mongoose.connect(db || uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    // Connected successfully
    console.log('MongoDB Connected...');
  } catch (err) {
    // Connection error
    console.error(err.message);
    process.exit(1);
  }
};

// Export connect function
module.exports = connectDB;
