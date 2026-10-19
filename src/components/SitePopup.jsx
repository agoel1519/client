import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { X, MessageCircle } from 'lucide-react';
import { getDbSetting } from '../api/mongoApi';
import { defaultPopupSettings } from '../data/defaultPopupSettings';
import './SitePopup.css';

const SitePopup = () => {
  const location = useLocation();
  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('aevora_setting_site_popup_settings');
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          ...defaultPopupSettings,
          ...parsed,
          imageUrl: parsed.imageUrl || (Array.isArray(parsed.images) && parsed.images[0]?.url) || defaultPopupSettings.imageUrl
        };
      }
    } catch (e) {}
    return defaultPopupSettings;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const timerRef = useRef(null);

  // Load settings from backend
  const loadSettings = useCallback(async () => {
    try {
      const saved = await getDbSetting('site_popup_settings');
      if (saved && typeof saved === 'object') {
        const merged = {
          ...defaultPopupSettings,
          ...saved,
          imageUrl: saved.imageUrl || (Array.isArray(saved.images) && saved.images[0]?.url) || defaultPopupSettings.imageUrl
        };
        setSettings(merged);
        try {
          localStorage.setItem('aevora_setting_site_popup_settings', JSON.stringify(merged));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Could not load popup settings:', err);
    }
  }, []);

  useEffect(() => {
    loadSettings();

    // Listen for real-time updates from Admin
    const handleSettingsUpdated = (e) => {
      sessionStorage.removeItem('aevora_popup_session_shown');
      if (e.detail) {
        setSettings(prev => ({ ...prev, ...e.detail }));
      } else {
        loadSettings();
      }
    };

    // Listen for live preview open from Admin
    const handleOpenPreview = (e) => {
      if (e.detail) {
        setSettings(prev => ({ ...prev, ...e.detail }));
      }
      setIsPreviewMode(true);
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
    // Admin and Login routes should never trigger the public popup automatically
    if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
      setIsVisible(false);
      return;
    }

    if (!settings.enabled) {
      setIsVisible(false);
      return;
    }

    // Only respect session restriction if explicitly set to 'session'
    if (settings.displayFrequency === 'session') {
      const shownInSession = sessionStorage.getItem('aevora_popup_session_shown');
      if (shownInSession === 'true') {
        return;
      }
    }

    // Trigger after configured delay (default 1s)
    const delayMs = Math.max(500, (Number(settings.displayDelay) || 1) * 1000);
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname, settings.enabled, settings.displayFrequency, settings.displayDelay]);

  // Close popup
  const handleClose = () => {
    setIsVisible(false);
    setIsPreviewMode(false);
    sessionStorage.setItem('aevora_popup_session_shown', 'true');
  };

  // Close on Escape key
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  const currentImage = settings.imageUrl || (Array.isArray(settings.images) && settings.images[0]?.url) || defaultPopupSettings.imageUrl;
  const cleanPhone = (settings.whatsappNumber || defaultPopupSettings.whatsappNumber).replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappMessage || defaultPopupSettings.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="aevora-popup-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="aevora-popup-card">
        {/* Close Button */}
        <button 
          type="button" 
          className="aevora-popup-close-btn" 
          onClick={handleClose}
          aria-label="Close Popup"
        >
          <X size={20} />
        </button>

        {/* Preview badge if in admin test */}
        {isPreviewMode && (
          <div className="aevora-popup-preview-tag">
            Live Preview
          </div>
        )}

        {/* Uploaded Banner Image */}
        <div className="aevora-popup-image-box" onClick={handleWhatsAppClick}>
          <img 
            src={currentImage} 
            alt="Promotion Banner" 
            className="aevora-popup-image"
          />
        </div>

        {/* WhatsApp Now CTA Button */}
        <div className="aevora-popup-action-bar">
          <button 
            type="button" 
            className="aevora-popup-whatsapp-btn"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle size={22} className="whatsapp-icon" />
            <span>{settings.buttonText || 'WhatsApp Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SitePopup;
