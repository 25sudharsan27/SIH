import React, { useState } from 'react';
import './CreateJob.css';
import { Link } from 'react-router-dom';

const JobForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    description: '',
    experienceLevel: '',
    workMode: '',
    country: '',
    state: '',
    city: '',
    openings: '',
    skills: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div>
      
    
    <div className="job-page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li><Link to="/organization/jobs/createjob" className="high" >Create Job</Link></li>
          <li><Link to="/organization/jobs/" >Posted Jobs</Link></li>
          <li><Link to="/organization/jobs/closedjobs">Closed Jobs</Link></li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="job-form-container">
       
        <form className="job-form" onSubmit={handleSubmit}>
          <div className="form-section oneLine">
            <label className='specify-widthh'>Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-section oneLine">
            <label className='specify-widthh'>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-section oneLine">
            <label className='specify-widthh'>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="15"
            />
          </div>

          <div className='form-address'>
            <div className="form-section oneLine fifty">
              <label className='specify-width'>Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className='specify-width'
              >
                <option value="">Select Experience Level</option>
                <option value="intern">Intern</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            <div className="form-section oneLine fifty">
              <label className='specify-width'>Work Mode</label>
              <select
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                className='specify-width'
              >
                <option value="">Select Work Mode</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
          </div>

          <div className='form-address'>
            <div className="another">
              <div className="form-section wid oneLine fifty">
                <label className='specify-width'>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className='specify-width'
                />
              </div>

              <div className="form-section oneLine fifty">
                <label className='specify-width'>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className='specify-width'
                />
              </div>
            </div>
          </div>
          <div className='form-address'>
            <div className="another">
              <div className="form-section wid oneLine fifty">
                <label className='specify-width'>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className='specify-width'
                />
              </div>

              <div className="form-section oneLine fifty">
                <label className='specify-width'>Openings</label>
                  <input
                  type="number"
                  name="openings"
                  value={formData.openings}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <label className='specify-widthh'>Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="form-section btn">
            <button type="submit" className="create-btn">Create</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default JobForm;
