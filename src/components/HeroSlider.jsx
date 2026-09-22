import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  ArrowRight, 
  Shield, 
  Award, 
  Activity 
} from 'lucide-react';
import './HeroSlider.css';

const slidesData = [
  {
    id: 1,
    badge: 'ADVANCED SKIN REJUVENATION & LASER SCIENCE',
    title: 'Precision Aesthetics For',
    titleHighlight: 'Timeless Radiance',
    description: 'Experience world-class laser therapies, bespoke medical facials, and dermal restoration customized by certified aesthetic physicians.',
    primaryBtnText: 'Explore Skin Treatments',
    primaryBtnLink: '#treatments',
    secondaryBtnText: 'Book Consultation',
    secondaryBtnLink: '#book',
    image: '/banners/banner-skin.jpg',
    features: ['Ultherapy Prime', 'Fotona 4D Laser', 'Skin Boosters']
  },
  {
    id: 2,
    badge: 'CELLULAR LONGEVITY & VITALITY',
    title: 'Revitalize From Within With',
    titleHighlight: 'Longevity Science',
    description: 'Unlock peak cellular wellness with targeted NAD+ infusions, anti-aging therapies, and holistic clinical vitality protocols in our private lounge.',
    primaryBtnText: 'Discover IV Therapies',
    primaryBtnLink: '#treatments',
    secondaryBtnText: 'View Programs',
    secondaryBtnLink: '#programs',
    image: '/banners/banner-wellness.jpg',
    features: ['NAD+ Rejuvenation', 'Limitless IV Drip', 'Immune Shield']
  },
  {
    id: 3,
    badge: 'BODY CONTOURING & HAIR RESTORATION',
    title: 'Sculpt, Tone & Transform With',
    titleHighlight: 'Clinical Mastery',
    description: 'Pioneering non-invasive body contouring, Emsculpt NEO muscle definition, Emerald laser inch-loss, and high-density hair restoration.',
    primaryBtnText: 'Explore Body & Hair',
    primaryBtnLink: '#treatments',
    secondaryBtnText: 'Schedule Appointment',
    secondaryBtnLink: '#book',
    image: '/banners/banner-body.jpg',
    features: ['Emsculpt NEO', 'Emerald Laser', 'FUE Hair Transplant']
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slidesData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section 
      className="hero-slider-section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      aria-label="Hero Carousel"
    >
      <div className="slider-wrapper">
        {slidesData.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div 
              key={slide.id}
              className={`slide-item ${isActive ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(13, 56, 44, 0.92) 0%, rgba(13, 56, 44, 0.65) 45%, rgba(13, 56, 44, 0.15) 100%), url(${slide.image})`
              }}
            >
              <div className="slide-overlay-gradient"></div>
              
              <div className="slide-content-container">
                <div className="slide-text-box">
                  {/* Badge */}
                  <div className="slide-badge animate-fade">
                    <span>{slide.badge}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="slide-title animate-title">
                    {slide.title} <br />
                    <span className="gold-gradient-text">{slide.titleHighlight}</span>
                  </h1>

                  {/* Description */}
                  <p className="slide-desc animate-desc">
                    {slide.description}
                  </p>

                  {/* Features Pills */}
                  <div className="slide-features animate-features">
                    {slide.features.map((feat, fIdx) => (
                      <span key={fIdx} className="feature-pill">
                        <Activity size={13} className="pill-icon" />
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="slide-actions animate-actions">
                    <a href={slide.primaryBtnLink} className="hero-btn-primary">
                      <span>{slide.primaryBtnText}</span>
                      <ArrowRight size={16} />
                    </a>
                    <a href={slide.secondaryBtnLink} className="hero-btn-secondary">
                      <Calendar size={16} />
                      <span>{slide.secondaryBtnText}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Navigation Arrows */}
      <button 
        className="slider-arrow arrow-left" 
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button 
        className="slider-arrow arrow-right" 
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Indicators and Progress Bar */}
      <div className="slider-bottom-controls">
        <div className="slider-indicators">
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="dot-fill"></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
