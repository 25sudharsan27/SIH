const express = require("express");
const router = express.Router();
const mcqModel = require("../../models/mcqModel");

const mcqtest = async (req, res) => {
  try {
    const {id} = req.body;

    
    // Build the filter object with only provided fields
    const data = await  mcqModel.findOne({"_id":id})
    
    console.log("found "+data);


    res.json({
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
