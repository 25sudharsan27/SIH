const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');


router.post('/send', authMiddleware, chatController.sendMessage);

router.post(
  '/send-file',
  authMiddleware,
  uploadMiddleware.single('file'),
  chatController.sendFile
);

module.exports = router;
