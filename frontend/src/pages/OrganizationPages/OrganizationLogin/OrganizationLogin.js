import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrganizationLogin.css';

const JobSeekerLogin = () => {
  const navigate = new useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBuffereing , setIsBuffering] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Implement your login logic here
    setIsBuffering(true);

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
        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.id = "i233"
        messageContainer.textContent = 'Logged Sucessfully ';
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
        navigate("/organization/profile")

        // Redirect or show success message
      } else {
        setIsBuffering(false);

        // console.error('Registration failed', data);
        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = 'Signup failed: ' +( data.message==="Organization not found" ? "Check your Email Id" : data.message);
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
        // Handle error
      }
    } catch (error) {
      setIsBuffering(false);

        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.textContent = 'Signup failed: ' + error.message;
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    }

  }

  return (
    <div id="i135" className="login-container">
      {isBuffereing &&<div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>}
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
      <div style={{marginTop: '20px', textAlign: 'center'}}>
        <p style={{fontSize: '14px', color: '#666'}}>
          Sample Account:  
        </p>
        <p style={{fontSize: '14px', color: '#666'}}>
          <b style={{color:"black"}}>Email</b> : smil@gmai.com  
        </p>
        <p style={{fontSize: '14px', color: '#666'}}>
          <b style={{color :"black" }}>Password</b> : 123456789a
        </p>
      </div>
    </div>
  );
}

export default JobSeekerLogin;
