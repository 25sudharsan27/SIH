import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Optional
import './usernavbar.css';
import User from '../UserJobs';
import { Link } from 'react-router-dom';

import prof from './Images/user-icon-svgrepo-com (1).svg';
import myjob from './Images/cube-svgrepo-com.svg';
import setting from './Images/settings-2-svgrepo-com.svg';
import logout from './Images/log-out-1-svgrepo-com.svg';
import profile from './Images/profile.svg';
import mentorship from './Images/mentorship.svg';


// Function to clear specific cookies
const clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

// Function to clear all cookies
const clearAllCookies = () => {
    document.cookie.split(';').forEach((c) => {
        const cookie = c.trim();
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    });
};



const UserNavbar = () => {
    const [isDropdownVisible, setDropdownVisible] = React.useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        // Clear specific cookies
        clearCookie('token'); // Replace with your actual cookie names

        // Or clear all cookies
        clearAllCookies();

        // Optionally, you might want to redirect or reload the page
        window.location.reload(); // Reload the page to clear state and redirect to login
        // Or use history.push if you're using react-router:
        // history.push('/login');
    };

    const [nav,SetNav] = useState("");

    useEffect(()=>{
        if(nav !== ""){
            document.querySelectorAll('.navbar-item').forEach(a => a.classList.remove('highlight'));
            document.getElementById(nav).classList.add('highlight');
        }
    },[nav]);

    function handleSetNav(m){
        SetNav(m);
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/user/viewjobs" className="navbar-item" onClick={e => handleSetNav("jobs")} id="jobs">Jobs</Link>
                <Link to="interview" className="navbar-item" onClick={e => handleSetNav("interview")} id="interview">Interview Prep</Link>
                <Link to="/user/courses" className="navbar-item" onClick={e => handleSetNav("message")} id="message">Courses</Link>
                <Link to="/posts" className="navbar-item" onClick={e => handleSetNav("community")} id="community">Community</Link>
                <Link to="/user/resumebuilder" className="navbar-item" onClick={e => handleSetNav("buildResume")} id="buildResume">Build Resume</Link>
            </div>
            <div className="navbar-right">
                <div 
                    className={`profile-dropdown ${isDropdownVisible ? 'active' : ''}`}
                >
                    <img 
                        src={profile}
                        alt="Profile" 
                        className="profile-logo" 
                        onClick={toggleDropdown} 
                    />
                    <div className="dropdown-content">
                        <div className="Profdrop">
                            <img 
                                src={prof} 
                                className="profa" 
                                alt="Profile" 
                            />
                            <a href="/user/profile">Profile</a>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src={myjob}
                                className="profa" 
                                alt="My Jobs" 
                            />
                            <a href="#">My Jobs</a>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src={mentorship}
                                className="profa" 
                                alt="My Jobs" 
                            />
                            <a href="/mentorship">Mentorship</a>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src={setting}
                                className="profa" 
                                alt="Settings" 
                            />
                            <a href="#">Settings</a>
                        </div>
                        <div className="Profdrop" onClick={handleLogout}>
                            <img 
                                src={logout} 
                                className="profa" 
                                alt="Logout" 
                            />
                            <a href="../../">Logout</a>
                        </div> 
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
