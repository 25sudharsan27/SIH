import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Interview/Interview.css';

function Interview() {
  const { id } = useParams(); // Extract the id from the URL
  const [skillData, setSkillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_mcq_api+"/"+id, {
          method: process.env.REACT_APP_mcq_method,
          headers: {
            'Content-Type': 'application/json'
          },
        });
        // console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
    
        setSkillData(data.data); // Set the fetched skill data
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillData();
  }, [id]);

  const handleChange = (questionIndex, option) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleRestart = () => {
    window.location.reload();
  }
  const handleContinue = () => {
    setSubmitted(false);
  }

  const handleSubmit = () => {
    let score = 0;
    if (skillData && skillData.questions) {
      skillData.questions.forEach((question, index) => {
        if (answers[index] === question.answer) {
          score++;
        }
      });
    }
    const messageContainer = document.createElement('div');
        messageContainer.className = 'popup-message';
        messageContainer.id = "i233"
        messageContainer.textContent = 'You scored ' + score + ' out of ' + skillData.questions.length;
        
        document.body.appendChild(messageContainer);

        // Remove the message after a few seconds
        setTimeout(() => {
          document.body.removeChild(messageContainer);
        }, 3000);
    // alert(`You scored ${score} out of ${skillData.questions.length}`);
    setSubmitted(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='containerr'>
      <div className='none'>
        <p>AI-Interview</p>
        <div className='interview-box'>
          <div className='interview-box-left'></div>
          <div className='interview-box-right'></div>
        </div>
      </div>
      <div className="hi111">
        <p className="hi100">Skill Assessment: {skillData?.TestName || "Loading..."}</p>
        <div className='questions-container'>
          {skillData?.questions?.length > 0 ? ( // Check if skillData and questions are defined
            skillData.questions.map((question, index) => (
              <div key={index} className="question">
                <p>{(index+1) +" ) " +question.text}</p>
                <div className='answers-container'>
                  {question.options.map((option) => (
                    <div key={option} className='answers'>
                      <div className='answers-left'>
                        <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleChange(index, option)}
                        checked={answers[index] === option}
                        />
                      </div>
                      <div className='answers-right'>
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No questions available</p> // Better message if no questions are found
          )}
          {!submitted && <button style={{margin:'20px',backgroundColor:"green"}} className='skill-start-btn'  onClick={handleSubmit}>Submit</button>}
          <div style={{display:'flex'}}>
          {submitted && <button style={{margin:'20px'}} className="skill-start-btn" onClick={handleContinue}>Continue</button>}

          {submitted && <button style={{margin:'20px'}} className="skill-start-btn" onClick={handleRestart}>Restart</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
