import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.scss';

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likes?: number;
}

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const { id: postId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  
  useEffect(() => {
    console.log("postId",postId)
    if (postId) {
      fetchPost();
    } else {
      setError('No post ID provided');
      setLoading(false);
    }
  }, [postId]);

  const fetchPost = async () => {
    if (!postId) return;
    
    try {
      setLoading(true);
      setError('');
      console.log("postId",postId)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Post not found');
        }
        throw new Error('Failed to load post');
      }
      
      const data = await response.json();
      setPost(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleLike = async () => {
    if (!post || isLiking) return;
    
    try {
      setIsLiking(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post.id}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setPost(prev => prev ? { 
          ...prev, 
          likes: (prev.likes || 0) + 1 
        } : null);
      }
    } catch (err) {
      console.error('Error liking post:', err);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatContent = (content: string) => {
    // Simple line break formatting
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-detail-container">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleBack} className="back-btn">
            ← Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <button onClick={handleBack} className="back-button">
        ← Back to Posts
      </button>
      
      <article className="post-article">
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <div className="dates">
              <p className="created-date">
                <strong>Created:</strong> {formatDate(post.createdAt)}
              </p>
              {post.updatedAt !== post.createdAt && (
                <p className="updated-date">
                  <strong>Updated:</strong> {formatDate(post.updatedAt)}
                </p>
              )}
            </div>
            
            <div className="post-actions">
              <button 
                onClick={handleLike}
                className={`like-button ${isLiking ? 'liking' : ''}`}
                disabled={isLiking}
              >
                {isLiking ? '...' : '❤️'} {post.likes || 0}
              </button>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="tags-section">
              <span className="tags-label">Tags:</span>
              <div className="tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </header>

        <div className="post-content">
          <div className="content-text">
            {formatContent(post.content)}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;