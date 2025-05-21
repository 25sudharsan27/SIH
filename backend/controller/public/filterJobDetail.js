const express = require("express");
const router = express.Router();
const jobModel = require("../../models/public/jobsModel");

const filterjobdetails = async (req, res) => {
  try {
    const { experienceLevel, location, search } = req.body;

    // Build the filter object with only provided fields
    const filter = {};
    if (experienceLevel) filter.experienceLevel = experienceLevel;

    // Uncomment this if you also want to filter by location
    // if (location) {
    //   filter.$or = [
    //     { city: location },
    //     { state: location },
    //     { country: location }
    //   ];
    // }

    // If a search keyword is provided, use a case-insensitive regex to search in job title
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // 'i' makes it case-insensitive
    }

    const jobs = await jobModel.find(filter).lean(); // Use lean() for better performance

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found matching the filter criteria.",
        data: [],
        error: false,
        success: true
      });
    }

    res.status(200).json({
      data: jobs,
      message: "Jobs retrieved successfully",
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

module.exports = filterjobdetails;
