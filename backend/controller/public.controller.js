const postModel =require("../models/posts");
const bcrypt = require("bcryptjs");
const mcqModel = require("../models/mcqModel")
const jobModel = require("../models/public/jobsModel");
const Post = require('../models/posts'); // Ensure you have the correct path to your model
const User = require("../models/userModel");
const Job = require("../models/public/jobsModel");



const AddPost = async(req,res)=>{
    try{        
        const description = req.body.description;
        const title = req.body.title;
        const user_id = req.user_id;

        if(!description || !title || !user_id){
            return res.status(400).json({
                message : "description, title and user_id are required",
                error : true,
                success : false
            })
        }

        const postdata = postModel({
            description : description,
            title : title,
            user_id : user_id
        })

        const data = postdata.save();
    
        res.status(201).json({
            data : data,
            success:true,
            error:false,
            message : "User created Successfully"
        })
        
    }catch(error){
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


const filterJobDetails = async (req, res) => {
  try {
    const { experienceLevel, search } = req.body;

    const filter = {};
    if (experienceLevel) filter.experienceLevel = experienceLevel;

    if (search) {
      filter.title = { $regex: search, $options: "i" }; 
    }

    const jobs = await jobModel.find(filter).lean();

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found matching the filter criteria.",
        data: [],
        error: false,
        success: true
      });
    }

    res.status(200).json({
      data: jobs,
      message: "Jobs retrieved successfully",
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



const getMcqTests = async (req, res) => {
    try {  
      const data = await  mcqModel.find({})

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
  

const getMcqTestById = async (req, res) => {
    try {
      const {id} = req.body;
  
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
  
const jobDetailsById = async (req, res) => {
    try {
        const jobId = req.body.job_id;

        if (!jobId) {
            new Error("Job ID is required");
        }
        const job = await jobModel.findOne({ _id: jobId, status: "open" }).lean();
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: job,
            message: "Job found",
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


const getPeoplesData = async (req, res) => {
    try {
        const { query = '', page = 1 } = req.body; 

        const filter = { name: { $regex: `^${query}`, $options: 'i' } };

        const usersPerPage = 6;
        const skipCount = (page - 1) * usersPerPage;

        const result = await User.aggregate([
            {
                $match: filter,  
            },
            {
                $facet: {
                    totalCount: [{ $count: "count" }],  
                    users: [{ $skip: skipCount }, { $limit: usersPerPage }]  
                }
            }
        ]);

        const totalUsers = result[0]?.totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalUsers / usersPerPage); 

        res.status(200).json({
            totalPages,
            error: false,
            data: result[0]?.users || []
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

const getPostsData = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(
            {
            "data" :posts
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};


const getJobDetailsByFilter = async (req, res) => {
  try {
    const { query, page = 1, experience } = req.body; 

    const filter = { status: "open" };
    if (query) {
      filter.title = { $regex: query, $options: 'i' }; 
    }
    if (experience) {
      filter.experienceLevel = { $regex: experience, $options: 'i' }; 
    }

    const totalJobs = await jobModel.countDocuments(filter);

    const jobsPerPage = 6;
    const jobs = await jobModel
      .find(filter)
      .skip((page - 1) * jobsPerPage) 
      .limit(jobsPerPage);          

    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    res.status(200).json({
      totalPages,
      data: jobs,
      message: "working well",
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

const getProfileDataById = async (req, res) => {
    try {
        const {id} = req.body;
        const user = await User.find({_id : id});
        console.log(user);
        res.json(
            {
            "error":false,
            "data" :user
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};


const getJobDetailById = async (req,res) => {
    try{
        const {job_id} = req.body;
        if(!job_id){
            throw new Error("job_id is required");
        }
        const job = await jobModel.findOne({"_id" : job_id}); 
        console.log("job final "+job);

        if(!job){
            return res.status(404).json({
                message : "job not found",
                error : true,
                success : false
            })
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

const getActiveJobById = async (req, res) => {
    try {
        const jobId = req.body.job_id;
        if (!jobId) {
           throw new Error("Job ID is required");
        }
        const job = await jobModel.findOne({ _id: jobId, status: "open" }).lean();
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: job,
            message: "Job found",
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


const addOrUpdateJob = async (req, res) => {
  try {
    const { userId, title, description, link, experienceLevel, workMode, country, city, location, company, opening, skills,requirements,benefits,responsibilities } = req.body;
    
    // Validate input
    if (!userId || !title || !experienceLevel || !workMode) {
      throw new Error("Required fields: userId, title, experienceLevel, and workMode");
    }
    let job;

    User = await User.findById(userId);
    if(!User){
      res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }
    if(User.jobseeker === false){
      res.status(403).json({
        message: "User is not a jobseeker",
        error: true,
        success: false
      });
    }
    
    job = await Job.findOneAndUpdate(
        { title : title, user_id: userId },
        {
          title,
          description,
          link,
          experienceLevel,
          workMode,
          country,
          city,
          location,
          company,
          opening,
          requirements,benefits,responsibilities,
          skills: Array.isArray(skills) ? skills : [skills], // If skills are provided as a string, convert to an array
        },
        { new: true, runValidators: true }
      );

      if (!job) {
        job = new Job({
          user_id: userId,
          title,
          description,
          link,
          experienceLevel,
          workMode,
          country,
          city,
          location,
          company,
          opening,
          requirements,benefits,responsibilities,
          skills: Array.isArray(skills) ? skills : [skills], // If skills are provided as a string, convert to an array
        });
      }
      const savedJob = await job.save();

      res.status(201).json({
        message: "Job added successfully",
        success: true,
        data: savedJob,
      });
      

  } catch (error) {
    res.status(400).json({
      message: error.message || "Error adding or updating job",
      error: true,
      success: false,
    });
  }
};



module.exports = {
    AddPost,
    filterJobDetails,
    getMcqTests,
    getMcqTestById,
    jobDetailsById,
    getPeoplesData,
    getPostsData,
    getActiveJobById,
    getJobDetailsByFilter,
    getProfileDataById,
    getJobDetailById,
    addOrUpdateJob
}