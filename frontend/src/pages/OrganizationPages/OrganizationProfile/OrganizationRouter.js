import React, { useEffect } from 'react';
import '../CreateJob/CreateJob.css';
import {Route, Routes} from 'react-router-dom';

import OrganizationNavbar from '../../../components/OrganizationNavbar/organizationnavbar.js';
import { setUserDetails } from '../../../store/userSlice.js';
import { useDispatch } from 'react-redux';
import Context from '../../../context/index.js';
import { useNavigate } from 'react-router-dom';
import OrganizationProfile from './OrganizationProfile.js'
import CreateJob from '../CreateJob/CreateJob1.js';
import PostedJobs from '../PostedJobs/PostedJobs.js';
import ClosedJobs from '../ClosedJobs/ClosedJobs.js';
import Applicants from '../Applicants/Applicants.js';
import EditJob from '../EditJob/editjob.js';

const Organization = () =>{
  const Navigate = useNavigate();
    const dispatch = useDispatch();
  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(process.env.REACT_APP_organization_details,
      {
        method : process.env.REACT_APP_organization_details_method,
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
            <OrganizationNavbar/>

            <Routes>
                <Route path="/profile" element={<OrganizationProfile/>}/>
                <Route path="/createjob" element ={<CreateJob/>}/>
                <Route path="/postedjobs" element={<PostedJobs/>}/>
                <Route path="/closedjobs" element={<ClosedJobs/>}/>
                <Route path="/applicants/:jobId" element={<Applicants/>}/>
                <Route path="/edit/:jobId" element={<EditJob/>}/>
            </Routes>
        
        </div>
      </Context.Provider>
    )

}

export default Organization;