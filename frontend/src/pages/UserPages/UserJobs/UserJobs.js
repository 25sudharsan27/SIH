import React, { useEffect } from 'react';
import '../../OrganizationPages/CreateJob/CreateJob.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { setUserDetails } from '../../../store/userSlice.js';
import { useDispatch } from 'react-redux';
import Context from '../../../context/index.js';
import { useNavigate } from 'react-router-dom';

import UserNavbar from '../../../components/UserNavbar/usernavbar.js';
import ProfilePage from '../ProfilePage/ProfilePage.js';
import ResumeBuilder from '../ResumeBuilder/ResumeBuilder.js';
import MyJob from '../MyJobs/MyJobs.js';
import ViewJobs from '../ViewJobs/ViewJobs.js';
import ViewJob from '../ViewJob/ViewJob.js';
import Interview from '../Interview/Interview.js';
import ApplicationStatusTracker from '../MyApplicationStatus/MyApplicationStatus.js';
import MyApplications from '../ApplicationManagement/ApplicationManagement.js';


const User = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(process.env.REACT_APP_userdetails_api,
      {
        method: process.env.REACT_APP_userdetails_method,
        credentials: "include",
      }
    )
    const dataApi = await dataResponse.json();


    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
    if (!dataApi.success) {
      Navigate('/');
      return {};
    }
    return dataApi;
  }

  useEffect(() => {
    fetchUserDetails();
  })

  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <div className="user-pages">
        <UserNavbar />

        <Routes>
          <Route path="/viewjobs" element={<ViewJobs />} />
          <Route path="/job/:id" element={<ViewJob />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/resumebuilder" element={<ResumeBuilder />} />
          <Route path="/myapplicationstatus/:jobId" element={<ApplicationStatusTracker />} />
          <Route path="/myjobs" element={<MyApplications />} />
        </Routes>

      </div>
    </Context.Provider>
  )

}

export default User;