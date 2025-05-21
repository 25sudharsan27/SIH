const express = require('express');
const User = require('../../models/userModel'); // Ensure you have the correct path to your model

// Define the getprofdata function
const getprofdata = async (req, res) => {
    try {
        const { query = '', page = 1 } = req.body; // Default page to 1 if not provided

        // Prepare filter for name search (case-insensitive)
        const filter = { name: { $regex: `^${query}`, $options: 'i' } };

        // Define pagination settings
        const usersPerPage = 6;
        const skipCount = (page - 1) * usersPerPage;

        // Use aggregation to calculate total count and fetch paginated data
        const result = await User.aggregate([
            {
                $match: filter,  // Match users with name similar to the query
            },
            {
                $facet: {
                    totalCount: [{ $count: "count" }],  // Count total number of users
                    users: [{ $skip: skipCount }, { $limit: usersPerPage }]  // Pagination
                }
            }
        ]);

        // Extract the count from the result
        const totalUsers = result[0]?.totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalUsers / usersPerPage); // Calculate total pages

        // Return paginated results
        res.status(200).json({
            totalPages,
            error: false,
            data: result[0]?.users || []
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Export the router
module.exports = getprofdata;
