const jobModel = require("../../models/public/jobsModel");

const organizationModel = require("../../models/organizationModel");


const AddJob = async(req,res)=>{

    

    try{
        

        const {user_id,title,description,link,skills,city,state,country,workMode,experienceLevel,opening,extra_questions,status} = req.body;
        
        const org = organizationModel.findOne({user_id : user_id});

        if(!title || !description || !skills || !city || !state  || !experienceLevel || ! user_id || !country  || !link){
            throw new Error("All fields are required");
        }
        const job = new jobModel({
            user_id,
            title,
            description,
            link,
            skills,
            city,
            state,
            country,
            workMode,
            experienceLevel,
            "company" : org.companyname,
            opening,
            extra_questions,
            status
        });
        const jobdata = await job.save();
        res.status(200).json({
            message : "Job added successfully",
            data : jobdata,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}


module.exports = AddJob;