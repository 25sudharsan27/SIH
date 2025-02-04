const express = require("express");
const router = express.Router();
const jobModel = require("../../models/public/jobsModel");

const jobdetails = async (req, res) => {
  try {
    const { query, page = 1, experience } = req.body; // Default page to 1 if not provided

    // Prepare query conditions
    const filter = { status: "open" };
    if (query) {
      filter.title = { $regex: query, $options: 'i' }; // Case-insensitive search
    }
    if (experience) {
      filter.experienceLevel = { $regex: experience, $options: 'i' }; // Case-insensitive search
    }

    // Calculate total number of matching jobs for totalPages (without fetching all data)
    const totalJobs = await jobModel.countDocuments(filter);

    // Paginate and retrieve the matching jobs with skip and limit
    const jobsPerPage = 6;
    const jobs = await jobModel
      .find(filter)
      .skip((page - 1) * jobsPerPage)  // Skip jobs based on page number
      .limit(jobsPerPage);             // Limit to jobsPerPage

    const totalPages = Math.ceil(totalJobs / jobsPerPage); // Calculate total pages

    res.status(200).json({
      totalPages,
      data: jobs,
      message: "working well",
      error: false,
      success: true
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = jobdetails;
