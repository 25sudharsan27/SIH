const userModel = require("../../models/userModel");


const updateUserExperiences = async (req, res) => {
  try {
    const experiences = req.body;

     const user_id = req?.user_id;
    
        if(!user_id){
          throw new Error("Cache not found");
        }
    
    
        const user = await userModel.findOne({"_id" :user_id });
    
        if (!user) {
          throw new Error("User not found");
        }


    console.log(experiences);

    // Handle experiences
    if (experiences) {
      if(experiences?.delete){
        const existingExperienceIndex = (user.experiences || []).findIndex(e => e._id.toString() === experiences._id);
        if (existingExperienceIndex > -1) {
          // Delete existing experience
          console.log("experience single one");

          user.experiences.splice(existingExperienceIndex, 1);
        }
      }
      else{
      
        // Handle single experience object

        const existingExperienceIndex = (user.experiences || []).findIndex(e => e._id.toString() === experiences._id);
        if (existingExperienceIndex > -1) {
          console.log("experience single one");
          // Update existing experience
          user.experiences[existingExperienceIndex] = { ...user.experiences[existingExperienceIndex], ...experiences };
        } else {
          
          // Add new experience
          user.experiences.push(experiences);
        }
      
      }
    }


    // Save the updated user document
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User Experience updated successfully",
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

module.exports = updateUserExperiences;
