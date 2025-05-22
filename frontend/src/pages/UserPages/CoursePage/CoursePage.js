import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For URL parameters
import { fetchCourseData } from '../../../utils/api';
import './CoursePage.css'; 
import UserNavbar from '../../../components/UserNavbar/usernavbar'; 

const CoursePage = () => {
  const { skill } = useParams(); 
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState(skill || ''); // Use skill from URL if available
  const [filteredEntry, setFilteredEntry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCourseData();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Error fetching course data');
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTitle(e.target.value);
  };

  const searchCourses = () => {
    if (data) {
      const entry = data.find(entry => RegExp(searchTitle, 'i').test(entry.Title));
      setFilteredEntry(entry);
    } else {
      setFilteredEntry(null);
    }
  };

  useEffect(() => {
    searchCourses();
  }, [searchTitle, data]);

  return (
    <div style={{marginTop:"100px"}}>
      <UserNavbar />
      <div className="search-container">
        <input
        id="course_search"
          style={{ width:'80%', fontSize: '1.2rem',marginTop:"20px",borderRadius:"8px",border:"1px solid #eee",boxShadow:"2px 1px 4px 1px #bbb",padding:"10px" }}
          
          placeholder="Search for a course..."
          value={searchTitle}
          onChange={handleSearch}
        />
      </div>

      {error && <p className="error">{error}</p>}
      {filteredEntry ? (
        <div className="course-info">
          <h1 style={{fontFamily:"Poppins"}}>{filteredEntry.Title}</h1>
          <p><strong>Tag:</strong> {filteredEntry.Tag}</p>

          <section>
            <h2>YouTube References</h2>
            {filteredEntry.YT1 && <p><a href={filteredEntry.YT1} target="_blank" rel="noopener noreferrer">YouTube 1</a></p>}
            {filteredEntry.YT2 && <p><a href={filteredEntry.YT2} target="_blank" rel="noopener noreferrer">YouTube 2</a></p>}
            {filteredEntry.YT3 && <p><a href={filteredEntry.YT3} target="_blank" rel="noopener noreferrer">YouTube 3</a></p>}
          </section>

          <section>
            <h2>Websites</h2>
            {filteredEntry.Website1 && <p><a href={filteredEntry.Website1} target="_blank" rel="noopener noreferrer">Website 1</a></p>}
            {filteredEntry.Website2 && <p><a href={filteredEntry.Website2} target="_blank" rel="noopener noreferrer">Website 2</a></p>}
            {filteredEntry.Website3 && <p><a href={filteredEntry.Website3} target="_blank" rel="noopener noreferrer">Website 3</a></p>}
          </section>

          <section>
            <h2>GitHub Pages</h2>
            {filteredEntry["Dedicated GH page1"] && <p><a href={filteredEntry["Dedicated GH page1"]} target="_blank" rel="noopener noreferrer">GitHub Page 1</a></p>}
            {filteredEntry["Dedicated GH page2"] && <p><a href={filteredEntry["Dedicated GH page2"]} target="_blank" rel="noopener noreferrer">GitHub Page 2</a></p>}
            {filteredEntry["Dedicated GH page3"] && <p><a href={filteredEntry["Dedicated GH page3"]} target="_blank" rel="noopener noreferrer">GitHub Page 3</a></p>}
          </section>

          <section>
            <h2>Courses</h2>
            {filteredEntry.Course1 && <p><a href={filteredEntry.Course1} target="_blank" rel="noopener noreferrer">Course 1</a></p>}
            {filteredEntry.Course2 && <p><a href={filteredEntry.Course2} target="_blank" rel="noopener noreferrer">Course 2</a></p>}
            {filteredEntry.Course3 && <p><a href={filteredEntry.Course3} target="_blank" rel="noopener noreferrer">Course 3</a></p>}
          </section>

          <section>
            <h2>Tips</h2>
            {filteredEntry.Tips1 && <p><a href={filteredEntry.Tips1} target="_blank" rel="noopener noreferrer">Tip 1</a></p>}
            {filteredEntry.Tips2 && <p><a href={filteredEntry.Tips2} target="_blank" rel="noopener noreferrer">Tip 2</a></p>}
          </section>

        </div>
      ) : (
        searchTitle && <p>No data found for title: {searchTitle}</p>
      )}
    </div>
  );
};

export default CoursePage;