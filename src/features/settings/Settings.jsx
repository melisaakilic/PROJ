import React, { useState } from 'react';
import './Settings.scss';

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoReminders: true,
    maxBorrowingDays: 14,
    maxBooksPerMember: 5,
    libraryName: 'BookVault Pro',
    libraryEmail: 'info@bookvault.com'
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving settings:', settings);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Library Settings</h1>
        <p>Configure your library management system</p>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h2>General Settings</h2>
          
          <div className="form-group">
            <label>Library Name</label>
            <input 
              type="text" 
              value={settings.libraryName}
              onChange={(e) => handleChange('libraryName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Library Email</label>
            <input 
              type="email" 
              value={settings.libraryEmail}
              onChange={(e) => handleChange('libraryEmail', e.target.value)}
            />
          </div>
        </div>

        <div className="settings-section">
          <h2>Borrowing Settings</h2>
          
          <div className="form-group">
            <label>Maximum Borrowing Days</label>
            <input 
              type="number" 
              value={settings.maxBorrowingDays}
              onChange={(e) => handleChange('maxBorrowingDays', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Maximum Books per Member</label>
            <input 
              type="number" 
              value={settings.maxBooksPerMember}
              onChange={(e) => handleChange('maxBooksPerMember', e.target.value)}
            />
          </div>
        </div>

        <div className="settings-section">
          <h2>Notification Settings</h2>
          
          <div className="form-group checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              />
              Email Notifications
            </label>
          </div>

          <div className="form-group checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={settings.autoReminders}
                onChange={(e) => handleChange('autoReminders', e.target.checked)}
              />
              Automatic Reminders
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">Save Settings</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;