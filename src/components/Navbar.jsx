import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                <Link to="/" style={styles.brand}>
                    📚 Library System
                </Link>

                <div style={styles.menu}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                            <Link to="/books" style={styles.link}>Books</Link>
                            <Link to="/borrowings" style={styles.link}>Borrowings</Link>
                            <Link to="/my-borrowings" style={styles.link}>My Borrowings</Link>
                            <span style={styles.user}>👤 {user?.name}</span>
                            <button onClick={handleLogout} style={styles.button}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.link}>Login</Link>
                            <Link to="/register" style={styles.link}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#2c3e50',
        padding: '1rem 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brand: {
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
    menu: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        transition: 'color 0.3s',
    },
    user: {
        color: '#ecf0f1',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
};

export default Navbar;
