import React, { useEffect, useState } from 'react';
import './usernavbar.css';
import { Link } from 'react-router-dom';


const OrganizationNavbar = () => {

    const [orgNav,SetorgNav] = useState("");

    useEffect(()=>{
    if(orgNav !== ""){
        document.querySelectorAll('.navbar-item').forEach(e => e.classList.remove('highlight'));
        document.getElementById(orgNav).classList.add('highlight');
    }
    },[orgNav]);

    function handleSetOrgNav(m){
        SetorgNav(m);
    }
    return (
        <nav className="navbar">
            <div className="navbar-left">

                <Link to="/organization/createjob" className="navbar-item" id="jobs" onClick={()=> handleSetOrgNav("jobs")}>Jobs</Link>
                <Link to="#" className="navbar-item" id="message" onClick={()=> handleSetOrgNav("message")}>Message</Link>
                <Link to="#" className="navbar-item" id="commmunity" onClick={()=> handleSetOrgNav("commmunity")}>Community</Link>

               

            </div>
            <div className="navbar-right">
                <div className="profile-dropdown">
                    <img 
                        src="Images/user-icon-svgrepo-com (1).svg" 
                        alt="Logo" 
                        className="profile-logo" 
                    />
                    <div className="dropdown-content">
                        <div className="Profdrop">
                            <img 
                                src="Images/user-icon-svgrepo-com (1).svg" 
                                className="profa" 
                                alt="logo" 
                            />
                            <a href="#">Profile</a>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src="Images/settings-2-svgrepo-com.svg" 
                                className="profa" 
                                alt="logo" 
                            />
                            <a href="#">Settings</a>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src="Images/log-out-1-svgrepo-com.svg" 
                                className="profa" 
                                alt="logo" 
                            />
                            <a href="#">Logout</a>
                        </div> 
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default OrganizationNavbar;
