// Import libraries
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Initialize router
const router = express.Router();

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
  try {
    res.send('hello stranger :)');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Return validation errors if any exist
    const errors = validationResult(req);

    // If there are errors, return error
    if (!errors.isEmpty()) {
      // Get first error
      const firstError = errors.array()[0].msg;

      // Log and throw error
      console.log(errors.array());
      return res.status(400).send(firstError);
    }

    // Get the email and password from login request
    const { email, password } = req.body;

    // Find user in database
    try {
      const user = await User.findOne({ email });

      // If not found, say invalid username
      if (!user) {
        return res.status(400).send('Invalid username or password!');
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password);

      // If password does not match, return invalid
      if (!isMatch) {
        return res.status(400).send('Invalid username or password!');
      }

      // If user exists, generate auth payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign JWT and return as response
      const token = await jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000,
      });

      // Send the JWT token to front end
      return res.json({ token, user });
    } catch (err) {
      // Return error
      console.error(err.message);
      return res.status(500).send(err.message);
    }
  }
);

// @route    POST api/auth/register
// @desc     Register user in database
// @access   Public
router.post(
  '/register',
  [
    // Check firstName, lastName, email valid
    check('firstName', 'First Name cannot be blank!').not().isEmpty(),
    check('lastName', 'Last Name cannot be blank!').not().isEmpty(),
    check('email', 'Email cannot be blank!').not().isEmpty(),
    check('password', 'Password cannot be blank!').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    // Get errors
    const errors = validationResult(req);

    // If there are errors, return error
    if (!errors.isEmpty()) {
      // Get first error
      const firstError = errors.array()[0].msg;

      // Log and throw error
      console.log(errors.array());
      return res.status(400).send(firstError);
    }

    // Get post request body
    const { firstName, lastName, email, password } = req.body;

    // Try to find existing user, if exists, then return error
    try {
      // Check that the email doesn't already exist
      let user = await User.findOne({
        $or: [
          { email },
          { email: email.toLowerCase() },
          { email: email.toUpperCase() },
        ],
      });

      // If user exists, return error
      if (user) {
        return res.status(400).send('Email already exists!');
      }

      // Create new user in database
      user = new User({
        firstName,
        lastName,
        password,
        email,
      });

      // Save the user
      await user.save();

      // Get auth payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generate JWT token
      const token = await jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000,
      });

      // Send the JWT token to front end
      return res.json({ token });
    } catch (err) {
      // Return error
      console.error(err.message);
      return res.status(500).send(err.message);
    }
  }
);

// Export router
module.exports = router;
