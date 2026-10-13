import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  ArrowRight, 
  Shield, 
  Award, 
  Activity,
  Edit2,
  Check,
  X,
  Image as ImageIcon,
  Plus,
  Trash2,
  EyeOff
} from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../api/mongoApi';
import './HeroSlider.css';
import './HeroSliderAdmin.css';

const defaultSlides = [
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

// ─── Inline Editable Text Field ───────────────────────────────────────────────
const InlineEditable = ({ value, onChange, as: Tag = 'span', className = '', placeholder = 'Click to edit...', multiline = false }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  const handleFocus = () => setActive(true);

  const handleBlur = () => {
    setActive(false);
    const newVal = ref.current?.innerText?.trim();
    if (newVal !== value) onChange(newVal);
  };

  const handleKey = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKey}
      className={`${className} hero-inline-edit ${active ? 'hero-inline-active' : ''}`}
      data-placeholder={placeholder}
    />
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const HeroSlider = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadingSlide, setUploadingSlide] = useState(null);

  const loadSlides = () => {
    getDbSetting('home_page').then((parsed) => {
      if (parsed) {
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed);
        } else if (parsed?.heroSlides?.length > 0) {
          setSlides(parsed.heroSlides);
        }
      }
    });
  };

  useEffect(() => {
    const admin = localStorage.getItem('aevora_admin_auth') === 'true';
    setIsAdmin(admin);

    loadSlides();
    window.addEventListener('homeSettingsUpdated', loadSlides);
    return () => window.removeEventListener('homeSettingsUpdated', loadSlides);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentSlide(index);

  useEffect(() => {
    if (!isAutoPlaying || editMode) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, editMode]);

  // Update a field of a specific slide
  const updateSlideField = (idx, field, value) => {
    setSlides(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  // Update a feature pill text
  const updateFeature = (slideIdx, featIdx, value) => {
    setSlides(prev => {
      const updated = [...prev];
      const features = [...(updated[slideIdx].features || [])];
      features[featIdx] = value;
      updated[slideIdx] = { ...updated[slideIdx], features };
      return updated;
    });
  };

  // Delete a feature pill
  const deleteFeature = (slideIdx, featIdx) => {
    setSlides(prev => {
      const updated = [...prev];
      const features = [...(updated[slideIdx].features || [])].filter((_, i) => i !== featIdx);
      updated[slideIdx] = { ...updated[slideIdx], features };
      return updated;
    });
  };

  // Add a feature pill
  const addFeature = (slideIdx) => {
    setSlides(prev => {
      const updated = [...prev];
      const features = [...(updated[slideIdx].features || []), 'New Feature'];
      updated[slideIdx] = { ...updated[slideIdx], features };
      return updated;
    });
  };

  // Add new slide
  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      badge: 'NEW CATEGORY',
      title: 'Your New Headline',
      titleHighlight: 'Highlighted Text',
      description: 'Add your description here.',
      primaryBtnText: 'Explore',
      primaryBtnLink: '#',
      secondaryBtnText: 'Book Now',
      secondaryBtnLink: '#book',
      image: '/banners/banner-skin.jpg',
      features: ['Feature 1', 'Feature 2']
    };
    setSlides(prev => [...prev, newSlide]);
    setCurrentSlide(slides.length);
  };

  // Delete current slide
  const deleteSlide = (idx) => {
    if (slides.length <= 1) { alert('At least one slide required.'); return; }
    if (!window.confirm('Delete this slide?')) return;
    setSlides(prev => prev.filter((_, i) => i !== idx));
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  // Save everything
  const handleSave = async () => {
    setSaving(true);
    const existingSettings = await getDbSetting('home_page') || {};
    await saveDbSetting('home_page', { ...existingSettings, heroSlides: slides });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Image upload
  const triggerImageUpload = (idx) => {
    setUploadingSlide(idx);
    fileInputRef.current?.click();
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file || uploadingSlide === null) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateSlideField(uploadingSlide, 'image', ev.target.result);
      setUploadingSlide(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <section
      className="hero-slider-section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      aria-label="Hero Carousel"
    >
      {/* Hidden file input for image uploads */}
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageFile} />

      {/* ── ADMIN EDIT TOOLBAR ── */}
      {isAdmin && (
        <div className="hero-admin-toolbar">
          <span className="hero-admin-label">
            <Edit2 size={14} /> Hero Slider
          </span>

          <button
            className={`hero-admin-btn ${editMode ? 'active' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? <><X size={14} /> Exit Edit</> : <><Edit2 size={14} /> Edit Mode</>}
          </button>

          {editMode && (
            <>
              <button className="hero-admin-btn" onClick={addSlide}>
                <Plus size={14} /> Add Slide
              </button>
              <button
                className={`hero-admin-btn save-btn ${saving ? 'saving' : ''} ${saved ? 'saved' : ''}`}
                onClick={handleSave}
                disabled={saving}
              >
                <Check size={14} />
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
              </button>
            </>
          )}

          <span className="hero-slide-counter">
            Slide {currentSlide + 1} / {slides.length}
          </span>
        </div>
      )}

      <div className="slider-wrapper">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`slide-item ${isActive ? 'active' : ''} ${editMode && isActive ? 'edit-mode-active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(13, 56, 44, 0.92) 0%, rgba(13, 56, 44, 0.65) 45%, rgba(13, 56, 44, 0.15) 100%), url(${slide.image})`
              }}
            >
              <div className="slide-overlay-gradient"></div>

              {/* ── Image Replace Button in Edit Mode ── */}
              {editMode && isActive && (
                <button
                  className="hero-change-image-btn"
                  onClick={() => triggerImageUpload(index)}
                >
                  <ImageIcon size={16} /> Change Background Image
                </button>
              )}

              {/* ── Delete Slide Button ── */}
              {editMode && isActive && (
                <button
                  className="hero-delete-slide-btn"
                  onClick={() => deleteSlide(index)}
                >
                  <Trash2 size={14} /> Delete Slide
                </button>
              )}

              <div className="slide-content-container">
                <div className="slide-text-box">



                  {/* Headline */}
                  <h1 className="slide-title animate-title">
                    {editMode && isActive ? (
                      <>
                        <InlineEditable
                          as="span"
                          value={slide.title}
                          onChange={(v) => updateSlideField(index, 'title', v)}
                          placeholder="Main title..."
                        />
                        {' '}
                        <br />
                        <InlineEditable
                          as="span"
                          className="gold-gradient-text"
                          value={slide.titleHighlight}
                          onChange={(v) => updateSlideField(index, 'titleHighlight', v)}
                          placeholder="Highlighted text..."
                        />
                      </>
                    ) : (
                      <>
                        {slide.title} <br />
                        <span className="gold-gradient-text">{slide.titleHighlight}</span>
                      </>
                    )}
                  </h1>

                  {/* Description */}
                  {editMode && isActive ? (
                    <InlineEditable
                      as="p"
                      className="slide-desc animate-desc"
                      value={slide.description}
                      onChange={(v) => updateSlideField(index, 'description', v)}
                      placeholder="Description..."
                      multiline
                    />
                  ) : (
                    <p className="slide-desc animate-desc">{slide.description}</p>
                  )}

                  {/* Feature Pills */}
                  <div className="slide-features animate-features">
                    {slide.features && slide.features.map((feat, fIdx) => (
                      <span key={fIdx} className={`feature-pill ${editMode && isActive ? 'editable-pill' : ''}`}>
                        <Activity size={13} className="pill-icon" />
                        {editMode && isActive ? (
                          <>
                            <InlineEditable
                              as="span"
                              value={feat}
                              onChange={(v) => updateFeature(index, fIdx, v)}
                              placeholder="Feature..."
                            />
                            <button
                              className="pill-delete-btn"
                              onClick={() => deleteFeature(index, fIdx)}
                              title="Remove"
                            >
                              <X size={11} />
                            </button>
                          </>
                        ) : feat}
                      </span>
                    ))}
                    {editMode && isActive && (
                      <button className="add-pill-btn" onClick={() => addFeature(index)}>
                        <Plus size={13} /> Add Tag
                      </button>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="slide-actions animate-actions">
                    {editMode && isActive ? (
                      <div className="hero-btn-editor">
                        <div className="hero-btn-edit-group">
                          <label>Primary Button</label>
                          <InlineEditable
                            as="span"
                            className="hero-btn-text-edit"
                            value={slide.primaryBtnText}
                            onChange={(v) => updateSlideField(index, 'primaryBtnText', v)}
                            placeholder="Button text..."
                          />
                          <InlineEditable
                            as="span"
                            className="hero-btn-link-edit"
                            value={slide.primaryBtnLink}
                            onChange={(v) => updateSlideField(index, 'primaryBtnLink', v)}
                            placeholder="Link URL..."
                          />
                        </div>
                        <div className="hero-btn-edit-group">
                          <label>Secondary Button</label>
                          <InlineEditable
                            as="span"
                            className="hero-btn-text-edit"
                            value={slide.secondaryBtnText}
                            onChange={(v) => updateSlideField(index, 'secondaryBtnText', v)}
                            placeholder="Button text..."
                          />
                          <InlineEditable
                            as="span"
                            className="hero-btn-link-edit"
                            value={slide.secondaryBtnLink}
                            onChange={(v) => updateSlideField(index, 'secondaryBtnLink', v)}
                            placeholder="Link URL..."
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <a href={slide.primaryBtnLink} className="hero-btn-primary">
                          <span>{slide.primaryBtnText}</span>
                          <ArrowRight size={16} />
                        </a>
                        <a href={slide.secondaryBtnLink} className="hero-btn-secondary">
                          <Calendar size={16} />
                          <span>{slide.secondaryBtnText}</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Navigation Arrows */}
      <button className="slider-arrow arrow-left" onClick={prevSlide} aria-label="Previous Slide">
        <ChevronLeft size={22} />
      </button>
      <button className="slider-arrow arrow-right" onClick={nextSlide} aria-label="Next Slide">
        <ChevronRight size={22} />
      </button>

      {/* Indicators */}
      <div className="slider-bottom-controls">
        <div className="slider-indicators">
          {slides.map((_, idx) => (
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
