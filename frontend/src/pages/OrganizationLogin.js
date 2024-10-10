import React, { useState } from 'react';
// import './JobSeekerLogin.css';
import { useNavigate } from 'react-router-dom';
import './OrganizationLogin.css';

const JobSeekerLogin = () => {
  const navigate = new useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log("Email:", email, "Password:", password);
    try {
      const response = await fetch(process.env.REACT_APP_orglogin_api, { // Replace with your API endpoint
        method: process.env.REACT_APP_orglogin_method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email":email,
          "password":password
        }),
        credentials: 'include',
      });
      
      const data = await response.json();
      if (response.ok) {
        // console.log('Registration successful', data);
        alert("Signed up Successfully");
        navigate("/organization/profile")

        // Redirect or show success message
      } else {
        console.error('Registration failed', data);
        // Handle error
      }
    } catch (error) {
      console.error('Network error', error);
      // Handle network error
    }

  }

  return (
    <div id="i135" className="login-container">
      <h1 id="i136" className="form-title">Organization or Job Provider</h1>
      <div id="i137" className="login-form">
        <h2 id="i138" className="form-subtitle">Login</h2>
        <form id="i139" onSubmit={handleSubmit}>
          <div id="i140" className="form-group">
            <label id="i141">Email</label>
            <input id="i142"
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label id="i141">Password</label>
            <input id="i142"
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button id="i143" type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerLogin;
