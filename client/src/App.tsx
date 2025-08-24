import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import AddNewPost from './components/AddNewPost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="nav">
            <Link to="/" className="logo-link">
              <h1>My Blog</h1>
            </Link>
            <Link to="/add-post" className="add-post-nav-btn">
              + New Post
            </Link>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/add-post" element={<AddNewPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Simple 404 component
const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home-link">
        ← Back to Home
      </Link>
    </div>
  );
};

export default App;