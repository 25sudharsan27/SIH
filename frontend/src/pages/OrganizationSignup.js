import React, { useState } from 'react';
import './JobSeekerSignup.css';
import { useNavigate } from 'react-router-dom';

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
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful', data);
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
      <div className="signup-form">
        <h2 className="form-subtitle">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-input"
          />
          
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
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
            <input
              type={showConfirmPassword ? "text" : "password"}
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
          
          <div className="address-container">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="form-input small-input"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="form-input small-input"
            />
          </div>
          <div className="address-container">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="form-input small-input"
            />
          </div>

          <button type="submit" className="submit-button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerSignup;
