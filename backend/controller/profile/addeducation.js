const userModel = require("../../models/userModel");


const updateEducation = async (req, res) => {
  try {
    const education = req.body;
    console.log(education);
    // Find the user by email
    console.log("reached until here");
    const user_id = req?.user_id;
    console.log("user id "+user_id);
    if(!user_id){
      throw new Error("Cache not found");
    }


    const user = await userModel.findOne({"_id" :user_id });
    if(user){
        console.log("user found");
    }
    if (!user) {
      throw new Error("User not found");
    }

    // Handle education
    if (education) {
      if(education?.delete){

        const existingEducationIndex = (user.education || []).findIndex(e => e._id.toString() === education._id);
        if (existingEducationIndex > -1) {
          // Delete existing education
          user.education.splice(existingEducationIndex, 1);
        }
      }
      else{

      if (Array.isArray(education)) {
        education.forEach(ed => {
          const existingEducationIndex = (user.education || []).findIndex(e => e.title === ed.title);
          if (existingEducationIndex > -1) {
            // Update existing education
            user.education[existingEducationIndex] = { ...user.education[existingEducationIndex], ...ed };
          } else {
            // Add new education
            user.education.push(ed);
          }
        });
      } else {
        // Handle single education object
        const existingEducationIndex = (user.education || []).findIndex(e => {
          return e._id.toString() === education._id; 
      });
        console.log("index : "+existingEducationIndex);
        if (existingEducationIndex > -1) {
          // Update existing education
          console.log("education single one");
          user.education[existingEducationIndex] = { ...user.education[existingEducationIndex], ...education };
        } else {
          // Add new education
          console.log("education single");
          user.education.push(education);
          console.log("done");
        }
      }
    }
    }
    // Save the updated user document
    // console.log(user.education);
    const updatedUser = await user.save();
    console.log("updated user");

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

module.exports = updateEducation;
