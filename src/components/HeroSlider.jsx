import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  ArrowRight, 
  Activity,
  Edit2,
  Check,
  X,
  Image as ImageIcon,
  Plus,
  Trash2,
  Settings,
  Layers,
  Sparkles
} from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../api/mongoApi';
import './HeroSlider.css';
import './HeroSliderAdmin.css';

const defaultSlides = [
  {
    id: 1,
    enabled: true,
    slideType: 'content',
    badge: 'BY KIAN CLINICS',
    showBadge: true,
    title: 'Precision Aesthetics For',
    titleHighlight: 'Timeless Radiance',
    description: 'Experience world-class laser therapies, bespoke medical facials, and dermal restoration customized by certified aesthetic physicians.',
    primaryBtnText: 'Explore Skin Treatments',
    primaryBtnLink: '#treatments',
    showPrimaryBtn: true,
    secondaryBtnText: 'Book Consultation',
    secondaryBtnLink: '#book',
    showSecondaryBtn: true,
    image: '/banners/banner-skin.jpg',
    mobileImage: '',
    bannerLink: '',
    overlay: 'dark',
    textAlignment: 'left',
    showFeatures: true,
    features: ['Ultherapy Prime', 'Fotona 4D Laser', 'Skin Boosters']
  },
  {
    id: 2,
    enabled: true,
    slideType: 'content',
    badge: 'CELLULAR LONGEVITY & VITALITY',
    showBadge: true,
    title: 'Revitalize From Within With',
    titleHighlight: 'Longevity Science',
    description: 'Unlock peak cellular wellness with targeted NAD+ infusions, anti-aging therapies, and holistic clinical vitality protocols in our private lounge.',
    primaryBtnText: 'Discover IV Therapies',
    primaryBtnLink: '#treatments',
    showPrimaryBtn: true,
    secondaryBtnText: 'View Programs',
    secondaryBtnLink: '#programs',
    showSecondaryBtn: true,
    image: '/banners/banner-wellness.jpg',
    mobileImage: '',
    bannerLink: '',
    overlay: 'dark',
    textAlignment: 'left',
    showFeatures: true,
    features: ['NAD+ Rejuvenation', 'Limitless IV Drip', 'Immune Shield']
  },
  {
    id: 3,
    enabled: true,
    slideType: 'content',
    badge: 'BODY CONTOURING & HAIR RESTORATION',
    showBadge: true,
    title: 'Sculpt, Tone & Transform With',
    titleHighlight: 'Clinical Mastery',
    description: 'Pioneering non-invasive body contouring, Emsculpt NEO muscle definition, Emerald laser inch-loss, and high-density hair restoration.',
    primaryBtnText: 'Explore Body & Hair',
    primaryBtnLink: '#treatments',
    showPrimaryBtn: true,
    secondaryBtnText: 'Schedule Appointment',
    secondaryBtnLink: '#book',
    showSecondaryBtn: true,
    image: '/banners/banner-body.jpg',
    mobileImage: '',
    bannerLink: '',
    overlay: 'dark',
    textAlignment: 'left',
    showFeatures: true,
    features: ['Emsculpt NEO', 'Emerald Laser', 'FUE Hair Transplant']
  }
];

const defaultHeroConfig = {
  autoplay: true,
  autoplaySpeed: 6000,
  sliderHeight: 'standard',
  showArrows: true,
  showDots: true,
  transition: 'fade'
};

