import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ConsultationSection from '../ConsultationSection';
import { getDbSetting } from '../../api/mongoApi';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './Gallery.css';

export const defaultGallerySettings = {
  heroTitle: "SANCTUARY GALLERY",
  heroSubtitle: "A visual exploration of our supercliniq, bespoke treatment suites, and patient journeys",
  breadcrumb: "HOME / GALLERY",
  items: [
    {
      id: "1",
      title: "SculptMD & Body Contouring Suite",
      category: "Clinic & Suites",
      caption: "Our private ergonomic treatment lounge designed for quiet luxury and restorative body contouring.",
      image: "/celebrities/celeb-3.jpg"
    },
    {
      id: "2",
      title: "A-Lister Aesthetic Journey",
      category: "Celebrity Spotlight",
      caption: "India's prominent personalities trusting Aevora for red-carpet dermatological skin renewal.",
      image: "/celebrities/celeb-1.jpg"
    },
    {
      id: "3",
      title: "Medical Team of Specialists",
      category: "Doctors & Team",
      caption: "Led by Dr. Meghna Mour and senior dermatologists with over two decades of clinical experience.",
      image: "/doctors/team-group-banner.jpg"
    },
    {
      id: "4",
      title: "Cellular Longevity & IV Infusion Lounge",
      category: "Clinic & Suites",
      caption: "US FDA-cleared coenzyme replenishment protocols in a tranquil, sensory-calibrated ambiance.",
      image: "/banners/banner-wellness.jpg"
    },
    {
      id: "5",
      title: "Precision Laser & Pigment Station",
      category: "Advanced Technology",
      caption: "High-frequency Nd:YAG laser systems engineered for glass-skin clarity and deep pigmentation clearance.",
      image: "/banners/banner-skin.jpg"
    },
    {
      id: "6",
      title: "Celebrity Radiance Protocol",
      category: "Celebrity Spotlight",
      caption: "Subtle, undetectable enhancements tailored for maximum photo-finish glow.",
      image: "/celebrities/celeb-2.jpg"
    },
    {
      id: "7",
      title: "Clinical Consultation Suite",
      category: "Doctors & Team",
      caption: "In-depth 3D facial imaging and tailored multi-disciplinary longevity plans.",
      image: "/celebrities/celeb-5.jpg"
    },
    {
      id: "8",
      title: "Body Sculpting & Tissue Remodeling",
      category: "Advanced Technology",
      caption: "Combined ultrasound and radiofrequency systems targeting the SMAS and deep dermal planes.",
      image: "/banners/banner-body.jpg"
    }
  ]
};

const Gallery = () => {
  const [settings, setSettings] = useState(defaultGallerySettings);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const loadData = () => {
    getDbSetting('gallery_settings').then((saved) => {
      if (saved && saved.items && saved.items.length > 0) {
        setSettings({
          heroTitle: saved.heroTitle || defaultGallerySettings.heroTitle,
          heroSubtitle: saved.heroSubtitle || defaultGallerySettings.heroSubtitle,
          breadcrumb: saved.breadcrumb || defaultGallerySettings.breadcrumb,
          items: saved.items
        });
      } else {
        const legacy = localStorage.getItem('aevora_gallery_settings');
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            if (parsed && parsed.items && parsed.items.length > 0) {
              setSettings({ ...defaultGallerySettings, ...parsed });
              return;
            }
          } catch (e) {}
        }
        setSettings(defaultGallerySettings);
      }
    }).catch(() => {
      setSettings(defaultGallerySettings);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    window.addEventListener('gallerySettingsUpdated', loadData);
    return () => {
      window.removeEventListener('gallerySettingsUpdated', loadData);
    };
  }, []);

  // Filter items
  const categories = ["All", ...Array.from(new Set(settings.items.map(i => i.category).filter(Boolean)))];

  const filteredItems = settings.items.filter(item => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // Lightbox handlers
  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = (e) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
      if (e.key === 'ArrowLeft') setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const currentLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="gallery-page-container">
      <Header />

      {/* 1. TOP HERO BANNER */}
      <section className="gallery-header-banner">
        <h1 className="gallery-page-title">{settings.heroTitle}</h1>
        <p className="gallery-page-subtitle">{settings.heroSubtitle}</p>
        <div className="gallery-breadcrumb">
          <span>{settings.breadcrumb}</span>
        </div>
      </section>

      {/* 2. CATEGORY FILTER PILLS */}
      {categories.length > 1 && (
        <section className="gallery-filter-section">
          <div className="gallery-categories-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 3. GALLERY PHOTO GRID */}
      <section className="gallery-content-section">
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <p>No gallery images found in this category.</p>
          </div>
        ) : (
          <div className="gallery-photos-grid">
            {filteredItems.map((item, index) => (
              <div 
                className="gallery-item-card" 
                key={item.id || index}
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={item.image} 
                  alt={item.title || "Aevora Clinic Gallery"} 
                  className="gallery-item-img"
                  loading="lazy"
                />

                <div className="gallery-item-overlay">
                  {item.category && (
                    <span className="gallery-overlay-category">{item.category}</span>
                  )}
                  <h3 className="gallery-overlay-title">{item.title}</h3>
                  {item.caption && (
                    <p className="gallery-overlay-caption">{item.caption}</p>
                  )}
                  <div className="gallery-overlay-zoom">
                    <Maximize2 size={14} /> View Fullscreen
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. LIGHTBOX MODAL */}
      {currentLightboxItem && (
        <div className="gallery-lightbox-backdrop" onClick={closeLightbox}>
          <div className="gallery-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lightbox-close" onClick={closeLightbox} aria-label="Close">
              <X size={20} />
            </button>

            <div className="gallery-lightbox-img-wrapper">
              <img 
                src={currentLightboxItem.image} 
                alt={currentLightboxItem.title} 
                className="gallery-lightbox-img" 
              />
            </div>

            <div className="gallery-lightbox-info">
              <div>
                {currentLightboxItem.category && (
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#c59d5f', letterSpacing: '1px' }}>
                    {currentLightboxItem.category}
                  </span>
                )}
                <h2 className="gallery-lightbox-title">{currentLightboxItem.title}</h2>
                {currentLightboxItem.caption && (
                  <p className="gallery-lightbox-caption">{currentLightboxItem.caption}</p>
                )}
              </div>

              {filteredItems.length > 1 && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="gallery-lightbox-nav-btn" onClick={prevLightbox} aria-label="Previous">
                    <ChevronLeft size={22} />
                  </button>
                  <button className="gallery-lightbox-nav-btn" onClick={nextLightbox} aria-label="Next">
                    <ChevronRight size={22} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. CONSULTATION & FOOTER */}
      <ConsultationSection />
      <Footer />
    </div>
  );
};

export default Gallery;
