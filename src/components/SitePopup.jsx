import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { X, MessageCircle } from 'lucide-react';
import { getDbSetting } from '../api/mongoApi';
import { defaultPopupSettings } from '../data/defaultPopupSettings';
import './SitePopup.css';

const SitePopup = () => {
  const location = useLocation();
  const [settings, setSettings] = useState(defaultPopupSettings);
  const [isVisible, setIsVisible] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const timerRef = useRef(null);

  // Load settings from backend
  const loadSettings = useCallback(async () => {
    try {
      const saved = await getDbSetting('site_popup_settings');
      if (saved && typeof saved === 'object') {
        setSettings(prev => ({
          ...prev,
          ...saved,
          imageUrl: saved.imageUrl || (Array.isArray(saved.images) && saved.images[0]?.url) || prev.imageUrl
        }));
      }
    } catch (err) {
      console.warn('Could not load popup settings:', err);
    }
  }, []);

  useEffect(() => {
    loadSettings();

    // Listen for real-time updates from Admin
    const handleSettingsUpdated = (e) => {
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
    // Admin routes should never trigger the public popup automatically
    if (location.pathname.startsWith('/admin')) {
      setIsVisible(false);
      return;
    }

    if (!settings.enabled) {
      setIsVisible(false);
      return;
    }

    // Only show once per session
    const shownInSession = sessionStorage.getItem('aevora_popup_session_shown');
    if (shownInSession === 'true') {
      return;
    }

    // Trigger after brief 1.5s delay
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname, settings.enabled]);

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
