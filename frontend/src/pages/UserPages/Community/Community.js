import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Community.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import UserNavbar from '../../../components/UserNavbar/usernavbar';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [replyingTo, setReplyingTo] = useState({});
  const [showComments, setShowComments] = useState({});
  
  const observer = useRef();
  const lastPostRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  const fetchPosts = async (pageNum = 1) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_community_api}?page=${pageNum}&limit=5`, {
        method: process.env.REACT_APP_community_method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.data || [];
    } catch (err) {
      console.error("Error fetching posts:", err);
      return [];
    }
  };

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const newPosts = await fetchPosts(page + 1);
    
    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    const initializePosts = async () => {
      setLoading(true);
      const initialPosts = await fetchPosts(1);
      setPosts(initialPosts);
      setLoading(false);
    };
    
    initializePosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_like_api}/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      const result = await response.json();
      if (result.success) {
        setPosts(prev => prev.map(post => 
          post._id === postId 
            ? { ...post, like: result.data.likes  }
            : post
        ));
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (postId, commentText, parentCommentId = null) => {
    if (!commentText) return;
    if (commentText.trim() === '') {
      
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_comment_api}/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          text: commentText,
          parentCommentId: parentCommentId
        }),
      });
      
      const result = await response.json();
     
      if (result.success) {
        setPosts((prev) => {
          for (let i = 0; i < prev.length; i++) {
            if (prev[i]._id === postId) {
              const findCommentById = (comments, id) => {
                for (const comment of comments) {
                  if (comment._id.toString() === id.toString()) return comment;
                  if (comment.replies && comment.replies.length > 0) {
                    const result = findCommentById(comment.replies, id);
                    if (result) return result;
                  }
                }
                return null;
              };
              const parentComment = parentCommentId ? findCommentById(prev[i].comment, parentCommentId) : null;
              if (parentComment) {
                parentComment.replies = [...(parentComment.replies || []), result.data];
              } else {
                prev[i].comment = [...(prev[i].comment || []), result.data];
              }
            }
          }
          return prev;
        });
        setCommentText(prev => ({ ...prev, [postId]: '' }));
        setReplyingTo(prev => ({ ...prev, [postId]: null }));
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleReplies = (commentId) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '12/09/2024';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const renderNestedComments = (comments, postId, level = 0) => {
    if (!comments || comments.length === 0) return null;
    
    return comments.map((comment, index) => (
      <div key={comment._id || index} className={`comment-item level-${level}`}>
        <div className="comment-content">
          <div className="comment-header">
            <span className="comment-author">User {comment.user_id?.email}</span>
            <span className="comment-date">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="comment-text">{comment.text}</p>
          
          <div className="comment-actions">
            <button 
              className="reply-btn"
              onClick={() => setReplyingTo(prev => ({
                ...prev,
                [postId]: comment._id
              }))}
            >
              <i className="fa fa-reply"></i> Reply
            </button>
            {comment.replies && comment.replies.length > 0 && (
              <button 
                className="toggle-replies-btn"
                onClick={() => toggleReplies(comment._id)}
              >
                <i className={`fa ${expandedComments[comment._id] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                {expandedComments[comment._id] ? 'Hide' : 'Show'} {comment.replies.length} replies
              </button>
            )}
          </div>
          
          {replyingTo[postId] === comment._id && (
            <div className="reply-form">
              <input
                type="text"
                placeholder="Write a reply..."
                value={commentText[`${postId}_${comment._id}`] || ''}
                onChange={(e) => setCommentText(prev => ({
                  ...prev,
                  [`${postId}_${comment._id}`]: e.target.value
                }))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(postId, commentText[`${postId}_${comment._id}`], comment._id);
                  }
                }}
              />
              <button 
                onClick={() => handleComment(postId, commentText[`${postId}_${comment._id}`], comment._id)}
                className="reply-submit-btn"
              >
                Reply
              </button>
            </div>
          )}
        </div>
        
        {expandedComments[comment._id] && comment.replies && 
          renderNestedComments(comment.replies, postId, level + 1)
        }
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="user-pages">
        <UserNavbar />
        <div className="posts-container">
          <div className="buffer">
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-pages">
      <UserNavbar />
      
      <div className="posts-container">
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div 
                className="post-card" 
                key={post._id}
                ref={index === posts.length - 1 ? lastPostRef : null}
              >
                <div className="post-content">
                  <h2 id="i288">{post.title}</h2>
                  <p id="i289">{post.description}</p>
                  
                  <div className="post-info">
                    <span>Date: {formatDate(post.createdAt)}</span>
                    <div className="post-actions">
                      <button 
                        className="like-button"
                        onClick={() => handleLike(post._id)}
                      >
                        <img src="https://res.cloudinary.com/duyuxtpau/image/upload/v1752748521/xxhurz9qnrnmp6noojxf.webp" alt="Like" /><br/>
                        {post.like || 0}
                      </button>
                      <button 
                        className="like-button"
                        onClick={() => toggleComments(post._id)}
                      >
                        <i className="fa fa-comments"></i><br/> {post.comment?.length || 0}
                      </button>
                    </div>
                  </div>

                  {showComments[post._id] && (
                    <div key={post.id} className="comments-section">
                      <div className="add-comment">
                        <input
                          className="reply-form"
                          type="text"
                          style={{borderRadius:'10px',fontSize:'15px',width:'100%'}}
                          placeholder="Write a comment..."
                          value={commentText[post._id] || ''}
                          onChange={(e) => setCommentText(prev => ({
                            ...prev,
                            [post._id]: e.target.value
                          }))}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleComment(post._id, commentText[post._id]);
                            }
                          }}
                        />
                        <button 
                          onClick={() => handleComment(post._id, commentText[post._id])}
                          className="reply-submit-btn"
                        >
                          Comment
                        </button>
                      </div>
                      
                      <div className="comments-list">
                        {renderNestedComments(post.comment, post._id)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">
              <p>No posts available</p>
            </div>
          )}
          
          {loadingMore && (
            <div className="loading-more">
              <div className="loading-spinner"></div>
              <p>Loading more posts...</p>
            </div>
          )}
          
          {!hasMore && posts.length > 0 && (
            <div className="end-of-posts">
              <p>You've reached the end of posts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;