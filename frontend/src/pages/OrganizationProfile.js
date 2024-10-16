import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import Modal from './Model'; // Ensure this is imported correctly
import { selectOrganization, setOrganizationDetails } from '../store/OrganizationSlice';
import editIcon from './images/edit-icon.svg'
import saveIcon from './images/floppy-disk-regular.svg'
import google from './images/google.png'
import linkIcon from './images/link-solid.svg'

// Component for displaying and editing organization profile
const OrganizationProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const organizationData = useSelector(selectOrganization);

  // State for handling editable about section
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(organizationData?.about || '');

  // Fetch organization details
  const fetchOrganizationDetails = async () => {
    // console.log("details : ",process.env.REACT_APP_organization_details)
    const response = await fetch(process.env.REACT_APP_organization_details, {
      method: process.env.REACT_APP_organization_details_method,
      credentials: 'include',
    });
    const data = await response.json();
    if (data.success) {
      dispatch(setOrganizationDetails(data.data));
    } else {
      console.error('Error:', data.message);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchOrganizationDetails();
  }, [dispatch, navigate]);

  // Save updated about section
  const handleSaveAbout = async () => {
    setIsEditingAbout(false);
    const response = await fetch(process.env.REACT_APP_organization_saveabout_api, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ about: aboutText }),
    });
    const data = await response.json();
    if (data.success) {
      dispatch(setOrganizationDetails(data.data)); // Update Redux store
    } else {
      console.error('Error:', data.message);
    }
  };

  if (!organizationData) {
    return (<div className="buffer">
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  </div>)
  }

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-left">
            <img
              src={organizationData.logo || google}
              alt="Organization Logo"
              className="profile-picture company-log"
            />
          <h2>{organizationData.companyname}</h2>
          <p className="location">
            {organizationData.city}, {organizationData.state}, {organizationData.country}
          </p>
        </div>
        <div className='profile-right'> 
          <p>Company Rating : 4/5</p>
          <p>Company Size : 10,000 - 50,000</p>
          <p>4th Sep 1998- Present</p>
          <p>HeadQuarters : <a href="https://maps.app.goo.gl/P8PBMSPnTJQJAsMY6" target='blank' id="headQ">Googleplex, California
          <img src={linkIcon} className='iconnn'></img></a></p>
        </div>
      </div>

      {/* About Section */}
      <div className="about">
        <div className="about-section">
          <div className="about-section-a">
            <div className='simply'>
              <h3>About</h3>
              {isEditingAbout ? (
                <img onClick={handleSaveAbout} src={saveIcon} className='editbtn'></img>
              ) : (
                <img onClick={() => setIsEditingAbout(true)} src={editIcon} className='editbtn'></img>
              )}
            </div>
            {isEditingAbout ? (
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="about-text"
              />
            ) : (
              <p>{organizationData.about}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit About Modal */}
      <Modal isOpen={isEditingAbout} onClose={() => setIsEditingAbout(false)}>
        <h3>Edit About</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleSaveAbout(); }}>
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="about-text"
            required
          />
          <button  type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default OrganizationProfile;
