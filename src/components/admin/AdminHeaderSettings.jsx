import React, { useState, useEffect } from 'react';
import { Save, AlertTriangle, CheckCircle2, GripVertical, Trash2, Plus, ChevronDown } from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import ImageUploader from './ImageUploader';
import './AdminDashboard.css';

const AdminHeaderSettings = () => {
  const defaultNav = [
    { id: '1', label: 'HOME', url: '/', type: 'link' },
    { id: '2', label: 'ABOUT', url: '/about', type: 'dropdown', dropdownItems: [
      { label: 'PHILOSOPHY', url: '/about#philosophy' },
      { label: 'FOUNDING TEAM', url: '/about#founding-team' },
      { label: 'EXPERIENCE', url: '/about#experience' },
      { label: 'GALLERY', url: '/about#gallery' }
    ]},
    { id: '3', label: 'TREATMENTS', url: '/#treatments', type: 'mega-menu' },
    { id: '4', label: 'EXPERTS', url: '/experts', type: 'link' },
    { id: '5', label: 'MEDIA', url: '#media', type: 'dropdown', dropdownItems: [
      { label: 'PRESS', url: '/press' },
      { label: 'BLOGS', url: '/blog' }
    ]},
    { id: '6', label: 'A-LISTER', url: '#a-lister', type: 'link' },
    { id: '7', label: 'CONTACT', url: '/contact', type: 'link' }
  ];

  const [settings, setSettings] = useState({
    locationText: "Premium Aesthetics & Wellness Clinic",
    timingsText: "Mon - Sat: 10:00 AM - 8:00 PM",
    phoneText: "+91 98765 43210",
    badgeText: "Certified Specialists",
    ctaText: "Book Appointment",
    ctaUrl: "#book",
    backgroundColor: "#ffffff",
    textColor: "#0f172a",
    logoUrl: "/aevora-logo-clean.png",
    logoWidth: "180",
    navItems: defaultNav
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Drag state
  const [draggedItemIdx, setDraggedItemIdx] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const saved = await getDbSetting('header_settings');
        if (saved) {
          setSettings(prev => ({ ...prev, ...saved, navItems: saved.navItems || prev.navItems }));
        }
      } catch (err) {
        console.error("Failed to load header settings", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  // Nav Handlers
  const handleNavItemChange = (idx, field, value) => {
    const newItems = [...settings.navItems];
    newItems[idx][field] = value;
    setSettings({ ...settings, navItems: newItems });
  };

  const addNavItem = () => {
    setSettings({
      ...settings,
      navItems: [
        ...settings.navItems,
        { id: Date.now().toString(), label: 'New Link', url: '/', type: 'link' }
      ]
    });
  };

  const removeNavItem = (idx) => {
    const newItems = settings.navItems.filter((_, i) => i !== idx);
    setSettings({ ...settings, navItems: newItems });
  };

  // Drag & Drop
  const onDragStart = (e, index) => {
    setDraggedItemIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e, index) => {
    e.preventDefault();
  };
  const onDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItemIdx === null || draggedItemIdx === dropIndex) return;
    const newItems = [...settings.navItems];
    const draggedItem = newItems.splice(draggedItemIdx, 1)[0];
    newItems.splice(dropIndex, 0, draggedItem);
    setSettings({ ...settings, navItems: newItems });
    setDraggedItemIdx(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveDbSetting('header_settings', settings);
      if (res && res.success !== false) {
        if (res.offline) {
          showToast("Saved locally in cache! (Start backend on port 5001 to sync with MongoDB Atlas)");
        } else {
          showToast("Header settings saved and published to the live website!");
        }
        window.dispatchEvent(new Event('headerSettingsUpdated'));
      } else {
        showToast("Failed to save settings.", 'error');
      }
    } catch (err) {
      showToast("Error communicating with server.", 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="premium-page-manager"><div className="empty-state">Loading header settings...</div></div>;

  return (
    <div className="premium-page-manager">
      {notification && (
        <div className={`premium-toast ${notification.type}`}>
          {notification.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      <div className="page-manager-header">
        <div className="header-titles">
          <h1>Header Settings</h1>
          <p>Configure the global top bar, call-to-action, navigation menu, and appearance.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
            <Save size={18} />
            <span>{isSaving ? 'Saving...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      <div className="dashboard-two-col">
        {/* Left Col: Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="premium-card">
            <div className="card-header">
              <h2>Top Bar Information</h2>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Location Text</label>
                <input type="text" name="locationText" value={settings.locationText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Timings Text</label>
                <input type="text" name="timingsText" value={settings.timingsText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Phone Number</label>
                <input type="text" name="phoneText" value={settings.phoneText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Badge Text (Right)</label>
                <input type="text" name="badgeText" value={settings.badgeText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
            </div>
          </div>

          <div className="premium-card">
            <div className="card-header">
              <h2>Logo Settings</h2>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <ImageUploader 
                  currentUrl={settings.logoUrl} 
                  onSelect={(url) => setSettings(prev => ({ ...prev, logoUrl: url }))} 
                  label="Logo Image" 
                />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Logo Width (px)</label>
                <input type="number" name="logoWidth" value={settings.logoWidth} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
            </div>
          </div>

          <div className="premium-card">
            <div className="card-header">
              <h2>Call to Action (CTA) & Colors</h2>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Button Text</label>
                <input type="text" name="ctaText" value={settings.ctaText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Button URL</label>
                <input type="text" name="ctaUrl" value={settings.ctaUrl} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Header BG</label>
                  <input type="color" name="backgroundColor" value={settings.backgroundColor} onChange={handleChange} style={{ width: '100%', height: '40px', padding: '0', cursor: 'pointer', border: '1px solid var(--admin-border)', borderRadius: '4px' }} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Text Color</label>
                  <input type="color" name="textColor" value={settings.textColor} onChange={handleChange} style={{ width: '100%', height: '40px', padding: '0', cursor: 'pointer', border: '1px solid var(--admin-border)', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Drag and Drop Nav */}
        <div className="premium-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Navigation Editor</h2>
            <button onClick={addNavItem} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Plus size={14} /> Add Item</button>
          </div>
          <div className="card-body">
            <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.85rem' }}>Drag and drop items to reorder them in the header menu.</p>
            <div className="nav-editor-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {settings.navItems.map((item, index) => (
                <div 
                  key={item.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={(e) => onDragOver(e, index)}
                  onDrop={(e) => onDrop(e, index)}
                  style={{ 
                    display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', 
                    padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)',
                    cursor: 'grab' 
                  }}
                >
                  <GripVertical size={20} className="text-muted" style={{ cursor: 'grab' }} />
                  <div style={{ display: 'flex', flex: 1, gap: '8px' }}>
                    <input 
                      type="text" 
                      value={item.label} 
                      onChange={(e) => handleNavItemChange(index, 'label', e.target.value)}
                      placeholder="Label"
                      style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                    <input 
                      type="text" 
                      value={item.url} 
                      onChange={(e) => handleNavItemChange(index, 'url', e.target.value)}
                      placeholder="URL"
                      style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                    <select 
                      value={item.type} 
                      onChange={(e) => handleNavItemChange(index, 'type', e.target.value)}
                      style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white' }}
                    >
                      <option value="link">Link</option>
                      <option value="dropdown">Dropdown Menu</option>
                      <option value="mega-menu">Mega Menu (Treatments)</option>
                    </select>
                  </div>
                  <button onClick={() => removeNavItem(index)} className="action-icon-btn text-danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '24px', padding: '16px', background: '#eff6ff', borderRadius: '8px', fontSize: '0.85rem', color: '#1e40af' }}>
              <strong>Note:</strong> Dropdown and Mega-Menu nested links are currently maintained via the data catalog API for structural integrity. You can reorder their top-level parents here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeaderSettings;
