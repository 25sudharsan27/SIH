const express = require("express");
const router = express.Router();
const mcqModel = require("../../models/mcqModel");

const mcqtest = async (req, res) => {
  try {

    
    // Build the filter object with only provided fields
    const data = await  mcqModel.find({})
    console.log("data 1 : "+data);
 
    res.status(200).json({
      data: data,
      message: "mcq test data recieved",
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

module.exports = mcqtest;
