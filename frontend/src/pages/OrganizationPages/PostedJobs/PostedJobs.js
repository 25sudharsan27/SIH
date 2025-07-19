import React, { useState, useEffect } from 'react';
import '../../UserPages/ViewJobs/ViewJobs.css';
import './PostedJobs.css';
import Pagination from '../../../components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import google from '../../../images/google.png'
import { useNavigate } from 'react-router-dom';

function JobBoard() {
  const navigator = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 6;
  
  const GenerateErrorPopup = () =>{
    const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = 'Error in Getting data, try after some time';
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_postedjob_api, {
          method: process.env.REACT_APP_postedjob_method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
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
      const response = await fetch(process.env.REACT_APP_handleclosejob_api, {
        method: process.env.REACT_APP_handleclosejob_method,
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

 

  if (error) {
    GenerateErrorPopup();
  }

  return (
    <div >
      {loading &&<div className="buffer">
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </div> }
      <div id="i258" className="sidebar">
          <div id="i163">
            <div id="i168"><Link id="i164" to="/organization/createjob" >Create Job</Link></div>
            <div id="i168"><Link id="i164"  to="/organization/postedjobs" className="high">Posted Jobs</Link></div>
            <div id="i168"><Link id="i164" to="/organization/closedjobs">Closed Jobs</Link></div>
          </div>
        </div>
      <div className="job-board">
        <div className="posted-jobs-container alien256" id="i256" >
          <div id="i2210" className="posted-jobs">
            {currentJobs.length > 0 ? currentJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="title">
                  <h3>{job.title}</h3>
                </div>
                <div className="bodies">
                  <div id="i412" className="texts">
                    <p>{job.city}, {job.state}, </p>
                    <p>{job.country}</p>
                    <p><b>{job.workMode}</b> -<b> {job.experienceLevel}</b></p>
                    <p><b>Salary:</b> {job.stipend}</p>
                  </div>
                  <div className="job-actions">
                    <button onClick={()=>{navigator("../applicants/"+job._id)}} className="i411">View Applicants</button>
                    <button onClick={()=>{navigator("../edit/"+job._id)}} className="i411">Edit</button>
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
