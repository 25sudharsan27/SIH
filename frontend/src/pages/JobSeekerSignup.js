import React, { useState } from 'react';
import './JobSeekerSignup.css';
import { Link, useNavigate } from 'react-router-dom';

const JobSeekerSignup = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Toggles for showing and hiding passwords
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('Password should be at least 8 characters long');
      return; // Stop further execution if password is too short
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return; // Stop further execution if passwords don't match
    }

    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: 'POST',
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
        alert('Signup successful');
        console.log(data);

        navigate('/jobseeker/login');
      } else {
        alert('Signup failed : '+data.message);
        if(data.message === 'User Already Exists'){
          console.log("went to login page");
          navigate('/jobseeker/login');        }
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="form-title">Student or Job Seeker</h1>
      <div className="signup-form">
        <h2 className="form-subtitle">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span id="pwd" onClick={togglePasswordVisibility} className="password-toggle">
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span id="pwd" onClick={toggleConfirmPasswordVisibility} className="password-toggle">
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="address-container">
            <input
              type="text"
              placeholder="Country"
              className="form-input small-input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              className="form-input small-input"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="address-container">
            <input
              type="text"
              placeholder="City"
              className="form-input small-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              className="form-input small-input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerSignup;
