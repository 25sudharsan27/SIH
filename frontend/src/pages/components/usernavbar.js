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
import userimg from './Images/user-icon-svgrepo-com (1).svg'
import { useRef } from 'react';

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
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [nav, setNav] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownTwoVisible, setDropdownTwoVisible] = useState(false);
    const dropdownTwoRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const toggleDropdownTwo = () => {
        setDropdownTwoVisible(!isDropdownTwoVisible);
        if (isDropdownVisible) setDropdownVisible(false); // Close first dropdown
    };

    const dropdownRef = useRef(null); // Create a ref for the dropdown

    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                dropdownTwoRef.current && !dropdownTwoRef.current.contains(event.target)
            ) {
                setDropdownVisible(false); // Close dropdown one if clicked outside
                setDropdownTwoVisible(false); // Close dropdown two if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        clearCookie('token'); // Replace with your actual cookie names
        clearAllCookies();
        window.location.reload(); // Reload the page to clear state and redirect to login
    };

    useEffect(() => {
        if (nav !== "") {
            document.querySelectorAll('.navbar-item').forEach(a => a.classList.remove('highlight'));
            document.getElementById(nav).classList.add('highlight');
        }
    }, [nav]);

    const handleSetNav = (m) => {
        setNav(m);
    };

    const toggleSudharsan = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div>
                    <Link to="/user/viewjobs" className="navbar-item" onClick={e => handleSetNav("jobs")} id="jobs">Jobs</Link>
                    <Link to="/user/interview" className="navbar-item" onClick={e => handleSetNav("interview")} id="interview">Interview Prep</Link>
                    <Link to="/user/courses" className="navbar-item" onClick={e => handleSetNav("message")} id="message">Courses</Link>
                    <Link to="/posts" className="navbar-item" onClick={e => handleSetNav("community")} id="community">Community</Link>
                    <Link to="/user/resumebuilder" className="navbar-item" onClick={e => handleSetNav("buildResume")} id="buildResume">Build Resume</Link>
                </div>
            </div>

            {!isOpen && (
                <button className="sudharsan-toggle" ref={dropdownTwoRef} onClick={toggleDropdownTwo}>
                    ☰
                </button>
            )}

            <div className={`sudharsan ${isDropdownTwoVisible ? 'open' : ''}`}>
                <div className="sudharsan-header">
                    <h2 className="sudharsan-title">Menu</h2>
                  
                </div>
                <nav className="sudharsan-nav">
                    <div className="sudharsan-links">
                        <Link to="/user/viewjobs" className="navbar-item" onClick={e => handleSetNav("jobs")} id="jobs">Jobs</Link>
                        <Link to="/user/interview" className="navbar-item" onClick={e => handleSetNav("interview")} id="interview">Interview Prep</Link>
                        <Link to="/user/courses" className="navbar-item" onClick={e => handleSetNav("message")} id="message">Courses</Link>
                        <Link to="/posts" className="navbar-item" onClick={e => handleSetNav("community")} id="community">Community</Link>
                        <Link to="/user/resumebuilder" className="navbar-item" onClick={e => handleSetNav("buildResume")} id="buildResume">Build Resume</Link>
                    </div>
                </nav>
            </div>

            <div className="navbar-right">
                <div className="navbar-righta">
                    <div className={`profile-dropdown`}>
                        <img 
                            src={userimg}
                            alt="Profile" 
                            className="profile-logo" 
                            onClick={toggleDropdown} 
                        />
                        <div  className={`dropdown-content ${isDropdownVisible ? 'active' : ''}`} ref={dropdownRef}>
                            <div className="Profdrop">
                                <img src={prof} className="profa" alt="Profile" />
                                <Link to="/user/profile">Profile</Link>
                            </div>
                            <div className="Profdrop">
                                <img src={myjob} className="profa" alt="My Jobs" />
                                <a href="/user/myjobs">My Jobs</a>
                            </div>
                            <div className="Profdrop">
                                <img src={mentorship} className="profa" alt="Mentorship" />
                                <Link to="/mentorship">Mentorship</Link>
                            </div>
                            <div className="Profdrop">
                                <img src={setting} className="profa" alt="Settings" />
                                <a href="#">Settings</a>
                            </div>
                            <div className="Profdrop">
                                <img src={setting} className="profa" alt="Create Post" />
                                <Link to="/addpost">Create Post</Link>
                            </div>
                            <div className="Profdrop" onClick={handleLogout}>
                                <img src={logout} className="profa" alt="Logout" />
                                <a href="../../">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
