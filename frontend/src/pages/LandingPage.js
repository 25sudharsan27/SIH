import React from 'react';
import './LandingPage.css'; // Make sure to create this CSS file for styling
import "@fontsource/poppins"; // Defaults to weight 400


const LandingPage = () => {
  return (
    <body>
    <div className="landing-page">
      <h1 className="title">Welcome to Job Intern Catalyst</h1>
      <div className="card-container">
        <div className="card">
          <h2>Organization or Job Provider</h2>
          
          <p>Create new Account? <a href="/organization/signup" className='colorKaro'>Signup</a></p>
          <p>or</p>
          <p>Already have one? <a href="/organization/login" className='colorKaro'>Login</a></p>
          
        </div>
       
        <div className="card">
          <h2>Job Seeker or Student</h2>
          <div>
          <p>Create new Account? <a href="/jobseeker/signup" className='colorKaro'>Signup</a></p>
          <p>or</p>
          <p>Already have one? <a href="/jobseeker/login" className='colorKaro'>Login</a></p>
          </div>
        </div>
      </div>
    </div>
    </body>
  );
}

export default LandingPage;
