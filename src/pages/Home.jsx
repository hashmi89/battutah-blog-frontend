import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// IMPORTANT: Define your live Render API base URL
const API_BASE_URL = 'https://battutah-blog-api.onrender.com';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch all posts from the live API
                const response = await fetch(`${API_BASE_URL}/posts`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Could not load blog posts. Please check the API connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <h2>Loading posts...</h2>;
    }

    if (error) {
        return <h2 style={{ color: 'red' }}>Error: {error}</h2>;
    }

    if (posts.length === 0) {
        return <h2>No posts found. Start writing!</h2>;
    }

    return (
        <div className="home-container">
            <h1>Latest Blog Posts</h1>
            <div className="post-list">
                {posts.map((post) => (
                    <div key={post._id} className="post-preview" style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                        <h3>
                            {/* Link to the detail page using the post's slug */}
                            <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                {post.title}
                            </Link>
                        </h3>
                        <p style={{ fontSize: '0.9em', color: '#666' }}>
                            Published on: {new Date(post.date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
            {/* Link to the new admin login page */}
            <p style={{ marginTop: '20px' }}>
                <Link to="/admin/login">Admin Login</Link>
            </p>
        </div>
    );
};

export default Home;