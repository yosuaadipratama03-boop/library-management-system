import React from 'react';

const BorrowingCard = ({ borrowing, onReturn }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'borrowed': return '#f39c12';
            case 'returned': return '#27ae60';
            case 'overdue': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID');
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <h3 style={styles.bookTitle}>{borrowing.book?.title}</h3>
                <span style={{...styles.badge, backgroundColor: getStatusColor(borrowing.status)}}>
                    {borrowing.status}
                </span>
            </div>
            
            <div style={styles.content}>
                <p style={styles.info}>
                    <strong>Borrower:</strong> {borrowing.user?.name}
                </p>
                <p style={styles.info}>
                    <strong>Borrow Date:</strong> {formatDate(borrowing.borrow_date)}
                </p>
                <p style={styles.info}>
                    <strong>Due Date:</strong> {formatDate(borrowing.due_date)}
                </p>
                {borrowing.return_date && (
                    <p style={styles.info}>
                        <strong>Return Date:</strong> {formatDate(borrowing.return_date)}
                    </p>
                )}
                {borrowing.notes && (
                    <p style={styles.notes}>
                        <strong>Notes:</strong> {borrowing.notes}
                    </p>
                )}
            </div>

            {borrowing.status === 'borrowed' && onReturn && (
                <button 
                    onClick={() => onReturn(borrowing.id)}
                    style={styles.returnBtn}
                >
                    Return Book
                </button>
            )}
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '1.5rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '1rem',
    },
    bookTitle: {
        fontSize: '1.2rem',
        margin: 0,
        color: '#2c3e50',
        flex: 1,
    },
    badge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        color: 'white',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    content: {
        marginBottom: '1rem',
    },
    info: {
        margin: '0.5rem 0',
        color: '#34495e',
    },
    notes: {
        margin: '1rem 0 0 0',
        padding: '0.75rem',
        backgroundColor: '#ecf0f1',
        borderRadius: '4px',
        color: '#34495e',
    },
    returnBtn: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
};

export default BorrowingCard;