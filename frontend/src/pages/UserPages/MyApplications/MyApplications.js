import React, { useState, useEffect } from 'react';

const MyApplications = ({ userId }) => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('applied_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [userId]);

  useEffect(() => {
    filterAndSortApplications();
  }, [applications, filter, sortBy, sortOrder]);

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/jobs/my-applications/${userId}`);
      const result = await response.json();
      
      if (result.success) {
        setApplications(result.data);
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

  const filterAndSortApplications = () => {
    let filtered = applications;

    // Apply filter
    if (filter !== 'all') {
      filtered = applications.filter(app => app.application_status === filter);
    }

    // Apply sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'applied_at':
          aValue = new Date(a.applied_at);
          bValue = new Date(b.applied_at);
          break;
        case 'last_updated':
          aValue = new Date(a.last_updated);
          bValue = new Date(a.last_updated);
          break;
        case 'job_title':
          aValue = a.job_id?.title || '';
          bValue = b.job_id?.title || '';
          break;
        case 'company':
          aValue = a.job_id?.company || '';
          bValue = b.job_id?.company || '';
          break;
        default:
          aValue = a.applied_at;
          bValue = b.applied_at;
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    setFilteredApplications(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'blue';
      case 'in_progress': return 'yellow';
      case 'selected': return 'green';
      case 'rejected': return 'red';
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
    <div>
      <div>
        <h1>My Applications</h1>
        <p>Track all your job applications in one place</p>
      </div>

      {/* Stats */}
      <div>
        <div>
          <h3>Total Applications</h3>
          <p>{applications.length}</p>
        </div>
        <div>
          <h3>In Progress</h3>
          <p>{applications.filter(app => app.application_status === 'in_progress').length}</p>
        </div>
        <div>
          <h3>Selected</h3>
          <p>{applications.filter(app => app.application_status === 'selected').length}</p>
        </div>
        <div>
          <h3>Rejected</h3>
          <p>{applications.filter(app => app.application_status === 'rejected').length}</p>
        </div>
      </div>

      {/* Filters and Sort */}
      <div>
        <div>
          <label>Filter by Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Applications</option>
            <option value="applied">Applied</option>
            <option value="in_progress">In Progress</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="applied_at">Application Date</option>
            <option value="last_updated">Last Updated</option>
            <option value="job_title">Job Title</option>
            <option value="company">Company</option>
          </select>
          
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div>
        {filteredApplications.length === 0 ? (
          <div>
            <p>No applications found.</p>
            {filter !== 'all' && <p>Try changing the filter to see more applications.</p>}
          </div>
        ) : (
          <div>
            {filteredApplications.map((application, index) => {
              const job = application.job_id;
              const currentStageInfo = getCurrentStageInfo(application);

              
              return (
                <div key={application._id || index}>
                  <div>
                    <div>
                      <a href={"/myapplicationstatus/"+job}>view more</a>
                      <h3>{job?.title || 'Job Title Not Available'}</h3>
                      <p>{job?.company || 'Company Not Available'}</p>
                      <p>{job?.city}, {job?.state}, {job?.country}</p>
                      
                      <div>
                        <span data-color={getStatusColor(application.application_status)}>
                          {getStatusText(application.application_status)}
                        </span>
                        <span>{job?.workMode}</span>
                        <span>{job?.experienceLevel}</span>
                      </div>
                    </div>

                    <div>
                      <div>
                        <h4>Application Progress</h4>
                        <p>
                          <strong>Current Stage:</strong> {currentStageInfo?.stage_name || 'N/A'}
                        </p>
                        <p>
                          <strong>Stage Description:</strong> {currentStageInfo?.stage_description || 'N/A'}
                        </p>
                        <p>
                          <strong>Applied:</strong> {formatDate(application.applied_at)}
                        </p>
                        <p>
                          <strong>Last Updated:</strong> {formatDate(application.last_updated)}
                        </p>
                      </div>

                      <div>
                        <h4>Job Details</h4>
                        {job?.stipend && (
                          <p><strong>Salary:</strong> ${job.stipend}</p>
                        )}
                        <p><strong>Work Mode:</strong> {job?.workMode}</p>
                        <p><strong>Experience Level:</strong> {job?.experienceLevel}</p>
                      </div>
                    </div>

                    <div>
                      <a href={`/myapplicationstatus/${job?._id}`}>
                        View Detailed Status
                      </a>
                      
                      {job?.link && (
                        <a href={job.link} target="_blank" rel="noopener noreferrer">
                          View Job Post
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div>
                      <h4>Application Stages</h4>
                      <div>
                        {job?.application_stages?.map((stage, stageIndex) => {
                          const isCompleted = stageIndex < application.current_stage;
                          const isCurrent = stageIndex === application.current_stage;
                          const isRejected = application.application_status === 'rejected' && isCurrent;
                          
                          return (
                            <div key={stageIndex}>
                              <div 
                                data-completed={isCompleted}
                                data-current={isCurrent}
                                data-rejected={isRejected}
                              >
                                {stageIndex + 1}
                              </div>
                              <div>
                                <h5>{stage.stage_name}</h5>
                                <p>{stage.stage_description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination could be added here if needed */}
    </div>
  );
};

export default MyApplications;