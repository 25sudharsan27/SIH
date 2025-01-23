import React, { useState } from 'react';
import './CreatePost.css';
import { Link } from 'react-router-dom';
import UserNavbar from './components/usernavbar';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // This will prevent the default form submission behavior
    try {
      const response = await fetch(process.env.REACT_APP_addpost_api, {
        method: process.env.REACT_APP_addpost_method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // If session/cookie-based authentication is used
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Post created successfully");
        // console.log('Post created successfully:', result.data);
        window.location.reload(); // Reload the page after successful submission
      } else {
        alert("Error occurred while creating post");
        console.error('Error creating post:', result.message);
      }
    } catch (err) {
      console.error('Error occurred during form submission:', err);
    }
  };

  return (
    <div  className="user-pages">
      <UserNavbar/>
      <div className="post-page-container">
        <div className="post-form-container">
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-section oneLine">
              <label className='specify-widthh'>Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="10"
                placeholder="Enter post description"
              />
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Image URL (optional)</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL (if any)"
              />
            </div>

            <div className="form-section btn">
              <button type="submit" className="create-btn">Create Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
