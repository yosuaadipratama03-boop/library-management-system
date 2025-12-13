import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div style={styles.card}>
            <div style={styles.coverPlaceholder}>
                {book.cover_image ? (
                    <img src={book.cover_image} alt={book.title} style={styles.coverImage} />
                ) : (
                    <div style={styles.noImage}>📖</div>
                )}
            </div>
            
            <div style={styles.content}>
                <h3 style={styles.title}>{book.title}</h3>
                <p style={styles.author}>by {book.author}</p>
                <p style={styles.info}>ISBN: {book.isbn}</p>
                <p style={styles.info}>
                    Stock: {book.available}/{book.stock} available
                </p>
                
                <div style={styles.actions}>
                    <button 
                        onClick={() => navigate(`/books/${book.id}`)}
                        style={{...styles.btn, ...styles.btnPrimary}}
                    >
                        View
                    </button>
                    <button 
                        onClick={() => navigate(`/books/edit/${book.id}`)}
                        style={{...styles.btn, ...styles.btnSecondary}}
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => onDelete && onDelete(book.id)}
                        style={{...styles.btn, ...styles.btnDanger}}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s',
    },
    coverPlaceholder: {
        width: '100%',
        height: '200px',
        backgroundColor: '#ecf0f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    noImage: {
        fontSize: '4rem',
    },
    content: {
        padding: '1rem',
    },
    title: {
        fontSize: '1.2rem',
        margin: '0 0 0.5rem 0',
        color: '#2c3e50',
    },
    author: {
        color: '#7f8c8d',
        margin: '0 0 0.5rem 0',
    },
    info: {
        fontSize: '0.9rem',
        color: '#95a5a6',
        margin: '0.25rem 0',
    },
    actions: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem',
    },
    btn: {
        flex: 1,
        padding: '0.5rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
    btnPrimary: {
        backgroundColor: '#3498db',
        color: 'white',
    },
    btnSecondary: {
        backgroundColor: '#95a5a6',
        color: 'white',
    },
    btnDanger: {
        backgroundColor: '#e74c3c',
        color: 'white',
    },
};

export default BookCard;