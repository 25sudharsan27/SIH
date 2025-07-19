import React, { useState } from 'react';
import './JobSeekerSignup.css';
import { useNavigate } from 'react-router-dom';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import eye from '../../../images/eye.png';
import hidden from '../../../images/hidden.png';

const JobSeekerSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isBuffereing, setIsBuffering] = useState(false);


  const navigate = useNavigate();

  // Toggles for showing and hiding passwords
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBuffering(true);

    if (password !== confirmPassword) {
      setIsBuffering(false);

      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';
      messageContainer.textContent = 'Signup failed: ' + "Passwords do not match";

      document.body.appendChild(messageContainer);

      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);

      return;
    }
    if (password.length < 8) {
      setIsBuffering(false);

      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';
      messageContainer.textContent = 'Signup failed: ' + "Password should be at least 8 characters long";

      document.body.appendChild(messageContainer);

      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);


    }
    setIsBuffering(true);

    try {
      const response = await fetch(process.env.REACT_APP_usersignup_api, {
        method: process.env.REACT_APP_usersignup_method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          country,
          state,
          city,
          age,
        }),
      });

      const data = await response.json();

      if (data.success) {

        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.id = "i233"
        messageContainer.textContent = 'User Created Sucessfully ';

        document.body.appendChild(messageContainer);

        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);

        navigate('/jobseeker/login');

      } else {
        setIsBuffering(false);

        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.textContent = 'Signup failed: ' + data.message;

        document.body.appendChild(messageContainer);

        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
        if (data.message === 'User Already Exists') {
          navigate('/jobseeker/login');
        }
      }
    } catch (error) {

      setIsBuffering(false);
      const messageContainer = document.createElement('div');
      messageContainer.className = 'popup-message';
      messageContainer.textContent = 'Signup failed: ' + error.message;

      document.body.appendChild(messageContainer);

      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000);

    }

  };

  return (
    <div className="signup-container">
      {isBuffereing && <div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>}
      <h1 className="form-title">Student or Job Seeker</h1>
      <div id="i145" className="signup-form">
        <h2 id="i146" className="form-subtitle">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="i147"
            placeholder="Name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            id="i147"
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              id="i147"
              type={showPassword ? '' : 'password'}
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={togglePasswordVisibility} className="password-toggle">
              {showPassword ? <img src={hidden} alt='👁️' style={{ width: '20px' }} /> : <img src={eye} alt='👁️' style={{ width: '20px' }} />}
            </span>
          </div>
          <div className="password-container">
            <input
              id="i147"
              type={showConfirmPassword ? '' : 'password'}
              placeholder="Confirm Password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={toggleConfirmPasswordVisibility} className="password-toggle">
              {showConfirmPassword ? <img src={hidden} alt='👁️' style={{ width: '20px' }} /> : <img src={eye} alt='👁️' style={{ width: '20px' }} />}
            </span>
          </div>


          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setCountry(e.name); 
              setState(''); 
              setCity('');
            }}
            placeHolder="Select Country"
            value={countryid} 
          />
          <br />

          <StateSelect
            countryid={countryid}
            onChange={(e) => {
              setStateid(e.id);
              setState(e.name); 
              setCity('');
            }}
            placeHolder="Select State"
            value={stateid} 
          />
          <br />

          <CitySelect
            countryid={countryid}
            stateid={stateid}
            onChange={(e) => {
              setCity(e.name);
            }}
            placeHolder="Select City"
            value={city} 
          />
          <br />

          <div className="address-container">
            <input
              id="i147"
              type="number"
              placeholder="Age"
              className="form-input small-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button id="i148" type="submit" className="submit-button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerSignup;
