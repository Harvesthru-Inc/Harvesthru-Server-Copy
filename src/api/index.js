// Import express and authentication function
const express = require('express');
const auth = require('./auth');

// Initialize router
const router = express.Router();

// Use auth route
router.use('/auth', auth);

// Export auth
module.exports = router;
