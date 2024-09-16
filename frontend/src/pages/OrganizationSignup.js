import React, { useState } from 'react';
import './JobSeekerSignup.css';


const JobSeekerSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      <h1 className="form-title">Organization or Job Provider</h1>
      <div className="signup-form">
        <h2 className="form-subtitle">Signup</h2>
        <form>
          <input type="text" placeholder="Name" className="form-input" />
          <input type="email" placeholder="Email" className="form-input" />
          
          <div className="password-container">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="form-input" 
            />
            <span id="pwd" onClick={togglePasswordVisibility} className="password-toggle">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          
          <div className="password-container">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm Password" 
              className="form-input" 
            />
            <span id="pwd" onClick={toggleConfirmPasswordVisibility} className="password-toggle">
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
          
          <div className="address-container">
            <input type="text" placeholder="Country" className="form-input small-input" />
            <input type="text" placeholder="State" className="form-input small-input" />
          </div>
          <div className="address-container">
            <input type="text" placeholder="City" className="form-input small-input" />
            
          </div>

          <button type="submit" className="submit-button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerSignup;
