const express = require('express');
const Post = require('./models/post'); // Ensure you have the correct path to your model
const router = express.Router();

function getposts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

module.exports = getposts;
