// This file defines the routes for the application.

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import AdminLogin from './pages/AdminLogin';
import NewPost from './pages/NewPost';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <>
      <Navbar />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} /> 
          
          {/* 3. Wrap the New Post route with the ProtectedRoute component */}
          <Route 
            path="/admin/new-post" 
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;