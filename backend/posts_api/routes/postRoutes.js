const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { upload } = require('../services/cloudinaryService');
const authMiddleware = require('../middleware/authMiddleware');

// Create post with media
router.post('/posts', authMiddleware, upload.single('media'), postController.createPost);

// Search posts by hashtags or content
router.get('/posts/search', postController.searchPosts);

module.exports = router;
