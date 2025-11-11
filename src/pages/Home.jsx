import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Spinner, Alert } from 'react-bootstrap'; 
import API_BASE_URL from '../config'; 
import PostCard from '../components/PostCard';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postsUrl = `${API_BASE_URL}/posts`; 
        
        axios.get(postsUrl)
            .then(response => {
                // Ensure data is an array before setting state
                setPosts(Array.isArray(response.data) ? response.data : []); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching posts:", err);
                const fallbackUrl = 'https://battutah-blog-api.onrender.com';
                const apiUrl = typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : fallbackUrl;
                
                if (err.response && err.response.status === 404) {
                     setError("No posts found. Please check if the API is running at " + apiUrl);
                } else {
                    setError("Failed to load blog posts. Check network connection or API URL: " + apiUrl);
                }
                setLoading(false);
            });
    }, []);

    // --- Rendering Logic ---

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading posts...</span>
                </Spinner>
            </div>
        );
    }
    
    if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

    return (
        <Container className="my-5">
            <h1 className="mb-4">Latest Blog Posts</h1>
            
            {posts.length === 0 ? (
                <Alert variant="info">
                    No posts found. Use the Admin page to create your first post!
                </Alert>
            ) : (
                // Use a Bootstrap Row to create the responsive grid
                <Row className="g-4"> 
                    {posts.map(post => (
                        // Map over data and delegate rendering to the PostCard component
                        // The PostCard component now handles HTML stripping for the summary
                        <PostCard key={post._id} post={post} />
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Home;