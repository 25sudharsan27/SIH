import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import Modal from './Model'; // Ensure this is imported correctly
import { selectOrganization, setOrganizationDetails } from '../store/OrganizationSlice';

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
    const response = await fetch('http://localhost:8000/organization/organizationdetails', {
      method: 'POST',
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
    const response = await fetch('http://localhost:8000/organization//addorganization', {
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

  if (!organizationData) return <p>Loading...</p>;

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-left">
          <img
            src={organizationData.logo || 'images/logo-placeholder.svg'}
            alt="Organization Logo"
            className="profile-picture"
          />
          <h2>{organizationData.companyname}</h2>
          <p className="location">
            {organizationData.city}, {organizationData.state}, {organizationData.country}
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="about">
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
              <p>{organizationData.about}</p>
            )}
            {isEditingAbout ? (
              <a onClick={handleSaveAbout}>Save</a>
            ) : (
              <a onClick={() => setIsEditingAbout(true)}>Edit</a>
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
