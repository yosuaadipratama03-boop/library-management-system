import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookAPI } from '../services/api';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBook();
    }, [id]);

    const loadBook = async () => {
        try {
            const response = await bookAPI.getOne(id);
            setBook(response.data);
        } catch (error) {
            console.error('Error loading book:', error);
            alert('Failed to load book details');
            navigate('/books');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading book details...</div>;
    }

    if (!book) {
        return <div style={styles.loading}>Book not found</div>;
    }

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/books')} style={styles.backButton}>
                ← Back to Books
            </button>

            <div style={styles.card}>
                <div style={styles.content}>
                    <div style={styles.coverSection}>
                        {book.cover_image ? (
                            <img 
                                src={book.cover_image} 
                                alt={book.title}
                                style={styles.coverImage}
                            />
                        ) : (
                            <div style={styles.noCover}>📖</div>
                        )}
                    </div>

                    <div style={styles.details}>
                        <h1 style={styles.title}>{book.title}</h1>
                        <p style={styles.author}>by {book.author}</p>

                        <div style={styles.info}>
                            <div style={styles.infoItem}>
                                <strong>ISBN:</strong> {book.isbn}
                            </div>
                            {book.publisher && (
                                <div style={styles.infoItem}>
                                    <strong>Publisher:</strong> {book.publisher}
                                </div>
                            )}
                            {book.publication_year && (
                                <div style={styles.infoItem}>
                                    <strong>Year:</strong> {book.publication_year}
                                </div>
                            )}
                            <div style={styles.infoItem}>
                                <strong>Stock:</strong> {book.available}/{book.stock} available
                            </div>
                        </div>

                        {book.description && (
                            <div style={styles.description}>
                                <h3>Description</h3>
                                <p>{book.description}</p>
                            </div>
                        )}

                        <div style={styles.actions}>
                            <button
                                onClick={() => navigate(`/books/edit/${book.id}`)}
                                style={styles.editButton}
                            >
                                ✏️ Edit Book
                            </button>
                            <button
                                onClick={() => navigate('/borrowings/add', { state: { book } })}
                                style={styles.borrowButton}
                                disabled={book.available === 0}
                            >
                                📖 Borrow This Book
                            </button>
                        </div>
                    </div>
                </div>

                {book.borrowings && book.borrowings.length > 0 && (
                    <div style={styles.history}>
                        <h3>Recent Borrowing History</h3>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Borrower</th>
                                    <th style={styles.th}>Borrow Date</th>
                                    <th style={styles.th}>Due Date</th>
                                    <th style={styles.th}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {book.borrowings.map((borrowing) => (
                                    <tr key={borrowing.id}>
                                        <td style={styles.td}>{borrowing.user?.name}</td>
                                        <td style={styles.td}>
                                            {new Date(borrowing.borrow_date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td style={styles.td}>
                                            {new Date(borrowing.due_date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.badge,
                                                backgroundColor: borrowing.status === 'borrowed' ? '#f39c12' : '#27ae60'
                                            }}>
                                                {borrowing.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem',
    },
    loading: {
        textAlign: 'center',
        padding: '4rem',
        fontSize: '1.2rem',
        color: '#7f8c8d',
    },
    backButton: {
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '1.5rem',
        fontSize: '1rem',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '2rem',
        padding: '2rem',
    },
    coverSection: {
        display: 'flex',
        justifyContent: 'center',
    },
    coverImage: {
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    noCover: {
        width: '100%',
        height: '400px',
        backgroundColor: '#ecf0f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '6rem',
        borderRadius: '8px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '2rem',
        color: '#2c3e50',
        margin: '0 0 0.5rem 0',
    },
    author: {
        fontSize: '1.3rem',
        color: '#7f8c8d',
        margin: '0 0 2rem 0',
    },
    info: {
        marginBottom: '2rem',
    },
    infoItem: {
        padding: '0.75rem 0',
        borderBottom: '1px solid #ecf0f1',
        color: '#34495e',
    },
    description: {
        marginBottom: '2rem',
    },
    actions: {
        display: 'flex',
        gap: '1rem',
    },
    editButton: {
        flex: 1,
        padding: '0.75rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    borrowButton: {
        flex: 1,
        padding: '0.75rem',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    history: {
        padding: '2rem',
        borderTop: '2px solid #ecf0f1',
    },
    table: {
        width: '100%',
        marginTop: '1rem',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#34495e',
        color: 'white',
        padding: '1rem',
        textAlign: 'left',
    },
    td: {
        padding: '1rem',
        borderBottom: '1px solid #ecf0f1',
    },
    badge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        color: 'white',
        fontSize: '0.85rem',
        fontWeight: 'bold',
    },
};

export default BookDetail;