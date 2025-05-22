import React, { useState, useEffect } from 'react';
import './Community.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import UserNavbar from '../../../components/UserNavbar/usernavbar';

const Posts = () => {
  const [samplePosts, setSamplePosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_community_api, {
          method: process.env.REACT_APP_community_method,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setSamplePosts(data.data); 
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();

    return () => {
     
    };
  }, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(samplePosts);
  }, [samplePosts]); 

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
                    <span>Date: 12/09/2024</span>
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
