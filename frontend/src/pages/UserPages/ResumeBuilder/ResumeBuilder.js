import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './ResumeBuilder.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/userSlice';
import html2canvas from 'html2canvas';

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

  const [mode, setMode] = useState('manual');
  const userData = useSelector(selectUser);

  const [loading, setLoading] = useState(false);

  const generatePDF = async (elementToPrintId) => {
    setLoading(true);
    const element = document.getElementById(elementToPrintId);

    if (!element) {
      throw new Error(`Element with id ${elementToPrintId} not found`);
    }

    // Capture screenshot with html2canvas (adjust scale for quality)
    const canvas = await html2canvas(element, { scale: 1.5 }); // Scale for better quality, adjust scale for file size
    const data = canvas.toDataURL("image/png");

    // Compress the image using a lower quality (optimize image size)
    const img = new Image();
    img.src = data;
    
    img.onload = () => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate image properties and scale to fit the PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;

      // Add image to PDF with scaling
      pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');

      // Save the generated PDF with optimized quality
      pdf.save("resume.pdf");
      setLoading(false);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        social: {
          ...prevFormData.social,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handlePrintPreview = () => {
    const printContents = document.getElementById('i207').innerHTML;
    const originalContents = document.body.innerHTML;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '-9999px';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(printContents);
    iframeDoc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    document.body.removeChild(iframe);
  };

  return loading ? (
    <div id="i207">Loading...</div>
  ) : (
    <div className="containerrr">
      {userData && (
        <div className="resume-container">
          <div className="resume-builder-form2">
            <div id="i207" className="resume-section resume-builder-resume-section">
              <h3 style={{ textAlign: 'center' }}>{userData.name}</h3>
              <p>
                <strong>About:</strong>{' '}
              </p>
              <div id="i206"></div>

              <div>
                <p id="i197">{userData.about}</p>
              </div>

              <h3 id="i198">Experience</h3>
              <div id="i205"></div>

              <div>
                {userData.experiences.map((exp, idx) => (
                  <div id="i202" key={idx}>
                    <div id="i201">
                      <div>
                        <p id="i199">
                          <b>{exp.company}</b>{' '}
                        </p>
                        <p id="i203"> {exp.title}</p>
                      </div>
                      <p id="i200">
                        {' '}
                        {new Date(exp.startDate).toISOString().split('T')[0]} -{' '}
                        {new Date(exp.endDate).toISOString().split('T')[0]}
                      </p>
                    </div>
                    <p id="i204">{exp.description}</p>
                  </div>
                ))}
              </div>

              <h3 id="i198">Education</h3>
              <div id="i205"></div>

              <ul>
                {userData.education.map((edu, idx) => (
                  <div id="i202" key={idx}>
                    <div id="i201">
                      <div>
                        <p id="i199">
                          <b>{edu.institution}</b>{' '}
                        </p>
                        <p id="i203"> {edu.title}</p>
                      </div>
                      <p id="i200">
                        {' '}
                        {new Date(edu.startDate).toISOString().split('T')[0]} -{' '}
                        {new Date(edu.endDate).toISOString().split('T')[0]}
                      </p>
                    </div>
                    <p id="i204">{edu.description}</p>
                  </div>
                ))}
              </ul>

              <h3 id="i198">Projects</h3>
              <div id="i205"></div>

              {userData.projects.slice(0, 2).map((project, idx) => (
                <div id="i202" key={idx}>
                  <div id="i201">
                    <div>
                      <a href={project.title}>
                        <p style={{ fontSize: '14px' }}>
                          <b>{project.title}</b>
                        </p>{' '}
                      </a>
                    </div>
                    <a href={project.link} id="i200">
                      {project.link}
                    </a>
                  </div>
                  <p id="i204">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="button-container">
            <button className="resumebtn" onClick={handlePrintPreview}>
              Preview
            </button>

            <button
              className="resumebtn"
              onClick={() => generatePDF('i207')}
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
