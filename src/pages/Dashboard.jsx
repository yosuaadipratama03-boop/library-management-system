import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await dashboardAPI.getStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading dashboard...</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📊 Dashboard</h1>

            <div style={styles.statsGrid}>
                <div style={{...styles.statCard, backgroundColor: '#3498db'}}>
                    <div style={styles.statIcon}>📚</div>
                    <div style={styles.statValue}>{stats?.stats.total_books}</div>
                    <div style={styles.statLabel}>Total Books</div>
                </div>

                <div style={{...styles.statCard, backgroundColor: '#9b59b6'}}>
                    <div style={styles.statIcon}>👥</div>
                    <div style={styles.statValue}>{stats?.stats.total_users}</div>
                    <div style={styles.statLabel}>Total Users</div>
                </div>

                <div style={{...styles.statCard, backgroundColor: '#f39c12'}}>
                    <div style={styles.statIcon}>📖</div>
                    <div style={styles.statValue}>{stats?.stats.active_borrowings}</div>
                    <div style={styles.statLabel}>Active Borrowings</div>
                </div>

                <div style={{...styles.statCard, backgroundColor: '#27ae60'}}>
                    <div style={styles.statIcon}>✅</div>
                    <div style={styles.statValue}>{stats?.stats.total_borrowings}</div>
                    <div style={styles.statLabel}>Total Borrowings</div>
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>📖 Recent Borrowings</h2>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Book</th>
                                <th style={styles.th}>Borrower</th>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.recent_borrowings.map((borrowing) => (
                                <tr key={borrowing.id}>
                                    <td style={styles.td}>{borrowing.book?.title}</td>
                                    <td style={styles.td}>{borrowing.user?.name}</td>
                                    <td style={styles.td}>
                                        {new Date(borrowing.borrow_date).toLocaleDateString('id-ID')}
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
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>⭐ Popular Books</h2>
                <div style={styles.booksGrid}>
                    {stats?.popular_books.map((book) => (
                        <div key={book.id} style={styles.bookCard}>
                            <h3 style={styles.bookTitle}>{book.title}</h3>
                            <p style={styles.bookAuthor}>{book.author}</p>
                            <p style={styles.bookStat}>
                                📖 Borrowed: {book.borrowings_count} times
                            </p>
                        </div>
                    ))}
                </div>
            </div>
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
    title: {
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '2rem',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
    },
    statCard: {
        padding: '2rem',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center',
    },
    statIcon: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    statValue: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    },
    statLabel: {
        fontSize: '1rem',
        opacity: 0.9,
    },
    section: {
        marginBottom: '3rem',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        color: '#2c3e50',
        marginBottom: '1.5rem',
    },
    tableContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#34495e',
        color: 'white',
        padding: '1rem',
        textAlign: 'left',
        fontWeight: 'bold',
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
    booksGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    bookCard: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    bookTitle: {
        fontSize: '1.1rem',
        color: '#2c3e50',
        margin: '0 0 0.5rem 0',
    },
    bookAuthor: {
        color: '#7f8c8d',
        margin: '0 0 1rem 0',
    },
    bookStat: {
        color: '#3498db',
        fontWeight: 'bold',
        margin: 0,
    },
};

export default Dashboard;