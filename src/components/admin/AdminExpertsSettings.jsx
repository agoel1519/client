import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2, Upload } from 'lucide-react';

const defaultSettings = {
  heroTitle: "OUR EXPERTS",
  heroSubtitle: "Accomplished specialists dedicated to your care",
  groupPhoto: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
  sectionTitle: "OUR TEAM OF SPECIALISTS",
  sectionIntro: "Led by a team of highly qualified medical practitioners who are brilliant in their fields and dedicated to providing you with the personalized care you deserve.",
  experts: [
    { name: "Dr. Meghna Mour", role: "FOUNDER & MEDICAL HEAD", exp: "23+ Years Experience", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" },
    { name: "Dr. Harish Balaji", role: "DERMATOLOGIST & HAIR TRANSPLANT SURGEON", exp: "10+ Years Experience", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80" },
    { name: "Dr. Meghna Singh", role: "MD DERMATOLOGY, VENEREOLOGY & LEPROSY", exp: "6+ Years Experience", image: "https://images.unsplash.com/photo-1594824432258-29177a4eb312?auto=format&fit=crop&w=600&q=80" },
    { name: "Dr. Prachi Zawar", role: "DERMATOLOGIST & VENEREOLOGIST", exp: "5+ Years Experience", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" },
    { name: "Dr. Dipal Patel", role: "COSMETOLOGIST & AESTHETIC DOCTOR", exp: "12+ Years Experience", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80" },
    { name: "Dr. Vishwa Parsana", role: "COSMETOLOGIST & AESTHETIC DOCTOR", exp: "3+ Years Experience", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" }
  ]
};

const AdminExpertsSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aevora_experts_settings');
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

  const handleExpertChange = (index, field, value) => {
    const newExperts = [...settings.experts];
    newExperts[index][field] = value;
    setSettings(prev => ({ ...prev, experts: newExperts }));
  };

  const addExpert = () => {
    setSettings(prev => ({ 
      ...prev, 
      experts: [...prev.experts, { name: "", role: "", exp: "", image: "" }] 
    }));
  };

  const removeExpert = (index) => {
    const newExperts = [...settings.experts];
    newExperts.splice(index, 1);
    setSettings(prev => ({ ...prev, experts: newExperts }));
  };

  const handleImageUpload = (e, index = null, isGroupPhoto = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (isGroupPhoto) {
          setSettings(prev => ({ ...prev, groupPhoto: base64String }));
        } else if (index !== null) {
          handleExpertChange(index, 'image', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('aevora_experts_settings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <div>
          <h1 className="settings-title">Experts Page Settings</h1>
          <p className="settings-subtitle">Manage the experts team list, group photo, and intro texts.</p>
        </div>
        <button className="btn-save-settings" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <span className="spinner"></span> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>Experts page updated successfully! Changes are now live.</span>
        </div>
      )}

      <div className="settings-sections">
        {/* HERO & GROUP PHOTO */}
        <div className="settings-card">
          <h3 className="settings-card-title">Hero Banner & Group Photo</h3>
          <div className="form-group-row">
            <div className="form-group">
              <label>Hero Title</label>
              <input type="text" name="heroTitle" value={settings.heroTitle} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Hero Subtitle</label>
              <input type="text" name="heroSubtitle" value={settings.heroSubtitle} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Group Photo (URL or Upload)</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="text" name="groupPhoto" value={settings.groupPhoto} onChange={handleChange} style={{ flex: 1 }} placeholder="Paste image URL here" />
              <label className="btn-save-settings" style={{ padding: '10px 15px', cursor: 'pointer', background: '#e2e8f0', color: '#334155', border: '1px solid #cbd5e1' }}>
                <Upload size={16} /> Upload
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, null, true)} />
              </label>
            </div>
            {settings.groupPhoto && settings.groupPhoto.length > 500 && (
              <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '5px' }}>✓ Custom image uploaded</p>
            )}
          </div>
        </div>

        {/* SECTION TEXTS */}
        <div className="settings-card">
          <h3 className="settings-card-title">Experts List Intro</h3>
          <div className="form-group">
            <label>Section Title</label>
            <input type="text" name="sectionTitle" value={settings.sectionTitle} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Section Intro Text</label>
            <textarea name="sectionIntro" value={settings.sectionIntro} onChange={handleChange} rows="2" />
          </div>
        </div>

        {/* EXPERTS LIST */}
        <div className="settings-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
            <h3 className="settings-card-title" style={{ border: 'none', padding: 0, margin: 0 }}>Individual Experts</h3>
            <button className="btn-add-item" style={{ padding: '8px 16px', marginTop: 0 }} onClick={addExpert}>
              <Plus size={16} /> Add Expert
            </button>
          </div>
          
          <div className="team-grid-admin">
            {settings.experts.map((expert, idx) => (
              <div key={idx} className="admin-list-item-card" style={{ position: 'relative' }}>
                <button 
                  className="btn-icon-danger" 
                  style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px' }}
                  onClick={() => removeExpert(idx)}
                >
                  <Trash2 size={16} />
                </button>
                <h4 style={{ marginBottom: '20px' }}>Expert {idx + 1}</h4>
                <div className="form-group"><label>Name</label><input type="text" value={expert.name} onChange={(e) => handleExpertChange(idx, 'name', e.target.value)} /></div>
                <div className="form-group"><label>Role / Designation</label><input type="text" value={expert.role} onChange={(e) => handleExpertChange(idx, 'role', e.target.value)} /></div>
                <div className="form-group"><label>Experience</label><input type="text" value={expert.exp} onChange={(e) => handleExpertChange(idx, 'exp', e.target.value)} /></div>
                <div className="form-group">
                  <label>Photo (URL or Upload)</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input type="text" value={expert.image} onChange={(e) => handleExpertChange(idx, 'image', e.target.value)} style={{ flex: 1 }} placeholder="Paste image URL here" />
                    <label className="btn-save-settings" style={{ padding: '10px 15px', cursor: 'pointer', background: '#e2e8f0', color: '#334155', border: '1px solid #cbd5e1' }}>
                      <Upload size={16} /> Upload
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, idx, false)} />
                    </label>
                  </div>
                  {expert.image && expert.image.length > 500 && (
                    <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '5px', marginBottom: 0 }}>✓ Custom image uploaded</p>
                  )}
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
