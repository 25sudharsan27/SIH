const jobModel = require("../models/public/jobsModel");
const organizationModel = require("../models/organizationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const AddJob = async (req, res) => {
  try {
    const { title, description, link, skills, city, state, country, workMode, experienceLevel, opening, extra_questions, status,stipend,requirements,benefits,responsibilities } = req.body;
    const user_id = req.user_id; 

    if (!user_id) {
      throw new Error("Authentication error");
    }

    const org = await organizationModel.findOne({ "_id": user_id });
    const pic = org?.pic;
    
    if (!org) {
      res.status(404).json({
        message: "Organization not found",
        success: false,
        error: true
      });
    } 

    if (!title || !description || !skills || !city || !state || !experienceLevel || !country || !link) {
      throw new Error("All fields are required");
    }

    const job = jobModel({
      user_id,
      title,
      description,
      link,
      skills,
      pic,
      city,
      state,
      country,
      workMode,
      experienceLevel,
      company: org.companyname,
      opening,
      extra_questions,
      status: "open",
      stipend,
      requirements,benefits,responsibilities
    });

    const jobdata = await job.save();
    console.log(jobdata);
    org.posted_jobs.push(jobdata._id);
    const org_data = await org.save(); 

    res.status(200).json({
      message: "Job added successfully",
      data: jobdata,
      organization: org_data,
      success: true,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true
    });
  }
};

