import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../UserPages/ProfilePage/profile.css';
import Modal from '../../../components/Model/Model'; // Ensure this is imported correctly
import { selectOrganization, setOrganizationDetails } from '../../../store/OrganizationSlice';
import editIcon from '../../../images/edit-icon.svg'
import saveIcon from '../../../images/floppy-disk-regular.svg'
import linkIcon from '../../../images/link-solid.svg'
import edit from '../../../images/edit.png';
import userIcon from '../../../images/user-icon-svgrepo-com (1).svg'


import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";



// Component for displaying and editing organization profile
const OrganizationProfile = () => {


  const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);

    const [isAddProfileDetailsOpen, setIsAddProfileDetailsOpen] = useState(false);
  const [loading,setLoading] = useState(false);

    const [userdata, setUserdata] = useState({
        companyname: '',
        city: '',
        state: '',
        country: '',
        pic: null
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const organizationData = useSelector(selectOrganization);

  // State for handling editable about section
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(organizationData?.about || '');

  const handleUpdateDetails = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', userdata.name);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
    formData.append('pic', userdata.pic);

    console.log(formData);
    try {
      console.log(userdata);
      const response = await fetch(process.env.REACT_APP_organization_saveabout_api, {
        method: process.env.REACT_APP_organization_saveabout_method,
        credentials: 'include',
        body: formData,
      });
      
      if (!response.ok){
        console.log(response);
       throw new Error('Failed to update profile details');
      }
      setIsAddProfileDetailsOpen(false);
      // window.location.reload();
      setLoading(false);

    } catch (error) {
      setLoading(false);
      // console.error(error);
    }
  };


  // Fetch organization details
  const fetchOrganizationDetails = async () => {
    // console.log("details : ",process.env.REACT_APP_organization_details)
    const response = await fetch(process.env.REACT_APP_organization_details, {
      method: process.env.REACT_APP_organization_details_method,
      credentials: 'include',
    });
    const data = await response.json();
    console.log("data  ",data);
    if (data.success) {
      dispatch(setOrganizationDetails(data.data));
      setUserdata({
        name: data.data.companyname || '',
        city: data.data.city || '',
        state: data.data.state || '',
        country: data.data.country || '',
        
      });
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

    const response = await fetch(process.env.REACT_APP_organization_about, {
      method: process.env.REACT_APP_organization_about_method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        about: aboutText, // Updated about text
      }),
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
      {loading&&<div className="buffer">
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </div>}
      <div className="profile-header">
        <div className="profile-left">
            <div id="i400">
              <img
                src={organizationData.pic || userIcon}
                alt="Organization Logo"
                className="profile-picture company-log"
              />
            </div>
            
          <h2 id="i402">{organizationData.companyname}</h2>
          <p className="location">
            {organizationData.city}, {organizationData.state}, {organizationData.country}
            <img onClick={() => setIsAddProfileDetailsOpen(true)} className='editbtn' style={{height:"10px"}} src={edit} alt="edit" />

          </p>
        </div>
        <div id="i407" className='profile-right'> 
          <p id="i406">Company Rating : 4/5</p>
          <p id="i406">Company Size : 10,000 - 50,000</p>
          <p id="i406">4th Sep 1998- Present</p>
          <p id="i406">HeadQuarters : <a href="https://maps.app.goo.gl/P8PBMSPnTJQJAsMY6" target='blank' id="headQ">Googleplex, California
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

      <Modal isOpen={isAddProfileDetailsOpen} onClose={() => setIsAddProfileDetailsOpen(false)}>
          <h3>Update Profile Details</h3>
          <form className="addproject" onSubmit={(e) => { e.preventDefault(); handleUpdateDetails(); }}>
            <div className="profice-update2-image">
              <p style={{fontFamily:"Poppins",fontWeight:"600"}} id="pro-name">Upload</p>
              <input type="file"   onChange={(e) => setUserdata({ ...userdata, pic: e.target.files[0] })}  />
            </div>
            <input
              placeholder="Name"
              value={userdata.name}
              onChange={(e) => setUserdata({ ...userdata, name: e.target.value })}
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

    </div>
  );
};

export default OrganizationProfile;
