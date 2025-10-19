import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

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
        // Use a Bootstrap Spinner for a better loading indicator
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading posts...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <h2 className="text-danger my-5">Error: {error}</h2>;
    }

    if (posts.length === 0) {
        return <h2 className="my-5">No posts found. Start writing!</h2>;
    }

    return (
        <div className="home-container">
            <h1 className="mb-4">Latest Blog Posts</h1>
            
            {/* Use Row and Col to create a responsive grid */}
            <Row className="g-4"> 
                {posts.map((post) => (
                    // Defines column sizes: 12 on mobile, 6 on tablets, 4 on desktop (3 cards per row)
                    <Col key={post._id} xs={12} md={6} lg={4}> 
                        <Card className="h-100 shadow-sm"> {/* h-100 ensures equal height */}
                            <Card.Body>
                                <Card.Title as="h3">
                                    {/* Use Link component for navigation */}
                                    <Link 
                                        to={`/post/${post.slug}`} 
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {post.title}
                                    </Link>
                                </Card.Title>
                                
                                <Card.Text className="text-muted small mb-0">
                                    Published: {new Date(post.date).toLocaleDateString()}
                                </Card.Text>

                                <Card.Text className="mt-3">
                                    {/* Display a short excerpt or placeholder content */}
                                    {post.content.substring(0, 150)}...
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Link as={Link} to={`/post/${post.slug}`}>
                                    Read Full Post &rarr;
                                </Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;