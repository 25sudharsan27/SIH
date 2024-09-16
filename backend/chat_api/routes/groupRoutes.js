const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, groupController.createGroup);

router.post('/add-user', authMiddleware, groupController.addUserToGroup);

router.post('/send-message', authMiddleware, groupController.sendGroupMessage);

module.exports = router;
