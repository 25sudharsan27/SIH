import React, { useEffect,useState } from 'react';
import './CreateJob.css';
import {BrowserRouter as Router, Route, BrowserRouter, Routes} from 'react-router-dom';
import ViewJobs from './ViewJobs.js';
import ViewJob from './ViewJob.js';
import Interview from './Interview.js';

import UserNavbar from './components/usernavbar.js';
import OrganizationNavbar from './components/organizationnavbar';
import { setUserDetails } from '../store/userSlice.js';
import { useDispatch } from 'react-redux';
import Context from '../context/index.js';
import ProfilePage from './ProfilePage.js';
import { useNavigate } from 'react-router-dom';
import OrganizationProfile from './OrganizationProfile.js'
import CreateJob from './CreateJob.js';
import PostedJobs from './PostedJobs';
import ClosedJobs from './ClosedJobs.js';
import Applicants from './Applicants.js';

const Organization = () =>{
  const Navigate = useNavigate();
    const dispatch = useDispatch();
  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(process.env.REACT_APP_organization_details,
      {
        method : "POST",
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
            <OrganizationNavbar/>

            <Routes>
                <Route path="/profile" element={<OrganizationProfile/>}/>
                <Route path="/createjob" element ={<CreateJob/>}/>
                <Route path="/postedjobs" element={<PostedJobs/>}/>
                <Route path="/closedjobs" element={<ClosedJobs/>}/>
                <Route path="/applicants/:id" element={<Applicants/>}/>
            </Routes>
        
        </div>
      </Context.Provider>
    )

}

export default Organization;