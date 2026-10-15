import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Search, Trash2 } from 'lucide-react';
import { getDbMedia } from '../../api/mongoApi';
import './AdminDashboard.css';

const AdminMediaLibrary = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await getDbMedia();
      setMedia(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await uploadMedia(formData);
      await fetchMedia();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="premium-page-manager">
      <div className="page-manager-header">
        <div className="header-titles">
          <h1>Media Library</h1>
          <p>Upload and manage images and assets used across your website.</p>
        </div>
        <div className="header-actions">
          <input 
            type="file" 
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <button className="btn-primary" onClick={handleUploadClick} disabled={uploading}>
            <Upload size={18} />
            <span>{uploading ? 'Uploading...' : 'Upload New Media'}</span>
          </button>
        </div>
      </div>

      <div className="premium-card" style={{ padding: '24px' }}>
        {loading ? (
          <div className="empty-state">Loading media...</div>
        ) : media.length === 0 ? (
          <div className="empty-state">
            <ImageIcon size={48} className="text-muted mb-4" />
            <h3>No Media Uploaded</h3>
            <p className="text-muted">Upload your first image to get started.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {media.map((item, idx) => (
              <div key={item._id || idx} style={{ border: '1px solid var(--admin-border)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ height: '150px', background: 'var(--admin-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.url ? <img src={item.url} alt={item.altText || item.filename} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} /> : <ImageIcon size={32} className="text-muted" />}
                </div>
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.filename}>{item.filename || 'Untitled'}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{(item.size / 1024).toFixed(1)} KB</span>
                    {/* Add delete handler if there's an API for it */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMediaLibrary;
