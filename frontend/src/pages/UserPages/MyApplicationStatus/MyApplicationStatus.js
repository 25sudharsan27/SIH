import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MyApplicationStatus.css';

const ApplicationStatusTracker = () => {
  const { jobId } = useParams();
  const userId = useSelector((state) => state.user._id);
  const [applicationData, setApplicationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchApplicationStatus();
  }, [jobId, userId]);

  const fetchApplicationStatus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_getuserapplication_status}/${jobId}`, {
        credentials: 'include'
      });
      const result = await response.json();

      if (result.success) {
        setApplicationData(result.data);
      } else {
        setError('Failed to fetch application status');
      }
    } catch (error) {
      console.error('Error fetching application status:', error);
      setError('Error fetching application status');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return '#3C5AA5';
      case 'in_progress': return '#C4A03B';
      case 'selected': return '#1F5351';
      case 'rejected': return '#C43B3B';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'applied': return 'Applied';
      case 'in_progress': return 'In Progress';
      case 'selected': return 'Selected';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  const getStageStatus = (stageIndex, currentStage, overallStatus) => {
    if (stageIndex < currentStage) {
      return 'completed';
    } else if (stageIndex === currentStage) {
      if (overallStatus === 'rejected') {
        return 'rejected';
      } else if (overallStatus === 'selected' && stageIndex === applicationData.job.application_stages.length - 1) {
        return 'selected';
      } else {
        return 'current';
      }
    } else {
      return 'pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStageFromHistory = (stageName) => {
    return applicationData.application.stage_history.find(
      stage => stage.stage_name === stageName
    );
  };

  if (isLoading) {
    return <div>Loading application status...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!applicationData) {
    return <div>Application not found</div>;
  }

  const { job, application } = applicationData;

  return (
    <div className="single-application-status-container">
      <h1>Application Status</h1>
      <div className="single-application-status-header">
        <h2><b>{job.title}</b> at <b>{job.company}</b></h2>
        <h3 style={{ padding: '6px 9px', color: "white", borderRadius: "10px", fontSize: "17px", fontWeight: "400", width: 'fit-content', height: 'fit-content', backgroundColor: (getStatusColor(application.overall_status)) }}>{getStatusText(application.overall_status)}</h3>
      </div>
      {/* Header */}
      <div className="single-application-content">

        <h3>Application Summary</h3>
        <>
          <p3><b>Applied On :</b> {formatDate(application.applied_at)}</p3>
          <p3><b>Current Stage : </b>{job?.application_stages[application?.current_stage-1]?.stage_name}</p3>
          <p3><b>Progress Status : </b>{(application?.current_stage ) + " out of " + job.application_stages.length}</p3>
        </>
        <h3>Application Progress</h3>


        {
          job.application_stages.map((stage, index) => {
            const stageStatus = getStageStatus(index, application.current_stage, application.overall_status);
            const stageHistory = getStageFromHistory(stage.stage_name);

            return (
              <div key={index} className="single-application-stage">
                <div className="single-application-stage-header">
                  <div className="single-application-stage-header-first">
                  <div style={{color :getStatusColor(stageStatus)}} className={`single-application-stage-status ${stageStatus}`}>
                    {stageStatus === 'completed' && '✓'}
                    {stageStatus === 'current' && '●'}
                    {stageStatus === 'rejected' && '✗'}
                    {stageStatus === 'selected' && '✓'}
                    {stageStatus === 'pending' && index + 1}
                  </div>
                  <h4>{stage.stage_name}</h4>
                  </div>
                  {stageStatus === 'current' && application.overall_status === 'in_progress' && (
                    <div className="single-application-current-status">In Progress</div>
                  )}

                  {stageStatus === 'pending' && (
                    <div className="single-application-pending-status">Pending</div>
                  )}
                  {stageStatus === 'rejected' && (
                    <div className="single-application-rejected-status">Rejected</div>
                  )}
                </div>
                <p>{stage.stage_description}</p>

                {stageHistory && (
                  <div className="single-application-stage-history">
                    <p3><strong>Status:</strong> {stageHistory.status}</p3><br/>
                    <p3><strong>Updated:</strong> {formatDate(stageHistory.updated_at)}</p3><br/>
                    {stageHistory.comments && <p3><strong>Comments:</strong> {stageHistory.comments}</p3>}
                  </div>
                )}


              </div>
            );
          })
        }
      </div>

      {/* Status Messages */}
      <div>
        {application.overall_status === 'applied' && (
          <div>
            <h4>What's Next?</h4>
            <p>Your application has been submitted successfully. The hiring team will review your application and move you to the next stage if you're selected.</p>
          </div>
        )}

        {application.overall_status === 'in_progress' && (
          <div>
            <h4>What's Next?</h4>
            <p>Your application is currently being reviewed at the {job.application_stages[application.current_stage]?.stage_name} stage. Please wait for updates from the hiring team.</p>
          </div>
        )}

        {application.overall_status === 'selected' && (
          <div>
            <h4>Congratulations!</h4>
            <p>You have been selected for this position. The hiring team will contact you soon with next steps.</p>
          </div>
        )}

        {application.overall_status === 'rejected' && (
          <div>
            <h4>Application Update</h4>
            <p>Unfortunately, your application was not selected for this position. Thank you for your interest and we encourage you to apply for other opportunities.</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{display:'flex',gap:"20px",marginTop:"20px"}}>
        <button className="single-application-action-btn" onClick={fetchApplicationStatus}>
          Refresh Status
        </button>
        <button className="single-application-action-btn" onClick={() => window.history.back()}>
          Back to Applications
        </button>
      </div>
    </div>
  );
};

export default ApplicationStatusTracker;