// This component handles fetching and displaying the content for a single post using the ID from the URL.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// This hook lets us read parameters (like the slug) from the URL
import { useParams } from 'react-router-dom'; 
import API_BASE_URL from '../config'; 

function PostDetail() {
    // The useParams hook extracts variables defined in the route path (e.g., /post/:slug)
    const { slug } = useParams(); 
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Stop fetching if no slug is present
        if (!slug) {
            setError('No post slug provided.');
            setLoading(false);
            return;
        }

        const postUrl = `${API_BASE_URL}/posts/slug/${slug}`;

        axios.get(postUrl)
            .then(response => {
                // The Express API returns the single post object directly
                setPost(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching post:", err);
                // Check for a 404 error (post not found)
                if (err.response && err.response.status === 404) {
                    setError('The requested blog post was not found.');
                } else {
                    setError('Failed to load the blog post details.');
                }
                setLoading(false);
            });
    }, [slug]); // Re-run effect if the slug changes

    if (loading) return <div className="loading">Loading post...</div>;
    if (error) return <div className="error">{error}</div>;

    // Render the post if it exists
    return (
        <div className="post-detail-container">
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p className="post-date">Published: {new Date(post.date).toLocaleDateString()}</p>
                    {/* Render the full content of the post */}
                    <div className="post-content">
                        <p>{post.content}</p>
                    </div>
                </>
            ) : (
                <div className="error">Post content is unavailable.</div>
            )}
        </div>
    );
}

export default PostDetail;