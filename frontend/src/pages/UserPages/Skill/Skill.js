import React from 'react';
import './Skill.css';
import pythonLogo from '../../../images/python-logo.png'; // Replace with a prop or default image if needed
import { useNavigate } from 'react-router-dom';

function Skill({ skillData = {} }) {
  
  // Default to an empty object
  const navigate = new useNavigate();
  if (!skillData || !skillData.questions) {
    return (<div className="buffer">
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </div>);
  }

  const numberOfQuestions = skillData.questions.length; // Use optional chaining if unsure
  const testName = skillData.TestName || 'Unknown Test'; // Provide a default test name if needed

  return (
      <div id="i290" className='skill-box'>
        <div className='skill-top'>
          <div className='skill-left'>
            <p className='skill-name'><b>{testName}</b></p>
            <div>
              <p className='time'>{numberOfQuestions} MCQs</p>
              <p className='time'>30 Min</p> {/* Adjust as needed */}
            </div>
          </div>
          <div className='skill-right'>
            <img src={pythonLogo} className="logo" alt="Skill Logo" />
          </div>
        </div>
        <button onClick={()=>{navigate('/mcqtest/'+skillData._id)}}  className='skill-start-btn'>Start</button>
      </div>
  );
}

export default Skill;
