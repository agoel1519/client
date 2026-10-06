import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import './Press.css';

const Press = () => {
  const [settings, setSettings] = useState({
    heroTitle: "PRESS & MEDIA",
    heroSubtitle: "Aevora in the spotlight",
    heroBg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    sectionTitle: "MEDIA",
    articles: [
      { id: 1, image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80", link: "#" },
      { id: 2, image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80", link: "#" },
      { id: 3, image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=400&q=80", link: "#" },
      { id: 4, image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=400&q=80", link: "#" },
      { id: 5, image: "https://images.unsplash.com/photo-1512413513296-8eb5204439c0?auto=format&fit=crop&w=400&q=80", link: "#" }
    ]
  });

  const [clinicInfo, setClinicInfo] = useState({
    address: "1st Floor, Forum Building, Raghuvanshi Mills Compound Senapati Bapat Marg, Gandhi Nagar, Upper Worli, Worli, Lower Parel, Mumbai, Maharashtra 400018.",
    phone: "+91 72400 13002\n+91 72400 12002",
    email: "hello@skuccii.com"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('aevora_press_settings');
    if (saved) {
      try { setSettings(JSON.parse(saved)); } catch (e) {}
    }
    const savedClinic = localStorage.getItem('aevora_clinic_settings');
    if (savedClinic) {
      try { setClinicInfo(JSON.parse(savedClinic)); } catch (e) {}
    }
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', treatment: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', treatment: '', message: '' });
    }, 5000);
  };

  // Carousel Logic
  const viewportRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const itemsPerView = 4; // default for desktop
  const slideWidth = 280 + 30; // 280px width + 30px gap
  
  const nextSlide = () => {
    setActiveSlide(prev => {
      const maxSlide = Math.max(0, settings.articles.length - itemsPerView);
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setActiveSlide(prev => {
      const maxSlide = Math.max(0, settings.articles.length - itemsPerView);
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  return (
    <div className="press-page-container">
      <Header />

      {/* HERO SECTION */}
      <section className="press-hero-section">
        <div className="press-hero-bg" style={{ backgroundImage: `url(${settings.heroBg})` }}></div>
        <div className="press-hero-content">
          <h1 className="press-hero-title">{settings.heroTitle}</h1>
          <p className="press-hero-subtitle">{settings.heroSubtitle}</p>
          <div className="press-breadcrumb">
            HOME / <span>PRESS</span>
          </div>
        </div>
      </section>

      {/* MEDIA SECTION */}
      <section className="press-media-section">
        <h2 className="press-section-title">{settings.sectionTitle}</h2>
        
        <div className="press-carousel-container">
          <button className="press-carousel-arrow press-arrow-left" onClick={prevSlide}>
            <ChevronLeft size={30} />
          </button>
          
          <div className="press-carousel-viewport" ref={viewportRef}>
            <div 
              className="press-carousel-track"
              style={{ transform: `translateX(-${activeSlide * slideWidth}px)` }}
            >
              {settings.articles.map((article) => (
                <div className="press-card" key={article.id}>
                  {article.link && article.link !== "#" ? (
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      <img src={article.image} alt="Press Feature" />
                    </a>
                  ) : (
                    <img src={article.image} alt="Press Feature" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button className="press-carousel-arrow press-arrow-right" onClick={nextSlide}>
            <ChevronRight size={30} />
          </button>
        </div>
      </section>

      {/* BOOK APPOINTMENT SECTION */}
      <section className="dt-appointment-section" id="appointment">
        <div className="dt-app-layout-two-col">
          
          {/* Left Column: Clinic Contact Information */}
          <div className="dt-app-info-col">
            <h2 className="dt-app-heading">BOOK AN APPOINTMENT</h2>

            <div className="dt-app-detail-item">
              <div className="dt-app-detail-icon"><MapPin size={20} /></div>
              <div className="dt-app-detail-text">
                <h4 className="dt-app-detail-label">VISIT OUR CLINIC</h4>
                <p className="dt-app-detail-val">{clinicInfo.address}</p>
              </div>
            </div>

            <div className="dt-app-detail-item">
              <div className="dt-app-detail-icon"><Phone size={20} /></div>
              <div className="dt-app-detail-text">
                <h4 className="dt-app-detail-label">CALL DIRECTLY</h4>
                <p className="dt-app-detail-val">{clinicInfo.phone.replace(/\n/g, ' | ')}</p>
              </div>
            </div>

            <div className="dt-app-detail-item">
              <div className="dt-app-detail-icon"><Mail size={20} /></div>
              <div className="dt-app-detail-text">
                <h4 className="dt-app-detail-label">EMAIL US</h4>
                <p className="dt-app-detail-val">{clinicInfo.email}</p>
              </div>
            </div>

            <div className="dt-app-detail-item">
              <div className="dt-app-detail-icon"><Clock size={20} /></div>
              <div className="dt-app-detail-text">
                <h4 className="dt-app-detail-label">CLINIC HOURS</h4>
                <p className="dt-app-detail-val">Monday – Sunday: 10:00 AM – 7:00 PM</p>
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
                  <input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} required className="dt-clean-input" />
                  <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className="dt-clean-input" />
                </div>
                <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required className="dt-clean-input" />
                <select name="treatment" value={formData.treatment} onChange={handleChange} className="dt-clean-input dt-clean-select">
                  <option value="">Select Service / Treatment</option>
                  <option value="skin">Skin Treatments</option>
                  <option value="hair">Hair Transplant / Restoration</option>
                  <option value="body">Body Contouring</option>
                  <option value="consultation">General Consultation</option>
                </select>
                <textarea name="message" placeholder="Any specific concerns or preferred time?" rows="3" value={formData.message} onChange={handleChange} className="dt-clean-input dt-clean-textarea" />
                <button type="submit" className="dt-clean-submit-btn">Let's Begin</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
