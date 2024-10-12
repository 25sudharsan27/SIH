const express = require("express");
const router = express.Router();
const jobModel = require("../../models/public/jobsModel");

const jobdetails = async (req, res) => {
    try {
        const jobId = req.body.job_id; // Change to accept a single job ID
        const job = await jobModel.findOne({ _id: jobId, status: "open" }).lean();
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: job,
            message: "Job found",
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
