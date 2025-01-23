import React, { useState, useEffect } from 'react';
import './Community.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import post1 from './components/Images/post1.jpeg';
import post2 from './components/Images/post2.jpeg';
import post3 from './components/Images/post3.jpeg';
import post4 from './components/Images/post4.jpeg';
import post5 from './components/Images/post5.jpeg';
import post6 from './components/Images/post6.jpeg';
import UserNavbar from './components/usernavbar';

const Posts = () => {
  const [samplePosts, setSamplePosts] = useState([]);

  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchPosts = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_community_api, {
          method: process.env.REACT_APP_community_method,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setSamplePosts(data.data); // Assuming data has a 'posts' field
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    // Call the function
    fetchPosts();

    // Return a cleanup function if necessary (not required here)
    return () => {
      // Cleanup logic (if necessary)
    };
  }, []);

  // Using the samplePosts array for now
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulating the fetching of posts by using static data
    setPosts(samplePosts);
  }, [samplePosts]); // Update when samplePosts change

  return (
    <div className="user-pages">
      <UserNavbar />

      <div className="posts-container">
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="post-card" key={post._id}>
                
                <div className="post-content">
                  <h2 id="i288">{post.title}</h2>
                  <p id="i289"> {post.description}</p>
                  <div className="post-info">
                    <span>Date: 12/09/2024</span> {/* You can replace with real date */}
                    <div className="post-actions">
                      <button className="like-button">
                        <i className="fa fa-thumbs-up"></i> {post.like}
                      </button>
                      <button className="comment-button">
                        <i className="fa fa-comments"></i> {post.comment.length}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="buffer">
              <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
