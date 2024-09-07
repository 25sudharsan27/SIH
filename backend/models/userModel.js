const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    profilepic: String,
    age: Number,
    jobseeker: Boolean,
    about: String,
    skills: [String],
    projects: [
      {
        title: String,
        description: String,
        link: String,
        media: [String], // Array of image URLs
      },
    ],
    jobs: [
      {
        title: String,
        description: String,
        link: String,
        media: [String], // Array of image URLs
        experienceLevel: String, // e.g., Junior, Mid, Senior
        workMode: {
          type: String,
          enum: ["remote", "on-site", "hybrid"], // Possible work modes
        },
        country: String,
        city: String,
        location: String,
        company: String,
         // Location of the job
      },
    ],
    experiences: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
        media: [String], // Array of image URLs
      },
    ],
    volunteering: [
      {
        title: String,
        organization: String,
        startDate: Date,
        endDate: Date,
        description: String,
        media: [String], // Array of image URLs
      },
    ],
    education: [
      {
        title: String,
        institution: String,
        startDate: Date,
        endDate: Date,
        description: String,
        media: [String], // Array of image URLs
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
