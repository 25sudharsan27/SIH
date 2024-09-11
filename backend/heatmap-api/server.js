const express = require('express');
const connectDB = require('./config/db');
const heatmapRoute = require('./routes/heatmap');
const path = require('path');
require('dotenv').config();  // Load environment variables

const app = express();

// Connect to MongoDB using the environment variable
connectDB(process.env.MONGO_URI);

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle routes
app.use('/api', heatmapRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
