import React, { useState, useEffect } from 'react';
import './ViewJobs.css';
import UserNavbar from './components/usernavbar';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8000/public/jobs",{
          method : "POST",
          credentials : "include",
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        // console.log('Fetched Jobs:', data); // Log the data
        setJobs(Array.isArray(data.data) ? data.data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Get current jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = Array.isArray(jobs) ? jobs.slice(indexOfFirstJob, indexOfLastJob) : [];
  // console.log(currentJobs);
  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="job-board">
      <SearchBar />
      <div className="posted-jobs-container">
        <div className="posted-jobs">
          {currentJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="title">
                <img src={job.img} alt="image" /> 
                <h3>{job.title}</h3>
              </div>
              <div className="bodies">
                <div className="texts">
                  <p>{`${job.city}, ${job.state}, ${job.country}`}</p>
                  <p><b>{job.workMode}</b> - {job.experienceLevel}</p>
                  <p><b>Stipend:</b> {job.stipend}</p>
                </div>
                <div className="job-actions">
                  <button onClick={()=>{navigate('/user/viewjobs/job/'+job._id)}} className="edit-btn">Apply</button>
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
  );
}

export default JobBoard;
