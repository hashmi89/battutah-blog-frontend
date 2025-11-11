import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap'; 

const API_BASE_URL = 'https://battutah-blog-api.onrender.com'; 

function PostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) {
            setError('No post slug provided.');
            setLoading(false);
            return;
        }

        const postUrl = `${API_BASE_URL}/posts/slug/${slug}`; 

        axios.get(postUrl)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching post:", err);
                if (err.response && err.response.status === 404) {
                    setError('The requested blog post was not found.');
                } else {
                    setError('Failed to load the blog post details.');
                }
                setLoading(false);
            });
    }, [slug]);

    // --- Loading State (Bootstrap Spinner) ---
    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading post...</span>
                </Spinner>
            </Container>
        );
    }

    // --- Error State (Bootstrap Alert) ---
    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    // Handle case where post is null but no error was set (shouldn't happen with the error check above, but good safeguard)
    if (!post) {
        return (
            <Container className="my-5">
                <Alert variant="warning">Post content is unavailable.</Alert>
            </Container>
        );
    }

    // --- Full Post View with Bootstrap Styling ---
    return (
        <Container className="my-5">
            <header className="mb-4 pb-3 border-bottom">
                {/* Use Bootstrap headings and utility classes */}
                <h1 className="display-4 fw-bold">{post.title}</h1> 
                
                <p className="text-muted lead">
                    Published: {new Date(post.date).toLocaleDateString()}
                </p>
            </header>
            
            <main>
                <div 
                    className="post-content fs-5" 
                    // Ensures line breaks are preserved for readability of raw text content
                    style={{ whiteSpace: 'pre-wrap' }} 
                >
                    {/* Render the full content */}
                    {post.content}
                </div>
            </main>
            
            <footer className="mt-5 pt-3 border-top">
                <p className="text-muted">Thank you for reading!</p>
            </footer>
        </Container>
    );
}

export default PostDetail;