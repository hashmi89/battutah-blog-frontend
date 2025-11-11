import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Utility function to strip HTML tags from a string.
 * This is necessary because the rich text editor saves content as an HTML string.
 * For summaries, we only want the plain text.
 * @param {string} htmlString - The raw HTML content from the post.
 * @returns {string} The plain text content.
 */
const stripHtmlTags = (htmlString) => {
    // Check if htmlString is valid before proceeding
    if (!htmlString || typeof htmlString !== 'string') {
        return 'No content available.';
    }

    // 1. Create a temporary div element
    const tempDiv = document.createElement('div');
    // 2. Set the raw HTML content into the div
    tempDiv.innerHTML = htmlString;
    // 3. Extract the plain text content
    let plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    // Truncate the text for a clean summary
    const maxLength = 200;
    if (plainText.length > maxLength) {
        // Ensure we don't cut in the middle of a word unnecessarily
        plainText = plainText.substring(0, maxLength).trim();
        // Add ellipsis only if content was actually truncated
        plainText += '...';
    }
    
    return plainText;
};


const PostCard = ({ post }) => {
    // Ensure the date is formatted nicely
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown Date';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Use the utility function to clean the summary content
    const summary = stripHtmlTags(post.content);
    
    return (
        // Use a column for Bootstrap's responsive grid
        <Col md={6} lg={4}> 
            <Card className="h-100 shadow-sm">
                <Card.Body>
                    {/* Link to the post detail page using the slug */}
                    <Card.Title as={Link} to={`/posts/${post.slug}`} className="text-decoration-none text-primary fw-bold">
                        {post.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted small">
                        Published: {formatDate(post.date)}
                    </Card.Subtitle>
                    
                    {/* Display the clean, stripped summary */}
                    <Card.Text className="mt-3">
                        {summary}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0">
                    <Button 
                        as={Link} 
                        to={`/posts/${post.slug}`} 
                        variant="outline-primary" 
                        size="sm"
                    >
                        Read More
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default PostCard;