import React, { useEffect, useState } from 'react';
import './organizationnavbar.css';
import { Link } from 'react-router-dom';
import userimg from '../../images/user-icon-svgrepo-com (1).svg'
import logoutimg from '../../images/log-out-1-svgrepo-com.svg'
import settingimg from '../../images/settings-2-svgrepo-com.svg'
import profileimg from '../../images/user-icon-svgrepo-com (1).svg';
import { useRef } from 'react';

const OrganizationNavbar = () => {

    const [orgNav,SetorgNav] = useState("");
    const [nav, setNav] = useState("");
    const [isOpen, setIsOpen] = useState(false);
        const [isDropdownVisible, setDropdownVisible] = useState(false);
    
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const dropdownRef = useRef(null); // Create a ref for the dropdown

    
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
    const handleSetNav = (m) => {
        setNav(m);
    };

    const toggleSudharsan = () => {
        setIsOpen(!isOpen);
    };

      useEffect(() => {
            const handleClickOutside = (event) => {
                if (
                    dropdownRef.current && !dropdownRef.current.contains(event.target) 
                ) {
                    setDropdownVisible(false); // Close dropdown one if clicked outside
                }
            };
    
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);
    

    return (
        <nav className="navbar">
            <div className="navbar-left">

                <Link to="/organization/createjob" className="navbar-item" id="jobs" onClick={()=> handleSetOrgNav("jobs")}>Jobs</Link>
                <Link to="#" className="navbar-item" id="message" onClick={()=> handleSetOrgNav("message")}>Message</Link>
                <Link to="#" className="navbar-item" id="commmunity" onClick={()=> handleSetOrgNav("commmunity")}>Community</Link>
                
            </div>
            {!isOpen && (
                <button className="sudharsan-toggle" onClick={toggleSudharsan}>
                    ☰
                </button>
            )}

            <div className={`sudharsan ${isOpen ? 'open' : ''}`}>
                <div className="sudharsan-header">
                    <h2 className="sudharsan-title">Menu</h2>
                    <button className="sudharsan-close" onClick={toggleSudharsan}>×</button>
                </div>
                <nav className="sudharsan-nav">
                    <div className="sudharsan-links">
                    <Link to="/organization/createjob" className="navbar-item" id="jobs" onClick={()=> handleSetOrgNav("jobs")}>Jobs</Link>
                <Link to="#" className="navbar-item" id="message" onClick={()=> handleSetOrgNav("message")}>Message</Link>
                <Link to="#" className="navbar-item" id="commmunity" onClick={()=> handleSetOrgNav("commmunity")}>Community</Link>
                
                    </div>
                </nav>
            </div>

            <div className="navbar-right">
                <div className="navbar-righta">
                <div className="profile-dropdown">
                    <img 
                        src={userimg}
                        alt="Logo" 
                        className="profile-logo" 
                        onClick={toggleDropdown}
                    />
                    <div  className={`dropdown-content ${isDropdownVisible ? 'active' : ''}`}  ref={dropdownRef}>
                        <div className="Profdrop" onClick={openSidebar}>
                            <img 
                                src={userimg}
                                className="profa" 
                                alt="logo" 
                            />
                            <Link to="profile">Profile</Link>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src={settingimg}
                                className="profa" 
                                alt="logo" 
                            />
                            <Link to="#">Settings</Link>
                        </div>
                        <div className="Profdrop">
                            <img 
                                src={logoutimg}
                                className="profa" 
                                alt="logo" 
                            />
                            <Link to="../../">Logout</Link>
                        </div> 
                    </div>
                </div>
                </div>
            </div>
        </nav>
    );
}

export default OrganizationNavbar;
