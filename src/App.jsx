import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CelebritySpotlight from './components/CelebritySpotlight';
import VideoShowcase from './components/VideoShowcase';
import WhyChooseAevora from './components/WhyChooseAevora';
import AboutClinicIntro from './components/AboutClinicIntro';
import DoctorSpotlight from './components/DoctorSpotlight';
import { useScrollReveal } from './hooks/useScrollReveal';
import { MessageCircle, Calendar } from 'lucide-react';

// Lazy-load below-the-fold sections for instant initial page rendering
const TeamSpecialists = lazy(() => import('./components/TeamSpecialists'));
const TreatmentsCarousel = lazy(() => import('./components/TreatmentsCarousel'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const FeaturedMedia = lazy(() => import('./components/FeaturedMedia'));
const FaqSection = lazy(() => import('./components/FaqSection'));
const Footer = lazy(() => import('./components/Footer'));

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

        {/* Below-the-fold lazy-loaded components with Suspense */}
        <Suspense fallback={<div style={{ minHeight: '120px' }}></div>}>
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
        </Suspense>
      </main>

      {/* Floating Action Buttons */}
      <a 
        href="https://wa.me/919136100000" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp-widget"
        aria-label="Chat on WhatsApp with Aevora Concierge"
      >
        <MessageCircle size={20} />
        <span>WhatsApp Concierge</span>
      </a>

      <a 
        href="#appointment" 
        className="floating-call-widget"
        aria-label="Book a private consultation"
      >
        <Calendar size={18} />
        <span>Book Consultation</span>
      </a>
    </div>
  );
}

export default App;
