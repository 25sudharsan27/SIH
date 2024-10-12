const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    country: {
      type :String,
      required:true,
    },
    city: {
      type :String,
      required:true,
    },
    state :{
      type :String,
      required:true,
    }, // Additional details about the job's location
    company: String,
    opening: {
      type: Number,
      default: 1, // Number of job openings
    },
    skills: [String], // Required skills for the job
    extra_questions :[String],
    applicants: [
      {
        id :{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
        ,
        extra_questions:[{
          question : String,
          answer : String
        },],
        resume : String,
        skills :[{
          skill : String,
          match : Boolean
        }]
      },
    ],
    status : {
      type : String,
      default : "open"
    },
    stipend : Number,
    requirements :{type : String, required: true},
    benefits :{type : String, required : true},
    responsibilities :{type : String, required : true},

  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);
