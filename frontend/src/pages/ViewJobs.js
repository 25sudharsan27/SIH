import React, { useState, useEffect } from 'react';
import './ViewJobs.css';
import UserNavbar from './components/usernavbar';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

import Amazon from './images/amazon.png';
import Google from './images/google.png';
import flipkart from './images/flipkart.png';
import JPMorgan from './images/JPMorgan.png';
import microsoft from './images/microsoft.png';
import nvidia from './images/nvidia.png';
import oracle from './images/oracle.png';
import salesForce from './images/salesForce.png';
import search from './images/loupe.png';
import queryString from 'query-string';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);

  const { page = 1, query = '',experience='' } = queryString.parse(window.location.search);
  const [currentPage, setCurrentPage] = useState(page);

  const img = [Amazon, Google, flipkart, JPMorgan, microsoft, nvidia, oracle, salesForce];

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
          body: JSON.stringify({ experienceLevel, location, query, page,experience })
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setJobs(Array.isArray(data.data) ? data.data : []);
        setTotalPages(data.totalPages);
        setSearchTerm(query);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [experienceLevel, location, query, page]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    navigate(`/user/viewjobs?page=${pageNumber}&query=${query}&experience=${experience}`); // Update URL query parameter
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (newQuery) => {
    navigate(`/user/viewjobs?page=1&query=${newQuery}&experience=${experience}`); // Reset to page 1 when query changes
  };

  const handleExperienceChange = (newExp) => {
    navigate(`/user/viewjobs?page=1&query=${query}&experience=${newExp}`); // Reset to page 1 when query changes
  }

  // Handle filtering
  const handleFilter = () => {
    setCurrentPage(1); // Reset pagination
  };

    // Handle "Suggest Me Jobs" button click
  // const handleSuggest = async () => {
  //   setLoading(true);
  //   setError('');
  //   setCurrentPage(1); // Reset pagination
  //   try {
  //     console.log("fetching url : ", process.env.REACT_APP_suggeseted_jobs)
  //     const response = await fetch(process.env.REACT_APP_suggeseted_jobs, {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     });
  //     console.log("response : ", response);
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }
  //     const data = await response.json();
  //     setJobs(Array.isArray(data.data) ? data.data : []);
  //   } catch (error) {
  //     console.error('Error fetching suggested jobs:', error);
  //     setError('Failed to fetch suggested jobs. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  function getRandomImg() {
    const ran = Math.floor(Math.random() * img.length);
    return img[ran];
  }

  return (
    <div style={{ marginTop: "120px" }}>
      <div className="search-bar">
        <div className="filters">
          {/* Experience Level Dropdown */}
          <select
            className="dropdown"
            value={experienceLevel}
            onChange={(e) => { setExperienceLevel(e.target.value); handleExperienceChange(e.target.value);  }}

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
            onChange={(e) => { setLocation(e.target.value); handleExperienceChange(e.target.value); }}
          >
            <option value="">Location</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        {/* <button onClick={handleSuggest} className="filter-btn">
            Suggest Me Jobs
          </button> */}

        {/* Search Field */}
        <div id="i211">
          <input
            placeholder="Search..."
            value={searchTerm}
            onClick={(e) => { e.target.value = ''; }}
            onChange={(e) => { setSearchTerm(e.target.value); }}
            id="i212"
          />
          <span onClick={() => handleSearchChange(searchTerm)} className="search-icon">
            <img style={{ opacity: "0.4", height: "17px", marginTop: "3px", marginRight: "2px" }} src={search} alt="search" />
          </span>
        </div>
      </div>

      {/* Show loading indicator if API call is in progress */}
      {loading && <div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>}

      {/* Show error message if any error occurs */}
      {error && <p className="error-message">{error}</p>}

      {/* Job Board */}
      <div id="i2323" className="job-board">
        <div id="i256" className="posted-jobs-container">
          <div className="posted-jobs">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="title">
                    <img src={job.pic} alt="job" id="i415" className="company-log" />
                    <div id="i416">
                      <h3>{job.title}</h3>
                    </div>
                  </div>
                  <div className="bodies">
                    <div id="i412" className="texts">
                      <p>{`${job.city}, ${job.state}, ${job.country}`}</p>
                      <p><b>{job.workMode}</b> - {job.experienceLevel}</p>
                      <p><b>Stipend:</b> {job.stipend}</p>
                    </div>
                    <div className="job-actions">
                      <button
                        onClick={() => { navigate('/user/job/' + job._id); }}
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
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default JobBoard;
