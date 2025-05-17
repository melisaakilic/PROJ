import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

function Home() {
  const features = [
    {
      id: 1,
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Get real-time insights with visual analytics and performance metrics.',
      isPremium: true
    },
    {
      id: 2,
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Automated reminders for due dates, renewals, and system updates.',
    },
    {
      id: 3,
      icon: '👥',
      title: 'Multi-User Management',
      description: 'Role-based access control for librarians and administrators.',
    },
    {
      id: 4,
      icon: '📈',
      title: 'Advanced Reporting',
      description: 'Generate comprehensive reports in PDF format with custom filters.',
    },
    {
      id: 5,
      icon: '🔍',
      title: 'Smart Search',
      description: 'Find books instantly with advanced search filters and suggestions.',
    },
    {
      id: 6,
      icon: '☁️',
      title: 'Cloud Backup',
      description: 'Automatic daily backups to keep your data safe and accessible.',
    }
  ];

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge">✨ Version 2.0 Now Live</div>
          <h1>Next-Generation Library Management</h1>
          <p>Streamline your library operations with intelligent automation, data-driven insights, and seamless user experience.</p>
          <div className="cta-buttons">
            <Link to="/dashboard" className="primary-cta">
              <span>Get Started</span>
              <span className="button-icon">→</span>
            </Link>
            <Link to="/books" className="secondary-cta">
              <span>Explore Books</span>
              <span className="button-icon">📚</span>
            </Link>
          </div>
        </div>
      </header>
      
      <section className="features-section">
        <div className="features-header">
          <h2>Advanced Features</h2>
          <p>Everything you need to manage your library efficiently</p>
        </div>
        <div className="features-grid">
          {features.map(feature => (
            <div 
              key={feature.id} 
              className={`feature-card ${feature.isPremium ? 'premium' : ''}`}
            >
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {feature.isPremium && (
                <span className="premium-badge">Pro Feature</span>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join thousands of libraries using BookVault to improve their operations</p>
          <Link to="/dashboard" className="primary-cta-button">
            Start Your Journey
            <span className="arrow">→</span>
          </Link>
        </div>
      </section>
      
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-section">
              <h3>BookVault</h3>
              <span className="logo-tagline">Pro</span>
            </div>
            <p>Next-generation library management for the digital age.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/settings">Settings</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#api">API Reference</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 BookVault Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
