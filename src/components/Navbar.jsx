import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Calls the function to clear token and state
        navigate('/'); // Redirects to the homepage after logging out
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>Battutah</Link>
            </div>
            <div style={styles.links}>
                {/* Always show the Home Link */}
                <Link to="/" style={styles.link}>Home</Link>

                {/* Conditional Admin Links based on login status */}
                {isLoggedIn ? (
                    <>
                        {/* Show New Post link if logged in */}
                        <Link to="/admin/new-post" style={styles.link}>New Post</Link>
                        
                        {/* Show Logout button if logged in */}
                        <button onClick={handleLogout} style={styles.button}>
                            Logout
                        </button>
                    </>
                ) : (
                    // Show Login link if logged out
                    <Link to="/admin/login" style={styles.link}>Admin Login</Link>
                )}
            </div>
        </nav>
    );
};

// Simple inline styles for demonstration (replace with your CSS later)
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
        marginBottom: '20px',
    },
    logo: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        padding: '5px 10px',
    },
    button: {
        color: 'white',
        backgroundColor: '#555',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '3px',
    }
};

export default Navbar;