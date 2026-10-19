import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import { getDbSetting } from '../api/mongoApi';
import './TreatmentsCarousel.css';

const defaultTreatmentCategories = [
  {
    id: 1,
    category: 'FACE & SKIN',
    title: 'HydraFacials & Laser Toning',
    description: 'Precision clinical facials and laser toning for Korean glass-skin radiance.',
    image: '/treatments/treatment-skin.jpg',
    link: '/treatments/hydrafacials-medifacials'
  },
  {
    id: 2,
    category: 'BODY & LONGEVITY',
    title: 'Muscle Contouring & Weight Loss',
    description: 'Non-invasive body shaping, muscle sculpting, and medical weight management.',
    image: '/treatments/treatment-body.jpg',
    link: '/treatments/muscle-contouring'
  },
  {
    id: 3,
    category: 'HAIR & INTIMATE WELLNESS',
    title: 'Hair Regrowth & Intimacy Vitality',
    description: 'Follicular regeneration, intimacy rejuvenation, and sexual wellness care.',
    image: '/treatments/treatment-hair.jpg',
    link: '/treatments/hair-regrowth-regeneration'
  },
  {
    id: 4,
    category: 'ADVANCED SURGERY',
    title: 'Robotic & Laser Surgical Care',
    description: 'Next-gen robotic surgery, laser proctology, hernia, and bariatric precision.',
    image: '/treatments/treatment-body.jpg',
    link: '/treatments/robotic-surgery'
  },
  {
    id: 5,
    category: 'LONGEVITY INFUSIONS',
    title: 'Intravenous Longevity Drips',
    description: 'Cellular NAD+ hydration and prophylactic complete body health packages.',
    image: '/treatments/treatment-iv.jpg',
    link: '/treatments/intravenous-longevity-drips'
  }
];

const TreatmentsCarousel = () => {
  const [categories, setCategories] = useState(defaultTreatmentCategories);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const loadData = () => {
    getDbSetting('home_page').then((saved) => {
      if (saved && saved.treatmentsCarousel && saved.treatmentsCarousel.length > 0) {
        setCategories(saved.treatmentsCarousel);
      }
    });
  };

  useEffect(() => {
    loadData();
    window.addEventListener('homeSettingsUpdated', loadData);
    return () => window.removeEventListener('homeSettingsUpdated', loadData);
  }, []);

  const treatmentCategories = categories && categories.length > 0 ? categories : defaultTreatmentCategories;

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

                      <Link to={item.link} className="treatment-knowmore-btn">
                        <span>KNOW MORE</span>
                        <span className="btn-chevron">&gt;</span>
                      </Link>
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
