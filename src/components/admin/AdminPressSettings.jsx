import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';

const defaultSettings = {
  heroTitle: "PRESS & MEDIA",
  heroSubtitle: "Aevora in the spotlight",
  heroBg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
  sectionTitle: "MEDIA",
  articles: [
    { id: 1, image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80", link: "#" },
    { id: 2, image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80", link: "#" },
    { id: 3, image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=400&q=80", link: "#" },
    { id: 4, image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=400&q=80", link: "#" },
    { id: 5, image: "https://images.unsplash.com/photo-1512413513296-8eb5204439c0?auto=format&fit=crop&w=400&q=80", link: "#" }
  ]
};

const AdminPressSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aevora_press_settings');
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

  const handleArticleChange = (index, field, value) => {
    const newArticles = [...settings.articles];
    newArticles[index][field] = value;
    setSettings(prev => ({ ...prev, articles: newArticles }));
  };

  const addArticle = () => {
    setSettings(prev => ({ 
      ...prev, 
      articles: [...prev.articles, { id: Date.now(), image: "", link: "#" }] 
    }));
  };

  const removeArticle = (index) => {
    const newArticles = [...settings.articles];
    newArticles.splice(index, 1);
    setSettings(prev => ({ ...prev, articles: newArticles }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('aevora_press_settings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <div>
          <h1 className="settings-title">Press Page Settings</h1>
          <p className="settings-subtitle">Manage the press & media clippings carousel.</p>
        </div>
        <button className="btn-save-settings" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <span className="spinner"></span> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>Press page updated successfully! Changes are now live.</span>
        </div>
      )}

      <div className="settings-sections">
        {/* HERO BANNER */}
        <div className="settings-card">
          <h3 className="settings-card-title">Hero Banner</h3>
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
            <label>Hero Background Image URL</label>
            <input type="text" name="heroBg" value={settings.heroBg} onChange={handleChange} />
          </div>
        </div>

        {/* ARTICLES CAROUSEL */}
        <div className="settings-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
            <h3 className="settings-card-title" style={{ border: 'none', padding: 0, margin: 0 }}>Press Articles (Carousel)</h3>
            <button className="btn-add-item" style={{ padding: '8px 16px', marginTop: 0 }} onClick={addArticle}>
              <Plus size={16} /> Add Article
            </button>
          </div>
          
          <div className="gallery-admin-list">
            {settings.articles.map((article, idx) => (
              <div key={article.id} className="admin-list-item-card" style={{ position: 'relative' }}>
                <button 
                  className="btn-icon-danger" 
                  style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px' }}
                  onClick={() => removeArticle(idx)}
                >
                  <Trash2 size={16} />
                </button>
                <h4 style={{ marginBottom: '15px' }}>Article {idx + 1}</h4>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Image URL (Clipping Thumbnail)</label>
                    <input type="text" value={article.image} onChange={(e) => handleArticleChange(idx, 'image', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Link URL (Optional)</label>
                    <input type="text" value={article.link} onChange={(e) => handleArticleChange(idx, 'link', e.target.value)} />
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

export default AdminPressSettings;
