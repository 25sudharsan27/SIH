import React, { useState } from 'react';
import './CreateJob.css';
import { Link } from 'react-router-dom';

const JobForm = () => {
  const [formData, setFormData] = useState({
    company: '', // Handle separately if needed
    jobTitle: '',
    description: '',
    link: '', // Added field for job link
    skills: [], // Skills as an array
    city: '',
    state: '',
    country: '',
    workMode: '',
    experienceLevel: '',
    openings: '',
    extraQuestions: [], // Extra questions as an array
    status: '', // Add a status field if required
    stipend: '' // Added stipend field
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExtraQuestionChange = (index, e) => {
    const newExtraQuestions = [...formData.extraQuestions];
    newExtraQuestions[index] = e.target.value;
    setFormData({
      ...formData,
      extraQuestions: newExtraQuestions,
    });
  };

  const addExtraQuestion = () => {
    setFormData({
      ...formData,
      extraQuestions: [...formData.extraQuestions, ''],
    });
  };

  const removeExtraQuestion = (index) => {
    const newExtraQuestions = formData.extraQuestions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      extraQuestions: newExtraQuestions,
    });
  };

  const handleSkillChange = (index, e) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ''],
    });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/organization/addjob", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user_id: 'YOUR_USER_ID', // Replace with actual user_id if needed
          title: formData.jobTitle,
          description: formData.description,
          link: formData.link,
          skills: formData.skills, // Send skills as an array
          city: formData.city,
          state: formData.state,
          country: formData.country,
          workMode: formData.workMode,
          experienceLevel: formData.experienceLevel,
          opening: formData.openings,
          extra_questions: formData.extraQuestions, // Send extraQuestions as extra_questions
          status: formData.status,
          stipend: formData.stipend // Include stipend in the request
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Job added successfully");
        console.log('Job added successfully:', result.data);
        window.location.reload();
      } else {
        alert("Error generated");
        console.error('Error adding job:', result.message);
      }
    } catch (err) {
      console.error('Error occurred during form submission:', err);
    }
  };

  return (
    <div>
      <div className="job-page-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li><Link to="/organization/createjob" className="high">Create Job</Link></li>
            <li><Link to="/organization/postedjobs">Posted Jobs</Link></li>
            <li><Link to="/organization/closedjobs">Closed Jobs</Link></li>
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
                disabled // Handle separately if needed
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

            <div className="form-section oneLine">
              <label className='specify-widthh'>Job Link</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Stipend</label>
              <input
                type="text"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
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
                  <option value="Intern">Intern</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
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
              {formData.skills.map((skill, index) => (
                <div key={index} className="skill-group">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e)}
                    placeholder={`Skill ${index + 1}`}
                  />
                  <button type="button" onClick={() => removeSkill(index)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={addSkill}>Add Another Skill</button>
            </div>

            <div className="form-section">
              <label className='specify-widthh'>Extra Questions</label>
              {formData.extraQuestions.map((question, index) => (
                <div key={index} className="extra-question-group">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => handleExtraQuestionChange(index, e)}
                    placeholder={`Extra Question ${index + 1}`}
                  />
                  <button type="button" onClick={() => removeExtraQuestion(index)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={addExtraQuestion}>Add Another Question</button>
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
