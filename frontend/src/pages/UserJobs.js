import React, { useEffect,useState } from 'react';
import './CreateJob.css';
import OrganizationNavbar from './components/organizationnavbar';
import {BrowserRouter as Router, Route, BrowserRouter, Routes} from 'react-router-dom';
import ViewJobs from './ViewJobs.js';
import ViewJob from './ViewJob.js';
import Interview from './Interview.js';

import UserNavbar from './components/usernavbar.js';
import { setUserDetails } from '../store/userSlice.js';
import { useDispatch } from 'react-redux';
import Context from '../context/index.js';
import ProfilePage from './ProfilePage.js';
import { useNavigate } from 'react-router-dom';

import ResumeBuilder from './ResumeBuilder.js';
import MyJob from './MyJobs.js';

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
      // dispatch(setUserDetails(dataApi.data))
      dispatch(setUserDetails(dataApi.data))
    }
    if(!dataApi.success){
      // console.log("error : ",dataApi.message);
      Navigate('/');
      return {};
    }
    // console.log("data of user : ",dataApi);
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