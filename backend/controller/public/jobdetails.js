const express = require("express")




const router = express.Router();

const cookieparser = require('cookie-parser');
const jobModel = require("../../models/public/jobsModel");


const jobdetails = async (req,res) => {
    try{
        
        // console.log(user);
        const {query,page,experience} = req.body;        

        var user = await jobModel.find({status : "open",
            title : { $regex: query, $options: 'i' },
            experienceLevel : { $regex: experience, $options: 'i' }
        }); // Use lean() to return a plain object

        var totalPages = Math.ceil(user.length/6);
        if(page){
            const start = (page-1)*6;
            const end = page*6;
            user = user.slice(start,(end>user.length)?user.length:end);
        }
        console.log(user);

        res.status(200).json({
            totalPages : totalPages,
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