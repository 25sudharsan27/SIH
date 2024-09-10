const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    companyname: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
        type :String,
        required: true,
    },
    logo: String,
    location: String,
    country: {
       type : String,
       required : true,
    },
    city: {
      type : String,
      required : true,
    }
    ,
    state:{
      type : String,
      required : true,
    },
    about: String,
    jobs: [String],
    followers :[String],
    connections : [String],
    pendingJobs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    }],
    acceptedJobs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
