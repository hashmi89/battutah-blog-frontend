import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar as BNavbar, Nav, Container, Button } from 'react-bootstrap'; 

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        // Use the Bootstrap Navbar component
        <BNavbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                {/* Use Link inside Navbar.Brand */}
                <BNavbar.Brand as={Link} to="/">Battutah</BNavbar.Brand>
                <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> {/* ms-auto pushes links to the right */}
                        {/* Always show Home Link */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        {/* Conditional Admin Links */}
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/admin/new-post">New Post</Nav.Link>
                                <Button variant="outline-light" onClick={handleLogout} className="ms-3">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/admin/login">Admin Login</Nav.Link>
                        )}
                    </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
    );
};

export default Navbar;