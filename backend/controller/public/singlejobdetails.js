const express = require("express")




const router = express.Router();

const cookieparser = require('cookie-parser');
const jobModel = require("../../models/public/jobsModel");


const jobdetails = async (req,res) => {
    try{
        const {job_id} = req.body;
        const job = await jobModel.findOne({"_id" : job_id}); // Use lean() to return a plain object
        console.log("job final "+job);
        if(!job){
            throw new Error("Job not found");
        }
        res.status(200).json({
            data : job,
            message : "job data ",
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