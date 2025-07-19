import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Applicants.css';

const ApplicantManagement = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [comments, setComments] = useState('');
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [targetApplicant, setTargetApplicant] = useState(null);
  const [countsData, setCountsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5; // Or any default page size


  useEffect(() => {
    fetchJobDetails();
    fetchStageswithCount();
    fetchApplicantsByStage(currentStage, currentPage);
  }, [jobId, currentStage, currentPage]);

  const fetchStageswithCount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_fetchstageswithcount_api}/${jobId}`, {
        credentials: 'include'
      });
      const result = await response.json();
      if (result.success) {
        setCountsData(result.data);
      }
    } catch (error) {
      console.error('Error fetching stages with counts:', error);
    }
  };


  const fetchJobDetails = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_fetchjoborganizationjobdetails_api}/${jobId}`, {
        credentials: 'include'
      });
      const result = await response.json();

      if (result.success) {
        setJob(result.data);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const fetchApplicantsByStage = async (stage, page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_fetchapplicantsbystage_api}/${jobId}/${stage}?page=${page}&limit=${ITEMS_PER_PAGE}`, {
        credentials: 'include'
      });
      const result = await response.json();

      if (result.success) {
        setApplicants(result.data.applicants || []);
        setJob(result.data.job);
        setTotalPages(result.data.totalPages);
        setCurrentPage(result.data.currentPage);
      }
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleStageChange = (stage) => {
    setCurrentStage(parseInt(stage));
    setSelectedApplicants([]);
    setCurrentPage(1); // reset pagination
  };


  const handleApplicantSelection = (applicantId) => {
    setSelectedApplicants(prev => {
      if (prev.includes(applicantId)) {
        return prev.filter(id => id !== applicantId);
      } else {
        return [...prev, applicantId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedApplicants.length === applicants.length) {
      setSelectedApplicants([]);
    } else {
      setSelectedApplicants(applicants.map(app => app._id));
    }
  };

  const openCommentsModal = (action, applicantId = null) => {
    setActionType(action);
    setTargetApplicant(applicantId);
    setShowCommentsModal(true);
    setComments('');
  };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
    setActionType('');
    setTargetApplicant(null);
    setComments('');
  };

  const handleSingleApplicantAction = async () => {
    if (!targetApplicant) return;

    try {
      setActionLoading(true);
      const response = await fetch(`${process.env.REACT_APP_fetchsingleapplicantaction_api}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          jobId,
          applicantId: targetApplicant,
          decision: actionType,
          comments
        })
      });

      const result = await response.json();

      if (result.success) {
        fetchApplicantsByStage(currentStage);
        closeCommentsModal();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating applicant:', error);
      alert('Error updating applicant status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBulkAction = async () => {
    if (selectedApplicants.length === 0) return;

    try {
      setActionLoading(true);
      const response = await fetch(`${process.env.REACT_APP_handlebulkaction_api}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          jobId,
          applicantIds: selectedApplicants,
          decision: actionType,
          comments
        })
      });

      const result = await response.json();

      if (result.success) {
        fetchApplicantsByStage(currentStage);
        setSelectedApplicants([]);
        closeCommentsModal();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating applicants:', error);
      alert('Error updating applicants');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStageStatusColor = (status) => {
    switch (status) {
      case 'passed': return '#28a745';
      case 'failed': return '#dc3545';
      case 'in_progress': return '#ffc107';
      case 'pending': return '#6c757d';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <div className="buffer">
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  </div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="applications-page-container" >
      <div className="applicants-page-header">
        <h1>Applicant Management</h1>
        <h2>{job.title}</h2>
        <p>{job.company} - {job.city}, {job.state}</p>
      </div>

      <div>
        <h3>Application Stages</h3>
        <div>
          {job.application_stages?.map((stage, index) => (
            <button
              key={index}
              onClick={() => handleStageChange(index)}
              style={{
                backgroundColor: currentStage === index ? '#007bff' : '#f8f9fa',
                color: currentStage === index ? 'white' : 'black',
                margin: '0 5px',
                padding: '8px 16px',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              className="application-stage-button"
            >
              {stage.stage_name} ({countsData[stage.stage_name] || 0})
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="applicants-page-header-p">
          {job.application_stages?.[currentStage]?.stage_name || 'Stage'} -
          {job.application_stages?.[currentStage]?.stage_description || 'No description'}
        </h3>

        {applicants.length > 0 && (
          <div>
            <div>
              <button  className="create-job-general-button" onClick={handleSelectAll}>
                {selectedApplicants.length === applicants.length ? 'Deselect All' : 'Select All'}
              </button>

              {selectedApplicants.length > 0 && (
                <div>
                  <button  className="create-job-general-button" onClick={() => openCommentsModal('passed')}>
                    Pass Selected ({selectedApplicants.length})
                  </button>
                  <button  className="create-job-general-button" onClick={() => openCommentsModal('failed')}>
                    Reject Selected ({selectedApplicants.length})
                  </button>
                </div>
              )}
            </div>

            <div className="applicants-list-container">
              {applicants.map((applicant) => (
                <div
                  className="applicant-list-card"
                  key={applicant._id}
                  style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '16px',
                    margin: '8px 0',
                    backgroundColor: selectedApplicants.includes(applicant._id) ? '#f8f9fa' : 'white'
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedApplicants.includes(applicant._id)}
                      onChange={() => handleApplicantSelection(applicant._id)}
                    />
                  </div>
                  <div className="applicant-list-container-box">
                    <div className="applicant-list-left-one">
                      <div className="applicant-list-info">
                        <h4>{applicant.id?.name || 'Unknown'}</h4>
                        <p>{applicant.id?.email}</p>
                        <p>{applicant.id?.tagline}</p>
                        <p>{applicant.id?.city}, {applicant.id?.state}, {applicant.id?.country}</p>
                      </div>
                      <div className="applicant-list-experience">
                        <div>
                          <h5 className="applicant-subsection-heading">Experience</h5>
                          {applicant.id?.experiences?.map((exp, index) => (
                            <div key={index}>
                              <strong className="applicant-subsection-heading">{exp.title}</strong> at<span style={{fontSize:"13px"}}> {exp.company}</span>
                              <br />
                              {exp.startDate && (
                                <small className="applicant-subsection-text">
                                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                                </small>
                              )}
                            </div>
                          ))}
                        </div>

                        <div>
                          <h5 className="applicant-subsection-heading">Education</h5>
                          {applicant.id?.education?.map((edu, index) => (
                            <div key={index}>
                              <strong  className="applicant-subsection-heading">{edu.title}</strong> at <span style={{fontSize:"13px"}}>{edu.institution}</span>
                              <br />
                              {edu.startDate && (
                                <small className="applicant-subsection-text">
                                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                                </small>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        {applicant.extra_questions && applicant.extra_questions.length > 0 && (
                          <div>
                            <h5  className="applicant-subsection-heading">Additional Questions</h5>
                            {applicant.extra_questions.map((qa, index) => (
                              <div key={index}>
                                <strong className="applicant-subsection-heading">Q: {qa.question}</strong>
                                <p className="applicant-subsection-text">A: {qa.answer}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>



                    <div className="applicant-list-right-one">
                      <h5  className="applicant-subsection-heading">Application History</h5>
                      {applicant.stage_history?.map((stage, index) => (
                        <div className="applicant-history-card" key={index}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <strong className="applicant-subsection-heading" style={{width:'70%'}}>{stage.stage_name}</strong>
                            <span
                             className="applicant-subsection-heading"
                              style={{
                                color: getStageStatusColor(stage.status),
                                fontWeight: 'bold',
                                marginLeft: '8px',
                                
                              }}
                            >
                              {stage.status.toUpperCase()}
                            </span>
                          </div>
                          <div  className="applicant-subsection-text">
                            {stage.comments && <p>{stage.comments}</p>}
                          </div>
                          <small  className="applicant-subsection-heading" style={{textAlign:'right',fontSize:'12px',margin:'0px'}}>{formatDate(stage.updated_at)}</small>

                        </div>
                      ))}
                    </div>

                    
                  </div>
                  <div style={{display:'flex',gap:"20px"}}>
                      <button className="create-job-general-button"  onClick={() => openCommentsModal('passed', applicant._id)}>
                        Pass
                      </button>
                      <button className="create-job-general-button1" onClick={() => openCommentsModal('failed', applicant._id)}>
                        Reject
                      </button>

                      {applicant.resume && (
                        <a
                          href={applicant.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      )}
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {applicants.length === 0 && (
          <div>
            <p>No applicants at this stage yet.</p>
          </div>
        )}
        {totalPages > 1 && (
          <div className="pagination-application-containe" style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button
            className="pagination-application-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
            className="pagination-application-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* Comments Modal */}
      {showCommentsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%'
            }}
          >
            <h3>
              {actionType === 'passed' ? 'Pass' : 'Reject'}
              {targetApplicant ? ' Applicant' : ` ${selectedApplicants.length} Applicants`}
            </h3>

            <div>
              <label>Comments (Optional)</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add comments about this decision..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div>
              <button
                onClick={closeCommentsModal}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={targetApplicant ? handleSingleApplicantAction : handleBulkAction}
                disabled={actionLoading}
                style={{
                  backgroundColor: actionType === 'passed' ? '#28a745' : '#dc3545',
                  color: 'white',
                  marginLeft: '8px'
                }}
              >
                {actionLoading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantManagement;