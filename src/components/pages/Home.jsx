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
import AdminSectionWrapper from '../admin/AdminSectionWrapper';
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
        <AdminSectionWrapper sectionName="Hero Slider" editLink="/admin/home-settings">
          <HeroSlider />
        </AdminSectionWrapper>
        
        <div className="reveal-fade-up">
          <AdminSectionWrapper sectionName="Celebrity Spotlight" editLink="/admin/home-settings">
            <CelebritySpotlight />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-in">
          <AdminSectionWrapper sectionName="Video Showcase" editLink="/admin/home-settings">
            <VideoShowcase />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-up">
          <AdminSectionWrapper sectionName="Why Choose Aevora" editLink="/admin/home-settings">
            <WhyChooseAevora />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-up">
          <AdminSectionWrapper sectionName="About Clinic" editLink="/admin/home-settings">
            <AboutClinicIntro />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-left">
          <AdminSectionWrapper sectionName="Doctor Spotlight" editLink="/admin/experts-settings">
            <DoctorSpotlight />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-up">
          <AdminSectionWrapper sectionName="Team Specialists" editLink="/admin/experts-settings">
            <TeamSpecialists />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-up">
          <AdminSectionWrapper sectionName="Treatments" editLink="/admin/pages">
            <TreatmentsCarousel />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-up">
          <AdminSectionWrapper sectionName="Testimonials" editLink="/admin/home-settings">
            <TestimonialsSection />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-in">
          <AdminSectionWrapper sectionName="Media Gallery" editLink="/admin/media">
            <FeaturedMedia />
          </AdminSectionWrapper>
        </div>
        
        <div className="reveal-fade-up">
          <AdminSectionWrapper sectionName="FAQ Section" editLink="/admin/home-settings">
            <FaqSection />
          </AdminSectionWrapper>
        </div>
        
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
