// This component handles fetching and displaying the content for a single post using the ID from the URL.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import WORDPRESS_API_BASE from './config';

const PostDetail = () => {
  // useParams() gets the 'id' from the route path: /post/:id
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postUrl = `${WORDPRESS_API_BASE}/posts/${id}`;

    axios.get(postUrl)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching post ${id}:`, error);
        setLoading(false);
      });
  }, [id]); // Rerun the effect if the ID changes

  if (loading) {
    return <div>Loading post content...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="post-detail-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>&laquo; Back to All Posts</Link>
      
      {/* Title */}
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      
      {/* Post Content (The full body of the blog post) */}
      <div 
        className="post-content" 
        dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
        style={{ lineHeight: '1.6', fontSize: '1.1em' }}
      />
      
      <p style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        Published on: {new Date(post.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostDetail;