import React, { useState } from 'react';
import './CreateJob.css';
import { Link } from 'react-router-dom';

const JobForm = () => {

  const [isBuffereing , setIsBuffering] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    description: '',
    link: '',
    skills: [],
    city: '',
    state: '',
    country: '',
    workMode: '',
    experienceLevel: '',
    openings: '',
    extraQuestions: [],
    status: '',
    stipend: '',
    requirements: '',
    benefits: '',
    responsibilities: '',// Added stipend field
    
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
    console.log(formData);
    e.preventDefault();
    setIsBuffering(true);

  
    try {
      const response = await fetch(process.env.REACT_APP_createjob_api, {
        method: process.env.REACT_APP_createjob_method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user_id: 'YOUR_USER_ID',
          title: formData.jobTitle,
          description: formData.description,
          link: formData.link,
          skills: formData.skills,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          workMode: formData.workMode,
          experienceLevel: formData.experienceLevel,
          opening: formData.openings,
          extra_questions: formData.extraQuestions,
          status: formData.status,
          stipend: formData.stipend,
          requirements: formData.requirements,
          benefits: formData.benefits,
          responsibilities: formData.responsibilities,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsBuffering(false);

        // alert("Job added successfully");
        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.id = "i233"
        messageContainer.textContent = 'Job Added Successfully';
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
        window.location.reload();
      } else {
        setIsBuffering(false);

        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.textContent = 'Job Not Created : '+ result.message;
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
      }
    } catch (err) {
      setIsBuffering(false);

        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.textContent = 'Job Not Created : ' + err.message;
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    }
  };

  return (
    <div>
      {isBuffereing &&<div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>}
      <div className="job-page-container">
        {/* Sidebar */}
        <div id="i258"  className="sidebar">
          <div  id="i163">
            <div id="i168"><Link id="i164" to="/organization/createjob" className="high">Create Job</Link></div>
            <div  id="i168"><Link id="i164"  to="/organization/postedjobs">Posted Jobs</Link></div>
            <div  id="i168"><Link id="i164" to="/organization/closedjobs">Closed Jobs</Link></div>
          </div>
        </div>

        {/* Main content */}
        <div className="job-form-container">
          <form className="job-form" onSubmit={handleSubmit}>
            <div className="form-section oneLine">
              <label className='specify-widthh'>Company</label>
              <input
                id="i169"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled // Handle separately if needed
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Job Title</label>
              <input
                id="i169"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Description</label>
              <textarea
              id="i169"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="15"
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Requirements</label>
              <textarea
                id="i169"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="5"
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Benefits</label>
              <textarea
                id="i169"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows="5"
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Responsibilities</label>
              <textarea
                id="i169"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows="5"
              />
            </div>
            

            <div className="form-section oneLine">
              <label className='specify-widthh'>Job Link</label>
              <input
                id="i169"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Stipend</label>
              <input
                id="i169"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
              />
            </div>

            <div className='form-address'>
              <div className="form-section oneLine fifty">
                <label className='specify-width'>Experience Level</label>
                <select
                id="i169"
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
                id="i169"
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
                    id="i169"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className='specify-width'
                  />
                </div>

                <div className="form-section oneLine fifty">
                  <label className='specify-width'>State</label>
                  <input
                    id="i169"
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
                    id="i169"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className='specify-width'
                  />
                </div>

                <div className="form-section oneLine fifty">
                  <label className='specify-width'>Openings</label>
                  <input
                  id="i169"
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
                  id="i169"

                    value={skill}
                    onChange={(e) => handleSkillChange(index, e)}
                    placeholder={`Skill ${index + 1}`}
                  />
                  <button id="i171" type="button" onClick={() => removeSkill(index)}>Remove</button>
                </div>
              ))}
              <button className="create-btn" type="button" onClick={addSkill}>Add Another Skill</button>
            </div>

            <div className="form-section">
              <label className='specify-widthh'>Extra Questions</label>
              {formData.extraQuestions.map((question, index) => (
                <div key={index} className="extra-question-group">
                  <input
                    id="i169"
                    value={question}
                    onChange={(e) => handleExtraQuestionChange(index, e)}
                    placeholder={`Extra Question ${index + 1}`}
                  />
                  <button id="i171" type="button" onClick={() => removeExtraQuestion(index)}>Remove</button>
                </div>
              ))}
              <button className="create-btn" type="button" onClick={addExtraQuestion}>Add Another Question</button>
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
