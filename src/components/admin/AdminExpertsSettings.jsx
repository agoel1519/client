import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2, Upload } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import { uploadToCloudinary } from '../../utils/cloudinary';

const defaultSettings = {
  heroTitle: "OUR EXPERTS",
  heroSubtitle: "Accomplished specialists dedicated to your care",
  groupPhoto: "",
  sectionTitle: "OUR TEAM OF SPECIALISTS",
  sectionIntro: "Led by a team of highly qualified medical practitioners who are brilliant in their fields and dedicated to providing you with the personalized care you deserve.",
  experts: [
    { 
      name: "Dr Misha Goel", 
      role: "Aesthetic Physician • Trained in UK", 
      exp: "MBBS, MD, FFAC", 
      image: "/doctors/dr-misha-goel.jpg" 
    },
    { 
      name: "Dr Anupam Goel", 
      role: "Minimal Access Gastrointestinal, Bariatric (Weight-loss) & Robotic Surgeon", 
      exp: "MBBS, MS, FNB", 
      image: "/doctors/dr-anupam-goel.jpg" 
    }
  ]
};

const AdminExpertsSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getDbSetting('experts_settings').then((saved) => {
      if (saved) {
        const hasLegacy = saved.experts && saved.experts.some(e => e.name && (e.name.includes('Meghna Mour') || e.name.includes('Harish Balaji')));
        if (hasLegacy) {
          setSettings(prev => ({ ...prev, ...saved, experts: defaultSettings.experts }));
        } else {
          setSettings(prev => ({ ...prev, ...saved }));
        }
      } else {
        const legacy = localStorage.getItem('aevora_experts_settings');
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

  const handleImageUpload = async (e, index = null, isGroupPhoto = false) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const cldRes = await uploadToCloudinary(file);
        if (cldRes && cldRes.success && cldRes.url) {
          if (isGroupPhoto) {
            setSettings(prev => ({ ...prev, groupPhoto: cldRes.url }));
          } else if (index !== null) {
            handleExpertChange(index, 'image', cldRes.url);
          }
          return;
        }
      } catch (err) {
        console.warn('Cloudinary upload notice:', err.message);
      }

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
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <ImageUploader 
              currentUrl={settings.groupPhoto} 
              onSelect={(url) => setSettings({ ...settings, groupPhoto: url })} 
              label="Group Photo" 
            />
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
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <ImageUploader 
                    currentUrl={expert.image} 
                    onSelect={(url) => handleExpertChange(idx, 'image', url)} 
                    label="Expert Image" 
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
