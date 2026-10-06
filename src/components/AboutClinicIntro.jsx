import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import './AboutClinicIntro.css';

const defaultAbout = {
  title: 'BEST SKIN, HAIR & BODY',
  titleHighlight: 'AESTHETICS CLINIC IN PANCHKULA',
  para1: 'At Aevora by Kian Clinics, global techniques, advanced technology and clinical expertise come together, shaping results that are precise, considered and distinctly yours.',
  para2: 'Our treatments are selected with care, guided by a deeper understanding of your skin, your needs, your patterns and what will truly make a difference. Our focus is natural-looking results that hold over time, not quick fixes that fade.',
  image: '/banners/banner-wellness.jpg'
};

const AboutClinicIntro = () => {
  const [content, setContent] = useState(defaultAbout);

  useEffect(() => {
    const saved = localStorage.getItem('aevora_home_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.aboutClinic) {
          setContent(parsed.aboutClinic);
        }
      } catch (e) {}
    }
  }, []);

  return (
    <section className="about-intro-section" id="about">
      <div className="about-intro-container">
        <div className="about-intro-card">
          {/* Left Column: Clinic Architectural Interior Image */}
          <div className="about-img-column">
            <img 
              src={content.image} 
              alt="Aevora Luxury Aesthetics Clinic Ambiance" 
              className="about-clinic-img"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right Column: Narrative Content */}
          <div className="about-text-column">
            <h2 className="about-intro-title">
              {content.title} <span className="gold-accent">{content.titleHighlight}</span>
            </h2>

            <p className="about-intro-para">
              {content.para1}
            </p>

            <p className="about-intro-para">
              {content.para2}
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
