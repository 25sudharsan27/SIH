const userModel = require("../../models/userModel");


const updateUserDetails = async (req, res) => {
  try {
    const {name,following,skills, about, projects, jobs, experiences, volunteering, education,tagline,portfolio,city,state,country,profilepic,experiencepic,educationpic } = req.body;
    console.log("profile1" +profilepic);
    
    // Find the user by email
    const user_id = req?.user_id;

    if(!user_id){
      throw new Error("Cache not found");
    }


    const user = await userModel.findOne({"_id" :user_id });

    if (!user) {
      throw new Error("User not found");
    }
    if(name){
      user.name = name;
    }
    // Handle following
    if (following) {
        user.following = [...new Set([...user.following || [], following])]; // Add single string as an array element
        const anotheruser = await userModel.findOne({ _id: following });
        anotheruser.followers = [...new Set([...anotheruser.followers || [], user_id])]; // Merge arrays and remove duplicates
        await anotheruser.save();
    }

    // Handle skills
    if (skills) {
      if (Array.isArray(skills)) {
        user.skills = [...new Set([...user.skills || [], ...skills])]; // Merge arrays and remove duplicates
      } else if (typeof skills === 'string') {
        user.skills = [...new Set([...user.skills || [], skills])]; // Add single string as an array element
      }
    }


    // Update about
    if (about) {
      user.about = about;
    }
    if(tagline){
      user.tagline = tagline;
    }
    if(portfolio){
      user.portfolio = portfolio;
    }
    if(city){
      user.city = city;
    }
    if(state){
      user.state = state;
    }
    if(country){
      user.country = country;
    }
    if(req.body.profilepic){
      user.profilepic = req.body.profilepic;
    }

    // Handle projects
    if (projects) {
      if (Array.isArray(projects)) {
        projects.forEach(project => {
          const existingProjectIndex = (user.projects || []).findIndex(p => p.title === project.title);
          if (existingProjectIndex > -1) {
            // Update existing project
            user.projects[existingProjectIndex] = { ...user.projects[existingProjectIndex], ...project };
          } else {
            // Add new project
            user.projects.push(project);
          }
        });
      } else {
        // Handle single project object
        const existingProjectIndex = (user.projects || []).findIndex(p => p.title === projects.title);
        if (existingProjectIndex > -1) {
          // Update existing project
          user.projects[existingProjectIndex] = { ...user.projects[existingProjectIndex], ...projects };
        } else {
          // Add new project
          user.projects.push(projects);
        }
      }
    }

    // Handle jobs
    if (jobs) {
      if (Array.isArray(jobs)) {
        jobs.forEach(job => {
          const existingJobIndex = (user.jobs || []).findIndex(j => j.title === job.title);
          if (existingJobIndex > -1) {
            // Update existing job
            user.jobs[existingJobIndex] = { ...user.jobs[existingJobIndex], ...job };
          } else {
            // Add new job
            user.jobs.push(job);
          }
        });
      } else {
        // Handle single job object
        const existingJobIndex = (user.jobs || []).findIndex(j => j.title === jobs.title);
        if (existingJobIndex > -1) {
          // Update existing job
          user.jobs[existingJobIndex] = { ...user.jobs[existingJobIndex], ...jobs };
        } else {
          // Add new job

          user.jobs.push(jobs);
        }
      }
    }

    // Handle experiences
    if (experiences) {
      if (Array.isArray(experiences)) {
        experiences.forEach(experience => {
          const existingExperienceIndex = (user.experiences || []).findIndex(e => e.title === experience.title);
          if (existingExperienceIndex > -1) {
            // Update existing experience
            user.experiences[existingExperienceIndex] = { ...user.experiences[existingExperienceIndex], ...experience };
          } else {
            // Add new experience
            user.experiences.push(experience);
          }
        });
      } else {
        // Handle single experience object
        const existingExperienceIndex = (user.experiences || []).findIndex(e => e.title === experiences.title);
        if (existingExperienceIndex > -1) {
          // Update existing experience
          user.experiences[existingExperienceIndex] = { ...user.experiences[existingExperienceIndex], ...experiences };
        } else {
          
          // Add new experience
          user.experiences.push(experiences);
        }
      }
    }

    // Handle volunteering
    if (volunteering) {
      if (Array.isArray(volunteering)) {
        volunteering.forEach(volunteer => {
          const existingVolunteerIndex = (user.volunteering || []).findIndex(v => v.title === volunteer.title);
          if (existingVolunteerIndex > -1) {
            // Update existing volunteering
            user.volunteering[existingVolunteerIndex] = { ...user.volunteering[existingVolunteerIndex], ...volunteer };
          } else {
            // Add new volunteering
            user.volunteering.push(volunteer);
          }
        });
      } else {
        // Handle single volunteering object
        const existingVolunteerIndex = (user.volunteering || []).findIndex(v => v.title === volunteering.title);
        if (existingVolunteerIndex > -1) {
          // Update existing volunteering
          user.volunteering[existingVolunteerIndex] = { ...user.volunteering[existingVolunteerIndex], ...volunteering };
        } else {
          // Add new volunteering
          user.volunteering.push(volunteering);
        }
      }
    }

    // Handle education
    if (education) {

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
        const existingEducationIndex = (user.education || []).findIndex(e => e.title === education.title);
        if (existingEducationIndex > -1) {
          // Update existing education
          user.education[existingEducationIndex] = { ...user.education[existingEducationIndex], ...education };
        } else {
          // Add new education
          user.education.push(education);
        }
      }
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

module.exports = updateUserDetails;
