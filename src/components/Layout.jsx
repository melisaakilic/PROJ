import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <h1>Library Management</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/publishers">Publishers</Link></li>
            <li><Link to="/authors">Authors</Link></li>
            <li><Link to="/borrows">Borrows</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Library Management System</p>
      </footer>
    </div>
  );
};

export default Layout;
