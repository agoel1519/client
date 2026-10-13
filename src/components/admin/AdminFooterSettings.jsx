import React, { useState, useEffect } from 'react';
import { Save, AlertTriangle, CheckCircle2, GripVertical, Trash2, Plus, Edit2 } from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import ImageUploader from './ImageUploader';
import './AdminDashboard.css';

const AdminFooterSettings = () => {
  const defaultColumns = [
    { id: '1', title: 'CLINICAL TREATMENTS', links: [
      { label: 'Chemical Peels', url: '/treatments/chemical-peels' },
      { label: 'Laser Pigment', url: '/treatments/pigment-laser' }
    ]},
    { id: '2', title: 'THE SANCTUARY', links: [
      { label: 'About Aevora', url: '#about' },
      { label: 'Our Doctors', url: '#team' }
    ]}
  ];

  const [settings, setSettings] = useState({
    tagline: "A bespoke aesthetic and longevity sanctuary founded on clinical precision, US FDA-cleared science, and undetectable elegance.",
    founderName: "Dr. Meghna Mour",
    founderTitle: "Chief Aesthetic Dermatologist",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    youtubeUrl: "https://youtube.com",
    copyrightText: "AEVORA by Kian Clinics. All rights reserved.",
    logoUrl: "/aevora-logo-clean.png",
    logoWidth: "150",
    columns: defaultColumns
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Drag state
  const [draggedColIdx, setDraggedColIdx] = useState(null);
  
  // Link editing state
  const [editingColId, setEditingColId] = useState(null);
  const [draggedLinkIdx, setDraggedLinkIdx] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const saved = await getDbSetting('footer_settings');
        if (saved) {
          setSettings(prev => ({ ...prev, ...saved, columns: saved.columns || prev.columns }));
        }
      } catch (err) {
        console.error("Failed to load footer settings", err);
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

  // Columns Drag & Drop
  const onDragStartCol = (e, index) => {
    setDraggedColIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOverCol = (e) => e.preventDefault();
  const onDropCol = (e, dropIndex) => {
    e.preventDefault();
    if (draggedColIdx === null || draggedColIdx === dropIndex) return;
    const newCols = [...settings.columns];
    const draggedItem = newCols.splice(draggedColIdx, 1)[0];
    newCols.splice(dropIndex, 0, draggedItem);
    setSettings({ ...settings, columns: newCols });
    setDraggedColIdx(null);
  };

  const addColumn = () => {
    setSettings({
      ...settings,
      columns: [...settings.columns, { id: Date.now().toString(), title: 'NEW COLUMN', links: [] }]
    });
  };

  const removeColumn = (idx) => {
    const newCols = settings.columns.filter((_, i) => i !== idx);
    setSettings({ ...settings, columns: newCols });
  };

  const updateColTitle = (idx, title) => {
    const newCols = [...settings.columns];
    newCols[idx].title = title;
    setSettings({ ...settings, columns: newCols });
  };

  // Links Drag & Drop inside a Column
  const addLink = (colIdx) => {
    const newCols = [...settings.columns];
    newCols[colIdx].links.push({ label: 'New Link', url: '#' });
    setSettings({ ...settings, columns: newCols });
  };
  
  const updateLink = (colIdx, linkIdx, field, value) => {
    const newCols = [...settings.columns];
    newCols[colIdx].links[linkIdx][field] = value;
    setSettings({ ...settings, columns: newCols });
  };

  const removeLink = (colIdx, linkIdx) => {
    const newCols = [...settings.columns];
    newCols[colIdx].links.splice(linkIdx, 1);
    setSettings({ ...settings, columns: newCols });
  };

  const onDragStartLink = (e, index) => {
    setDraggedLinkIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDropLink = (e, colIdx, dropIndex) => {
    e.preventDefault();
    if (draggedLinkIdx === null || draggedLinkIdx === dropIndex) return;
    const newCols = [...settings.columns];
    const draggedItem = newCols[colIdx].links.splice(draggedLinkIdx, 1)[0];
    newCols[colIdx].links.splice(dropIndex, 0, draggedItem);
    setSettings({ ...settings, columns: newCols });
    setDraggedLinkIdx(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveDbSetting('footer_settings', settings);
      if (res && res.success !== false) {
        if (res.offline) {
          showToast("Saved locally in cache! (Start backend on port 5001 to sync with MongoDB Atlas)");
        } else {
          showToast("Footer settings saved and published!");
        }
        window.dispatchEvent(new Event('footerSettingsUpdated'));
      } else {
        showToast("Failed to save settings.", 'error');
      }
    } catch (err) {
      showToast("Error communicating with server.", 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="premium-page-manager"><div className="empty-state">Loading footer settings...</div></div>;

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
          <h1>Footer Settings</h1>
          <p>Manage footer branding, links, columns, and copyright information.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
            <Save size={18} />
            <span>{isSaving ? 'Saving...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      <div className="dashboard-two-col">
        {/* Left Col: Brand and Social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
              <h2>Brand & Founder</h2>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Tagline Description</label>
                <textarea name="tagline" value={settings.tagline} onChange={handleChange} className="form-control" rows={3} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Founder Name</label>
                <input type="text" name="founderName" value={settings.founderName} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Founder Title</label>
                <input type="text" name="founderTitle" value={settings.founderTitle} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
            </div>
          </div>

          <div className="premium-card">
            <div className="card-header">
              <h2>Social Media & Copyright</h2>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Instagram URL</label>
                <input type="text" name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Facebook URL</label>
                <input type="text" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>LinkedIn URL</label>
                <input type="text" name="linkedinUrl" value={settings.linkedinUrl} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>YouTube URL</label>
                <input type="text" name="youtubeUrl" value={settings.youtubeUrl} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mt-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Copyright Text</label>
                <input type="text" name="copyrightText" value={settings.copyrightText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Navigation Columns */}
        <div className="premium-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Footer Columns</h2>
            <button onClick={addColumn} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Plus size={14} /> Add Column</button>
          </div>
          <div className="card-body">
            <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.85rem' }}>Reorder columns or click Edit to manage links.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {settings.columns.map((col, colIdx) => (
                <div key={col.id} style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--admin-border)', overflow: 'hidden' }}>
                  
                  {/* Column Header */}
                  <div 
                    draggable
                    onDragStart={(e) => onDragStartCol(e, colIdx)}
                    onDragOver={onDragOverCol}
                    onDrop={(e) => onDropCol(e, colIdx)}
                    style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', cursor: 'grab', background: editingColId === col.id ? '#eff6ff' : 'transparent' }}
                  >
                    <GripVertical size={20} className="text-muted" />
                    <input 
                      type="text" 
                      value={col.title} 
                      onChange={(e) => updateColTitle(colIdx, e.target.value)}
                      placeholder="Column Title"
                      style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 600 }}
                    />
                    <button onClick={() => setEditingColId(editingColId === col.id ? null : col.id)} className="action-icon-btn text-primary" title="Edit Links">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => removeColumn(colIdx)} className="action-icon-btn text-danger">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Links Editor for this Column */}
                  {editingColId === col.id && (
                    <div style={{ padding: '16px', borderTop: '1px solid var(--admin-border)', background: 'white' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Column Links</h4>
                        <button onClick={() => addLink(colIdx)} className="action-icon-btn text-primary" style={{ padding: '4px', width: 'auto', height: 'auto', background: 'transparent' }}><Plus size={14} /> Add Link</button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {col.links.map((link, linkIdx) => (
                          <div 
                            key={linkIdx}
                            draggable
                            onDragStart={(e) => onDragStartLink(e, linkIdx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => onDropLink(e, colIdx, linkIdx)}
                            style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'grab' }}
                          >
                            <GripVertical size={16} className="text-muted" />
                            <input type="text" value={link.label} onChange={(e) => updateLink(colIdx, linkIdx, 'label', e.target.value)} placeholder="Label" style={{ flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                            <input type="text" value={link.url} onChange={(e) => updateLink(colIdx, linkIdx, 'url', e.target.value)} placeholder="URL" style={{ flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                            <button onClick={() => removeLink(colIdx, linkIdx)} className="action-icon-btn text-danger" style={{ width: '24px', height: '24px' }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFooterSettings;
