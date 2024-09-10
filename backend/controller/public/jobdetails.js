const express = require("express")




const router = express.Router();

const cookieparser = require('cookie-parser');
const jobModel = require("../../models/public/jobsModel");


const jobdetails = async (req,res) => {
    try{
        const user = await jobModel.find().lean(); // Use lean() to return a plain object

        res.status(200).json({
            data : user,
            message : "working well ",
            error : false,
            success : true
        }) 
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = jobdetails