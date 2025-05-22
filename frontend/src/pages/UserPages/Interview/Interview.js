import React, { useEffect, useState } from 'react';
import './Interview.css';
import Skill from '../Skill/Skill';

function Interview() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_interview_api, {
          method: process.env.REACT_APP_interview_method,
          headers: {
            'Content-Type': 'application/json'
          },
        });

        // console.log('Response:', response); // Log the raw response

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log('Data:', data); // Log the parsed data

        // Adjust this based on your API's response structure
        setSkills(data.data || data); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='containerr'>
      {loading &&<div className="buffer">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>}
      <div className='none'>
        <p>AI-Interview</p>
        <div className='interview-box'>
          <div className='interview-box-left'></div>
          <div className='interview-box-right'></div>
        </div>
      </div>
      <div>
        <p id="skill-assessment">Skill Assessment</p>
        <div className='skill-container'>
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <Skill key={index} skillData={skill} />
            ))
          ) : (
            <p>No skills available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
