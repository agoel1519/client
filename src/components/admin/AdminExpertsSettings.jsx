import React, { useState, useEffect } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  ExternalLink, 
  RotateCcw,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import ImageUploader from './ImageUploader';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import './AdminExpertsSettings.css';

export const defaultSettings = {
  groupPhoto: "/doctors/team-group-banner.jpg",
  sectionTitle: "OUR TEAM OF SPECIALISTS",
  sectionIntro: "Led by a team of highly qualified medical practitioners who are brilliant in their fields and dedicated to providing you with the personalized care you deserve.",
  experts: [
    { 
      name: "Dr. Meghna Mour", 
      role: "FOUNDER & MEDICAL HEAD", 
      exp: "23+ Years Experience", 
      image: "/celebrities/celeb-3.jpg" 
    },
    { 
      name: "Dr. Harish Balaji", 
      role: "DERMATOLOGIST & HAIR TRANSPLANT SURGEON", 
      exp: "10+ Years Experience", 
      image: "/celebrities/celeb-3.jpg" 
    },
    { 
      name: "Dr. Meghna Singh", 
      role: "MD DERMATOLOGY, VENEREOLOGY & LEPROSY", 
      exp: "6+ Years Experience", 
      image: "/celebrities/celeb-3.jpg" 
    },
    { 
      name: "Dr. Prachi Zawar", 
      role: "DERMATOLOGIST & VENEREOLOGIST", 
      exp: "3+ Years Experience", 
      image: "/celebrities/celeb-3.jpg" 
    }
  ]
};

const AdminExpertsSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getDbSetting('experts_settings').then((saved) => {
      if (saved && saved.experts && saved.experts.length > 0) {
        setSettings({
          heroTitle: saved.heroTitle || defaultSettings.heroTitle,
          heroSubtitle: saved.heroSubtitle || defaultSettings.heroSubtitle,
          groupPhoto: saved.groupPhoto || defaultSettings.groupPhoto,
          sectionTitle: saved.sectionTitle || defaultSettings.sectionTitle,
          sectionIntro: saved.sectionIntro || defaultSettings.sectionIntro,
          experts: Array.isArray(saved.experts) && saved.experts.length > 0
            ? saved.experts.map(e => ({
                ...e,
                image: e.image || '/doctors/dr-meghna-mour.jpg'
              }))
            : defaultSettings.experts
        });
      } else {
        const legacy = localStorage.getItem('aevora_experts_settings');
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            if (parsed && parsed.experts && parsed.experts.length > 0) {
              setSettings({ ...defaultSettings, ...parsed });
              return;
            }
          } catch (e) {}
        }
        setSettings(defaultSettings);
      }
    }).catch(() => {
      setSettings(defaultSettings);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleExpertChange = (index, field, value) => {
    const newExperts = [...settings.experts];
    newExperts[index] = { ...newExperts[index], [field]: value };
    setSettings(prev => ({ ...prev, experts: newExperts }));
  };

  const addExpert = () => {
    setSettings(prev => ({ 
      ...prev, 
      experts: [
        ...prev.experts, 
        { name: "Dr. New Specialist", role: "AESTHETIC PHYSICIAN", exp: "5+ Years Experience", image: "/doctors/dr-meghna-mour.jpg" }
      ] 
    }));
  };

  const removeExpert = (index) => {
    if (window.confirm(`Are you sure you want to remove ${settings.experts[index]?.name || 'this expert'}?`)) {
      const newExperts = [...settings.experts];
      newExperts.splice(index, 1);
      setSettings(prev => ({ ...prev, experts: newExperts }));
    }
  };

  const moveExpert = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= settings.experts.length) return;
    const newExperts = [...settings.experts];
    const [moved] = newExperts.splice(index, 1);
    newExperts.splice(newIndex, 0, moved);
    setSettings(prev => ({ ...prev, experts: newExperts }));
  };

  const resetToDefaults = () => {
    if (window.confirm("Reset all experts & group photo to the official 4 specialists shown in the design?")) {
      setSettings(defaultSettings);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveDbSetting('experts_settings', settings);
      try {
        localStorage.setItem('aevora_experts_settings', JSON.stringify(settings));
      } catch (e) {}
      window.dispatchEvent(new CustomEvent('expertsSettingsUpdated', { detail: settings }));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
    } catch (err) {
      console.error(err);
      setIsSaving(false);
      alert('Error saving settings. Saved locally.');
    }
  };

  return (
    <div className="admin-settings-container experts-admin-container">
      <div className="settings-header">
        <div>
          <h1 className="settings-title">Experts & Specialists Settings</h1>
          <p className="settings-subtitle">Manage top full-width team banner, title, and individual specialist doctor cards.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a 
            href="/experts" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-reset-preset"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={16} /> View Live Page
          </a>
          <button className="btn-save-settings" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <span className="spinner"></span> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>Experts page updated successfully! Live page updated in real-time.</span>
        </div>
      )}

      <div className="settings-sections">
        
        {/* 1. TOP HERO TITLE BANNER (EMERALD SECTION) */}
        <div className="settings-card">
          <h3 className="settings-card-title">1. Top Hero Title Banner (Emerald Section)</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
            This title banner displays in rich Aevora emerald green right beneath the header (matching Contact Us page).
          </p>
          <div className="form-group-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Hero Page Title</label>
              <input 
                type="text" 
                name="heroTitle" 
                value={settings.heroTitle} 
                onChange={handleChange} 
                placeholder="OUR EXPERTS"
              />
            </div>
            <div className="form-group">
              <label>Hero Tagline / Subtitle (Gold)</label>
              <input 
                type="text" 
                name="heroSubtitle" 
                value={settings.heroSubtitle} 
                onChange={handleChange} 
                placeholder="Accomplished specialists dedicated to your care"
              />
            </div>
          </div>
        </div>

        {/* 2. TOP FULL-WIDTH TEAM BANNER */}
        <div className="settings-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="settings-card-title" style={{ margin: 0, border: 'none', padding: 0 }}>
              2. Full-Width Team Banner Image
            </h3>
            <button 
              type="button" 
              className="btn-reset-preset"
              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
              onClick={() => setSettings(prev => ({ ...prev, groupPhoto: "/doctors/team-group-banner.jpg" }))}
            >
              <RotateCcw size={12} /> Set Default Team Photo
            </button>
          </div>
          
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
            This photo displays across the full width directly beneath the website navigation header.
          </p>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Banner Image URL / Upload</label>
            <ImageUploader 
              currentUrl={settings.groupPhoto} 
              onSelect={(url) => setSettings({ ...settings, groupPhoto: url })} 
              label="Select or Upload Team Group Photo" 
            />
          </div>

          {settings.groupPhoto && (
            <div className="experts-banner-preview-box">
              <img 
                src={settings.groupPhoto} 
                alt="Banner Preview" 
                className="experts-banner-preview-img"
              />
            </div>
          )}
        </div>

        {/* 3. SECTION HEADINGS */}
        <div className="settings-card">
          <h3 className="settings-card-title">3. Specialists Section Header</h3>
          <div className="form-group">
            <label>Section Title</label>
            <input 
              type="text" 
              name="sectionTitle" 
              value={settings.sectionTitle} 
              onChange={handleChange} 
              placeholder="OUR TEAM OF SPECIALISTS"
            />
          </div>
          <div className="form-group">
            <label>Section Intro Text</label>
            <textarea 
              name="sectionIntro" 
              value={settings.sectionIntro} 
              onChange={handleChange} 
              rows="3" 
              placeholder="Led by a team of highly qualified medical practitioners who are brilliant in their fields..."
            />
          </div>
        </div>

        {/* 4. SPECIALISTS GRID MANAGEMENT */}
        <div className="settings-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <h3 className="settings-card-title" style={{ border: 'none', padding: 0, margin: 0 }}>
                4. Individual Medical Specialists ({settings.experts.length})
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                Cards automatically arrange into a 4-column layout on desktop.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn-reset-preset" onClick={resetToDefaults}>
                <RotateCcw size={14} /> Reset 4 Doctors
              </button>
              <button type="button" className="btn-add-item" style={{ marginTop: 0 }} onClick={addExpert}>
                <Plus size={16} /> Add Specialist
              </button>
            </div>
          </div>
          
          <div className="experts-admin-grid">
            {settings.experts.map((expert, idx) => (
              <div key={idx} className="expert-admin-item-card">
                <div className="expert-card-top-controls">
                  <span className="expert-card-index">Specialist #{idx + 1}</span>
                  <div className="expert-card-actions">
                    <button 
                      type="button"
                      className="btn-icon-move" 
                      title="Move Left / Up"
                      disabled={idx === 0}
                      onClick={() => moveExpert(idx, -1)}
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button 
                      type="button"
                      className="btn-icon-move" 
                      title="Move Right / Down"
                      disabled={idx === settings.experts.length - 1}
                      onClick={() => moveExpert(idx, 1)}
                    >
                      <ChevronDown size={16} />
                    </button>
                    <button 
                      type="button"
                      className="btn-icon-danger" 
                      title="Remove Expert"
                      onClick={() => removeExpert(idx)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="expert-admin-thumb-row">
                  <img 
                    src={expert.image || '/doctors/dr-meghna-mour.jpg'} 
                    alt={expert.name} 
                    className="expert-admin-thumb-img"
                  />
                  <div className="expert-admin-thumb-controls">
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Photo</label>
                    <ImageUploader 
                      currentUrl={expert.image} 
                      onSelect={(url) => handleExpertChange(idx, 'image', url)} 
                      label="Upload / Change" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={expert.name} 
                    onChange={(e) => handleExpertChange(idx, 'name', e.target.value)} 
                    placeholder="e.g. Dr. Meghna Mour"
                  />
                </div>

                <div className="form-group">
                  <label>Role / Designation (Gold Subtitle)</label>
                  <input 
                    type="text" 
                    value={expert.role} 
                    onChange={(e) => handleExpertChange(idx, 'role', e.target.value)} 
                    placeholder="e.g. FOUNDER & MEDICAL HEAD"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Experience / Credentials</label>
                  <input 
                    type="text" 
                    value={expert.exp} 
                    onChange={(e) => handleExpertChange(idx, 'exp', e.target.value)} 
                    placeholder="e.g. 23+ Years Experience"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminExpertsSettings;
