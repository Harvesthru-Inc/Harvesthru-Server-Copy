// Install Neccessary dependencies
require('dotenv').config();

const express = require('express');
const apiRoutes = require('./src/api');
const connectDB = require('./config/db');

const app = express();

// Connect Database, see config folder for implementation
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api', apiRoutes);
app.use('/', (req, res) => {
  res.send('Harvesthru Server is running!');
});

// init port for listening
const PORT = process.env.PORT || 8000;

// Listen on said port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
