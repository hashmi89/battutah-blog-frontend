import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Spinner, Alert, Card } from 'react-bootstrap';
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

    return (
        <Container className="my-5">
            <Card className="text-center bg-light mb-5 p-5 shadow-sm rounded-lg">
                <Card.Body>
                    <h1 className="display-4 fw-bold text-primary">Salam! and welcome to Battutah.</h1>
                    <p className="lead text-secondary mt-3">
                        Let's explore!
                    </p>
                </Card.Body>
            </Card>

            <h2 className="mb-4 text-muted border-bottom pb-2">Latest Posts</h2>

            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading posts...</span>
                    </Spinner>
                </div>
            )}

            {error && <Alert variant="danger" className="m-5">{error}</Alert>}

            {!loading && !error && (
                posts.length === 0 ? (
                    <Alert variant="info">
                        No posts found. Use the Admin page to create your first post!
                    </Alert>
                ) : (
                    // Use a Bootstrap Row to create the responsive grid
                    <Row className="g-4">
                        {posts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </Row>
                )
            )}
        </Container>
    );
}

export default Home;