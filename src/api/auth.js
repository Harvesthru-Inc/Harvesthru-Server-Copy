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
    res.send('hello');
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

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get the email and password from login request
    const { email, password } = req.body;

    // Find user in database
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // If user exists, generate auth payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign JWT and return as response
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );

      // Return use as response
      return res.json({ user });
    } catch (err) {
      // Return error
      console.error(err.message);
      return res.status(500).send('Server error');
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
    check('username', 'Username cannot be blank!').not().isEmpty(),
    check('email', 'Email cannot be blank!').not().isEmpty(),
    check('password', 'Password cannot be blank!').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
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
    const { firstName, lastName, username, email, password } = req.body;

    // Try to find existing user, if exists, then return error
    try {
      // Check that the username doesn't already exist
      let user = await User.findOne({ username });

      // If user exists, return error
      if (user) {
        return res.status(400).send('Username already exists!');
      }

      // Check that the email doesn't already exist
      user = await User.findOne({
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
        username,
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
      const token = jwt.sign(payload, config.get('jwtSecret'), {
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