// ─── Inline Editable Text Field ───────────────────────────────────────────────
const InlineEditable = ({ value, onChange, as: Tag = 'span', className = '', placeholder = 'Click to edit...', multiline = false }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value || '';
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
  const [heroConfig, setHeroConfig] = useState(defaultHeroConfig);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const fileInputRef = useRef(null);
  const [uploadingSlide, setUploadingSlide] = useState(null);

  // Track window resize for mobile vs desktop banner images
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadData = () => {
    getDbSetting('home_page').then((parsed) => {
      if (parsed) {
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlides(parsed);
        } else {
          if (parsed?.heroSlides?.length > 0) {
            setSlides(parsed.heroSlides);
          }
          if (parsed?.heroConfig) {
            setHeroConfig(prev => ({ ...prev, ...parsed.heroConfig }));
          }
        }
      }
    });
  };

  useEffect(() => {
    const admin = localStorage.getItem('aevora_admin_auth') === 'true';
    setIsAdmin(admin);

    loadData();
    window.addEventListener('homeSettingsUpdated', loadData);
    return () => window.removeEventListener('homeSettingsUpdated', loadData);
  }, []);

  // Filter slides: in edit mode show all slides; for public visitors show only enabled slides
  const visibleSlides = editMode ? slides : slides.filter(s => s.enabled !== false);
  const activeSlides = visibleSlides.length > 0 ? visibleSlides : slides;

  // Safe bounds check for current slide
  useEffect(() => {
    if (currentSlide >= activeSlides.length && activeSlides.length > 0) {
      setCurrentSlide(0);
    }
  }, [activeSlides.length, currentSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev >= activeSlides.length - 1 ? 0 : prev + 1));
  }, [activeSlides.length]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev <= 0 ? activeSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => setCurrentSlide(index);

  // Autoplay handler
  useEffect(() => {
    if (!isAutoPlaying || editMode || heroConfig.autoplay === false || activeSlides.length <= 1) return;
    const intervalTime = heroConfig.autoplaySpeed || 6000;
    const interval = setInterval(nextSlide, intervalTime);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, editMode, heroConfig.autoplay, heroConfig.autoplaySpeed, activeSlides.length]);

  // Update a field of a specific slide
  const updateSlideField = (idx, field, value) => {
    setSlides(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  // Toggle slide mode between content and image-only
  const toggleSlideMode = (idx) => {
    setSlides(prev => {
      const updated = [...prev];
      const currentType = updated[idx].slideType;
      const newType = currentType === 'image-only' ? 'content' : 'image-only';
      updated[idx] = { 
        ...updated[idx], 
        slideType: newType,
        overlay: newType === 'image-only' ? 'none' : 'dark'
      };
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
      const features = [...(updated[slideIdx].features || []), 'New Specialty'];
      updated[slideIdx] = { ...updated[slideIdx], features };
      return updated;
    });
  };

  // Add new slide
  const addSlide = (type = 'content') => {
    const isOnlyImage = type === 'image-only';
    const newSlide = {
      id: Date.now(),
      enabled: true,
      slideType: isOnlyImage ? 'image-only' : 'content',
      badge: isOnlyImage ? '' : 'AEVORA CLINICS',
      showBadge: !isOnlyImage,
      title: isOnlyImage ? '' : 'Precision Aesthetics For',
      titleHighlight: isOnlyImage ? '' : 'Timeless Radiance',
      description: isOnlyImage ? '' : 'Experience world-class therapies customized by aesthetic physicians.',
      primaryBtnText: isOnlyImage ? '' : 'Explore Treatments',
      primaryBtnLink: '/#treatments',
      showPrimaryBtn: !isOnlyImage,
      secondaryBtnText: isOnlyImage ? '' : 'Book Consultation',
      secondaryBtnLink: '/#book',
      showSecondaryBtn: !isOnlyImage,
      image: '/banners/banner-skin.jpg',
      mobileImage: '',
      bannerLink: '',
      linkNewTab: false,
      overlay: isOnlyImage ? 'none' : 'dark',
      textAlignment: 'left',
      showFeatures: !isOnlyImage,
      features: isOnlyImage ? [] : ['Ultherapy Prime', 'Fotona 4D']
    };
    setSlides(prev => [...prev, newSlide]);
    setCurrentSlide(slides.length);
  };

  // Delete current slide
  const deleteSlide = (idx) => {
    if (slides.length <= 1) { 
      alert('At least one slide is required in the hero section.'); 
      return; 
    }
    if (!window.confirm('Delete this slide?')) return;
    setSlides(prev => prev.filter((_, i) => i !== idx));
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  // Save everything
  const handleSave = async () => {
    setSaving(true);
    const existingSettings = (await getDbSetting('home_page')) || {};
    const payload = {
      ...existingSettings,
      heroConfig,
      heroSlides: slides
    };
    await saveDbSetting('home_page', payload);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    window.dispatchEvent(new CustomEvent('homeSettingsUpdated', { detail: payload }));
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

  // Height class
  const heightClass = `height-${heroConfig.sliderHeight || 'standard'}`;

  return (
    <section
      className={`hero-slider-section ${heightClass}`}
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
            <Edit2 size={14} /> Hero CMS
          </span>

          <button
            className={`hero-admin-btn ${editMode ? 'active' : ''}`}
            onClick={() => setEditMode(!editMode)}
            title="Toggle inline visual editing mode"
          >
            {editMode ? <><X size={14} /> Exit Inline Edit</> : <><Edit2 size={14} /> Quick Edit</>}
          </button>

          {editMode && (
            <>
              <button 
                className="hero-admin-btn" 
                onClick={() => addSlide('content')}
                title="Add a full content slide"
              >
                <Plus size={14} /> Add Content Slide
              </button>
              <button 
                className="hero-admin-btn" 
                onClick={() => addSlide('image-only')}
                title="Add a clean image-only banner slide"
              >
                <ImageIcon size={14} /> Add Image-Only Slide
              </button>
              <button
                className={`hero-admin-btn save-btn ${saving ? 'saving' : ''} ${saved ? 'saved' : ''}`}
                onClick={handleSave}
                disabled={saving}
              >
                <Check size={14} />
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
              </button>
            </>
          )}

          <a 
            href="/admin/home-settings" 
            className="hero-admin-btn"
            style={{ textDecoration: 'none', marginLeft: '6px' }}
            title="Open Full Home CMS & Hero Panel"
          >
            <Settings size={14} /> Open Full Admin Panel
          </a>

          <span className="hero-slide-counter">
            Slide {currentSlide + 1} / {activeSlides.length}
          </span>
        </div>
      )}

      <div className="slider-wrapper">
        {activeSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          
          // Determine if slide is Image-Only
          const isImageOnly = slide.slideType === 'image-only' || slide.showContent === false || 
            (!slide.title && !slide.titleHighlight && !slide.description && !slide.badge && !slide.primaryBtnText && !slide.secondaryBtnText);

          // Responsive image logic (mobile image if on small screen)
          const isMobile = windowWidth <= 768;
          const bgImg = (isMobile && slide.mobileImage) ? slide.mobileImage : (slide.image || '/banners/banner-skin.jpg');

          // Dynamic overlay styling
          const overlayType = slide.overlay || (isImageOnly ? 'none' : 'dark');
          let overlayClass = 'overlay-dark';
          let gradientBg = 'linear-gradient(to right, rgba(13, 56, 44, 0.92) 0%, rgba(13, 56, 44, 0.65) 45%, rgba(13, 56, 44, 0.15) 100%)';

          if (overlayType === 'none') {
            overlayClass = 'overlay-none';
            gradientBg = 'none';
          } else if (overlayType === 'subtle') {
            overlayClass = 'overlay-subtle';
            gradientBg = 'radial-gradient(circle at 65% 50%, rgba(8, 36, 28, 0.15) 0%, rgba(8, 36, 28, 0.5) 100%)';
          } else if (overlayType === 'medium') {
            overlayClass = 'overlay-medium';
            gradientBg = 'linear-gradient(90deg, rgba(8, 36, 28, 0.75) 0%, rgba(8, 36, 28, 0.5) 50%, rgba(8, 36, 28, 0.15) 100%)';
          }

          const inlineBgStyle = gradientBg === 'none' 
            ? { backgroundImage: `url(${bgImg})` }
            : { backgroundImage: `${gradientBg}, url(${bgImg})` };

          const alignmentClass = `align-${slide.textAlignment || 'left'}`;

          return (
            <div
              key={slide.id || index}
              className={`slide-item ${isActive ? 'active' : ''} ${isImageOnly ? 'is-image-only' : ''} ${isImageOnly && slide.bannerLink ? 'is-clickable' : ''} ${editMode && isActive ? 'edit-mode-active' : ''}`}
              style={inlineBgStyle}
            >
              {/* Overlay element */}
              <div className={`slide-overlay-gradient ${overlayClass}`}></div>

              {/* Clickable Banner wrapper for Image-Only Slides */}
              {isImageOnly && slide.bannerLink && !editMode && (
                <a
                  href={slide.bannerLink}
                  target={slide.linkNewTab ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="hero-slide-clickable-banner"
                  aria-label={slide.title || 'Hero Banner'}
                />
              )}

              {/* ── Edit Mode Slide Controls ── */}
              {editMode && isActive && (
                <div style={{ position: 'absolute', top: '56px', right: '24px', zIndex: 30, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    className="hero-admin-btn"
                    style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}
                    onClick={() => toggleSlideMode(index)}
                  >
                    <Layers size={13} /> {isImageOnly ? 'Switch to Content Mode' : 'Switch to Image-Only Mode'}
                  </button>
                  <button
                    className="hero-admin-btn"
                    style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}
                    onClick={() => triggerImageUpload(index)}
                  >
                    <ImageIcon size={13} /> Change Image
                  </button>
                  <button
                    className="hero-admin-btn"
                    style={{ background: 'rgba(239,68,68,0.85)', border: 'none', color: '#fff' }}
                    onClick={() => deleteSlide(index)}
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              )}

              {/* ── Slide Content (Rendered if not image-only, or in editMode) ── */}
              {(!isImageOnly || editMode) && (
                <div className={`slide-content-container ${alignmentClass}`}>
                  <div className="slide-text-box">

                    {/* Badge / Eyebrow (e.g. — BY KIAN CLINICS —) */}
                    {(slide.showBadge !== false && (slide.badge || editMode)) && (
                      <div className="slide-badge-wrapper animate-fade">
                        <span className="slide-badge-line"></span>
                        {editMode && isActive ? (
                          <InlineEditable
                            as="span"
                            className="slide-badge-text"
                            value={slide.badge || ''}
                            onChange={(v) => updateSlideField(index, 'badge', v)}
                            placeholder="EYEBROW / BADGE..."
                          />
                        ) : (
                          <span className="slide-badge-text">{slide.badge}</span>
                        )}
                        <span className="slide-badge-line right"></span>
                      </div>
                    )}

                    {/* Headline */}
                    {(slide.title || slide.titleHighlight || editMode) && (
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
                            {slide.title && <span>{slide.title} </span>}
                            {slide.title && slide.titleHighlight && <br />}
                            {slide.titleHighlight && (
                              <span className="gold-gradient-text">{slide.titleHighlight}</span>
                            )}
                          </>
                        )}
                      </h1>
                    )}

                    {/* Description Paragraph */}
                    {(slide.description || editMode) && (
                      editMode && isActive ? (
                        <InlineEditable
                          as="p"
                          className="slide-desc animate-desc"
                          value={slide.description}
                          onChange={(v) => updateSlideField(index, 'description', v)}
                          placeholder="Description paragraph..."
                          multiline
                        />
                      ) : (
                        <p className="slide-desc animate-desc">{slide.description}</p>
                      )
                    )}

                    {/* Feature Pills */}
                    {(slide.showFeatures !== false && ((slide.features && slide.features.length > 0) || editMode)) && (
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
                    )}

                    {/* CTA Buttons */}
                    {((slide.showPrimaryBtn !== false && slide.primaryBtnText) || 
                      (slide.showSecondaryBtn !== false && slide.secondaryBtnText) || 
                      editMode) && (
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
                            {slide.showPrimaryBtn !== false && slide.primaryBtnText && (
                              <a href={slide.primaryBtnLink || '#treatments'} className="hero-btn-primary">
                                <span>{slide.primaryBtnText}</span>
                                <ArrowRight size={16} />
                              </a>
                            )}
                            {slide.showSecondaryBtn !== false && slide.secondaryBtnText && (
                              <a href={slide.secondaryBtnLink || '#book'} className="hero-btn-secondary">
                                <Calendar size={16} />
                                <span>{slide.secondaryBtnText}</span>
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Slider Navigation Arrows */}
      {(heroConfig.showArrows !== false && activeSlides.length > 1) && (
        <>
          <button className="slider-arrow arrow-left" onClick={prevSlide} aria-label="Previous Slide">
            <ChevronLeft size={22} />
          </button>
          <button className="slider-arrow arrow-right" onClick={nextSlide} aria-label="Next Slide">
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Indicators */}
      {(heroConfig.showDots !== false && activeSlides.length > 1) && (
        <div className="slider-bottom-controls">
          <div className="slider-indicators">
            {activeSlides.map((_, idx) => (
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
      )}
    </section>
  );
};

export default HeroSlider;
