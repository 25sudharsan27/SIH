/* eslint-disable no-undef */
import React, { useState,useEffect } from 'react';
import '../ProfilePage/profile.css';
import Modal from '../../../components/Model/Model.js'; // Make sure this is imported correctly

import linkIcon from '../../../images/link-solid.svg'
import HeatMap from '../HeatMap/HeatMap';
import leetcode from '../../../images/leetcode.svg'
import hackerrank from '../../../images/hackerrank.svg'
import github from '../../../images/github.svg'
import userIcon from '../../../images/user-icon-svgrepo-com (1).svg'
import { useParams } from 'react-router-dom';

import "react-country-state-city/dist/react-country-state-city.css";

// import profile from './images/logesh.jpg'
import '../../../components/Model/Model.css';
import UserNavbar from '../../../components/UserNavbar/usernavbar.js';

const ProfilePage =  () => {
  const logos =
  {
    'codechef': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683635/htezq9oicurm58xubddv.webp',
    'geeksforgeeks': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683635/esrjeuprlcfcjj1bk0cz.webp',
    'github': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683636/xdwqzyuhacwm1b6r7hkz.webp',
    'hackerrank': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683638/k7iotdhmx9nwni4d1ery.webp',
    'leetcode': 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752683636/dl9i6oaodrcez5shi4bj.webp'
  }

  const [userData, setUserData] = useState(null);

  const { id } = useParams('id');

    useEffect(() => {
      
        const fetchUser = async () => {
            const response = await fetch(process.env.REACT_APP_profile_data_api+"/"+id, {
                method: process.env.REACT_APP_profile_data_method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setUserData(data.data[0]);
        };
        fetchUser();
    }, [id]);

  
  const [isShowMoreProjectsOpen, setIsShowMoreProjectsOpen] = useState(false);
  const [isShowMoreExperiencesOpen, setIsShowMoreExperiencesOpen] = useState(false);
  const [isShowMoreEducationOpen,setIsShowMoreEducationOpen] = useState(false);

  const [city, setCity] = useState('');
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);

  const [loading,setLoading] = useState(false);
  const [userdata, setUserdata] = useState({
    name: '',
    tagline: '',
    city: '',
    state: '',
    country: '',
    profilepic: null
  });

 

  
  // State for visible items
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(5);
  const [visibleExperiencesCount, setVisibleExperiencesCount] = useState(5);
  const [visibleEducationCount, setVisibleEducationCount] = useState(5);



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
  if (!userData){ return (<div className="buffer">
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
</div>)
  }

  return (
    <div className="user-pages">
        <UserNavbar/>
    
    <div className="container">
      {/* Profile Header */}
      {loading&&<div className="buffer">
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
          <div id="i400" onClick={()=>{setIsAddProfileDetailsOpen(true)}} style={{cursor:"pointer"}} >
            <img src={userIcon} alt="Profile Picture" className="profile-picture" />
            <p style={{fontFamily:"Poppins",fontWeight:"600"}} id="pro-name" >Upload Profile Pic</p>
          </div>
            
          }
          
          </div>
          <div id="i402">

          </div>
          <h2 style={{fontFamily:"Poppins",fontWeight:"600"}} id="pro-name">{userData.name}</h2>
          <p style={{fontFamily:"Poppins",fontSize:"14px"}}>{userData.tagline}</p>
          <p style={{fontSize:"14px"}} className="location">
            {userData.city}, {userData.state}, {userData.country}
          </p>

          </div>


          <div>
            <div className="coding-platform-btn" style={{display:'flex',gap:'20px',flex:'wrap'}}>
              {
                userData?.codingplatforms && Object.keys(userData.codingplatforms).map((platform)=>{
                  return (
                    <a href={userData?.codingplatforms && userData?.codingplatforms[platform] ? userData.codingplatforms[platform] : '#'} target="_blank" rel="noopener noreferrer">
                        <img src={logos[platform]} alt={platform} className={"coding-platform-logo"+((userData?.codingplatforms&& userData?.codingplatforms[platform]) ? null : 'disable-ref')} />
                    </a>
                  )
                })
              }
            </div>
            
          </div>
      </div>

      <div className="complete">
        <div className="about">
          {/* About Section */}
          <div className="about1" id="i302">
          <div  className="about-section">
            <div className="about-section-a">
              <div className='simply'>
                <h3 >About</h3>
               
              </div>
            
                <p id="405" style={{fontWeight:"400",fontSize:"15px"}}>{userData.about}</p>
            </div>
          </div>

          <div className="skills-section">
            <div className="skill-section-a">
              <div className='simply'>
                <h3>Skills</h3>
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
        <h3 style={{fontWeight:"700"}} className="exp-h3">Experiences</h3>
        <div className="experience-section">
          {(userData.experiences || []).slice(0, visibleExperiencesCount).map((experience, index) => (
            <div key={index} className="experience-item">
              <div className="experience-item-a123">
             
                <img id="education-photo" src={experience.pic || "https://www.google.com/imgres?q=company%20icon&imgurl=https%3A%2F%2Ftoppng.com%2Fuploads%2Fpreview%2Fbuilding-page-11-of-23-free-vectors-logos-icons-and-company-icon-11563539532xcbrgvknez.png&imgrefurl=https%3A%2F%2Feasysell.in%2F%3Fj%3D105352818850&docid=ycwHP3WZ7lZUPM&tbnid=jBuo7VUGJ85XPM&vet=12ahUKEwiMzuaCiOSKAxVfxDgGHWyZGGgQM3oECHsQAA..i&w=840&h=859&hcb=2&itg=1&ved=2ahUKEwiMzuaCiOSKAxVfxDgGHWyZGGgQM3oECHsQAA"} alt={experience.company} className="company-logo" />
              
              <div id="exp1">
                 
                <h4 id="hi12" className="title" >{experience.title}</h4>
                <p  id="hi11" style={{fontWeight:"500"}} >{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p id="hi510" className="description" style={{marginTop:"20px",fontWeight:"400"}}>{experience.description}</p>
                  
              </div>
              </div>
              
            </div>
          ))}
          {(userData.experiences || []).length > 5 && visibleExperiencesCount < (userData.experiences || []).length && (
            <a href="#" className="show-more" onClick={handleShowMoreExperiences}>Show More</a>
          )}
        </div>

        {/* Projects Section */}
        <h3 style={{marginTop:"100px"}} className="exp-h3">Projects</h3>
        <div className="pro">
          <div className="projects-section">
            {(userData.projects || []).slice(0, visibleProjectsCount).map((project, index) => (
              <div key={index} className="project-item">
                <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h4 className="project-item-t" style={{fontSize:"17px"}}>{project.title}</h4>
                </div>
                <p className="project-item-s" style={{fontWeight:"500"}}>{project.description}</p>
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
          
        </div>
        <h3 style={{marginTop:"100px"}} className="exp-h3">Education</h3>
        <div id="education-dddd" className="experience-section">
          {(userData.education || []).slice(0, visibleExperiencesCount).map((experience, index) => (
            
            <div  key={index} className="experience-item">
              <div className="experience-item-a123">
                <img id="education-photo" src={experience.pic || "https://www.google.com/imgres?q=company%20icon&imgurl=https%3A%2F%2Ftoppng.com%2Fuploads%2Fpreview%2Fbuilding-page-11-of-23-free-vectors-logos-icons-and-company-icon-11563539532xcbrgvknez.png&imgrefurl=https%3A%2F%2Feasysell.in%2F%3Fj%3D105352818850&docid=ycwHP3WZ7lZUPM&tbnid=jBuo7VUGJ85XPM&vet=12ahUKEwiMzuaCiOSKAxVfxDgGHWyZGGgQM3oECHsQAA..i&w=840&h=859&hcb=2&itg=1&ved=2ahUKEwiMzuaCiOSKAxVfxDgGHWyZGGgQM3oECHsQAA"} alt={experience.company} className="company-logo" />
                <div  id="exp1" >

                  <h4 id="hi12" className="title">{experience.institution}</h4>

                  <h4 id="hi10" className="title">{experience.title}  {'('}{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}{')'}</h4>
                  <p id="hi510"  className="description" style={{fontWeight:"500"}}>{experience.description}</p>
                </div>
                </div>
                
              
       
              

            </div>

          ))}
          {(userData.education || []).length > 5 && visibleExperiencesCount < (userData.education || []).length && (
            <a href="#" className="show-more" onClick={handleShowMoreEducation}>Show More</a>
          )}
        </div>

      </div>



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
    </div>
  );
};

export default ProfilePage;
