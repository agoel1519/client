import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './AdminPageBuilder.css';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft,
  Eye, 
  CheckCircle, 
  ArrowLeft,
  Layers,
  HelpCircle,
  Sparkles,
  FileText,
  Upload,
  LayoutGrid,
  MapPin,
  Phone,
  Mail,
  Clock,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { slugify, getTreatmentData, saveTreatmentPage, deleteTreatmentPage } from '../../data/treatmentsData';

const emptyPageTemplate = {
  title: '',
  slug: '',
  category: 'FACE / SKIN',
  breadcrumb: '',
  introText: '',
  contentSection: { 
    heading: '', 
    text: '', 
    image: '/treatments/treatment-skin.jpg' 
  },
  treatmentTypesSection: {
    heading: 'SCAR TREATMENT OFFERS SOLUTIONS FOR VARIOUS SCAR TYPES',
    cards: [
      {
        title: 'Acne Scars',
        description: 'Whether the extent of the scar is rolling or the ice pick type, acne scar treatment offers a range of solutions that strengthen the surface of the skin, leading to a beautiful and even skin complexion.'
      },
      {
        title: 'Surgical Scars',
        description: 'Scar treatments can minimise the appearance of surgical scars, making them less noticeable and improving overall cosmetic outcomes.'
      },
      {
        title: 'Burn Scars',
        description: 'Face scar treatment in Mumbai options can help improve the appearance and comfort of burn scars, promoting better healing and a more even skin surface.'
      },
      {
        title: 'Keloid Scars',
        description: 'These raised and thickened scars can be effectively treated with various techniques, including injections and silicone therapy.'
      }
    ]
  },
  pathwaySection: {
    heading: 'YOUR PATH TO SMOOTHER, MORE CONFIDENT SKIN STARTS WITH SCAR TREATMENT',
    paragraphs: [
      "Scars are a natural part of the healing process, but they don't have to be permanent reminders. Our scar treatment in Mumbai offers a multitude of options to improve the appearance and comfort of scars, allowing you to embrace your skin with newfound confidence.",
      "Ready to explore your scar treatment options and reclaim your confidence? Contact us today to schedule a consultation and discuss the possibilities!"
    ]
  },
  beforeAfter: { 
    heading: 'BEFORE & AFTERS', 
    showcaseImage: '/treatments/scar-before-after.png',
    images: [
      { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg', title: 'Acne Scar Revision' },
      { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg', title: 'Deep Rolling Scars' }
    ] 
  },
  faqs: [
    { question: 'What are the different types of scar treatments available?', answer: 'Scar treatment options include fractional laser resurfacing, chemical peels, subcision, microneedling radiofrequency (MNRF), PRP/exosome therapy, and targeted dermal fillers.' },
    { question: 'How effective is scar treatment?', answer: 'Modern scar therapies are highly effective in softening scar margins, rebuilding lost collagen, and leveling skin depressions, typically delivering 60% to 85% visible improvement.' },
    { question: 'Is scar treatment painful?', answer: 'Procedures are performed with prescription topical numbing creams and gentle cooling, ensuring very minimal discomfort during the session.' },
    { question: 'How long will it take to see results with scar treatment?', answer: 'Initial texture refinement is often noticeable within 2 to 3 weeks, with progressive collagen remodeling continuing over 3 to 6 months.' },
    { question: 'Is scar treatment safe for everyone?', answer: 'Yes, when administered by qualified dermatologists using wavelengths and parameters tailored to your specific Fitzpatrick skin phototype.' },
    { question: 'What is the best treatment for acne scars?', answer: 'A combination approach—such as subcision for tethered scars, fractional lasers or MNRF for textural remodeling, and peels for pigment—yields the most comprehensive clinical outcomes.' },
    { question: 'How can I clear my acne scars?', answer: 'Scheduling an in-depth dermatological skin assessment allows us to formulate a personalized multi-modality protocol combining clinical resurfacing with medical-grade barrier repair skincare.' }
  ],
  clinicInfo: {
    address: '1st Floor, Forum Building, Raghuvanshi Mills Compound Senapati Bapat Marg, Gandhi Nagar, Upper Worli, Worli, Lower Parel, Mumbai, Maharashtra 400018.',
    phones: ['+91 72400 13002', '+91 72400 12002'],
    email: 'hello@skuccii.com',
    hours: 'Monday – Sunday: 10:00 AM – 7:00 PM'
  },
  accordionSection: { 
    heading: "HERE'S AN OVERVIEW OF HOW SCAR TREATMENT CAN EMPOWER YOU", 
    items: [
      { title: 'Reduced Scar Visibility', content: 'Advanced clinical modalities break down rigid fibrous tissue and stimulate fresh neocollagenesis to visibly smooth and fade scars.' },
      { title: 'Improved Scar Comfort', content: 'Restores tissue suppleness and dermal elasticity, alleviating sensations of tight pulling.' },
      { title: 'Enhanced Self-Confidence', content: 'Allows you to embrace your natural skin with renewed self-assurance.' }
    ] 
  },
  customSections: []
};

const AdminPageBuilder = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(slug);

  const [activeTab, setActiveTab] = useState('basic');
  const [pageData, setPageData] = useState(emptyPageTemplate);
  const [notification, setNotification] = useState(null);
  const [newSectionType, setNewSectionType] = useState('text-block');
  const [showAdvancedSeo, setShowAdvancedSeo] = useState(false);

  // Load existing data when editing
  useEffect(() => {
    if (slug) {
      const existing = getTreatmentData(slug);
      if (existing) {
        setPageData({
          ...emptyPageTemplate,
          ...existing,
          slug: slug,
          treatmentTypesSection: existing.treatmentTypesSection || emptyPageTemplate.treatmentTypesSection,
          pathwaySection: existing.pathwaySection || emptyPageTemplate.pathwaySection,
          clinicInfo: existing.clinicInfo || emptyPageTemplate.clinicInfo,
          beforeAfter: existing.beforeAfter || emptyPageTemplate.beforeAfter,
          faqs: existing.faqs || emptyPageTemplate.faqs,
          customSections: existing.customSections || []
        });
      }
    }
  }, [slug]);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleInputChange = (section, field, value, index = null, subfield = null) => {
    setPageData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        if (subfield) {
          newData[section][field][index][subfield] = value;
        } else {
          newData[section][index][field] = value;
        }
      } else if (section) {
        newData[section][field] = value;
      } else {
        newData[field] = value;
      }
      return newData;
    });
  };

  const addArrayItem = (section, field, emptyObj) => {
    setPageData(prev => {
      const newData = { ...prev };
      if (field) {
        newData[section][field] = [...newData[section][field], emptyObj];
      } else {
        newData[section] = [...newData[section], emptyObj];
      }
      return newData;
    });
  };

  const removeArrayItem = (section, field, index) => {
    setPageData(prev => {
      const newData = { ...prev };
      if (field) {
        newData[section][field] = newData[section][field].filter((_, i) => i !== index);
      } else {
        newData[section] = newData[section].filter((_, i) => i !== index);
      }
      return newData;
    });
  };

  const handleImageFileUpload = (file, section = 'contentSection', field = 'image', index = null, subfield = null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP).', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      if (index !== null) {
        handleInputChange(section, field, result, index, subfield);
      } else {
        handleInputChange(section, field, result);
      }
      showToast('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleBatchBaUpload = (files) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileList.length === 0) {
      showToast('Please select image files (JPG, PNG, WEBP).', 'error');
      return;
    }

    let loadedCount = 0;
    const readResults = [];

    fileList.forEach((file, fIdx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        readResults[fIdx] = {
          name: file.name,
          data: e.target.result
        };
        loadedCount++;
        if (loadedCount === fileList.length) {
          const newPairs = [];
          for (let i = 0; i < readResults.length; i += 2) {
            if (i + 1 < readResults.length) {
              newPairs.push({
                title: `Case #${(pageData.beforeAfter?.images?.length || 0) + newPairs.length + 1}`,
                before: readResults[i].data,
                after: readResults[i + 1].data
              });
            } else {
              newPairs.push({
                title: `Case #${(pageData.beforeAfter?.images?.length || 0) + newPairs.length + 1}`,
                before: readResults[i].data,
                after: readResults[i].data
              });
            }
          }
          setPageData(prev => ({
            ...prev,
            beforeAfter: {
              ...(prev.beforeAfter || {}),
              images: [...(prev.beforeAfter?.images || []), ...newPairs]
            }
          }));
          showToast(`Added ${newPairs.length} new Before & After slides!`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addCustomSection = () => {
    let newSection = {
      id: Date.now(),
      type: newSectionType,
      heading: 'New Custom Section'
    };

    if (newSectionType === 'text-block') {
      newSection.content = 'Write detailed notes or clinical background here...';
    } else if (newSectionType === 'process-steps') {
      newSection.subheading = 'Our four-stage clinical methodology';
      newSection.steps = [
        { title: 'Diagnostic Assessment', description: 'Doctor consultation.' },
        { title: 'Formulation & Prep', description: 'Skin preparation with priming solutions.' },
        { title: 'Precision Procedure', description: 'Adhering to strict clinical protocols.' },
        { title: 'Post-Care Recovery', description: 'Application of barrier creams.' }
      ];
    } else if (newSectionType === 'stats-grid') {
      newSection.stats = [
        { value: '98%', label: 'Patient Satisfaction' },
        { value: '15,000+', label: 'Procedures Done' },
        { value: '0 Days', label: 'Downtime' }
      ];
    } else if (newSectionType === 'quote-box') {
      newSection.quote = 'Our priority is natural beauty that honors your unique facial architecture.';
      newSection.author = 'Dr. Meghna Mour';
    }

    setPageData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection]
    }));
    showToast(`Added new ${newSectionType} section!`);
  };

  const removeCustomSection = (index) => {
    setPageData(prev => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index)
    }));
  };

  const updateCustomSectionField = (index, field, value) => {
    setPageData(prev => {
      const updated = [...prev.customSections];
      updated[index][field] = value;
      return { ...prev, customSections: updated };
    });
  };

  const rawTitle = pageData.title || slug || 'Treatment Page';
  const cleanDisplayTitle = rawTitle
    .replace(/(?:\s+in\s+mumbai)+/gi, '')
    .trim();

  const handleSave = () => {
    if (!pageData.title.trim()) {
      showToast('Please enter a Page Title before saving!', 'error');
      return;
    }

    const baseCleanTitle = pageData.title.replace(/\s+in\s+mumbai/gi, '').trim();
    const finalPublishedTitle = `${baseCleanTitle} IN MUMBAI`;
    
    const targetSlug = pageData.slug 
      ? slugify(pageData.slug) 
      : slugify(baseCleanTitle);

    const dataToSave = {
      ...pageData,
      title: finalPublishedTitle,
      slug: targetSlug,
      breadcrumb: pageData.breadcrumb || `HOME / TREATMENTS / ${pageData.category || 'TREATMENTS'} / ${finalPublishedTitle}`
    };

    const success = saveTreatmentPage(targetSlug, dataToSave);
    if (success) {
      showToast(`Page for "${baseCleanTitle}" saved successfully!`);
      setTimeout(() => {
        navigate('/admin/pages');
      }, 1200);
    } else {
      showToast('Error saving page data.', 'error');
    }
  };

  const handlePreview = () => {
    const targetSlug = pageData.slug ? slugify(pageData.slug) : slugify(cleanDisplayTitle || 'scar');
    if (pageData.title) {
      saveTreatmentPage(targetSlug, pageData);
    }
    window.open(`/treatments/${targetSlug}`, '_blank');
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this page (${pageData.slug})?`)) {
      deleteTreatmentPage(pageData.slug);
      showToast('Page deleted.');
      navigate('/admin/pages');
    }
  };

  // 8 Organized, Human-Friendly Tabs
  const tabsList = [
    { id: 'basic', label: '1. Basic Info', icon: FileText, count: null },
    { id: 'content', label: '2. Main Q&A & Photo', icon: HelpCircle, count: null },
    { id: 'types', label: '3. Solution Cards', icon: LayoutGrid, count: pageData.treatmentTypesSection?.cards?.length || 0 },
    { id: 'pathway', label: '4. Pathway Banner', icon: Sparkles, count: null },
    { id: 'gallery', label: '5. Before & After', icon: ImageIcon, count: pageData.beforeAfter?.images?.length || 0 },
    { id: 'faqs', label: '6. FAQs', icon: HelpCircle, count: pageData.faqs?.length || 0 },
    { id: 'clinic', label: '7. Clinic Details', icon: MapPin, count: null },
    { id: 'custom-sections', label: '8. Extra Blocks', icon: Layers, count: pageData.customSections?.length || 0 }
  ];

  const currentTabIndex = tabsList.findIndex(t => t.id === activeTab);
  const prevTab = currentTabIndex > 0 ? tabsList[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < tabsList.length - 1 ? tabsList[currentTabIndex + 1] : null;

  return (
    <div className="admin-content">
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          background: notification.type === 'error' ? '#ef4444' : 'var(--adm-emerald)',
          color: '#fff',
          padding: '14px 22px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease'
        }}>
          <CheckCircle size={18} />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Clean, Non-Complicated Top Header */}
      <div className="page-header-simple">
        <div className="header-left-col">
          <Link to="/admin/pages" className="header-back-link">
            <ArrowLeft size={14} /> Back to All Pages
          </Link>
          <div className="header-title-row">
            <h1 className="header-main-title">
              {isEditing ? cleanDisplayTitle : 'Create New Treatment Page'}
            </h1>
            <div className="header-badges">
              <span className="status-pill-green">
                <span className="status-pulse-dot"></span> Live
              </span>
              <span className="category-tag-simple">{pageData.category || 'FACE / SKIN'}</span>
            </div>
          </div>
        </div>

        <div className="header-actions-row">
          {isEditing && (
            <button className="btn-header-delete" onClick={handleDelete} title="Delete Page">
              <Trash2 size={15} /> Delete
            </button>
          )}
          <button className="btn-header-preview" onClick={handlePreview}>
            <Eye size={16} /> Live Preview
          </button>
          <button className="btn-header-save" onClick={handleSave}>
            <CheckCircle size={17} /> Save Changes
          </button>
        </div>
      </div>

      {/* Horizontal Top Tabs: Ridiculously easy to navigate without taking up screen width */}
      <div className="top-tabs-nav-bar">
        {tabsList.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`top-tab-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="tab-pill-badge">{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Single Card Content Area: Spacious & Simple */}
      <div className="builder-main-card">
        
        {/* =========================================================
            TAB 1: BASIC INFO
            ========================================================= */}
        {activeTab === 'basic' && (
          <div className="fade-in">
            <div className="section-hero-header">
              <div>
                <h3 className="section-hero-title">Basic Page Details</h3>
                <p className="section-hero-desc">
                  Set the treatment name, medical category, URL slug, and top intro summary.
                </p>
              </div>
              <span className="section-step-indicator">Step 1 of 8</span>
            </div>

            <div className="form-field-group">
              <label className="field-label-clean">
                <span className="field-required-dot">●</span> Treatment Name
                <span className="field-label-hint">(Shown in the top hero banner)</span>
              </label>
              <input 
                type="text" 
                className="field-input-clean" 
                style={{ fontSize: '1.05rem', fontWeight: 600 }}
                placeholder="e.g. Acne Scar Treatment" 
                value={pageData.title} 
                onChange={(e) => handleInputChange(null, 'title', e.target.value)} 
              />
            </div>

            <div className="two-col-grid">
              <div className="form-field-group" style={{ margin: 0 }}>
                <label className="field-label-clean">
                  <span className="field-required-dot">●</span> Category
                </label>
                <select 
                  className="field-input-clean" 
                  value={pageData.category} 
                  onChange={(e) => handleInputChange(null, 'category', e.target.value)}
                >
                  <option value="FACE / SKIN">Face / Skin</option>
                  <option value="BODY">Body</option>
                  <option value="IV THERAPY">IV Therapy</option>
                  <option value="HAIR">Hair</option>
                  <option value="AESTHETIC GYNAECOLOGY">Aesthetic Gynaecology</option>
                  <option value="SPECIALIZED">Specialized</option>
                </select>
              </div>

              <div className="form-field-group" style={{ margin: 0 }}>
                <label className="field-label-clean">
                  <span className="field-required-dot">●</span> Page URL Slug
                </label>
                <div className="url-prefix-wrapper">
                  <span className="url-prefix-text">/treatments/</span>
                  <input 
                    type="text" 
                    className="field-input-clean" 
                    style={{ paddingLeft: '105px' }}
                    placeholder="e.g. scar" 
                    value={pageData.slug} 
                    onChange={(e) => handleInputChange(null, 'slug', slugify(e.target.value))} 
                  />
                </div>
              </div>
            </div>

            <div className="form-field-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="field-label-clean">
                  Top Introduction Summary
                  <span className="field-label-hint">(Paragraph displayed right under the title banner)</span>
                </label>
                <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-muted)' }}>
                  {pageData.introText?.length || 0} characters
                </span>
              </div>
              <textarea 
                className="field-textarea-clean" 
                rows="4" 
                placeholder="Scars can be a constant reminder of past injuries or surgeries. While they tell a story, they don't have to define your appearance..." 
                value={pageData.introText} 
                onChange={(e) => handleInputChange(null, 'introText', e.target.value)}
              ></textarea>
            </div>

            {/* Collapsible Advanced SEO & Breadcrumbs (Keeps it clean and non-confusing) */}
            <div style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--adm-text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '6px 0'
                }}
                onClick={() => setShowAdvancedSeo(!showAdvancedSeo)}
              >
                <Settings size={15} />
                <span>Advanced SEO &amp; Breadcrumb Settings</span>
                {showAdvancedSeo ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>

              {showAdvancedSeo && (
                <div className="fade-in" style={{ marginTop: '14px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--adm-border)' }}>
                  <div className="form-field-group" style={{ margin: 0 }}>
                    <label className="field-label-clean">Custom Breadcrumb Navigation Text</label>
                    <input 
                      type="text" 
                      className="field-input-clean" 
                      placeholder="e.g. HOME / TREATMENTS / FACE & SKIN / ACNE SCAR TREATMENT" 
                      value={pageData.breadcrumb} 
                      onChange={(e) => handleInputChange(null, 'breadcrumb', e.target.value)} 
                    />
                    <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-muted)' }}>
                      Leave blank to automatically format breadcrumb based on title and category.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: MAIN CONTENT & FEATURED PHOTO
            ========================================================= */}
        {activeTab === 'content' && (
          <div className="fade-in">
            <div className="section-hero-header">
              <div>
                <h3 className="section-hero-title">Main Section: Question &amp; Photo</h3>
                <p className="section-hero-desc">
                  The primary overview block with a clinical question heading, detailed medical text, and photo.
                </p>
              </div>
              <span className="section-step-indicator">Step 2 of 8</span>
            </div>

            <div className="form-field-group">
              <label className="field-label-clean">
                <span className="field-required-dot">●</span> Question / Main Heading
              </label>
              <input 
                type="text" 
                className="field-input-clean" 
                placeholder="e.g. WHAT IS SCAR TREATMENT?" 
                value={pageData.contentSection?.heading} 
                onChange={(e) => handleInputChange('contentSection', 'heading', e.target.value)} 
              />
            </div>

            <div className="form-field-group">
              <label className="field-label-clean">
                <span className="field-required-dot">●</span> Detailed Medical Explanation
              </label>
              <textarea 
                className="field-textarea-clean" 
                rows="5" 
                placeholder="Scar treatment encompasses various techniques designed to minimise the appearance and discomfort of scars. The specific approach will depend on the type, severity, and age of your scar." 
                value={pageData.contentSection?.text} 
                onChange={(e) => handleInputChange('contentSection', 'text', e.target.value)}
              ></textarea>
            </div>

            {/* Featured Photo Upload Box */}
            <div className="form-field-group" style={{ marginTop: '24px' }}>
              <label className="field-label-clean">
                <ImageIcon size={16} /> Featured Section Photo
              </label>

              <div 
                className="image-upload-box-simple"
                onClick={() => document.getElementById('simple-featured-file-input').click()}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer?.files?.[0];
                  if (file) handleImageFileUpload(file, 'contentSection', 'image');
                }}
              >
                <input 
                  id="simple-featured-file-input"
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageFileUpload(file, 'contentSection', 'image');
                  }}
                />
                <div className="upload-icon-circle">
                  <Upload size={20} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--adm-emerald)' }}>
                    Click to Choose Image from Computer
                  </strong>
                  <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>
                    Supports JPG, PNG, WEBP (or Drag &amp; Drop here)
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Or enter image URL path:
                </span>
                <input 
                  type="text" 
                  className="field-input-clean" 
                  placeholder="/treatments/treatment-skin.jpg or https://..." 
                  value={pageData.contentSection?.image} 
                  onChange={(e) => handleInputChange('contentSection', 'image', e.target.value)} 
                />
              </div>

              {pageData.contentSection?.image && (
                <div className="image-preview-card">
                  <div className="image-preview-topbar">
                    <span>Photo Preview</span>
                    <button 
                      type="button" 
                      className="btn-remove-photo"
                      onClick={() => handleInputChange('contentSection', 'image', '')}
                    >
                      Remove Photo
                    </button>
                  </div>
                  <img 
                    src={pageData.contentSection.image} 
                    alt="Preview" 
                    className="image-preview-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: SOLUTION TYPES (CONDITION CARDS)
            ========================================================= */}
        {activeTab === 'types' && (
          <div className="fade-in">
            <div className="section-hero-header">
              <div>
                <h3 className="section-hero-title">Solution Types Cards</h3>
                <p className="section-hero-desc">
                  Condition cards explaining how this treatment works for different patient needs.
                </p>
              </div>
              <span className="section-step-indicator">Step 3 of 8</span>
            </div>

            <div className="form-field-group">
              <label className="field-label-clean">Section Title Banner</label>
              <input 
                type="text" 
                className="field-input-clean" 
                placeholder="e.g. SCAR TREATMENT OFFERS SOLUTIONS FOR VARIOUS SCAR TYPES" 
                value={pageData.treatmentTypesSection?.heading} 
                onChange={(e) => handleInputChange('treatmentTypesSection', 'heading', e.target.value)} 
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <strong style={{ fontSize: '0.9rem', color: '#334155' }}>
                  Condition Cards ({pageData.treatmentTypesSection?.cards?.length || 0})
                </strong>
              </div>

              {pageData.treatmentTypesSection?.cards?.map((card, index) => (
                <div key={index} className="repeater-card-clean">
                  <div className="repeater-card-header">
                    <span className="repeater-card-badge">Card #{index + 1}</span>
                    <button 
                      type="button"
                      className="btn-card-delete" 
                      onClick={() => removeArrayItem('treatmentTypesSection', 'cards', index)}
                    >
                      <Trash2 size={14} /> Remove Card
                    </button>
                  </div>
                  <div className="repeater-card-body">
                    <div className="form-field-group" style={{ margin: 0 }}>
                      <label className="field-label-clean">Card Title / Condition Name</label>
                      <input 
                        type="text" 
                        className="field-input-clean" 
                        placeholder="e.g. Acne Scars" 
                        value={card.title} 
                        onChange={(e) => handleInputChange('treatmentTypesSection', 'cards', e.target.value, index, 'title')} 
                      />
                    </div>
                    <div className="form-field-group" style={{ margin: 0 }}>
                      <label className="field-label-clean">Card Description</label>
                      <textarea 
                        className="field-textarea-clean" 
                        rows="3" 
                        placeholder="Explain how treatment solves this condition..." 
                        value={card.description} 
                        onChange={(e) => handleInputChange('treatmentTypesSection', 'cards', e.target.value, index, 'description')}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button"
                className="btn-add-item-clean"
                onClick={() => addArrayItem('treatmentTypesSection', 'cards', { title: '', description: '' })}
              >
                <Plus size={16} /> + Add Another Solution Card
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: PATHWAY BANNER
            ========================================================= */}
        {activeTab === 'pathway' && (
          <div className="fade-in">
            <div className="section-hero-header">
              <div>
                <h3 className="section-hero-title">Pathway &amp; Confidence Banner</h3>
                <p className="section-hero-desc">
                  Reassurance and encouragement message inviting patients to take the first step and book a consultation.
                </p>
              </div>
              <span className="section-step-indicator">Step 4 of 8</span>
            </div>

            <div className="form-field-group">
              <label className="field-label-clean">Pathway Banner Title</label>
              <input 
                type="text" 
                className="field-input-clean" 
                placeholder="e.g. YOUR PATH TO SMOOTHER SKIN STARTS WITH SCAR TREATMENT" 
                value={pageData.pathwaySection?.heading} 
                onChange={(e) => handleInputChange('pathwaySection', 'heading', e.target.value)} 
              />
            </div>

            <div className="form-field-group">
              <label className="field-label-clean">First Paragraph (Empathy &amp; Reassurance)</label>
              <textarea 
                className="field-textarea-clean" 
                rows="4" 
                placeholder="Scars are a natural part of the healing process, but they don't have to be permanent reminders..." 
                value={pageData.pathwaySection?.paragraphs?.[0] || ''} 
                onChange={(e) => {
                  const paras = [...(pageData.pathwaySection?.paragraphs || ['', ''])];
                  paras[0] = e.target.value;
                  handleInputChange('pathwaySection', 'paragraphs', paras);
                }}
              ></textarea>
            </div>

            <div className="form-field-group">
              <label className="field-label-clean">Second Paragraph (Call to Action / Consultation)</label>
              <textarea 
                className="field-textarea-clean" 
                rows="3" 
                placeholder="Ready to explore your options and reclaim your confidence? Contact us today to schedule a consultation!" 
                value={pageData.pathwaySection?.paragraphs?.[1] || ''} 
                onChange={(e) => {
                  const paras = [...(pageData.pathwaySection?.paragraphs || ['', ''])];
                  paras[1] = e.target.value;
                  handleInputChange('pathwaySection', 'paragraphs', paras);
                }}
              ></textarea>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: BEFORE & AFTERS
            ========================================================= */}
        {activeTab === 'gallery' && (
          <div className="fade-in">
            <div className="section-hero-header">
              <div>
                <h3 className="section-hero-title">Before &amp; After Photo Carousel</h3>
                <p className="section-hero-desc">
                  Showcase real clinical results with side-by-side Before and After photo comparisons.
                </p>
              </div>
              <span className="section-step-indicator">Step 5 of 8</span>
            </div>

            <div className="form-field-group">
              <label className="field-label-clean">Gallery Section Heading</label>
              <input 
                type="text" 
                className="field-input-clean" 
                placeholder="e.g. BEFORE & AFTERS" 
                value={pageData.beforeAfter?.heading} 
                onChange={(e) => handleInputChange('beforeAfter', 'heading', e.target.value)} 
              />
            </div>

            {/* Quick Batch Upload Box */}
            <div 
              className="image-upload-box-simple" 
              style={{ marginBottom: '24px' }}
              onClick={() => document.getElementById('simple-batch-ba-input').click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer?.files) handleBatchBaUpload(e.dataTransfer.files);
              }}
            >
              <input 
                id="simple-batch-ba-input"
                type="file" 
                accept="image/*" 
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files) handleBatchBaUpload(e.target.files);
                }}
              />
              <div className="upload-icon-circle">
                <Upload size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--adm-emerald)' }}>
                  Upload Multiple Before &amp; After Photos at Once
                </strong>
                <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>
                  Select 2 or more images from your computer to automatically create new slide pairs.
                </p>
              </div>
            </div>

            {/* Slide Pairs List */}
            <div>
              {pageData.beforeAfter?.images?.map((img, index) => (
                <div key={index} className="repeater-card-clean">
                  <div className="repeater-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="repeater-card-badge">Slide #{index + 1}</span>
                      <input 
                        type="text" 
                        className="field-input-clean" 
                        style={{ padding: '6px 10px', fontSize: '0.86rem', fontWeight: 600, width: '220px' }}
                        placeholder="Slide title (e.g. Acne Scars)" 
                        value={img.title || ''} 
                        onChange={(e) => handleInputChange('beforeAfter', 'images', e.target.value, index, 'title')} 
                      />
                    </div>
                    <button 
                      type="button"
                      className="btn-card-delete" 
                      onClick={() => removeArrayItem('beforeAfter', 'images', index)}
                    >
                      <Trash2 size={14} /> Remove Slide
                    </button>
                  </div>

                  <div className="repeater-card-body">
                    <div className="two-col-grid" style={{ margin: 0 }}>
                      
                      {/* Before Photo Box */}
                      <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--adm-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.8rem', color: '#0f172a' }}>BEFORE PHOTO</strong>
                          {img.before && (
                            <button 
                              type="button" 
                              className="btn-remove-photo"
                              onClick={() => handleInputChange('beforeAfter', 'images', '', index, 'before')}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div 
                          style={{
                            border: '1.5px dashed #cbd5e1',
                            borderRadius: '8px',
                            padding: '10px',
                            textAlign: 'center',
                            background: '#fff',
                            cursor: 'pointer',
                            marginBottom: '8px'
                          }}
                          onClick={() => document.getElementById(`simple-ba-before-${index}`).click()}
                        >
                          <input 
                            id={`simple-ba-before-${index}`}
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageFileUpload(file, 'beforeAfter', 'images', index, 'before');
                            }}
                          />
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--adm-emerald)' }}>
                            Choose Before File
                          </span>
                        </div>

                        <input 
                          type="text" 
                          className="field-input-clean" 
                          style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                          placeholder="Or paste image URL" 
                          value={img.before || ''} 
                          onChange={(e) => handleInputChange('beforeAfter', 'images', e.target.value, index, 'before')} 
                        />

                        {img.before && (
                          <div style={{ marginTop: '8px', borderRadius: '6px', overflow: 'hidden', height: '120px', background: '#000' }}>
                            <img src={img.before} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                      </div>

                      {/* After Photo Box */}
                      <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid var(--adm-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.8rem', color: '#059669' }}>AFTER PHOTO</strong>
                          {img.after && (
                            <button 
                              type="button" 
                              className="btn-remove-photo"
                              onClick={() => handleInputChange('beforeAfter', 'images', '', index, 'after')}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div 
                          style={{
                            border: '1.5px dashed #cbd5e1',
                            borderRadius: '8px',
                            padding: '10px',
                            textAlign: 'center',
                            background: '#fff',
                            cursor: 'pointer',
                            marginBottom: '8px'
                          }}
                          onClick={() => document.getElementById(`simple-ba-after-${index}`).click()}
                        >
                          <input 
                            id={`simple-ba-after-${index}`}
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageFileUpload(file, 'beforeAfter', 'images', index, 'after');
                            }}
                          />
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#059669' }}>
                            Choose After File
                          </span>
                        </div>

                        <input 
                          type="text" 
                          className="field-input-clean" 
                          style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                          placeholder="Or paste image URL" 
                          value={img.after || ''} 
                          onChange={(e) => handleInputChange('beforeAfter', 'images', e.target.value, index, 'after')} 
                        />

                        {img.after && (
                          <div style={{ marginTop: '8px', borderRadius: '6px', overflow: 'hidden', height: '120px', background: '#000' }}>
                            <img src={img.after} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button"
                className="btn-add-item-clean"
                onClick={() => addArrayItem('beforeAfter', 'images', { 
                  title: `Case #${(pageData.beforeAfter?.images?.length || 0) + 1}`,
                  before: '', 
                  after: '' 
                })}
              >
                <Plus size={16} /> + Add Another Slide Pair
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 6: FAQS ACCORDION
            ========================================================= */}
        {activeTab === 'faqs' && (
          <div className="fade-in">
            <div className="section-hero-header">
              <div>
                <h3 className="section-hero-title">Frequently Asked Questions (FAQs)</h3>
                <p className="section-hero-desc">
                  Provide clear, reassuring answers to common patient questions.
                </p>
              </div>
              <span className="section-step-indicator">Step 6 of 8</span>
            </div>

            <div>
              {pageData.faqs?.map((faq, index) => (
                <div key={index} className="repeater-card-clean">
                  <div className="repeater-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                      <span className="repeater-card-badge">FAQ #{index + 1}</span>
                      <strong style={{ fontSize: '0.88rem', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {faq.question || 'New Question'}
                      </strong>
                    </div>
                    <button 
                      type="button"
                      className="btn-card-delete" 
                      onClick={() => removeArrayItem('faqs', null, index)}
                    >
                      <Trash2 size={14} /> Remove FAQ
                    </button>
                  </div>

                  <div className="repeater-card-body">
                    <div className="form-field-group" style={{ margin: 0 }}>
                      <label className="field-label-clean">Question</label>
                      <input 
                        type="text" 
                        className="field-input-clean" 
                        placeholder="e.g. Is scar treatment painful?" 
                        value={faq.question} 
                        onChange={(e) => handleInputChange('faqs', 'question', e.target.value, index)} 
                      />
                    </div>

                    <div className="form-field-group" style={{ margin: 0 }}>
                      <label className="field-label-clean">Answer / Clinical Explanation</label>
                      <textarea 
                        className="field-textarea-clean" 
                        rows="3" 
                        placeholder="Provide clear medical explanation..." 
                        value={faq.answer} 
                        onChange={(e) => handleInputChange('faqs', 'answer', e.target.value, index)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button"
                className="btn-add-item-clean"
                onClick={() => addArrayItem('faqs', null, { question: '', answer: '' })}
              >
                <Plus size={16} /> + Add Another Question &amp; Answer
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 7: CLINIC & CONTACT DETAILS
            ========================================================= */}
        {activeTab === 'clinic' && (
          <div className="fade-in">
            <div className="section-hero-header">
              <div>
                <h3 className="section-hero-title">Clinic &amp; Booking Details</h3>
                <p className="section-hero-desc">
                  Address, direct phone numbers, email, and clinic operating hours.
                </p>
              </div>
              <span className="section-step-indicator">Step 7 of 8</span>
            </div>

            <div className="two-col-grid">
              
              <div className="repeater-card-clean" style={{ margin: 0 }}>
                <div className="repeater-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} color="var(--adm-emerald)" />
                    <strong>Clinic Address</strong>
                  </div>
                </div>
                <div className="repeater-card-body">
                  <textarea 
                    className="field-textarea-clean" 
                    rows="3" 
                    placeholder="1st Floor, Forum Building, Raghuvanshi Mills Compound Senapati Bapat Marg, Worli, Mumbai 400018." 
                    value={pageData.clinicInfo?.address || ''} 
                    onChange={(e) => handleInputChange('clinicInfo', 'address', e.target.value)} 
                  ></textarea>
                </div>
              </div>

              <div className="repeater-card-clean" style={{ margin: 0 }}>
                <div className="repeater-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={16} color="var(--adm-emerald)" />
                    <strong>Phone Numbers</strong>
                  </div>
                </div>
                <div className="repeater-card-body">
                  <div>
                    <label className="field-label-clean" style={{ fontSize: '0.78rem' }}>Primary Phone</label>
                    <input 
                      type="text" 
                      className="field-input-clean" 
                      placeholder="+91 72400 13002" 
                      value={pageData.clinicInfo?.phones?.[0] || ''} 
                      onChange={(e) => {
                        const phones = [...(pageData.clinicInfo?.phones || ['', ''])];
                        phones[0] = e.target.value;
                        handleInputChange('clinicInfo', 'phones', phones);
                      }} 
                    />
                  </div>
                  <div>
                    <label className="field-label-clean" style={{ fontSize: '0.78rem' }}>Secondary Phone</label>
                    <input 
                      type="text" 
                      className="field-input-clean" 
                      placeholder="+91 72400 12002" 
                      value={pageData.clinicInfo?.phones?.[1] || ''} 
                      onChange={(e) => {
                        const phones = [...(pageData.clinicInfo?.phones || ['', ''])];
                        phones[1] = e.target.value;
                        handleInputChange('clinicInfo', 'phones', phones);
                      }} 
                    />
                  </div>
                </div>
              </div>

              <div className="repeater-card-clean" style={{ margin: 0 }}>
                <div className="repeater-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} color="var(--adm-emerald)" />
                    <strong>Email Address</strong>
                  </div>
                </div>
                <div className="repeater-card-body">
                  <input 
                    type="email" 
                    className="field-input-clean" 
                    placeholder="hello@skuccii.com" 
                    value={pageData.clinicInfo?.email || ''} 
                    onChange={(e) => handleInputChange('clinicInfo', 'email', e.target.value)} 
                  />
                </div>
              </div>

              <div className="repeater-card-clean" style={{ margin: 0 }}>
                <div className="repeater-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="var(--adm-emerald)" />
                    <strong>Operating Hours</strong>
                  </div>
                </div>
                <div className="repeater-card-body">
                  <input 
                    type="text" 
                    className="field-input-clean" 
                    placeholder="Monday – Sunday: 10:00 AM – 7:00 PM" 
                    value={pageData.clinicInfo?.hours || ''} 
                    onChange={(e) => handleInputChange('clinicInfo', 'hours', e.target.value)} 
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================
            TAB 8: CUSTOM BLOCKS
            ========================================================= */}
        {activeTab === 'custom-sections' && (
          <div className="fade-in">
            <div className="section-hero-header">
              <div>
                <h3 className="section-hero-title">Extra Custom Blocks</h3>
                <p className="section-hero-desc">
                  Optional custom sections: Process Steps, Key Metrics, Quotes, or Text Blocks.
                </p>
              </div>
              <span className="section-step-indicator">Step 8 of 8</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              <select 
                value={newSectionType} 
                onChange={(e) => setNewSectionType(e.target.value)}
                className="field-input-clean"
                style={{ width: 'auto', backgroundColor: '#fff', padding: '9px 14px' }}
              >
                <option value="text-block">Text Block</option>
                <option value="process-steps">Process Steps (4 Steps)</option>
                <option value="stats-grid">Metrics / Stats Box</option>
                <option value="quote-box">Doctor Quote Callout</option>
              </select>

              <button 
                type="button"
                className="btn-header-save" 
                style={{ padding: '9px 18px', fontSize: '0.85rem' }}
                onClick={addCustomSection}
              >
                <Plus size={16} /> + Add Section
              </button>
            </div>

            {pageData.customSections?.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', border: '1.5px dashed var(--adm-border)' }}>
                <Layers size={32} color="var(--adm-text-light)" style={{ marginBottom: '10px' }} />
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--adm-text-main)' }}>No Extra Blocks Added</h4>
                <p style={{ margin: 0, color: 'var(--adm-text-muted)', fontSize: '0.85rem' }}>
                  Select a section type above and click "+ Add Section" to add content.
                </p>
              </div>
            ) : (
              <div>
                {pageData.customSections?.map((section, idx) => (
                  <div key={idx} className="repeater-card-clean">
                    <div className="repeater-card-header">
                      <span className="repeater-card-badge">{section.type}</span>
                      <button 
                        type="button"
                        className="btn-card-delete" 
                        onClick={() => removeCustomSection(idx)}
                      >
                        <Trash2 size={14} /> Remove Block
                      </button>
                    </div>

                    <div className="repeater-card-body">
                      <div className="form-field-group" style={{ margin: 0 }}>
                        <label className="field-label-clean">Block Heading</label>
                        <input 
                          type="text" 
                          className="field-input-clean" 
                          value={section.heading} 
                          onChange={(e) => updateCustomSectionField(idx, 'heading', e.target.value)} 
                        />
                      </div>

                      {section.type === 'text-block' && (
                        <div className="form-field-group" style={{ margin: 0 }}>
                          <label className="field-label-clean">Content Description</label>
                          <textarea 
                            className="field-textarea-clean" 
                            rows="4" 
                            value={section.content} 
                            onChange={(e) => updateCustomSectionField(idx, 'content', e.target.value)}
                          ></textarea>
                        </div>
                      )}

                      {section.type === 'quote-box' && (
                        <>
                          <div className="form-field-group" style={{ margin: 0 }}>
                            <label className="field-label-clean">Quote Statement</label>
                            <textarea 
                              className="field-textarea-clean" 
                              rows="3" 
                              value={section.quote} 
                              onChange={(e) => updateCustomSectionField(idx, 'quote', e.target.value)}
                            ></textarea>
                          </div>
                          <div className="form-field-group" style={{ margin: 0 }}>
                            <label className="field-label-clean">Author Name</label>
                            <input 
                              type="text" 
                              className="field-input-clean" 
                              value={section.author} 
                              onChange={(e) => updateCustomSectionField(idx, 'author', e.target.value)} 
                            />
                          </div>
                        </>
                      )}

                      {section.type === 'process-steps' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                          {section.steps?.map((step, sIdx) => (
                            <div key={sIdx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--adm-border)' }}>
                              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--adm-emerald)' }}>STEP 0{sIdx + 1}</span>
                              <input 
                                type="text" 
                                className="field-input-clean" 
                                style={{ margin: '6px 0', fontSize: '0.82rem', padding: '6px 8px' }}
                                value={step.title} 
                                onChange={(e) => {
                                  const updatedSteps = [...section.steps];
                                  updatedSteps[sIdx].title = e.target.value;
                                  updateCustomSectionField(idx, 'steps', updatedSteps);
                                }} 
                              />
                              <textarea 
                                className="field-textarea-clean" 
                                rows="2" 
                                style={{ fontSize: '0.8rem', padding: '6px 8px' }}
                                value={step.description} 
                                onChange={(e) => {
                                  const updatedSteps = [...section.steps];
                                  updatedSteps[sIdx].description = e.target.value;
                                  updateCustomSectionField(idx, 'steps', updatedSteps);
                                }} 
                              ></textarea>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.type === 'stats-grid' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                          {section.stats?.map((stat, stIdx) => (
                            <div key={stIdx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--adm-border)' }}>
                              <label className="field-label-clean" style={{ fontSize: '0.7rem' }}>Value</label>
                              <input 
                                type="text" 
                                className="field-input-clean" 
                                style={{ marginBottom: '6px', fontSize: '0.82rem', padding: '6px 8px' }}
                                value={stat.value} 
                                onChange={(e) => {
                                  const updatedStats = [...section.stats];
                                  updatedStats[stIdx].value = e.target.value;
                                  updateCustomSectionField(idx, 'stats', updatedStats);
                                }} 
                              />
                              <label className="field-label-clean" style={{ fontSize: '0.7rem' }}>Label</label>
                              <input 
                                type="text" 
                                className="field-input-clean" 
                                style={{ fontSize: '0.82rem', padding: '6px 8px' }}
                                value={stat.label} 
                                onChange={(e) => {
                                  const updatedStats = [...section.stats];
                                  updatedStats[stIdx].label = e.target.value;
                                  updateCustomSectionField(idx, 'stats', updatedStats);
                                }} 
                              />
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            BOTTOM STEP NAVIGATION WIZARD (SUPER EASY WORKFLOW)
            ========================================================= */}
        <div className="step-nav-footer">
          <div>
            {prevTab && (
              <button
                type="button"
                className="btn-prev-step"
                onClick={() => {
                  setActiveTab(prevTab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <ChevronLeft size={16} /> Back: {prevTab.label}
              </button>
            )}
          </div>

          <div className="footer-right-actions">
            {nextTab ? (
              <button
                type="button"
                className="btn-next-step"
                onClick={() => {
                  setActiveTab(nextTab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Next: {nextTab.label}</span>
                <ChevronRight size={16} />
              </button>
            ) : null}

            <button
              type="button"
              className="btn-save-bottom"
              onClick={handleSave}
            >
              <CheckCircle size={16} /> Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPageBuilder;
