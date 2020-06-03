// Neccessary dependencies, get mongoURI connect string
const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

// async function to connect db to atlas in cloud
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
// export function so server can use
module.exports = connectDB;
