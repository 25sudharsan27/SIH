import React, { useState, useEffect } from 'react';
import './ViewJob.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/userSlice';



function ViewJob() {
  
  const userData = useSelector(selectUser);

  const { id } = useParams();
  const job_id = id;
  // console.log("job_id: " + job_id);
  const navigate = new useNavigate();


  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [extraAnswers, setExtraAnswers] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState('');

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchJobData = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(process.env.REACT_APP_viewjobdetails_api+"/"+id, {
          method: process.env.REACT_APP_viewjobdetails_method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const responseData = await response.json(); // Parse JSON response
        setJobData(responseData.data); // Assuming responseData.data contains the job data
        console.log(responseData.data);
      } catch (error) {
        
        // console.error("Failed to fetch job data:", error);
        const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';

        messageContainer.textContent = "Failed to fetch job data. Please try again later.";
        
        document.body.appendChild(messageContainer);
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData(); // Call the async function
  }, [job_id]);

  const handleResumeChange = (event) => {
    setResume(event.targe.value);
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
    const extra = jobData.extra_questions.map((_, index) => {
      return {question : jobData?.extra_questions[index], answer : 
      extraAnswers[index] || ''}
    })
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
          jobId: job_id,
          extra_questions_answers: extra,
          resume
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
      const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.textContent = error.message || "Failed to apply to job.";
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    }
  };
  
  if (!jobData) {
    return <div>Loading...</div>;
  }
  

  return (
    <div id="i251">
      {
        loading && <div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
      }
      <div className="job-listing">
        {/* Header Section */}
        <div className="job-header">
          
          <div className="job-title-section">
            <div id="i155">
            <h1 >{jobData.title}</h1>
            </div>
            <div id="i156">
              <div className="company-logo">
                <img src={jobData?.pic} alt="Company Logo" />
                <p>{jobData.companyname}</p>
              </div>
              <div id="i157">
                <p>{jobData.city}</p>
                <p>{jobData.state}</p>
                <p>{jobData.country}</p>
              </div>
           
            </div>
            <div className="job-details">
              <span id="i183">{jobData.experienceLevel}</span>
              <span id="i183">{jobData.workMode}</span>
              <span id="i183">Stipend: {jobData.stipend || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* About Job Section */}
        <div className="about-job">
          <h3 id="i184">About this Job</h3>
          <p id="i181">{jobData.description}</p>

          <h3  id="i184">Responsibilities</h3>
          <ul id="i185">
            {jobData?.responsibilities ? (jobData.responsibilities.split(".")).map((responsibility, index) => (
              <li  id="i181" key={index}>{responsibility}</li> 
            )) : ""}
          </ul>

          <h3  id="i184">Benefits</h3>
          <ul id="i185">
            
            {jobData?.benefits ? (jobData.benefits.split(".")).map((responsibility, index) => (
              <li  id="i181" key={index}>{responsibility}</li> 
            )) : ""}
          </ul>
        </div>

        {/* Requirements Section */}
        <div className="requirements">
          <h3  id="i184">Requirements</h3>
          <ul id="i185">
            
            {jobData.requirements ? (jobData.requirements.split(".")).map((responsibility, index) => (
              <li id="i181" key={index}>{responsibility}</li> 
            )): ""}
          </ul>
        </div>

        {/* Skills Required Section */}
        <div className="skills-resources">
          <div className="skills-required">
            <h3  id="i184">Skills Required</h3>
            <ul id="i185">
              {jobData.skills.map((skill, index) => (
                <li id="i181" key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application Form */}
        <div className="application-form">
          <h3 id="i184">Submit Application</h3>
          <form onSubmit={handleSubmit}>
            <label  id="i181" className="resu">
              Give Good Drive link of Resume:
              <input id="i186" type="text" style={{width:"100%"}} name="resume" onChange={(e)=>{setResume(e.target.value)}} />
            </label>

            <label id="i152" className="final">
              <h3  id="i184">Extra Questions:</h3>
              <div>
                {jobData.extra_questions.map((question, index) => (
                  <div id="i151" key={index}>
                    <label  id="i181" >{question}</label>
                    <textarea

                      placeholder="Write your response here"
                      id="i150"
                      value={extraAnswers[index] || ''}
                      onChange={(e) => handleExtraAnswerChange(index, e.target.value)}
                    >
                    </textarea>
                  </div>
                ))}
              </div>
              <textarea
              id="i150"
                placeholder="Enter any additional information here"
                value={additionalInfo}
                onChange={handleAdditionalInfoChange}
              ></textarea>
            </label>

            <div>
              {jobData?.application_stages && jobData.application_stages.length > 0 ? (
                <div id="i188">
                  <h3  id="i184">Application Stages</h3>
                  {jobData.application_stages.map((stage, index) => (
                    <div id="application_stages_job" key={index}>

                      <div className="application_stage_name">{stage.stage_name}  </div>
                      <div className="application_state_description">
                        {stage.stage_description}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p id="i181">No application stages defined for this job.</p>
              )}
            </div>

            <button id="i187" type="submit">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ViewJob;
