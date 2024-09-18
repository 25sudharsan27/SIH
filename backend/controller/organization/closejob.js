const organizationModel = require("../../models/organizationModel");
const jobModel = require("../../models/public/jobsModel");

const updateOrganizationDetails = async (req, res) => {
  try {
    const { org_email, jobs, confirm } = req.body;
    const use_id = req.user_id;
    

    if (!org_email) {
      throw new Error("Email is required");
    }

    // Find the organization by user ID
    const organization = await organizationModel.findOne({ "_id": use_id });
    const org_jobs = await jobModel.find({ "user_id": use_id });

    if (!organization) {
      throw new Error("Organization not found");
    }
    if (confirm !== "confirm") {
      throw new Error("Please confirm the action");
    }

    // Handle jobs
    if (jobs) {
      if (Array.isArray(jobs)) {
        for (const job of jobs) {
          // Remove job from posted_jobs
          organization.posted_jobs = organization.posted_jobs.filter(j => j.toString() !== job.id.toString());

          // Find and update the job status to "closed"
          const org_job = org_jobs.find(j => j._id.toString() === job.id.toString());
          if (org_job) {
            org_job.status = "closed"; // Set job status to "closed"
            await org_job.save(); // Save the job document
          }

          // Add to closed_jobs
          organization.closed_jobs.push(job.id);
        }
      } else {
        // Single job (when `jobs` is a string)
        organization.posted_jobs = organization.posted_jobs.filter(j => j.toString() !== jobs.toString());

        // Find and update the job status to "closed"
        const org_job = org_jobs.find(j => j._id.toString() === jobs.toString());
        if (org_job) {
          org_job.status = "closed"; // Set job status to "closed"
          await org_job.save(); // Save the job document
        }

        organization.closed_jobs.push(jobs); // Push single job to closed_jobs
      }
    }

    // Save the updated organization document
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

module.exports = updateOrganizationDetails;
