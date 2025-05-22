import React, { useEffect,useState } from 'react';
import '../../OrganizationPages/CreateJob/CreateJob.css';
import OrganizationNavbar from '../../../components/OrganizationNavbar/organizationnavbar.js';
import {BrowserRouter as Router, Route, BrowserRouter, Routes} from 'react-router-dom';
import ViewJobs from '../ViewJobs/ViewJobs.js';
import ViewJob from '../ViewJob/ViewJob.js';
import Interview from '../Interview/Interview.js';

import UserNavbar from '../../../components/UserNavbar/usernavbar.js';
import { setUserDetails } from '../../../store/userSlice.js';
import { useDispatch } from 'react-redux';
import Context from '../../../context/index.js';
import ProfilePage from '../ProfilePage/ProfilePage.js';
import { useNavigate } from 'react-router-dom';

import ResumeBuilder from '../ResumeBuilder/ResumeBuilder.js';
import MyJob from '../MyJobs/MyJobs.js';

const User = () =>{
  const Navigate = useNavigate();
    const dispatch = useDispatch();
  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(process.env.REACT_APP_userdetails_api,
      {
        method : process.env.REACT_APP_userdetails_method,
        credentials : "include",
      }
    )
    const dataApi = await dataResponse.json();
    

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    if(!dataApi.success){
      Navigate('/');
      return {};
    }
    return dataApi;
  }
  
  useEffect(()=>{
    fetchUserDetails();
  })

    return(
      <Context.Provider value = {{fetchUserDetails}}>
        <div className="user-pages">
            <UserNavbar/>

            <Routes>
                <Route path="/viewjobs" element={<ViewJobs/>}/>
                <Route path="/job/:id" element={<ViewJob/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/interview" element={<Interview/>}/>
                <Route path="/resumebuilder" element={<ResumeBuilder/>}/>
                <Route path="/myjobs" element={<MyJob/>}/>
                
            </Routes>
        
        </div>
      </Context.Provider>
    )

}

export default User;