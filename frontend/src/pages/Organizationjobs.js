import React, { useState } from 'react';
import './CreateJob.css';
import OrganizationNavbar from './components/organizationnavbar';
import {BrowserRouter as Router, Route, BrowserRouter, Routes} from 'react-router-dom';
import JobForm from './CreateJob.js';
import PostedJobs from './PostedJobs.js';
import ClosedJobs from './ClosedJobs.js';
import Applicants from './Applicants.js';

const Organization = () =>{
    return(
        <div>
            <OrganizationNavbar/>

            <Routes>
                <Route path="/createjob" element={<JobForm/>}/>
                <Route path="" element={<PostedJobs/>}/>
                <Route path="/closedjobs" element={<ClosedJobs/>}/>
                <Route path="/open" element={<Applicants/>}/>
                {/* <Route path="/organization/postedjobs" component={PostedJobs}/> */}
                {/* <Route path="/organization/closedjobs" component={ClosedJobs}/> */}
            </ Routes>
        
        </div>
    )

}

export default Organization;