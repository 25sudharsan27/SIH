const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: String, // Possible work modes
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
    accepted : Boolean,
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);
