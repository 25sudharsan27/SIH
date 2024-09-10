const organizationModel = require("../../models/organizationModel");

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
      if (Array.isArray(jobs)) {
        jobs.forEach(job => {
          const existingJobIndex = (organization.jobs || []).findIndex(j => j === job);
          if (existingJobIndex === -1) {
            // Add new job
            organization.jobs.push(job);
          }
        });
      } else if (typeof jobs === 'string') {
        if (!organization.jobs.includes(jobs)) {
          organization.jobs.push(jobs); // Add single job as a string
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
