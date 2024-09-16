import { Link } from 'react-router-dom';
import './PostedJobs.css'; // You can create this file for styling the posted jobs
import { useState } from 'react';
import "./Applicants.css";

const Applicants = () => {
    const applicants = [
        {
          name: 'Subash',
          degree: 'B. Tech CSE AI',
          college: 'Amrita Vishwa Vidyapeetham',
          location: 'Dindigul, Tamil Nadu, India',
          skills: {
            "Web Development": true,
            "JavaScript": true,
            "TypeScript": false,
            "Node Js": true,
            "React Js": true,
            "Express Js": true,
            "Nest Js": false,
            "Redux Js": true
          },
          resume: {
            about: `I'm a proficient developer with expertise in React, JWT Authentication, and Redux for state management, along with Node.js. I actively work on projects, sharing them on LinkedIn, and contribute to GitHub's top-quality projects.`,
            experience: [
              {
                project: 'Ecommerce Website',
                date: 'August 2024 - Present',
                description: 'Developing a full-stack MERN website with JWT auth and state management with Redux. Implemented a scalable architecture using microservices.'
              },
              {
                project: 'Summer Training',
                date: 'June 2024 - July 2024',
                description: 'Training from Programming Pathshala.'
              }
            ]
          },
          additionalQuestions: [
            { question: 'Hi, this is just a sample. You can assume any extra questions here.', answer: 'This is a sample answer.' }
          ]
        }
      ];

    return (
        <div className="job-page-container">
            <aside className="sidebar">
                <ul>
                    <li><Link to="/organization/jobs/createjob" >Create Job</Link></li>
                    <li><Link className="high" to="/organization/jobs/" >Posted Jobs</Link></li>
                    <li><Link to="/organization/jobs/closedjob">Closed Jobs</Link></li>
                </ul>
            </aside>
            <div className="container">
                <div className="main-content">
                    <Header />
                    {applicants.map((applicant, index) => (
                        <ApplicantCard key={index} applicant={applicant} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const Header = () => (
    <div className="header">
        <img src="logo.png" alt="Logo" className="logo" />
        <h1>Full Stack Intern Applicants</h1>
        <p>Bengaluru, Karnataka, India</p>
    </div>
);

const ApplicantCard = ({ applicant }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="applicant-card">
            <div className="applicant-header">
                <div>
                    <h2>{applicant.name}</h2>
                    <p>{applicant.degree}, {applicant.college}</p>
                    <p># 5 Star Coder at CodeChef #</p>
                    <p>{applicant.location}</p>
                </div>
                <button className="view-btn" onClick={toggleDetails}>
                    {showDetails ? 'Hide' : 'View'}
                </button>
            </div>

            {showDetails && (
                <>
                    <div className="hided">
                        <div className="skills-section">
                            <h3>Skills</h3>
                            <ul>
                                {Object.entries(applicant.skills).map(([skill, hasSkill]) => (
                                    <li key={skill}>
                                        {skill} {hasSkill ? '✔️' : '❌'}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="resume-section">
                            <h3>Resume</h3>
                            <p><strong>About:</strong> {applicant.resume.about}</p>
                            <h4>Projects and Experience:</h4>
                            <ul>
                                {applicant.resume.experience.map((exp, idx) => (
                                    <li key={idx}>
                                        <p><strong>{exp.project}</strong> ({exp.date})</p>
                                        <p>{exp.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="extra-questions">
                        <h3>Extra Questions</h3>
                        {applicant.additionalQuestions.map(({ question, answer }, idx) => (
                            <div key={idx}>
                                <p><strong>Q:</strong> {question}</p>
                                <p><strong>Answer:</strong> {answer}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Applicants;
