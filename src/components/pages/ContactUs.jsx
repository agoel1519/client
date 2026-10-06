import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import Header from '../Header';
import Footer from '../Footer';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactUs = () => {
  const [settings, setSettings] = useState({
    address: "1st Floor, Forum Building, Raghuvanshi Mills Compound Senapati Bapat Marg, Gandhi Nagar, Upper Worli, Worli, Lower Parel, Mumbai, Maharashtra 400018.",
    phone: "+91 72400 13002\n+91 72400 12002",
    hours: "Mon – Sun: 10:00 AM – 7:00 PM",
    email: "hello@skuccii.com",
    responseTime: "We respond within 24 hours",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.378951121041!2d72.82229557606346!3d18.99599585425421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8276f7596b%3A0x6b801a61dd0d027e!2sSkuccii%20Supercliniq!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('aevora_clinic_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch(e) {}
    }
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
    alert('Thank you! Your enquiry has been sent.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page-container">
      <Header />
      
      {/* Top Hero Banner */}
      <div className="contact-header-section">
        <h1 className="contact-page-title">CONTACT US</h1>
        <p className="contact-page-subtitle">We'd love to hear from you</p>
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
                <span className="contact-eyebrow"><span className="contact-dash"></span> GET IN TOUCH</span>
                <h2 className="contact-heading">Book Your Consultation</h2>
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
                    placeholder="Message" 
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
                  src={settings.mapUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
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
