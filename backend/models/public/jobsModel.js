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
      type: String, 
      required: true,
    },
    workMode: {
      type: String,
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
    },
    company: String,
    pic:String,
    opening: {
      type: Number,
      default: 1,
    },
    skills: [String],
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
    requirements :{type : String},
    benefits :{type : String},
    responsibilities :{type : String},

  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);
