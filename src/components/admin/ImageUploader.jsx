import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Loader2, Trash2 } from 'lucide-react';
import { getDbMedia, uploadMedia, saveDbMedia } from '../../api/mongoApi';
import { uploadToCloudinary } from '../../utils/cloudinary';
import './ImageUploader.css';

const ImageUploader = ({ 
  currentUrl, 
  initialImage,
  value,
  onSelect, 
  onImageSelected,
  onChange,
  onRemove, 
  label = 'Image', 
  className = '' 
}) => {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  const fileInputRef = useRef(null);
  const activeUrl = currentUrl || initialImage || value || '';

  const notifySelected = (url) => {
    if (typeof onSelect === 'function') {
      try { onSelect(url); } catch (e) { console.error('Error in onSelect:', e); }
    }
    if (typeof onImageSelected === 'function') {
      try { onImageSelected(url); } catch (e) { console.error('Error in onImageSelected:', e); }
    }
    if (typeof onChange === 'function') {
      try { onChange(url); } catch (e) { console.error('Error in onChange:', e); }
    }
  };

  const fetchLibrary = async () => {
    setIsLoadingLibrary(true);
    try {
      const media = await getDbMedia();
      setMediaLibrary(media || []);
    } catch (err) {
      console.error("Failed to load media library", err);
    } finally {
      setIsLoadingLibrary(false);
    }
  };

  const handleOpenLibrary = () => {
    setIsLibraryOpen(true);
    fetchLibrary();
  };

  const handleCloseLibrary = () => {
    setIsLibraryOpen(false);
  };

  const handleSelectFromLibrary = (mediaItem) => {
    notifySelected(mediaItem.url);
    handleCloseLibrary();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      // 1. Direct Cloudinary Upload (fryxycyd)
      const cldRes = await uploadToCloudinary(file);
      
      if (cldRes && cldRes.success && cldRes.url) {
        notifySelected(cldRes.url);

        // Sync with MongoDB Media Library in background
        try {
          await saveDbMedia({
            filename: file.name,
            url: cldRes.url,
            mimeType: file.type || 'image/jpeg',
            size: file.size,
            altText: file.name
          });
        } catch (dbErr) {
          console.warn('Media library save notice:', dbErr.message);
        }
      } else {
        // Fallback: If direct Cloudinary fails, try via backend server upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('altText', file.name);

        const res = await uploadMedia(formData);
        if (res && res.url) {
          notifySelected(res.url);
        } else {
          throw new Error(cldRes?.error || res?.error || 'Upload failed');
        }
      }
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Error uploading image to Cloudinary');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`image-uploader-container ${className}`}>
      {label && <label className="uploader-label">{label}</label>}
      
      <div className="uploader-preview-area">
        {activeUrl ? (
          <div className="preview-image-wrapper">
            <img src={activeUrl} alt="Preview" className="preview-image" />
            <div className="preview-overlay">
              <button type="button" className="action-btn replace-btn" onClick={triggerFileInput}>
                <Upload size={14} /> Replace
              </button>
              {onRemove && (
                <button type="button" className="action-btn remove-btn" onClick={onRemove}>
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-preview" onClick={triggerFileInput}>
            <ImageIcon size={32} className="text-muted mb-2" />
            <span className="text-muted">No image selected</span>
          </div>
        )}
      </div>

      <div className="uploader-actions">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          style={{ display: 'none' }} 
        />
        <button 
          type="button" 
          className="btn-outline uploader-btn" 
          onClick={triggerFileInput} 
          disabled={isUploading}
        >
          {isUploading ? <Loader2 size={16} className="spin" /> : <Upload size={16} />}
          <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
        </button>
        <button 
          type="button" 
          className="btn-outline uploader-btn" 
          onClick={handleOpenLibrary}
          disabled={isUploading}
        >
          <ImageIcon size={16} />
          <span>Media Library</span>
        </button>
      </div>

      {uploadError && <div className="upload-error text-danger mt-2">{uploadError}</div>}

      {/* Media Library Modal */}
      {isLibraryOpen && (
        <div className="media-modal-backdrop">
          <div className="media-modal">
            <div className="media-modal-header">
              <h3>Select Image from Library</h3>
              <button type="button" className="modal-close-btn" onClick={handleCloseLibrary}>
                <X size={20} />
              </button>
            </div>
            <div className="media-modal-body">
              {isLoadingLibrary ? (
                <div className="modal-loading">
                  <Loader2 size={24} className="spin text-primary" />
                  <span>Loading library...</span>
                </div>
              ) : mediaLibrary.length === 0 ? (
                <div className="modal-empty text-muted">
                  No images found in the library.
                </div>
              ) : (
                <div className="media-grid">
                  {mediaLibrary.map(item => (
                    <div 
                      key={item._id} 
                      className={`media-grid-item ${activeUrl === item.url ? 'selected' : ''}`}
                      onClick={() => handleSelectFromLibrary(item)}
                    >
                      <img src={item.url} alt={item.altText || item.filename} />
                      {activeUrl === item.url && (
                        <div className="selected-indicator">
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
