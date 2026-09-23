import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CelebritySpotlight from './components/CelebritySpotlight';
import VideoShowcase from './components/VideoShowcase';
import WhyChooseAevora from './components/WhyChooseAevora';
import AboutClinicIntro from './components/AboutClinicIntro';
import DoctorSpotlight from './components/DoctorSpotlight';
import TeamSpecialists from './components/TeamSpecialists';
import TreatmentsCarousel from './components/TreatmentsCarousel';
import TestimonialsSection from './components/TestimonialsSection';
import FeaturedMedia from './components/FeaturedMedia';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import { MessageCircle, Phone } from 'lucide-react';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize on-scroll reveal observer
  useScrollReveal();

  // Calculate real-time scroll progress percentage
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
      {/* Top Gold Scroll Progress Line */}
      <div 
        className="scroll-progress-indicator" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Luxury Brand Header with Mega Menu */}
      <Header />

      <main id="home">
        {/* Hero Banner Slider */}
        <HeroSlider />

        {/* Celebrity & VIP Spotlight Carousel */}
        <div className="reveal-fade-up">
          <CelebritySpotlight />
        </div>

        {/* Cinematic Video Showcase */}
        <div className="reveal-fade-in">
          <VideoShowcase />
        </div>

        {/* Why Choose AEVORA */}
        <div className="reveal-fade-up">
          <WhyChooseAevora />
        </div>

        {/* Best Skin, Hair & Body Clinic Showcase */}
        <div className="reveal-fade-up">
          <AboutClinicIntro />
        </div>

        {/* Founder & Chief Doctor Spotlight */}
        <div className="reveal-fade-left">
          <DoctorSpotlight />
        </div>

        {/* Our Team of Specialists */}
        <div className="reveal-fade-up">
          <TeamSpecialists />
        </div>

        {/* Core Treatments Carousel Showcase */}
        <div className="reveal-fade-up">
          <TreatmentsCarousel />
        </div>

        {/* Verified Patient Testimonials */}
        <div className="reveal-fade-up">
          <TestimonialsSection />
        </div>

        {/* As Featured In / Press & Media Recognition */}
        <div className="reveal-fade-in">
          <FeaturedMedia />
        </div>

        {/* Frequently Asked Questions (FAQ) Section */}
        <div className="reveal-fade-up">
          <FaqSection />
        </div>

        {/* Luxury Brand Footer & Contact Information */}
        <Footer />
      </main>

      {/* Floating Action Buttons */}
      <a 
        href="#" 
        className="floating-whatsapp-widget"
        aria-label="Chat on WhatsApp with Aevora Concierge"
      >
        <MessageCircle size={20} />
        <span>WhatsApp Concierge</span>
      </a>

      <a 
        href="#" 
        className="floating-call-widget"
        aria-label="Call Now"
      >
        <Phone size={18} />
        <span>Call Now</span>
      </a>
    </div>
  );
}

export default App;
