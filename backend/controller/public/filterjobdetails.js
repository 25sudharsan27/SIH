const express = require("express");
const router = express.Router();
const cookieparser = require('cookie-parser');
const jobModel = require("../../models/public/jobsModel");

const filterjobdetails = async (req, res) => {
  try {
    const { location, country, city, experienceLevel, workMode } = req.body;

    // Build the filter object with only provided fields
    const filter = {};
    if (location) filter.location = location;
    if (country) filter.country = country;
    if (city) filter.city = city;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (workMode) filter.workMode = workMode;

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
