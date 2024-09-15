const organizationModel = require("../../models/organizationModel");
const jobModel = require("../../models/public/jobsModel");

const updateOrganizationDetails = async (req, res) => {
  try {
    const { email, about, jobs, followers, connections } = req.body;

    if (!email) {
      throw new Error("Email is required");
    }

    // Find the organization by email
    const organization = await organizationModel.findOne({ email });
    
    if (!organization) {
      throw new Error("Organization not found");
    }

    // Update the about section
    if (about) {
      organization.about = about;
    }

    // Handle jobs
    if (jobs) {
      console.log("started");
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
          organization.posted_jobs.push(savedJob._id); // Add single job
        }
      }
    }

    // Handle followers
    if (followers) {
      if (Array.isArray(followers)) {
        organization.followers = [...new Set([...organization.followers || [], ...followers])]; // Merge arrays and remove duplicates
      } else if (typeof followers === 'string') {
        if (!organization.followers.includes(followers)) {
          organization.followers.push(followers); // Add single follower
        }
      }
    }

    // Save the updated organization document
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

module.exports = updateOrganizationDetails;
