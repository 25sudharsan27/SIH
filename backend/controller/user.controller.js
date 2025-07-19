const userModel = require("../models/userModel");
const jobModel = require("../models/public/jobsModel")

const { calculateSkillMatch } = require("./utils/skillMatcher");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const updateCodingPlatforms = async (req, res) => {
  try {
    const { codechef, codeforces, leetcode, hackerrank, github } = req.body;
    const user_id = req?.user_id;
    if (!user_id) {
      return res.status(400).json({
        message: "User ID not found",
        error: true,
        success: false,
      });
    }
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    user.codingplatforms = {
      codechef: codechef || user.codingplatforms.codechef,
      codeforces: codeforces || user.codingplatforms.codeforces,
      leetcode: leetcode || user.codingplatforms.leetcode,
      hackerrank: hackerrank || user.codingplatforms.hackerrank,
      github: github || user.codingplatforms.github,
    };
    const updatedUser = await user.save();
    res.status(200).json({
      message: "Coding platforms updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};


const addEducation = async (req, res) => {
  try {
    const education = req.body;
    const user_id = req?.user_id;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID not found",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findById(user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    user.education.push(education);
    const updatedUser = await user.save();

    res.status(201).json({
      message: "Education added successfully",
      success: true,
      data: updatedUser,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};


const updateEducation = async (req, res) => {
  try {
    const education = req.body;
    const user_id = req?.user_id;

    if (!user_id || !education?._id) {
      return res.status(400).json({
        message: "User ID or Education ID not found",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findById(user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    

    const index = user.education.findIndex(e => e._id.toString() === education._id);

    if (index === -1) {
      return res.status(404).json({
        message: "Education entry not found",
        error: true,
        success: false,
      });
    }

    user.education[index] = { ...user.education[index], ...education };
    const updatedUser = await user.save();

    res.status(201).json({
      message: "Education updated successfully",
      success: true,
      data: updatedUser,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const {_id } = req.body;
    const user_id = req?.user_id;

    if (!user_id || !_id) {
      return res.status(400).json({
        message: "User ID or Education ID not provided",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findById(user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const index = user.education.findIndex(e => e._id.toString() === _id);

    if (index === -1) {
      return res.status(404).json({
        message: "Education entry not found",
        error: true,
        success: false,
      });
    }

    user.education.splice(index, 1);
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Education deleted successfully",
      success: true,
      data: updatedUser,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

const addExperience = async (req, res) => {
  try {
    const experience = req.body;
    const user_id = req?.user_id;

    if (!user_id) {
      res.status(400).json({
        message: "User ID not found",
        error: true,
        success: false,
      });
    };

    const user = await userModel.findOne({ _id: user_id });
    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    };

    user.experiences.push(experience);
    const updatedUser = await user.save();

    res.status(201).json({
      message: "Experience added successfully",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};


const updateExperience = async (req, res) => {
  try {
    const experience = req.body;
    const user_id = req?.user_id;

    if (!user_id) {
      res.status(400).json({
        message: "User ID not found",
        error: true,
        success: false,
      });
    };

    const user = await userModel.findOne({ _id: user_id });
    if (!user)  {
      res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    };

    const index = (user.experiences || []).findIndex(
      (e) => e._id.toString() === experience._id
    );

    if (index === -1){
      return res.status(404).json({
        message: "Experience not found",
        error: true,
        success: false,
      });
    }
    user.experiences[index] = {
      ...user.experiences[index],
      ...experience,
    };

    const updatedUser = await user.save();

    res.status(201).json({
      message: "Experience updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { _id } = req.body; // ID of the experience to delete
    const user_id = req?.user_id;

    if (!user_id){
      res.status(400).json({
        message: "User ID not found",
        error: true,
        success: false,
      });
    };

    const user = await userModel.findOne({ _id: user_id });
    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    };

    const index = (user.experiences || []).findIndex(
      (e) => e._id.toString() === _id
    );

    if (index === -1){
      return res.status(404).json({
        message: "Experience not found",
        error: true,
        success: false,
      });
    }
    user.experiences.splice(index, 1);

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Experience deleted successfully",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};



const updateUserDetails = async (req, res) => {
  try {
    const {name,skills, about, projects,tagline,portfolio,city,state,country } = req.body;
    const user_id = req?.user_id;

    if(!user_id){
      return res.status(400).json({
        message: "User ID not found",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({"_id" :user_id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    if(name){
      user.name = name;
    }
   
    if (skills) {
      if (Array.isArray(skills)) {
        user.skills = [...new Set([...user.skills || [], ...skills])]; // Merge arrays and remove duplicates
      } else if (typeof skills === 'string') {
        user.skills = [...new Set([...user.skills || [], skills])]; // Add single string as an array element
      }
    }

    if (about) {
      user.about = about;
    }
    if(tagline){
      user.tagline = tagline;
    }
    if(portfolio){
      user.portfolio = portfolio;
    }
    if(city){
      user.city = city;
    }
    if(state){
      user.state = state;
    }
    if(country){
      user.country = country;
    }
    if(req.body.pic){
      user.profilepic = req.body.pic;
    }

    // Handle projects
    if (projects) {
      if (Array.isArray(projects)) {
        projects.forEach(project => {
          const existingProjectIndex = (user.projects || []).findIndex(p => p.title === project.title);
          if (existingProjectIndex > -1) {
            user.projects[existingProjectIndex] = { ...user.projects[existingProjectIndex], ...project };
          } else {
            user.projects.push(project);
          }
        });
      } else {
        // Handle single project object
        const existingProjectIndex = (user.projects || []).findIndex(p => p.title === projects.title);
        if (existingProjectIndex > -1) {
          user.projects[existingProjectIndex] = { ...user.projects[existingProjectIndex], ...projects };
        } else {
          user.projects.push(projects);
        }
      }
    }

    // Save the updated user document
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User details updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};




const applyToJob = async (req, res) => {
  try {
    const { job_id, extra } = req.body;
    const user_id = req.user_id;

    if (!job_id) {
      res.status(400).json({
        message: "Job ID is required",
        error: true,
        success: false,
      })
    }
    if (!user_id) {
      res.status(400).json({
        message: "User ID is required",
        error: true,
        success: false,
      })
    }

    const user = await userModel.findById(user_id);
    const job = await jobModel.findById(job_id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      })
    }
    if (!job) {
      res.status(404).json({
        message: "Job not found",
        error: true,
        success: false,
      })
    }
    if (job.status !== "open") {
      res.status(404).json({
        message: "Job is already closed found",
        error: true,
        success: false,
      })
    }

    const skills = job.skills;
    const user_skills = user.skills;
    const final_skills = skills.map(skill => ({
      "skill" : skill,
      match: user_skills.includes(skill.trim().toUpperCase()),
    }));

    if (user.applied_jobs.includes(job_id)) {
      res.status(409).json({
        message: "Already applied to this job",
        error: true,
        success: false,
      })
    }

    if (extra.length !== job.extra_questions.length) {
      res.status(400).json({
        message: "Extra questions and answers do not match",
        error: true,
        success: false,
      })
    }

    const application = {
      id: user_id,
      resume: "", 
      extra_questions: job.extra_questions.map((question, index) => ({
        question,
        answer: extra[index] || "",
      })),
      skills: final_skills,
    };

    if (!Array.isArray(job.applicants)) {
      job.applicants = [];
    }
    if (!Array.isArray(user.applied_jobs)) {
      user.applied_jobs = [];
    }
    
    job.applicants.push(application);

    user.applied_jobs.push(job_id);

    await job.save();
    await user.save();

    res.status(201).json({
      message: "Applied to job successfully",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};


const deleteUserDetails = async (req, res) => {
    try {
      const { email, projectTitle, experienceTitle, jobTitle, skill } = req.body;
  
      if (!email) {
        res.status(400).json({
          message: "Email is required",
          error: true,
          success: false,
        });

      }
      const user_id = req.user_id;

      const user = await userModel.findOne({ user_id });
  
      if (!user) {
        res.status(404).json({
          message: "User not found",
          error: true,
          success: false,
        });
      }

      if (projectTitle) {
        user.projects = user.projects.filter(p => p.title !== projectTitle);
      }
  
      if (experienceTitle) {
        user.experiences = user.experiences.filter(e => e.title !== experienceTitle);
      }
  
      if (jobTitle) {
        user.jobs = user.jobs.filter(j => j.title !== jobTitle);
      }
  
      if (skill) {
        user.skills = user.skills.filter(s => s !== skill);
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        message: "User details updated successfully",
        success: true,
        data: updatedUser,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  };
  

const SuggestJob = async (req, res) => {
    try {
        const user_id = req.user_id;
        const { page } = req.body;
        const user = await userModel.findById(user_id);
        

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }
        const userSkills = user.skills;

        const jobs = await jobModel.find({});
        var matchingJobs = jobs.filter(job =>  calculateSkillMatch(userSkills, job.skills)); // Ensure `job.skills` matches the skill array
        const totalPages = Math.ceil(matchingJobs.length/6);

        if(page){
            const start = (page-1)*6;
            const end = page*6;
            matchingJobs = matchingJobs.slice(start,(end>matchingJobs.length)?matchingJobs.length:end); 
        }



        res.json({
            totalPages: totalPages,
            success: true,
            data: matchingJobs,
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: err.message,
        });
    }
};

const  userDetailsController= async(req,res) => {
    try{
        
        const user = await userModel.findById(req.user_id);
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

const userLogout = async(req,res) => {
    try{
        res.clearCookie("token").status(200).json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err,
            error: true,
            success : false,
        })
    }
}

const userSignInController = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({
                message : "Missing Required fields email and password",
                error : true,
                success : false
            });
        }
        
        const user = await userModel.findOne({email});
        if(!user){
            res.status(404).json({
                message : "User Not found",
                error : true,
                success : false
            });
        }
        const checkpassword = bcrypt.compareSync(password,user.password);
        if(checkpassword){
            const tokenData = {
                "_id" : user.id,
                "emaill" : user.email
            }
            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn : 60 * 60 * 8});
            
            const tokenOption = {
                httpOnly : true,
                secure : true,
                sameSite : "None"
            }
            res.cookie("token",token,tokenOption).status(200).json({
                data : token,
                message : "User Password is correct",
                error : false,
                success : true
            })
        }
        else{
            res.status(401).json({
                message : "User Password is Incorrect",
                error : true,
                success : false
            });
        }
    }
    catch(error){
        console.log("error : ",error.message);
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }

}


const userSignUpController =  async(req,res) => {
    try{
        const {email,name,password} = req.body;

        if(!email && !password && !name){
          res.status(400).json({
              message : "Missing Required fields email, password and name",
              error : true,
              success : false
          })
        }
        const user = await userModel.findOne({email});
        if(user){
            res.status(409).json({
                message : "User Already Exists",
                error : true,
                success : false
            })
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password,salt);

        if(!hashPassword){
            res.status(500).json({
                message : "Unable to process hashing password",
                error : true,
                success : false
            })
        }
        const payload = {
            ...req.body,
            password : hashPassword
        }
        
        const userData = userModel(payload)
        const saveUser = await userData.save();
        res.status(201).json({
            data : saveUser,
            success:true,
            error:false,
            message : "User created Successfully"
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

const getCountofApplication = async (req, res) => {
  try{
    const userId = req.user_id;
    if(!userId){
      return res.status(400).json({
        sucess:false,
        error:true,
        message:"Token Not Provided or it got Expired"
      })
    }
    const user = await userModel.findById(userId);
    const obj = {};
    if(!user){
      return res.status(404).json({
        success:false,
        error:true,
        message:"User not found"
      })
    }
    const applications = user.applied_jobs || [];
    applications.forEach(app => {
      if(app.application_status in obj){
        obj[app.application_status] += 1;
      }else{
        obj[app.application_status] = 1;
      }
    });
    return res.status(200).json({
      success:true,
      error:false,
      data:obj
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message,
      error:true
    })
  }
}



module.exports = {
    updateCodingPlatforms,
    updateEducation,
    addEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    updateUserDetails,
    applyToJob,
    deleteUserDetails,
    SuggestJob,
    userDetailsController,
    userLogout,
    userSignInController,
    userSignUpController,
    getCountofApplication
}
