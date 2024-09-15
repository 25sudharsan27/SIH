// Hi
const jobModel = require("../../models/public/jobsModel");
const organizationModel = require("../../models/organizationModel");
const userModel = require("../../models/userModel");

const acceptjobs = async (req, res) => {
    try {
      const { job_id, organization_id } = req.body;
  
      if (!job_id || !organization_id) {
        throw new Error("job_id and organization_id are required");
      }
  
      // Find the job and organization by their IDs
      const job = await jobModel.findById(job_id);
      if (!job) throw new Error("Job not found");
      
      const organization = await organizationModel.findById(organization_id);
      if (!organization) throw new Error("Organization not found");
      const user = await userModel.findById(job.user_id);
      
      if (!user) throw new Error("User not found");
      console.log(user);
      console.log(job);
      console.log(organization);
  
      
  
      // Mark the job as accepted
      job.accepted = true;
      await job.save();
  
      // Remove job ID from pendingJobs and push to acceptedJobs
      organization.pendingJobs = organization.pendingJobs.filter(j => j.toString() !== job_id);
      organization.acceptedJobs.push(job_id);
      await organization.save();
  
      // Add job to user's accepted jobs
      user.pendingJobs = user.pendingJobs.filter(j => j.toString() !== job_id);
      user.acceptedJobs.push(job_id);
      await user.save();
      console.log("user ",user)
      console.log("job ",job);
      console.log("organization ",organization);
  
      res.status(200).json({
        message: "Job accepted successfully",
        success: true,
        error: false
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false
      });
    }
  };

module.exports = acceptjobs;