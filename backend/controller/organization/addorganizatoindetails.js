const organizationModel = require("../../models/organizationModel");
const jobModel = require("../../models/public/jobsModel");

const updateOrganizationDetails = async (req, res) => {
  try {
    const {  about, pic,country,name,city,state,jobs, followers, connections } = req.body;
    const user_id = req?.user_id;
    
    
    if(!user_id){
      throw new Error("may be issue with authentication");
    }

    // Find the organization by email
    const organization = await organizationModel.findOne({ "_id" : user_id });
    
    if (!organization) {
      throw new Error("Organization not found");
    }

    // Update the about section
    if (about) {
      organization.about = about;
    }
    console.log("picture : ",pic);
    if(req.body.pic){
      organization.pic = req.body.pic;
    }
    if(country){
      organization.country = country;
    }
    if(name){
      organization.companyname = name;
    }
    if(city){
      organization.city = city;
    }
    if(state){
      organization.state = state;
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
