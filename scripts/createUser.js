// Import models'
const User = require('../src/models/User');
const connectDB = require('../config/db');

(async () => {
  // connect to database
  await connectDB(process.env.MONGO_URI);

  // Create new user
  const newUser = new User({
    firstName: 'Howard',
    lastName: 'Wang',
    password: '234Ar234',
    email: 'Luw055@ucsd.edu',
  });

  // Save user
  newUser.save(function (err) {
    if (err) return console.log(err);
    return console.log('User created!');
  });
})();
