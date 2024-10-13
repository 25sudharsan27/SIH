import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './ResumeBuilder.css'; // Import your CSS file
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    about: '',
    skills: [],
    country: '',
    state: '',
    city: '',
    projects: [],
    experiences: [],
    volunteering: [],
    education: [],
    social: {
      linkedin: '',
      twitter: '',
      github: '',
      portfolio: '',
    },
    tagline: '',
    portfolio: '',
  });

  const [mode, setMode] = useState('manual'); // 'manual' or 'api'
  const userData = useSelector(selectUser);

  useEffect(() => {
    if (mode === 'api' && userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        age: userData.age || '',
        about: userData.about || '',
        skills: userData.skills || [],
        country: userData.country || '',
        state: userData.state || '',
        city: userData.city || '',
        projects: userData.projects.map(p => `${p.title}: ${p.description} (Link: ${p.link})`),
        experiences: userData.experiences.map(e => `${e.title} at ${e.company} (${e.startDate} - ${e.endDate})`),
        volunteering: userData.volunteering.map(v => `${v.title} at ${v.organization} (${v.startDate} - ${v.endDate})`),
        education: userData.education.map(e => `${e.title} - ${e.institution}`),
        social: userData.social || {
          linkedin: '',
          twitter: '',
          github: '',
          portfolio: '',
        },
        tagline: userData.tagline || '',
        portfolio: userData.portfolio || '',
      });
    }
  }, [mode, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setFormData(prevFormData => ({
        ...prevFormData,
        social: {
          ...prevFormData.social,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: value.split(',').map(item => item.trim())
    }));
  };

  const generateResume = () => {
    const resumeHTML = `
      <h2>${formData.name}</h2>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Age:</strong> ${formData.age}</p>
      <p><strong>Location:</strong> ${formData.city}, ${formData.state}, ${formData.country}</p>
      <p><strong>About:</strong> ${formData.about}</p>
      <h3>Skills</h3>
      <p>${formData.skills.join(', ')}</p>
      <h3>Projects</h3>
      ${formData.projects.map(p => `<p>${p}</p>`).join('')}
      <h3>Experiences</h3>
      ${formData.experiences.map(e => `<p>${e}</p>`).join('')}
      <h3>Volunteering</h3>
      ${formData.volunteering.map(v => `<p>${v}</p>`).join('')}
      <h3>Education</h3>
      ${formData.education.map(e => `<p>${e}</p>`).join('')}
      <h3>Social Links</h3>
      <p><strong>LinkedIn:</strong> ${formData.social.linkedin}</p>
      <p><strong>Twitter:</strong> ${formData.social.twitter}</p>
      <p><strong>GitHub:</strong> ${formData.social.github}</p>
      <p><strong>Portfolio:</strong> ${formData.social.portfolio}</p>
      ${formData.tagline ? `<h3>Tagline</h3><p>${formData.tagline}</p>` : ''}
      ${formData.portfolio ? `<h3>Portfolio</h3><p>${formData.portfolio}</p>` : ''}
    `;

    document.getElementById('resumeOutput').innerHTML = resumeHTML;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(formData.name, 20, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${formData.city}, ${formData.state}, ${formData.country}`, 20, 30);
    doc.text(formData.email, 20, 40);
    doc.text(formData.social.linkedin, 20, 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("TECHNICAL SKILLS", 20, 70);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const skillsList = `Languages: ${formData.skills.join(', ')}`;
    doc.text(skillsList, 20, 80);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("POWER SKILLS", 20, 100);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Problem Solving, Communication, Public Speaking, Leadership", 20, 110);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("PROJECTS", 20, 130);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    formData.projects.forEach((project, index) => {
      doc.text(`${index + 1}. ${project}`, 20, 140 + index * 10);
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", 20, 170);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    formData.education.forEach((education, index) => {
      doc.text(`${index + 1}. ${education}`, 20, 180 + index * 10);
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SOCIAL LINKS", 20, 210);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`LinkedIn: ${formData.social.linkedin}`, 20, 220);
    doc.text(`Twitter: ${formData.social.twitter}`, 20, 230);
    doc.text(`GitHub: ${formData.social.github}`, 20, 240);
    doc.text(`Portfolio: ${formData.social.portfolio}`, 20, 250);

    doc.save(`${formData.name}_resume.pdf`);
  };

  return (
    <div className="containerrr">
      <h1>Resume Builder</h1>
      <div>
        <button className='resumebtn' onClick={() => setMode('manual')}>Manual Entry</button>
        <button className='resumebtn' onClick={() => setMode('api')}>Get Details from profile</button>
      </div>

      {mode === 'manual' ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className='bugLabel' htmlFor="name">Full Name:</label>
            <input className='buger' id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="email">Email:</label>
            <input type="email" className='buger' id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="age">Age:</label>
            <input type="number" className='buger' id="age" name="age" value={formData.age} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="city">City:</label>
            <input className='buger' id="city" name="city" value={formData.city} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="state">State:</label>
            <input className='buger' id="state" name="state" value={formData.state} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="country">Country:</label>
            <input className='buger' id="country" name="country" value={formData.country} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="about">About:</label>
            <textarea id="about" name="about" value={formData.about} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="skills">Skills (comma-separated):</label>
            <textarea id="skills" className='bugs' name="skills" value={formData.skills.join(', ')} onChange={(e) => handleArrayChange(e, 'skills')} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="projects">Projects (comma-separated, each item as title:description (link)):</label>
            <textarea id="projects" className='bugs' name="projects" value={formData.projects.join(', ')} onChange={(e) => handleArrayChange(e, 'projects')} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="experiences">Experiences (comma-separated, each item as title at company (startDate - endDate)):</label>
            <textarea id="experiences" className='bugs' name="experiences" value={formData.experiences.join(', ')} onChange={(e) => handleArrayChange(e, 'experiences')} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="volunteering">Volunteering (comma-separated, each item as title at organization (startDate - endDate)):</label>
            <textarea id="volunteering" className='bugs' name="volunteering" value={formData.volunteering.join(', ')} onChange={(e) => handleArrayChange(e, 'volunteering')} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="education">Education (comma-separated, each item as title - institution):</label>
            <textarea id="education" className='bugs' name="education" value={formData.education.join(', ')} onChange={(e) => handleArrayChange(e, 'education')} />
          </div>

          <div className="form-group">
            <label className='bugLabel'>Social Links:</label>
            <input className='buger' name="social.linkedin" placeholder="LinkedIn" value={formData.social.linkedin} onChange={handleChange} />
            <input className='buger' name="social.twitter" placeholder="Twitter" value={formData.social.twitter} onChange={handleChange} />
            <input className='buger' name="social.github" placeholder="GitHub" value={formData.social.github} onChange={handleChange} />
            <input className='buger' name="social.portfolio" placeholder="Portfolio" value={formData.social.portfolio} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="tagline">Tagline:</label>
            <input className='buger' id="tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className='bugLabel' htmlFor="portfolio">Portfolio:</label>
            <input className='buger' id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} />
          </div>

          <button className='resumebtn' onClick={generateResume}>Generate Resume</button>
          <button className='resumebtn' onClick={downloadPDF}>Download PDF</button>

          <div id="resumeOutput" className="resume-output">
            {/* Generated resume will appear here */}
          </div>
        </form>
      ) : (
        userData && (
          <>
            <button className='resumebtn' onClick={generateResume}>Generate Resume</button>
            <button className='resumebtn' onClick={downloadPDF}>Download PDF</button>

            <div id="resumeOutput" className="resume-output">
              {/* Generated resume will appear here */}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ResumeBuilder;
