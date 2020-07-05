// Configure .env
require('dotenv').config();

// Import JWT
const jwt = require('jsonwebtoken');

// Define auth function
const auth = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    await jwt.verify(token, process.env.jwtSecret, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });

    // Return success
    return true;
  } catch (err) {
    // Error with token
    console.error('Something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }

  return false;
};

// Export auth function
module.exports = auth;
