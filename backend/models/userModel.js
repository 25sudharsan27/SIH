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
        media: [String], 
      },
    ],
    codingplatforms:{
      codechef :String,
      codeforces: String,
      leetcode: String,
      hackerrank: String,
      github: String,
    },
    jobs: [
      String 
    ],
    experiences: [
      {
        pic: String,
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
        media: [String], 
      },
    ],
    volunteering: [
      {
        title: String,
        organization: String,
        startDate: Date,
        endDate: Date,
        description: String,
        media: [String],
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
        media: [String], 
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
    
    applied_jobs: [{
      job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs"
      },
      application_status: {
        type: String,
        enum: ['applied', 'in_progress', 'selected', 'rejected'],
        default: 'applied'
      },
      current_stage: {
        type: Number,
        default: 0
      },
      applied_at: {
        type: Date,
        default: Date.now
      },
      last_updated: {
        type: Date,
        default: Date.now
      }
    }],
    notifications: {
      email_updates: {
        type: Boolean,
        default: true
      },
      application_updates: {
        type: Boolean,
        default: true
      }
    },
    tagline : String,
    portfolio : String,
    about:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
