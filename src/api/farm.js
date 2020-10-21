// Import libraries
const express = require('express');

// Import middleWare
const auth = require('../middleware/auth');

// Import models
const Farm = require('../models/Farm');
const Listing = require('../models/Listing');

// Import API Docs
const farmDocs = require('../api-docs/farm-docs');

// Initialize router
const router = express.Router();

// @route    GET api/farm/all_data
// @desc     Test route
// @access   Public
router.get('/all_data', auth, async (req, res) => {
  // Only
  try {
    Farm.find({}, farmDocs.allData)
      .populate('listings', 'coverPhoto pricePerUnit unit')
      .exec((err, result) =>
        err ? console.log(err) : res.json({ farms: result })
      );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  // Get request body
  const { id } = req.params;

  // Get farm with id
  try {
    Farm.findOne({ _id: id }, farmDocs.allData)
      .populate('listings', 'coverPhoto pricePerUnit unit')
      .exec((err, result) =>
        err ? console.log(err) : res.json({ farms: result })
      );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Export router
module.exports = router;
