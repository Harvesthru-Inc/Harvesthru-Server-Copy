// Configure .env
require('dotenv').config();

// Import libraries
const express = require('express');
const apiRoutes = require('./src/api');
const connectDB = require('./config/db');

// Get express
const app = express();

// Connect Database, see config folder for implementation
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Api routes
app.use('/api', apiRoutes);

// Main route
app.use('/', (req, res) => {
  res.send('Harvesthru Server is running!');
});

// Init port for listening
const PORT = process.env.PORT || 8000;

// Listen on said port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
