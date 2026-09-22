import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  MessageSquareHeart
} from 'lucide-react';
import './TestimonialsSection.css';

const testimonialsData = [
  {
    id: 1,
    name: 'Ananya Singhania',
    location: 'Sector 9, Panchkula',
    treatment: 'Laser Skin Resurfacing & Medi-Facial',
    rating: 5,
    date: 'Verified Review • 2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    title: 'The most natural and radiant results I have ever experienced!',
    review: 'I was always hesitant about clinical skin procedures because I feared looking overdone. Dr. Meghna and the entire Aevora team completely changed my perspective. The subtle refinement, reduced pigmentation, and effortless glass-like glow are remarkable. True understated luxury.'
  },
  {
    id: 2,
    name: 'Rohit K. Mehra',
    location: 'Sector 20, Panchkula',
    treatment: 'GFC Hair Regrowth & Scalp Bio-Therapy',
    rating: 5,
    date: 'Verified Review • 1 month ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    title: 'Visible hair density within just 3 clinical sessions.',
    review: 'Suffering from early crown thinning was stressful. The protocol designed at Aevora was completely transparent, scientifically backed, and painless. 4 months in, my hair density and hairline feel substantially thicker and healthier. Truly world-class medical expertise.'
  },
  {
    id: 3,
    name: 'Dr. Radhika Merchant',
    location: 'MDC Sector 4, Panchkula',
    treatment: 'Ultherapy Prime & Non-Surgical Contouring',
    rating: 5,
    date: 'Verified Review • 3 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    title: 'Flawless jawline definition with absolute zero downtime.',
    review: 'As a physician myself, I am extremely particular about hygiene, equipment provenance, and anatomical understanding. Aevora operates at global standards. The ultrasound contouring gave me a crisp jawline contour without a single day of bruising or downtime.'
  },
  {
    id: 4,
    name: 'Natasha Poonawalla',
    location: 'Sector 8, Panchkula',
    treatment: 'EXION MNRF & Skin Booster Infusion',
    rating: 5,
    date: 'Verified Review • 2 months ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    title: 'Unmatched ambience, bespoke care, and glowing skin.',
    review: 'Stepping into Aevora feels like a sanctuary. The personalized dermal analysis and state-of-the-art EXION technology gave my skin a bounce and poreless texture that no luxury topical cream could ever match. I am officially a client for life!'
  },
  {
    id: 5,
    name: 'Vikramaditya Roy',
    location: 'Sector 14, Panchkula',
    treatment: 'Nutrient IV Drip & Executive Wellness',
    rating: 5,
    date: 'Verified Review • 1 month ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    title: 'Restored my energy and focus amidst a hectic corporate schedule.',
    review: 'Frequent travel and 14-hour workdays left me constantly depleted. The customized IV infusions and cellular detox at Aevora gave me an immediate boost in physical vitality, mental clarity, and refreshed sleep. Highly recommended for executives.'
  },
  {
    id: 6,
    name: 'Suhana Kapoor',
    location: 'Sector 6, Panchkula',
    treatment: 'Chemical Peels & Lip Hydration Booster',
    rating: 5,
    date: 'Verified Review • 3 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    title: 'Subtle elegance and warm, extremely attentive doctors.',
    review: 'The doctors at Aevora listen with genuine patience. They never push unnecessary treatments—only what enhances your natural features. My skin has never felt smoother or more hydrated. Thank you for such an incredible experience!'
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1200) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonialsData.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        
        {/* Top Header & Google Trust Badge */}
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <Sparkles size={14} className="badge-gold-icon" />
            <span>AUTHENTIC PATIENT EXPERIENCES</span>
          </div>

          <h2 className="testimonials-title">
            Words of Trust from <span>Our Cherished Clients</span>
          </h2>

          <p className="testimonials-desc">
            Discover why Panchkula's leading personalities, professionals, and aesthetic connoisseurs 
            entrust their skin, hair, and wellness journeys to Aevora.
          </p>

          {/* Google Review Rating Pill */}
          <div className="google-rating-pill">
            <div className="google-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#c59d5f" color="#c59d5f" />
              ))}
            </div>
            <span className="rating-score">4.9 / 5.0</span>
            <span className="rating-divider">|</span>
            <span className="rating-source">500+ Verified Patient Reviews on Google</span>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="testimonials-carousel-wrapper">
          
          {/* Navigation Arrows */}
          <button 
            className="testi-nav-arrow arrow-left" 
            onClick={prevSlide}
            aria-label="Previous Reviews"
          >
            <ChevronLeft size={22} />
          </button>

          <button 
            className="testi-nav-arrow arrow-right" 
            onClick={nextSlide}
            aria-label="Next Reviews"
          >
            <ChevronRight size={22} />
          </button>

          {/* Viewport & Track */}
          <div className="testimonials-viewport">
            <div 
              className="testimonials-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
              }}
            >
              {testimonialsData.map((item) => (
                <div 
                  key={item.id} 
                  className="testimonial-slide-item"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="testimonial-card">
                    {/* Top Row: Stars + Treatment Pill */}
                    <div className="testi-card-top">
                      <div className="testi-stars">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="#c59d5f" color="#c59d5f" />
                        ))}
                      </div>
                      <span className="testi-treatment-badge">
                        {item.treatment}
                      </span>
                    </div>

                    {/* Watermark Quote Icon */}
                    <div className="testi-quote-icon">
                      <Quote size={28} />
                    </div>

                    {/* Review Title & Body */}
                    <h4 className="testi-card-title">"{item.title}"</h4>
                    <p className="testi-card-body">{item.review}</p>

                    {/* Bottom Patient Profile */}
                    <div className="testi-patient-profile">
                      <div className="testi-avatar-frame">
                        <img 
                          src={item.avatar} 
                          alt={item.name} 
                          className="testi-avatar"
                          loading="lazy" 
                        />
                        <span className="verified-check-dot">
                          <CheckCircle2 size={12} />
                        </span>
                      </div>

                      <div className="testi-patient-info">
                        <div className="patient-name-row">
                          <strong className="patient-name">{item.name}</strong>
                          <span className="verified-label">Verified Patient</span>
                        </div>
                        <span className="patient-meta">{item.location} • {item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="testimonials-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`testi-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;
