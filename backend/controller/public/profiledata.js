

const express = require('express');
const User = require('../../models/userModel'); // Ensure you have the correct path to your model

// Define the getprofdata function
const getprof = async (req, res) => {
    try {
        const {id} = req.body;
        const user = await User.find({_id : id});
        console.log(user);
        res.json(
            {
            "error":false,
            "data" :user
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

// Export the router
module.exports = getprof;
