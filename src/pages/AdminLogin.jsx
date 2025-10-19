import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Button, Alert } from 'react-bootstrap';

// IMPORTANT: Define your live Render API base URL
const API_BASE_URL = 'https://battutah-blog-api.onrender.com';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS: Get the token and user data
        login(data.token, data.user);
        
        // Redirect the user to the admin dashboard or the new post page
        navigate('/admin/new-post'); 
      } else {
        // ERROR: Display the message from the backend
        setError(data.msg || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred during login.');
    }
  };

return (
  <div className="login-container">
    <h2 className="mb-4">Admin Login</h2> {/* mb-4 adds margin below heading */}
    <Form onSubmit={handleSubmit}>
      
      {/* Username Field */}
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      {/* Password Field */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {/* Error Message using Bootstrap Alert */}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Submit Button */}
      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
  </div>
  );
};

export default AdminLogin;