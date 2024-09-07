const userModel = require("../../models/userModel");


const deleteUserDetails = async (req, res) => {
    try {
      const { email, projectTitle, experienceTitle, jobTitle, skill } = req.body;
  
      if (!email) {
        throw new Error("Email is required");
      }
      const user_id = req.user_id;
      // Find the user by email
      const user = await userModel.findOne({ user_id });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Remove the specified project
      if (projectTitle) {
        user.projects = user.projects.filter(p => p.title !== projectTitle);
      }
  
      // Remove the specified experience
      if (experienceTitle) {
        user.experiences = user.experiences.filter(e => e.title !== experienceTitle);
      }
  
      // Remove the specified job
      if (jobTitle) {
        user.jobs = user.jobs.filter(j => j.title !== jobTitle);
      }
  
      // Remove the specified skill
      if (skill) {
        user.skills = user.skills.filter(s => s !== skill);
      }
  
      // Save the updated user document
      const updatedUser = await user.save();
  
      res.status(200).json({
        message: "User details updated successfully",
        success: true,
        data: updatedUser,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  };
  
  module.exports = deleteUserDetails;
  