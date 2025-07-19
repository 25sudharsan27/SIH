import React, { useState, useEffect } from 'react';
import './profile.css';

import edit from '../../../images/edit.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/userSlice';
import editIcon from '../../../images/edit-icon.svg'
import saveIcon from '../../../images/floppy-disk-regular.svg'
import linkIcon from '../../../images/link-solid.svg'
import leetcode from '../../../images/leetcode.svg'
import hackerrank from '../../../images/hackerrank.svg'
import github from '../../../images/github.svg'
import userIcon from '../../../images/user-icon-svgrepo-com (1).svg'

import Modal from '../../../components/Model/Model';

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import delete3 from '../../../images/delete.svg'
import { useNavigate } from 'react-router-dom';

// import profile from './images/logesh.jpg'
import '../../../components/Model/Model.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Get user data from Redux store
  const logos =
  {
    'codechef': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683635/htezq9oicurm58xubddv.webp',
    'geeksforgeeks': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683635/esrjeuprlcfcjj1bk0cz.webp',
    'github': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683636/xdwqzyuhacwm1b6r7hkz.webp',
    'hackerrank': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683638/k7iotdhmx9nwni4d1ery.webp',
    'leetcode': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683636/dl9i6oaodrcez5shi4bj.webp'
  }

  const userData = useSelector(selectUser);

  // Initialize state variables
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(userData?.about || '');
  const [skills, setSkills] = useState(userData?.skills || []);

  const [isCodingPlatformModeOpen, setIsCodingPlatformModeOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState(false);
  const [isShowMoreProjectsOpen, setIsShowMoreProjectsOpen] = useState(false);
  const [isShowMoreExperiencesOpen, setIsShowMoreExperiencesOpen] = useState(false);
  const [isShowMoreEducationOpen, setIsShowMoreEducationOpen] = useState(false);
  const [isAddEducationModalOpen, setIsAddEducationModalOpen] = useState(false);
  const [isUpdateEducationModalOpen, setIsUpdateEducationModalOpen] = useState(false);
  const [isUpdateExperienceModalOpen, setIsUpdateExperienceModalOpen] = useState(false);
  const [isAddProfileDetailsOpen, setIsAddProfileDetailsOpen] = useState(false);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);


  const [codingplatformdata, setCodingPlatformData] = useState(null);
  const [educationupdatedata, setEducationUpdateData] = useState(null);
  const [experienceupdatedata, setExperienceUpdateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState({
    name: '',
    tagline: '',
    city: '',
    state: '',
    country: '',
    profilepic: null
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
      setCodingPlatformData(userData?.codingplatforms || []);
    }
  }, [userData]);



  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    media: []
  });

  const [newExperience, setNewExperience] = useState({
    pic: '',
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    media: []
  });

  const [newEducation, setNewEducation] = useState({
    pic: '',
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

  const handleSaveCodingplatforms = () => {
    setIsCodingPlatformModeOpen(true);
    const data = {

    }
  }

  // Save updated about section
  const handleSaveAbout = async () => {
    setIsEditingAbout(false);
    setLoading(true);
    try {
      const updateUser = await fetch(process.env.REACT_APP_saveabout_api, {
        method: process.env.REACT_APP_saveabout_method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "about": aboutText
        })
      });
      const data = await updateUser.json();
      setLoading(false);

    } catch (error) {
      setLoading(false);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = 'Error in Saving About Section';

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
    }
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', userdata.name);
    formData.append('tagline', userdata.tagline);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
    console.log(userdata.profilepic);
    formData.append('pic', userdata.pic);


    try {
      console.log(userdata);
      const response = await fetch(process.env.REACT_APP_addskill_api, {
        method: process.env.REACT_APP_addskill_method,
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update profile details');
      }
      setIsAddProfileDetailsOpen(false);
      window.location.reload();
      setLoading(false);

    } catch (error) {
      setLoading(false);
    }
  };

  // Add a new skill
  const handleAddSkill = async () => {
    const newSkill = prompt('Enter new skill:');

    if (newSkill) {
      setLoading(true);

      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      try {
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
        setLoading(false);
        window.location.reload(); // Reload the page to clear state and redirect to login
      } catch (error) {
        setLoading(false);
        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = 'Error in Adding Skill';

        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
      }
      setLoading(false);
    }
  };


  // Add a new project
  const handleAddProject = async () => {
    setLoading(true);
    if (!newProject.title || !newProject.description) {
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = ("Please enter title and description for the project");

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
      setLoading(false);
      return;
    }
    // Send new project data to the server (optional)
    try {
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = 'Error in Adding Project';

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
    }
  };

  const handleAddExperience = async () => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append('title', newExperience.title);
    formdata.append('company', newExperience.company);
    formdata.append('startDate', newExperience.startDate);
    formdata.append('endDate', newExperience.endDate);
    formdata.append('description', newExperience.description);

    if (newExperience.pic) {
      formdata.append('pic', newExperience.pic);
    }


    try {
      const updateUser = await fetch(process.env.REACT_APP_addexperience_api, {
        method: process.env.REACT_APP_addexperience_method,
        credentials: 'include',
        body: formdata,
      });

      const data = await updateUser.json();
      console.log('Response from server:', data);
      setLoading(false);
      setIsAddExperienceModalOpen(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = 'Error in Adding Experience';

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
    }
  };

  const handleUpdateExperience = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append('title', experienceupdatedata.title);
    formdata.append('company', experienceupdatedata.company);
    formdata.append('startDate', experienceupdatedata.startDate);
    formdata.append('endDate', experienceupdatedata.endDate);
    formdata.append('description', experienceupdatedata.description);
    formdata.append('pic', experienceupdatedata.pic);
    formdata.append('_id', experienceupdatedata._id);

    try {
      // Send new experience data to the server (optional)
      const updateUser = await fetch(process.env.REACT_APP_updateexperience_api, {
        method: process.env.REACT_APP_updateexperience_method,
        credentials: 'include',
        body: formdata
      });
      const data = await updateUser.json();
      console.log("data : ", data);
      setIsUpdateEducationModalOpen(false);
      setLoading(false);
      window.location.reload(); // Reload the page to clear state and redirect to login
    } catch (error) {
      setLoading(false);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = 'Error in Adding Education';

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
    }
  }


  const handleAddEducation = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append('title', newEducation.title);
    formdata.append('institution', newEducation.institution);
    formdata.append('startDate', newEducation.startDate);
    formdata.append('endDate', newEducation.endDate);
    formdata.append('description', newEducation.description);
    formdata.append('pic', newEducation.pic);

    try {
      // Send new experience data to the server (optional)
      const updateUser = await fetch(process.env.REACT_APP_addeducation_api, {
        method: process.env.REACT_APP_addexperience_method,
        credentials: 'include',
        body: formdata
      });
      const data = await updateUser.json();
      console.log("data : ", data);
      setIsShowMoreEducationOpen(false);
      setLoading(false);
      window.location.reload(); // Reload the page to clear state and redirect to login
    } catch (error) {
      setLoading(false);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = 'Error in Adding Education';

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
    }
  };


  const handleDeleteExperience = async (id2) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append('delete', "yeah");
    formdata.append('_id', id2);
    try {
      // Send new experience data to the server (optional)
      const updateUser = await fetch(process.env.REACT_APP_deleteexperience_api, {
        method: process.env.REACT_APP_deleteexperience_method,
        credentials: 'include',
        body: formdata
      });
      const data = await updateUser.json();
      console.log("data : ", data);
      setLoading(false);
      window.location.reload(); // Reload the page to clear state and redirect to login
    } catch (error) {
      setLoading(false);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = 'Error in Adding Education';

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
    }
  }




  const handleDeleteEducation = async (id2) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append('_id', id2);
    try {

      const updateUser = await fetch(process.env.REACT_APP_deleteeducation_api, {
        method: process.env.REACT_APP_deleteeducation_method,
        credentials: 'include',
        body: formdata
      });

      const data = await updateUser.json();
      console.log("data : ", data);
      setLoading(false);
      window.location.reload(); // Reload the page to clear state and redirect to login
    } catch (error) {
      setLoading(false);
      console.log(error);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = 'Error in Adding Education';

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
    }
  }

  const handleUpdateEducation = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append('title', educationupdatedata.title);
    formdata.append('institution', educationupdatedata.institution);
    formdata.append('startDate', educationupdatedata.startDate);
    formdata.append('endDate', educationupdatedata.endDate);
    formdata.append('description', educationupdatedata.description);
    formdata.append('pic', educationupdatedata.pic);
    formdata.append('_id', educationupdatedata._id);

    try {
      // Send new experience data to the server (optional)
      const updateUser = await fetch(process.env.REACT_APP_updateeducation_api, {
        method: process.env.REACT_APP_updateeducation_method,
        credentials: 'include',
        body: formdata
      });
      const data = await updateUser.json();
      console.log("data : ", data);
      setIsUpdateEducationModalOpen(false);
      setLoading(false);
      // window.location.reload(); // Reload the page to clear state and redirect to login
    } catch (error) {
      setLoading(false);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';

      messageContainer.textContent = 'Error in Adding Education';

      document.body.appendChild(messageContainer);
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);
    }
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
  if (!userData) {
    return (<div className="buffer">
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </div>)
  }

  return (

    <div className="container">
      {/* Profile Header */}
      {loading && <div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>}
      <div className="profile-header">
        <div className="profile-left">

          <div >
            {

              userData.profilepic ? (

                <img

                  src={userData.profilepic}
                  alt="Profile Picture"
                  className="profile-picture"
                  id="profile1-pic"
                />

              ) :
                <div id="i400" onClick={() => { setIsAddProfileDetailsOpen(true) }} style={{ cursor: "pointer" }} >
                  <img src={userIcon} alt="Profile Picture" className="profile-picture" />
                  <p style={{ fontFamily: "Poppins", fontWeight: "600" }} id="pro-name" >Upload Profile Pic</p>
                </div>

            }

          </div>
          <div id="i402">
            <img onClick={() => setIsAddProfileDetailsOpen(true)} className='editbtn' style={{ height: "10px" }} src={edit} alt="edit" />

          </div>
          <h2 style={{ fontFamily: "Poppins", fontWeight: "600" }} id="pro-name">{userData.name}</h2>
          <p style={{ fontFamily: "Poppins", fontSize: "14px" }}>{userData.tagline}</p>
          <p style={{ fontSize: "14px" }} className="location">
            {userData.city}, {userData.state}, {userData.country}
          </p>

        </div>
        <div className="profile-right">

          <div className="about1" id="i302">
            <div className="about-section">
              <div className="about-section-a">
                <div className='simply'>
                  <h3 >About</h3>
                  {isEditingAbout ? (
                    <img onClick={handleSaveAbout} className='editbtn' src={saveIcon}></img>
                  ) : (
                    <img className='editbtn' onClick={() => setIsEditingAbout(true)} src={editIcon}></img>
                  )}
                </div>
                {isEditingAbout ? (

                  <textarea
                    id="i303"
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    className="about-text"
                  />

                ) : (
                  <p id="405" style={{ fontWeight: "400", fontSize: "15px" }}>{userData.about}</p>
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
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        </style>
        <h3 style={{ fontWeight: "700" }} className="exp-h3">Experiences</h3>
        <div className="experience-section">
          {(userData.experiences || []).slice(0, visibleExperiencesCount).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a123">

                <img id="education-photo" src={experience.pic || "https://www.google.com/imgres?q=company%20icon&imgurl=https%3A%2F%2Ftoppng.com%2Fuploads%2Fpreview%2Fbuilding-page-11-of-23-free-vectors-logos-icons-and-company-icon-11563539532xcbrgvknez.png&imgrefurl=https%3A%2F%2Feasysell.in%2F%3Fj%3D105352818850&docid=ycwHP3WZ7lZUPM&tbnid=jBuo7VUGJ85XPM&vet=12ahUKEwiMzuaCiOSKAxVfxDgGHWyZGGgQM3oECHsQAA..i&w=840&h=859&hcb=2&itg=1&ved=2ahUKEwiMzuaCiOSKAxVfxDgGHWyZGGgQM3oECHsQAA"} alt={experience.company} className="company-logo" />

                <div id="exp1">

                  <h4 id="hi12" className="title" >{experience.title}</h4>
                  <p id="hi11" style={{ fontWeight: "500" }} >{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                  <p id="hi510" className="description" style={{ marginTop: "20px", fontWeight: "400" }}>{experience.description}</p>

                </div>
              </div>
              <div className="profile-update-delete">
                <a href="#" className="show-more" onClick={() => { setExperienceUpdateData(experience); setIsUpdateExperienceModalOpen(true) }}><img src={edit} className="update-buttons" /></a>
                <a href="#" className="show-more" onClick={() => { setExperienceUpdateData(experience); handleDeleteExperience(experience._id) }}><img src={delete3} className="update-buttons" /></a>
              </div>

            </div>
          ))}
          {(userData.experiences || []).length > 5 && visibleExperiencesCount < (userData.experiences || []).length && (
            <a href="#" className="show-more" onClick={handleShowMoreExperiences}>Show More</a>
          )}
          <a href="#" className="add-more-projects" onClick={() => setIsAddExperienceModalOpen(true)}>Add Experience</a>
        </div>

        {/* Projects Section */}
        <h3 style={{ marginTop: "100px" }} className="exp-h3">Projects</h3>
        <div className="pro">
          <div className="projects-section">
            {(userData.projects || []).slice(0, visibleProjectsCount).map((project, index) => (
              <div key={index} className="project-item">
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h4 className="project-item-t" style={{ fontSize: "17px" }}>{project.title}</h4>
                </div>
                <p className="project-item-s" style={{ fontWeight: "500" }}>{project.description}</p>
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
        <h3 style={{ marginTop: "100px" }} className="exp-h3">Education</h3>
        <div id="education-dddd" className="experience-section">
          {(userData.education || []).slice(0, visibleExperiencesCount).map((experience, index) => (

            <div key={index} className="experience-item">
              <div className="experience-item-a123">
                <img id="education-photo" src={experience.pic || "https://www.google.com/imgres?q=company%20icon&imgurl=https%3A%2F%2Ftoppng.com%2Fuploads%2Fpreview%2Fbuilding-page-11-of-23-free-vectors-logos-icons-and-company-icon-11563539532xcbrgvknez.png&imgrefurl=https%3A%2F%2Feasysell.in%2F%3Fj%3D105352818850&docid=ycwHP3WZ7lZUPM&tbnid=jBuo7VUGJ85XPM&vet=12ahUKEwiMzuaCiOSKAxVfxDgGHWyZGGgQM3oECHsQAA..i&w=840&h=859&hcb=2&itg=1&ved=2ahUKEwiMzuaCiOSKAxVfxDgGHWyZGGgQM3oECHsQAA"} alt={experience.company} className="company-logo" />
                <div id="exp1" >

                  <h4 id="hi12" className="title">{experience.institution}</h4>

                  <h4 id="hi10" className="title">{experience.title}  {'('}{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}{')'}</h4>
                  <p id="hi510" className="description" style={{ fontWeight: "500" }}>{experience.description}</p>
                </div>
              </div>
              <div className="profile-update-delete">
                <a href="#" className="show-more" onClick={() => { setEducationUpdateData(experience); setIsUpdateEducationModalOpen(true) }}><img src={edit} className="update-buttons" /></a>
                <a href="#" className="show-more" onClick={() => { setEducationUpdateData(experience); handleDeleteEducation(experience._id) }}><img src={delete3} className="update-buttons" /></a>
              </div>




            </div>

          ))}
          {(userData.education || []).length > 5 && visibleExperiencesCount < (userData.education || []).length && (
            <a href="#" className="show-more" onClick={handleShowMoreEducation}>Show More</a>
          )}
          <a href="#" className="add-more-projects" onClick={() => setIsAddEducationModalOpen(true)}>Add Education</a>
        </div>

      </div>


      <Modal isOpen={isCodingPlatformModeOpen} onClose={() => setIsCodingPlatformModeOpen(false)}>
        <h3>Update Coding Platforms</h3>
        <div className="coding-platforms-input-data">
          <div className="platform-input-box">
            <image src={logos.codechef} alt="CodeChef Logo" className="coding-platform-logo" />
            <input
              type="url"
              placeholder="CodeChef Profile Link"
              value={codingplatformdata?.codechef || ''}
              onChange={(e) => setCodingPlatformData({ ...codingplatformdata, codechef: e.target.value })}
            />
          </div>
          <div className="platform-input-box">
            <image src={logos.geeksforgeeks} alt="GeeksforGeeks Logo" className="coding-platform-logo" />
            <input
              type="url"
              placeholder="GeeksforGeeks Profile Link"
              value={codingplatformdata?.geeksforgeeks || ''}
              onChange={(e) => setCodingPlatformData({ ...codingplatformdata, geeksforgeeks: e.target.value })}
            />
          </div>
          <div className="platform-input-box">
            <image src={logos.github} alt="GitHub Logo" className="coding-platform-logo" />
            <input
              type="url"
              placeholder="GitHub Profile Link"
              value={codingplatformdata?.github || ''}
              onChange={(e) => setCodingPlatformData({ ...codingplatformdata, github: e.target.value })}
            />
          </div>
          <div className="platform-input-box">
            <image src={logos.hackerrank} alt="HackerRank Logo" className="coding-platform-logo" />
            <input
              type="url"
              placeholder="HackerRank Profile Link"
              value={codingplatformdata?.hackerrank || ''}
              onChange={(e) => setCodingPlatformData({ ...codingplatformdata, hackerrank: e.target.value })}
            />
          </div>
          <div className="platform-input-box">
            <image src={logos.leetcode} alt="LeetCode Logo" className="coding-platform-logo" />
            <input
              type="url"
              placeholder="LeetCode Profile Link"
              value={codingplatformdata?.leetcode || ''}
              onChange={(e) => setCodingPlatformData({ ...codingplatformdata, leetcode: e.target.value })}
            />
          </div>
          <button type="submit">Submit</button>

        </div>

      </Modal>
      <Modal isOpen={isAddProfileDetailsOpen} onClose={() => setIsAddProfileDetailsOpen(false)}>
        <h3>Update Profile Details</h3>
        <form className="addproject" onSubmit={(e) => { e.preventDefault(); handleUpdateDetails(e); }}>
          <div className="profice-update2-image">
            <p style={{ fontFamily: "Poppins", fontWeight: "600" }} id="pro-name">Upload</p>
            <input type="file" onChange={(e) => setUserdata({ ...userdata, pic: e.target.files[0] })} />
          </div>
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
          <div className="profice-update2-image">
            <p style={{ fontFamily: "Poppins", fontWeight: "600" }} id="pro-name">Upload</p>
            <input type="file" onChange={(e) => setNewExperience({ ...newExperience, pic: e.target.files[0] })} />
          </div>
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
          <div className="profice-update2-image">
            <p style={{ fontFamily: "Poppins", fontWeight: "600" }} id="pro-name">Upload</p>
            <input type="file" onChange={(e) => setNewEducation({ ...newEducation, pic: e.target.files[0] })} />
          </div>
          <input

            placeholder="Title"
            value={newEducation.title}
            onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
            required
          />
          <input

            placeholder="Institution or College or School"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
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

      <Modal isOpen={isUpdateEducationModalOpen} onClose={() => setIsUpdateEducationModalOpen(false)}>
        <h3>Update Education</h3>
        <form className="addexperience" onSubmit={(e) => { handleUpdateEducation(); e.preventDefault(); }}>
          <div className="profice-update2-image">
            <p style={{ fontFamily: "Poppins", fontWeight: "600" }} id="pro-name">Upload</p>
            <input type="file" onChange={(e) => setEducationUpdateData({ ...educationupdatedata, pic: e.target.files[0] })} />
          </div>
          <input

            placeholder="Title"
            value={educationupdatedata?.title}
            onChange={(e) => setEducationUpdateData({ ...educationupdatedata, title: e.target.value })}
            required
          />
          <input

            placeholder="Institution or College or School"
            value={educationupdatedata?.institution}
            onChange={(e) => setEducationUpdateData({ ...educationupdatedata, institution: e.target.value })}
            required
          />
          <div>
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={educationupdatedata?.startDate.slice(0, 10)}
              onChange={(e) => setEducationUpdateData({ ...educationupdatedata, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={educationupdatedata?.endDate.slice(0, 10)}
              onChange={(e) => setEducationUpdateData({ ...educationupdatedata, endDate: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description"
            value={educationupdatedata?.description}
            onChange={(e) => setEducationUpdateData({ ...educationupdatedata, description: e.target.value })}
            required
          />
          <button type="submit">Update Education</button>
        </form>
      </Modal>

      <Modal isOpen={isUpdateExperienceModalOpen} onClose={() => setIsUpdateExperienceModalOpen(false)}>
        <h3>Update Experience</h3>
        <form className="addexperience" onSubmit={(e) => { handleUpdateExperience(); e.preventDefault(); }}>
          <div className="profice-update2-image">
            <p style={{ fontFamily: "Poppins", fontWeight: "600" }} id="pro-name">Upload</p>
            <input type="file" onChange={(e) => setExperienceUpdateData({ ...experienceupdatedata, pic: e.target.files[0] })} />
          </div>
          <input

            placeholder="Title"
            value={experienceupdatedata?.title}
            onChange={(e) => setExperienceUpdateData({ ...experienceupdatedata, title: e.target.value })}
            required
          />
          <input

            placeholder="Institution or College or School"
            value={experienceupdatedata?.company}
            onChange={(e) => setExperienceUpdateData({ ...experienceupdatedata, company: e.target.value })}
            required
          />
          <div>
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={experienceupdatedata?.startDate.slice(0, 10)}
              onChange={(e) => setExperienceUpdateData({ ...experienceupdatedata, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={experienceupdatedata?.endDate.slice(0, 10)}
              onChange={(e) => setExperienceUpdateData({ ...experienceupdatedata, endDate: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description"
            value={experienceupdatedata?.description}
            onChange={(e) => setExperienceUpdateData({ ...educationupdatedata, description: e.target.value })}
            required
          />
          <button type="submit">Update Experience</button>
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
