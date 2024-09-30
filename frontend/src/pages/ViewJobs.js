import React, { useState, useEffect } from 'react';
import './ViewJobs.css';
import UserNavbar from './components/usernavbar';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

import Amazon from './images/amazon.png'
import Google from './images/google.png'
import flipkart from './images/flipkart.png'
import JPMorgan from './images/JPMorgan.png'
import microsoft from './images/microsoft.png'
import nvidia from './images/nvidia.png'
import oracle from './images/oracle.png'
import salesForce from './images/salesForce.png'

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const jobsPerPage = 6;

  const img = [Amazon,Google,flipkart,JPMorgan,microsoft,nvidia,oracle,salesForce];

  // Fetch jobs on component mount and when filters change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(process.env.REACT_APP_viewjobs_api, {
          method: process.env.REACT_APP_viewjobs_method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ experienceLevel, location })
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setJobs(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [experienceLevel, location]);

  // Handle "Suggest Me Jobs" button click
  const handleSuggest = async () => {
    setLoading(true);
    setError('');
    setCurrentPage(1); // Reset pagination
    try {
      const response = await fetch(process.env.REACT_APP_suggested_jobs, {
        method: process.env.REACT_APP_suggested_jobs_method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setJobs(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Error fetching suggested jobs:', error);
      setError('Failed to fetch suggested jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle filtering
  const handleFilter = async () => {
    setLoading(true);
    setError('');
    setCurrentPage(1); // Reset pagination
    try {
      const response = await fetch(process.env.REACT_APP_filter_jobs, {
        method: process.env.REACT_APP_filter_jobs_method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ experienceLevel, search: searchTerm })
      });
      const data = await response.json();
      setJobs(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  function getRandomImg(){
    const ran = Math.floor(Math.random()*8);
    return img[ran];
  }

  return (
    <div>
      <div className="search-bar">
        <div className="filters">
          {/* Experience Level Dropdown */}
          <select
            className="dropdown"
            value={experienceLevel}
            onChange={(e) => { setExperienceLevel(e.target.value); handleFilter(); }}
          >
            <option value="">Experience Level</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>

          {/* Location Dropdown */}
          <select
            className="dropdown"
            value={location}
            onChange={(e) => { setLocation(e.target.value); handleFilter(); }}
          >
            <option value="">Location</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Remote">Remote</option>
          </select>

          {/* Suggest Me Jobs Button */}
          <button onClick={handleSuggest} className="filter-btn">
            Suggest Me Jobs
          </button>
        </div>

        {/* Search Field */}
        <div className="search-field">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="view-search-id"
          />
          <span onClick={handleFilter} className="search-icon">🔍</span>
        </div>
      </div>

      {/* Show loading indicator if API call is in progress */}
      {loading && <p>Loading jobs...</p>}

      {/* Show error message if any error occurs */}
      {error && <p className="error-message">{error}</p>}

      {/* Job Board */}
      <div className="job-board">
        <div className="posted-jobs-container">
          <div className="posted-jobs">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="title">
                    <img src={job.img || getRandomImg()} alt="job" className="company-log"/>
                    <h3>{job.title}</h3>
                  </div>
                  <div className="bodies">
                    <div className="texts">
                      <p>{`${job.city}, ${job.state}, ${job.country}`}</p>
                      <p><b>{job.workMode}</b> - {job.experienceLevel}</p>
                      <p><b>Stipend:</b> {job.stipend}</p>
                    </div>
                    <div className="job-actions">
                      <button
                        onClick={() => { navigate('/user/viewjobs/job/' + job._id); }}
                        className="edit-btn"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        </div>

        {/* Pagination Component */}
        <Pagination
          totalPages={Math.ceil(filteredJobs.length / jobsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default JobBoard;
