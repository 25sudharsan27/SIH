const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Create Notification
router.post('/notifications', notificationController.createNotification);

module.exports = router;
