import React, { useState } from 'react';
import './JobSeekerLogin.css';
import { useNavigate } from 'react-router-dom';


const JobSeekerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBuffereing , setIsBuffering] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBuffering(true);
    try {
      const response = await fetch(process.env.REACT_APP_userlogin_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email":email,
          "password":password,
        }),
        credentials: 'include',
      });
      

      const userdata = await response.json();

      if (userdata.success) {

        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.id = "i233"
        messageContainer.textContent = 'Logged Sucessfully ';
        
        document.body.appendChild(messageContainer);

        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);

        navigate('/user/profile');
      } else {
        setIsBuffering(false);
        
        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.textContent = 'Signup failed: ' + userdata.message;
  
        document.body.appendChild(messageContainer);

        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);

        if(userdata.message === 'User Already Exists'){
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
   
  }

  return (
    <div id="i135" className="login-container">
      {isBuffereing &&<div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>}
      
      <h1 id="i136" className="form-title">Student or Job Seeker</h1>
      <div id="i137" className="login-form">
        <h2 id="i138" className="form-subtitle">Login</h2>
        <form id="139" onSubmit={handleSubmit}>
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
          <b style={{color:"black"}}>Email</b> : sample4@gmail.com  
        </p>
        <p style={{fontSize: '14px', color: '#666'}}>
          <b style={{color :"black" }}>Password</b> : 123456789a
        </p>
      </div>
    </div>
  );
}

export default JobSeekerLogin;
