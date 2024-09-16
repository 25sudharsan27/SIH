import React from 'react';
import './ViewJob.css';


const jobData = {
    jobTitle: "Full Stack Intern",
    location: "Bengaluru, Karnataka, India",
    employmentType: "On-site",
    jobType: "Internship",
    stipend: "₹20,000",
    about: "Cloud Counselage Pvt. Ltd is looking for interns, with an interest in Full-stack development, who can develop front- and back-end software.",
    responsibilities: [
      "Compliance with company policies",
      "Complete task assigned before the deadline",
      "Follow the instructions provided by supervisors"
    ],
    benefits: [
      "Experience Certificate/Letter from Cloud Counselage Pvt. Ltd on successful completion of the internship",
      "Industry Best Practices Training",
      "Practical Software & Systems Applications",
      "Hands-on experience working with a Team",
      "Working on Live/Associate Projects"
    ],
    requirements: [
      "Final-year students or fresh graduates",
      "Good problem-solving skills",
      "Willing to work remotely with minimum supervision",
      "Strong interest in Full-stack development"
    ],
    skillsRequired: [
      "Web Development",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Express.js",
      "React.js"
    ],
    resources: {
      "TypeScript": [
        { name: "TypeScript Tutorial for Beginners", url: "https://typescriptlang.org" },
        { name: "TypeScript Documentation", url: "https://www.typescriptlang.org/docs/handbook/intro.html" }
      ],
      "Next.js": [
        { name: "Next.js Tutorial for Beginners", url: "https://nextjs.org/learn" },
        { name: "Next.js Documentation", url: "https://nextjs.org/docs" }
      ]
    }
  };

function ViewJob() {
  return (
    <div>
    <div className="job-listing">
      {/* Header Section */}
      <div className="job-header">
        <div className="company-logo">
          <img src="company-logo.png" alt="Company Logo" />
        </div>
        <div className="job-title-section">
          <h1>{jobData.jobTitle}</h1>
          <p>{jobData.location}</p>
          <div className="job-details">
            <span>{jobData.employmentType}</span>
            <span>{jobData.jobType}</span>
            <span>Stipend: {jobData.stipend}</span>
          </div>
        </div>
      </div>

      {/* About Job Section */}
      <div className="about-job">
        <h2>About this Job</h2>
        <p>{jobData.about}</p>

        <h3>Responsibilities</h3>
        <ul>
          {jobData.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>

        <h3>Benefits</h3>
        <ul>
          {jobData.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {/* Requirements Section */}
      <div className="requirements">
        <h3>Requirements</h3>
        <ul>
          {jobData.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>

      {/* Skills Required Section */}
      <div className ="skills-resources">
      <div className="skills-required">
        <h3>Skills Required</h3>
        <ul>
          {jobData.skillsRequired.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Resources Section */}
      <div className="resources">
        <h3>Resources</h3>
        <div className="resource-links">
          {Object.keys(jobData.resources).map((tech, index) => (
            <div key={index}>
              <h4>{tech}</h4>
              {jobData.resources[tech].map((resource, resIndex) => (
                <a key={resIndex} href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Application Form */}
      <div className="application-form">
        <h3>Submit Application</h3>
        <form>
          <label className="resu">
            Upload Resume:
            <input type="file" name="resume" />
          </label>

          <label className="final">
            Extra Questions:
            <textarea placeholder="Enter any additional information here"></textarea>
          </label>

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ViewJob;
