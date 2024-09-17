import React from 'react';
import './ViewJobs.css';
import UserNavbar from './components/usernavbar';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    {
    id: 7,
      title: 'Full Stack Intern',
      location: 'Bengaluru, Karnataka, India',
      mode: 'On-site',
      stipend: '₹25,000',
      type: 'Internship',
    },
    {
      id: 8,
      title: 'Full Stack Engineer Internship',
      location: 'Pune, Maharashtra, India',
      mode: 'On-site',
      stipend: '₹25,000',
      type: 'Internship',
    },
    {
      id: 9,
      title: 'Front End Developer Intern',
      location: 'Bengaluru, Karnataka, India',
      mode: 'On-site',
      stipend: '₹25,000',
      type: 'Internship',
    },
    {
      id: 10,
      title: 'Short Term Intern',
      location: 'Tirunelveli, Tamil Nadu, India',
      mode: 'On-site',
      stipend: 'No',
      type: 'Internship',
    },
    {
      id: 11,
      title: 'Front End Engineer',
      location: 'Bengaluru, Karnataka, India',
      mode: 'On-site',
      stipend: '6 LPA',
      type: 'Entry Level',
    },
    {
      id: 12,
      title: 'Software Engineer Intern',
      location: 'Bengaluru, Karnataka, India',
      mode: 'On-site',
      stipend: '₹22,000',
      type: 'Internship',
    },
  ];
//   const jobs = [
//     { id: 1, title: 'Full Stack Intern', location: 'Bengaluru, Karnataka, India', stipend: 'Rs 25,000' },
//     { id: 2, title: 'Full Stack Engineer Internship', location: 'Pune, Maharashtra, India', stipend: 'Rs 15,000' },
//     { id: 3, title: 'Front End Developer Intern', location: 'Bengaluru, Karnataka, India', stipend: 'Rs 25,000' },
//     { id: 4, title: 'Short Term Intern', location: 'Tirunelveli, Tamil Nadu, India', stipend: 'No' },
//     { id: 5, title: 'Software Engineer Intern', location: 'Bengaluru, Karnataka, India', stipend: 'Rs 25,000' },
//     // Add more jobs here for pagination purposes
//   ];
  
  function JobBoard() {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;
  
    // Get current jobs for the current page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  
    // Change page
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    return (
      <div className="miain">
        <aside className="sidebar">
          <ul>
            <li><Link to="/organization/createjob" >Create Job</Link></li>
            <li><Link  to="/organization/postedjobs" >Posted Jobs</Link></li>
            <li><Link className="high" to="/organization/closedjobs">Closed Jobs</Link></li>
          </ul>
      </aside>
      <div className="job-board">
        <SearchBar condition={false}/>
        <div className="posted-jobs-container">
        <div className="posted-jobs">
        {currentJobs.map((job) => (
            
            
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
                         <button id="close" className="edit-btn">Remove</button>
                       </div>
                       </div>
                     </div>
                     
                     
        ))}
        </div>
        </div>
        <Pagination
          totalPages={Math.ceil(jobs.length / jobsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      </div>
    );
  }




export default JobBoard;
