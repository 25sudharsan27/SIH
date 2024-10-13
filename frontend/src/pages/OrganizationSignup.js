import React, { useState } from 'react';
import './JobSeekerSignup.css';
import { useNavigate } from 'react-router-dom';

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";



const JobSeekerSignup = () => {

  const navigate = new useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: ''
  });

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation can be added here
    
    try {
      const response = await fetch(process.env.REACT_APP_orgsignup_api, { // Replace with your API endpoint
        method: process.env.REACT_APP_orgsignup_method,
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ ...formData, country: country, state: state, city: city }),
      });
      
      const data = await response.json();
      if (response.ok) {
        // console.log('Registration successful', data);
        alert("successfully created");
        navigate("/organization/login")

        // Redirect or show success message
      } else {
        console.error('Registration failed', data);
        // Handle error
      }
    } catch (error) {
      console.error('Network error', error);
      // Handle network error
    }
  };

  return (
    <div className="signup-container">
      <h1 className="form-title">Organization or Job Provider</h1>
      <div id="i145" className="signup-form">
        <h2 id="i146" className="form-subtitle">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input id="i147"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-input"
          />
          <input id="i147"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-input"
          />
          
          <div className="password-container">
            <input id="i147"
              type={showPassword ? "" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
            />
            <span
              id="pwd"
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          
          <div className="password-container">
            <input id="i147"
              type={showConfirmPassword ? "" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="form-input"
            />
            <span
              id="pwd"
              onClick={toggleConfirmPasswordVisibility}
              className="password-toggle"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
          
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

          <button id="i148" type="submit" className="submit-button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerSignup;
