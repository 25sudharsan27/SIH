const Job = require("../../models/public/jobsModel");
const User = require("../../models/userModel");

const addOrUpdateJob = async (req, res) => {
  console.log("hi");
  try {
    const { userId, title, description, link, experienceLevel, workMode, country, city, location, company, opening, skills,requirements,benefits,responsibilities } = req.body;
    
    console.log(req.body);
    // Validate input
    if (!userId || !title || !experienceLevel || !workMode) {
      throw new Error("Required fields: userId, title, experienceLevel, and workMode");
    }
    let job;

    User = await User.findById(userId);
    if(!User){
        throw new Error("User not found");
    }
    if(User.jobseeker === false){
        throw new Error("User is not a jobseeker");
    }
    // If jobId is provided, update the existing job
    
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

module.exports = addOrUpdateJob;
