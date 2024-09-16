import React from 'react';
import './PostedJobs.css'; // You can create this file for styling the posted jobs
import { Link,useNavigate } from 'react-router-dom';

const ClosedJobs = () => {
    const navigator = new useNavigate();
  const jobs = [
    {
      id: 1,
      title: 'Full Stack Intern',
      location: 'Bengaluru, Karnataka, India',
      mode: 'On-site',
      stipend: '₹25,000',
      type: 'Internship',
    },
    {
      id: 2,
      title: 'Full Stack Engineer Internship',
      location: 'Pune, Maharashtra, India',
      mode: 'On-site',
      stipend: '₹25,000',
      type: 'Internship',
    },
    {
      id: 3,
      title: 'Front End Developer Intern',
      location: 'Bengaluru, Karnataka, India',
      mode: 'On-site',
      stipend: '₹25,000',
      type: 'Internship',
    },
    {
      id: 4,
      title: 'Short Term Intern',
      location: 'Tirunelveli, Tamil Nadu, India',
      mode: 'On-site',
      stipend: 'No',
      type: 'Internship',
    },
    {
      id: 5,
      title: 'Front End Engineer',
      location: 'Bengaluru, Karnataka, India',
      mode: 'On-site',
      stipend: '6 LPA',
      type: 'Entry Level',
    },
    {
      id: 6,
      title: 'Software Engineer Intern',
      location: 'Bengaluru, Karnataka, India',
      mode: 'On-site',
      stipend: '₹22,000',
      type: 'Internship',
    },
  ];

  return (
    <div className="job-page-container">
    <aside className="sidebar">
        <ul>
          <li><Link to="/organization/jobs/createjob" >Create Job</Link></li>
          <li><Link to="/organization/jobs/" >Posted Jobs</Link></li>
          <li><Link className="high" to="/organization/jobs/closedjob">Closed Jobs</Link></li>
        </ul>
    </aside>
    <div className="posted-jobs-container">
      <div className="posted-jobs">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <p>{job.mode} - {job.type}</p>
            <p>Stipend: {job.stipend}</p>
            <div className="job-actions">
              
              <button className="close-btn">Close</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default ClosedJobs;
