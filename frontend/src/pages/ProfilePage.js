/* eslint-disable no-undef */
import React, { useState,useEffect } from 'react';
import './profile.css';
import Modal from './Model'; // Make sure this is imported correctly
import edit from './images/edit.png';
import dummyIcon from './images/logesh_2.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../store/userSlice';
import editIcon from './images/edit-icon.svg'
import saveIcon from './images/floppy-disk-regular.svg'
import linkIcon from './images/link-solid.svg'
import Amazon from './images/amazon.png'
import Google from './images/google.png'
import HeatMap from './HeatMap';
import leetcode from './images/leetcode.svg'
import hackerrank from './images/hackerrank.svg'
import github from './images/github.svg'
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";



// import profile from './images/logesh.jpg'
import './Model.css';

const ProfilePage =  () => {
  // Get user data from Redux store

  const userData = useSelector(selectUser);
  console.log(userData);

  // Initialize state variables
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(userData?.about || '');
  const [skills, setSkills] = useState(userData?.skills || []);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState(false);
  const [isShowMoreProjectsOpen, setIsShowMoreProjectsOpen] = useState(false);
  const [isShowMoreExperiencesOpen, setIsShowMoreExperiencesOpen] = useState(false);
  const [isShowMoreEducationOpen,setIsShowMoreEducationOpen] = useState(false);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);


  const [isAddEducationModalOpen, setIsAddEducationModalOpen] = useState(false);

  const [isAddProfileDetailsOpen, setIsAddProfileDetailsOpen] = useState(false);

  const [userdata, setUserdata] = useState({
    name: '',
    tagline: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    if (userData) {
      setAboutText(userData.about || '');
      setSkills(userData.skills || []);
      setUserdata({
        name: userData.name || '',
        tagline: userData.tagline || '',
        city: userData.city || '',
        state: userData.state || '',
        country: userData.country || '',
      });
    }
  }, [userData]);

  

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

  const [newEducation, setNewEducation] = useState({
    title: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: '',
    media: []
  });


  // State for visible items
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(5);
  const [visibleExperiencesCount, setVisibleExperiencesCount] = useState(5);
  const [visibleEducationCount, setVisibleEducationCount] = useState(5);

  // Save updated about section
  const handleSaveAbout = async () => {
    setIsEditingAbout(false);
    // console.log("aboutText : ", process.env.REACT_APP_saveabout_api);
    const updateUser = await fetch(process.env.REACT_APP_saveabout_api, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "about": aboutText
      })
    });
    const data = await updateUser.json();
    // console.log("data : ", data);
    window.location.reload(); // Reload the page to clear state and redirect to login
  };

  const handleUpdateDetails = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_addskill_api, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userdata, state: state, city: city, country: country }),
      });
      
      if (!response.ok) throw new Error('Failed to update profile details');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new skill
  const handleAddSkill = async () => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      const updateUser = await fetch(process.env.REACT_APP_addskill_api, {
        method: process.env.REACT_APP_addskill_method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "skills": updatedSkills
        })
      });
      const data = await updateUser.json();
      // console.log("data : ", data);
      window.location.reload(); // Reload the page to clear state and redirect to login
    }
  };

  // Add a new project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      alert("Please enter title and description for the project");
      return;
    }
    // Send new project data to the server (optional)
    const updateUser = await fetch(process.env.REACT_APP_addproject_api, {
      method: process.env.REACT_APP_addproject_method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "projects": [...(userData?.projects || []), newProject]
      })
    });
    const data = await updateUser.json();
    // console.log("data : ", data);
    setIsAddProjectModalOpen(false);
    window.location.reload(); // Reload the page to clear state and redirect to login
  };

  // Add a new experience
  const handleAddExperience = async () => {
    // Send new experience data to the server (optional)
    const updateUser = await fetch(process.env.REACT_APP_addexperience_api , {
      method: process.env.REACT_APP_addexperience_method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "experiences": [...(userData?.experiences || []), newExperience]
      })
    });
    const data = await updateUser.json();
    // console.log("data : ", data);
    setIsAddExperienceModalOpen(false);
    window.location.reload(); // Reload the page to clear state and redirect to login
  };

  const handleAddEducation = async () => {
    // Send new experience data to the server (optional)
    const updateUser = await fetch(process.env.REACT_APP_addexperience_api , {
      method: process.env.REACT_APP_addexperience_method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "education": [...(userData?.education || []), newEducation]
      })
    });
    const data = await updateUser.json();
    // console.log("data : ", data);
    setIsShowMoreEducationOpen(false);
    window.location.reload(); // Reload the page to clear state and redirect to login
  };


  // Show More Projects
  const handleShowMoreProjects = () => {
    setVisibleProjectsCount((userData?.projects || []).length);
    setIsShowMoreProjectsOpen(true);
  };

  // Show More Experiences
  const handleShowMoreExperiences = () => {
    setVisibleExperiencesCount((userData?.experiences || []).length);
    setIsShowMoreExperiencesOpen(true);
  };

  // Show More Education
  const handleShowMoreEducation = () => {
    setVisibleEducationCount((userData?.education || []).length);
    setIsShowMoreEducationOpen(true);
  };

  // Fetch leetcode details

  

  // If no user data is available yet
  if (!userData) return <p>Loading...</p>;

  return (
    
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
          <div className="profile-left">
          <img

            src={userData.profilepic || dummyIcon}
            alt="Profile Picture"
            className="profile-picture"
          />
          <img onClick={() => setIsAddProfileDetailsOpen(true)} className='editbtn' style={{height:"10px",margin:"10px"}} src={edit} alt="edit" />
          <h2 style={{fontFamily:"Poppins"}} id="pro-name">{userData.name}</h2>
          <p style={{fontFamily:"Poppins"}}>{userData.tagline}</p>
          <p className="location">
            {userData.city}, {userData.state}, {userData.country}
          </p>
          </div>


          <div>
            <div className='heatmap-container'>
                <HeatMap msg={'Jan'}/>
                <HeatMap msg={'Feb'}/>
                <HeatMap msg={'Mar'}/>
                <HeatMap msg={'Apr'}/>
                <HeatMap msg={'May'}/>
                <HeatMap msg={'Sep'}/>
                <HeatMap msg={'Oct'}/>
                <HeatMap msg={'Nov'}/>
                <HeatMap msg={'Dec'}/>
            </div>
            <div className='images-con'>
                <a href="https://leetcode.com/u/vinukanth75/" target='blank'><img src={leetcode} className='logoo'></img></a>
                <a href="https://www.hackerrank.com/profile/vinukanth75" target='blank'><img src={hackerrank} className='logoo'></img></a>
                <a href="https://github.com/vinu75kanth" target='blank'><img src={github} className='logoo'></img></a>
            </div>
          </div>
      </div>

      <div className="complete">
        <div className="about">
          {/* About Section */}
          <div className="about1">
          <div className="about-section">
            <div className="about-section-a">
              <div className='simply'>
                <h3>About</h3>
                {isEditingAbout ? (
                  <img onClick={handleSaveAbout} className='editbtn' src={saveIcon}></img>
                ) : (
                  <img className='editbtn' onClick={() => setIsEditingAbout(true)} src={editIcon}></img>
                )}
              </div>
              {isEditingAbout ? (
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="about-text"
                />
              ) : (
                <p>{userData.about}</p>
              )}
            </div>
          </div>

          <div className="skills-section">
            <div className="skill-section-a">
              <div className='simply'>
                <h3>Skills</h3>
                <img className="addskill editbtn" onClick={handleAddSkill} src={editIcon}></img>
              </div>
              <div className="skills-list">
                {(userData.skills || []).map((skill, index) => (
                  <p key={index} className="skill-item">{skill.toUpperCase()}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Experience Section */}
        <h3 className="exp-h3">Experiences</h3>
        <div className="experience-section">
          {(userData.experiences || []).slice(0, visibleExperiencesCount).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={(experience.company === 'Amazon')?Amazon:
                  (experience.company === 'Google')?Google:'' || experience.media[0]} alt={experience.company} className="company-logo" />
                <p>{experience.company}</p>
              </div>
              <div id="exp1">
                <h4 id="hi10" className="title">{experience.title}</h4>
                <p  id="hi11">{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p className="description">{experience.description}</p>
              </div>
            </div>
          ))}
          {(userData.experiences || []).length > 5 && visibleExperiencesCount < (userData.experiences || []).length && (
            <a href="#" className="show-more" onClick={handleShowMoreExperiences}>Show More</a>
          )}
          <a href="#" className="add-more-projects" onClick={() => setIsAddExperienceModalOpen(true)}>Add Experience</a>
        </div>

        {/* Projects Section */}
        <h3 className="exp-h3">Projects</h3>
        <div className="pro">
          <div className="projects-section">
            {(userData.projects || []).slice(0, visibleProjectsCount).map((project, index) => (
              <div key={index} className="project-item">
                <h4 className="project-item-t">{project.title}</h4>
                <p className="project-item-s">{project.description}</p>
                <div className='project-link-holder'>
                  {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>}
                  <img className='editbtn' src={linkIcon}></img>
                </div>
              </div>
            ))}
            {(userData.projects || []).length > 5 && visibleProjectsCount < (userData.projects || []).length && (
              <a href="#" className="show-more" onClick={handleShowMoreProjects}>Show More</a>
            )}
          </div>
          <a href="#" className="add-more-projects" onClick={() => setIsAddProjectModalOpen(true)}>Add Project</a>
        </div>
        <h3 className="exp-h3">Education</h3>
        <div className="experience-section">
          {(userData.education || []).slice(0, visibleExperiencesCount).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={(experience.institution === 'Amazon')?Amazon:
                  (experience.institution !== 'Amazon')?Google:'' || experience.media[0]} alt={experience.institution} className="company-logo" />
                <p>{experience.institution}</p>
              </div>
              <div id="exp1">
                <h4 id="hi10" className="title">{experience.title}</h4>
                <p  id="hi11">{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p className="description">{experience.description}</p>
              </div>
            </div>
          ))}
          {(userData.education || []).length > 5 && visibleExperiencesCount < (userData.education || []).length && (
            <a href="#" className="show-more" onClick={handleShowMoreEducation}>Show More</a>
          )}
          <a href="#" className="add-more-projects" onClick={() => setIsAddEducationModalOpen(true)}>Add Experience</a>
        </div>

      </div>


      
      <Modal isOpen={isAddProfileDetailsOpen} onClose={() => setIsAddProfileDetailsOpen(false)}>
          <h3>Update Profile Details</h3>
          <form className="addproject" onSubmit={(e) => { e.preventDefault(); handleUpdateDetails(); }}>
            <input
              placeholder="Name"
              value={userdata.name}
              onChange={(e) => setUserdata({ ...userdata, name: e.target.value })}
              required
            />
            <input
              placeholder="TagLine"
              value={userdata.tagline}
              onChange={(e) => setUserdata({ ...userdata, tagline: e.target.value })}
              required
            />
            
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setCountry(e.name); // Set the selected country name
              setState(''); // Reset state and city when country changes
              setCity('');
            }}
            placeHolder="Select Country"
            value={countryid} // Set selected country id
          />
          <br />

          <StateSelect
            countryid={countryid}
            onChange={(e) => {
              setStateid(e.id);
              setState(e.name); // Set the selected state name
              setCity(''); // Reset city when state changes
            }}
            placeHolder="Select State"
            value={stateid} // Set selected state id
          />
          <br />

          <CitySelect
            countryid={countryid}
            stateid={stateid}
            onChange={(e) => {
              setCity(e.name); // Set the selected city name
            }}
            placeHolder="Select City"
            value={city} // Set selected city name
          />
          <br />
            
            <button type="submit">Update Details</button>
          </form>
        </Modal>

      {/* Add Project Modal */}
      <Modal isOpen={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)}>
        <h3>Add New Project</h3>
        <form className="addproject" onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
          <input
            
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
            
            placeholder="Title"
            value={newExperience.title}
            onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
            required
          />
          <input
            
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


      <Modal isOpen={isAddEducationModalOpen} onClose={() => setIsAddEducationModalOpen(false)}>
        <h3>Add New Education</h3>
        <form className="addexperience" onSubmit={(e) => { e.preventDefault(); handleAddEducation(); }}>
          <input
            
            placeholder="Title"
            value={newEducation.title}
            onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
            required
          />
          <input
            
            placeholder="Institution or College or School"
            value={newEducation.company}
            onChange={(e) => setNewEducation({ ...newEducation, company: e.target.value })}
            required
          />
          <div>
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={newEducation.startDate}
              onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={newEducation.endDate}
              onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description"
            value={newEducation.description}
            onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
            required
          />
          <button type="submit">Add Education</button>
        </form>
      </Modal>

      {/* Show More Projects Modal */}
      <Modal isOpen={isShowMoreProjectsOpen} onClose={() => setIsShowMoreProjectsOpen(false)}>
        <h3>All Projects</h3>
        <div className="projects-section">
          {(userData.projects || []).map((project, index) => (
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
          {(userData.experiences || []).map((experience, index) => (
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


      <Modal isOpen={isShowMoreEducationOpen} onClose={() => setIsShowMoreEducationOpen(false)}>
        <h3>All Educations</h3>
        <div className="experience-section">
          {(userData.education || []).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a">
                <img src={experience.media[0] || 'images/company-logo-placeholder.svg'} alt={experience.company} className="company-logo" />
                <p>{experience.institution}</p>
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
