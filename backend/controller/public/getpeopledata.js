

const express = require('express');
const User = require('../../models/userModel'); // Ensure you have the correct path to your model

// Define the getprofdata function
const getprofdata = async (req, res) => {
    try {
        console.log("hi everyone");
        
        const {query='',page} = req.body;

        var user = await User.find(
            {
                name : { $regex: query, $options: 'i' }
            }
        );

        var totalPages = Math.ceil(user.length/6);
        if(page){
            const start = (page-1)*6;
            const end = page*6;
            user = user.slice(start,(end>user.length)?user.length:end);
        }

        res.status(200).json(
            {
            "totalPages": totalPages,
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
