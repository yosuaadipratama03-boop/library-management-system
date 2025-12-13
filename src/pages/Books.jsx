import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookAPI } from '../services/api';
import BookCard from '../components/BookCard';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const response = await bookAPI.getAll();
            setBooks(response.data);
        } catch (error) {
            console.error('Error loading books:', error);
            alert('Failed to load books');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) {
            return;
        }

        try {
            await bookAPI.delete(id);
            alert('Book deleted successfully');
            loadBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
            alert(error.response?.data?.message || 'Failed to delete book');
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.isbn.includes(search)
    );

    if (loading) {
        return <div style={styles.loading}>Loading books...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>📚 Books Management</h1>
                <button 
                    onClick={() => navigate('/books/add')}
                    style={styles.addButton}
                >
                    ➕ Add New Book
                </button>
            </div>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="🔍 Search by title, author, or ISBN..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.stats}>
                <p>Total Books: <strong>{books.length}</strong></p>
                <p>Available: <strong>{books.filter(b => b.available > 0).length}</strong></p>
                <p>Borrowed: <strong>{books.filter(b => b.available === 0).length}</strong></p>
            </div>

            {filteredBooks.length === 0 ? (
                <div style={styles.empty}>
                    <p>No books found</p>
                    {search && <p>Try adjusting your search</p>}
                </div>
            ) : (
                <div style={styles.grid}>
                    {filteredBooks.map(book => (
                        <BookCard 
                            key={book.id} 
                            book={book}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
    },
    loading: {
        textAlign: 'center',
        padding: '4rem',
        fontSize: '1.2rem',
        color: '#7f8c8d',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    title: {
        fontSize: '2rem',
        color: '#2c3e50',
        margin: 0,
    },
    addButton: {
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    searchContainer: {
        marginBottom: '1.5rem',
    },
    searchInput: {
        width: '100%',
        padding: '1rem',
        fontSize: '1rem',
        border: '2px solid #ddd',
        borderRadius: '8px',
        boxSizing: 'border-box',
    },
    stats: {
        display: 'flex',
        gap: '2rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
    },
    empty: {
        textAlign: 'center',
        padding: '4rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        color: '#7f8c8d',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
};

export default Books;
