import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import './AdminAboutSettings.css';

const defaultSettings = {
  heroTitle: "ABOUT US",
  heroTagline: "DESIGNED BY MEDICINE\nCRAFTED BY TECHNOLOGY\nPAMPERED BY LUXURY",
  introHeading: "We are India's Premium Aesthetic Clinic",
  introText: "Our only focus when crafting or rendering any treatment is YOU. Driven by a deep commitment to clinical excellence and cutting-edge aesthetics, we have achieved the perfect synergy between science and art to elevate your natural beauty.",
  introFooter: "AEVORA HAS AN INFINITE LOVE FOR THE HUMAN FORM.",
  teamTitle: "FOUNDING TEAM",
  team: [
    { 
      name: "Dr Misha Goel", 
      role: "Aesthetic Physician • Trained in UK (MBBS, MD, FFAC)", 
      image: "/doctors/dr-misha-goel.jpg" 
    },
    { 
      name: "Dr Anupam Goel", 
      role: "Minimal Access Gastrointestinal, Bariatric & Robotic Surgeon (MBBS, MS, FNB)", 
      image: "/doctors/dr-anupam-goel.jpg" 
    }
  ],
  expTitle: "THE AEVORA EXPERIENCE",
  experience: [
    { title: "HELLO AEVORA", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80", step: "1/" },
    { title: "LET'S BEGIN", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80", step: "2/" },
    { title: "TREATMENT", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80", step: "3/" },
    { title: "AFTERCARE", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80", step: "4/" }
  ],
  galleryTitle: "GALLERY",
  gallery: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
  ]
};

const AdminAboutSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getDbSetting('about_page').then((saved) => {
      if (saved) {
        const hasLegacy = saved.team && saved.team.some(t => t.name && (t.name.includes('Meghna Mour') || t.name.includes('Karan Rekhi')));
        if (hasLegacy) {
          setSettings(prev => ({ ...prev, ...saved, team: defaultSettings.team }));
        } else {
          setSettings(prev => ({ ...prev, ...saved }));
        }
      } else {
        const legacy = localStorage.getItem('aevora_about_settings');
        if (legacy) {
          try {
            setSettings(prev => ({ ...prev, ...JSON.parse(legacy) }));
          } catch (e) {}
        }
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (index, field, value) => {
    const newTeam = [...settings.team];
    newTeam[index][field] = value;
    setSettings(prev => ({ ...prev, team: newTeam }));
  };

  const handleExpChange = (index, field, value) => {
    const newExp = [...settings.experience];
    newExp[index][field] = value;
    setSettings(prev => ({ ...prev, experience: newExp }));
  };

  const handleGalleryChange = (index, value) => {
    const newGallery = [...settings.gallery];
    newGallery[index] = value;
    setSettings(prev => ({ ...prev, gallery: newGallery }));
  };

  const addGalleryImage = () => {
    setSettings(prev => ({ ...prev, gallery: [...prev.gallery, ""] }));
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...settings.gallery];
    newGallery.splice(index, 1);
    setSettings(prev => ({ ...prev, gallery: newGallery }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveDbSetting('about_page', settings);
      try {
        localStorage.setItem('aevora_about_settings', JSON.stringify(settings));
      } catch (e) {}
      window.dispatchEvent(new CustomEvent('aboutSettingsUpdated', { detail: settings }));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <div>
          <h1 className="settings-title">About Us Page</h1>
          <p className="settings-subtitle">Manage the content for the About Us page (Philosophy, Team, Experience, Gallery).</p>
        </div>
        <button className="btn-save-settings" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <span className="spinner"></span> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>About Us page updated successfully! Changes are now live.</span>
        </div>
      )}

      <div className="settings-sections">
        {/* HERO */}
        <div className="settings-card">
          <h3 className="settings-card-title">Hero Banner</h3>
          <div className="form-group">
            <label>Page Title</label>
            <input type="text" name="heroTitle" value={settings.heroTitle || 'ABOUT US'} onChange={handleChange} />
          </div>
        </div>

        {/* FOUNDING TEAM */}
        <div className="settings-card">
          <h3 className="settings-card-title">Founding Team</h3>
          <div className="form-group">
            <label>Section Title</label>
            <input type="text" name="teamTitle" value={settings.teamTitle} onChange={handleChange} />
          </div>
          
          <div className="team-grid-admin">
            {settings.team.map((member, idx) => (
              <div key={idx} className="admin-list-item-card">
                <h4>Team Member {idx + 1}</h4>
                <div className="form-group"><label>Name</label><input type="text" value={member.name} onChange={(e) => handleTeamChange(idx, 'name', e.target.value)} /></div>
                <div className="form-group"><label>Role / Designation</label><input type="text" value={member.role} onChange={(e) => handleTeamChange(idx, 'role', e.target.value)} /></div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <ImageUploader currentUrl={member.image} onSelect={(url) => handleTeamChange(idx, 'image', url)} label="Image" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* THE EXPERIENCE */}
        <div className="settings-card">
          <h3 className="settings-card-title">The Experience Sections</h3>
          <div className="form-group">
            <label>Section Title</label>
            <input type="text" name="expTitle" value={settings.expTitle} onChange={handleChange} />
          </div>
          
          <div className="exp-grid-admin">
            {settings.experience.map((exp, idx) => (
              <div key={idx} className="admin-list-item-card">
                <h4>Step {idx + 1}</h4>
                <div className="form-group-row">
                  <div className="form-group"><label>Step Number</label><input type="text" value={exp.step} onChange={(e) => handleExpChange(idx, 'step', e.target.value)} /></div>
                  <div className="form-group"><label>Title</label><input type="text" value={exp.title} onChange={(e) => handleExpChange(idx, 'title', e.target.value)} /></div>
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <ImageUploader currentUrl={exp.image} onSelect={(url) => handleExpChange(idx, 'image', url)} label="Background Image" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY */}
        <div className="settings-card">
          <h3 className="settings-card-title">Gallery Images</h3>
          <div className="form-group">
            <label>Section Title</label>
            <input type="text" name="galleryTitle" value={settings.galleryTitle} onChange={handleChange} />
          </div>
          
          <div className="gallery-admin-list">
            {settings.gallery.map((url, idx) => (
              <div key={idx} className="gallery-admin-row" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <div className="form-group" style={{ margin: 0, flex: 1 }}>
                  <ImageUploader 
                    currentUrl={url} 
                    onSelect={(newUrl) => handleGalleryChange(idx, newUrl)} 
                    label={`Gallery Image ${idx + 1}`} 
                  />
                </div>
                <button className="btn-icon-danger" onClick={() => removeGalleryImage(idx)}><Trash2 size={18} /></button>
              </div>
            ))}
            <button className="btn-add-item" onClick={addGalleryImage}><Plus size={16} /> Add Gallery Image</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAboutSettings;
