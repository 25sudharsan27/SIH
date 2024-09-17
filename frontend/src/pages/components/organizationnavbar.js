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

    let sidebar = false;
    function openSidebar(){
        if(!sidebar){
            document.querySelector('.dropdown-content').style.display = 'block';
        }
        else{
            document.querySelector('.dropdown-content').style.display = 'none';
        }
        sidebar = !sidebar;
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
                        onClick={openSidebar}
                    />
                    <div className="dropdown-content">
                        <div className="Profdrop" onClick={openSidebar}>
                            <img 
                                src="Images/user-icon-svgrepo-com (1).svg" 
                                className="profa" 
                                alt="logo" 
                            />
                            <Link to="profile">Profile</Link>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src="Images/settings-2-svgrepo-com.svg" 
                                className="profa" 
                                alt="logo" 
                            />
                            <Link to="#">Settings</Link>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src="Images/log-out-1-svgrepo-com.svg" 
                                className="profa" 
                                alt="logo" 
                            />
                            <Link to="../../">Logout</Link>
                        </div> 
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default OrganizationNavbar;
