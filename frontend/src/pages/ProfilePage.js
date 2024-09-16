import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './profile.css';
import Modal from './Model'; // Make sure this is imported correctly
import edit from './images/edit.png';
import save from './images/save.png';
import './Model.css';

const ProfilePage = () => {
  // Get user data from Redux store
  const userData = useSelector((state) => state.user.user);

  // State for handling editable about section and skills
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(userData?.about || '');
  const [skills, setSkills] = useState(userData?.skills || []);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState(false);
  const [isShowMoreProjectsOpen, setIsShowMoreProjectsOpen] = useState(false);
  const [isShowMoreExperiencesOpen, setIsShowMoreExperiencesOpen] = useState(false);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    media: []
  });

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    media: []
  });

  // State for visible items
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(5);
  const [visibleExperiencesCount, setVisibleExperiencesCount] = useState(5);

  // Save updated about section
  const handleSaveAbout = async () => {
    setIsEditingAbout(false);
    const updateUser = await fetch("http://localhost:8000/user/adddetails", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "about": aboutText
      })
    });
    const data = await updateUser.json();
    console.log("data : ", data);
  };

  // Add a new skill
  const handleAddSkill = async () => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      const updateUser = await fetch("http://localhost:8000/user/adddetails", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "skills": updatedSkills
        })
      });
      const data = await updateUser.json();
      console.log("data : ", data);
    }
  };

  // Add a new project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      alert("Please enter title and description for the project");
      return;
    }
    // Send new project data to the server (optional)
    const updateUser = await fetch("http://localhost:8000/user/adddetails", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "projects": [...userData.projects, newProject]
      })
    });
    const data = await updateUser.json();
    console.log("data : ", data);
    setIsAddProjectModalOpen(false);
  };

  // Add a new experience
  const handleAddExperience = async () => {
    // Send new experience data to the server (optional)
    const updateUser = await fetch("http://localhost:8000/user/adddetails", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "experiences": [...userData.experiences, newExperience]
      })
    });
    const data = await updateUser.json();
    console.log("data : ", data);
    setIsAddExperienceModalOpen(false);
  };

  // Show More Projects
  const handleShowMoreProjects = () => {
    setVisibleProjectsCount(userData.projects.length);
    setIsShowMoreProjectsOpen(true);
  };

  // Show More Experiences
  const handleShowMoreExperiences = () => {
    setVisibleExperiencesCount(userData.experiences.length);
    setIsShowMoreExperiencesOpen(true);
  };

  // If no user data is available yet
  if (!userData) return <p>Loading...</p>;

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-left">
          <img
            src={userData.profilepic || save}
            alt="Profile Picture"
            className="profile-picture"
          />
          <h2>{userData.name}</h2>
          <p className="location">
            {userData.city},<br /> {userData.state},<br /> {userData.country}
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
              <div className="skills-list">
                {userData.skills.map((skill, index) => (
                  <p key={index} className="skill-item">{skill}</p>
                ))}
              </div>
              <a className="addskill" onClick={handleAddSkill}>Add Skill</a>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <h3 className="exp-h3">Experience</h3>
        <div className="experience-section">
          {userData.experiences.slice(0, visibleExperiencesCount).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={experience.media[0] || 'images/company-logo-placeholder.svg'} alt={experience.company} className="company-logo" />
                <p>{experience.company}</p>
              </div>
              <div>
                <h4 className="title">{experience.title}</h4>
                <p>{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p className="description">{experience.description}</p>
              </div>
            </div>
          ))}
          {userData.experiences.length > 5 && visibleExperiencesCount < userData.experiences.length && (
            <a href="#" className="show-more" onClick={handleShowMoreExperiences}>Show More</a>
          )}
          <a href="#" className="add-more-projects" onClick={() => setIsAddExperienceModalOpen(true)}>Add Experience</a>
        </div>

        {/* Projects Section */}
        <h3 className="exp-h3">Projects</h3>
        <div className="pro">
          <div className="projects-section">
            {userData.projects.slice(0, visibleProjectsCount).map((project, index) => (
              <div key={index} className="project-item">
                <h4 className="project-item-t">{project.title}</h4>
                <p className="project-item-s">{project.description}</p>
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>}
              </div>
            ))}
            {userData.projects.length > 5 && visibleProjectsCount < userData.projects.length && (
              <a href="#" className="show-more" onClick={handleShowMoreProjects}>Show More</a>
            )}
            <a href="#" className="add-more-projects" onClick={() => setIsAddProjectModalOpen(true)}>Add Project</a>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <Modal isOpen={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)}>
        <h3>Add New Project</h3>
        <form className="addproject" onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="Project Link"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
          />
          <button type="submit">Add Project</button>
        </form>
      </Modal>

      {/* Add Experience Modal */}
      <Modal isOpen={isAddExperienceModalOpen} onClose={() => setIsAddExperienceModalOpen(false)}>
        <h3>Add New Experience</h3>
        <form className="addexperience" onSubmit={(e) => { e.preventDefault(); handleAddExperience(); }}>
          <input
            type="text"
            placeholder="Title"
            value={newExperience.title}
            onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            required
          />
          <div>
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            required
          />
          <button type="submit">Add Experience</button>
        </form>
      </Modal>

      {/* Show More Projects Modal */}
      <Modal isOpen={isShowMoreProjectsOpen} onClose={() => setIsShowMoreProjectsOpen(false)}>
        <h3>All Projects</h3>
        <div className="projects-section">
          {userData.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h4 className="project-item-t">{project.title}</h4>
              <p className="project-item-s">{project.description}</p>
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>}
            </div>
          ))}
        </div>
      </Modal>

      {/* Show More Experiences Modal */}
      <Modal isOpen={isShowMoreExperiencesOpen} onClose={() => setIsShowMoreExperiencesOpen(false)}>
        <h3>All Experiences</h3>
        <div className="experience-section">
          {userData.experiences.map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={experience.media[0] || 'images/company-logo-placeholder.svg'} alt={experience.company} className="company-logo" />
                <p>{experience.company}</p>
              </div>
              <div>
                <h4 className="title">{experience.title}</h4>
                <p>{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p className="description">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
