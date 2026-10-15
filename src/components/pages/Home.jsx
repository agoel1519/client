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
import { getDbSetting } from '../../api/mongoApi';
import { loadGoogleFont } from '../../utils/themeHelper';

export const defaultSectionsConfig = [
  { id: 'hero', name: 'Hero Slider', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'celebrity', name: 'Celebrity Spotlight', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'video', name: 'Video Showcase', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'whyChoose', name: 'Why Choose Aevora', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'aboutClinic', name: 'About Clinic Intro', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'doctor', name: 'Doctor Spotlight', enabled: false, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'team', name: 'Team Specialists', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'treatments', name: 'Treatments Carousel', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'testimonials', name: 'Patient Testimonials', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'media', name: 'Media Gallery', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' },
  { id: 'faq', name: 'FAQ Section', enabled: true, hideOnMobile: false, hideOnDesktop: false, fontSize: 'normal', fontFamily: 'default', bgColor: '', textColor: '', padding: 'normal' }
];

const defaultFloatingWidgets = {
  whatsappNumber: '+919779766933',
  whatsappLabel: 'WhatsApp Concierge',
  callNumber: '+919779766933',
  callLabel: 'Call Now',
  showWhatsapp: true,
  showCall: true
};

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [widgets, setWidgets] = useState(defaultFloatingWidgets);
  const [sections, setSections] = useState(defaultSectionsConfig);
  useScrollReveal();

  const loadHomeData = () => {
    getDbSetting('home_page').then((saved) => {
      if (saved) {
        if (saved.floatingWidgets) {
          setWidgets(prev => ({ ...prev, ...saved.floatingWidgets }));
        }
        if (saved.sectionsConfig && Array.isArray(saved.sectionsConfig) && saved.sectionsConfig.length > 0) {
          const sanitized = saved.sectionsConfig.map(s => {
            if (s.id === 'doctor') return { ...s, enabled: false };
            return s;
          });
          setSections(sanitized);
        }
      }
    });
  };

  useEffect(() => {
    loadHomeData();
    window.addEventListener('homeSettingsUpdated', loadHomeData);
    return () => window.removeEventListener('homeSettingsUpdated', loadHomeData);
  }, []);

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

  // Map section ID to component
  const renderSectionComponent = (section) => {
    switch (section.id) {
      case 'hero':
        return (
          <AdminSectionWrapper sectionName="Hero Slider" editLink="/admin/home-settings">
            <HeroSlider />
          </AdminSectionWrapper>
        );
      case 'celebrity':
        return (
          <div className="reveal-fade-up">
            <AdminSectionWrapper sectionName="Celebrity Spotlight" editLink="/admin/home-settings">
              <CelebritySpotlight />
            </AdminSectionWrapper>
          </div>
        );
      case 'video':
        return (
          <div className="reveal-fade-in">
            <AdminSectionWrapper sectionName="Video Showcase" editLink="/admin/home-settings">
              <VideoShowcase />
            </AdminSectionWrapper>
          </div>
        );
      case 'whyChoose':
        return (
          <div className="reveal-fade-up">
            <AdminSectionWrapper sectionName="Why Choose Aevora" editLink="/admin/home-settings">
              <WhyChooseAevora />
            </AdminSectionWrapper>
          </div>
        );
      case 'aboutClinic':
        return (
          <div className="reveal-fade-up">
            <AdminSectionWrapper sectionName="About Clinic" editLink="/admin/home-settings">
              <AboutClinicIntro />
            </AdminSectionWrapper>
          </div>
        );
      case 'doctor':
        return (
          <div className="reveal-fade-left">
            <AdminSectionWrapper sectionName="Doctor Spotlight" editLink="/admin/experts-settings">
              <DoctorSpotlight />
            </AdminSectionWrapper>
          </div>
        );
      case 'team':
        return (
          <div className="reveal-fade-up">
            <AdminSectionWrapper sectionName="Team Specialists" editLink="/admin/experts-settings">
              <TeamSpecialists />
            </AdminSectionWrapper>
          </div>
        );
      case 'treatments':
        return (
          <div className="reveal-fade-up">
            <AdminSectionWrapper sectionName="Treatments" editLink="/admin/pages">
              <TreatmentsCarousel />
            </AdminSectionWrapper>
          </div>
        );
      case 'testimonials':
        return (
          <div className="reveal-fade-up">
            <AdminSectionWrapper sectionName="Testimonials" editLink="/admin/home-settings">
              <TestimonialsSection />
            </AdminSectionWrapper>
          </div>
        );
      case 'media':
        return (
          <div className="reveal-fade-in">
            <AdminSectionWrapper sectionName="Featured On (Media Logos)" editLink="/admin/home-settings">
              <FeaturedMedia />
            </AdminSectionWrapper>
          </div>
        );
      case 'faq':
        return (
          <div className="reveal-fade-up">
            <AdminSectionWrapper sectionName="FAQ Section" editLink="/admin/home-settings">
              <FaqSection />
            </AdminSectionWrapper>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div 
        className="scroll-progress-indicator" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <Header />
      <main id="home">
        {sections.map((section) => {
          if (!section.enabled) return null;

          // Build dynamic wrapper classes
          const wrapperClasses = [
            'dynamic-section-wrapper',
            section.hideOnMobile ? 'hide-on-mobile' : '',
            section.hideOnDesktop ? 'hide-on-desktop' : '',
            section.fontSize && section.fontSize !== 'normal' ? `font-scale-${section.fontSize}` : '',
            section.padding && section.padding !== 'normal' ? `padding-${section.padding}` : ''
          ].filter(Boolean).join(' ');

          const wrapperStyle = {};
          if (section.bgColor) wrapperStyle.backgroundColor = section.bgColor;
          if (section.textColor) wrapperStyle.color = section.textColor;

          if (section.fontFamily && section.fontFamily !== 'default') {
            loadGoogleFont(section.fontFamily);
            wrapperStyle['--section-font'] = section.fontFamily;
            wrapperStyle.fontFamily = section.fontFamily;
          }

          return (
            <div 
              key={section.id} 
              id={`section-${section.id}`}
              className={wrapperClasses}
              style={Object.keys(wrapperStyle).length > 0 ? wrapperStyle : undefined}
            >
              {renderSectionComponent(section)}
            </div>
          );
        })}
        <Footer />
      </main>

      {/* Floating Widgets */}
      {widgets.showWhatsapp && (
        <a 
          href={`https://wa.me/${(widgets.whatsappNumber || '').replace(/[^0-9]/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="floating-whatsapp-widget" 
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={20} /><span>{widgets.whatsappLabel || 'WhatsApp Concierge'}</span>
        </a>
      )}
      {widgets.showCall && (
        <a 
          href={`tel:${widgets.callNumber || ''}`} 
          className="floating-call-widget" 
          aria-label="Call Now"
        >
          <Phone size={18} /><span>{widgets.callLabel || 'Call Now'}</span>
        </a>
      )}
    </div>
  );
};

export default Home;
