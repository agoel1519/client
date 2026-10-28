import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertTriangle, MapPin, Phone, Mail, Clock, Map } from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import { getCleanMapUrl, DEFAULT_AEVORA_MAP_EMBED } from '../pages/ContactUs';
import './AdminClinicSettings.css';

const defaultSettings = {
  heroTitle: "CONTACT US",
  heroSubtitle: "We'd love to hear from you",
  formEyebrow: "GET IN TOUCH",
  formHeading: "Book Your Consultation",
  clinicName: "Aevora By Kian Clinics",
  address: "SCO 205 FF, Sector 5, Panchkula – 134114",
  phone: "+91 97797 66933",
  whatsapp: "+91 97797 66933",
  hours: "Mon – Sat: 10:00 AM – 8:00 PM | Sun: By Appointment",
  email: "contact@aevoraclinics.com",
  website: "www.Aevoraclinics.com",
  responseTime: "We respond within 24 hours",
  mapUrl: DEFAULT_AEVORA_MAP_EMBED,
  expandingCities: "Chandigarh, Mohali, Delhi NCR"
};

const AdminClinicSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const saved = await getDbSetting('clinic_settings');
        if (saved) {
          setSettings(prev => ({
            ...prev,
            ...saved,
            clinicName: saved.clinicName || prev.clinicName || "Aevora By Kian Clinics",
            address: saved.address || prev.address || "SCO 205 FF, Sector 5, Panchkula – 134114",
            phone: saved.phone || prev.phone || "+91 97797 66933",
            whatsapp: saved.whatsapp || prev.whatsapp || "+91 97797 66933",
            email: saved.email || prev.email || "contact@aevoraclinics.com"
          }));
        } else {
          const legacy = localStorage.getItem('aevora_clinic_settings');
          if (legacy) {
            try {
              setSettings(prev => ({ ...prev, ...JSON.parse(legacy) }));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.error("Could not parse settings", err);
      }
    };

    fetchSettings();
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mapUrl') {
      const clean = getCleanMapUrl(value);
      setSettings(prev => ({ ...prev, [name]: clean }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const settingsToSave = {
      ...settings,
      mapUrl: getCleanMapUrl(settings.mapUrl)
    };
    try {
      const res = await saveDbSetting('clinic_settings', settingsToSave);
      localStorage.setItem('aevora_clinic_settings', JSON.stringify(settingsToSave));
      window.dispatchEvent(new Event('clinicSettingsUpdated'));
      setSettings(settingsToSave);

      if (res && res.offline) {
        showToast("Saved locally in cache! (Backend will sync on port 5001)");
      } else {
        showToast("Clinic & Contact settings published live to website!");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving clinic settings.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-settings-container">
      {notification && (
        <div className={`settings-success-banner ${notification.type === 'error' ? 'error' : ''}`} style={{ marginBottom: '20px' }}>
          {notification.type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
          <span>{notification.msg}</span>
        </div>
      )}

      <div className="settings-header">
        <div>
          <h1 className="settings-title">Contact &amp; Clinic Sanctuary Settings</h1>
          <p className="settings-subtitle">Manage public contact details, hours, address, Google Maps, and enquiry texts.</p>
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

      <div className="settings-content-grid">
        <div className="settings-card">
          <h3 className="settings-card-title">Hero Banner &amp; Form Headings</h3>
          <div className="form-group-row">
            <div className="form-group">
              <label>Hero Page Title</label>
              <input 
                type="text" 
                name="heroTitle" 
                value={settings.heroTitle || "CONTACT US"} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Hero Subtitle</label>
              <input 
                type="text" 
                name="heroSubtitle" 
                value={settings.heroSubtitle || "We'd love to hear from you"} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Form Eyebrow Tag</label>
              <input 
                type="text" 
                name="formEyebrow" 
                value={settings.formEyebrow || "GET IN TOUCH"} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Form Main Heading</label>
              <input 
                type="text" 
                name="formHeading" 
                value={settings.formHeading || "Book Your Consultation"} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h3 className="settings-card-title">Clinic Location &amp; Hours</h3>
          
          <div className="form-group">
            <label>Clinic Label</label>
            <input 
              type="text"
              name="clinicName"
              value={settings.clinicName || "Aevora By Kian Clinics"}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Clinic Full Physical Address</label>
            <textarea 
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter full address..."
            />
            <span className="form-help">Displayed on Contact Us card, Footer, and Appointment concierge blocks.</span>
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
              <label>WhatsApp Number</label>
              <input 
                type="text"
                name="whatsapp"
                value={settings.whatsapp || ""}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Clinic Operating Hours</label>
              <input 
                type="text" 
                name="hours"
                value={settings.hours}
                onChange={handleChange}
                placeholder="Mon – Sat: 10:00 AM – 8:00 PM | Sun: By Appointment"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="contact@aevoraclinics.com"
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Email Response Time Guarantee</label>
              <input 
                type="text"
                name="responseTime"
                value={settings.responseTime}
                onChange={handleChange}
                placeholder="We respond within 24 hours"
              />
            </div>
            <div className="form-group">
              <label>Expanding Destination Cities (Comma separated)</label>
              <input 
                type="text"
                name="expandingCities"
                value={settings.expandingCities || "Chandigarh, Mohali, Delhi NCR"}
                onChange={handleChange}
                placeholder="Chandigarh, Mohali, Delhi NCR"
              />
            </div>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Google Maps Embed URL or &lt;iframe&gt; code</span>
              <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
                ✓ Auto-extracts &lt;iframe&gt; or URL
              </span>
            </label>
            <textarea 
              name="mapUrl"
              value={settings.mapUrl}
              onChange={handleChange}
              rows="3"
              placeholder="Paste full <iframe src=...></iframe> or https://www.google.com/maps/embed?..."
            />
            <span className="form-help">
              Aap directly Google Maps ka pura &lt;iframe&gt; embed code ya embed link yaha paste kar sakte hain. System automatically clean embed link extract kar leta hai.
            </span>

            {/* Live Map Preview */}
            {settings.mapUrl && (
              <div style={{ marginTop: '14px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '9px 14px', fontSize: '13px', fontWeight: 600, color: '#0f172a', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="#059669" />
                  <span>Live Map Preview — Aevora by Kian Clinics</span>
                </div>
                <iframe 
                  src={getCleanMapUrl(settings.mapUrl)} 
                  width="100%" 
                  height="260" 
                  style={{ border: 0, display: 'block' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Admin Clinic Map Preview"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClinicSettings;
