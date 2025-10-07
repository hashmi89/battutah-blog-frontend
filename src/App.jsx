// This file defines the routes for the application.

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Simple Header/Navigation */}
        <header style={{ padding: '20px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '1.5em', fontWeight: 'bold' }}>
            My Headless React Blog
          </Link>
        </header>
        
        <main style={{ padding: '20px' }}>
          <Routes>
            {/* Route for the main blog list (Home) */}
            <Route path="/" element={<PostList />} />

            {/* Route for individual posts, matching the ID parameter */}
            <Route path="/post/:id" element={<PostDetail />} />
            
            {/* Fallback for 404s */}
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;