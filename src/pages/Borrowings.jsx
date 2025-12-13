import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { borrowingAPI } from '../services/api';
import BorrowingCard from '../components/BorrowingCard';

const Borrowings = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        loadBorrowings();
    }, [filter]);

    const loadBorrowings = async () => {
        try {
            const params = filter !== 'all' ? { status: filter } : {};
            const response = await borrowingAPI.getAll(params);
            setBorrowings(response.data);
        } catch (error) {
            console.error('Error loading borrowings:', error);
            alert('Failed to load borrowings');
        } finally {
            setLoading(false);
        }
    };

    const handleReturn = async (id) => {
        if (!window.confirm('Confirm book return?')) {
            return;
        }

        try {
            await borrowingAPI.returnBook(id);
            alert('Book returned successfully');
            loadBorrowings();
        } catch (error) {
            console.error('Error returning book:', error);
            alert(error.response?.data?.message || 'Failed to return book');
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading borrowings...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>📖 All Borrowings</h1>
                <button 
                    onClick={() => navigate('/borrowings/add')}
                    style={styles.addButton}
                >
                    ➕ New Borrowing
                </button>
            </div>

            <div style={styles.filters}>
                <button
                    onClick={() => setFilter('all')}
                    style={{
                        ...styles.filterBtn,
                        ...(filter === 'all' ? styles.filterActive : {})
                    }}
                >
                    All ({borrowings.length})
                </button>
                <button
                    onClick={() => setFilter('borrowed')}
                    style={{
                        ...styles.filterBtn,
                        ...(filter === 'borrowed' ? styles.filterActive : {})
                    }}
                >
                    Active
                </button>
                <button
                    onClick={() => setFilter('returned')}
                    style={{
                        ...styles.filterBtn,
                        ...(filter === 'returned' ? styles.filterActive : {})
                    }}
                >
                    Returned
                </button>
                <button
                    onClick={() => setFilter('overdue')}
                    style={{
                        ...styles.filterBtn,
                        ...(filter === 'overdue' ? styles.filterActive : {})
                    }}
                >
                    Overdue
                </button>
            </div>

            {borrowings.length === 0 ? (
                <div style={styles.empty}>
                    <p>No borrowings found</p>
                    <button 
                        onClick={() => navigate('/borrowings/add')}
                        style={styles.emptyButton}
                    >
                        Create First Borrowing
                    </button>
                </div>
            ) : (
                <div style={styles.grid}>
                    {borrowings.map(borrowing => (
                        <BorrowingCard
                            key={borrowing.id}
                            borrowing={borrowing}
                            onReturn={handleReturn}
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
    filters: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
    },
    filterBtn: {
        padding: '0.75rem 1.5rem',
        border: '2px solid #ddd',
        backgroundColor: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s',
    },
    filterActive: {
        backgroundColor: '#3498db',
        color: 'white',
        borderColor: '#3498db',
    },
    empty: {
        textAlign: 'center',
        padding: '4rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        color: '#7f8c8d',
    },
    emptyButton: {
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
    },
};

export default Borrowings;