import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import AdminLogin from './pages/AdminLogin';
import NewPost from './pages/NewPost';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap';
import { About } from './pages/About';


function App() {
  return (
    <>
      <Navbar />
      <Container fluid className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} /> 
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