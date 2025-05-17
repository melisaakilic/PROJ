import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  
  // ESC tuşu ile sidebar'ı kapatma
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) toggleSidebar();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, toggleSidebar]);
  
  // Route değiştiğinde sidebar'ı otomatik kapat
  useEffect(() => {
    if (isOpen) toggleSidebar();
  }, [location.pathname]);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <h1>BookVault</h1>
            <span className="logo-tagline">Pro</span>
          </div>
          <button className="close-btn" onClick={toggleSidebar}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul>
              <li>
                <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>
                  <span className="material-symbols-outlined">dashboard</span>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/books" className={({isActive}) => isActive ? 'active' : ''}>
                  <span className="material-symbols-outlined">book</span>
                  <span>Books</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/authors" className={({isActive}) => isActive ? 'active' : ''}>
                  <span className="material-symbols-outlined">person</span>
                  <span>Authors</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={({isActive}) => isActive ? 'active' : ''}>
                  <span className="material-symbols-outlined">category</span>
                  <span>Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/publishers" className={({isActive}) => isActive ? 'active' : ''}>
                  <span className="material-symbols-outlined">business</span>
                  <span>Publishers</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/book-borrowing" className={({isActive}) => isActive ? 'active' : ''}>
                  <span className="material-symbols-outlined">swap_horiz</span>
                  <span>Borrows</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className={({isActive}) => isActive ? 'active' : ''}>
                  <span className="material-symbols-outlined">analytics</span>
                  <span>Reports</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className={({isActive}) => isActive ? 'active' : ''}>
                  <span className="material-symbols-outlined">settings</span>
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">
              <img src="/default-avatar.png" alt="User" onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff";
              }} />
            </div>
            <div className="details">
              <h3>Admin User</h3>
              <p>admin@bookvault.com</p>
            </div>
          </div>
          <button className="logout-btn">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;