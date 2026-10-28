import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ConsultationSection from '../ConsultationSection';
import { getDbSetting } from '../../api/mongoApi';
import './Experts.css';

export const defaultExpertsSettings = {
  groupPhoto: "/doctors/team-group-banner.jpg",
  sectionTitle: "OUR TEAM OF SPECIALISTS",
  sectionIntro: "Led by a team of highly qualified medical practitioners who are brilliant in their fields and dedicated to providing you with the personalized care you deserve.",
  experts: [
    { 
      name: "Dr. Meghna Mour", 
      role: "FOUNDER & MEDICAL HEAD", 
      exp: "23+ Years Experience", 
      image: "/celebrities/celeb-3.jpg" 
    },
    { 
      name: "Dr. Harish Balaji", 
      role: "DERMATOLOGIST & HAIR TRANSPLANT SURGEON", 
      exp: "10+ Years Experience", 
      image: "/celebrities/celeb-3.jpg" 
    },
    { 
      name: "Dr. Meghna Singh", 
      role: "MD DERMATOLOGY, VENEREOLOGY & LEPROSY", 
      exp: "6+ Years Experience", 
      image: "/celebrities/celeb-3.jpg" 
    },
    { 
      name: "Dr. Prachi Zawar", 
      role: "DERMATOLOGIST & VENEREOLOGIST", 
      exp: "3+ Years Experience", 
      image: "/celebrities/celeb-3.jpg" 
    }
  ]
};

const Experts = () => {
  const [settings, setSettings] = useState(defaultExpertsSettings);

  const loadData = () => {
    getDbSetting('experts_settings').then((saved) => {
      if (saved && saved.experts && saved.experts.length > 0) {
        setSettings({
          heroTitle: saved.heroTitle || defaultExpertsSettings.heroTitle,
          heroSubtitle: saved.heroSubtitle || defaultExpertsSettings.heroSubtitle,
          groupPhoto: saved.groupPhoto || defaultExpertsSettings.groupPhoto,
          sectionTitle: saved.sectionTitle || defaultExpertsSettings.sectionTitle,
          sectionIntro: saved.sectionIntro || defaultExpertsSettings.sectionIntro,
          experts: Array.isArray(saved.experts) && saved.experts.length > 0
            ? saved.experts.map(e => ({
                ...e,
                image: e.image || '/doctors/dr-meghna-mour.jpg'
              }))
            : defaultExpertsSettings.experts
        });
      } else {
        const legacy = localStorage.getItem('aevora_experts_settings');
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            if (parsed && parsed.experts && parsed.experts.length > 0) {
              setSettings({ ...defaultExpertsSettings, ...parsed });
              return;
            }
          } catch (e) {}
        }
        setSettings(defaultExpertsSettings);
      }
    }).catch(() => {
      setSettings(defaultExpertsSettings);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    window.addEventListener('expertsSettingsUpdated', loadData);
    return () => {
      window.removeEventListener('expertsSettingsUpdated', loadData);
    };
  }, []);

  return (
    <div className="experts-page-container">
      <Header />

      {/* TOP HERO HEADER BANNER (MATCHING CONTACT US) */}
      <div className="experts-header-banner">
        <h1 className="experts-page-title">{settings.heroTitle || "OUR EXPERTS"}</h1>
        <p className="experts-page-subtitle">{settings.heroSubtitle || "Accomplished specialists dedicated to your care"}</p>
      </div>

      {/* 1. TOP FULL-WIDTH TEAM BANNER */}
      {settings.groupPhoto && (
        <section className="experts-full-banner-section">
          <img 
            src={settings.groupPhoto} 
            alt="Aevora Medical Experts Team" 
            className="experts-full-banner-img"
          />
        </section>
      )}

      {/* 2. OUR TEAM OF SPECIALISTS SECTION */}
      <section className="experts-team-section" id="specialists">
        <div className="experts-team-container">
          
          <div className="experts-header-block">
            <h1 className="experts-section-title">
              {settings.sectionTitle || "OUR TEAM OF SPECIALISTS"}
            </h1>
            <p className="experts-section-intro">
              {settings.sectionIntro || "Led by a team of highly qualified medical practitioners who are brilliant in their fields and dedicated to providing you with the personalized care you deserve."}
            </p>
          </div>

          {/* 4-COLUMN CARDS GRID */}
          <div className="experts-grid">
            {settings.experts.map((expert, idx) => (
              <div className="expert-card" key={idx}>
                <div className="expert-img-wrapper">
                  <img 
                    src={expert.image || '/doctors/dr-meghna-mour.jpg'} 
                    alt={expert.name} 
                    loading="lazy"
                  />
                </div>
                <div className="expert-info">
                  <h3 className="expert-name">{expert.name}</h3>
                  <p className="expert-role">{expert.role}</p>
                  {expert.exp && (
                    <p className="expert-exp">{expert.exp}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. LUXURY CONSULTATION SECTION BEFORE FOOTER */}
      <ConsultationSection 
        id="appointment"
        title="BOOK YOUR CONSULTATION"
        subtitle="Schedule a personalized consultation with our senior medical specialists and aesthetic physicians."
      />

      <Footer />
    </div>
  );
};

export default Experts;
