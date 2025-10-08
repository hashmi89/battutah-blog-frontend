// This file defines the routes for the application.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './PostList';     // Already created
import PostDetail from './PostDetail'; // The new component

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          {/* Add a simple navigation link back to the list */}
          <a href="/">Home (Blog List)</a>
        </header>
        <main>
          <Routes>
            {/* Route for the main blog list (homepage) */}
            <Route path="/" element={<PostList />} />

            {/* NEW ROUTE: Route for individual posts, using the :slug parameter */}
            <Route path="/post/:slug" element={<PostDetail />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;