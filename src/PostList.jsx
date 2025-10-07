// This component fetches and displays all blog post summaries, will be the blog's homepage showing summaries of all posts.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WORDPRESS_API_BASE from './config';
import { Link } from 'react-router-dom'; // Use Link for navigation

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ?_embed is an essential parameter to include media, author, etc.
    const postsUrl = `${WORDPRESS_API_BASE}/posts?_embed`;

    axios.get(postsUrl)
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading blog posts from WordPress...</div>;
  }

  return (
    <div className="post-list-container">
      <h1>Latest Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id} className="post-card" style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
          {/* Post Title */}
          <h2>{post.title.rendered}</h2>

          {/* Post Excerpt (Must use dangerouslySetInnerHTML for CMS content) */}
          <div
            className="post-excerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />

          {/* Link to the individual post detail page */}
          <Link to={`/post/${post.id}`} style={{ display: 'inline-block', marginTop: '10px', textDecoration: 'none', color: 'blue' }}>
            Read More &raquo;
          </Link>

          <p style={{ fontSize: '0.8em', color: '#666' }}>
            Published: {new Date(post.date).toLocaleDateString()}
          </p>
        </article>
      ))}
    </div>
  );
};

export default PostList;