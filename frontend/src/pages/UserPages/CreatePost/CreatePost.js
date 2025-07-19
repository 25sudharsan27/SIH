import React, { useState } from 'react';
import './CreatePost.css';
import UserNavbar from '../../../components/UserNavbar/usernavbar';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(process.env.REACT_APP_addpost_api, {
        method: process.env.REACT_APP_addpost_method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          image: formData.image.trim() || null
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert("Post created successfully");
        setFormData({
          title: '',
          description: '',
          image: ''
        });
        // Optional: redirect to posts page instead of reload
        // window.location.href = '/community/posts';
        window.location.reload();
      } else {
        alert(result.message || "Error occurred while creating post");
        console.error('Error creating post:', result.message);
      }
    } catch (err) {
      console.error('Error occurred during form submission:', err);
      alert("Network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      image: ''
    });
    setErrors({});
  };

  return (
    <div className="user-pages">
      <UserNavbar />
      
      <div className="post-page-container">
        <div className="post-form-container">
          <h2 className="form-title">Create New Post</h2>
          
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-section oneLine">
              <label className='specify-widthh'>Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                className={errors.title ? 'error' : ''}
                maxLength={100}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="8"
                placeholder="Write your post description here..."
                className={errors.description ? 'error' : ''}
                maxLength={2000}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
              <div className="character-count">
                {formData.description.length}/2000 characters
              </div>
            </div>

            <div className="form-section oneLine">
              <label className='specify-widthh'>Image URL (optional)</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={errors.image ? 'error' : ''}
              />
              {errors.image && <span className="error-message">{errors.image}</span>}
              {formData.image && !errors.image && (
                <div className="image-preview">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      setErrors(prev => ({
                        ...prev,
                        image: 'Invalid image URL'
                      }));
                    }}
                    onLoad={() => {
                      if (errors.image === 'Invalid image URL') {
                        setErrors(prev => ({
                          ...prev,
                          image: ''
                        }));
                      }
                    }}
                  />
                </div>
              )}
            </div>

            <div className="form-section btn">
              <button 
                type="button" 
                className="reset-btn"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset
              </button>
              <button 
                type="submit" 
                className="create-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa fa-spinner fa-spin"></i> Creating...
                  </>
                ) : (
                  'Create Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;