import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { borrowingAPI, bookAPI } from '../services/api';

const BorrowingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const preselectedBook = location.state?.book;

    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({
        book_id: preselectedBook?.id || '',
        borrow_date: new Date().toISOString().split('T')[0],
        due_date: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadBooks();
        
        // Set default due date to 14 days from today
        const today = new Date();
        const dueDate = new Date(today.setDate(today.getDate() + 14));
        setFormData(prev => ({
            ...prev,
            due_date: dueDate.toISOString().split('T')[0]
        }));
    }, []);

    const loadBooks = async () => {
        try {
            const response = await bookAPI.getAll();
            // Filter only available books
            const availableBooks = response.data.filter(book => book.available > 0);
            setBooks(availableBooks);
        } catch (error) {
            console.error('Error loading books:', error);
            alert('Failed to load books');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await borrowingAPI.create(formData);
            alert('Book borrowed successfully!');
            navigate('/my-borrowings');
        } catch (error) {
            console.error('Error creating borrowing:', error);
            setError(error.response?.data?.message || 'Failed to borrow book');
        } finally {
            setLoading(false);
        }
    };

    const selectedBook = books.find(b => b.id === parseInt(formData.book_id));

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>📖 Borrow a Book</h2>

                {error && (
                    <div style={styles.error}>{error}</div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Select Book *</label>
                        <select
                            name="book_id"
                            value={formData.book_id}
                            onChange={handleChange}
                            required
                            style={styles.select}
                            disabled={!!preselectedBook}
                        >
                            <option value="">-- Choose a book --</option>
                            {books.map(book => (
                                <option key={book.id} value={book.id}>
                                    {book.title} by {book.author} (Available: {book.available})
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedBook && (
                        <div style={styles.bookInfo}>
                            <h4>📚 {selectedBook.title}</h4>
                            <p><strong>Author:</strong> {selectedBook.author}</p>
                            <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                            <p><strong>Available:</strong> {selectedBook.available} / {selectedBook.stock}</p>
                        </div>
                    )}

                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Borrow Date *</label>
                            <input
                                type="date"
                                name="borrow_date"
                                value={formData.borrow_date}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Due Date *</label>
                            <input
                                type="date"
                                name="due_date"
                                value={formData.due_date}
                                onChange={handleChange}
                                required
                                min={formData.borrow_date}
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Notes (Optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="3"
                            style={{...styles.input, resize: 'vertical'}}
                            placeholder="Any special notes about this borrowing..."
                        />
                    </div>

                    <div style={styles.actions}>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !formData.book_id}
                            style={{
                                ...styles.submitButton,
                                opacity: (loading || !formData.book_id) ? 0.5 : 1
                            }}
                        >
                            {loading ? 'Processing...' : 'Borrow Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '2rem',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '2rem',
    },
    title: {
        fontSize: '1.8rem',
        color: '#2c3e50',
        marginBottom: '2rem',
    },
    error: {
        backgroundColor: '#fee',
        color: '#c33',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#34495e',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        boxSizing: 'border-box',
    },
    select: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        boxSizing: 'border-box',
        backgroundColor: 'white',
    },
    bookInfo: {
        backgroundColor: '#ecf0f1',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1.5rem',
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
    },
    cancelButton: {
        flex: 1,
        padding: '0.75rem',
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    submitButton: {
        flex: 1,
        padding: '0.75rem',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

export default BorrowingForm;