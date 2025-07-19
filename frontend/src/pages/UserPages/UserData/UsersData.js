import React, { useState, useEffect } from 'react';
import '../ViewJobs/ViewJobs.css';
import UserNavbar from '../../../components/UserNavbar/usernavbar';
import Pagination from '../../../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import '../SearchBar/SearchBar.css';
import './UsersData.css';

import Amazon from '../../../images/amazon.png';
import Google from '../../../images/google.png';
import flipkart from '../../../images/flipkart.png';
import JPMorgan from '../../../images/JPMorgan.png';
import microsoft from '../../../images/microsoft.png';
import nvidia from '../../../images/nvidia.png';
import oracle from '../../../images/oracle.png';
import salesForce from '../../../images/salesForce.png';
import search from '../../../images/loupe.png';
import queryString from 'query-string';

function JobBoard() {
  const [totalPages, setTotalPages] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const jobsPerPage = 6;
  const {page=1, query=''} = queryString.parse(window.location.search);
  const [currentPage, setCurrentPage] = useState(page);

  
  const img = [Amazon, Google, flipkart, JPMorgan, microsoft, nvidia, oracle, salesForce];

  // Fetch jobs on component mount and when filters change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(process.env.REACT_APP_profile_datas_api, {
          method: process.env.REACT_APP_profile_datas_method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({ query, page })
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setJobs(Array.isArray(data.data) ? data.data : []);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [experienceLevel, location, query, page]);

  // Handle "Suggest Me Jobs" button click
  const handleSuggest = async () => {
    setLoading(true);
    setError('');
    setCurrentPage(1); // Reset pagination
    try {
      console.log("fetching url : ", process.env.REACT_APP_suggeseted_jobs)
      const response = await fetch(process.env.REACT_APP_suggeseted_jobs, {
        method: "POST",
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

  // Filter jobs based on search term and experience level
  // const filteredJobs = jobs.filter((job) => {
  //   return job.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (experienceLevel ? job.experienceLevel === experienceLevel : true) &&
  //     (location ? job.city === location : true);
  // });

  // // Pagination logic
  // const indexOfLastJob = currentPage * jobsPerPage;
  // const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  // const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    navigate(`/profiles/?page=${pageNumber}&query=${query}`); // Update URL query parameter
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (newQuery) => {
    navigate(`/profiles/?page=1&query=${newQuery}`); // Reset to page 1 when query changes
  }
  
  // Handle filtering
  const handleFilter = () => {
    setCurrentPage(1); // Reset pagination
    // Filter happens automatically in the filteredJobs variable.
  };

  function getRandomImg() {
    const ran = Math.floor(Math.random() * img.length);
    return img[ran];
  }

  return (
    <div className='user-pages'>
        <UserNavbar />

    <div style={{marginTop:"120px"}}>
      <div className="search-bar">
        <div className="filters">
          {/* Experience Level Dropdown */}

          {/* Location Dropdown */}
          {/* <select
            className="dropdown"
            value={location}
            onChange={(e) => { setLocation(e.target.value);  }}
          >
            <option value="">Location</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Remote">Remote</option>
          </select> */}

          {/* Suggest Me Jobs Button */}
          
        </div>

        {/* Search Field */}
        
        <div className="profiles-search" id="i211">
        <input
        
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); }
      
      }
        id="i212"
        className="profiles-search"
        
      />
                <span onClick={()=>{handleSearchChange(searchTerm)}} className="search-icon"><img style={{opacity:"0.4" ,height:"17px",marginTop:"3px",marginRight:"2px"}} src={search} alt="search"/></span>

        </div>
      </div>

      {/* Show loading indicator if API call is in progress */}
      {loading &&<div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>}

      {/* Show error message if any error occurs */}
      {error && <p className="error-message">{error}</p>}

      {/* Job Board */}
      <div  id="i2323" className="job-board">
        <div id="i256" className="posted-jobs-container">
          <div className="posted-jobs">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="title">
                    <img src={job.profilepic} alt="job" id="i415" className="company-log" />
                    <div id="i416">
                      <h3>{job.name}</h3>
                    </div>
                  </div>
                  <div className="bodies">
                    <div id="i412" className="texts">
                      <p>{`${job.city}, ${job.state}, ${job.country}`}</p>
                      <p>{job.description}</p>
                    </div>
                    <div className="job-actions">
                      <button
                        onClick={() => { navigate('/profiles/' + job._id); }}
                        className="edit-btn"
                        id="profiles-bbtn"
                      >
                        View Profile
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
    </div>
  );
}

export default JobBoard;
