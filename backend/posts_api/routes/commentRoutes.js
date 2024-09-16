const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/comments/:id/reply', authMiddleware, commentController.replyToComment);

router.post('/comments/:id/like', authMiddleware, commentController.likeComment);

module.exports = router;