const updateOrganizationDetails = async (req, res) => {
  try {
    const {  about, pic,country,name,city,state,jobs, followers, connections } = req.body;
    const user_id = req?.user_id;
    
    
    if(!user_id){
      throw new Error("may be issue with authentication");
    }

    const organization = await organizationModel.findOne({ "_id" : user_id });
    
    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
        success: false,
        error: true
      });
    }

    if (about) {
      organization.about = about;
    }
    if(req.body.pic){
      organization.pic = req.body.pic;
    }
    if(country){
      organization.country = country;
    }
    if(name){
      organization.companyname = name;
    }
    if(city){
      organization.city = city;
    }
    if(state){
      organization.state = state;
    }
    
    if (jobs) {
      if (Array.isArray(jobs)) {
        for (const job of jobs) {
          const existingJob = await jobModel.findOne({ city: job.city, title: job.title, user_id: organization._id });
          if (!existingJob) {
            // Add new job
            const newJob = new jobModel({ ...job, user_id: organization._id });
            const savedJob = await newJob.save();
            organization.posted_jobs.push(savedJob._id);
            console.log("Job added and saved");
          }
        }
      } else {
        const existingJob = await jobModel.findOne({ city: jobs.city, title: jobs.title, user_id: organization._id });
        if (!existingJob) {
          const newJob = new jobModel({ ...jobs, user_id: organization._id });
          const savedJob = await newJob.save();
          organization.posted_jobs.push(savedJob._id); 
        }
      }
    }

    const updatedOrganization = await organization.save();

    res.status(200).json({
      message: "Organization details updated successfully",
      success: true,
      data: updatedOrganization,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

const closeJobByOrganization = async (req, res) => {
  try {
    const { org_email, jobs, confirm } = req.body;
    const use_id = req.user_id;
    

    if (!org_email) {
      throw new Error("Email is required");
    }

    const organization = await organizationModel.findOne({ "_id": use_id });
    const org_jobs = await jobModel.find({ "user_id": use_id });

    if (!organization) {
      res.status(404).json({
        message: "Organization not found",
        success: false,
        error: true
      });
    }
    if (confirm !== "confirm") {
      return res.status(403).json({
        message: "Please confirm the action",
        success: false,
        error: true
      });
    }

    if (jobs) {
      if (Array.isArray(jobs)) {
        for (const job of jobs) {
          organization.posted_jobs = organization.posted_jobs.filter(j => j.toString() !== job.id.toString());
          const org_job = org_jobs.find(j => j._id.toString() === job.id.toString());
          if (org_job) {
            org_job.status = "closed";
            await org_job.save();
          }
          organization.closed_jobs.push(job.id);
        }
      } 
      else {
        organization.posted_jobs = organization.posted_jobs.filter(j => j.toString() !== jobs.toString());
        const org_job = org_jobs.find(j => j._id.toString() === jobs.toString());
        if (org_job) {
          org_job.status = "closed";
          await org_job.save(); 
        }

        organization.closed_jobs.push(jobs);
      }
    }

    const updatedOrganization = await organization.save();
    const final_org_jobs = await jobModel.find({ "user_id": use_id });

    res.status(200).json({
      message: "Job Closed Successfully",
      success: true,
      data: updatedOrganization,
      final_org_jobs: final_org_jobs,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};


const getClosedJobs = async (req, res) => {
  try {
    const {email} = req.body;
    const user_id = req.user_id;
    console.log(email);
    if (!email) {
      throw new Error("Email is required");
    }

    const organization = await organizationModel.findOne({"_id":user_id});
    const closed = await jobModel.find({user_id : organization._id, status : "closed"});
    
    res.status(200).json({
      message: "close jobs fetched successfully",
      success: true,
      opened_jobs : closed
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

const getOpenJobs = async (req, res) => {
  try {
    const {email} = req.body;
    const user_id = req.user_id;
    console.log(email);
    if (!email) {
      throw new Error("Email is required");
    }

    const organization = await organizationModel.findOne({"_id":user_id});
    const opened = await jobModel.find({user_id : organization._id, status : "open"});
    
    res.status(200).json({
      message: "opened jobs fetched successfully",
      success: true,
      opened_jobs : opened
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};


const organizationDetailsById = async (req,res) => {
    try{
        console.log("user id : ",req.user_id);
        
        const org = await organizationModel.findById(req.user_id);
        res.status(200).json({
            data : org,
            message : "working well ",
            error : false,
            success : true
        })
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

const organizationSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required', 
                error: true, 
                success: false 
            });
        }

        const organization = await organizationModel.findOne({ email });
        if (!organization) {
            return res.status(404).json({ 
                message: 'Organization not found', 
                error: true, 
                success: false 
            });
        }

        const checkPassword = await bcrypt.compare(password, organization.password);
        if (checkPassword) {
            const tokenData = {
                _id: organization._id,
                email: organization.email
            };

            const token = jwt.sign(tokenData, process.env.ORG_TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'None' 
            };

            res.cookie('token', token, tokenOptions).status(200).json({
                data: token,
                message: 'User authenticated successfully',
                error: false,
                success: true
            });
        } else {
            res.status(401).json({ 
                message: 'Incorrect password', 
                error: true, 
                success: false 
            });
        }
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: true,
            success: false
        });
    }
}


const organizationSignUp = async (req,res) =>{
    try{
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const logo = req.body.logo;
        const about = req.body.about;
        const country = req.body.country;
        const city = req.body.city;
        const state = req.body.state;
        const organization = await organizationModel.findOne({email});
        

        if(organization){
            console.log("organization already exists");
            throw new Error ("Organization Already Exists");
        }
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }
        if(!country || !city || !state){
            throw new Error("Please provide location details");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password,salt);
        if(!hashPassword){
            res.status(500).json({
                message : "Password hashing failed, try with different password",
                error : true,
                success : false
            })
        }
        const payload = {
            ...req.body,
            password : hashPassword
        }
        
        const userData = organizationModel(payload)
        const saveUser = await userData.save();
        res.status(201).json({
            data : saveUser,
            success:true,
            error:false,
            message : "Organization created Successfully"
        })
        
    }catch(error){
        console.log("error : ",error.message);
        console.log("pinpili");
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


module.exports = {
    AddJob,
    updateOrganizationDetails,
    closeJobByOrganization,
    getClosedJobs,
    getOpenJobs,
    organizationDetailsById,
    organizationSignIn,
    organizationSignUp
}