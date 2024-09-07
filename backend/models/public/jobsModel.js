const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    link: String,
    experienceLevel: {
      type: String, // e.g., Junior, Mid, Senior
      required: true,
    },
    workMode: {
      type: String,
      enum: ["remote", "on-site", "hybrid"], // Possible work modes
      required: true,
    },
    country: String,
    city: String,
    location: String, // Additional details about the job's location
    company: String,
    opening: {
      type: Number,
      default: 1, // Number of job openings
    },
    skills: [String], // Required skills for the job
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);
