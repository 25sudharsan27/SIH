import React from 'react';
import './SearchBar.css';

function SearchBar({condition}) {
  return (
    <div className="search-bar">
      <div className="filters">
        <select className="dropdown">
          <option>Experience Level</option>
          <option>Internship</option>
          <option>Entry Level</option>
          <option>Mid Level</option>
          <option>Senior Level</option>
        </select>
        
        <select className="dropdown">
          <option>Location</option>
          <option>Bengaluru</option>
          <option>Pune</option>
          <option>Chennai</option>
          <option>Remote</option>
        </select>
        {condition && (
          <select className="dropdown">
            <option>Company</option>
            <option>CloudKnowledge</option>
            <option>Optical Arc</option>
            <option>Branch</option>
            <option>Other</option>
          </select>
        )}
      </div>
      <div className="search-field">
        <input type="text" placeholder="Search..." />
        <span className="search-icon">🔍</span>
      </div>
    </div>
  );
}

export default SearchBar;
