import React, { useState, useEffect } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Sparkles,
  Award,
  Video,
  HelpCircle,
  MessageSquare,
  Sliders,
  Phone,
  Layers,
  Star,
  Users,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  LayoutGrid,
  Type,
  Palette,
  Newspaper
} from 'lucide-react';
import ImageUploader from './ImageUploader';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import { defaultSectionsConfig } from '../pages/Home';
import { defaultFeaturedData, defaultMediaLogos } from '../FeaturedMedia';
import './AdminHomeSettings.css';

const defaultSettings = {
  sectionsConfig: defaultSectionsConfig,
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
      features: ['Ultherapy Prime', 'Fotona 4D Laser', 'Skin Boosters']
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
      features: ['NAD+ Rejuvenation', 'Limitless IV Drip', 'Immune Shield']
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
      features: ['Emsculpt NEO', 'Emerald Laser', 'FUE Hair Transplant']
    }
  ],
  celebritySpotlight: {
    title: 'Celebrity &',
    titleHighlight: 'VIP Spotlight',
    subtitle: 'Trusted by renowned Bollywood stars, models, and industry leaders for red-carpet radiance and clinical perfection.',
    images: [
      { id: 1, image: '/celebrities/celeb-1.jpg', alt: 'Celebrity Visit 1' },
      { id: 2, image: '/celebrities/celeb-2.jpg', alt: 'Celebrity Visit 2' },
      { id: 3, image: '/celebrities/celeb-3.jpg', alt: 'Celebrity Visit 3' },
      { id: 4, image: '/celebrities/celeb-4.jpg', alt: 'Celebrity Visit 4' },
      { id: 5, image: '/celebrities/celeb-5.jpg', alt: 'Celebrity Visit 5' },
      { id: 6, image: '/celebrities/celeb-6.jpg', alt: 'Celebrity Visit 6' }
    ]
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
    ],
    pillars: [
      { id: 1, title: 'Tailored Approach', tagline: 'Every treatment is designed around you', description: 'We reject one-size-fits-all solutions. Each protocol begins with comprehensive facial and body mapping to craft a bespoke treatment plan unique to your anatomy and goals.' },
      { id: 2, title: 'Clinical Expertise', tagline: 'Led by experienced specialists', description: 'Our team comprises board-certified aesthetic physicians, master dermatologists, and trichologists dedicated to the highest standards of safety, ethics, and medical mastery.' },
      { id: 3, title: 'Advanced Technology', tagline: 'Globally recognised systems', description: 'Powered by world-leading US-FDA approved aesthetic workstations, including Ultherapy Prime, Fotona 4D, Emsculpt NEO, and medical-grade cellular diagnostics.' },
      { id: 4, title: 'Natural Outcomes', tagline: 'Refinement without obvious change', description: 'Our philosophy centers on undetectable elegance. We enhance and restore your natural contours, delivering refreshed youthfulness without visible artificial alteration.' }
    ]
  },
  aboutClinic: {
    badge: 'AEVORA by Kian Clinics',
    pillars: 'Clinical Aesthetics • Weight-loss & Body Sculpting • Longevity & Wellness • Regenerative Gastro Care',
    tagline: 'Where Science Sculpts Confidence',
    philosophyTitle: 'The Philosophy of Aevum',
    philosophyText: 'Aevora is inspired by the Latin concept of Aevum—a timeless state between youth and eternity. It embodies our philosophy of helping you age intelligently through advanced aesthetic medicine, longevity medicine, regenerative therapies, and evidence-based wellness.',
    clinicName: 'Aevora Clinics',
    address: 'SCO 205 FF, Sector 5, Panchkula – 134114',
    phone: '+91 97797 66933',
    website: 'www.Aevoraclinics.com',
    buttonText: 'Book Appointment',
    buttonLink: '#book'
  },
  doctorSpotlight: {
    badge: 'FOUNDER & MEDICAL DIRECTOR',
    name: 'DR. MISHA',
    nameHighlight: 'GOEL',
    bio: 'MBBS, MD, FFAC. Aesthetic Physician • Trained in UK.',
    credentials: [
      'Aesthetic Physician',
      'Trained in UK'
    ],
    buttonText: 'KNOW MORE',
    buttonLink: '#doctors',
    image: '/doctors/dr-misha-goel.jpg'
  },
  teamSpecialists: {
    title: 'OUR TEAM OF',
    titleHighlight: 'SPECIALISTS',
    subtitle: 'Pioneering aesthetic medicine, surgical mastery, and longevity care led by globally qualified medical practitioners.',
    specialists: [
      {
        id: 1,
        name: 'Dr Misha Goel',
        role: 'Aesthetic Physician • Trained in UK',
        qualification: 'MBBS, MD, FFAC',
        experience: 'Aesthetic Physician',
        image: '/doctors/dr-misha-goel.jpg'
      },
      {
        id: 2,
        name: 'Dr Anupam Goel',
        role: 'Minimal Access Gastrointestinal, Bariatric (Weight-loss) & Robotic Surgeon',
        qualification: 'MBBS, MS, FNB',
        experience: 'Surgeon Specialist',
        image: '/doctors/dr-anupam-goel.jpg'
      }
    ]
  },
  treatmentsCarousel: [
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
  ],
  testimonials: {
    header: {
      badge: 'AUTHENTIC PATIENT EXPERIENCES',
      title: 'Words of Trust from',
      titleHighlight: 'Our Cherished Clients',
      description: "Discover why Panchkula's leading personalities, professionals, and aesthetic connoisseurs entrust their skin, hair, and wellness journeys to Aevora."
    },
    reviews: [
      {
        id: 1,
        name: 'Ananya Singhania',
        location: 'Sector 9, Panchkula',
        treatment: 'Laser Skin Resurfacing & Medi-Facial',
        rating: 5,
        date: 'Verified Review • 2 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        title: 'The most natural and radiant results I have ever experienced!',
        review: 'I was always hesitant about clinical skin procedures because I feared looking overdone. Dr. Meghna and the entire Aevora team completely changed my perspective. The subtle refinement, reduced pigmentation, and effortless glass-like glow are remarkable. True understated luxury.'
      },
      {
        id: 2,
        name: 'Rohit K. Mehra',
        location: 'Sector 20, Panchkula',
        treatment: 'GFC Hair Regrowth & Scalp Bio-Therapy',
        rating: 5,
        date: 'Verified Review • 1 month ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        title: 'Visible hair density within just 3 clinical sessions.',
        review: 'Suffering from early crown thinning was stressful. The protocol designed at Aevora was completely transparent, scientifically backed, and painless. 4 months in, my hair density and hairline feel substantially thicker and healthier. Truly world-class medical expertise.'
      },
      {
        id: 3,
        name: 'Dr. Radhika Merchant',
        location: 'MDC Sector 4, Panchkula',
        treatment: 'Ultherapy Prime & Non-Surgical Contouring',
        rating: 5,
        date: 'Verified Review • 3 weeks ago',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        title: 'Flawless jawline definition with absolute zero downtime.',
        review: 'As a physician myself, I am extremely particular about hygiene, equipment provenance, and anatomical understanding. Aevora operates at global standards. The ultrasound contouring gave me a crisp jawline contour without a single day of bruising or downtime.'
      }
    ]
  },
  faqSection: {
    header: {
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know about our specialized clinical treatments, safety standards, and consultation process.'
    },
    faqs: [
      {
        id: 1,
        category: 'general',
        question: 'What makes Aevora by Kian Clinics different from other aesthetic clinics?',
        answer: 'At Aevora, we adhere to the philosophy of "Natural Outcomes & Undetectable Refinement." Every treatment plan is personally curated by certified dermatologists and aesthetic physicians using US FDA-cleared technology.'
      },
      {
        id: 2,
        category: 'treatments',
        question: 'Are treatments painful, and will there be visible downtime or bruising?',
        answer: 'Most of our flagship procedures are non-invasive, virtually painless, and require zero downtime.'
      },
      {
        id: 3,
        category: 'consultation',
        question: 'How do I know which treatment is right for my specific skin or hair concerns?',
        answer: 'Your aesthetic journey begins with a comprehensive, private 1-on-1 clinical consultation and in-depth dermal analysis.'
      }
    ]
  },
  featuredMedia: defaultFeaturedData,
  floatingWidgets: {
    whatsappNumber: '+919779766933',
    whatsappLabel: 'WhatsApp Concierge',
    callNumber: '+919779766933',
    callLabel: 'Call Now',
    showWhatsapp: true,
    showCall: true
  }
};

const AdminHomeSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getDbSetting('home_page').then((saved) => {
      if (saved) {
        if (Array.isArray(saved)) {
          setSettings(prev => ({ ...prev, heroSlides: saved }));
        } else {
          setSettings(prev => ({
            ...prev,
            ...saved,
            sectionsConfig: (saved.sectionsConfig || defaultSectionsConfig).map(s => {
              if (s.id === 'doctor') return { ...s, enabled: false };
              return s;
            }),
            heroSlides: saved.heroSlides || prev.heroSlides,
            celebritySpotlight: { ...prev.celebritySpotlight, ...(saved.celebritySpotlight || {}) },
            videoShowcase: { ...prev.videoShowcase, ...(saved.videoShowcase || {}) },
            whyChoose: { ...prev.whyChoose, ...(saved.whyChoose || {}) },
            aboutClinic: { ...defaultSettings.aboutClinic, ...(saved.aboutClinic || {}) },
            doctorSpotlight: { ...prev.doctorSpotlight, ...(saved.doctorSpotlight || {}) },
            teamSpecialists: { 
              ...defaultSettings.teamSpecialists, 
              ...(saved.teamSpecialists || {}),
              specialists: (saved.teamSpecialists?.specialists && saved.teamSpecialists.specialists.some(s => s.name?.includes('Vivek Anand')))
                ? defaultSettings.teamSpecialists.specialists
                : (saved.teamSpecialists?.specialists || defaultSettings.teamSpecialists.specialists)
            },
            treatmentsCarousel: saved.treatmentsCarousel || prev.treatmentsCarousel,
            testimonials: { ...prev.testimonials, ...(saved.testimonials || {}) },
            featuredMedia: { ...defaultFeaturedData, ...(saved.featuredMedia || {}) },
            faqSection: { ...prev.faqSection, ...(saved.faqSection || {}) },
            floatingWidgets: { ...defaultSettings.floatingWidgets, ...(saved.floatingWidgets || {}) }
          }));
        }
      } else {
        const legacy = localStorage.getItem('aevora_home_settings');
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            if (Array.isArray(parsed)) {
              setSettings(prev => ({ ...prev, heroSlides: parsed }));
            } else {
              setSettings(prev => ({ ...prev, ...parsed }));
            }
          } catch (e) {}
        }
      }
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveDbSetting('home_page', settings);
      // Also cache in legacy key for safety
      try {
        localStorage.setItem('aevora_home_settings', JSON.stringify(settings));
      } catch (e) {}
      
      // Dispatch live update event so any active page updates instantly
      window.dispatchEvent(new CustomEvent('homeSettingsUpdated', { detail: settings }));

      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving home settings:', err);
      setIsSaving(false);
    }
  };

  // Helper updaters
  const updateNested = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const moveSection = (index, direction) => {
    const list = [...(settings.sectionsConfig || defaultSectionsConfig)];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    setSettings(prev => ({ ...prev, sectionsConfig: list }));
  };

  const toggleSectionProp = (index, prop) => {
    const list = [...(settings.sectionsConfig || defaultSectionsConfig)];
    list[index] = { ...list[index], [prop]: !list[index][prop] };
    setSettings(prev => ({ ...prev, sectionsConfig: list }));
  };

  const updateSectionStyle = (index, prop, value) => {
    const list = [...(settings.sectionsConfig || defaultSectionsConfig)];
    list[index] = { ...list[index], [prop]: value };
    setSettings(prev => ({ ...prev, sectionsConfig: list }));
  };

  const resetSectionOrder = () => {
    if (window.confirm("Reset all sections back to default homepage order and visibility?")) {
      setSettings(prev => ({ ...prev, sectionsConfig: defaultSectionsConfig }));
    }
  };

  const tabs = [
    { id: 'sectionsManager', label: 'Section Order & Visibility', icon: LayoutGrid },
    { id: 'hero', label: 'Hero Slides', icon: Layers },
    { id: 'celebrity', label: 'Celebrity Spotlight', icon: Sparkles },
    { id: 'video', label: 'Video Showcase', icon: Video },
    { id: 'whyChoose', label: 'Why Choose Us', icon: Sliders },
    { id: 'aboutClinic', label: 'About Clinic Intro', icon: Award },
    { id: 'doctor', label: 'Doctor Spotlight', icon: Award },
    { id: 'team', label: 'Team Specialists', icon: Users },
    { id: 'treatments', label: 'Treatments Carousel', icon: Layers },
    { id: 'testimonials', label: 'Patient Testimonials', icon: Star },
    { id: 'featuredMedia', label: 'Featured On (Logos)', icon: Newspaper },
    { id: 'faq', label: 'FAQ Section', icon: HelpCircle },
    { id: 'widgets', label: 'Floating Concierge', icon: Phone }
  ];

  const sectionTabMap = {
    hero: 'hero',
    celebrity: 'celebrity',
    video: 'video',
    whyChoose: 'whyChoose',
    aboutClinic: 'aboutClinic',
    doctor: 'doctor',
    team: 'team',
    treatments: 'treatments',
    testimonials: 'testimonials',
    media: 'featuredMedia',
    faq: 'faq'
  };

  return (
    <div className="admin-home-settings-container">
      {/* Header */}
      <div className="home-settings-header">
        <div>
          <h1 className="home-settings-title">Home Page Full CMS</h1>
          <p className="home-settings-subtitle">Manage section order, mobile/desktop visibility, fonts, colors, and content across the home page.</p>
        </div>
        <button className="btn-save-settings" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <span className="spinner"></span> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>Home page updated successfully! All website sections and visibility rules are now live.</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="home-settings-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`home-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 0: WORDPRESS-STYLE SECTION MANAGER (ORDER & VISIBILITY) */}
      {activeTab === 'sectionsManager' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Section Order, Layout &amp; Responsive Visibility</h3>
              <p className="tab-pane-desc">
                Reorder homepage sections (Move Up ⬆️ / Move Down ⬇️), hide specific sections on mobile or laptop, and customize font sizing and colors just like WordPress / Elementor.
              </p>
            </div>
            <button 
              className="btn-add-item" 
              style={{ width: 'auto', margin: 0, padding: '10px 18px', fontSize: '13px' }}
              onClick={resetSectionOrder}
            >
              Reset to Default Order
            </button>
          </div>

          <div className="section-manager-list">
            {(settings.sectionsConfig || defaultSectionsConfig).map((sec, idx, arr) => {
              const isDisabled = !sec.enabled;
              return (
                <div key={sec.id} className={`section-manager-card ${isDisabled ? 'is-disabled' : ''}`}>
                  <div className="section-card-top-row">
                    <div className="section-title-group">
                      <span className="section-order-index">#{idx + 1}</span>
                      <div>
                        <h4 className="section-name-text">{sec.name}</h4>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', fontSize: '12px', color: '#64748b' }}>
                          <span>{sec.enabled ? '🟢 Active' : '⚪ Disabled'}</span>
                          {sec.hideOnMobile && <span style={{ color: '#ef4444' }}>• 📱 Hidden on Mobile</span>}
                          {sec.hideOnDesktop && <span style={{ color: '#f59e0b' }}>• 💻 Hidden on Desktop</span>}
                          {sec.fontSize && sec.fontSize !== 'normal' && <span>• 🔤 Font: {sec.fontSize}</span>}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Move Up / Down Buttons */}
                      <div className="section-order-actions">
                        <button 
                          className="order-btn" 
                          disabled={idx === 0} 
                          onClick={() => moveSection(idx, -1)}
                          title="Move Section Up (Shift higher on page)"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button 
                          className="order-btn" 
                          disabled={idx === arr.length - 1} 
                          onClick={() => moveSection(idx, 1)}
                          title="Move Section Down (Shift lower on page)"
                        >
                          <ArrowDown size={16} />
                        </button>
                      </div>

                      {/* Jump to content editor button */}
                      {sectionTabMap[sec.id] && (
                        <button
                          onClick={() => setActiveTab(sectionTabMap[sec.id])}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '8px 14px',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            color: '#0d382c',
                            cursor: 'pointer'
                          }}
                        >
                          Edit Content ➜
                        </button>
                      )}
                    </div>
                  </div>

                  {/* WordPress-style Visibility & Style Controls Grid */}
                  <div className="section-controls-grid">
                    
                    {/* Master Enable & Device Toggles */}
                    <div className="control-item" style={{ gridColumn: '1 / -1' }}>
                      <label>Visibility Controls</label>
                      <div className="visibility-checkbox-group">
                        <label className="visibility-checkbox-label">
                          <input 
                            type="checkbox" 
                            checked={sec.enabled !== false} 
                            onChange={() => toggleSectionProp(idx, 'enabled')} 
                          />
                          <span>Show on Website</span>
                        </label>

                        <label className={`visibility-checkbox-label ${sec.hideOnMobile ? 'checked-warning' : ''}`}>
                          <input 
                            type="checkbox" 
                            checked={!!sec.hideOnMobile} 
                            onChange={() => toggleSectionProp(idx, 'hideOnMobile')} 
                          />
                          <Smartphone size={14} />
                          <span>Hide on Mobile (&lt; 768px)</span>
                        </label>

                        <label className={`visibility-checkbox-label ${sec.hideOnDesktop ? 'checked-warning' : ''}`}>
                          <input 
                            type="checkbox" 
                            checked={!!sec.hideOnDesktop} 
                            onChange={() => toggleSectionProp(idx, 'hideOnDesktop')} 
                          />
                          <Monitor size={14} />
                          <span>Hide on Desktop / Laptop (&ge; 769px)</span>
                        </label>
                      </div>
                    </div>

                    {/* Font Size Scaling */}
                    <div className="control-item">
                      <label>Font Size Scale</label>
                      <select 
                        value={sec.fontSize || 'normal'} 
                        onChange={(e) => updateSectionStyle(idx, 'fontSize', e.target.value)}
                      >
                        <option value="sm">Small (90%)</option>
                        <option value="normal">Normal (100% Default)</option>
                        <option value="lg">Large (115% Bigger)</option>
                        <option value="xl">Extra Large (130% Heroic)</option>
                      </select>
                    </div>

                    {/* Font Family Override */}
                    <div className="control-item" style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Section Font Family</span>
                        {sec.fontFamily && sec.fontFamily !== 'default' && (
                          <span style={{ 
                            fontFamily: sec.fontFamily, 
                            fontSize: '0.82rem', 
                            color: '#0d382c', 
                            background: '#e6f4ea', 
                            padding: '2px 8px', 
                            borderRadius: '4px' 
                          }}>
                            Sample: Ageless Luxury 123
                          </span>
                        )}
                      </label>
                      <select 
                        value={sec.fontFamily || 'default'} 
                        onChange={(e) => updateSectionStyle(idx, 'fontFamily', e.target.value)}
                        style={{ marginBottom: '6px' }}
                      >
                        <option value="default">Default Site Theme (Inherit Global)</option>
                        <optgroup label="Editorial Luxury Serifs">
                          <option value="'Playfair Display', Georgia, serif">Playfair Display (Editorial High-Fashion)</option>
                          <option value="'Cormorant Garamond', Georgia, serif">Cormorant Garamond (Classical Luxury Elegance)</option>
                          <option value="'Cinzel', serif">Cinzel (Roman Architectural Luxury)</option>
                          <option value="'Cinzel Decorative', serif">Cinzel Decorative (Ornate Luxury)</option>
                          <option value="'Bodoni Moda', serif">Bodoni Moda (Vogue High-Contrast Serif)</option>
                          <option value="'Prata', serif">Prata (Didone Delicate Luxury)</option>
                          <option value="'Marcellus', serif">Marcellus (Sculpted Roman Classic)</option>
                          <option value="'Italiana', serif">Italiana (Italian Haute Couture)</option>
                          <option value="'DM Serif Display', serif">DM Serif Display (Punchy Editorial Serif)</option>
                          <option value="'Lora', serif">Lora (Contemporary Literary Serif)</option>
                        </optgroup>
                        <optgroup label="Modern Luxury Sans-Serifs">
                          <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Modern Executive Sans)</option>
                          <option value="'Inter', sans-serif">Inter (Crisp High Legibility)</option>
                          <option value="'Outfit', sans-serif">Outfit (Contemporary Minimalist)</option>
                          <option value="'Montserrat', sans-serif">Montserrat (Geometric Luxury Brand)</option>
                          <option value="'Poppins', sans-serif">Poppins (Modern Geometric Rounded)</option>
                          <option value="'Manrope', sans-serif">Manrope (Clean Semi-Geometric)</option>
                          <option value="'Urbanist', sans-serif">Urbanist (Modernist Sans)</option>
                        </optgroup>
                      </select>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text" 
                          placeholder="Or type any Google Font (e.g. Syne, Alex Brush, Cinzel)..."
                          value={sec.customFontInput || ''} 
                          onChange={(e) => updateSectionStyle(idx, 'customFontInput', e.target.value)}
                          style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => {
                            if (sec.customFontInput && sec.customFontInput.trim()) {
                              updateSectionStyle(idx, 'fontFamily', `'${sec.customFontInput.trim()}', serif`);
                            }
                          }}
                          style={{ padding: '6px 12px', fontSize: '12px', background: '#0d382c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          Apply Custom Font
                        </button>
                      </div>
                    </div>

                    {/* Section Padding / Spacing */}
                    <div className="control-item">
                      <label>Section Vertical Spacing</label>
                      <select 
                        value={sec.padding || 'normal'} 
                        onChange={(e) => updateSectionStyle(idx, 'padding', e.target.value)}
                      >
                        <option value="compact">Compact (Tighter Spacing)</option>
                        <option value="normal">Standard (Default Spacing)</option>
                        <option value="spacious">Spacious (Airy Luxury)</option>
                      </select>
                    </div>

                    {/* Section Background Color Override */}
                    <div className="control-item">
                      <label>Section Background Color</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="color" 
                          value={sec.bgColor || '#ffffff'} 
                          onChange={(e) => updateSectionStyle(idx, 'bgColor', e.target.value)}
                          style={{ width: '36px', height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                        />
                        <input 
                          type="text" 
                          placeholder="e.g. #f4f8f5" 
                          value={sec.bgColor || ''} 
                          onChange={(e) => updateSectionStyle(idx, 'bgColor', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        {sec.bgColor && (
                          <button 
                            type="button"
                            onClick={() => updateSectionStyle(idx, 'bgColor', '')}
                            style={{ padding: '6px 10px', fontSize: '11px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
                            title="Reset to default background"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Section Text Color Override */}
                    <div className="control-item">
                      <label>Section Text Color</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="color" 
                          value={sec.textColor || '#111e19'} 
                          onChange={(e) => updateSectionStyle(idx, 'textColor', e.target.value)}
                          style={{ width: '36px', height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                        />
                        <input 
                          type="text" 
                          placeholder="e.g. #111e19" 
                          value={sec.textColor || ''} 
                          onChange={(e) => updateSectionStyle(idx, 'textColor', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        {sec.textColor && (
                          <button 
                            type="button"
                            onClick={() => updateSectionStyle(idx, 'textColor', '')}
                            style={{ padding: '6px 10px', fontSize: '11px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
                            title="Reset to default text color"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 1: HERO SLIDES */}
      {activeTab === 'hero' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Hero Banner Slider</h3>
              <p className="tab-pane-desc">Manage the top rotating hero slides, headlines, and call-to-actions.</p>
            </div>
            <button 
              className="btn-add-item" 
              style={{ width: 'auto', margin: 0 }}
              onClick={() => {
                const newSlide = {
                  id: Date.now(),
                  badge: 'NEW SPECIALTY',
                  title: 'Precision Treatment For',
                  titleHighlight: 'Radiant Results',
                  description: 'Experience bespoke therapies crafted by certified physicians.',
                  primaryBtnText: 'Explore Treatments',
                  primaryBtnLink: '/#treatments',
                  secondaryBtnText: 'Book Consultation',
                  secondaryBtnLink: '/#book',
                  image: '/banners/banner-skin.jpg',
                  features: ['Certified Care', 'US FDA Tech']
                };
                setSettings(prev => ({ ...prev, heroSlides: [...prev.heroSlides, newSlide] }));
              }}
            >
              <Plus size={16} /> Add New Slide
            </button>
          </div>

          {(settings.heroSlides || []).map((slide, index) => (
            <div key={slide.id || index} className="item-card-wrapper">
              <div className="item-card-header">
                <span className="item-card-index">Slide #{index + 1}</span>
                <button 
                  className="btn-delete-item"
                  onClick={() => {
                    const updated = [...settings.heroSlides];
                    updated.splice(index, 1);
                    setSettings(prev => ({ ...prev, heroSlides: updated }));
                  }}
                >
                  <Trash2 size={14} /> Remove Slide
                </button>
              </div>

              <div className="settings-grid-2">
                <div className="settings-form-group">
                  <label>Title Prefix</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={slide.title || ''} 
                    onChange={e => {
                      const updated = [...settings.heroSlides];
                      updated[index].title = e.target.value;
                      setSettings(prev => ({ ...prev, heroSlides: updated }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Title Highlight (Gold Accent)</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={slide.titleHighlight || ''} 
                    onChange={e => {
                      const updated = [...settings.heroSlides];
                      updated[index].titleHighlight = e.target.value;
                      setSettings(prev => ({ ...prev, heroSlides: updated }));
                    }}
                  />
                </div>
              </div>

              <div className="settings-form-group" style={{ marginBottom: '16px' }}>
                <label>Background Banner Image</label>
                <ImageUploader 
                  currentUrl={slide.image || ''}
                  initialImage={slide.image || ''} 
                  onSelect={img => {
                    const updated = [...settings.heroSlides];
                    updated[index].image = img;
                    setSettings(prev => ({ ...prev, heroSlides: updated }));
                  }}
                  onImageSelected={img => {
                    const updated = [...settings.heroSlides];
                    updated[index].image = img;
                    setSettings(prev => ({ ...prev, heroSlides: updated }));
                  }}
                />
              </div>

              <div className="settings-form-group" style={{ marginBottom: '16px' }}>
                <label>Description Paragraph</label>
                <textarea 
                  className="settings-textarea" 
                  value={slide.description || ''} 
                  onChange={e => {
                    const updated = [...settings.heroSlides];
                    updated[index].description = e.target.value;
                    setSettings(prev => ({ ...prev, heroSlides: updated }));
                  }}
                />
              </div>

              <div className="settings-grid-2">
                <div className="settings-form-group">
                  <label>Primary Button Label</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={slide.primaryBtnText || ''} 
                    onChange={e => {
                      const updated = [...settings.heroSlides];
                      updated[index].primaryBtnText = e.target.value;
                      setSettings(prev => ({ ...prev, heroSlides: updated }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Primary Button Link</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={slide.primaryBtnLink || ''} 
                    onChange={e => {
                      const updated = [...settings.heroSlides];
                      updated[index].primaryBtnLink = e.target.value;
                      setSettings(prev => ({ ...prev, heroSlides: updated }));
                    }}
                  />
                </div>
              </div>

              <div className="settings-grid-2">
                <div className="settings-form-group">
                  <label>Secondary Button Label</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={slide.secondaryBtnText || ''} 
                    onChange={e => {
                      const updated = [...settings.heroSlides];
                      updated[index].secondaryBtnText = e.target.value;
                      setSettings(prev => ({ ...prev, heroSlides: updated }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Secondary Button Link</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={slide.secondaryBtnLink || ''} 
                    onChange={e => {
                      const updated = [...settings.heroSlides];
                      updated[index].secondaryBtnLink = e.target.value;
                      setSettings(prev => ({ ...prev, heroSlides: updated }));
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CELEBRITY SPOTLIGHT */}
      {activeTab === 'celebrity' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Celebrity & VIP Spotlight</h3>
              <p className="tab-pane-desc">Manage the A-lister stars, Bollywood VIP visits, photos, and headers.</p>
            </div>
            <button 
              className="btn-add-item" 
              style={{ width: 'auto', margin: 0 }}
              onClick={() => {
                const newImg = {
                  id: Date.now(),
                  image: '/celebrities/celeb-1.jpg',
                  alt: 'VIP Guest'
                };
                setSettings(prev => ({
                  ...prev,
                  celebritySpotlight: {
                    ...prev.celebritySpotlight,
                    images: [...(prev.celebritySpotlight.images || []), newImg]
                  }
                }));
              }}
            >
              <Plus size={16} /> Add Celebrity Photo
            </button>
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Section Title Prefix</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.celebritySpotlight?.title || ''} 
                onChange={e => updateNested('celebritySpotlight', 'title', e.target.value)}
              />
            </div>
            <div className="settings-form-group">
              <label>Title Highlight (Gold Accent)</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.celebritySpotlight?.titleHighlight || ''} 
                onChange={e => updateNested('celebritySpotlight', 'titleHighlight', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-form-group" style={{ marginBottom: '24px' }}>
            <label>Subtitle / Description</label>
            <textarea 
              className="settings-textarea" 
              value={settings.celebritySpotlight?.subtitle || ''} 
              onChange={e => updateNested('celebritySpotlight', 'subtitle', e.target.value)}
            />
          </div>

          <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px' }}>Celebrity Showcase Gallery</h4>
          <div className="settings-grid-3">
            {(settings.celebritySpotlight?.images || []).map((item, index) => (
              <div key={item.id || index} className="item-card-wrapper" style={{ padding: '16px' }}>
                <div className="item-card-header" style={{ marginBottom: '12px' }}>
                  <span className="item-card-index">Photo #{index + 1}</span>
                  <button 
                    className="btn-delete-item"
                    onClick={() => {
                      const updated = [...settings.celebritySpotlight.images];
                      updated.splice(index, 1);
                      updateNested('celebritySpotlight', 'images', updated);
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <ImageUploader 
                  currentUrl={item.image || ''}
                  initialImage={item.image || ''} 
                  onSelect={img => {
                    const updated = [...settings.celebritySpotlight.images];
                    updated[index].image = img;
                    updateNested('celebritySpotlight', 'images', updated);
                  }}
                  onImageSelected={img => {
                    const updated = [...settings.celebritySpotlight.images];
                    updated[index].image = img;
                    updateNested('celebritySpotlight', 'images', updated);
                  }}
                />
                <div className="settings-form-group" style={{ marginTop: '10px' }}>
                  <label>Celebrity Name / Caption</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={item.alt || ''} 
                    onChange={e => {
                      const updated = [...settings.celebritySpotlight.images];
                      updated[index].alt = e.target.value;
                      updateNested('celebritySpotlight', 'images', updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VIDEO SHOWCASE */}
      {activeTab === 'video' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Video Showcase</h3>
              <p className="tab-pane-desc">Edit the embedded clinical video showcase and cover thumbnail.</p>
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Cover Thumbnail Image</label>
              <ImageUploader 
                currentUrl={settings.videoShowcase?.thumbnail || ''}
                initialImage={settings.videoShowcase?.thumbnail || ''} 
                onSelect={img => updateNested('videoShowcase', 'thumbnail', img)}
                onImageSelected={img => updateNested('videoShowcase', 'thumbnail', img)}
              />
            </div>
            <div className="settings-form-group">
              <label>Video URL (YouTube Embed / MP4)</label>
              <input 
                type="text" 
                className="settings-input" 
                placeholder="https://www.youtube.com/embed/..." 
                value={settings.videoShowcase?.videoUrl || ''} 
                onChange={e => updateNested('videoShowcase', 'videoUrl', e.target.value)}
              />
              <span style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                Tip: Use a YouTube embed link like <code>https://www.youtube.com/embed/VIDEO_ID</code>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WHY CHOOSE AEVORA */}
      {activeTab === 'whyChoose' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Why Choose Aevora</h3>
              <p className="tab-pane-desc">Manage the 4 pillars of excellence, credentials, and live stats counters.</p>
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Section Title Prefix</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.whyChoose?.title || ''} 
                onChange={e => updateNested('whyChoose', 'title', e.target.value)}
              />
            </div>
            <div className="settings-form-group">
              <label>Title Highlight (Gold Accent)</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.whyChoose?.titleHighlight || ''} 
                onChange={e => updateNested('whyChoose', 'titleHighlight', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-form-group" style={{ marginBottom: '24px' }}>
            <label>Subtitle</label>
            <textarea 
              className="settings-textarea" 
              value={settings.whyChoose?.subtitle || ''} 
              onChange={e => updateNested('whyChoose', 'subtitle', e.target.value)}
            />
          </div>

          <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px' }}>4 Live Stats Counters</h4>
          <div className="settings-grid-2">
            {(settings.whyChoose?.stats || []).map((stat, sIdx) => (
              <div key={sIdx} className="item-card-wrapper" style={{ padding: '16px' }}>
                <div className="settings-grid-2">
                  <div className="settings-form-group">
                    <label>Counter Value (e.g. 15,000+)</label>
                    <input 
                      type="text" 
                      className="settings-input" 
                      value={stat.value || ''} 
                      onChange={e => {
                        const updated = [...settings.whyChoose.stats];
                        updated[sIdx].value = e.target.value;
                        updateNested('whyChoose', 'stats', updated);
                      }}
                    />
                  </div>
                  <div className="settings-form-group">
                    <label>Label</label>
                    <input 
                      type="text" 
                      className="settings-input" 
                      value={stat.label || ''} 
                      onChange={e => {
                        const updated = [...settings.whyChoose.stats];
                        updated[sIdx].label = e.target.value;
                        updateNested('whyChoose', 'stats', updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: '15px', color: '#0f172a', margin: '20px 0 14px 0' }}>4 Core Pillars</h4>
          {(settings.whyChoose?.pillars || []).map((pillar, pIdx) => (
            <div key={pillar.id || pIdx} className="item-card-wrapper">
              <div className="item-card-header">
                <span className="item-card-index">Pillar 0{pIdx + 1}: {pillar.title}</span>
              </div>
              <div className="settings-grid-2">
                <div className="settings-form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={pillar.title || ''} 
                    onChange={e => {
                      const updated = [...settings.whyChoose.pillars];
                      updated[pIdx].title = e.target.value;
                      updateNested('whyChoose', 'pillars', updated);
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Tagline</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={pillar.tagline || ''} 
                    onChange={e => {
                      const updated = [...settings.whyChoose.pillars];
                      updated[pIdx].tagline = e.target.value;
                      updateNested('whyChoose', 'pillars', updated);
                    }}
                  />
                </div>
              </div>
              <div className="settings-form-group">
                <label>Description</label>
                <textarea 
                  className="settings-textarea" 
                  value={pillar.description || ''} 
                  onChange={e => {
                    const updated = [...settings.whyChoose.pillars];
                    updated[pIdx].description = e.target.value;
                    updateNested('whyChoose', 'pillars', updated);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: ABOUT CLINIC INTRO */}
      {activeTab === 'aboutClinic' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">About Clinic Introduction & Aevum Philosophy</h3>
              <p className="tab-pane-desc">Manage the brand banner, pillars, tagline, philosophy text, dual imagery, and clinic appointment details.</p>
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Brand Eyebrow Badge</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.aboutClinic?.badge || ''} 
                placeholder="AEVORA by Kian Clinics"
                onChange={e => updateNested('aboutClinic', 'badge', e.target.value)}
              />
            </div>
            <div className="settings-form-group">
              <label>Section Tagline (Main Heading)</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.aboutClinic?.tagline || ''} 
                placeholder="Where Science Sculpts Confidence"
                onChange={e => updateNested('aboutClinic', 'tagline', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-form-group" style={{ marginBottom: '16px' }}>
            <label>4 Clinical Pillars (Separated by • or comma)</label>
            <input 
              type="text" 
              className="settings-input" 
              value={Array.isArray(settings.aboutClinic?.pillars) ? settings.aboutClinic.pillars.join(' • ') : (settings.aboutClinic?.pillars || '')} 
              placeholder="Clinical Aesthetics • Weight-loss & Body Sculpting • Longevity & Wellness • Regenerative Gastro Care"
              onChange={e => updateNested('aboutClinic', 'pillars', e.target.value)}
            />
          </div>

          <div className="settings-form-group" style={{ marginBottom: '24px' }}>
            <label>Aevum Philosophy Narrative</label>
            <textarea 
              rows={4}
              className="settings-textarea" 
              value={settings.aboutClinic?.philosophyText || ''} 
              placeholder="Aevora is inspired by the Latin concept of Aevum—a timeless state between youth and eternity. It embodies our philosophy of helping you age intelligently through advanced aesthetic medicine, longevity medicine, regenerative therapies, and evidence-based wellness."
              onChange={e => updateNested('aboutClinic', 'philosophyText', e.target.value)}
            />
          </div>

          <div className="settings-grid-3">
            <div className="settings-form-group">
              <label>Clinic Address</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.aboutClinic?.address || ''} 
                placeholder="SCO 205 FF, Sector 5, Panchkula – 134114"
                onChange={e => updateNested('aboutClinic', 'address', e.target.value)}
              />
            </div>
            <div className="settings-form-group">
              <label>Appointment Phone</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.aboutClinic?.phone || ''} 
                placeholder="+91 97797 66933"
                onChange={e => updateNested('aboutClinic', 'phone', e.target.value)}
              />
            </div>
            <div className="settings-form-group">
              <label>Website URL</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.aboutClinic?.website || ''} 
                placeholder="www.Aevoraclinics.com"
                onChange={e => updateNested('aboutClinic', 'website', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DOCTOR SPOTLIGHT */}
      {activeTab === 'doctor' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Lead Doctor Spotlight</h3>
              <p className="tab-pane-desc">Edit founder bio, credentials, badges, portrait, and read more link.</p>
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Badge Text</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.doctorSpotlight?.badge || ''} 
                onChange={e => updateNested('doctorSpotlight', 'badge', e.target.value)}
              />
            </div>
            <div className="settings-form-group">
              <label>Doctor Name Prefix</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.doctorSpotlight?.name || ''} 
                onChange={e => updateNested('doctorSpotlight', 'name', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Doctor Name Highlight (Gold Accent)</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.doctorSpotlight?.nameHighlight || ''} 
                onChange={e => updateNested('doctorSpotlight', 'nameHighlight', e.target.value)}
              />
            </div>
            <div className="settings-form-group">
              <label>Button Label & Link</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  className="settings-input" 
                  placeholder="KNOW MORE"
                  value={settings.doctorSpotlight?.buttonText || ''} 
                  onChange={e => updateNested('doctorSpotlight', 'buttonText', e.target.value)}
                />
                <input 
                  type="text" 
                  className="settings-input" 
                  placeholder="/about#founding-team"
                  value={settings.doctorSpotlight?.buttonLink || ''} 
                  onChange={e => updateNested('doctorSpotlight', 'buttonLink', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="settings-form-group" style={{ marginBottom: '16px' }}>
            <label>Biography</label>
            <textarea 
              className="settings-textarea" 
              value={settings.doctorSpotlight?.bio || ''} 
              onChange={e => updateNested('doctorSpotlight', 'bio', e.target.value)}
            />
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Doctor Portrait Image</label>
              <ImageUploader 
                currentUrl={settings.doctorSpotlight?.image || ''}
                initialImage={settings.doctorSpotlight?.image || ''} 
                onSelect={img => updateNested('doctorSpotlight', 'image', img)}
                onImageSelected={img => updateNested('doctorSpotlight', 'image', img)}
              />
            </div>
            <div className="settings-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label>Key Credentials</label>
                <button 
                  className="btn-add-item" 
                  style={{ width: 'auto', padding: '4px 10px', fontSize: '12px' }}
                  onClick={() => {
                    const current = settings.doctorSpotlight?.credentials || [];
                    updateNested('doctorSpotlight', 'credentials', [...current, 'New Medical Credential']);
                  }}
                >
                  <Plus size={12} /> Add Credential
                </button>
              </div>
              {(settings.doctorSpotlight?.credentials || []).map((cred, cIdx) => (
                <div key={cIdx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={cred} 
                    onChange={e => {
                      const updated = [...settings.doctorSpotlight.credentials];
                      updated[cIdx] = e.target.value;
                      updateNested('doctorSpotlight', 'credentials', updated);
                    }}
                  />
                  <button 
                    className="btn-delete-item" 
                    style={{ padding: '8px' }}
                    onClick={() => {
                      const updated = [...settings.doctorSpotlight.credentials];
                      updated.splice(cIdx, 1);
                      updateNested('doctorSpotlight', 'credentials', updated);
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: TEAM OF SPECIALISTS */}
      {activeTab === 'team' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Team of Specialists</h3>
              <p className="tab-pane-desc">Manage the team section headlines and all specialist physician cards.</p>
            </div>
            <button 
              className="btn-add-item" 
              style={{ width: 'auto', margin: 0 }}
              onClick={() => {
                const newDoc = {
                  id: Date.now(),
                  name: 'Dr. New Specialist',
                  role: 'Consultant Dermatologist',
                  qualification: 'MD (Dermatology)',
                  experience: '10+ Years Experience',
                  specialties: ['Clinical Dermatology', 'Laser Science'],
                  image: '/doctors/team-doc-1.jpg'
                };
                setSettings(prev => ({
                  ...prev,
                  teamSpecialists: {
                    ...prev.teamSpecialists,
                    specialists: [...(prev.teamSpecialists.specialists || []), newDoc]
                  }
                }));
              }}
            >
              <Plus size={16} /> Add Specialist
            </button>
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Title Prefix</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.teamSpecialists?.title || ''} 
                onChange={e => updateNested('teamSpecialists', 'title', e.target.value)}
              />
            </div>
            <div className="settings-form-group">
              <label>Title Highlight</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.teamSpecialists?.titleHighlight || ''} 
                onChange={e => updateNested('teamSpecialists', 'titleHighlight', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-form-group" style={{ marginBottom: '24px' }}>
            <label>Subtitle Description</label>
            <textarea 
              className="settings-textarea" 
              value={settings.teamSpecialists?.subtitle || ''} 
              onChange={e => updateNested('teamSpecialists', 'subtitle', e.target.value)}
            />
          </div>

          <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px' }}>Specialist Cards</h4>
          {(settings.teamSpecialists?.specialists || []).map((doc, dIdx) => (
            <div key={doc.id || dIdx} className="item-card-wrapper">
              <div className="item-card-header">
                <span className="item-card-index">Specialist #{dIdx + 1}: {doc.name}</span>
                <button 
                  className="btn-delete-item"
                  onClick={() => {
                    const updated = [...settings.teamSpecialists.specialists];
                    updated.splice(dIdx, 1);
                    updateNested('teamSpecialists', 'specialists', updated);
                  }}
                >
                  <Trash2 size={14} /> Remove Doctor
                </button>
              </div>

              <div className="settings-grid-2">
                <div className="settings-form-group">
                  <label>Doctor Name</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={doc.name || ''} 
                    onChange={e => {
                      const updated = [...settings.teamSpecialists.specialists];
                      updated[dIdx].name = e.target.value;
                      updateNested('teamSpecialists', 'specialists', updated);
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Clinical Role / Title</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={doc.role || ''} 
                    onChange={e => {
                      const updated = [...settings.teamSpecialists.specialists];
                      updated[dIdx].role = e.target.value;
                      updateNested('teamSpecialists', 'specialists', updated);
                    }}
                  />
                </div>
              </div>

              <div className="settings-grid-2">
                <div className="settings-form-group">
                  <label>Qualifications</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={doc.qualification || ''} 
                    onChange={e => {
                      const updated = [...settings.teamSpecialists.specialists];
                      updated[dIdx].qualification = e.target.value;
                      updateNested('teamSpecialists', 'specialists', updated);
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Experience Badge (e.g. 15+ Years)</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={doc.experience || ''} 
                    onChange={e => {
                      const updated = [...settings.teamSpecialists.specialists];
                      updated[dIdx].experience = e.target.value;
                      updateNested('teamSpecialists', 'specialists', updated);
                    }}
                  />
                </div>
              </div>

              <div className="settings-form-group" style={{ marginTop: '14px' }}>
                <label>Doctor Photo</label>
                <ImageUploader 
                  currentUrl={doc.image || ''}
                  initialImage={doc.image || ''} 
                  onSelect={img => {
                    const updated = [...settings.teamSpecialists.specialists];
                    updated[dIdx].image = img;
                    updateNested('teamSpecialists', 'specialists', updated);
                  }}
                  onImageSelected={img => {
                    const updated = [...settings.teamSpecialists.specialists];
                    updated[dIdx].image = img;
                    updateNested('teamSpecialists', 'specialists', updated);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 8: TREATMENTS CAROUSEL */}
      {activeTab === 'treatments' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Treatments Category Carousel</h3>
              <p className="tab-pane-desc">Manage the treatment category cards displayed on the home page.</p>
            </div>
            <button 
              className="btn-add-item" 
              style={{ width: 'auto', margin: 0 }}
              onClick={() => {
                const newCat = {
                  id: Date.now(),
                  category: 'SPECIALTY',
                  title: 'New Treatment Pillar',
                  description: 'Clinical procedures customized for natural beauty.',
                  image: '/treatments/treatment-skin.jpg',
                  link: '/treatments'
                };
                setSettings(prev => ({ ...prev, treatmentsCarousel: [...prev.treatmentsCarousel, newCat] }));
              }}
            >
              <Plus size={16} /> Add Category Card
            </button>
          </div>

          {(settings.treatmentsCarousel || []).map((item, index) => (
            <div key={item.id || index} className="item-card-wrapper">
              <div className="item-card-header">
                <span className="item-card-index">Category #{index + 1}: {item.category}</span>
                <button 
                  className="btn-delete-item"
                  onClick={() => {
                    const updated = [...settings.treatmentsCarousel];
                    updated.splice(index, 1);
                    setSettings(prev => ({ ...prev, treatmentsCarousel: updated }));
                  }}
                >
                  <Trash2 size={14} /> Remove Card
                </button>
              </div>

              <div className="settings-grid-3">
                <div className="settings-form-group">
                  <label>Category Label (e.g. FACE/SKIN)</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={item.category || ''} 
                    onChange={e => {
                      const updated = [...settings.treatmentsCarousel];
                      updated[index].category = e.target.value;
                      setSettings(prev => ({ ...prev, treatmentsCarousel: updated }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Card Title</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={item.title || ''} 
                    onChange={e => {
                      const updated = [...settings.treatmentsCarousel];
                      updated[index].title = e.target.value;
                      setSettings(prev => ({ ...prev, treatmentsCarousel: updated }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Target Page Link</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={item.link || ''} 
                    onChange={e => {
                      const updated = [...settings.treatmentsCarousel];
                      updated[index].link = e.target.value;
                      setSettings(prev => ({ ...prev, treatmentsCarousel: updated }));
                    }}
                  />
                </div>
              </div>

              <div className="settings-grid-2">
                <div className="settings-form-group">
                  <label>Short Description</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={item.description || ''} 
                    onChange={e => {
                      const updated = [...settings.treatmentsCarousel];
                      updated[index].description = e.target.value;
                      setSettings(prev => ({ ...prev, treatmentsCarousel: updated }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Card Image</label>
                  <ImageUploader 
                    currentUrl={item.image || ''}
                    initialImage={item.image || ''} 
                    onSelect={img => {
                      const updated = [...settings.treatmentsCarousel];
                      updated[index].image = img;
                      setSettings(prev => ({ ...prev, treatmentsCarousel: updated }));
                    }}
                    onImageSelected={img => {
                      const updated = [...settings.treatmentsCarousel];
                      updated[index].image = img;
                      setSettings(prev => ({ ...prev, treatmentsCarousel: updated }));
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 9: PATIENT TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Patient Testimonials & Reviews</h3>
              <p className="tab-pane-desc">Manage reviews, ratings, patient avatars, quotes, and header text.</p>
            </div>
            <button 
              className="btn-add-item" 
              style={{ width: 'auto', margin: 0 }}
              onClick={() => {
                const newReview = {
                  id: Date.now(),
                  name: 'New Client',
                  location: 'Sector 5, Panchkula',
                  treatment: 'Signature Skin Rejuvenation',
                  rating: 5,
                  date: 'Verified Review • Recently',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                  title: 'Incredible results!',
                  review: 'The clinical care and attention to detail at Aevora are unmatched.'
                };
                setSettings(prev => ({
                  ...prev,
                  testimonials: {
                    ...prev.testimonials,
                    reviews: [...(prev.testimonials.reviews || []), newReview]
                  }
                }));
              }}
            >
              <Plus size={16} /> Add Testimonial
            </button>
          </div>

          <div className="settings-grid-3">
            <div className="settings-form-group">
              <label>Top Badge</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.testimonials?.header?.badge || ''} 
                onChange={e => {
                  setSettings(prev => ({
                    ...prev,
                    testimonials: {
                      ...prev.testimonials,
                      header: { ...prev.testimonials.header, badge: e.target.value }
                    }
                  }));
                }}
              />
            </div>
            <div className="settings-form-group">
              <label>Title Prefix</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.testimonials?.header?.title || ''} 
                onChange={e => {
                  setSettings(prev => ({
                    ...prev,
                    testimonials: {
                      ...prev.testimonials,
                      header: { ...prev.testimonials.header, title: e.target.value }
                    }
                  }));
                }}
              />
            </div>
            <div className="settings-form-group">
              <label>Title Highlight</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.testimonials?.header?.titleHighlight || ''} 
                onChange={e => {
                  setSettings(prev => ({
                    ...prev,
                    testimonials: {
                      ...prev.testimonials,
                      header: { ...prev.testimonials.header, titleHighlight: e.target.value }
                    }
                  }));
                }}
              />
            </div>
          </div>

          <div className="settings-form-group" style={{ marginBottom: '24px' }}>
            <label>Section Description</label>
            <textarea 
              className="settings-textarea" 
              value={settings.testimonials?.header?.description || ''} 
              onChange={e => {
                setSettings(prev => ({
                  ...prev,
                  testimonials: {
                    ...prev.testimonials,
                    header: { ...prev.testimonials.header, description: e.target.value }
                  }
                }));
              }}
            />
          </div>

          <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px' }}>Patient Reviews List</h4>
          {(settings.testimonials?.reviews || []).map((review, rIdx) => (
            <div key={review.id || rIdx} className="item-card-wrapper">
              <div className="item-card-header">
                <span className="item-card-index">Review #{rIdx + 1}: {review.name}</span>
                <button 
                  className="btn-delete-item"
                  onClick={() => {
                    const updated = [...settings.testimonials.reviews];
                    updated.splice(rIdx, 1);
                    setSettings(prev => ({
                      ...prev,
                      testimonials: {
                        ...prev.testimonials,
                        reviews: updated
                      }
                    }));
                  }}
                >
                  <Trash2 size={14} /> Remove Review
                </button>
              </div>

              <div className="settings-grid-3">
                <div className="settings-form-group">
                  <label>Patient Name</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={review.name || ''} 
                    onChange={e => {
                      const updated = [...settings.testimonials.reviews];
                      updated[rIdx].name = e.target.value;
                      setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Location / City</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={review.location || ''} 
                    onChange={e => {
                      const updated = [...settings.testimonials.reviews];
                      updated[rIdx].location = e.target.value;
                      setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Treatment Taken</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={review.treatment || ''} 
                    onChange={e => {
                      const updated = [...settings.testimonials.reviews];
                      updated[rIdx].treatment = e.target.value;
                      setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                    }}
                  />
                </div>
              </div>

              <div className="settings-grid-3">
                <div className="settings-form-group">
                  <label>Review Headline / Title</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={review.title || ''} 
                    onChange={e => {
                      const updated = [...settings.testimonials.reviews];
                      updated[rIdx].title = e.target.value;
                      setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                    }}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Rating (1-5)</label>
                  <select 
                    className="settings-select"
                    value={review.rating || 5}
                    onChange={e => {
                      const updated = [...settings.testimonials.reviews];
                      updated[rIdx].rating = Number(e.target.value);
                      setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                    }}
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★)</option>
                    <option value={3}>3 Stars (★★★)</option>
                  </select>
                </div>
                <div className="settings-form-group">
                  <label>Date Tag (e.g. Verified Review • 2 weeks ago)</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={review.date || ''} 
                    onChange={e => {
                      const updated = [...settings.testimonials.reviews];
                      updated[rIdx].date = e.target.value;
                      setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                    }}
                  />
                </div>
              </div>

              <div className="settings-form-group" style={{ marginBottom: '14px' }}>
                <label>Detailed Review Text</label>
                <textarea 
                  className="settings-textarea" 
                  value={review.review || ''} 
                  onChange={e => {
                    const updated = [...settings.testimonials.reviews];
                    updated[rIdx].review = e.target.value;
                    setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                  }}
                />
              </div>

              <div className="settings-form-group">
                <label>Patient Avatar Photo</label>
                <ImageUploader 
                  currentUrl={review.avatar || ''}
                  initialImage={review.avatar || ''} 
                  onSelect={img => {
                    const updated = [...settings.testimonials.reviews];
                    updated[rIdx].avatar = img;
                    setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                  }}
                  onImageSelected={img => {
                    const updated = [...settings.testimonials.reviews];
                    updated[rIdx].avatar = img;
                    setSettings(prev => ({ ...prev, testimonials: { ...prev.testimonials, reviews: updated } }));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: FEATURED ON (MEDIA LOGOS) */}
      {activeTab === 'featuredMedia' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Featured On &amp; Media Logos</h3>
              <p className="tab-pane-desc">Upload, replace, and manage the publication and press logos displayed in the infinite sliding marquee on the home page.</p>
            </div>
            <button 
              className="btn-add-item" 
              style={{ width: 'auto', margin: 0 }}
              onClick={() => {
                const newLogo = {
                  id: Date.now(),
                  name: 'New Publication',
                  image: ''
                };
                const updated = [...(settings.featuredMedia?.logos || defaultMediaLogos), newLogo];
                updateNested('featuredMedia', 'logos', updated);
              }}
            >
              <Plus size={16} /> Add Brand Logo
            </button>
          </div>

          <div className="settings-form-group" style={{ marginBottom: '24px' }}>
            <label>Section Title</label>
            <input 
              type="text" 
              className="settings-input" 
              value={settings.featuredMedia?.title || ''} 
              placeholder="FEATURED ON"
              onChange={e => updateNested('featuredMedia', 'title', e.target.value)}
            />
          </div>

          <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px' }}>Media Logos List</h4>
          
          <div className="settings-grid-2">
            {(settings.featuredMedia?.logos || defaultMediaLogos).map((logo, lIdx) => (
              <div key={logo.id || lIdx} className="item-card-wrapper" style={{ margin: 0 }}>
                <div className="item-card-header">
                  <span className="item-card-index">Logo #{lIdx + 1}: {logo.name || 'Unnamed'}</span>
                  <button 
                    className="btn-delete-item"
                    onClick={() => {
                      const updated = [...(settings.featuredMedia?.logos || defaultMediaLogos)];
                      updated.splice(lIdx, 1);
                      updateNested('featuredMedia', 'logos', updated);
                    }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <div className="settings-form-group" style={{ marginBottom: '14px' }}>
                  <label>Brand / Publication Name</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={logo.name || ''} 
                    placeholder="e.g. Forbes, Vogue, Elle, ABP, Mid-day"
                    onChange={e => {
                      const updated = [...(settings.featuredMedia?.logos || defaultMediaLogos)];
                      updated[lIdx].name = e.target.value;
                      updateNested('featuredMedia', 'logos', updated);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label>Logo Image (Cloudinary)</label>
                  <ImageUploader 
                    currentUrl={logo.image || ''}
                    initialImage={logo.image || ''} 
                    onSelect={img => {
                      const updated = [...(settings.featuredMedia?.logos || defaultMediaLogos)];
                      updated[lIdx].image = img;
                      updateNested('featuredMedia', 'logos', updated);
                    }}
                    onImageSelected={img => {
                      const updated = [...(settings.featuredMedia?.logos || defaultMediaLogos)];
                      updated[lIdx].image = img;
                      updateNested('featuredMedia', 'logos', updated);
                    }}
                  />
                  {!logo.image && (
                    <span style={{ fontSize: '11.5px', color: '#64748b', marginTop: '6px', display: 'block' }}>
                      💡 No custom image uploaded: using built-in vector styling for "{logo.name}".
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button 
            className="btn-add-item" 
            style={{ marginTop: '20px' }}
            onClick={() => {
              const newLogo = {
                id: Date.now(),
                name: 'New Publication',
                image: ''
              };
              const updated = [...(settings.featuredMedia?.logos || defaultMediaLogos), newLogo];
              updateNested('featuredMedia', 'logos', updated);
            }}
          >
            <Plus size={16} /> Add Brand Logo
          </button>
        </div>
      )}

      {/* TAB 10: FAQ SECTION */}
      {activeTab === 'faq' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Frequently Asked Questions</h3>
              <p className="tab-pane-desc">Manage all Q&As, categories, and explanatory answers.</p>
            </div>
            <button 
              className="btn-add-item" 
              style={{ width: 'auto', margin: 0 }}
              onClick={() => {
                const newFaq = {
                  id: Date.now(),
                  category: 'general',
                  question: 'New Question Title?',
                  answer: 'Detailed clear medical response.'
                };
                setSettings(prev => ({
                  ...prev,
                  faqSection: {
                    ...prev.faqSection,
                    faqs: [...(prev.faqSection.faqs || []), newFaq]
                  }
                }));
              }}
            >
              <Plus size={16} /> Add FAQ
            </button>
          </div>

          <div className="settings-grid-2">
            <div className="settings-form-group">
              <label>Section Title Prefix</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.faqSection?.header?.title || ''} 
                onChange={e => {
                  setSettings(prev => ({
                    ...prev,
                    faqSection: {
                      ...prev.faqSection,
                      header: { ...prev.faqSection.header, title: e.target.value }
                    }
                  }));
                }}
              />
            </div>
            <div className="settings-form-group">
              <label>Title Highlight (Gold Accent)</label>
              <input 
                type="text" 
                className="settings-input" 
                value={settings.faqSection?.header?.titleHighlight || ''} 
                onChange={e => {
                  setSettings(prev => ({
                    ...prev,
                    faqSection: {
                      ...prev.faqSection,
                      header: { ...prev.faqSection.header, titleHighlight: e.target.value }
                    }
                  }));
                }}
              />
            </div>
          </div>

          <div className="settings-form-group" style={{ marginBottom: '24px' }}>
            <label>Subtitle</label>
            <textarea 
              className="settings-textarea" 
              value={settings.faqSection?.header?.subtitle || ''} 
              onChange={e => {
                setSettings(prev => ({
                  ...prev,
                  faqSection: {
                    ...prev.faqSection,
                    header: { ...prev.faqSection.header, subtitle: e.target.value }
                  }
                }));
              }}
            />
          </div>

          <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px' }}>Questions List</h4>
          {(settings.faqSection?.faqs || []).map((faq, fIdx) => (
            <div key={faq.id || fIdx} className="item-card-wrapper">
              <div className="item-card-header">
                <span className="item-card-index">FAQ #{fIdx + 1}</span>
                <button 
                  className="btn-delete-item"
                  onClick={() => {
                    const updated = [...settings.faqSection.faqs];
                    updated.splice(fIdx, 1);
                    setSettings(prev => ({
                      ...prev,
                      faqSection: {
                        ...prev.faqSection,
                        faqs: updated
                      }
                    }));
                  }}
                >
                  <Trash2 size={14} /> Remove FAQ
                </button>
              </div>

              <div className="settings-grid-2">
                <div className="settings-form-group">
                  <label>Category</label>
                  <select 
                    className="settings-select"
                    value={faq.category || 'general'}
                    onChange={e => {
                      const updated = [...settings.faqSection.faqs];
                      updated[fIdx].category = e.target.value;
                      setSettings(prev => ({ ...prev, faqSection: { ...prev.faqSection, faqs: updated } }));
                    }}
                  >
                    <option value="general">About Clinic</option>
                    <option value="treatments">Treatments & Results</option>
                    <option value="safety">Safety & Technology</option>
                    <option value="consultation">Appointments & Booking</option>
                  </select>
                </div>
                <div className="settings-form-group">
                  <label>Question</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={faq.question || ''} 
                    onChange={e => {
                      const updated = [...settings.faqSection.faqs];
                      updated[fIdx].question = e.target.value;
                      setSettings(prev => ({ ...prev, faqSection: { ...prev.faqSection, faqs: updated } }));
                    }}
                  />
                </div>
              </div>

              <div className="settings-form-group">
                <label>Answer</label>
                <textarea 
                  className="settings-textarea" 
                  value={faq.answer || ''} 
                  onChange={e => {
                    const updated = [...settings.faqSection.faqs];
                    updated[fIdx].answer = e.target.value;
                    setSettings(prev => ({ ...prev, faqSection: { ...prev.faqSection, faqs: updated } }));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 11: FLOATING CONCIERGE WIDGETS */}
      {activeTab === 'widgets' && (
        <div className="settings-tab-pane">
          <div className="tab-pane-title-row">
            <div>
              <h3 className="tab-pane-title">Floating Concierge Buttons</h3>
              <p className="tab-pane-desc">Configure the fixed floating WhatsApp Concierge & Call Now buttons on the website.</p>
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="item-card-wrapper">
              <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} color="#25D366" /> WhatsApp Floating Button
              </h4>
              <div className="settings-form-group" style={{ marginBottom: '14px' }}>
                <label>WhatsApp Number (with country code)</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  placeholder="+917240013002"
                  value={settings.floatingWidgets?.whatsappNumber || ''} 
                  onChange={e => updateNested('floatingWidgets', 'whatsappNumber', e.target.value)}
                />
              </div>
              <div className="settings-form-group" style={{ marginBottom: '14px' }}>
                <label>Button Label Text</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  placeholder="WhatsApp Concierge"
                  value={settings.floatingWidgets?.whatsappLabel || ''} 
                  onChange={e => updateNested('floatingWidgets', 'whatsappLabel', e.target.value)}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                <input 
                  type="checkbox" 
                  checked={settings.floatingWidgets?.showWhatsapp ?? true}
                  onChange={e => updateNested('floatingWidgets', 'showWhatsapp', e.target.checked)}
                />
                Enable WhatsApp Widget on site
              </label>
            </div>

            <div className="item-card-wrapper">
              <h4 style={{ fontSize: '15px', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#0d382c" /> Call Now Floating Button
              </h4>
              <div className="settings-form-group" style={{ marginBottom: '14px' }}>
                <label>Phone Number to Call</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  placeholder="+917240013002"
                  value={settings.floatingWidgets?.callNumber || ''} 
                  onChange={e => updateNested('floatingWidgets', 'callNumber', e.target.value)}
                />
              </div>
              <div className="settings-form-group" style={{ marginBottom: '14px' }}>
                <label>Button Label Text</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  placeholder="Call Now"
                  value={settings.floatingWidgets?.callLabel || ''} 
                  onChange={e => updateNested('floatingWidgets', 'callLabel', e.target.value)}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                <input 
                  type="checkbox" 
                  checked={settings.floatingWidgets?.showCall ?? true}
                  onChange={e => updateNested('floatingWidgets', 'showCall', e.target.checked)}
                />
                Enable Call Now Widget on site
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomeSettings;
