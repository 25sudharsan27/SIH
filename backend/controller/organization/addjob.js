const jobModel = require("../../models/public/jobsModel");
const organizationModel = require("../../models/organizationModel");

const AddJob = async (req, res) => {
  try {
    const { title, description, link, skills, city, state, country, workMode, experienceLevel, opening, extra_questions, status,stipend,requirements,benefits,responsibilities } = req.body;
    console.log("recieving ");
    // Ensure user_id is available in the request
    const user_id = req.user_id; // Assuming `user_id` is set by authentication middleware

    if (!user_id) {
      throw new Error("Authentication error");
    }

    // Fetch the organization based on user_id
    const org = await organizationModel.findOne({ "_id": user_id });
    const pic = org?.pic;
    
    if (!org) {
      throw new Error("Organization not found");
    } 

    if (!title || !description || !skills || !city || !state || !experienceLevel || !country || !link) {
      throw new Error("All fields are required");
    }

    // Create a new job
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

    // Save the job and update the organization
    const jobdata = await job.save();
    console.log(jobdata);
    org.posted_jobs.push(jobdata._id);
    const org_data = await org.save(); // Ensure saving the organization is awaited

    // Send a success response
    res.status(200).json({
      message: "Job added successfully",
      data: jobdata,
      organization: org_data,
      success: true,
      error: false
    });
  } catch (err) {
    // Handle errors and send response
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true
    });
  }
};

module.exports = AddJob;
