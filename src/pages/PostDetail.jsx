import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Card } from 'react-bootstrap'; 
import API_BASE_URL from '../config';


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

        // Fetching by slug is already implemented correctly here
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

    // Handle case where post is null but no error was set
    if (!post) {
        return (
            <Container className="my-5">
                <Alert variant="warning">Post content is unavailable.</Alert>
            </Container>
        );
    }

    // Function to format the date
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown Date';
        // Note: Using 'date' property from your existing file, assuming it's the right date field
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    // --- Full Post View with Bootstrap Styling ---
    return (
        <Container className="my-5">
            <Card className="shadow-lg p-4">
                <header className="mb-4 pb-3 border-bottom">
                    {/* Use Bootstrap headings and utility classes */}
                    <h1 className="display-4 fw-bold">{post.title}</h1> 
                    
                    <p className="text-muted lead">
                        Published: {formatDate(post.date)}
                    </p>
                </header>
                
                <main>
                    <div 
                        className="post-content fs-5" 
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </main>
                
                <footer className="mt-5 pt-3 border-top">
                    <p className="text-muted">Thank you for reading!</p>
                </footer>
            </Card>
        </Container>
    );
}

export default PostDetail;