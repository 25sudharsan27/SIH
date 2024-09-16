const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    organization : Boolean,
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
    followers :[String],
    connections : [String],
    posted_jobs:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    }],
    closed_jobs:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    }],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
