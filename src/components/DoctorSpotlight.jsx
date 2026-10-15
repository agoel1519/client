import React from 'react';
import { ArrowRight, Award, ShieldCheck } from 'lucide-react';
import './DoctorSpotlight.css';

const DoctorSpotlight = () => {
  return (
    <section className="doctor-spotlight-section" id="experts">
      <div className="doctor-spotlight-container">
        <div className="doctor-spotlight-card">
          {/* Left Column: Doctor Details & Bio */}
          <div className="doctor-info-column">
            <div className="doctor-badge">
              <Award size={14} className="badge-icon" />
              <span>FOUNDER & MEDICAL DIRECTOR</span>
            </div>

            <h2 className="doctor-name">
              DR. MEGHNA <span className="gold-text">MOUR</span>
            </h2>

            <p className="doctor-bio">
              With over two decades in aesthetic medicine, our leading doctor brings a depth of experience informed by continuous global training across Europe, Korea and the Middle East.
            </p>

            <div className="doctor-credentials">
              <div className="cred-item">
                <ShieldCheck size={16} color="#10b981" />
                <span>20+ Years Global Expertise</span>
              </div>
              <div className="cred-item">
                <ShieldCheck size={16} color="#10b981" />
                <span>Pioneer in Non-Invasive Aesthetics</span>
              </div>
            </div>

            <a href="#about-doctor" className="doctor-knowmore-btn">
              <span>KNOW MORE</span>
              <ArrowRight size={16} className="btn-arrow" />
            </a>
          </div>

          {/* Right Column: Doctor Portrait */}
          <div className="doctor-image-column">
            <img 
              src="/doctors/dr-meghna-mour.jpg" 
              alt="Doctor Profile - Founder & Medical Director at Aevora" 
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
