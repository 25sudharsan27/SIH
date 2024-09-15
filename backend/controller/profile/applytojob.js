const jobModel = require("../../models/public/jobsModel");
const userModel = require("../../models/userModel");
const organizationModel = require("../../models/organizationModel");


const applyToJob = async (req, res) => {
  try {
    const { user_id, job_id, extra } = req.body;

    // Find user and job by their IDs
    const user = await userModel.findOne({"_id" : user_id});
    const job = await jobModel.findOne({"_id":job_id});

    console.log(user);
    console.log(job);
    if(!user){
        throw new Error("User not found");
    }
    if(!job){
        throw new Error("Job not found");
    }
    if(job.status !== "closed"){
        throw new Error("Job is not open");
    }

    const skills = job.skills;
    const user_skills = user.skills;
    const final_skills =[];
    for(let i=0;i<skills.length;i++){
        if(user.skills.includes(skills[i])){
            final_skills.push({
                "skill":skills[i],
                "match":true
            });
        }
        else{
            final_skills.push({
                "skill":skills[i],
                "match":false
            });
        }
    }

    if (!user) {
      throw new Error("User not found");
    }
    if (!job) {
      throw new Error("Job not found");
    }
    if(user.applied_jobs.includes(job_id)){
        throw new Error("You have already applied to this job");
    }

    // Check if extra answers match the number of extra questions
    if (extra.length !== job.extra_questions.length) {
      throw new Error("Please answer all the questions");
    }

    // Handle resume (assuming user has a resume stored)
    const resume = user.resume || ""; // Replace with actual logic to retrieve the resume if needed

    // Create application object
    const application = {
      id: user_id,
      resume : resume,
      extra_questions: extra,
      skills : final_skills
    };

    // Add the application to the job
    job.applicants.push(application);

    // Add the job to the user's applied jobs
    user.applied_jobs.push(job_id);

    // Save both job and user documents
    const final_job = await job.save();
    const final_user = await user.save();

    // Return success response
    res.status(200).json({
      message: "Applied to job successfully",
      success: true,
      final_job,
      final_user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = applyToJob;
