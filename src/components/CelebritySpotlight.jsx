import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import './CelebritySpotlight.css';

const celebrityImages = [
  { id: 1, image: '/celebrities/celeb-1.jpg', alt: 'Celebrity Visit 1' },
  { id: 2, image: '/celebrities/celeb-2.jpg', alt: 'Celebrity Visit 2' },
  { id: 3, image: '/celebrities/celeb-3.jpg', alt: 'Celebrity Visit 3' },
  { id: 4, image: '/celebrities/celeb-4.jpg', alt: 'Celebrity Visit 4' },
  { id: 5, image: '/celebrities/celeb-5.jpg', alt: 'Celebrity Visit 5' },
  { id: 6, image: '/celebrities/celeb-6.jpg', alt: 'Celebrity Visit 6' }
];

const CelebritySpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, celebrityImages.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="celebrity-section" id="a-lister">
      <div className="celebrity-container">
        {/* Section Header */}
        <div className="celebrity-header">
          <h2 className="celebrity-title">
            Celebrity & <span className="gold-text">VIP Spotlight</span>
          </h2>

          <p className="celebrity-subtitle">
            Trusted by renowned Bollywood stars, models, and industry leaders for red-carpet radiance and clinical perfection.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="celebrity-slider-container">
          {/* Navigation Buttons */}
          <button 
            className="celeb-arrow celeb-arrow-left" 
            onClick={prevSlide}
            aria-label="Previous Celebrities"
          >
            <ChevronLeft size={22} />
          </button>

          <button 
            className="celeb-arrow celeb-arrow-right" 
            onClick={nextSlide}
            aria-label="Next Celebrities"
          >
            <ChevronRight size={22} />
          </button>

          {/* Cards Track */}
          <div className="celeb-track-wrapper">
            <div 
              className="celeb-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
              }}
            >
              {celebrityImages.map((celeb) => (
                <div 
                  key={celeb.id} 
                  className="celeb-card-slide"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="celeb-card">
                    <div className="celeb-img-wrapper">
                      <img 
                        src={celeb.image} 
                        alt={celeb.alt} 
                        className="celeb-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="celeb-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={`celeb-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebritySpotlight;
