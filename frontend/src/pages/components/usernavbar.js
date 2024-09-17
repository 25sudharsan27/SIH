import React from 'react';
import Cookies from 'js-cookie'; // Optional
import './usernavbar.css';

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

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/user/viewjobs" className="navbar-item">Jobs</a>
                <a href="#" className="navbar-item">Interview Prep</a>
                <a href="#" className="navbar-item">Message</a>
                <a href="#" className="navbar-item">Community</a>
                <a href="#" className="navbar-item">Build Resume</a>
            </div>
            <div className="navbar-right">
                <div 
                    className={`profile-dropdown ${isDropdownVisible ? 'active' : ''}`}
                >
                    <img 
                        src="Images/user-icon-svgrepo-com (1).svg" 
                        alt="Profile" 
                        className="profile-logo" 
                        onClick={toggleDropdown} 
                    />
                    <div className="dropdown-content">
                        <div className="Profdrop">
                            <img 
                                src="Images/user-icon-svgrepo-com (1).svg" 
                                className="profa" 
                                alt="Profile" 
                            />
                            <a href="/user/profile">Profile</a>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src="Images/cube-svgrepo-com.svg" 
                                className="profa" 
                                alt="My Jobs" 
                            />
                            <a href="#">My Jobs</a>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src="Images/settings-2-svgrepo-com.svg" 
                                className="profa" 
                                alt="Settings" 
                            />
                            <a href="#">Settings</a>
                        </div>
                        <div className="Profdrop" onClick={handleLogout}>
                            <img 
                                src="Images/log-out-1-svgrepo-com.svg" 
                                className="profa" 
                                alt="Logout" 
                            />
                            <a href="#">Logout</a>
                        </div> 
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
