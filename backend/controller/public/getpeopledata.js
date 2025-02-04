const express = require('express');
const User = require('../../models/userModel'); // Ensure you have the correct path to your model

// Define the getprofdata function
const getprofdata = async (req, res) => {
    try {
        const { query = '', page = 1 } = req.body; // Default page to 1 if not provided

        // Prepare query filter
        const filter = { name: { $regex: query, $options: 'i' } }; // Case-insensitive regex search

        // Calculate the total number of users matching the query (without fetching all data)
        const totalUsers = await User.countDocuments(filter);

        // Pagination settings
        const usersPerPage = 6;

        // Retrieve the users for the current page
        const users = await User.find(filter)
            .skip((page - 1) * usersPerPage)  // Skip users based on page number
            .limit(usersPerPage);             // Limit to usersPerPage

        const totalPages = Math.ceil(totalUsers / usersPerPage); // Calculate total pages

        res.status(200).json({
            totalPages,
            error: false,
            data: users
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Export the router
module.exports = getprofdata;
