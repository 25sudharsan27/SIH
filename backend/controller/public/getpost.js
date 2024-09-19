const express = require('express');
const Post = require('../../models/posts'); // Ensure you have the correct path to your model

// Define the getposts function
const getposts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(
            {
            "data" :posts
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

// Export the router
module.exports = getposts;
