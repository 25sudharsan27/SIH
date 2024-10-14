import React, { useState,useContext } from 'react';
import './JobSeekerLogin.css';
import { useNavigate } from 'react-router-dom';
// import Context from '../context';



const JobSeekerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isBuffereing , setIsBuffering] = useState(false);

  const navigate = useNavigate();
  // const generalContext = useContext(Context);
  // console.log("generalContext ",generalContext.fetchUserDetails());


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your login logic here
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
        credentials: 'include', // This option will send cookies with the request and receive any cookies from the server
      });
      

      const userdata = await response.json();

      if (userdata.success) {

        // alert('Signup successful');
        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.id = "i233"
        messageContainer.textContent = 'Logged Sucessfully ';
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
        // console.log(userdata);
        // const data = await generalContext.fetchUserDetails();

        navigate('/user/profile');
      } else {
        setIsBuffering(false);
        
        // Display a pop-up message at the top of the screen
        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.textContent = 'Signup failed: ' + userdata.message;
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
        if(userdata.message === 'User Already Exists'){
          console.log("went to login page");
          navigate('/jobseeker/login');        }
        // console.log(userdata);
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
    </div>
  );
}

export default JobSeekerLogin;
