import React, { useState } from 'react';
import './JobSeekerLogin.css';

const JobSeekerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log("Email:", email, "Password:", password);
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
