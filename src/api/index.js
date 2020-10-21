// Import express and authentication function
const express = require('express');
const auth = require('./auth');
const farm = require('./farm');

// Initialize router
const router = express.Router();

// Use auth route
router.use('/auth', auth);

// Use auth route
router.use('/farm', farm);

// Export auth
module.exports = router;
