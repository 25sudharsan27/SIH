import React, { useState, useEffect } from 'react';
import '../ViewJobs/ViewJobs.css';
import Pagination from '../../../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../store/userSlice';
import { useSelector } from 'react-redux';

function JobBoard() {
  const userData = useSelector(selectUser);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userData || !userData.applied_jobs || userData.applied_jobs.length === 0) return;

      const fetchedJobIds = new Set(); // Create a Set to track fetched job IDs

      for (const jobId of userData.applied_jobs) {
        if (fetchedJobIds.has(jobId)) {
          continue; // Skip if job ID has already been fetched
        }

        try {
          const response = await fetch(process.env.REACT_APP_viewmyjobdetails_api, {
            method: "POST",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ job_id: jobId }),
          });
          const data = await response.json();

          if (data.success) {
            // Check if the job already exists in the state before adding it
            setJobs(prevJobs => {
              if (!prevJobs.some(job => job._id === data.data._id)) {
                fetchedJobIds.add(jobId); // Add job ID to the set
                return [...prevJobs, data.data]; // Append new job data
              }
              return prevJobs; // Return the existing state if job already exists
            });
          }
        } catch (error) {
          const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = ('Error fetching job. Please try again later.');
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
          console.error('Error fetching job:', error);
        }
      }
    };

    fetchJobs();
  }, [userData]);

  // Get current jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    
    <div  className="job-board">
      <div id="i256" className="posted-jobs-container">
        <div className="posted-jobs">
          {currentJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="title">
                <img src={job.img} alt="image" />
                <h3>{job.title}</h3>
              </div>
              <div className="bodies">
                <div id="i412" className="texts">
                  <p>{`${job.city}, ${job.state}, ${job.country}`}</p>
                  <p><b>{job.workMode}</b> - {job.experienceLevel}</p>
                  <p><b>Stipend:</b> {job.stipend}</p>
                </div>
                <div className="job-actions">
                  <button className="edit-btn">View</button>
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
