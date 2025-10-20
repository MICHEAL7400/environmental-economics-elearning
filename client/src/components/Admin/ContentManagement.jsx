// client/src/components/Admin/ContentManagement.jsx
import React, { useState, useRef } from 'react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('files');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Environmental Economics Syllabus.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'Admin User'
    },
    {
      id: 2,
      name: 'Carbon Pricing Case Study.docx',
      type: 'doc',
      size: '1.8 MB',
      uploadDate: '2024-02-10',
      uploadedBy: 'Sarah Smith'
    },
    {
      id: 3,
      name: 'Renewable Energy Presentation.pptx',
      type: 'ppt',
      size: '5.2 MB',
      uploadDate: '2024-03-05',
      uploadedBy: 'Admin User'
    }
  ]);

  const handleFileUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(progress);
      }

      // Add file to list
      const newFile = {
        id: files.length + i + 1,
        name: file.name,
        type: file.name.split('.').pop(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: 'Admin User'
      };

      setFiles(prev => [...prev, newFile]);
    }

    setUploading(false);
    setUploadProgress(0);
    event.target.value = ''; // Reset file input
  };

  const handleDeleteFile = (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(file => file.id !== fileId));
    }
  };

  const getFileIcon = (fileType) => {
    const iconMap = {
      pdf: '📕',
      doc: '📄',
      docx: '📄',
      ppt: '📊',
      pptx: '📊',
      xls: '📈',
      xlsx: '📈',
      jpg: '🖼️',
      png: '🖼️',
      mp4: '🎥',
      mp3: '🎵',
      zip: '📦'
    };
    return iconMap[fileType] || '📄';
  };

  return (
    <div className="content-management">
      <div className="page-header">
        <h1>Content Management</h1>
        <button 
          className="btn-primary"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? `Uploading... ${uploadProgress}%` : '📤 Upload Files'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          multiple
          style={{ display: 'none' }}
        />
      </div>

      {/* Tabs */}
      <div className="content-tabs">
        <button 
          className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          📁 Files
        </button>
        <button 
          className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          🖼️ Media Library
        </button>
        <button 
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          📑 Categories
        </button>
      </div>

      {/* File Manager */}
      {activeTab === 'files' && (
        <div className="content-card">
          <div className="file-manager">
            {/* Upload Area */}
            {uploading && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span>Uploading... {uploadProgress}%</span>
              </div>
            )}

            {/* Files Grid */}
            <div className="files-grid">
              {files.map(file => (
                <div key={file.id} className="file-card">
                  <div className="file-icon">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="file-info">
                    <h4>{file.name}</h4>
                    <p className="file-meta">
                      {file.size} • {file.uploadDate} • {file.uploadedBy}
                    </p>
                  </div>
                  <div className="file-actions">
                    <button className="btn-download" title="Download">
                      ⬇️
                    </button>
                    <button className="btn-preview" title="Preview">
                      👁️
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteFile(file.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {files.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📁</div>
                <h3>No files uploaded yet</h3>
                <p>Upload your first file to get started</p>
                <button 
                  className="btn-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Files
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Media Library */}
      {activeTab === 'media' && (
        <div className="content-card">
          <div className="media-library">
            <h3>Media Library</h3>
            <p>Manage images, videos, and other media files</p>
            {/* Add media library implementation */}
          </div>
        </div>
      )}

      {/* Categories */}
      {activeTab === 'categories' && (
        <div className="content-card">
          <div className="categories-management">
            <h3>Content Categories</h3>
            <p>Organize your content into categories</p>
            {/* Add categories management implementation */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;