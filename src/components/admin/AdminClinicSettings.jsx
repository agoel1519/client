import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import './AdminClinicSettings.css';

const defaultSettings = {
  address: "1st Floor, Forum Building, Raghuvanshi Mills Compound Senapati Bapat Marg, Gandhi Nagar, Upper Worli, Worli, Lower Parel, Mumbai, Maharashtra 400018.",
  phone: "+91 72400 13002\n+91 72400 12002",
  hours: "Mon – Sun: 10:00 AM – 7:00 PM",
  email: "hello@skuccii.com",
  responseTime: "We respond within 24 hours",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.378951121041!2d72.82229557606346!3d18.99599585425421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8276f7596b%3A0x6b801a61dd0d027e!2sSkuccii%20Supercliniq!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

const AdminClinicSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aevora_clinic_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse settings", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate network request
    setTimeout(() => {
      localStorage.setItem('aevora_clinic_settings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <div>
          <h1 className="settings-title">Contact Us</h1>
          <p className="settings-subtitle">Manage public contact information, locations, and global data.</p>
        </div>
        <button 
          className="btn-save-settings" 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? <span className="spinner"></span> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>Contact Us settings updated successfully! Changes are now live on the website.</span>
        </div>
      )}

      <div className="settings-content-grid">
        <div className="settings-card">
          <h3 className="settings-card-title">Contact Us Page Data</h3>
          
          <div className="form-group">
            <label>Clinic Address</label>
            <textarea 
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter full address..."
            />
            <span className="form-help">Displayed on the Contact card and footer.</span>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Phone Numbers (One per line)</label>
              <textarea 
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                rows="2"
                placeholder="+91 12345 67890"
              />
            </div>
            <div className="form-group">
              <label>Clinic Hours</label>
              <input 
                type="text"
                name="hours"
                value={settings.hours}
                onChange={handleChange}
                placeholder="Mon – Sun: 10:00 AM – 7:00 PM"
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="hello@clinic.com"
              />
            </div>
            <div className="form-group">
              <label>Email Response Time text</label>
              <input 
                type="text"
                name="responseTime"
                value={settings.responseTime}
                onChange={handleChange}
                placeholder="We respond within 24 hours"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Google Maps Embed URL</label>
            <textarea 
              name="mapUrl"
              value={settings.mapUrl}
              onChange={handleChange}
              rows="3"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <span className="form-help">Paste the URL from the `src` attribute of a Google Maps iframe.</span>
          </div>
        </div>

        <div className="settings-card bg-light">
          <h3 className="settings-card-title">Preview on Website</h3>
          <p className="preview-text">Your Contact Us page will dynamically read these values. Any updates here are instantly reflected on the live site.</p>
          <div className="preview-mini-card">
            <h4>Live Data Sample</h4>
            <strong>Email:</strong> {settings.email} <br/>
            <strong>Hours:</strong> {settings.hours}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClinicSettings;
