import React, { useState, useEffect } from 'react';
import { borrowingAPI } from '../services/api';
import BorrowingCard from '../components/BorrowingCard';
import { useAuth } from '../context/AuthContext';

const MyBorrowings = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const { user } = useAuth();

    useEffect(() => {
        loadMyBorrowings();
    }, [filter]);

    const loadMyBorrowings = async () => {
        try {
            const params = { my_borrowings: true };
            if (filter !== 'all') {
                params.status = filter;
            }
            const response = await borrowingAPI.getAll(params);
            setBorrowings(response.data);
        } catch (error) {
            console.error('Error loading borrowings:', error);
            alert('Failed to load your borrowings');
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
            loadMyBorrowings();
        } catch (error) {
            console.error('Error returning book:', error);
            alert(error.response?.data?.message || 'Failed to return book');
        }
    };

    const activeBorrowings = borrowings.filter(b => b.status === 'borrowed').length;
    const returnedBorrowings = borrowings.filter(b => b.status === 'returned').length;

    if (loading) {
        return <div style={styles.loading}>Loading your borrowings...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>📚 My Borrowings</h1>
                    <p style={styles.subtitle}>Welcome back, {user?.name}!</p>
                </div>
            </div>

            <div style={styles.statsCards}>
                <div style={{...styles.statCard, backgroundColor: '#3498db'}}>
                    <div style={styles.statNumber}>{borrowings.length}</div>
                    <div style={styles.statLabel}>Total Borrowings</div>
                </div>
                <div style={{...styles.statCard, backgroundColor: '#f39c12'}}>
                    <div style={styles.statNumber}>{activeBorrowings}</div>
                    <div style={styles.statLabel}>Currently Borrowed</div>
                </div>
                <div style={{...styles.statCard, backgroundColor: '#27ae60'}}>
                    <div style={styles.statNumber}>{returnedBorrowings}</div>
                    <div style={styles.statLabel}>Returned</div>
                </div>
            </div>

            <div style={styles.filters}>
                <button
                    onClick={() => setFilter('all')}
                    style={{
                        ...styles.filterBtn,
                        ...(filter === 'all' ? styles.filterActive : {})
                    }}
                >
                    All
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
                    History
                </button>
            </div>

            {borrowings.length === 0 ? (
                <div style={styles.empty}>
                    <div style={styles.emptyIcon}>📚</div>
                    <h2>No Borrowings Yet</h2>
                    <p>Start borrowing books from our library!</p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {borrowings.map(borrowing => (
                        <BorrowingCard
                            key={borrowing.id}
                            borrowing={borrowing}
                            onReturn={borrowing.status === 'borrowed' ? handleReturn : null}
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
        marginBottom: '2rem',
    },
    title: {
        fontSize: '2rem',
        color: '#2c3e50',
        margin: 0,
    },
    subtitle: {
        color: '#7f8c8d',
        fontSize: '1.1rem',
        marginTop: '0.5rem',
    },
    statsCards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    statCard: {
        padding: '1.5rem',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center',
    },
    statNumber: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    },
    statLabel: {
        fontSize: '0.9rem',
        opacity: 0.9,
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
    emptyIcon: {
        fontSize: '4rem',
        marginBottom: '1rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
    },
};

export default MyBorrowings;