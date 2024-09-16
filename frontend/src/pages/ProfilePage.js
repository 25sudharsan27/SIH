import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './profile.css'
import edit from './images/edit.png';
import save from './images/save.png';

const ProfilePage = () => {
  // Get user data from Redux store
  const userData = useSelector((state) => state.user.user);

  // State for handling editable about section and skills
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(userData?.about || '');
  const [skills, setSkills] = useState(userData?.skills || []);

  // Save updated about section
  const handleSaveAbout = async() => {
    setIsEditingAbout(false);
    // Update the about text in the server (optional)
    console.log("aboutText : ",aboutText);
    const updateUser = await fetch("http://localhost:8000/user/adddetails",{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          "about":aboutText
        })

    });
    const data = await updateUser.json();
    console.log("data : ",data);
  };

  // Add a new skill
  const handleAddSkill =async () => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      // Update skills on the server (optional)
      const updateUser = await fetch("http://localhost:8000/user/adddetails",{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          "skills":updatedSkills
        })
      });
      const data = await updateUser.json();
    }
  };

  // If no user data is available yet
  if (!userData) return <p>Loading...</p>;
  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-left">
          <img src={userData.profilepic || {save}} alt="Profile Pictur" className="profile-picture" />
          <h2>{userData.name}</h2>
          <p className="location">
            {userData.city},<br/> {userData.state},<br/> {userData.country} 
          </p>
        </div>
        <div>
          <a href="https://sudharsanb.liveblog365.com">https://sudharsanb.liveblog365.com</a>
        </div>
      </div>

      <div className="complete">
      <div className="about">
      {/* About Section */}
      <div className="about-section">
          <div className="about-section-a">
            <h3>About</h3>
          {isEditingAbout ? (
            <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
              className="about-text"
            />
          ) : (
            <p>{userData.about}</p>
          )}
          {isEditingAbout ? (
              <a onClick={() => { handleSaveAbout(); setIsEditingAbout(false); }}>Save</a>
            ) : (
              <a onClick={() => setIsEditingAbout(true)}>Edit</a>
            )}
          </div>
        </div>

        <div className="skills-section">
          <div className="skill-section-a">
            <h3>Skills</h3>
            <a onClick={handleAddSkill}>Add Skill</a>
            {/* <img src="images/add-skill-icon.svg" alt="Add Skill" className="add-skill-btn" onClick={handleAddSkill} /> */}
          </div>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <p key={index} className="skill-item">{skill}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="experience-section">
        <h3>Experience</h3>
        {userData.experiences.map((experience, index) => (
          <div key={index} className="experience-item">
            <img src={experience.media[0] || 'images/company-logo-placeholder.svg'} alt={experience.company} className="company-logo" />
            <div>
              <h4>{experience.title}</h4>
              <p>{experience.company} | {new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
              <p>{experience.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="projects-section">
        <h3>Projects</h3>
        {userData.projects.map((project, index) => (
          <div key={index} className="project-item">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>}
          </div>
        ))}
        <a href="#" className="add-more-projects">+ Add More</a>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
