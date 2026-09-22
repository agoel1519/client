import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import './TreatmentsCarousel.css';

const treatmentCategories = [
  {
    id: 1,
    category: 'FACE/SKIN',
    title: 'Lift. Define. Soften.',
    description: 'Non-surgical work that never looks overdone',
    image: '/treatments/treatment-skin.jpg',
    link: '#skin'
  },
  {
    id: 2,
    category: 'BODY',
    title: 'Contour. Tighten. Align.',
    description: 'Precise, structured changes, never excessive',
    image: '/treatments/treatment-body.jpg',
    link: '#body'
  },
  {
    id: 3,
    category: 'HAIR',
    title: 'Regrow. Strengthen. Stabilise.',
    description: 'Medical and procedural solutions designed for continuity',
    image: '/treatments/treatment-hair.jpg',
    link: '#hair'
  },
  {
    id: 4,
    category: 'IV THERAPY',
    title: 'Restore. Replenish. Revive.',
    description: 'Targeted IV infusions to restore hydration, energy and essential nutrients.',
    image: '/treatments/treatment-iv.jpg',
    link: '#wellness'
  },
  {
    id: 5,
    category: 'AESTHETIC GYNAECOLOGY',
    title: 'Empower. Restore. Rejuvenate.',
    description: 'Specialized intimate wellness with clinical privacy and gentle non-invasive care.',
    image: '/treatments/treatment-body.jpg',
    link: '#gynaecology'
  }
];

const TreatmentsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

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

  const maxIndex = Math.max(0, treatmentCategories.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="treatments-section" id="treatments">
      <div className="treatments-container">
        {/* Carousel Slider with Navigation */}
        <div className="treatments-slider-wrapper">
          {/* Arrow Left */}
          <button 
            className="treatment-nav-arrow arrow-prev"
            onClick={prevSlide}
            aria-label="Previous Treatments"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Arrow Right */}
          <button 
            className="treatment-nav-arrow arrow-next"
            onClick={nextSlide}
            aria-label="Next Treatments"
          >
            <ChevronRight size={24} />
          </button>

          {/* Track */}
          <div className="treatments-track-viewport">
            <div 
              className="treatments-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
              }}
            >
              {treatmentCategories.map((item) => (
                <div 
                  key={item.id} 
                  className="treatment-card-slide"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="treatment-category-card">
                    {/* Top Category Title */}
                    <span className="treatment-category-header">
                      {item.category}
                    </span>

                    {/* Image Box */}
                    <div className="treatment-img-frame">
                      <img 
                        src={item.image} 
                        alt={item.category} 
                        className="treatment-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Bottom Content */}
                    <div className="treatment-card-content">
                      <h3 className="treatment-headline">{item.title}</h3>
                      <p className="treatment-subtext">{item.description}</p>

                      <a href={item.link} className="treatment-knowmore-btn">
                        <span>KNOW MORE</span>
                        <span className="btn-chevron">&gt;</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        {maxIndex > 0 && (
          <div className="treatment-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`treatment-dot ${idx === currentIndex ? 'active' : ''}`}
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

export default TreatmentsCarousel;
