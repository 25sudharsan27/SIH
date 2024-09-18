const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { initWebSocket } = require('./services/websocketService');

dotenv.config();

const app = express();
app.use(express.json());

const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Use routes
app.use(postRoutes);
app.use(commentRoutes);
app.use(notificationRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize WebSocket
const server = app.listen(5000, () => console.log('Server running on port 5000'));
initWebSocket(server);
