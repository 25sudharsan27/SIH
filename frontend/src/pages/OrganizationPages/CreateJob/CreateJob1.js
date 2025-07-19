import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateJob1.css';

const CreateJob = ({ onJobCreated, organizationId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    skills: [],
    city: '',
    state: '',
    country: '',
    workMode: '',
    experienceLevel: '',
    opening: 1,
    stipend: '',
    requirements: '',
    benefits: '',
    responsibilities: '',
    extra_questions: [],
    custom_stages: []
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentStage, setCurrentStage] = useState({
    stage_name: '',
    stage_order: 1,
    stage_description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const workModeOptions = [
    'Remote',
    'On-site',
    'Hybrid',
    'Part-time Remote',
    'Part-time On-site'
  ];

  const experienceLevelOptions = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Executive Level',
    'Internship'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addQuestion = () => {
    if (currentQuestion.trim() && !formData.extra_questions.includes(currentQuestion.trim())) {
      setFormData(prev => ({
        ...prev,
        extra_questions: [...prev.extra_questions, currentQuestion.trim()]
      }));
      setCurrentQuestion('');
    }
  };

  const removeQuestion = (questionToRemove) => {
    setFormData(prev => ({
      ...prev,
      extra_questions: prev.extra_questions.filter(q => q !== questionToRemove)
    }));
  };

  const addCustomStage = () => {
    if (currentStage.stage_name.trim()) {
      const newStage = {
        ...currentStage,
        stage_order: formData.custom_stages.length + 1
      };
      setFormData(prev => ({
        ...prev,
        custom_stages: [...prev.custom_stages, newStage]
      }));
      setCurrentStage({
        stage_name: '',
        stage_order: formData.custom_stages.length + 2,
        stage_description: ''
      });
    }
  };

  const removeCustomStage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      custom_stages: prev.custom_stages.filter((_, index) => index !== indexToRemove)
        .map((stage, index) => ({ ...stage, stage_order: index + 1 }))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const jobData = {
        ...formData,
        user_id: organizationId,
        opening: parseInt(formData.opening) || 1,
        stipend: formData.stipend ? parseFloat(formData.stipend) : null
      };

      const response = await fetch(process.env.REACT_APP_createjob_api, {
        method: process.env.REACT_APP_createjob_method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        if (onJobCreated) {
          onJobCreated(result.data);
        }

        setFormData({
          title: '',
          description: '',
          link: '',
          skills: [],
          city: '',
          state: '',
          country: '',
          workMode: '',
          experienceLevel: '',
          opening: 1,
          stipend: '',
          requirements: '',
          benefits: '',
          responsibilities: '',
          extra_questions: [],
          custom_stages: []
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div id="i258" className="sidebar">
        <div id="i163">
          <div id="i168"><Link id="i164" to="/organization/createjob" className="high" >Create Job</Link></div>
          <div id="i168"><Link id="i164" to="/organization/postedjobs">Posted Jobs</Link></div>
          <div id="i168"><Link id="i164" to="/organization/closedjobs">Closed Jobs</Link></div>
        </div>
      </div>
      <div className="create-job-container">
        <h1 className="create-job-heading">Create New Job</h1>
        <p className="create-job-text">Fill out the details to post a new job opening</p>

        <form onSubmit={handleSubmit} >
          {/* Basic Information */}
          <div className="create-job-form">
            <div className="create-job-basic-info1">
              <h2 className="create-job-label">Basic Information</h2>
              <div className="create-job-input-box">
                <label className="create-job-label">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Full Stack Developer"
                />
              </div>

              <div className="create-job-input-box">
                <label className="create-job-label">Application Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://company.com/apply"
                />
              </div>

              <div className="create-job-input-box">
                <label className="create-job-label">Job Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Describe the role and what the candidate will be doing..."
                />
              </div>

              <div className="create-job-input-box">
                <label className="create-job-label">Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List the requirements for this position..."
                />
              </div>

              <div className="create-job-input-box">
                <label className="create-job-label">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe the key responsibilities..."
                />
              </div>

              <div className="create-job-input-box">
                <label className="create-job-label">Benefits</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List the benefits offered..."
                />
              </div>

              <div className="create-job-input-box">
                <label className="create-job-label">Required Skills</label>

                <div>
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <button  className="create-job-general-button" type="button" onClick={addSkill}>
                    Add Skill
                  </button>
                </div>

                <div className="create-job-input-box">
                  {formData.skills.map((skill, index) => (
                    <span key={index}>
                      {skill}
                      <button  className="create-job-general-button1" type="button" onClick={() => removeSkill(skill)}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Location & Work Details */}
            <div className="create-job-basic-info1">
              <h2 className="create-job-label">Location & Work Details</h2>
              <div className="create-job-location-box">
                <div className="create-job-location-input-box">
                  <label className="create-job-label">Work Mode *</label>
                  <select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select work mode</option>
                    {workModeOptions.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>

                <div className="create-job-location-input-box">
                  <label className="create-job-label">Experience Level *</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select experience level</option>
                    {experienceLevelOptions.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="create-job-location-input-box">
                  <label className="create-job-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., New York"
                  />
                </div>

                <div className="create-job-location-input-box">
                  <label className="create-job-label">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., NY"
                  />
                </div>

                <div className="create-job-location-input-box">
                  <label className="create-job-label">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., United States"
                  />
                </div>

                <div className="create-job-location-input-box">
                  <label className="create-job-label">Number of Openings</label>
                  <input
                    type="number"
                    name="opening"
                    value={formData.opening}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="1"
                  />
                </div>

                <div className="create-job-location-input-box">
                  <label className="create-job-label">Stipend/Salary</label>
                  <input
                    type="number"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleInputChange}
                    placeholder="Amount in USD"
                  />
                </div>
              </div>



              {/* Extra Questions */}
              <div>
                <div className="create-job-input-box">
                  <h2 className="create-job-label">Additional Questions</h2>
                  <div >
                    <input
                      type="text"
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      placeholder="Enter your question"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addQuestion();
                        }
                      }}
                    />
                    <button className="create-job-general-button" type="button" onClick={addQuestion}>
                      Add Question
                    </button>
                  </div>
                </div>

                <div>
                  {formData.extra_questions.map((question, index) => (
                    <div key={index}>
                      <span>{question}</span>
                      <button className="create-job-general-button1" type="button" onClick={() => removeQuestion(question)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Stages */}
              <div className="create-job-input-box">
                <h2 className="create-job-label">Custom Application Stages</h2>
                <p className="create-job-text">Add custom stages or use default ones (CV Screening, Online Test, Technical Interview, HR Round, Final Decision)</p>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={currentStage.stage_name}
                    onChange={(e) => setCurrentStage(prev => ({ ...prev, stage_name: e.target.value }))}
                    placeholder="Stage name"
                  />
                  <input
                    type="text"
                    value={currentStage.stage_description}
                    onChange={(e) => setCurrentStage(prev => ({ ...prev, stage_description: e.target.value }))}
                    placeholder="Stage description"
                  />
                  <button  className="create-job-general-button" type="button" onClick={addCustomStage}>
                    Add Stage
                  </button>
                </div>

                <div>
                  {formData.custom_stages.map((stage, index) => (
                    <div key={index}>
                      <strong>{stage.stage_order}. {stage.stage_name}</strong>
                      <p>{stage.stage_description}</p>
                      <button  className="create-job-general-button1" type="button" onClick={() => removeCustomStage(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div>
              <p>Job created successfully!</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div>
              <p>Error creating job. Please try again.</p>
            </div>
          )}

          {/* Submit Button */}
          <button  className="create-job-general-button2" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Job...' : 'Create Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;