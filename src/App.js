
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import BookForm from './pages/BookForm';
import BookDetail from './pages/BookDetail';
import Borrowings from './pages/Borrowings';
import MyBorrowings from './pages/MyBorrowings';
import BorrowingForm from './pages/BorrowingForm';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/books" 
              element={
                <PrivateRoute>
                  <Books />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/books/add" 
              element={
                <PrivateRoute>
                  <BookForm />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/books/edit/:id" 
              element={
                <PrivateRoute>
                  <BookForm />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/books/:id" 
              element={
                <PrivateRoute>
                  <BookDetail />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/borrowings" 
              element={
                <PrivateRoute>
                  <Borrowings />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/borrowings/add" 
              element={
                <PrivateRoute>
                  <BorrowingForm />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/my-borrowings" 
              element={
                <PrivateRoute>
                  <MyBorrowings />
                </PrivateRoute>
              } 
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

// Simple 404 Page
const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#e74c3c' }}>404</h1>
      <h2 style={{ color: '#34495e' }}>Page Not Found</h2>
      <p style={{ color: '#7f8c8d' }}>The page you're looking for doesn't exist.</p>
      <a href="/" style={{
        marginTop: '2rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        Go to Dashboard
      </a>
    </div>
  );
};

export default App;