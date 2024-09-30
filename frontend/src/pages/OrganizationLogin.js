import React, { useState } from 'react';
import './JobSeekerLogin.css';
import { useNavigate } from 'react-router-dom';

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
        console.log('Registration successful', data);
        alert("successfully created");
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
    <div className="login-container">
      <h1 className="form-title">Organization or Job Provider</h1>
      <div className="login-form">
        <h2 className="form-subtitle">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerLogin;
