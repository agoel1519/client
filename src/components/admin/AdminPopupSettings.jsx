import React, { useState, useEffect } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Sparkles, 
  Sliders, 
  Layers, 
  Image as ImageIcon,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  Smartphone,
  Monitor
} from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import { defaultPopupSettings } from '../../data/defaultPopupSettings';
import ImageUploader from './ImageUploader';
import './AdminPopupSettings.css';

const AdminPopupSettings = () => {
  const [settings, setSettings] = useState(defaultPopupSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // Fetch saved settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
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
        console.error("Failed to load popup settings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Handle general field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle slide/image field changes
  const handleImageFieldChange = (index, field, value) => {
    const updatedImages = [...settings.images];
    updatedImages[index] = {
      ...updatedImages[index],
      [field]: value
    };
    setSettings(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  // Add new image/slide
  const addImageSlide = () => {
    const newSlide = {
      id: `popup-img-${Date.now()}`,
      url: '/banners/popup-offer-banner.jpg',
      alt: 'Special Announcement',
      title: 'New Offer Slide',
      subtitle: 'Exclusive aesthetic care tailored to your individual skin needs',
      link: '#book',
      buttonText: 'Book Appointment'
    };
    setSettings(prev => ({
      ...prev,
      images: [...prev.images, newSlide]
    }));
    setPreviewSlideIdx(settings.images.length);
  };

  // Remove slide
  const removeImageSlide = (index) => {
    if (settings.images.length <= 1) {
      alert("At least 1 image is required for the popup. To disable the popup completely, use the 'Enable Popup' toggle switch above.");
      return;
    }
    const updatedImages = settings.images.filter((_, i) => i !== index);
    setSettings(prev => ({ ...prev, images: updatedImages }));
    if (previewSlideIdx >= updatedImages.length) {
      setPreviewSlideIdx(Math.max(0, updatedImages.length - 1));
    }
  };

  // Re-order slide up
  const moveSlideUp = (index) => {
    if (index === 0) return;
    const updated = [...settings.images];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSettings(prev => ({ ...prev, images: updated }));
    setPreviewSlideIdx(index - 1);
  };

  // Re-order slide down
  const moveSlideDown = (index) => {
    if (index === settings.images.length - 1) return;
    const updated = [...settings.images];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSettings(prev => ({ ...prev, images: updated }));
    setPreviewSlideIdx(index + 1);
  };

  // Save Settings
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveDbSetting('site_popup_settings', settings);
      
      // Dispatch update event for open pages
      window.dispatchEvent(new CustomEvent('aevora_popup_settings_updated', { detail: settings }));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
    } catch (err) {
      console.error("Error saving popup settings:", err);
      alert("Error saving settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Trigger live interactive popup preview
  const handleTriggerLivePreview = () => {
    window.dispatchEvent(new CustomEvent('aevora_open_popup_preview', { detail: settings }));
  };

  const imagesCount = settings.images.length;
  const isMultiple = imagesCount > 1;
  const activeSlide = settings.images[previewSlideIdx] || settings.images[0] || {};

  return (
    <div className="admin-popup-settings-container">
      {/* Header Bar */}
      <div className="popup-settings-header">
        <div className="header-left">
          <div className="header-title-row">
            <h1 className="settings-title">Promotional Popup Manager</h1>
            <span className={`status-pill ${settings.enabled ? 'active' : 'inactive'}`}>
              <span className="dot" />
              {settings.enabled ? 'Popup Active' : 'Popup Disabled'}
            </span>
            <span className="mode-badge">
              {isMultiple ? `Multi-Image Slider (${imagesCount} slides)` : 'Single Image Banner'}
            </span>
          </div>
          <p className="settings-subtitle">
            Configure the website announcement modal. Support single image posters or multiple carousel slides with custom buttons and links.
          </p>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            className="btn-preview-popup"
            onClick={handleTriggerLivePreview}
            title="Preview how the popup will look to live website visitors"
          >
            <Eye size={16} />
            <span>Test Live Popup</span>
          </button>
          
          <button 
            type="button" 
            className="btn-save-settings" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? <span className="spinner"></span> : <Save size={18} />}
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>Popup settings updated successfully! Changes are saved and live.</span>
        </div>
      )}

      {/* Main Grid: Settings & Live Preview */}
      <div className="popup-settings-layout">
        
        {/* Left Column: Form Controls */}
        <div className="popup-controls-column">
          
          {/* Master Toggle & Display Behavior */}
          <div className="settings-card">
            <div className="card-header-with-action">
              <div>
                <h3 className="settings-card-title">General & Display Rules</h3>
                <p className="card-subtitle">Control popup status, triggers, and frequency.</p>
              </div>
              <label className="switch-label">
                <input 
                  type="checkbox" 
                  name="enabled"
                  checked={settings.enabled}
                  onChange={handleChange}
                />
                <span className="switch-slider" />
                <span className="switch-text">{settings.enabled ? 'Enabled' : 'Disabled'}</span>
              </label>
            </div>

            <div className="form-grid-two">
              <div className="form-group">
                <label>Target Pages</label>
                <select 
                  name="targetPage" 
                  value={settings.targetPage} 
                  onChange={handleChange}
                >
                  <option value="all">All Website Pages</option>
                  <option value="home">Home Page Only</option>
                </select>
                <span className="form-help">Where the popup should appear to visitors.</span>
              </div>

              <div className="form-group">
                <label>Display Frequency</label>
                <select 
                  name="displayFrequency" 
                  value={settings.displayFrequency} 
                  onChange={handleChange}
                >
                  <option value="session">Once per Browser Session (Recommended)</option>
                  <option value="once_per_day">Once every 24 Hours</option>
                  <option value="always">Always on every reload (Testing mode)</option>
                </select>
                <span className="form-help">How often visitors see the popup before dismissal.</span>
              </div>
            </div>

            <div className="form-grid-two">
              <div className="form-group">
                <label>Display Delay (Seconds)</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    name="displayDelay"
                    value={settings.displayDelay}
                    onChange={handleChange}
                    min="1"
                    max="30"
                  />
                  <span className="unit-label">sec</span>
                </div>
                <span className="form-help">Time after page load before the popup smoothly appears.</span>
              </div>

              <div className="form-group">
                <label>Popup Maximum Width</label>
                <select 
                  name="maxWidth" 
                  value={settings.maxWidth} 
                  onChange={handleChange}
                >
                  <option value="580px">Compact (580px)</option>
                  <option value="720px">Standard (720px - Recommended)</option>
                  <option value="860px">Wide Panoramic (860px)</option>
                </select>
                <span className="form-help">Overall dialog size on desktop screens.</span>
              </div>
            </div>

            {/* Carousel settings (visible if multiple images) */}
            {isMultiple && (
              <div className="carousel-behavior-box">
                <div className="carousel-box-header">
                  <div className="flex-center gap-2">
                    <Sliders size={16} className="text-gold" />
                    <strong>Multi-Image Carousel Options</strong>
                  </div>
                  <label className="switch-label mini">
                    <input 
                      type="checkbox" 
                      name="autoPlay"
                      checked={settings.autoPlay}
                      onChange={handleChange}
                    />
                    <span className="switch-slider" />
                    <span className="switch-text">{settings.autoPlay ? 'Auto-Slide On' : 'Manual'}</span>
                  </label>
                </div>

                <div className="form-grid-two mt-3">
                  <div className="form-group">
                    <label>Auto-slide Interval (Seconds)</label>
                    <input 
                      type="number" 
                      name="autoPlayInterval"
                      value={settings.autoPlayInterval}
                      onChange={handleChange}
                      min="2"
                      max="15"
                      disabled={!settings.autoPlay}
                    />
                  </div>

                  <div className="checkboxes-row mt-4">
                    <label className="checkbox-item">
                      <input 
                        type="checkbox" 
                        name="showArrows"
                        checked={settings.showArrows !== false}
                        onChange={handleChange}
                      />
                      <span>Show Left/Right Arrows</span>
                    </label>

                    <label className="checkbox-item">
                      <input 
                        type="checkbox" 
                        name="showDots"
                        checked={settings.showDots !== false}
                        onChange={handleChange}
                      />
                      <span>Show Progress Dots</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Images / Slides Manager */}
          <div className="settings-card">
            <div className="card-header-with-action">
              <div>
                <h3 className="settings-card-title">Popup Images ({imagesCount})</h3>
                <p className="card-subtitle">
                  {imagesCount === 1 
                    ? "Currently set to Single Image Mode. Click '+ Add Image Slide' to turn it into a multi-image carousel slider!"
                    : "Currently set to Multi-Image Carousel Slider Mode. Each slide can have custom images, links, and text."}
                </p>
              </div>

              <button 
                type="button" 
                className="btn-add-slide"
                onClick={addImageSlide}
              >
                <Plus size={16} />
                <span>Add Image Slide</span>
              </button>
            </div>

            {/* List of Image Slides */}
            <div className="slides-editor-list">
              {settings.images.map((slide, index) => (
                <div 
                  key={slide.id || index} 
                  className={`slide-editor-card ${index === previewSlideIdx ? 'selected' : ''}`}
                >
                  <div className="slide-card-topbar">
                    <div className="slide-badge-title">
                      <span className="slide-number">Slide #{index + 1}</span>
                      {slide.title && <span className="slide-preview-text">{slide.title}</span>}
                    </div>

                    <div className="slide-card-actions">
                      <button 
                        type="button" 
                        className="btn-action-icon" 
                        onClick={() => moveSlideUp(index)}
                        disabled={index === 0}
                        title="Move Slide Up"
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button 
                        type="button" 
                        className="btn-action-icon" 
                        onClick={() => moveSlideDown(index)}
                        disabled={index === settings.images.length - 1}
                        title="Move Slide Down"
                      >
                        <ArrowDown size={15} />
                      </button>
                      <button 
                        type="button" 
                        className="btn-action-icon delete" 
                        onClick={() => removeImageSlide(index)}
                        title="Delete this image"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="slide-card-body">
                    {/* Image Uploader & Selector */}
                    <div className="slide-uploader-wrapper">
                      <ImageUploader 
                        label={`Slide Image ${index + 1}`}
                        currentUrl={slide.url}
                        onSelect={(url) => handleImageFieldChange(index, 'url', url)}
                        onRemove={() => handleImageFieldChange(index, 'url', '')}
                      />
                    </div>

                    {/* Metadata for Slide */}
                    <div className="slide-meta-fields">
                      <div className="form-group">
                        <label>Target URL / Click Link</label>
                        <input 
                          type="text" 
                          value={slide.link || ''}
                          onChange={(e) => handleImageFieldChange(index, 'link', e.target.value)}
                          placeholder="e.g. /#treatments, #book, or WhatsApp link"
                        />
                        <span className="form-help">Clicking the image banner opens this link.</span>
                      </div>

                      <div className="form-group-row">
                        <div className="form-group">
                          <label>Slide Title (Optional)</label>
                          <input 
                            type="text" 
                            value={slide.title || ''}
                            onChange={(e) => handleImageFieldChange(index, 'title', e.target.value)}
                            placeholder="e.g. Precision Skin Rejuvenation"
                          />
                        </div>
                        <div className="form-group">
                          <label>Button Label (Optional)</label>
                          <input 
                            type="text" 
                            value={slide.buttonText || ''}
                            onChange={(e) => handleImageFieldChange(index, 'buttonText', e.target.value)}
                            placeholder="e.g. Book Consultation"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Slide Caption / Subtitle (Optional)</label>
                        <input 
                          type="text" 
                          value={slide.subtitle || ''}
                          onChange={(e) => handleImageFieldChange(index, 'subtitle', e.target.value)}
                          placeholder="Short promo caption displayed over image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details & Call To Action Settings */}
          <div className="settings-card">
            <h3 className="settings-card-title">Popup Text & Call-To-Action (Optional)</h3>
            <p className="card-subtitle">Customize announcement text displayed beneath the image.</p>

            <div className="form-grid-two">
              <div className="form-group">
                <label>Badge / Tag</label>
                <input 
                  type="text" 
                  name="badge"
                  value={settings.badge || ''}
                  onChange={handleChange}
                  placeholder="e.g. SPECIAL PRIVILEGE OFFER"
                />
              </div>

              <div className="form-group">
                <label>Main Headline</label>
                <input 
                  type="text" 
                  name="title"
                  value={settings.title || ''}
                  onChange={handleChange}
                  placeholder="e.g. Radiance Reimagined at Aevora"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description Paragraph</label>
              <textarea 
                name="subtitle"
                rows="2"
                value={settings.subtitle || ''}
                onChange={handleChange}
                placeholder="Detailed offer explanation, clinic timings, or exclusive benefits..."
              />
            </div>

            <div className="checkboxes-row mb-3">
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  name="showCta"
                  checked={settings.showCta !== false}
                  onChange={handleChange}
                />
                <strong>Show Action Buttons (CTA)</strong>
              </label>
            </div>

            {settings.showCta !== false && (
              <div className="form-grid-two">
                <div className="form-group">
                  <label>Primary Button Text</label>
                  <input 
                    type="text" 
                    name="ctaText"
                    value={settings.ctaText || ''}
                    onChange={handleChange}
                    placeholder="Book Free Consultation"
                  />
                  <input 
                    type="text" 
                    name="ctaLink"
                    value={settings.ctaLink || ''}
                    onChange={handleChange}
                    placeholder="Link URL (e.g. #book)"
                    className="mt-2"
                  />
                </div>

                <div className="form-group">
                  <label>Secondary Button (e.g. WhatsApp)</label>
                  <input 
                    type="text" 
                    name="secondaryCtaText"
                    value={settings.secondaryCtaText || ''}
                    onChange={handleChange}
                    placeholder="WhatsApp Us"
                  />
                  <input 
                    type="text" 
                    name="secondaryCtaLink"
                    value={settings.secondaryCtaLink || ''}
                    onChange={handleChange}
                    placeholder="WhatsApp link or phone"
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Interactive Preview */}
        <div className="popup-preview-column">
          <div className="preview-sticky-box">
            <div className="preview-box-header">
              <div className="flex-center gap-2">
                <Sparkles size={16} className="text-gold" />
                <strong>Live Visual Preview</strong>
              </div>

              <div className="preview-device-switch">
                <button 
                  type="button" 
                  className={`device-btn ${previewDevice === 'desktop' ? 'active' : ''}`}
                  onClick={() => setPreviewDevice('desktop')}
                  title="Desktop Preview"
                >
                  <Monitor size={15} />
                </button>
                <button 
                  type="button" 
                  className={`device-btn ${previewDevice === 'mobile' ? 'active' : ''}`}
                  onClick={() => setPreviewDevice('mobile')}
                  title="Mobile Device Preview"
                >
                  <Smartphone size={15} />
                </button>
              </div>
            </div>

            {/* Simulated Popup Mockup */}
            <div className={`preview-viewport ${previewDevice}`}>
              <div className="mock-popup-card">
                
                {/* Mock Image & Carousel */}
                <div className="mock-image-container">
                  <img 
                    src={activeSlide.url || '/banners/popup-offer-banner.jpg'} 
                    alt="Preview" 
                    className="mock-popup-img"
                  />
                  <div className="mock-gradient-overlay" />
                  
                  {activeSlide.title && (
                    <div className="mock-caption-overlay">
                      <h4>{activeSlide.title}</h4>
                      {activeSlide.subtitle && <p>{activeSlide.subtitle}</p>}
                    </div>
                  )}

                  {/* Mock Multi-Slide Arrows */}
                  {isMultiple && (
                    <>
                      <button 
                        type="button" 
                        className="mock-arrow prev" 
                        onClick={() => setPreviewSlideIdx((previewSlideIdx - 1 + imagesCount) % imagesCount)}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="mock-arrow next" 
                        onClick={() => setPreviewSlideIdx((previewSlideIdx + 1) % imagesCount)}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {/* Mock Counter */}
                  {isMultiple && (
                    <div className="mock-counter">
                      {previewSlideIdx + 1} / {imagesCount}
                    </div>
                  )}

                  {/* Mock Dots */}
                  {isMultiple && (
                    <div className="mock-dots">
                      {settings.images.map((_, i) => (
                        <span 
                          key={i} 
                          className={`mock-dot ${i === previewSlideIdx ? 'active' : ''}`}
                          onClick={() => setPreviewSlideIdx(i)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Mock Content */}
                <div className="mock-content">
                  {settings.badge && <span className="mock-badge">{settings.badge}</span>}
                  {settings.title && <h3 className="mock-title">{settings.title}</h3>}
                  {settings.subtitle && <p className="mock-desc">{settings.subtitle}</p>}

                  {settings.showCta !== false && (
                    <div className="mock-buttons">
                      {settings.ctaText && (
                        <button type="button" className="mock-btn-primary">
                          {activeSlide.buttonText || settings.ctaText}
                        </button>
                      )}
                      {settings.secondaryCtaText && (
                        <button type="button" className="mock-btn-secondary">
                          {settings.secondaryCtaText}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preview helper footer */}
            <div className="preview-tip-box">
              <Info size={14} />
              <span>
                Use the <strong>Test Live Popup</strong> button at the top right to see full animations, responsive scaling, and interactions directly in the browser!
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPopupSettings;
