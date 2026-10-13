import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertTriangle, MapPin, Phone, Mail, Clock, Map, Sparkles } from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import './AdminClinicSettings.css';

const defaultSettings = {
  heroTitle: "CONTACT US",
  heroSubtitle: "We'd love to hear from you",
  formEyebrow: "GET IN TOUCH",
  formHeading: "Book Your Consultation",
  clinicName: "Aevora Clinics",
  address: "SCO 205 FF, Sector 5, Panchkula – 134114",
  phone: "+91 97797 66933",
  whatsapp: "+91 97797 66933",
  hours: "Mon – Sat: 10:00 AM – 8:00 PM | Sun: By Appointment",
  email: "concierge@aevoraclinics.com",
  website: "www.Aevoraclinics.com",
  responseTime: "We respond within 24 hours",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.722513470659!2d76.84852927647248!3d30.697334788975395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f937248b1111b%3A0x6b801a61dd0d027e!2sSector%205%2C%20Panchkula%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
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
            clinicName: saved.clinicName || "Aevora Clinics",
            address: (saved.address && !saved.address.includes('SCO 14-15')) ? saved.address : "SCO 205 FF, Sector 5, Panchkula – 134114",
            phone: (saved.phone && !saved.phone.includes('0172')) ? saved.phone : "+91 97797 66933",
            whatsapp: (saved.whatsapp && !saved.whatsapp.includes('98765 43210')) ? saved.whatsapp : "+91 97797 66933"
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
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveDbSetting('clinic_settings', settings);
      localStorage.setItem('aevora_clinic_settings', JSON.stringify(settings));
      window.dispatchEvent(new Event('clinicSettingsUpdated'));

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
          <h3 className="settings-card-title">Sanctuary Location &amp; Hours</h3>
          
          <div className="form-group">
            <label>Flagship Sanctuary Label</label>
            <input 
              type="text"
              name="clinicName"
              value={settings.clinicName || "Panchkula Flagship Sanctuary"}
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
                placeholder="concierge@aevoraclinics.com"
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

          <div className="form-group">
            <label>Google Maps Embed URL</label>
            <textarea 
              name="mapUrl"
              value={settings.mapUrl}
              onChange={handleChange}
              rows="3"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <span className="form-help">Paste the URL directly from the `src` attribute of Google Maps embed iframe.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClinicSettings;
