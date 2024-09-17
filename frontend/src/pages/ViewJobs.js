import React, { useState, useEffect } from 'react';
import './ViewJobs.css';
import UserNavbar from './components/usernavbar';  // Assuming you have this component
import Pagination from './Pagination';  // Assuming Pagination is implemented correctly
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function JobBoard() {
  const [jobs, setJobs] = useState([]);            // To store job data
  const [currentPage, setCurrentPage] = useState(1);  // For pagination
  const [searchTerm, setSearchTerm] = useState('');   // For search functionality
  const [experienceLevel, setExperienceLevel] = useState('');  // Experience level filter
  const [location, setLocation] = useState('');      // Location filter
  const [loading, setLoading] = useState(false);     // Loading indicator for API calls
  const [error, setError] = useState('');            // Error message handling
  const navigate = useNavigate();
  const jobsPerPage = 6;                             // Jobs per page for pagination

  // Fetch jobs from API on component mount and when filters change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');  // Reset error state before new API call
      try {
        const response = await fetch("http://localhost:8000/public/jobs", {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            experienceLevel,
            location
          })
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);  // Handling non-200 responses
        }
        const data = await response.json();
        console.log('Fetched Jobs:', data);  // Log the data for debugging
        setJobs(Array.isArray(data.data) ? data.data : []);  // Ensure jobs is an array
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);  // Turn off loading indicator
      }
    };

    fetchJobs();
  }, [experienceLevel, location]);  // Refetch jobs when filters change

  // Handle "Suggest Me Jobs" button click
  const handleSuggest = async () => {
    setLoading(true);
    setError('');  // Reset error state before new API call
    try {
      const response = await fetch("http://localhost:8000/user/suggestedjob", {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);  // Handling non-200 responses
      }
      const data = await response.json();
      console.log('Suggested Jobs:', data);
      setJobs(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Error fetching suggested jobs:', error);
      setError('Failed to fetch suggested jobs. Please try again later.');
    } finally {
      setLoading(false);  // Turn off loading indicator
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

  return (
    <div>
      <div className="search-bar">
        <div className="filters">
          {/* Experience Level Dropdown */}
          <select
            className="dropdown"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
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
            onChange={(e) => setLocation(e.target.value)}
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
          />
          <span className="search-icon">🔍</span>
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
                    <img src={job.img || '/default-job-image.png'} alt="job" />
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
