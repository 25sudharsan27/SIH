import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import './CreateJob1.css'; // Using the same CSS file

const EditJob = ({ onJobUpdated, onCancel }) => {
    const { jobId } = useParams();
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
    application_stages: [],
    status: 'open'
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentStage, setCurrentStage] = useState({
    stage_name: '',
    stage_order: 1,
    stage_description: '',
    is_active: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_viewjobdetails_api}/${jobId}`, {
        credentials: 'include'
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        const job = result.data;
        setFormData({
          title: job.title || '',
          description: job.description || '',
          link: job.link || '',
          skills: job.skills || [],
          city: job.city || '',
          state: job.state || '',
          country: job.country || '',
          workMode: job.workMode || '',
          experienceLevel: job.experienceLevel || '',
          opening: job.opening || 1,
          stipend: job.stipend || '',
          requirements: job.requirements || '',
          benefits: job.benefits || '',
          responsibilities: job.responsibilities || '',
          extra_questions: job.extra_questions || [],
          application_stages: job.application_stages || [],
          status: job.status || 'open'
        });
        setCurrentStage({
          stage_name: '',
          stage_order: job.application_stages.length + 1,
          stage_description: '',
          is_active: true
        });
        console.log('Job details fetched successfully:', job);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const addStage = () => {
    if (currentStage.stage_name.trim()) {
      const newStage = {
        ...currentStage,
        stage_order: formData.application_stages.length + 1
      };
      setFormData(prev => ({
        ...prev,
        application_stages: [...prev.application_stages, newStage]
      }));
      setCurrentStage({
        stage_name: '',
        stage_order: formData.application_stages.length + 2,
        stage_description: '',
        is_active: true
      });
    }
  };

  const removeStage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      application_stages: prev.application_stages.filter((_, index) => index !== indexToRemove)
        .map((stage, index) => ({ ...stage, stage_order: index + 1 }))
    }));
  };

  const updateStage = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      application_stages: prev.application_stages.map((stage, i) => 
        i === index ? { ...stage, [field]: value } : stage
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const jobData = {
        ...formData,
        opening: parseInt(formData.opening) || 1,
        stipend: formData.stipend ? parseFloat(formData.stipend) : null
      };

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/${jobId}/update`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        if (onJobUpdated) {
          onJobUpdated(result.data);
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseJob = async () => {
    if (window.confirm('Are you sure you want to close this job? This action cannot be undone.')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/${jobId}/close`, {
          method: 'PUT',
          credentials: 'include'
        });

        const result = await response.json();

        if (result.success) {
          setFormData(prev => ({ ...prev, status: 'closed' }));
          if (onJobUpdated) {
            onJobUpdated({ ...formData, status: 'closed' });
          }
        } else {
          alert('Error closing job: ' + result.message);
        }
      } catch (error) {
        console.error('Error closing job:', error);
        alert('Error closing job');
      }
    }
  };

  const handleReopenJob = async () => {
    if (window.confirm('Are you sure you want to reopen this job?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jobs/${jobId}/reopen`, {
          method: 'PUT',
          credentials: 'include'
        });

        const result = await response.json();

        if (result.success) {
          setFormData(prev => ({ ...prev, status: 'open' }));
          if (onJobUpdated) {
            onJobUpdated({ ...formData, status: 'open' });
          }
        } else {
          alert('Error reopening job: ' + result.message);
        }
      } catch (error) {
        console.error('Error reopening job:', error);
        alert('Error reopening job');
      }
    }
  };

  if (loading) {
    return <div className="create-job-container">Loading job details...</div>;
  }

  return (
    <div>
      {/* Sidebar */}
      <div id="i258" className="sidebar">
        <div id="i163">
          <div id="i168"><Link id="i164" to="/organization/createjob">Create Job</Link></div>
          <div id="i168"><Link id="i164" to="/organization/postedjobs" className="high">Posted Jobs</Link></div>
          <div id="i168"><Link id="i164" to="/organization/closedjobs">Closed Jobs</Link></div>
        </div>
      </div>

      <div className="create-job-container">
        <h1 className="create-job-heading">Edit Job</h1>
        <p className="create-job-text">Update job details and settings</p>
        
        {/* Status and Action Buttons */}
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ marginBottom: '15px' }}>
            <span className="create-job-label">Status: </span>
            <span style={{ 
              color: formData.status === 'open' ? '#28a745' : '#dc3545',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {formData.status}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {formData.status === 'open' ? (
              <button className="create-job-general-button1" type="button" onClick={handleCloseJob}>
                Close Job
              </button>
            ) : (
              <button className="create-job-general-button" type="button" onClick={handleReopenJob}>
                Reopen Job
              </button>
            )}
            <button className="create-job-general-button1" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>

        {/* Submit Status Messages */}
        {submitStatus === 'success' && (
          <div style={{ color: 'green', marginBottom: '20px', padding: '10px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
            Job updated successfully!
          </div>
        )}

        {submitStatus === 'error' && (
          <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
            Error updating job. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="create-job-form">
            {/* Basic Information */}
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

              {/* Skills Section */}
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
                  <button className="create-job-general-button" type="button" onClick={addSkill}>
                    Add Skill
                  </button>
                </div>

                <div className="create-job-input-box">
                  {formData.skills.map((skill, index) => (
                    <span key={index}>
                      {skill}
                      <button className="create-job-general-button1" type="button" onClick={() => removeSkill(skill)}>
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
                  <p className="create-job-text">Custom questions for applicants</p>
                  
                  <div>
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
                    <div key={index} style={{ 
                      padding: '8px',
                      margin: '4px 0',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px'
                    }}>
                      <span>{question}</span>
                      <button className="create-job-general-button1" type="button" onClick={() => removeQuestion(question)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Stages */}
              <div className="create-job-input-box">
                <h2 className="create-job-label">Application Stages</h2>
                <p className="create-job-text">Configure the application stages for this job</p>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      value={currentStage.stage_name}
                      onChange={(e) => setCurrentStage(prev => ({ ...prev, stage_name: e.target.value }))}
                      placeholder="Stage name"
                    />
                  </div>
                  <div style={{ flex: 2 }}>
                    <input
                      type="text"
                      value={currentStage.stage_description}
                      onChange={(e) => setCurrentStage(prev => ({ ...prev, stage_description: e.target.value }))}
                      placeholder="Stage description"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="checkbox"
                        checked={currentStage.is_active}
                        onChange={(e) => setCurrentStage(prev => ({ ...prev, is_active: e.target.checked }))}
                      />
                      Active
                    </label>
                  </div>
                  <button className="create-job-general-button" type="button" onClick={addStage}>
                    Add Stage
                  </button>
                </div>

                <div style={{ marginTop: '15px' }}>
                  {formData.application_stages.map((stage, index) => (
                    <div key={index} style={{ 
                      border: '1px solid #dee2e6',
                      padding: '12px',
                      margin: '8px 0',
                      borderRadius: '4px',
                      backgroundColor: '#fff'
                    }}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Stage {stage.stage_order}: </strong>
                        <input
                          type="text"
                          value={stage.stage_name}
                          onChange={(e) => updateStage(index, 'stage_name', e.target.value)}
                          placeholder="Stage name"
                          style={{ marginLeft: '10px', minWidth: '200px' }}
                        />
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={stage.stage_description}
                          onChange={(e) => updateStage(index, 'stage_description', e.target.value)}
                          placeholder="Stage description"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <input
                            type="checkbox"
                            checked={stage.is_active}
                            onChange={(e) => updateStage(index, 'is_active', e.target.checked)}
                          />
                          Active
                        </label>
                        <button 
                          className="create-job-general-button1"
                          type="button" 
                          onClick={() => removeStage(index)}
                        >
                          Remove Stage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="create-job-general-button2" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;