import React from 'react';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import './AboutClinicIntro.css';

const AboutClinicIntro = () => {
  return (
    <section className="about-intro-section" id="about">
      <div className="about-intro-container">
        <div className="about-intro-card">
          {/* Left Column: Clinic Architectural Interior Image */}
          <div className="about-img-column">
            <img 
              src="/banners/banner-wellness.jpg" 
              alt="Aevora Luxury Aesthetics Clinic Ambiance" 
              className="about-clinic-img"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right Column: Narrative Content */}
          <div className="about-text-column">
            <h2 className="about-intro-title">
              BEST SKIN, HAIR & BODY <span className="gold-accent">AESTHETICS CLINIC IN PANCHKULA</span>
            </h2>

            <p className="about-intro-para">
              At <strong>Aevora by Kian Clinics</strong>, global techniques, advanced technology and clinical expertise come together, shaping results that are precise, considered and distinctly yours.
            </p>

            <p className="about-intro-para">
              Our treatments are selected with care, guided by a deeper understanding of your skin, your needs, your patterns and what will truly make a difference. Our focus is natural-looking results that hold over time, not quick fixes that fade.
            </p>

            <a href="#about-clinic" className="about-readmore-link">
              <span>READ MORE</span>
              <ArrowRight size={16} className="readmore-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClinicIntro;
