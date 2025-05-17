import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Main.scss';

const Main = ({ pagetitle, content }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`app-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo">BookVault</h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <span className="material-symbols-outlined">
              {collapsed ? 'menu_open' : 'menu'}
            </span>
          </button>
        </div>
        
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul>
              <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                <a href="/dashboard">
                  <span className="material-symbols-outlined">dashboard</span>
                  <span className="nav-text">Dashboard</span>
                </a>
              </li>
              <li className={location.pathname === '/books' ? 'active' : ''}>
                <a href="/books">
                  <span className="material-symbols-outlined">book</span>
                  <span className="nav-text">Books</span>
                </a>
              </li>
              <li className={location.pathname === '/authors' ? 'active' : ''}>
                <a href="/authors">
                  <span className="material-symbols-outlined">person</span>
                  <span className="nav-text">Authors</span>
                </a>
              </li>
              <li className={location.pathname === '/publishers' ? 'active' : ''}>
                <a href="/publishers">
                  <span className="material-symbols-outlined">business</span>
                  <span className="nav-text">Publishers</span>
                </a>
              </li>
              <li className={location.pathname === '/categories' ? 'active' : ''}>
                <a href="/categories">
                  <span className="material-symbols-outlined">category</span>
                  <span className="nav-text">Categories</span>
                </a>
              </li>
              <li className={location.pathname === '/book-borrowing' ? 'active' : ''}>
                <a href="/book-borrowing">
                  <span className="material-symbols-outlined">swap_horiz</span>
                  <span className="nav-text">Borrows</span>
                </a>
              </li>
              <li className={location.pathname === '/reports' ? 'active' : ''}>
                <a href="/reports">
                  <span className="material-symbols-outlined">monitoring</span>
                  <span className="nav-text">Reports</span>
                </a>
              </li>
              <li className={location.pathname === '/settings' ? 'active' : ''}>
                <a href="/settings">
                  <span className="material-symbols-outlined">settings</span>
                  <span className="nav-text">Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <h1 className="page-title">{pagetitle}</h1>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search..." />
            </div>
            <div className="user-menu">
              <button className="notification-btn">
                <span className="material-symbols-outlined">notifications</span>
                <span className="notification-badge">3</span>
              </button>
              <div className="user-profile">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=4361ee&color=fff" alt="User" />
                <span>Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {content}
        </div>
      </main>
    </div>
  );
};

export default Main;