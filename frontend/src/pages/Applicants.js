import { Link, useParams } from 'react-router-dom';
import './PostedJobs.css'; // You can create this file for styling the posted jobs
import { useState, useEffect } from 'react';
import "./Applicants.css";
import tick from './images/tick.svg';
import times from './images/times.svg';

const Applicants = () => {
    const { id } = useParams(); // Extract the job ID from params
    const [jobDetails, setJobDetails] = useState(null);
    const [applicantsData, setApplicantsData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const fetchedUserIds = new Set(); // Track fetched user IDs

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_viewjobdetails_api, {
                    method: process.env.REACT_APP_viewjobdetails_method,
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ job_id: id }),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setJobDetails(responseData.data);
                    console.log(responseData.data);
                    await fetchUserDetails(responseData.data.applicants); // Fetch user details if job details are retrieved
                } else {
                    throw new Error("Network response was not ok.");
                }
            } catch (error) {
                console.error("Failed to fetch job data:", error);
            }
        };

        fetchJobDetails();
    }, [id]); // Fetch job details when the component mounts or ID changes

    const fetchUserDetails = async (applicants) => {
        setLoading(true); // Set loading to true before fetching user details
        const userDetailsPromises = applicants.map(async (applicant) => {
            // Check if the user ID has already been fetched
            if (fetchedUserIds.has(applicant.id)) {
                return null; // Skip fetching if already fetched
            }
            fetchedUserIds.add(applicant.id); // Mark this user ID as fetched

            try {
                const response = await fetch(process.env.REACT_APP_userdetails_api, {
                    method: process.env.REACT_APP_userdetails_method,
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: applicant.id })
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(`User data for applicant ID ${applicant.id}:`, userData);
                    return userData; // Return user data instead of setting state directly
                } else {
                    throw new Error("Network response was not ok.");
                }
            } catch (error) {
                console.error(`Failed to fetch user data for applicant ID ${applicant.id}:`, error);
                return null; // Return null for failed requests
            }
        });

        const userDetails = await Promise.all(userDetailsPromises);
        setApplicantsData(userDetails.filter(user => user !== null)); // Filter out null responses
        setLoading(false); // Set loading to false after fetching all user details
    };

    return (
        <div className="job-page-container">
            <div id="i258" className="sidebar">
          <div id="i163">
            <div id="i168"><Link id="i164" to="/organization/createjob" >Create Job</Link></div>
            <div id="i168"><Link id="i164"  to="/organization/postedjobs" className="high">Posted Jobs</Link></div>
            <div id="i168"><Link id="i164" to="/organization/closedjobs">Closed Jobs</Link></div>
          </div>
        </div>
            <div id="applicants111" className="container">
                <div id="applicants112"  className="main-content">
                    <Header jobDetails={jobDetails} />
                    {loading ? (
                        <div className="buffer">
                        <div className="loading-container">
                          <div className="loading-spinner"></div>
                        </div>
                      </div> // Show loading message
                    ) : (
                        applicantsData.map((applicant, index) => (
                            
                            <ApplicantCard index={index} jobDetails={jobDetails} applicant={applicant} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const Header = ({ jobDetails }) => (
    <div className="header">
        {/* <img src="logo.png" alt="Logo" className="logo" /> */}
        <h1 id="i191">{jobDetails?.title} Applications</h1>
        <p>{jobDetails?.city}, {jobDetails?.state}<br></br> {jobDetails?.country}</p>
    </div>
);

const ApplicantCard = ({ index,applicant ,jobDetails}) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    console.log("key : "+index);
    console.log("job details : "+JSON.stringify(jobDetails.applicants[0].skills));
    // console.log("job details : "+JSON.stringify(jobDetails));
    // console.log("applicant data " + JSON.stringify(applicant.data));
    // console.log("job details " + jobDetails);

    return (
        <div className="applicant-card">
            <div id="i192" className="applicant-header">
                <div id="i193">
                    <h2 id="i191">{applicant.data.name}</h2>
                    <p style={{fontWeight:"500"}}>{applicant.data.tagline}</p>
                    <p style={{fontWeight:"500"}} >{applicant.data.city}, {applicant.data.state}</p>
                    <p style={{fontWeight:"500"}}>{applicant.data.country}</p>
                    
                </div>
                <button className="view-btn" onClick={toggleDetails}>
                    {showDetails ? 'Hide' : 'View'}
                </button>
            </div>

            {showDetails && (
                <>
                    <div className="hided">
                        <div id="i194" className="skills-section">
                            <h3>Skills</h3>
                            <div >
                                {jobDetails.applicants[index].skills.map(({skill,match},idx) => (
                                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingRight:"90px"}}>
                                    <div key={idx}>
                                        <p style={{fontWeight:"500"}}>{skill}</p>
                                    </div>
                                    <div key={idx}>
                                    {match ? <img src={tick} alt="✔️" style={{height:"20px"}} /> :<img src={times} alt='❌' style={{height:"20px"}} />  }
                                    </div>
                                    </div>
                                ))}
                                
                            </div>
                        </div>

                        <div id="i207" className="resume-section">
                            <h3>Resume</h3>
                            <p><strong>About:</strong> </p>
                            <div id="i206"></div>

                            <div>
                            <p id="i197">{applicant.data.about}</p>
                            </div>

                            <h3 id="i198">Experience</h3>
                            <div id="i205"></div>

                            <div>
                                {applicant.data.experiences.map((exp, idx) => (
                                    <div id="i202" key={idx}>
                                        <div id="i201">
                                            <div>
                                            <p id="i199"><b>{exp.company}</b> </p>
                                            <p id="i203"> {exp.title}</p>
                                            </div>
                                            <p id="i200"> {new Date(exp.startDate).toISOString().split('T')[0]} to {new Date(exp.endDate).toISOString().split('T')[0]}</p>

                                            
                                        </div>
                                        <p id="i204">{exp.description}</p>
                                    </div>
                                ))}
                            </div>


                            <h3 id="i198">Education</h3>
                            <div id="i205"></div>

                            <ul>
                                {applicant.data.education.map((edu, idx) => (
                                                       <div id="i202" key={idx}>
                                                       <div id="i201">
                                                           <div>
                                                           <p id="i199"><b>{edu.company}</b> </p>
                                                           <p id="i203"> {edu.title}</p>
                                                           </div>
                                                           <p id="i200"> {new Date(edu.startDate).toISOString().split('T')[0]} to {new Date(edu.endDate).toISOString().split('T')[0]}</p>
               
                                                           
                                                       </div>
                                                       <p id="i204">{edu.description}</p>
                                                   </div>
                                ))}
                            </ul>

                            <h3 id="i198">Projects</h3>
                            <div id="i205"></div>

                            
                                {applicant.data.projects.map((project, idx) => (
                                    <div id="i202" key={idx}>
                                    <div id="i201">
                                        <div>
                                        <a href={project.title} ><p style={{fontSize:"14px"}}><b>{project.title}</b></p> </a>

                                        </div>
                                        <a href={project.link} id="i200">{project.link}</a>
                                    </div>
                                    <p id="i204">{project.description}</p>
                                </div>
                                ))}
                            
                        </div>
                    </div>

                   
                    <div id="i195" className="extra-questions">
                        <h3 style={{fontSize:"24px"}}><b>Extra Questions</b></h3>
                        {jobDetails.applicants[index].extra_questions.map(({ question, answer }, idx) => (
                            <div style={{margin:"10px"}} key={idx}>
                                <p ><strong>Q:{idx+1}</strong> {question}</p>
                                <p id="i196"><strong>Answer:</strong> {answer}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Applicants;
