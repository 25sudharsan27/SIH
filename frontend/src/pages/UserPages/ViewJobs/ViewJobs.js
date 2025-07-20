import React, { useState, useEffect, useCallback } from 'react';
import './ViewJobs.css';
import Pagination from '../../../components/Pagination/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import '../SearchBar/SearchBar.css';

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
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const img = [Amazon, Google, flipkart, JPMorgan, microsoft, nvidia, oracle, salesForce];

  const parseUrlParams = useCallback(() => {
    const params = queryString.parse(location.search);
    return {
      page: parseInt(params.page) || 1,
      query: params.query || '',
      experience: params.experience || '',
      country: params.country || '',
      state: params.state || '',
      city: params.city || ''
    };
  }, [location.search]);

  const updateUrl = useCallback((params) => {
    const currentParams = parseUrlParams();
    const newParams = { ...currentParams, ...params };
    
    Object.keys(newParams).forEach(key => {
      if (!newParams[key] || newParams[key] === '') {
        delete newParams[key];
      }
    });

    const queryParams = queryString.stringify(newParams);
    navigate(`/user/viewjobs${queryParams ? `?${queryParams}` : ''}`);
  }, [navigate, parseUrlParams]);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch(process.env.REACT_APP_getcountries_api, {
        method: process.env.REACT_APP_getcountries_method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setCountries(data.data || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError('Failed to fetch countries. Please try again later.');
    }
  }, []);

  const fetchStates = useCallback(async (country) => {
    if (!country) {
      setStates([]);
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_getstates_api, {
        method: process.env.REACT_APP_getstates_method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setStates(data.data || []);
    } catch (error) {
      console.error('Error fetching states:', error);
      setStates([]);
    }
  }, []);

  const fetchCities = useCallback(async (state, country) => {
    if (!state) {
      setCities([]);
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_getcities_api, {
        method: process.env.REACT_APP_getcities_method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ state, country })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setCities(data.data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    }
  }, []);


  const fetchJobs = useCallback(async (params) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(process.env.REACT_APP_viewjobs_api, {
        method: process.env.REACT_APP_viewjobs_method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: params.query,
          page: params.page,
          experience: params.experience,
          country: params.country,
          state: params.state,
          city: params.city
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setJobs(Array.isArray(data.data) ? data.data : []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = parseUrlParams();
    
    setCurrentPage(params.page);
    setSearchTerm(params.query);
    setExperienceLevel(params.experience);
    setSelectedCountry(params.country);
    setSelectedState(params.state);
    setSelectedCity(params.city);

    fetchCountries();
    fetchJobs(params);
  }, [parseUrlParams, fetchCountries, fetchJobs]);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    } else {
      setStates([]);
      setSelectedState('');
    }
  }, [selectedCountry, fetchStates]);

  useEffect(() => {
    if (selectedState && selectedCountry) {
      fetchCities(selectedState, selectedCountry);
    } else {
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedState, selectedCountry, fetchCities]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateUrl({ page: pageNumber });
  };

  const handleSearchChange = (newQuery) => {
    setSearchTerm(newQuery);
    setCurrentPage(1);
    updateUrl({ query: newQuery, page: 1 });
  };

  const handleExperienceChange = (newExperience) => {
    setExperienceLevel(newExperience);
    setCurrentPage(1);
    updateUrl({ experience: newExperience, page: 1 });
  };

  const handleCountryChange = (newCountry) => {
    setSelectedCountry(newCountry);
    setSelectedState('');
    setSelectedCity('');
    setCurrentPage(1);
    updateUrl({ 
      country: newCountry, 
      state: '', 
      city: '', 
      page: 1 
    });
  };

  const handleStateChange = (newState) => {
    setSelectedState(newState);
    setSelectedCity('');
    setCurrentPage(1);
    updateUrl({ 
      state: newState, 
      city: '', 
      page: 1 
    });
  };

  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
    setCurrentPage(1);
    updateUrl({ city: newCity, page: 1 });
  };

  const handleSearchSubmit = () => {
    handleSearchChange(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const getRandomImg = () => {
    const randomIndex = Math.floor(Math.random() * img.length);
    return img[randomIndex];
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <div className="search-bar" style={{flexWrap:"wrap"}}>
        <div className="filters" style={{flexWrap:"wrap"}}>
          <select
            className="dropdown"
            value={experienceLevel}
            onChange={(e) => handleExperienceChange(e.target.value)}
          >
            <option value="">Experience Level</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>

          <select
            className="dropdown"
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            className="dropdown"
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            className="dropdown"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div id="i211">
          <input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            id="i212"
          />
          <span onClick={handleSearchSubmit} className="search-icon">
            <img 
              style={{ 
                opacity: "0.4", 
                height: "17px", 
                marginTop: "3px", 
                marginRight: "2px",
                cursor: "pointer"
              }} 
              src={search} 
              alt="search" 
            />
          </span>
        </div>
      </div>

      {loading && (
        <div className="buffer">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <div id="i2323" className="job-board">
        <div id="i256" className="posted-jobs-container">
          <div className="posted-jobs">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="title">
                    <img 
                      src={job.pic || 'https://res.cloudinary.com/duyuxtpau/image/upload/v1752739694/user_profiles/profilepics/1752739697364.webp'} 
                      alt="company logo" 
                      id="i415" 
                      className="company-log"
                      onError={(e) => {
                        e.target.src = getRandomImg();
                      }}
                    />
                    <div id="i416">
                      <h3>{job.title}</h3>
                    </div>
                  </div>
                  <div className="bodies">
                    <div id="i412" className="texts">
                      <p>
                        {[job.city, job.state, job.country]
                          .filter(Boolean)
                          .join(', ')
                        }
                      </p>
                      <p>
                        <b>{job.workMode}</b> - {job.experienceLevel}
                      </p>
                      <p>
                        <b>Stipend:</b> {job.stipend}
                      </p>
                    </div>
                    <div className="job-actions">
                      <button
                        onClick={() => navigate(`/user/job/${job._id}`)}
                        className="edit-btn"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p>No jobs found. Try adjusting your search criteria.</p>
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default JobBoard;