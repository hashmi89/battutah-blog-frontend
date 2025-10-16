import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

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
            <h2>Create New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        required
                    />
                </div>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Publish Post</button>
            </form>
        </div>
    );
};

export default NewPost;