import React, { useState } from 'react';
import './CreateJob.css';
import OrganizationNavbar from './components/organizationnavbar';
import {BrowserRouter as Router, Route, BrowserRouter, Routes} from 'react-router-dom';
import ViewJobs from './ViewJobs.js';
import ViewJob from './ViewJob.js';
import UserNavbar from './components/usernavbar.js';
const User = () =>{
    return(
        <div>
            <UserNavbar/>

            <Routes>
                <Route path="/viewjobs" element={<ViewJobs/>}/>
                <Route path="/viewjobs/job" element={<ViewJob/>}/>

            </ Routes>
        
        </div>
    )

}

export default User;