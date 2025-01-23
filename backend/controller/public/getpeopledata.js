

const express = require('express');
const User = require('../../models/userModel'); // Ensure you have the correct path to your model

// Define the getprofdata function
const getprofdata = async (req, res) => {
    try {
        console.log("hi everyone");

        const user = await User.find();
        res.status(200).json(
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
module.exports = getprofdata;
