const jobModel = require("../../models/public/jobsModel");
const organizationModel = require("../../models/organizationModel");

const updateOrganizationDetails = async (req, res) => {
  try {
    const {email} = req.body;
    const user_id = req.user_id;
    console.log(email);
    if (!email) {
      throw new Error("Email is required");
    }

    const organization = await organizationModel.findOne({"_id":user_id});
    const opened = await jobModel.find({user_id : organization._id, status : "open"});
    
    res.status(200).json({
      message: "opened jobs fetched successfully",
      success: true,
      opened_jobs : opened
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
