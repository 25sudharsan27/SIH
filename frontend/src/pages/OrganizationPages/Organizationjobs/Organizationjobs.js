import React from 'react';
import './CreateJob.css';
import OrganizationNavbar from '../../../components/organizationnavbar.js';
import { Route, Routes} from 'react-router-dom';
import JobForm from '../CreateJob/CreateJob.js';
import PostedJobs from '../PostedJobs/PostedJobs.js';
import ClosedJobs from '../ClosedJobs/ClosedJobs.js';
import Applicants from '../Applicants/Applicants.js';

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