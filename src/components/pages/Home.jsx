import React, { useState, useEffect } from 'react';
import Header from '../Header';
import HeroSlider from '../HeroSlider';
import CelebritySpotlight from '../CelebritySpotlight';
import VideoShowcase from '../VideoShowcase';
import WhyChooseAevora from '../WhyChooseAevora';
import AboutClinicIntro from '../AboutClinicIntro';
import DoctorSpotlight from '../DoctorSpotlight';
import TeamSpecialists from '../TeamSpecialists';
import TreatmentsCarousel from '../TreatmentsCarousel';
import TestimonialsSection from '../TestimonialsSection';
import FeaturedMedia from '../FeaturedMedia';
import FaqSection from '../FaqSection';
import Footer from '../Footer';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MessageCircle, Phone } from 'lucide-react';

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useScrollReveal();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress((window.scrollY / totalHeight) * 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <div 
        className="scroll-progress-indicator" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <Header />
      <main id="home">
        <HeroSlider />
        <div className="reveal-fade-up"><CelebritySpotlight /></div>
        <div className="reveal-fade-in"><VideoShowcase /></div>
        <div className="reveal-fade-up"><WhyChooseAevora /></div>
        <div className="reveal-fade-up"><AboutClinicIntro /></div>
        <div className="reveal-fade-left"><DoctorSpotlight /></div>
        <div className="reveal-fade-up"><TeamSpecialists /></div>
        <div className="reveal-fade-up"><TreatmentsCarousel /></div>
        <div className="reveal-fade-up"><TestimonialsSection /></div>
        <div className="reveal-fade-in"><FeaturedMedia /></div>
        <div className="reveal-fade-up"><FaqSection /></div>
        <Footer />
      </main>
      <a href="#" className="floating-whatsapp-widget" aria-label="Chat on WhatsApp">
        <MessageCircle size={20} /><span>WhatsApp Concierge</span>
      </a>
      <a href="#" className="floating-call-widget" aria-label="Call Now">
        <Phone size={18} /><span>Call Now</span>
      </a>
    </div>
  );
};

export default Home;
