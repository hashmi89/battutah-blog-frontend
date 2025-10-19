import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Form, Button, Alert } from 'react-bootstrap';

// IMPORTANT: Define your live Render API base URL
const API_BASE_URL = 'https://battutah-blog-api.onrender.com';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Access the stored token for authentication
    const { token } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!token) {
            setError('Authentication token missing. Please log in again.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/posts/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // ATTACH THE JWT FOR AUTHORIZATION
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Post added successfully!');
                setTitle('');
                setContent('');
            } else {
                // Display error message from the protected API route (e.g., Forbidden)
                setError(data.error || data.msg || 'Failed to add post.');
            }
        } catch (err) {
            console.error('Submission error:', err);
            setError('An unexpected error occurred during submission.');
        }
    };

    return (
        <div className="new-post-container">
            <h2 className="mb-4">Create New Blog Post</h2> {/* mb-4 adds margin */}
            <Form onSubmit={handleSubmit}>
                
                {/* Title Field */}
                <Form.Group className="mb-3" controlId="formPostTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Content Field (Textarea) */}
                <Form.Group className="mb-4" controlId="formPostContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea" // Use 'as="textarea"' for multiline input
                        placeholder="Write your blog content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={15} // Increase rows for a better writing experience
                        required
                    />
                </Form.Group>

                {/* Status Messages using Bootstrap Alert */}
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                
                {/* Submit Button */}
                <Button variant="primary" type="submit">
                    Publish Post
                </Button>
            </Form>
        </div>
    );
};

export default NewPost;