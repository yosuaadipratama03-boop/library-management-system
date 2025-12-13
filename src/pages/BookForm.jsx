import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookAPI } from '../services/api';

const BookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        publication_year: '',
        stock: '',
        description: '',
        cover_image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            loadBook();
        }
    }, [id]);

    const loadBook = async () => {
        try {
            const response = await bookAPI.getOne(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error loading book:', error);
            alert('Failed to load book data');
            navigate('/books');
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
            if (isEdit) {
                await bookAPI.update(id, formData);
                alert('Book updated successfully');
            } else {
                await bookAPI.create(formData);
                alert('Book created successfully');
            }
            navigate('/books');
        } catch (error) {
            console.error('Error saving book:', error);
            setError(error.response?.data?.message || 'Failed to save book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>
                    {isEdit ? '✏️ Edit Book' : '➕ Add New Book'}
                </h2>

                {error && (
                    <div style={styles.error}>{error}</div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Book title"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Author *</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Author name"
                            />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>ISBN *</label>
                            <input
                                type="text"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="978-XXXXXXXXXX"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Publisher</label>
                            <input
                                type="text"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Publisher name"
                            />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Publication Year</label>
                            <input
                                type="number"
                                name="publication_year"
                                value={formData.publication_year}
                                onChange={handleChange}
                                min="1000"
                                max={new Date().getFullYear()}
                                style={styles.input}
                                placeholder="2024"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                style={styles.input}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Cover Image URL</label>
                        <input
                            type="url"
                            name="cover_image"
                            value={formData.cover_image}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            style={{...styles.input, resize: 'vertical'}}
                            placeholder="Book description..."
                        />
                    </div>

                    <div style={styles.actions}>
                        <button
                            type="button"
                            onClick={() => navigate('/books')}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{...styles.submitButton, opacity: loading ? 0.7 : 1}}
                        >
                            {loading ? 'Saving...' : (isEdit ? 'Update Book' : 'Create Book')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
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
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

export default BookForm;