const jobModel = require("../models/public/jobsModel");
const organizationModel = require("../models/organizationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const Job = require("../models/public/jobsModel");

const AddJob = async (req, res) => {
  try {
    const { title, description, link, skills, city, state, country, workMode, experienceLevel, opening, extra_questions, status,stipend,requirements,benefits,responsibilities } = req.body;
    const user_id = req.user_id; 

    if (!user_id) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
        error: true
      });
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
      res.status(400).json({
        message: "All fields are required except stipend, requirements, benefits, responsibilities",
        success: false,
        error: true
      });
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
    org.posted_jobs.push(jobdata._id);
    const org_data = await org.save(); 

    res.status(201).json({
      message: "Job added successfully",
      data: jobdata,
      organization: org_data,
      success: true,
      error: false
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      success: false,
      error: true
    });
  }
};

const updateOrganizationDetails = async (req, res) => {
  try {
    const {  about,country,name,city,state,jobs } = req.body;
    const user_id = req?.user_id;

    if(!user_id){
       return res.status(401).json({
        message: "Unauthorized access",
        success: false,
        error: true
      });
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


const updateAboutOrganization = async (req, res) => {
  try {
    const {  about} = req.body;
    const user_id = req?.user_id;    
    if(!user_id){
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
        error: true
      });
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

    const updatedOrganization = await organization.save();

    res.status(200).json({
      message: "Organization details updated successfully",
      success: true,
      data: updatedOrganization,
    });
  } catch (err) {
    res.status(500).json({
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
    
    if (!use_id) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
        error: true
      });
    }

    if (!org_email) {
      return res.status(400).json({
        message: "Organization email is required",
        success: false,
        error: true
      });
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
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};


const getClosedJobs = async (req, res) => {
  try {
    const user_id = req.user_id;

    const organization = await organizationModel.findOne({"_id":user_id});
    const closed = await jobModel.find({user_id : organization._id, status : "closed"});
    
    res.status(200).json({
      message: "close jobs fetched successfully",
      success: true,
      opened_jobs : closed
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

const getOpenJobs = async (req, res) => {
  try {
    
    const user_id = req.user_id;
    const organization = await organizationModel.findOne({"_id":user_id});
    const opened = await jobModel.find({user_id : organization._id, status : "open"});
    
    res.status(200).json({
      message: "opened jobs fetched successfully",
      success: true,
      opened_jobs : opened
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};


const organizationDetailsById = async (req,res) => {
    try{
        
        const org = await organizationModel.findById(req.user_id);
        if(!org){
            return res.status(404).json({
                message : "Organization not found",
                error : true,
                success : false
            })
        }
        res.status(200).json({
            data : org,
            error : false,
            success : true
        })
    }
    catch(err){
        res.status(500).json({
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
        const { email, name, password, country, city, state } = req.body;
        if (!email || !name || !password || !country || !city || !state) {
            return res.status(400).json({
                message: 'All fields are required',
                error: true,
                success: false
            });
        }
        const organization = await organizationModel.findOne({email});
        
        if(organization){
            res.status(409).json({
                message : "Organization Already Exists",
                error : true,
                success : false
            })
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
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
const userDetailsController= async(req,res) => {
    try{
        if(!req.body.user_id){
            return res.status(400).json({
                message : "User ID is required",
                error : true,
                success : false
            })
        }
        const user = await userModel.findById(req.body.user_id);
        if(!user){
            res.status(404).json({
                message : "User not found",
                error : true,
                success : false
            })
        }
        res.status(200).json({
            data : user,
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
const DEFAULT_STAGES = [
  { stage_name: "CV Screening", stage_order: 1, stage_description: "Initial resume review" },
  { stage_name: "Online Test", stage_order: 2, stage_description: "Technical assessment" },
  { stage_name: "Technical Interview", stage_order: 3, stage_description: "Technical interview round" },
  { stage_name: "HR Round", stage_order: 4, stage_description: "HR interview" },
  { stage_name: "Final Decision", stage_order: 5, stage_description: "Final hiring decision" }
];

// Create a new job
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      link,
      skills,
      city,
      state,
      country,
      workMode,
      experienceLevel,
      opening,
      extra_questions,
      stipend,
      requirements,
      benefits,
      responsibilities,
      custom_stages
    } = req.body;
    const user_id = req.user_id; // Assuming user_id is passed in the request body or headers

    const application_stages = custom_stages && custom_stages.length > 0 
      ? custom_stages 
      : DEFAULT_STAGES;
    console.log({
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
      opening,
      extra_questions,
      stipend,
      requirements,
      benefits,
      responsibilities,
      application_stages
    })
    const newJob = new Job({
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
      opening,
      extra_questions,
      stipend,
      requirements,
      benefits,
      responsibilities,
      application_stages
    });

    const savedJob = await newJob.save();
    res.status(201).json({ success: true, data: savedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get posted jobs for organization
const getPostedJobs = async (req, res) => {
  try {
    const { orgId } = req.params;
    const jobs = await Job.find({ user_id: orgId }).sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get job details
const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('applicants.id', 'name email tagline city state country');
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get applicants by stage
// Controller: getApplicantsByStage\


const getJobDetailById = async (req,res) => {
    try{
        const {job_id} = req.params;
        if(!job_id){
            return res.status(400).json({
                message : "job_id is required",
                error : true,
                success : false
            })
        }
          const job = await jobModel.findOne({"_id" : job_id},{
            title: 1,
            description: 1,
            link: 1,
            experienceLevel: 1,
            workMode: 1,
            country: 1,
            city: 1,
            state: 1,
            stipend: 1,
            company: 1,
            opening: 1,
            skills: 1,
            requirements: 1,
            benefits: 1,
            responsibilities: 1
        }); 


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



const getApplicantsByStage = async (req, res) => {
  try {
    const { jobId, stage } = req.params;
    const stageIndex = parseInt(stage);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const job = await Job.findById(jobId).populate('applicants.id', 'name email tagline city state country about experiences education skills');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const applicantsAtStage = job.applicants.filter(applicant => 
      applicant.current_stage === stageIndex
    );

    const totalApplicants = applicantsAtStage.length;
    const totalPages = Math.ceil(totalApplicants / limit);
    const paginatedApplicants = applicantsAtStage.slice((page - 1) * limit, page * limit);

    res.json({
      success: true,
      data: {
        job: job,
        applicants: paginatedApplicants,
        totalApplicants,
        totalPages,
        currentPage: page,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Move applicant to next stage
const moveApplicantToNextStage = async (req, res) => {
  try {
    const { jobId, applicantId, decision, comments } = req.body;
    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const applicant = job.applicants.id(applicantId);
    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Applicant not found' });
    }

    const currentStage = job.application_stages[applicant.current_stage];
    
    // Update stage history
    applicant.stage_history.push({
      stage_name: currentStage.stage_name,
      stage_order: currentStage.stage_order,
      status: decision, // 'passed' or 'failed'
      comments: comments || '',
      updated_at: new Date(),
      updated_by: req.user_id // Assuming user is authenticated
    });

    if (decision === 'passed') {
      if (applicant.current_stage < job.application_stages.length - 1) {
        applicant.current_stage += 1;
        applicant.overall_status = 'in_progress';
      } else {
        applicant.overall_status = 'selected';
      }
    } else {
      applicant.overall_status = 'rejected';
    }

    await job.save();

    // Update user's applied_jobs status
    await userModel.findByIdAndUpdate(
      applicant.id,
      {
        $set: {
          'applied_jobs.$[elem].application_status': applicant.overall_status,
          'applied_jobs.$[elem].current_stage': applicant.current_stage,
          'applied_jobs.$[elem].last_updated': new Date()
        }
      },
      {
        arrayFilters: [{ 'elem.job_id': jobId }]
      }
    );

    res.json({ success: true, message: 'Applicant status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const moveApplicantsBulk = async (req, res) => {
  try {
    const { jobId, applicantIds, decision, comments } = req.body;
    
    // Validate input
    if (!jobId || !applicantIds || !Array.isArray(applicantIds) || applicantIds.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Job ID and applicant IDs are required' 
      });
    }

    if (!['passed', 'failed'].includes(decision)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Decision must be either "passed" or "failed"' 
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const results = {
      successful: [],
      failed: []
    };

    // Process each applicant
    for (const applicantId of applicantIds) {
      try {
        const applicant = job.applicants.id(applicantId);
        if (!applicant) {
          results.failed.push({
            applicantId,
            error: 'Applicant not found'
          });
          continue;
        }

        const currentStage = job.application_stages[applicant.current_stage];
        if (!currentStage) {
          results.failed.push({
            applicantId,
            error: 'Current stage not found'
          });
          continue;
        }

        // Update stage history
        applicant.stage_history.push({
          stage_name: currentStage.stage_name,
          stage_order: currentStage.stage_order,
          status: decision,
          comments: comments || '',
          updated_at: new Date(),
          updated_by: req.user.id
        });

        // Update applicant status based on decision
        if (decision === 'passed') {
          if (applicant.current_stage < job.application_stages.length - 1) {
            applicant.current_stage += 1;
            applicant.overall_status = 'in_progress';
          } else {
            applicant.overall_status = 'selected';
          }
        } else {
          applicant.overall_status = 'rejected';
        }

        results.successful.push({
          applicantId,
          newStage: applicant.current_stage,
          newStatus: applicant.overall_status
        });

      } catch (error) {
        results.failed.push({
          applicantId,
          error: error.message
        });
      }
    }

    // Save job with all applicant updates
    await job.save();

    // Update users' applied_jobs status for successful applicants
    const userUpdates = results.successful.map(async (result) => {
      try {
        await User.findByIdAndUpdate(
          result.applicantId,
          {
            $set: {
              'applied_jobs.$[elem].application_status': result.newStatus,
              'applied_jobs.$[elem].current_stage': result.newStage,
              'applied_jobs.$[elem].last_updated': new Date()
            }
          },
          {
            arrayFilters: [{ 'elem.job_id': jobId }]
          }
        );
      } catch (error) {
        console.error(`Error updating user ${result.applicantId}:`, error);
      }
    });

    await Promise.all(userUpdates);

    // Prepare response
    const response = {
      success: true,
      message: `Bulk update completed. ${results.successful.length} applicants updated successfully.`,
      results: {
        totalProcessed: applicantIds.length,
        successful: results.successful.length,
        failed: results.failed.length,
        details: results
      }
    };

    // If some failed, include warning
    if (results.failed.length > 0) {
      response.message += ` ${results.failed.length} applicants failed to update.`;
      response.warning = 'Some applicants could not be updated. Check details for more information.';
    }

    res.json(response);

  } catch (error) {
    console.error('Bulk applicant update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during bulk update',
      error: error.message 
    });
  }
};

// Alternative version with transaction for better consistency
const moveApplicantsBulkWithTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { jobId, applicantIds, decision, comments } = req.body;
    
    // Validate input
    if (!jobId || !applicantIds || !Array.isArray(applicantIds) || applicantIds.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Job ID and applicant IDs are required' 
      });
    }

    if (!['passed', 'failed'].includes(decision)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Decision must be either "passed" or "failed"' 
      });
    }

    const job = await Job.findById(jobId).session(session);
    if (!job) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const results = {
      successful: [],
      failed: []
    };

    // Process each applicant
    for (const applicantId of applicantIds) {
      try {
        const applicant = job.applicants.id(applicantId);
        if (!applicant) {
          results.failed.push({
            applicantId,
            error: 'Applicant not found'
          });
          continue;
        }

        const currentStage = job.application_stages[applicant.current_stage];
        if (!currentStage) {
          results.failed.push({
            applicantId,
            error: 'Current stage not found'
          });
          continue;
        }

        // Update stage history
        applicant.stage_history.push({
          stage_name: currentStage.stage_name,
          stage_order: currentStage.stage_order,
          status: decision,
          comments: comments || '',
          updated_at: new Date(),
          updated_by: req.user.id
        });

        // Update applicant status based on decision
        if (decision === 'passed') {
          if (applicant.current_stage < job.application_stages.length - 1) {
            applicant.current_stage += 1;
            applicant.overall_status = 'in_progress';
          } else {
            applicant.overall_status = 'selected';
          }
        } else {
          applicant.overall_status = 'rejected';
        }

        results.successful.push({
          applicantId,
          newStage: applicant.current_stage,
          newStatus: applicant.overall_status
        });

      } catch (error) {
        results.failed.push({
          applicantId,
          error: error.message
        });
      }
    }

    // Save job with all applicant updates
    await job.save({ session });

    // Update users' applied_jobs status for successful applicants
    const userUpdates = results.successful.map(async (result) => {
      return User.findByIdAndUpdate(
        result.applicantId,
        {
          $set: {
            'applied_jobs.$[elem].application_status': result.newStatus,
            'applied_jobs.$[elem].current_stage': result.newStage,
            'applied_jobs.$[elem].last_updated': new Date()
          }
        },
        {
          arrayFilters: [{ 'elem.job_id': jobId }],
          session
        }
      );
    });

    await Promise.all(userUpdates);

    // Commit transaction
    await session.commitTransaction();

    // Prepare response
    const response = {
      success: true,
      message: `Bulk update completed. ${results.successful.length} applicants updated successfully.`,
      results: {
        totalProcessed: applicantIds.length,
        successful: results.successful.length,
        failed: results.failed.length,
        details: results
      }
    };

    // If some failed, include warning
    if (results.failed.length > 0) {
      response.message += ` ${results.failed.length} applicants failed to update.`;
      response.warning = 'Some applicants could not be updated. Check details for more information.';
    }

    res.json(response);

  } catch (error) {
    await session.abortTransaction();
    console.error('Bulk applicant update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during bulk update',
      error: error.message 
    });
  } finally {
    session.endSession();
  }
};

// Update applicant status (for bulk actions)
const updateApplicantStatus = async (req, res) => {
  try {
    const { jobId, applicantIds, decision, comments } = req.body;
    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    for (const applicantId of applicantIds) {
      const applicant = job.applicants.id(applicantId);
      if (applicant) {
        const currentStage = job.application_stages[applicant.current_stage];
        
        applicant.stage_history.push({
          stage_name: currentStage.stage_name,
          stage_order: currentStage.stage_order,
          status: decision,
          comments: comments || '',
          updated_at: new Date(),
          updated_by: req.user.id
        });

        if (decision === 'passed') {
          if (applicant.current_stage < job.application_stages.length - 1) {
            applicant.current_stage += 1;
            applicant.overall_status = 'in_progress';
          } else {
            applicant.overall_status = 'selected';
          }
        } else {
          applicant.overall_status = 'rejected';
        }

        // Update user's applied_jobs status
        await User.findByIdAndUpdate(
          applicant.id,
          {
            $set: {
              'applied_jobs.$[elem].application_status': applicant.overall_status,
              'applied_jobs.$[elem].current_stage': applicant.current_stage,
              'applied_jobs.$[elem].last_updated': new Date()
            }
          },
          {
            arrayFilters: [{ 'elem.job_id': jobId }]
          }
        );
      }
    }

    await job.save();
    res.json({ success: true, message: 'Applicants status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Apply to job
const applyToJob = async (req, res) => {
  try {
    const { jobId, extra_questions_answers, resume, skills } = req.body;
    const userId = req.user_id;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if user already applied
    const existingApplication = job.applicants.find(app => app.id.toString() === userId);
    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied to this job' });
    }

    // Add applicant to job
    const newApplicant = {
      id: userId,
      extra_questions: extra_questions_answers || [],
      resume: resume || '',
      skills: skills || [],
      current_stage: 0,
      stage_history: [{
        stage_name: job.application_stages[0].stage_name,
        stage_order: job.application_stages[0].stage_order,
        status: 'pending',
        comments: 'Application submitted',
        updated_at: new Date()
      }],
      overall_status: 'applied',
      applied_at: new Date()
    };

    job.applicants.push(newApplicant);
    await job.save();

    // Add to user's applied jobs\
    
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        applied_jobs: {
          job_id: jobId,
          application_status: 'applied',
          current_stage: 0,
          applied_at: new Date()
        }
      }
    });

    res.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's applications
// controller/user.controller.js or wherever your controller is defined
const getMyApplications = async (req, res) => {
  try {
    const userId = req.user_id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Token Not Provided or it got Expired"
      });
    }

    const {
      page = 1,
      limit = 10,
      filter = 'all',
      sortBy = 'applied_at',
      sortOrder = 'desc'
    } = req.query;

    const user = await userModel.findById(userId).populate({
      path: 'applied_jobs.job_id',
      select: 'title  city state country workMode experienceLevel stipend application_stages companyname'
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let applications = user.applied_jobs || [];

    // Filtering
    if (filter !== 'all') {
      applications = applications.filter(app => app.application_status === filter);
    }

    // Sorting
    applications.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'applied_at':
          aValue = new Date(a.applied_at);
          bValue = new Date(b.applied_at);
          break;
        case 'last_updated':
          aValue = new Date(a.last_updated);
          bValue = new Date(b.last_updated);
          break;
        case 'job_title':
          aValue = a.job_id?.title || '';
          bValue = b.job_id?.title || '';
          break;
        case 'company':
          aValue = a.job_id?.company || '';
          bValue = b.job_id?.company || '';
          break;
        default:
          aValue = new Date(a.applied_at);
          bValue = new Date(b.applied_at);
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    // Pagination
    const total = applications.length;
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const paginatedApplications = applications.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      success: true,
      data: paginatedApplications,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// Get application status for specific job
const getApplicationStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user_id;
    const job = await jobModel.findById(jobId).populate('user_id', 'companyname');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const applicant = job.applicants.find(app => app.id.toString() === userId);
    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    console.log(job);

    res.json({ 
      success: true, 
      data: {
        job: {
          title: job.title,
          company: job.user_id.companyname,
          application_stages: job.application_stages
        },
        application: {
          extra_questions: applicant.extra_questions,
          current_stage: applicant.current_stage,
          overall_status: applicant.overall_status,
          stage_history: applicant.stage_history,
          applied_at: applicant.applied_at
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCountofApplicationStatus = async (req, res) => {
  try {
    const {jobId} = req.params;
    if(!jobId) {
      return res.status(400).json({ success: false, message: 'Job ID is required' });
    }
    const job = await Job.findById(jobId);
    const obj = {};
    for(const stage of job.application_stages) {
      obj[stage.stage_name] = 0;
    }
    for(const applicant of job.applicants) {
      const stageName = job.application_stages[applicant.current_stage].stage_name;
      if(obj[stageName] !== undefined) {
        obj[stageName]++;
      }
    }
    res.json({ success: true, data: obj });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Update job stages
const updateJobStages = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { stages } = req.body;
    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    job.application_stages = stages;
    await job.save();

    res.json({ success: true, message: 'Job stages updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Close job
const closeJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await Job.findByIdAndUpdate(jobId, { status: 'closed' }, { new: true });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, message: 'Job closed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
    AddJob,
    updateOrganizationDetails,
    closeJobByOrganization,
    getClosedJobs,
    getOpenJobs,
    organizationDetailsById,
    organizationSignIn,
    organizationSignUp,
    updateAboutOrganization,
    userDetailsController,
    createJob,
    getPostedJobs,
    getJobDetails,
    getApplicantsByStage,
    moveApplicantToNextStage,
    updateApplicantStatus,
    applyToJob,
    getMyApplications,
    getApplicationStatus,
    updateJobStages,
    closeJob,
    moveApplicantsBulk,
    moveApplicantsBulkWithTransaction,
    getJobDetailById,
    getCountofApplicationStatus

}