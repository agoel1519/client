import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ConsultationSection from '../ConsultationSection';
import AdminSectionWrapper from '../admin/AdminSectionWrapper';
import { getDbSetting } from '../../api/mongoApi';
import './AboutUs.css';

const defaultAboutSettings = {
  heroTitle: "ABOUT US",
  heroTagline: "DESIGNED BY MEDICINE\nCRAFTED BY TECHNOLOGY\nPAMPERED BY LUXURY",
  introHeading: "We are India’s First Aesthetic Supercliniq",
  introText: "Our body has always defined our sense of self and personal style. From ancient traditions of holistic health and healing to the technologies of today, we have adorned ourselves with jewels, fine fabrics and cosmetics. And yet, nothing compares to the original fashion statement.\n\nLustrous, voluminous hair, radiant, glowing skin, intimate wellbeing and a toned body, fit inside and out.",
  introFooter: "SKUCCII SUPERCLINIQ HAS AN INFINITE LOVE FOR THE HUMAN FORM.",
  teamTitle: "FOUNDING TEAM",
  team: [
    { 
      name: "Dr Misha Goel", 
      role: "Aesthetic Physician • Trained in UK (MBBS, MD, FFAC)", 
      image: "/doctors/dr-misha-goel.jpg" 
    },
    { 
      name: "Dr Anupam Goel", 
      role: "Minimal Access Gastrointestinal, Bariatric & Robotic Surgeon (MBBS, MS, FNB)", 
      image: "/doctors/dr-anupam-goel.jpg" 
    }
  ],
  expTitle: "THE AEVORA EXPERIENCE",
  experience: [
    { title: "HELLO AEVORA", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80", step: "1/" },
    { title: "LET'S BEGIN", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80", step: "2/" },
    { title: "TREATMENT", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80", step: "3/" },
    { title: "AFTERCARE", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80", step: "4/" }
  ],
  galleryTitle: "GALLERY",
  gallery: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
  ]
};

const AboutUs = () => {
  const [settings, setSettings] = useState(defaultAboutSettings);

  const loadAbout = () => {
    getDbSetting('about_page').then((saved) => {
      if (saved) {
        setSettings(prev => ({
          ...defaultAboutSettings,
          ...saved,
          team: (saved.team && saved.team.length > 0) ? saved.team : defaultAboutSettings.team,
          introHeading: saved.introHeading || defaultAboutSettings.introHeading,
          introText: saved.introText || defaultAboutSettings.introText,
          introFooter: saved.introFooter || defaultAboutSettings.introFooter,
        }));
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadAbout();
    window.addEventListener('aboutSettingsUpdated', loadAbout);
    return () => window.removeEventListener('aboutSettingsUpdated', loadAbout);
  }, []);

  return (
    <div className="about-page-container">
      <Header />

      {/* HERO BANNER - MATCHING TREATMENT PAGE LUXURY STYLE */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <p className="about-breadcrumb">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>HOME</Link> / 
            <span style={{ color: '#fff', fontWeight: 600, marginLeft: '6px' }}>ABOUT US</span>
          </p>
          <h1 className="about-hero-title">{settings.heroTitle || "ABOUT US"}</h1>
        </div>
      </section>

      {/* BRAND PHILOSOPHY / MANIFESTO QUOTE CARD (ABOVE FOUNDING TEAM) */}
      <AdminSectionWrapper sectionName="Philosophy / Manifesto" editLink="/admin/about-settings">
        <section className="about-intro-section" id="philosophy">
          <div className="about-intro-container">
            <div className="about-intro-box">
              <span className="about-quote-mark" aria-hidden="true">“</span>
              
              <h2 className="about-intro-heading">
                {settings.introHeading || defaultAboutSettings.introHeading}
              </h2>

              <div className="about-intro-content">
                {(() => {
                  const text = settings.introText || defaultAboutSettings.introText;
                  const paragraphs = text.includes('\n\n') ? text.split('\n\n') : text.split('\n');
                  return paragraphs.map((paragraph, idx) => {
                    const clean = paragraph.trim();
                    if (!clean) return null;
                    return (
                      <p key={idx} className="about-intro-text">
                        {clean}
                      </p>
                    );
                  });
                })()}
              </div>

              <div className="about-intro-divider"></div>

              <p className="about-intro-footer">
                {settings.introFooter || defaultAboutSettings.introFooter}
              </p>
            </div>
          </div>
        </section>
      </AdminSectionWrapper>

      {/* FOUNDING TEAM */}
      <AdminSectionWrapper sectionName="Founding Team" editLink="/admin/about-settings">
        <section className="about-team-section" id="founding-team">
          <h2 className="section-title text-center">{settings.teamTitle}</h2>
          <div className="team-grid">
            {settings.team.map((member, idx) => (
              <div className="team-member-card" key={idx}>
                <div className="team-member-img">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AdminSectionWrapper>

      <ConsultationSection />

      <Footer />
    </div>
  );
};

export default AboutUs;
