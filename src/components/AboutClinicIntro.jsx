import React, { useState, useEffect } from 'react';
import { getDbSetting } from '../api/mongoApi';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Globe, 
  Calendar 
} from 'lucide-react';
import './AboutClinicIntro.css';

export const defaultAboutClinic = {
  badge: "AEVORA by Kian Clinics",
  pillars: [
    "Clinical Aesthetics",
    "Weight-loss & Body Sculpting",
    "Longevity & Wellness",
    "Regenerative Gastro Care"
  ],
  tagline: "Where Science Sculpts Confidence",
  philosophyTitle: "The Philosophy of Aevum",
  philosophyText: "Aevora is inspired by the Latin concept of Aevum—a timeless state between youth and eternity. It embodies our philosophy of helping you age intelligently through advanced aesthetic medicine, longevity medicine, regenerative therapies, and evidence-based wellness.",
  clinicName: "Aevora Clinics",
  address: "SCO 205 FF, Sector 5, Panchkula – 134114",
  phone: "+91 97797 66933",
  website: "www.Aevoraclinics.com",
  buttonText: "Book Appointment",
  buttonLink: "#book"
};

const AboutClinicIntro = () => {
  const [content, setContent] = useState(defaultAboutClinic);

  const loadContent = () => {
    getDbSetting('home_page').then((saved) => {
      if (saved && saved.aboutClinic) {
        setContent(prev => ({
          ...prev,
          ...saved.aboutClinic,
          pillars: Array.isArray(saved.aboutClinic.pillars) 
            ? saved.aboutClinic.pillars 
            : (typeof saved.aboutClinic.pillars === 'string' 
                ? saved.aboutClinic.pillars.split('•').map(p => p.trim()).filter(Boolean)
                : prev.pillars)
        }));
      }
    });
  };

  useEffect(() => {
    loadContent();
    window.addEventListener('homeSettingsUpdated', loadContent);
    return () => window.removeEventListener('homeSettingsUpdated', loadContent);
  }, []);

  const pillarsList = Array.isArray(content.pillars) && content.pillars.length > 0 
    ? content.pillars 
    : defaultAboutClinic.pillars;

  return (
    <section className="about-intro-section" id="about">
      <div className="about-intro-container">
        <div className="about-intro-card about-intro-card-clean">
          {/* Narrative Content & Clinic Details */}
          <div className="about-text-column about-text-column-full">
            
            {/* Top Brand Eyebrow */}
            <div className="about-brand-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">{content.badge || defaultAboutClinic.badge}</span>
            </div>

            {/* Specialties / Pillars Strip */}
            <div className="about-pillars-strip">
              {pillarsList.map((pillar, idx) => (
                <span key={idx} className="pillar-tag">
                  {pillar}
                </span>
              ))}
            </div>

            {/* Main Tagline */}
            <h2 className="about-tagline-heading">
              {content.tagline || defaultAboutClinic.tagline}
            </h2>

            {/* Philosophy Text */}
            <div className="about-philosophy-box">
              <p className="about-philosophy-para">
                {content.philosophyText || defaultAboutClinic.philosophyText}
              </p>
            </div>

            {/* Quick Clinic Contact Strip */}
            <div className="about-clinic-details-grid">
              <div className="clinic-detail-item">
                <MapPin size={18} className="detail-icon" />
                <div>
                  <span className="detail-label">Clinic Address</span>
                  <span className="detail-value">{content.address || defaultAboutClinic.address}</span>
                </div>
              </div>

              <div className="clinic-detail-item">
                <Phone size={18} className="detail-icon" />
                <div>
                  <span className="detail-label">Appointment Line</span>
                  <a href={`tel:${(content.phone || defaultAboutClinic.phone).replace(/\s+/g, '')}`} className="detail-link">
                    {content.phone || defaultAboutClinic.phone}
                  </a>
                </div>
              </div>

              <div className="clinic-detail-item">
                <Globe size={18} className="detail-icon" />
                <div>
                  <span className="detail-label">Official Website</span>
                  <a href={`https://${content.website || defaultAboutClinic.website}`} target="_blank" rel="noreferrer" className="detail-link">
                    {content.website || defaultAboutClinic.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="about-cta-row">
              <a href={content.buttonLink || defaultAboutClinic.buttonLink} className="about-book-btn">
                <Calendar size={16} />
                <span>{content.buttonText || defaultAboutClinic.buttonText}</span>
              </a>

              <a href={`tel:${(content.phone || defaultAboutClinic.phone).replace(/\s+/g, '')}`} className="about-call-btn">
                <Phone size={16} />
                <span>Call Concierge</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClinicIntro;
