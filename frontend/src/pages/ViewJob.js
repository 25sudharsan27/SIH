import React, { useState, useEffect } from 'react';
import './ViewJob.css';
import { useNavigate, useParams } from 'react-router-dom';


function ViewJob() {
  const { id } = useParams();
  const job_id = id;
  console.log("job_id: " + job_id);
  const navigate = new useNavigate();


  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [extraAnswers, setExtraAnswers] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState('');

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchJobData = async () => {
      console.log("fetching url : "+process.env.REACT_APP_viewjobdetails_api)
      try {
        const response = await fetch(process.env.REACT_APP_viewjobdetails_api, {
          method: process.env.REACT_APP_viewjobdetails_method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ job_id }), // Pass the job_id in the body
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const responseData = await response.json(); // Parse JSON response

        setJobData(responseData.data); // Assuming responseData.data contains the job data
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData(); // Call the async function
  }, [job_id]);

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleExtraAnswerChange = (index, value) => {
    setExtraAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleAdditionalInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!jobData) return;
  
    // Prepare extra data
    const extra = jobData.extra_questions.map((_, index) => extraAnswers[index] || '');
    console.log("Extra data: ", extra);
    console.log("job data : ",job_id);
    try {
      const response = await fetch(process.env.REACT_APP_applyjob_api, {
        method: process.env.REACT_APP_applyjob_method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          job_id: job_id,
          extra: extra,
          // Resume is not included since it's not being uploaded
        }),
        
      });
  
      const result = await response.json();
      console.log("result : ",result);
      if (!response.ok) {
        throw new Error(result.message || "Failed to apply to job.");
      }
  
      alert("Application submitted successfully.");
      navigate('/user/viewjobs');
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Failed to submit application.");
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobData) {
    return <div>No job data available.</div>;
  }

  return (
    <div>
      <div className="job-listing">
        {/* Header Section */}
        <div className="job-header">
          <div className="company-logo">
            <img src="company-logo.png" alt="Company Logo" />
          </div>
          <div className="job-title-section">
            <h1>{jobData.title}</h1>
            <p>{jobData.city}</p>
            <p>{jobData.state}</p>
            <p>{jobData.country}</p>
            <div className="job-details">
              <span>{jobData.experienceLevel}</span>
              <span>{jobData.workMode}</span>
              <span>Stipend: {jobData.stipend || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* About Job Section */}
        <div className="about-job">
          <h2>About this Job</h2>
          <p>{jobData.description}</p>

          <h3>Responsibilities</h3>
          <ul>
            {(jobData.responsibilities || []).map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>

          <h3>Benefits</h3>
          <ul>
            {(jobData.benefits || []).map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* Requirements Section */}
        <div className="requirements">
          <h3>Requirements</h3>
          <ul>
            {(jobData.requirements || []).map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        {/* Skills Required Section */}
        <div className="skills-resources">
          <div className="skills-required">
            <h3>Skills Required</h3>
            <ul>
              {jobData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application Form */}
        <div className="application-form">
          <h3>Submit Application</h3>
          <form onSubmit={handleSubmit}>
            <label className="resu">
              Upload Resume:
              <input type="file" name="resume" onChange={handleResumeChange} />
            </label>

            <label className="final">
              Extra Questions:
              <ul>
                {jobData.extra_questions.map((question, index) => (
                  <li key={index}>
                    <label>{question}</label>
                    <input
                      type="text"
                      value={extraAnswers[index] || ''}
                      onChange={(e) => handleExtraAnswerChange(index, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <textarea
                placeholder="Enter any additional information here"
                value={additionalInfo}
                onChange={handleAdditionalInfoChange}
              ></textarea>
            </label>

            <button type="submit">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ViewJob;
