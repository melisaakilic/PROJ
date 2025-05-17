import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';

function Header({ toggleSidebar }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Sayfa kaydırıldığında header'ın stilini değiştir
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`modern-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
	{/* Mobil görünüm için sidebar toggle butonu */}
       	 <button className="sidebar-toggle-btn visible-mobile" onClick={toggleSidebar}>
           <span className="material-symbols-outlined">menu</span>
         </button>
        <div className="logo-section">
          <h1>BookVault</h1>
          <span className="logo-tagline">Pro</span>
        </div>
        
        <ul className="nav-menu">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : ''}>
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/authors" className={({ isActive }) => isActive ? 'active' : ''}>
              Authors
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={({ isActive }) => isActive ? 'active' : ''}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/publishers" className={({ isActive }) => isActive ? 'active' : ''}>
              Publishers
            </NavLink>
          </li>
          <li>
            <NavLink to="/book-borrowing" className={({ isActive }) => isActive ? 'active' : ''}>
              Borrows
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
              Settings
            </NavLink>
          </li>
        </ul>
        
        <div className="user-section">
          <button className="notification-btn">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="user-avatar">
            <img src="/default-avatar.png" alt="User" onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff";
            }} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;