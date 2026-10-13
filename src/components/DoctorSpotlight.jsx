import React, { useState, useEffect } from 'react';
import { ArrowRight, Award, ShieldCheck } from 'lucide-react';
import { getDbSetting } from '../api/mongoApi';
import './DoctorSpotlight.css';

const defaultDoctor = {
  badge: 'FOUNDER & MEDICAL DIRECTOR',
  name: 'DR. MEGHNA',
  nameHighlight: 'MOUR',
  bio: 'With over two decades in aesthetic medicine, our leading doctor brings a depth of experience informed by continuous global training across Europe, Korea and the Middle East.',
  credentials: [
    '20+ Years Global Expertise',
    'Pioneer in Non-Invasive Aesthetics'
  ],
  buttonText: 'KNOW MORE',
  buttonLink: '/about#founding-team',
  image: '/doctors/dr-meghna-mour.jpg'
};

const DoctorSpotlight = () => {
  const [data, setData] = useState(defaultDoctor);

  const loadData = () => {
    getDbSetting('home_page').then((saved) => {
      if (saved && saved.doctorSpotlight) {
        setData(prev => ({ ...prev, ...saved.doctorSpotlight }));
      }
    });
  };

  useEffect(() => {
    loadData();
    window.addEventListener('homeSettingsUpdated', loadData);
    return () => window.removeEventListener('homeSettingsUpdated', loadData);
  }, []);

  return (
    <section className="doctor-spotlight-section" id="experts">
      <div className="doctor-spotlight-container">
        <div className="doctor-spotlight-card">
          {/* Left Column: Doctor Details & Bio */}
          <div className="doctor-info-column">
            <div className="doctor-badge">
              <Award size={14} className="badge-icon" />
              <span>{data.badge}</span>
            </div>

            <h2 className="doctor-name">
              {data.name} <span className="gold-text">{data.nameHighlight}</span>
            </h2>

            <p className="doctor-bio">
              {data.bio}
            </p>

            <div className="doctor-credentials">
              {(data.credentials || []).map((cred, idx) => (
                <div className="cred-item" key={idx}>
                  <ShieldCheck size={16} color="#10b981" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>

            <a href={data.buttonLink || '#about-doctor'} className="doctor-knowmore-btn">
              <span>{data.buttonText || 'KNOW MORE'}</span>
              <ArrowRight size={16} className="btn-arrow" />
            </a>
          </div>

          {/* Right Column: Doctor Portrait */}
          <div className="doctor-image-column">
            <img 
              src={data.image || '/doctors/dr-meghna-mour.jpg'} 
              alt={`${data.name} ${data.nameHighlight} - Profile`} 
              className="doctor-portrait-img"
              loading="lazy"
              decoding="async"
            />
            <div className="doctor-img-gradient"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSpotlight;
