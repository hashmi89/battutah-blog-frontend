// This component fetches and displays all blog post summaries, will be the blog's homepage showing summaries of all posts.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from './config'; // Import the new base URL

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Construct the full API endpoint
        const postsUrl = `${API_BASE_URL}/posts`; 
        
        axios.get(postsUrl)
            .then(response => {
                // The Express API returns the post array directly
                // So no need for complex mapping like with some CMS structures
                setPosts(response.data); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching posts:", err);
                setError("Failed to load blog posts.");
                setLoading(false);
            });
    }, []);

    // --- Rendering Logic ---

    if (loading) return <div className="loading">Loading posts...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="post-list-container">
            <h1>Latest Blog Posts</h1>
            {posts.length === 0 ? (
                <p>No posts found. Use Postman to add some!</p>
            ) : (
                posts.map(post => (
                    // Use a unique key for each item
                    <div key={post._id} className="post-card">
                        <h2>{post.title}</h2>
                        {/* Express API uses 'content', we'll truncate it for the list */}
                        <p>{post.content.substring(0, 150)}...</p> 
                        <a href={`/posts/${post.slug}`}>Read More</a> 
                        <p className="post-date">Published: {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default PostList;