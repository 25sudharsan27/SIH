import React, { useEffect, useState, useRef } from 'react';
import './usernavbar.css';
import { Link } from 'react-router-dom';

import prof from '../../images/user-icon-svgrepo-com (1).svg';
import myjob from '../../images/cube-svgrepo-com.svg';
import setting from '../../images/settings-2-svgrepo-com.svg';
import logout from '../../images/log-out-1-svgrepo-com.svg';
import profile from '../../images/profile.svg';
import mentorship from '../../images/mentorship.svg';
import userimg from '../../images/user-icon-svgrepo-com (1).svg';

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
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
};

const UserNavbar = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [nav, setNav] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownTwoVisible, setDropdownTwoVisible] = useState(false);
    const dropdownTwoRef = useRef(null);
    const dropdownRef = useRef(null); // Create a ref for the dropdown

    // Toggles for dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(prevState => !prevState);
    };

    const toggleDropdownTwo = () => {
        setDropdownTwoVisible(prevState => !prevState);
        if (isDropdownVisible) setDropdownVisible(false); // Close first dropdown
    };

    // Close dropdowns if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                dropdownTwoRef.current && !dropdownTwoRef.current.contains(event.target)
            ) {
                setDropdownVisible(false); // Close dropdown one
                setDropdownTwoVisible(false); // Close dropdown two
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle user logout
    const handleLogout = () => {
        clearCookie('token');
        clearAllCookies();
        window.location.reload(); // Reload page to clear state and redirect to login
    };

    // Handle navbar highlighting on route change
    useEffect(() => {
        if (nav !== "") {
            document.querySelectorAll('.navbar-item').forEach(a => a.classList.remove('highlight'));
            document.getElementById(nav)?.classList.add('highlight');
        }
    }, [nav]);

    // Initial highlight based on URL path
    useEffect(() => {
        const currentNav = window.location.pathname.split("/").pop();
        if (currentNav) {
            document.querySelectorAll('.navbar-item').forEach(e => e.classList.remove('highlight'));
            document.getElementById(currentNav)?.classList.add('highlight');
        }
    }, []);

    const handleSetNav = (m) => {
        setNav(m);
    };

    const toggleSudharsan = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div>
                    <Link to="/user/viewjobs" className="navbar-item" onClick={() => handleSetNav("viewjobs")} id="viewjobs">Jobs</Link>
                    <Link to="/profiles" className="navbar-item" onClick={() => handleSetNav("profiles")} id="profiles">Profiles</Link>
                    <Link to="/user/interview" className="navbar-item" onClick={() => handleSetNav("interview")} id="interview">Interview Prep</Link>
                    <Link to="/user/courses" className="navbar-item" onClick={() => handleSetNav("courses")} id="courses">Courses</Link>
                    <Link to="/posts" className="navbar-item" onClick={() => handleSetNav("posts")} id="posts">Community</Link>
                    <Link to="/user/resumebuilder" className="navbar-item" onClick={() => handleSetNav("resumebuilder")} id="resumebuilder">Build Resume</Link>
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
                        <Link to="/user/viewjobs" className="navbar-item" onClick={() => handleSetNav("viewjobs")} id="viewjobs">Jobs</Link>
                        <Link to="/profiles" className="navbar-item" onClick={() => handleSetNav("profiles")} id="profiles">Profiles</Link>
                        <Link to="/user/interview" className="navbar-item" onClick={() => handleSetNav("interview")} id="interview">Interview Prep</Link>
                        <Link to="/user/courses" className="navbar-item" onClick={() => handleSetNav("courses")} id="courses">Courses</Link>
                        <Link to="/posts" className="navbar-item" onClick={() => handleSetNav("posts")} id="posts">Community</Link>
                        <Link to="/user/resumebuilder" className="navbar-item" onClick={() => handleSetNav("resumebuilder")} id="resumebuilder">Build Resume</Link>
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
                        <div className={`dropdown-content ${isDropdownVisible ? 'active' : ''}`} ref={dropdownRef}>
                            <div className="Profdrop">
                                <img src={prof} className="profa" alt="Profile" />
                                <Link to="/user/profile">Profile</Link>
                            </div>
                            <div className="Profdrop">
                                <img src={myjob} className="profa" alt="My Jobs" />
                                <Link to="/user/myjobs">My Jobs</Link>
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
                                <a href="/">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
