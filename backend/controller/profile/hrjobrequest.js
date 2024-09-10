const Organization = require('../../models/organizationModel');
const jobmodel =require("../../models/public/jobsModel");
const userModel = require('../../models/userModel');


const hrJobRequest = async (req, res) => {
  const {
    user_id,
    title,
    description,
    link,
    experienceLevel,
    workMode,
    country,
    city,
    location,
    company_id,
    opening,
    skills
  } = req.body;

  try {
    // Find the organization by company_id
    const org = await Organization.findOne({_id: company_id});
    const user = await userModel.findOne({_id : user_id});
    if(!user){
      new Error("User not found");
    }
    console.log(org);
    if (!org) {
      return res.status(400).json({
        message: "Organization not found",
        error: true,
        success: false
      });
    }
    const jobs = new jobmodel({
      user_id,
      title,
      description,
      link,
      experienceLevel,
      workMode,
      country,
      city,
      location,
      opening,
      skills,
      accepted : false
    });
    await jobs.save();
    // Push the new job details to pendingJobs array
    org.pendingJobs.push(jobs._id);
    user.pendingJobs.push(jobs._id);
    // Save the updated organization document
    await org.save();
    await user.save();

    // Return the updated pendingJobs array
    res.status(200).json({
      message: "Job request submitted successfully",
      error: false,
      success: true,
      data: org.pendingJobs // Return the updated pending jobs
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = hrJobRequest;
