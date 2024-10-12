const userModel = require("../../models/userModel")
const jobModel = require("../../models/public/jobsModel")


const applyToJob = async (req, res) => {
  try {
    const { job_id, extra } = req.body;
    const user_id = req.user_id;
    console.log("job_id" + job_id);

    if (!job_id) {
      throw new Error("Job ID is required");
    }
    if (!user_id) {
      throw new Error("User ID is required");
    }

    // Find user and job by their IDs
    const user = await userModel.findById(user_id);
    const job = await jobModel.findById(job_id);

    if (!user) {
      throw new Error("User not found");
    }
    if (!job) {
      throw new Error("Job not found");
    }
    if (job.status !== "open") {
      throw new Error("Job is not open");
    }

    const skills = job.skills;
    const user_skills = user.skills;
    const final_skills = skills.map(skill => ({
      "skill" : skill,
      match: user_skills.includes(skill.trim().toUpperCase()),
    }));
    console.log("final skills "+final_skills)

    if (user.applied_jobs.includes(job_id)) {
      throw new Error("You have already applied to this job");
    }

    // Check if extra answers match the number of extra questions
    if (extra.length !== job.extra_questions.length) {
      throw new Error("Please answer all the questions");
    }

    // Create application object
    const application = {
      id: user_id,
      resume: "", // No resume is provided
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
    
    // Add the application to the job
    job.applicants.push(application);

    // Add the job to the user's applied jobs
    user.applied_jobs.push(job_id);

    // Save both job and user documents
    await job.save();
    await user.save();

    // Return success response
    res.status(200).json({
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

module.exports = applyToJob;
