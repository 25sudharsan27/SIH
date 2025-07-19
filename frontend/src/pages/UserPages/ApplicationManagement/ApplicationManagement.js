import React, { useState, useEffect } from 'react';
import './ApplicationManagement.css';
import {useNavigate} from 'react-router-dom';

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('applied_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countsData, setCountsData] = useState({ 'Applied': 0, 'In Progress': 0, 'Selected': 0, 'Rejected': 0 });
  
  const limit = 5;
  const fetchcounts = async()=>{
    try {
      const response = await fetch(`${process.env.REACT_APP_getcountofapplication_api}`, {
        credentials: 'include'
      });
      const result = await response.json();
      if (result.success) {
        setCountsData({
          'Applied': result.data.applied || 0,
          'In Progress': result.data.in_progress || 0,
          'Selected': result.data.selected || 0,
          'Rejected': result.data.rejected || 0
        });
      } else {
        setError('Failed to fetch application count');
      }
    } catch (error) {
      console.error('Error fetching application count:', error);
      setError('Error fetching application count');
    }
  }
  useEffect(()=>{
    fetchcounts();
  },[])

  useEffect(() => {
    fetchApplications();
  }, [filter, sortBy, sortOrder, page]);

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        filter,
        sortBy,
        sortOrder,
        page,
        limit
      });

      const response = await fetch(`${process.env.REACT_APP_getmyapplications_api}?${params}`, {
        credentials: 'include'
      });
      const result = await response.json();

      if (result.success) {
        setApplications(result.data);
        setTotalPages(result.totalPages);
      } else {
        setError('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Error fetching applications');
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

  const getCurrentStageInfo = (application) => {
    const job = application.job_id;
    const currentStage = application.current_stage;

    if (job && job.application_stages && job.application_stages[currentStage]) {
      return job.application_stages[currentStage];
    }

    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div>Loading your applications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="application-management-container">
      <div className="website-header-title">
        <h1>My Applications</h1>
        <p>Track all your job applications in one place</p>
      </div>
      <div className="status-counts-container">
        {Object.entries(countsData).map(([status, count]) => (
          <div className="status-counts" key={status} style={{ backgroundColor: getStatusColor(status.toLowerCase()) }}>
            <h1>{status}</h1> 
            <p1>{count}</p1>
          </div>
        ))}
      </div>

      <div className="application-filter-container">
        <div className="application-filter">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="applied">Applied</option>
            <option value="in_progress">In Progress</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="application-filter">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="applied_at">Application Date</option>
            <option value="last_updated">Last Updated</option>
            <option value="job_title">Job Title</option>
            <option value="company">Company</option>
          </select>
        </div>
        <div className="application-filter">
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className='application-cards-container'>
        {applications.length === 0 ? (
          <p>No applications found</p>
        ) : (
          applications.map((application, index) => {
            const job = application.job_id;
            const currentStageInfo = getCurrentStageInfo(application);

            return (
              <div className="application-card" key={application._id || index}>
                <div className="application-header">
                  <div className="application-company">
                    <h3>{job?.title}</h3>
                    <p>{job?.companyname}</p>
                  </div>
                  <p3 style={{backgroundColor:(getStatusColor(application.application_status)),padding:'10px',color:'white',borderRadius:'12px'}} > {getStatusText(application.application_status)}</p3>
                </div>
                <h4 style={{marginTop:'12px'}} className="application-card-head-text"><b>Current State :</b> {application?.job_id?.application_stages[application.current_stage].stage_name}</h4>

                <p5 style={{maringTop:'10px'}}  className="application-card-gen-text" >{application?.job_id?.application_stages.map((st, index) => {
                  return ` ${st.stage_name} |`;
                })}</p5>
                <div className="application-timestamps">
                  <p className="application-card-gen-text"><b>Applied:</b> {formatDate(application.applied_at)}</p>
                  <p className="application-card-gen-text"><b>Last Updated:</b> {formatDate(application.last_updated)}</p>
                </div>
                <div className="application-card-description">
                  <h4  className="application-card-head-text"><b>Job Details</b></h4>
                  <div className="application-card-footer">
                    <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                      <p3 className="application-card-gen-text"><b>Salary :</b> {job?.stipend}</p3>
                      <p3 className="application-card-gen-text"><b>Work Mode :</b> {job?.workMode}</p3>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                      <p3 className="application-card-gen-text"><b>Location :</b> {job?.city},{job?.state},{job?.country}</p3>
                      <p3 className="application-card-gen-text"><b>Job Type :</b> {job?.experienceLevel}</p3>
                    </div>
                  </div>
                </div>
                <button className="application-card-button" onClick={() => {
                  navigate(`../../user/myapplicationstatus/${job._id}`);
                }}>
                  View More
                </button>

              </div>
            );
          })
        )}
      </div>

      <div className="pagination-application-container">
        <button className="pagination-application-btn" disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button  className="pagination-application-btn" disabled={page >= totalPages} onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default MyApplications;
