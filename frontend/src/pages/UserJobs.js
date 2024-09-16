import React, { useState } from 'react';
import './CreateJob.css';
import OrganizationNavbar from './components/organizationnavbar';
import {BrowserRouter as Router, Route, BrowserRouter, Routes} from 'react-router-dom';
import ViewJobs from './ViewJobs.js';
const Organization = () =>{
    return(
        <div>
            <OrganizationNavbar/>

            <Routes>
                <Route path="/viewjobs" element={<ViewJobs/>}/>

            </ Routes>
        
        </div>
    )

}

export default Organization;