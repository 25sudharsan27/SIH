import React, { useState, useEffect } from 'react';
import './ViewJobs.css';
import UserNavbar from './components/usernavbar';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import google from './images/google.png'

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8000/organization/getopenjobs", {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "email": "s" })
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setJobs(data.opened_jobs || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to close a job
  const handleCloseJob = async (jobId) => {
    try {
      const response = await fetch("http://localhost:8000/organization/closejob", {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "org_email":"s",
          "jobs":jobId,
          "confirm":"confirm"
        })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Remove the closed job from the state
      setJobs(jobs.filter(job => job._id !== jobId));
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  // Get current jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="main">
      <aside className="sidebar">
        <ul>
          <li><Link to="/organization/createjob">Create Job</Link></li>
          <li><Link className="high" to="/organization/postedjobs">Posted Jobs</Link></li>
          <li><Link to="/organization/closedjobs">Closed Jobs</Link></li>
        </ul>
      </aside>
      <div className="job-board">
        <div className="posted-jobs-container">
          <div className="posted-jobs">
            {currentJobs.length > 0 ? currentJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="title">
                  <img src={job.img || google} alt={job.title} className='logo'/>
                  <h3>{job.title}</h3>
                </div>
                <div className="bodies">
                  <div className="texts">
                    <p>{job.city}</p>
                    <p>{job.state}</p>
                    <p>{job.country}</p>
                    <p><b>{job.workMode}</b> - {job.experienceLevel}</p>
                    <p><b>Stipend:</b> {job.stipend}</p>
                  </div>
                  <div className="job-actions">
                    <button className="edit-btn">Edit</button>
                    <button 
                      className="close-btn" 
                      onClick={() => handleCloseJob(job._id)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )) : <p>No jobs available.</p>}
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
