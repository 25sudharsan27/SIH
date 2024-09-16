import React from 'react';
import './PostedJobs.css'; // You can create this file for styling the posted jobs
import { Link,useNavigate } from 'react-router-dom';
import "@fontsource/poppins"; // Defaults to weight 400
// import "@fontsource/poppins/600.css"; // weight 600
// import "@fontsource/poppins/700.css"; // weight 700

const PostedJobs = () => {
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
          <li><Link to="/organization/jobs/" className="high">Posted Jobs</Link></li>
          <li><Link to="/organization/jobs/closedjobs">Closed Jobs</Link></li>
        </ul>
    </aside>
    <div className="posted-jobs-container">
      <div className="posted-jobs">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="title">
              <img src={job.img} alt="image"/> 
              <h3>{job.title}</h3>
            </div>
            <div className="bodies">
              <div className="texts">
                <p>{job.location}</p>
                <p><b>{job.mode}</b> - {job.type}</p>
                <p><b>Stipend:</b> {job.stipend}</p>
              </div>
            <div className="job-actions">
              <button className="edit-btn">Edit</button>
              <button className="close-btn">Close</button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default PostedJobs;
