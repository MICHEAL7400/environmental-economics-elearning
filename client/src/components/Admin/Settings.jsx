// client/src/components/Admin/Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'EcoLearn',
    siteDescription: 'Environmental Economics Learning Platform',
    contactEmail: 'hello@ecolearn.org',
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    fileUploadLimit: '10MB',
    backupFrequency: 'daily'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Platform Settings</h1>
        <button className="btn-primary" onClick={handleSaveSettings}>
          Save Changes
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          ⚙️ General
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          📚 Content
        </button>
        <button 
          className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          📧 Email
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          🔒 Security
        </button>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="settings-content">
          <div className="settings-section">
            <h3>Site Information</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                />
              </div>
              <div className="setting-item">
                <label>Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  rows="3"
                />
              </div>
              <div className="setting-item">
                <label>Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>System Settings</h3>
            <div className="settings-grid">
              <div className="setting-item toggle">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  />
                  Maintenance Mode
                </label>
                <span className="setting-description">
                  When enabled, only administrators can access the site
                </span>
              </div>
              <div className="setting-item toggle">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.userRegistration}
                    onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
                  />
                  Allow User Registration
                </label>
                <span className="setting-description">
                  Allow new users to create accounts
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Settings */}
      {activeTab === 'users' && (
        <div className="settings-content">
          <div className="settings-section">
            <h3>User Management</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Default User Role</label>
                <select>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Email Verification</label>
                <select>
                  <option value="required">Required</option>
                  <option value="optional">Optional</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Settings */}
      {activeTab === 'content' && (
        <div className="settings-content">
          <div className="settings-section">
            <h3>Content Management</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>File Upload Limit</label>
                <select
                  value={settings.fileUploadLimit}
                  onChange={(e) => handleSettingChange('fileUploadLimit', e.target.value)}
                >
                  <option value="5MB">5 MB</option>
                  <option value="10MB">10 MB</option>
                  <option value="25MB">25 MB</option>
                  <option value="50MB">50 MB</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Allowed File Types</label>
                <div className="file-types">
                  <label><input type="checkbox" defaultChecked /> PDF</label>
                  <label><input type="checkbox" defaultChecked /> DOC/DOCX</label>
                  <label><input type="checkbox" defaultChecked /> PPT/PPTX</label>
                  <label><input type="checkbox" defaultChecked /> Images</label>
                  <label><input type="checkbox" defaultChecked /> Videos</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      <div className="danger-zone">
        <h3>⚠️ Danger Zone</h3>
        <div className="danger-actions">
          <button className="btn-danger">
            Clear All Data
          </button>
          <button className="btn-danger">
            Reset Platform
          </button>
          <button className="btn-danger">
            Delete Platform
          </button>
        </div>
        <p className="danger-warning">
          These actions are irreversible. Please proceed with caution.
        </p>
      </div>
    </div>
  );
};

export default Settings;