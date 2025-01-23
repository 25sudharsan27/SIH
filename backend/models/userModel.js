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
    about: String,
    skills: [String],
    country :String,
    state :String,
    city :String,
    projects: [
      {
        title: String,
        description: String,
        link: String,
        media: [String], // Array of image URLs
      },
    ],
    jobs: [
      String // store the job id
    ],
    experiences: [
      {
        pic: String,
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
        pic:String,
        title: String,
        institution: String,
        startDate: Date,
        endDate: Date,
        description: String,
        media: [String], // Array of image URLs
      },
    ],
    social: {
      linkedin: String,
      twitter: String,
      github: String,
      portfolio: String,
    },
    followers :[String],
    following: [String],
    connections : [String],
    pendingconnections_to_you :[String],
    waitingconnections_for_you :[String],
    applied_jobs : [
      {
        type :mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
      }
    ],
    tagline : String,
    portfolio : String,
    about:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
