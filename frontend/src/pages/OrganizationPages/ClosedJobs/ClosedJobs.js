import React, { useState, useEffect } from 'react';
import '../../UserPages/ViewJobs/ViewJobs.css';
import Pagination from '../../../components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import google from '../../../images/google.png'
import './ClosedJobs.css';
import { useNavigate} from 'react-router-dom';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 6;
  const navigator = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_closedjob_api, {
          method: process.env.REACT_APP_closedjob_method,
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
    <div  >
      <div id="i258" className="sidebar">
          <div id="i163">
            <div id="i168"><Link id="i164" to="/organization/createjob" >Create Job</Link></div>
            <div id="i168"><Link id="i164"  to="/organization/postedjobs" >Posted Jobs</Link></div>
            <div id="i168"><Link id="i164" to="/organization/closedjobs" className="high">Closed Jobs</Link></div>
          </div>
        </div>
      <div  className="job-board">
        <div id="i256"  className="posted-jobs-container">
          <div  id="i2210" className="posted-jobs">
            {currentJobs.length > 0 ? currentJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="title">
                  {/* <img src={job.img || google} alt={job.title} /> */}
                  <h3>{job.title}</h3>
                </div>
                <div className="bodies">
                  <div id="i412" className="texts">
                    <p>{job.city}, {job.state},</p>
                    <p>{job.country}</p>
                    
                  </div>
                  <div id="i412">
                  <p><b>{job.workMode}</b> - {job.experienceLevel}</p>
                  <p><b>Stipend:</b> {job.stipend}</p>
                  </div>
              
                </div>
                <button onClick={()=>{navigator("../applicants/"+job._id)}} className="i411">View Applicants</button>

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
