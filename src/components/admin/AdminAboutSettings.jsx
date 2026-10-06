import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import './AdminAboutSettings.css';

const defaultSettings = {
  heroTagline: "DESIGNED BY MEDICINE\nCRAFTED BY TECHNOLOGY\nPAMPERED BY LUXURY",
  introHeading: "We are India's Premium Aesthetic Clinic",
  introText: "Our only focus when crafting or rendering any treatment is YOU. Driven by a deep commitment to clinical excellence and cutting-edge aesthetics, we have achieved the perfect synergy between science and art to elevate your natural beauty.",
  introFooter: "AEVORA HAS AN INFINITE LOVE FOR THE HUMAN FORM.",
  teamTitle: "FOUNDING TEAM",
  team: [
    { name: "Dr. Meghna Mour", role: "Co-Founder & Chief Medical Director", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" },
    { name: "Karan Rekhi", role: "Co-Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
    { name: "Kunal Kold", role: "Co-Founder", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" }
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
    const saved = localStorage.getItem('aevora_about_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse settings", e);
      }
    }
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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('aevora_about_settings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
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
        {/* HERO & INTRO */}
        <div className="settings-card">
          <h3 className="settings-card-title">Hero & Introduction (Philosophy)</h3>
          <div className="form-group">
            <label>Hero Tagline (Line breaks allowed)</label>
            <textarea name="heroTagline" value={settings.heroTagline} onChange={handleChange} rows="3" />
          </div>
          <div className="form-group">
            <label>Intro Heading</label>
            <input type="text" name="introHeading" value={settings.introHeading} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Intro Paragraph</label>
            <textarea name="introText" value={settings.introText} onChange={handleChange} rows="4" />
          </div>
          <div className="form-group">
            <label>Intro Footer Tagline</label>
            <input type="text" name="introFooter" value={settings.introFooter} onChange={handleChange} />
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
                <div className="form-group"><label>Image URL</label><input type="text" value={member.image} onChange={(e) => handleTeamChange(idx, 'image', e.target.value)} /></div>
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
                <div className="form-group"><label>Background Image URL</label><input type="text" value={exp.image} onChange={(e) => handleExpChange(idx, 'image', e.target.value)} /></div>
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
              <div key={idx} className="gallery-admin-row">
                <div className="form-group" style={{ margin: 0, flex: 1 }}>
                  <input type="text" value={url} onChange={(e) => handleGalleryChange(idx, e.target.value)} placeholder="Image URL..." />
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
