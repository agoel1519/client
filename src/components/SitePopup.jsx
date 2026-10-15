import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { getDbSetting } from '../api/mongoApi';
import { defaultPopupSettings } from '../data/defaultPopupSettings';
import './SitePopup.css';

const SitePopup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(defaultPopupSettings);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const timerRef = useRef(null);
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(null);

  // Load settings from MongoDB or localStorage
  const loadSettings = useCallback(async () => {
    try {
      const saved = await getDbSetting('site_popup_settings');
      if (saved && typeof saved === 'object') {
        setSettings(prev => ({
          ...prev,
          ...saved,
          images: Array.isArray(saved.images) && saved.images.length > 0 
            ? saved.images 
            : prev.images
        }));
      }
    } catch (err) {
      console.warn('Could not load popup settings, using defaults:', err);
    }
  }, []);

  useEffect(() => {
    loadSettings();

    // Listen for real-time updates from Admin
    const handleSettingsUpdated = (e) => {
      if (e.detail) {
        setSettings(e.detail);
      } else {
        loadSettings();
      }
    };

    // Listen for instant admin preview trigger
    const handleOpenPreview = (e) => {
      if (e.detail) {
        setSettings(e.detail);
      }
      setIsPreviewMode(true);
      setCurrentSlide(0);
      setIsVisible(true);
    };

    window.addEventListener('aevora_popup_settings_updated', handleSettingsUpdated);
    window.addEventListener('aevora_open_popup_preview', handleOpenPreview);

    return () => {
      window.removeEventListener('aevora_popup_settings_updated', handleSettingsUpdated);
      window.removeEventListener('aevora_open_popup_preview', handleOpenPreview);
    };
  }, [loadSettings]);

  // Evaluate whether popup should trigger on the current route
  useEffect(() => {
    // Admin routes should never trigger the public popup automatically
    if (location.pathname.startsWith('/admin')) {
      setIsVisible(false);
      return;
    }

    if (!settings.enabled) {
      setIsVisible(false);
      return;
    }

    // Target page check: 'home' vs 'all'
    if (settings.targetPage === 'home' && location.pathname !== '/') {
      setIsVisible(false);
      return;
    }

    // Frequency check
    const frequency = settings.displayFrequency || 'session';
    if (frequency === 'session') {
      const shownInSession = sessionStorage.getItem('aevora_popup_session_shown');
      if (shownInSession === 'true') {
        return;
      }
    } else if (frequency === 'once_per_day') {
      const lastDismissed = localStorage.getItem('aevora_popup_dismissed_time');
      if (lastDismissed) {
        const diff = Date.now() - parseInt(lastDismissed, 10);
        // 24 hours in milliseconds
        if (diff < 24 * 60 * 60 * 1000) {
          return;
        }
      }
    }

    // Delay trigger
    const delayMs = Math.max(500, (settings.displayDelay || 2) * 1000);
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      setCurrentSlide(0);
    }, delayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname, settings]);

  const images = Array.isArray(settings.images) && settings.images.length > 0 
    ? settings.images 
    : defaultPopupSettings.images;
  const isMultipleImages = images.length > 1;

  // Next / Previous slide handlers
  const nextSlide = useCallback(() => {
    if (!isMultipleImages) return;
    setCurrentSlide(prev => (prev + 1) % images.length);
  }, [isMultipleImages, images.length]);

  const prevSlide = useCallback(() => {
    if (!isMultipleImages) return;
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  }, [isMultipleImages, images.length]);

  // Auto-play for multi-image popup slider
  useEffect(() => {
    if (!isVisible || !isMultipleImages || !settings.autoPlay || isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    const intervalSec = Math.max(2, settings.autoPlayInterval || 4);
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, intervalSec * 1000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isVisible, isMultipleImages, settings.autoPlay, settings.autoPlayInterval, isPaused, nextSlide]);

  // Keyboard navigation & escape to close
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' && isMultipleImages) {
        nextSlide();
      } else if (e.key === 'ArrowLeft' && isMultipleImages) {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, isMultipleImages, nextSlide, prevSlide]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || !isMultipleImages) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const handleClose = () => {
    setIsVisible(false);
    setIsPreviewMode(false);

    // Save session or 24-hr dismissal record
    sessionStorage.setItem('aevora_popup_session_shown', 'true');
    if (dontShowAgain || settings.displayFrequency === 'once_per_day') {
      localStorage.setItem('aevora_popup_dismissed_time', Date.now().toString());
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && settings.closeOnBackdrop !== false) {
      handleClose();
    }
  };

  const handleActionClick = (url) => {
    if (!url) return;
    handleClose();

    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (url.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + url);
      } else {
        const el = document.querySelector(url);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(url);
    }
  };

  if (!isVisible) return null;

  const currentImage = images[currentSlide] || images[0];

  return (
    <div 
      className="aevora-popup-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="aevora-popup-title"
    >
      <div 
        className="aevora-popup-card"
        style={{ maxWidth: settings.maxWidth || '720px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Close Button */}
        {settings.showCloseButton !== false && (
          <button 
            type="button" 
            className="aevora-popup-close-btn" 
            onClick={handleClose}
            aria-label="Close Announcement Popup"
          >
            <X size={20} />
          </button>
        )}

        {/* Preview Badge if triggered from Admin */}
        {isPreviewMode && (
          <div className="aevora-popup-preview-tag">
            <Sparkles size={13} /> Live Preview Mode
          </div>
        )}

        {/* Slider / Image Visual Area */}
        <div 
          className="aevora-popup-media-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images Slides */}
          <div className="aevora-popup-slides-viewport">
            {images.map((item, idx) => (
              <div 
                key={item.id || idx} 
                className={`aevora-popup-slide ${idx === currentSlide ? 'active' : ''}`}
                aria-hidden={idx !== currentSlide}
              >
                <div 
                  className={`aevora-popup-img-wrapper ${item.link ? 'clickable' : ''}`}
                  onClick={() => item.link && handleActionClick(item.link)}
                >
                  <img 
                    src={item.url} 
                    alt={item.alt || item.title || 'Special Promotion Banner'} 
                    className="aevora-popup-image"
                    loading="eager"
                  />
                  <div className="aevora-popup-overlay-gradient" />

                  {/* On-Image Caption / Tag for Multi-slide storytelling */}
                  {(item.title || item.subtitle) && (
                    <div className="aevora-popup-image-caption">
                      {item.title && <h4 className="caption-title">{item.title}</h4>}
                      {item.subtitle && <p className="caption-subtitle">{item.subtitle}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows (Rendered only when multiple images exist) */}
          {isMultipleImages && settings.showArrows !== false && (
            <>
              <button 
                type="button" 
                className="aevora-popup-nav-arrow arrow-prev" 
                onClick={prevSlide}
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                type="button" 
                className="aevora-popup-nav-arrow arrow-next" 
                onClick={nextSlide}
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Slide Indicator Badge (Rendered only when multiple images exist) */}
          {isMultipleImages && (
            <div className="aevora-popup-counter-badge">
              <span>{currentSlide + 1}</span> / <span>{images.length}</span>
            </div>
          )}

          {/* Pagination Dots (Rendered only when multiple images exist) */}
          {isMultipleImages && settings.showDots !== false && (
            <div className="aevora-popup-dots-container">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`aevora-popup-dot ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Details & Call to Action Bar */}
        {(settings.title || settings.subtitle || settings.showCta) && (
          <div className="aevora-popup-details">
            {settings.badge && (
              <div className="aevora-popup-badge">
                <Sparkles size={12} className="badge-sparkle" />
                <span>{settings.badge}</span>
              </div>
            )}

            {settings.title && (
              <h3 id="aevora-popup-title" className="aevora-popup-heading">
                {settings.title}
              </h3>
            )}

            {settings.subtitle && (
              <p className="aevora-popup-description">
                {settings.subtitle}
              </p>
            )}

            {/* CTAs */}
            {settings.showCta && (
              <div className="aevora-popup-actions">
                {settings.ctaText && (
                  <button 
                    type="button" 
                    className="aevora-popup-primary-btn"
                    onClick={() => handleActionClick(currentImage.link || settings.ctaLink)}
                  >
                    <span>{currentImage.buttonText || settings.ctaText}</span>
                    <ArrowRight size={16} />
                  </button>
                )}

                {settings.secondaryCtaText && (
                  <button 
                    type="button" 
                    className="aevora-popup-secondary-btn"
                    onClick={() => handleActionClick(settings.secondaryCtaLink)}
                  >
                    <MessageCircle size={16} />
                    <span>{settings.secondaryCtaText}</span>
                  </button>
                )}
              </div>
            )}

            {/* Footer options */}
            <div className="aevora-popup-footer">
              <label className="dont-show-checkbox">
                <input 
                  type="checkbox" 
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                />
                <span>Don't show this announcement again today</span>
              </label>

              <button 
                type="button" 
                className="aevora-popup-dismiss-link"
                onClick={handleClose}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SitePopup;
