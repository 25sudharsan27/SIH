import React, { useState,useContext } from 'react';
import './JobSeekerLogin.css';
import { useNavigate } from 'react-router-dom';
// import Context from '../context';



const JobSeekerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // const generalContext = useContext(Context);
  // console.log("generalContext ",generalContext.fetchUserDetails());


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your login logic here
    try {
      const response = await fetch(process.env.REACT_APP_userlogin_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "https://sih-indol-two.vercel.app/",
        },
        body: JSON.stringify({
          "email":email,
          "password":password,
        }),
        credentials: 'include', // This option will send cookies with the request and receive any cookies from the server
      });
      

      const userdata = await response.json();

      if (userdata.success) {
        alert('Signup successful');
        console.log(userdata);
        // const data = await generalContext.fetchUserDetails();

        navigate('/user/profile');
      } else {
        alert('Signup failed : '+userdata.message);
        if(userdata.message === 'User Already Exists'){
          console.log("went to login page");
          navigate('/jobseeker/login');        }
        console.log(userdata);
      }
    } catch (error) {
      console.error('Error:', error);
    }
   
  }

  return (
    <div className="login-container">
      <h1 className="form-title">Student or Job Seeker</h1>
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
