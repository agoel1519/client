import React, { useState, useEffect } from 'react';
import { getDbSetting } from '../../api/mongoApi';
import './ContactUs.css';
import Header from '../Header';
import Footer from '../Footer';
import { MapPin, Phone, Mail } from 'lucide-react';

export const DEFAULT_AEVORA_MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27451.450192191256!2d76.84114488101572!3d30.678139625046214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93cadd2281e5%3A0x154181fc7bda7840!2sAevora%20by%20Kian%20Clinics!5e0!3m2!1sen!2sin!4v1792574171994!5m2!1sen!2sin";

export const getCleanMapUrl = (raw) => {
  if (!raw || typeof raw !== 'string') return DEFAULT_AEVORA_MAP_EMBED;
  const trimmed = raw.trim();
  if (!trimmed) return DEFAULT_AEVORA_MAP_EMBED;

  // 1. If it's a full <iframe> snippet, extract src="..."
  const iframeMatch = trimmed.match(/src\s*=\s*["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }

  // 2. Remove accidental quotes
  const unquoted = trimmed.replace(/^["']|["']$/g, '');

  // 3. Valid embed URL
  if (unquoted.includes('google.com/maps/embed')) {
    return unquoted;
  }

  // 4. Shortlink or direct link fallback
  if (unquoted.includes('maps.app.goo.gl') || unquoted.includes('google.com/maps')) {
    return DEFAULT_AEVORA_MAP_EMBED;
  }

  return unquoted || DEFAULT_AEVORA_MAP_EMBED;
};

const defaultSettings = {
  heroTitle: "CONTACT US",
  heroSubtitle: "We'd love to hear from you",
  formEyebrow: "GET IN TOUCH",
  formHeading: "Book Your Consultation",
  clinicName: "Aevora By Kian Clinics",
  address: "SCO 205 FF, Sector 5, Panchkula – 134114",
  phone: "+91 97797 66933",
  hours: "Mon – Sat: 10:00 AM – 8:00 PM | Sun: By Appointment",
  email: "contact@aevoraclinics.com",
  responseTime: "We respond within 24 hours",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27451.450192191256!2d76.84114488101572!3d30.678139625046214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93cadd2281e5%3A0x154181fc7bda7840!2sAevora%20by%20Kian%20Clinics!5e0!3m2!1sen!2sin!4v1792574171994!5m2!1sen!2sin"
};

const ContactUs = () => {
  const [settings, setSettings] = useState(defaultSettings);

  const loadSettings = () => {
    getDbSetting('clinic_settings').then((saved) => {
      if (saved) {
        setSettings(prev => ({
          ...prev,
          ...saved,
          clinicName: (saved.clinicName && !saved.clinicName.toLowerCase().includes('sanctuary')) ? saved.clinicName : "Aevora By Kian Clinics",
          address: (saved.address && !saved.address.includes('SCO 14-15')) ? saved.address : "SCO 205 FF, Sector 5, Panchkula – 134114",
          phone: (saved.phone && !saved.phone.includes('0172')) ? saved.phone : "+91 97797 66933",
          email: (saved.email && !saved.email.includes('concierge@')) ? saved.email : "contact@aevoraclinics.com"
        }));
      } else {
        const legacy = localStorage.getItem('aevora_clinic_settings');
        if (legacy) {
          try {
            setSettings(prev => ({ ...prev, ...JSON.parse(legacy) }));
          } catch (e) {}
        }
      }
    }).catch(() => {});
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadSettings();
    window.addEventListener('clinicSettingsUpdated', loadSettings);
    return () => window.removeEventListener('clinicSettingsUpdated', loadSettings);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your enquiry has been sent to our medical concierge.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page-container">
      <Header />
      
      {/* Top Hero Banner */}
      <div className="contact-header-section">
        <h1 className="contact-page-title">{settings.heroTitle || "CONTACT US"}</h1>
        <p className="contact-page-subtitle">{settings.heroSubtitle || "We'd love to hear from you"}</p>
      </div>

      <div className="contact-main-wrapper">
        {/* Top Cards Section */}
        <section className="contact-cards-section">
          <div className="contact-cards-grid">
            <div className="contact-card">
              <div className="contact-icon-circle">
                <MapPin size={24} />
              </div>
              <h3 className="contact-card-title">VISIT US</h3>
              <p className="contact-card-text">
                {settings.address.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon-circle">
                <Phone size={24} />
              </div>
              <h3 className="contact-card-title">CALL US</h3>
              <p className="contact-card-text">
                {settings.phone.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
                <span className="contact-card-subtext">{settings.hours}</span>
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon-circle">
                <Mail size={24} />
              </div>
              <h3 className="contact-card-title">EMAIL US</h3>
              <p className="contact-card-text">
                {settings.email}<br/>
                <span className="contact-card-subtext">{settings.responseTime}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Form and Map Section */}
        <section className="contact-form-map-section">
          <div className="contact-form-map-container">
            {/* Form Column */}
            <div className="contact-form-col">
              <div className="contact-section-header">
                <span className="contact-eyebrow"><span className="contact-dash"></span> {settings.formEyebrow || "GET IN TOUCH"}</span>
                <h2 className="contact-heading">{settings.formHeading || "Book Your Consultation"}</h2>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Name *" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-input"
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email *" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
                <div className="contact-form-row">
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone *" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
                <div className="contact-form-row">
                  <textarea 
                    name="message" 
                    placeholder="Your inquiry or consultation request..." 
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-textarea"
                  ></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">SEND ENQUIRY</button>
              </form>
            </div>

            {/* Map Column */}
            <div className="contact-map-col">
              <div className="contact-map-wrapper">
                <iframe 
                  src={getCleanMapUrl(settings.mapUrl)} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Clinic Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
