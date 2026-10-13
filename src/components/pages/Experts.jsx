import React, { useState, useEffect } from 'react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import Header from '../Header';
import Footer from '../Footer';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import './Experts.css';

const Experts = () => {
  const [settings, setSettings] = useState({
    heroTitle: "OUR EXPERTS",
    heroSubtitle: "Accomplished specialists dedicated to your care",
    groupPhoto: "",
    sectionTitle: "OUR TEAM OF SPECIALISTS",
    sectionIntro: "Led by a team of highly qualified medical practitioners who are brilliant in their fields and dedicated to providing you with the personalized care you deserve.",
    experts: [
      { 
        name: "Dr Misha Goel", 
        role: "Aesthetic Physician • Trained in UK", 
        exp: "MBBS, MD, FFAC", 
        image: "/doctors/dr-misha-goel.jpg" 
      },
      { 
        name: "Dr Anupam Goel", 
        role: "Minimal Access Gastrointestinal, Bariatric (Weight-loss) & Robotic Surgeon", 
        exp: "MBBS, MS, FNB", 
        image: "/doctors/dr-anupam-goel.jpg" 
      }
    ]
  });

  const [clinicInfo, setClinicInfo] = useState({
    address: "SCO 205 FF, Sector 5, Panchkula – 134114",
    phone: "+91 97797 66933",
    email: "concierge@aevoraclinics.com"
  });

  const loadData = () => {
    getDbSetting('experts_settings').then((saved) => {
      if (saved) {
        const hasLegacy = saved.experts && saved.experts.some(e => e.name && (e.name.includes('Meghna Mour') || e.name.includes('Harish Balaji')));
        if (hasLegacy) {
          setSettings(prev => ({ ...prev, ...saved, experts: [
            { 
              name: "Dr Misha Goel", 
              role: "Aesthetic Physician • Trained in UK", 
              exp: "MBBS, MD, FFAC", 
              image: "/doctors/dr-misha-goel.jpg" 
            },
            { 
              name: "Dr Anupam Goel", 
              role: "Minimal Access Gastrointestinal, Bariatric (Weight-loss) & Robotic Surgeon", 
              exp: "MBBS, MS, FNB", 
              image: "/doctors/dr-anupam-goel.jpg" 
            }
          ] }));
        } else {
          setSettings(saved);
        }
      }
    });
    getDbSetting('clinic_settings').then((saved) => {
      if (saved) {
        setClinicInfo(saved);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    window.addEventListener('expertsSettingsUpdated', loadData);
    window.addEventListener('clinicSettingsUpdated', loadData);
    return () => {
      window.removeEventListener('expertsSettingsUpdated', loadData);
      window.removeEventListener('clinicSettingsUpdated', loadData);
    };
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', treatment: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Reset form after 5 seconds if desired
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', treatment: '', message: '' });
    }, 5000);
  };

  return (
    <div className="experts-page-container">
      <Header />

      {/* HERO BANNER */}
      <section className="experts-hero">
        <h1 className="experts-hero-title">{settings.heroTitle}</h1>
        <p className="experts-hero-subtitle">{settings.heroSubtitle}</p>
        <div className="experts-breadcrumb">
          <span>HOME</span> &bull; <span>EXPERTS</span>
        </div>
      </section>

      {/* INTRO TEXT */}
      <section className="experts-intro-section">
        <h2 className="experts-section-title">{settings.sectionTitle}</h2>
        <p className="experts-section-text">{settings.sectionIntro}</p>
      </section>

      {/* EXPERTS GRID */}
      <section className="experts-grid-section">
        <div className="experts-grid">
          {settings.experts.map((expert, idx) => (
            <div className="expert-card" key={idx}>
              <div className="expert-img-wrapper">
                <img src={expert.image} alt={expert.name} />
              </div>
              <div className="expert-info">
                <h3>{expert.name}</h3>
                <p className="expert-role">{expert.role}</p>
                <p className="expert-exp">{expert.exp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOK APPOINTMENT SECTION */}
      <section className="dt-appointment-section" id="appointment">
        <div className="dt-app-layout-two-col">
          
          {/* Left Column: Clinic Contact Information */}
          <div className="dt-app-info-col">
            <h2 className="dt-app-heading">BOOK AN APPOINTMENT</h2>

            <div className="dt-app-detail-item">
              <div className="dt-app-detail-icon">
                <MapPin size={20} />
              </div>
              <div className="dt-app-detail-text">
                <h4 className="dt-app-detail-label">VISIT OUR CLINIC</h4>
                <p className="dt-app-detail-val">
                  {clinicInfo.address}
                </p>
              </div>
            </div>

            <div className="dt-app-detail-item">
              <div className="dt-app-detail-icon">
                <Phone size={20} />
              </div>
              <div className="dt-app-detail-text">
                <h4 className="dt-app-detail-label">CALL DIRECTLY</h4>
                <p className="dt-app-detail-val">
                  {clinicInfo.phone.replace(/\n/g, ' | ')}
                </p>
              </div>
            </div>

            <div className="dt-app-detail-item">
              <div className="dt-app-detail-icon">
                <Mail size={20} />
              </div>
              <div className="dt-app-detail-text">
                <h4 className="dt-app-detail-label">EMAIL US</h4>
                <p className="dt-app-detail-val">
                  {clinicInfo.email}
                </p>
              </div>
            </div>

            <div className="dt-app-detail-item">
              <div className="dt-app-detail-icon">
                <Clock size={20} />
              </div>
              <div className="dt-app-detail-text">
                <h4 className="dt-app-detail-label">CLINIC HOURS</h4>
                <p className="dt-app-detail-val">
                  Monday – Sunday: 10:00 AM – 7:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Form Card */}
          <div className="dt-app-form-card">
            {formSubmitted ? (
              <div className="dt-success-box">
                <CheckCircle2 size={46} style={{ color: '#0d382c', marginBottom: '16px' }} />
                <h3 style={{ color: '#0d382c' }}>Appointment Request Received</h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6', marginTop: '10px' }}>
                  Thank you, <strong>{formData.name}</strong>. Our medical team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="dt-booking-clean-form">
                <div className="dt-clean-form-row-2">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name *" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="dt-clean-input"
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email *" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="dt-clean-input"
                  />
                </div>
                
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone Number *" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                  className="dt-clean-input"
                />
                
                <select 
                  name="treatment" 
                  value={formData.treatment}
                  onChange={handleChange}
                  className="dt-clean-input dt-clean-select"
                >
                  <option value="">Select Service / Treatment</option>
                  <option value="skin">Skin Treatments</option>
                  <option value="hair">Hair Transplant / Restoration</option>
                  <option value="body">Body Contouring</option>
                  <option value="consultation">General Consultation</option>
                </select>
                
                <textarea 
                  name="message" 
                  placeholder="Any specific concerns or preferred time?" 
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="dt-clean-input dt-clean-textarea"
                />
                
                <button type="submit" className="dt-clean-submit-btn">
                  Let's Begin
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experts;
