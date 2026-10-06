import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';

const defaultSettings = {
  heroSlides: [
    {
      id: 1,
      badge: 'ADVANCED SKIN REJUVENATION & LASER SCIENCE',
      title: 'Precision Aesthetics For',
      titleHighlight: 'Timeless Radiance',
      description: 'Experience world-class laser therapies, bespoke medical facials, and dermal restoration customized by certified aesthetic physicians.',
      primaryBtnText: 'Explore Skin Treatments',
      primaryBtnLink: '/#treatments',
      secondaryBtnText: 'Book Consultation',
      secondaryBtnLink: '/#book',
      image: '/banners/banner-skin.jpg',
    },
    {
      id: 2,
      badge: 'CELLULAR LONGEVITY & VITALITY',
      title: 'Revitalize From Within With',
      titleHighlight: 'Longevity Science',
      description: 'Unlock peak cellular wellness with targeted NAD+ infusions, anti-aging therapies, and holistic clinical vitality protocols in our private lounge.',
      primaryBtnText: 'Discover IV Therapies',
      primaryBtnLink: '/#treatments',
      secondaryBtnText: 'View Programs',
      secondaryBtnLink: '/#programs',
      image: '/banners/banner-wellness.jpg',
    },
    {
      id: 3,
      badge: 'BODY CONTOURING & HAIR RESTORATION',
      title: 'Sculpt, Tone & Transform With',
      titleHighlight: 'Clinical Mastery',
      description: 'Pioneering non-invasive body contouring, Emsculpt NEO muscle definition, Emerald laser inch-loss, and high-density hair restoration.',
      primaryBtnText: 'Explore Body & Hair',
      primaryBtnLink: '/#treatments',
      secondaryBtnText: 'Schedule Appointment',
      secondaryBtnLink: '/#book',
      image: '/banners/banner-body.jpg',
    }
  ],
  aboutClinic: {
    title: 'BEST SKIN, HAIR & BODY',
    titleHighlight: 'AESTHETICS CLINIC IN PANCHKULA',
    para1: 'At Aevora by Kian Clinics, global techniques, advanced technology and clinical expertise come together, shaping results that are precise, considered and distinctly yours.',
    para2: 'Our treatments are selected with care, guided by a deeper understanding of your skin, your needs, your patterns and what will truly make a difference. Our focus is natural-looking results that hold over time, not quick fixes that fade.',
    image: '/banners/banner-wellness.jpg'
  },
  videoShowcase: {
    thumbnail: '/banners/banner-wellness.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  whyChoose: {
    title: 'Why Choose',
    titleHighlight: 'AEVORA',
    subtitle: 'Redefining aesthetic excellence through customized clinical science, world-class technology, and harmonized natural results.',
    stats: [
      { value: '15,000+', label: 'Successful Procedures' },
      { value: '100%', label: 'US-FDA Approved Tech' },
      { value: '15+ Yrs', label: 'Clinical Experience' },
      { value: '99.4%', label: 'Patient Satisfaction' }
    ]
  }
};

const AdminHomeSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aevora_home_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Legacy migration from old format where root was array of slides
          setSettings({ ...defaultSettings, heroSlides: parsed });
        } else if (parsed && parsed.heroSlides) {
          setSettings({ ...defaultSettings, ...parsed });
        }
      } catch (e) {
        console.error("Could not parse home settings", e);
      }
    }
  }, []);

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...settings.heroSlides];
    updatedSlides[index][field] = value;
    setSettings({ ...settings, heroSlides: updatedSlides });
  };

  const addSlide = () => {
    const updatedSlides = [
      ...settings.heroSlides,
      {
        id: Date.now(),
        badge: 'NEW CATEGORY',
        title: 'New Hero Title',
        titleHighlight: 'Highlight Text',
        description: 'New hero description text goes here.',
        primaryBtnText: 'Explore',
        primaryBtnLink: '/',
        secondaryBtnText: 'Book Now',
        secondaryBtnLink: '/#book',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
      }
    ];
    setSettings({ ...settings, heroSlides: updatedSlides });
  };

  const removeSlide = (index) => {
    if (settings.heroSlides.length === 1) {
      alert("You must have at least one hero slide.");
      return;
    }
    const updatedSlides = [...settings.heroSlides];
    updatedSlides.splice(index, 1);
    setSettings({ ...settings, heroSlides: updatedSlides });
  };

  const handleAboutChange = (field, value) => {
    setSettings({
      ...settings,
      aboutClinic: {
        ...settings.aboutClinic,
        [field]: value
      }
    });
  };

  const handleVideoChange = (field, value) => {
    setSettings({
      ...settings,
      videoShowcase: {
        ...settings.videoShowcase,
        [field]: value
      }
    });
  };

  const handleWhyChooseChange = (field, value) => {
    setSettings({
      ...settings,
      whyChoose: {
        ...settings.whyChoose,
        [field]: value
      }
    });
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...settings.whyChoose.stats];
    updatedStats[index][field] = value;
    setSettings({
      ...settings,
      whyChoose: {
        ...settings.whyChoose,
        stats: updatedStats
      }
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('aevora_home_settings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <div>
          <h1 className="settings-title">Home Page Settings</h1>
          <p className="settings-subtitle">Manage the dynamic sections of your landing page.</p>
        </div>
        <button className="btn-save-settings" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <span className="spinner"></span> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>Home page updated successfully!</span>
        </div>
      )}

      <div className="settings-sections">
        {/* ABOUT SECTION */}
        <div className="settings-card">
          <h3 className="settings-card-title">About Clinic Section</h3>
          
          <div className="form-group-row">
            <div className="form-group">
              <label>Normal Title</label>
              <input type="text" value={settings.aboutClinic.title} onChange={(e) => handleAboutChange('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Highlighted Title (Gold)</label>
              <input type="text" value={settings.aboutClinic.titleHighlight} onChange={(e) => handleAboutChange('titleHighlight', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" value={settings.aboutClinic.image} onChange={(e) => handleAboutChange('image', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Paragraph 1</label>
            <textarea rows="3" value={settings.aboutClinic.para1} onChange={(e) => handleAboutChange('para1', e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label>Paragraph 2</label>
            <textarea rows="3" value={settings.aboutClinic.para2} onChange={(e) => handleAboutChange('para2', e.target.value)}></textarea>
          </div>
        </div>

        {/* VIDEO SHOWCASE SECTION */}
        <div className="settings-card">
          <h3 className="settings-card-title">Video Showcase Section</h3>
          
          <div className="form-group-row">
            <div className="form-group">
              <label>Video Thumbnail Image URL</label>
              <input type="text" value={settings.videoShowcase?.thumbnail || ''} onChange={(e) => handleVideoChange('thumbnail', e.target.value)} />
            </div>
            <div className="form-group">
              <label>YouTube Embed URL (Optional)</label>
              <input type="text" value={settings.videoShowcase?.videoUrl || ''} onChange={(e) => handleVideoChange('videoUrl', e.target.value)} placeholder="e.g. https://www.youtube.com/embed/..." />
            </div>
          </div>
        </div>

        {/* WHY CHOOSE AEVORA SECTION */}
        <div className="settings-card">
          <h3 className="settings-card-title">Why Choose Aevora Section</h3>
          
          <div className="form-group-row">
            <div className="form-group">
              <label>Normal Title</label>
              <input type="text" value={settings.whyChoose?.title || ''} onChange={(e) => handleWhyChooseChange('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Highlighted Title (Gold)</label>
              <input type="text" value={settings.whyChoose?.titleHighlight || ''} onChange={(e) => handleWhyChooseChange('titleHighlight', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Subtitle / Description</label>
            <textarea rows="2" value={settings.whyChoose?.subtitle || ''} onChange={(e) => handleWhyChooseChange('subtitle', e.target.value)}></textarea>
          </div>

          <h4 style={{ margin: '15px 0 10px', fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase' }}>Key Statistics (4 slots)</h4>
          <div className="form-group-row">
            {settings.whyChoose?.stats?.map((stat, idx) => (
              <div key={idx} style={{ flex: 1, background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.75rem' }}>Stat {idx + 1} Value</label>
                  <input type="text" value={stat.value} onChange={(e) => handleStatChange(idx, 'value', e.target.value)} placeholder="e.g. 15,000+" style={{ padding: '6px 10px', fontSize: '0.85rem' }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.75rem' }}>Stat {idx + 1} Label</label>
                  <input type="text" value={stat.label} onChange={(e) => handleStatChange(idx, 'label', e.target.value)} placeholder="e.g. Procedures" style={{ padding: '6px 10px', fontSize: '0.85rem' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HERO SLIDER SECTION */}
        <div className="settings-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
            <h3 className="settings-card-title" style={{ border: 'none', padding: 0, margin: 0 }}>Main Hero Slider</h3>
            <button className="btn-add-item" style={{ padding: '8px 16px', marginTop: 0 }} onClick={addSlide}>
              <Plus size={16} /> Add Slide
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {settings.heroSlides.map((slide, idx) => (
              <div key={slide.id} className="admin-list-item-card" style={{ position: 'relative', display: 'block' }}>
                <button 
                  className="btn-icon-danger" 
                  style={{ position: 'absolute', top: '15px', right: '15px', width: '32px', height: '32px' }}
                  onClick={() => removeSlide(idx)}
                >
                  <Trash2 size={16} />
                </button>
                <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Slide {idx + 1}</h4>
                
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Top Badge Text</label>
                    <input type="text" value={slide.badge} onChange={(e) => handleSlideChange(idx, 'badge', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" value={slide.image} onChange={(e) => handleSlideChange(idx, 'image', e.target.value)} />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Main Title (Normal)</label>
                    <input type="text" value={slide.title} onChange={(e) => handleSlideChange(idx, 'title', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Main Title (Highlighted/Gold)</label>
                    <input type="text" value={slide.titleHighlight} onChange={(e) => handleSlideChange(idx, 'titleHighlight', e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description Paragraph</label>
                  <textarea rows="2" value={slide.description} onChange={(e) => handleSlideChange(idx, 'description', e.target.value)}></textarea>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Primary Button Text</label>
                    <input type="text" value={slide.primaryBtnText} onChange={(e) => handleSlideChange(idx, 'primaryBtnText', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Primary Button Link</label>
                    <input type="text" value={slide.primaryBtnLink} onChange={(e) => handleSlideChange(idx, 'primaryBtnLink', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Secondary Button Text</label>
                    <input type="text" value={slide.secondaryBtnText} onChange={(e) => handleSlideChange(idx, 'secondaryBtnText', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Secondary Button Link</label>
                    <input type="text" value={slide.secondaryBtnLink} onChange={(e) => handleSlideChange(idx, 'secondaryBtnLink', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeSettings;
