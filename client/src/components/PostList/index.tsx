import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likes?: number;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response:any = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log("fetchPosts",data.data.posts)
      setPosts(data.data.posts);
    } catch (err) {
      setError('Error loading posts');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response:any = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/tags`);
      // const response = await fetch('/api/posts/tags');
      if (response.ok) {
        const tags = await response.json();
        console.log("tags",tags.data)
        setAllTags(tags.data);
      }
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  // Filter posts based on search term and selected tag
  const filteredPosts = posts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);

    
    return matchesSearch && matchesTag;
  });

  const handlePostClick = (postId: string) => {
    console.log("handlePostClick",postId)
    navigate(`/post/${postId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTruncatedContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
  };

  if (loading) {
    return (
      <div className="post-list-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-list-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="post-list-container">
      <div className="header">
        <h1>Blog Posts</h1>
        <p>{filteredPosts.length} posts found</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="tag-filter">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="tag-select"
          >
            <option value="">All Tags</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {(searchTerm || selectedTag) && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        )}
      </div>

      <div className="posts-grid">
        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found matching your criteria.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div 
              key={post._id} 
              className="post-card"
              onClick={() => {
                console.log("post", post)
                return handlePostClick(post._id)
              }}
            >
              <div className="post-header">
                <h3 className="post-title">{post.title}</h3>
                <span className="post-date">{formatDate(post.createdAt)}</span>
              </div>

              <div className="post-content">
                <p>{getTruncatedContent(post.content)}</p>
              </div>

              <div className="post-footer">
                <div className="tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                
             
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;