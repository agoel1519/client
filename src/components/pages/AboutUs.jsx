import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  const [settings, setSettings] = useState({
    heroTagline: "DESIGNED BY MEDICINE\nCRAFTED BY TECHNOLOGY\nPAMPERED BY LUXURY",
    introHeading: "We are India's Premium Aesthetic Clinic",
    introText: "Our only focus when crafting or rendering any treatment is YOU. Driven by a deep commitment to clinical excellence and cutting-edge aesthetics, we have achieved the perfect synergy between science and art to elevate your natural beauty.",
    introFooter: "AEVORA HAS AN INFINITE LOVE FOR THE HUMAN FORM.",
    teamTitle: "FOUNDING TEAM",
    team: [
      { name: "Dr. Meghna Mour", role: "Co-Founder & Chief Medical Director", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" },
      { name: "Karan Rekhi", role: "Co-Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
      { name: "Kunal Kold", role: "Co-Founder", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" }
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
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('aevora_about_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  const [activeSlide, setActiveSlide] = useState(0);
  const nextSlide = () => {
    setActiveSlide(prev => (prev === settings.gallery.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setActiveSlide(prev => (prev === 0 ? settings.gallery.length - 1 : prev - 1));
  };

  return (
    <div className="about-page-container">
      <Header />

      {/* HERO SECTION */}
      <section className="about-hero-section">
        <div className="about-hero-bg"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            {settings.heroTagline.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}<br/></React.Fragment>
            ))}
          </h1>
          <div className="about-hero-logo">
            <img src="/aevora-logo-clean.png" alt="Aevora Logo" />
          </div>
        </div>
      </section>

      {/* INTRO QUOTE */}
      <section className="about-intro-section" id="philosophy">
        <div className="about-intro-box">
          <div className="about-quote-mark">“</div>
          <h2 className="about-intro-heading">{settings.introHeading}</h2>
          <p className="about-intro-text">{settings.introText}</p>
          <div className="about-intro-footer">{settings.introFooter}</div>
        </div>
      </section>

      {/* FOUNDING TEAM */}
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

      {/* THE EXPERIENCE */}
      <section className="about-experience-section" id="experience">
        <h2 className="section-title text-center">{settings.expTitle}</h2>
        <div className="experience-grid">
          {settings.experience.map((exp, idx) => (
            <div className="experience-card" key={idx}>
              <img src={exp.image} alt={exp.title} className="experience-bg" />
              <div className="experience-overlay"></div>
              <div className="experience-content">
                <span className="experience-step">{exp.step}</span>
                <h3 className="experience-title">{exp.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="about-gallery-section" id="gallery">
        <h2 className="section-title text-center">{settings.galleryTitle}</h2>
        <div className="gallery-carousel-wrapper">
          <button className="gallery-arrow gallery-prev" onClick={prevSlide}>
            <ChevronLeft size={30} />
          </button>
          
          <div className="gallery-viewport">
            <div 
              className="gallery-track" 
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {settings.gallery.map((imgUrl, idx) => (
                <div className="gallery-slide" key={idx}>
                  <img src={imgUrl} alt={`Clinic Gallery ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <button className="gallery-arrow gallery-next" onClick={nextSlide}>
            <ChevronRight size={30} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
