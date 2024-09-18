const Notification = require('../models/Notification');
const { sendNotification } = require('../services/websocketService');


exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      user: req.body.user,
      type: req.body.type,
      message: req.body.message
    });

    await notification.save();

    sendNotification(JSON.stringify(notification));

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification' });
  }
};
