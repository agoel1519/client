import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUp, 
  ArrowDown, 
  Images, 
  X, 
  Sparkles, 
  Globe, 
  Eye, 
  Layers,
  Check
} from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import ImageUploader from './ImageUploader';
import { defaultGallerySettings } from '../pages/Gallery';
import './AdminDashboard.css';
import './AdminGallerySettings.css';

const PRESET_CATEGORIES = [
  "Clinic & Suites",
  "Advanced Technology",
  "Celebrity Spotlight",
  "Doctors & Team"
];

const AdminGallerySettings = () => {
  const [activeTab, setActiveTab] = useState('items'); // 'items' | 'add' | 'hero'
  const [settings, setSettings] = useState(defaultGallerySettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Filter in admin
  const [selectedCategory, setSelectedCategory] = useState("All");

  // New or Edited Item State
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const saved = await getDbSetting('gallery_settings');
        if (saved && saved.items && saved.items.length > 0) {
          setSettings({
            heroTitle: saved.heroTitle || defaultGallerySettings.heroTitle,
            heroSubtitle: saved.heroSubtitle || defaultGallerySettings.heroSubtitle,
            breadcrumb: saved.breadcrumb || defaultGallerySettings.breadcrumb,
            items: saved.items
          });
        } else {
          const legacy = localStorage.getItem('aevora_gallery_settings');
          if (legacy) {
            try {
              const parsed = JSON.parse(legacy);
              if (parsed && parsed.items && parsed.items.length > 0) {
                setSettings({ ...defaultGallerySettings, ...parsed });
                setIsLoading(false);
                return;
              }
            } catch (e) {}
          }
          setSettings(defaultGallerySettings);
        }
      } catch (err) {
        console.error("Error loading gallery settings", err);
        setSettings(defaultGallerySettings);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const persistSettings = async (updatedSettings = settings) => {
    setIsSaving(true);
    try {
      await saveDbSetting('gallery_settings', updatedSettings);
      localStorage.setItem('aevora_gallery_settings', JSON.stringify(updatedSettings));
      window.dispatchEvent(new Event('gallerySettingsUpdated'));
      showToast("Gallery settings & photos saved successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to save gallery settings.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const openNewItemForm = () => {
    setEditingItem({
      id: Date.now().toString(),
      title: "",
      category: "Clinic & Suites",
      caption: "",
      image: "/celebrities/celeb-3.jpg"
    });
    setActiveTab('add');
  };

  const openEditItemForm = (item) => {
    setEditingItem({ ...item });
    setActiveTab('add');
  };

  const saveEditingItem = async () => {
    if (!editingItem.image) {
      alert("Please select or enter an image URL.");
      return;
    }
    if (!editingItem.title.trim()) {
      alert("Please enter a title for this gallery item.");
      return;
    }

    let updatedItems = [...settings.items];
    const existingIndex = updatedItems.findIndex(i => i.id === editingItem.id);

    if (existingIndex >= 0) {
      updatedItems[existingIndex] = editingItem;
    } else {
      updatedItems.unshift(editingItem);
    }

    const updatedSettings = { ...settings, items: updatedItems };
    setSettings(updatedSettings);
    await persistSettings(updatedSettings);
    setEditingItem(null);
    setActiveTab('items');
  };

  const removeItem = async (id) => {
    if (window.confirm("Are you sure you want to remove this photo from the gallery?")) {
      const updatedItems = settings.items.filter(i => i.id !== id);
      const updatedSettings = { ...settings, items: updatedItems };
      setSettings(updatedSettings);
      await persistSettings(updatedSettings);
      showToast("Photo removed from gallery.");
    }
  };

  const moveItem = async (index, direction) => {
    const newItems = [...settings.items];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updatedSettings = { ...settings, items: newItems };
    setSettings(updatedSettings);
    await persistSettings(updatedSettings);
  };

  const handleHeroChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const categories = ["All", ...Array.from(new Set(settings.items.map(i => i.category).filter(Boolean)))];

  const filteredItems = settings.items.filter(item => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="gallery-admin-container">
      {/* Toast Notification */}
      {notification && (
        <div className={`premium-toast ${notification.type}`} style={{ zIndex: 9999 }}>
          {notification.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="page-manager-header" style={{ marginBottom: '20px' }}>
        <div className="header-titles">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#0d382c', color: '#fff', padding: '8px', borderRadius: '8px', display: 'flex' }}>
              <Images size={22} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#0d382c' }}>Sanctuary Gallery CMS</h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                Upload, caption, categorize, and organize photos displayed on the public Gallery page.
              </p>
            </div>
          </div>
        </div>

        <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
          <a 
            href="/gallery" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Globe size={16} /> View Live Gallery
          </a>
          <button 
            className="btn-primary" 
            onClick={openNewItemForm}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={18} /> Add New Photo
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="gallery-admin-tabs">
        <button 
          className={`gallery-admin-tab-btn ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          <Images size={17} /> Gallery Photos ({settings.items.length})
        </button>

        {editingItem && (
          <button 
            className={`gallery-admin-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <Edit3 size={17} /> {settings.items.some(i => i.id === editingItem.id) ? 'Edit Photo' : 'Add New Photo'}
          </button>
        )}

        <button 
          className={`gallery-admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <Sparkles size={17} /> Banner &amp; Header Settings
        </button>
      </div>

      {/* -------------------------------------------------------------
          TAB 1: GALLERY PHOTOS LIST
          ------------------------------------------------------------- */}
      {activeTab === 'items' && (
        <div>
          {/* Category Filter Pills in Admin */}
          {categories.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`blog-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filteredItems.length === 0 ? (
            <div className="premium-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
              <Images size={48} style={{ opacity: 0.3, marginBottom: '14px', color: '#0d382c' }} />
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>No gallery photos in this category</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>
                Add your first photo to showcase your clinic suites and treatments.
              </p>
              <button className="btn-primary" onClick={openNewItemForm}>
                <Plus size={16} /> Add New Photo
              </button>
            </div>
          ) : (
            <div className="gallery-admin-grid">
              {filteredItems.map((item, index) => (
                <div className="gallery-admin-card" key={item.id || index}>
                  <div className="gallery-admin-thumb-wrapper">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="gallery-admin-thumb" 
                    />
                  </div>

                  <div className="gallery-admin-card-body">
                    <div className="gallery-admin-card-header">
                      <span className="gallery-admin-card-index">#{index + 1} • {item.category || 'General'}</span>
                      <div className="gallery-admin-card-actions">
                        <button 
                          className="gallery-admin-btn-icon"
                          onClick={() => moveItem(index, -1)}
                          disabled={index === 0}
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button 
                          className="gallery-admin-btn-icon"
                          onClick={() => moveItem(index, 1)}
                          disabled={index === filteredItems.length - 1}
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button 
                          className="gallery-admin-btn-icon"
                          onClick={() => openEditItemForm(item)}
                          title="Edit Details"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          className="gallery-admin-btn-icon delete"
                          onClick={() => removeItem(item.id)}
                          title="Delete Photo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#0f172a' }}>
                      {item.title}
                    </h4>
                    {item.caption && (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.4 }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: ADD / EDIT PHOTO FORM
          ------------------------------------------------------------- */}
      {activeTab === 'add' && editingItem && (
        <div className="gallery-admin-form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0d382c' }}>
              {settings.items.some(i => i.id === editingItem.id) ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
            </h2>
            <button 
              type="button"
              className="btn-secondary"
              onClick={() => { setEditingItem(null); setActiveTab('items'); }}
            >
              <X size={16} /> Cancel
            </button>
          </div>

          {/* Image Uploader */}
          <div className="form-group mb-4">
            <ImageUploader 
              currentUrl={editingItem.image}
              onSelect={(url) => setEditingItem(prev => ({ ...prev, image: url }))}
              label="Photo Image *"
            />
          </div>

          {/* Quick Presets */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
              Quick Clinic Asset Presets:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button 
                type="button"
                className="blog-preset-cat-btn"
                onClick={() => setEditingItem(prev => ({ ...prev, image: '/celebrities/celeb-3.jpg' }))}
              >
                Treatment Suite
              </button>
              <button 
                type="button"
                className="blog-preset-cat-btn"
                onClick={() => setEditingItem(prev => ({ ...prev, image: '/celebrities/celeb-1.jpg' }))}
              >
                Celebrity Lounge
              </button>
              <button 
                type="button"
                className="blog-preset-cat-btn"
                onClick={() => setEditingItem(prev => ({ ...prev, image: '/banners/banner-wellness.jpg' }))}
              >
                Wellness Infusion
              </button>
              <button 
                type="button"
                className="blog-preset-cat-btn"
                onClick={() => setEditingItem(prev => ({ ...prev, image: '/doctors/team-group-banner.jpg' }))}
              >
                Doctor Team
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Photo Title *</label>
            <input 
              type="text" 
              value={editingItem.title} 
              onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. SculptMD Ergonomic Treatment Suite" 
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
              required 
            />
          </div>

          {/* Category */}
          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Category</label>
            <input 
              type="text" 
              value={editingItem.category} 
              onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g. Clinic & Suites" 
              className="form-control"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
              {PRESET_CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  type="button"
                  className="blog-preset-cat-btn"
                  onClick={() => setEditingItem(prev => ({ ...prev, category: cat }))}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Caption / Description</label>
            <textarea 
              rows="3" 
              value={editingItem.caption} 
              onChange={(e) => setEditingItem(prev => ({ ...prev, caption: e.target.value }))}
              placeholder="Describe this treatment suite, technology, or procedure..." 
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={saveEditingItem}
              disabled={isSaving}
              style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
            >
              <Check size={16} /> Save Photo to Gallery
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 3: BANNER & HEADER SETTINGS
          ------------------------------------------------------------- */}
      {activeTab === 'hero' && (
        <div className="gallery-admin-form-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0d382c', marginBottom: '8px' }}>
            Gallery Hero Banner Settings
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
            Configure the main headline, subtitle, and breadcrumb shown at the top of <code>/gallery</code>.
          </p>

          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Page Heading</label>
            <input 
              type="text" 
              value={settings.heroTitle} 
              onChange={(e) => handleHeroChange('heroTitle', e.target.value)}
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Page Subtitle</label>
            <input 
              type="text" 
              value={settings.heroSubtitle} 
              onChange={(e) => handleHeroChange('heroSubtitle', e.target.value)}
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Breadcrumb Label</label>
            <input 
              type="text" 
              value={settings.breadcrumb} 
              onChange={(e) => handleHeroChange('breadcrumb', e.target.value)}
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
            />
          </div>

          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => persistSettings(settings)}
            disabled={isSaving}
            style={{ padding: '12px 24px' }}
          >
            <Save size={18} /> {isSaving ? 'Saving...' : 'Save Banner Settings'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminGallerySettings;
