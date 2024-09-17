const express = require("express");
const router = express.Router();
const jobModel = require("../../models/public/jobsModel");

const filterjobdetails = async (req, res) => {
  try {
    const { experienceLevel, location } = req.body;

    // Build the filter object with only provided fields
    const filter = {};
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    // if (location) {
    //   filter.$or = [
    //     { city: location },
    //     { state: location },
    //     { country: location }
    //   ];
    // }

    const jobs = await jobModel.find(filter); // Use lean() for better performance

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
