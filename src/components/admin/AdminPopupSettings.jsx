import React, { useState, useEffect } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Eye, 
  MessageCircle, 
  Sparkles, 
  Image as ImageIcon,
  Phone,
  MessageSquare
} from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import { defaultPopupSettings } from '../../data/defaultPopupSettings';
import ImageUploader from './ImageUploader';
import './AdminPopupSettings.css';

const AdminPopupSettings = () => {
  const [settings, setSettings] = useState(defaultPopupSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch saved settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const saved = await getDbSetting('site_popup_settings');
        if (saved && typeof saved === 'object') {
          setSettings(prev => ({
            ...prev,
            ...saved,
            imageUrl: saved.imageUrl || (Array.isArray(saved.images) && saved.images[0]?.url) || prev.imageUrl
          }));
        }
      } catch (err) {
        console.error("Failed to load popup settings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);

    try {
      await saveDbSetting('site_popup_settings', settings);

      // Dispatch global event for live preview in the app
      window.dispatchEvent(new CustomEvent('aevora_popup_settings_updated', {
        detail: settings
      }));

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
    } catch (err) {
      console.error("Failed to save popup settings:", err);
      alert("Error saving popup settings: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const triggerLivePreview = () => {
    window.dispatchEvent(new CustomEvent('aevora_open_popup_preview', {
      detail: settings
    }));
  };

  if (isLoading) {
    return (
      <div className="admin-popup-loading">
        <div className="loading-spinner" />
        <p>Loading Popup Settings...</p>
      </div>
    );
  }

  const currentImg = settings.imageUrl || defaultPopupSettings.imageUrl;

  return (
    <div className="admin-popup-wrapper">
      {/* Header Bar */}
      <div className="admin-popup-header">
        <div className="header-left">
          <div className="header-badge">
            <Sparkles size={14} /> SIMPLE PROMO POPUP
          </div>
          <h1>Promotional Popup Manager</h1>
          <p>Admin image upload karein aur uske niche WhatsApp Now ka button automatically show hoga.</p>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            className="btn-preview-trigger"
            onClick={triggerLivePreview}
          >
            <Eye size={17} /> Test Popup Preview
          </button>

          <button 
            type="button" 
            className="btn-save-popup"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>Saving...</>
            ) : showSuccess ? (
              <><CheckCircle2 size={18} /> Saved Successfully!</>
            ) : (
              <><Save size={18} /> Save Settings</>
            )}
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="save-success-banner">
          <CheckCircle2 size={20} />
          <span>Popup settings successfully updated! Changes are live on the website.</span>
        </div>
      )}

      {/* Main Grid: Settings on Left, Live Preview on Right */}
      <div className="admin-popup-grid">
        {/* Left Column: Form Settings */}
        <div className="admin-popup-form-col">
          {/* Status Switch */}
          <div className="admin-popup-card">
            <div className="popup-card-header">
              <h2>Popup Status</h2>
              <span className="card-subtitle">Website par popup enable ya disable karein</span>
            </div>

            <div className="status-toggle-row">
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="enabled" 
                  checked={settings.enabled} 
                  onChange={handleChange}
                />
                <span className="slider round" />
              </label>
              <div className="status-info">
                <strong>{settings.enabled ? 'Popup is Active' : 'Popup is Disabled'}</strong>
                <span>{settings.enabled ? 'Visitors will see the popup when visiting the website.' : 'Popup is currently hidden from visitors.'}</span>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="admin-popup-card">
            <div className="popup-card-header">
              <div className="flex-title">
                <ImageIcon size={20} className="header-icon" />
                <h2>1. Upload Popup Image</h2>
              </div>
              <span className="card-subtitle">Yahan apni promotion ya announcement ki banner image upload karein</span>
            </div>

            <div className="popup-card-body">
              <ImageUploader 
                currentUrl={settings.imageUrl}
                onSelect={(url) => setSettings(prev => ({ ...prev, imageUrl: url }))}
                label="Promotional Banner Image"
              />
              
              <div className="tip-box">
                <Sparkles size={15} />
                <span>Recommended size: 600x600px (Square) ya 600x800px (Portrait) for crystal-clear mobile display.</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Button Configuration */}
          <div className="admin-popup-card">
            <div className="popup-card-header">
              <div className="flex-title">
                <MessageCircle size={20} className="header-icon whatsapp-accent" />
                <h2>2. WhatsApp Button Settings</h2>
              </div>
              <span className="card-subtitle">Image ke niche aane wale WhatsApp button ki details</span>
            </div>

            <div className="popup-card-body">
              <div className="form-group">
                <label>
                  <Phone size={15} /> WhatsApp Phone Number (with Country Code)
                </label>
                <input 
                  type="text" 
                  name="whatsappNumber" 
                  value={settings.whatsappNumber || ''} 
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="form-input"
                />
                <span className="input-hint">Example: +91 98765 43210 ya 919876543210</span>
              </div>

              <div className="form-group">
                <label>
                  <MessageSquare size={15} /> Button Text
                </label>
                <input 
                  type="text" 
                  name="buttonText" 
                  value={settings.buttonText || ''} 
                  onChange={handleChange}
                  placeholder="WhatsApp Now"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Pre-filled WhatsApp Message</label>
                <textarea 
                  name="whatsappMessage" 
                  rows={3}
                  value={settings.whatsappMessage || ''} 
                  onChange={handleChange}
                  placeholder="Hi Aevora, I am interested in your special offer and would like to know more."
                  className="form-textarea"
                />
                <span className="input-hint">Jab visitor button par click karega toh ye message automatically type hokar aayega.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Visual Preview */}
        <div className="admin-popup-preview-col">
          <div className="admin-popup-card preview-sticky-card">
            <div className="popup-card-header">
              <div className="flex-title">
                <Eye size={18} />
                <h2>Live Popup Preview</h2>
              </div>
              <span className="card-subtitle">Website par popup bilkul aisa dikhega:</span>
            </div>

            <div className="popup-mockup-wrapper">
              <div className="mockup-popup-box">
                {/* Mockup Close Button */}
                <div className="mockup-close-btn">✕</div>

                {/* Mockup Image */}
                <div className="mockup-img-container">
                  <img 
                    src={currentImg} 
                    alt="Preview Banner" 
                    className="mockup-img"
                  />
                </div>

                {/* Mockup WhatsApp Button */}
                <div className="mockup-action-bar">
                  <button type="button" className="mockup-whatsapp-btn" onClick={triggerLivePreview}>
                    <MessageCircle size={18} />
                    <span>{settings.buttonText || 'WhatsApp Now'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="preview-action-footer">
              <button 
                type="button" 
                className="btn-open-live-modal"
                onClick={triggerLivePreview}
              >
                <Eye size={16} /> Open Full Screen Live Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPopupSettings;
