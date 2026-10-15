import React, { useState, useEffect } from 'react';
import { 
  Save, 
  AlertTriangle, 
  CheckCircle2, 
  GripVertical, 
  Trash2, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  RotateCcw,
  Layers,
  Link as LinkIcon
} from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import ImageUploader from './ImageUploader';
import { defaultMegaMenuItems } from '../Header';
import './AdminDashboard.css';

const defaultNav = [
  { id: '1', label: 'HOME', url: '/', type: 'link' },
  { id: '2', label: 'ABOUT', url: '/about', type: 'dropdown', dropdownItems: [
    { id: 'a-2', label: 'FOUNDING TEAM', url: '/about#founding-team' }
  ]},
  { id: '3', label: 'TREATMENTS', url: '/#treatments', type: 'mega-menu', megaMenuItems: defaultMegaMenuItems },
  { id: '4', label: 'EXPERTS', url: '/experts', type: 'link' },
  { id: '5', label: 'MEDIA', url: '#media', type: 'link' },
  { id: '6', label: 'A-LISTER', url: '#a-lister', type: 'link' },
  { id: '7', label: 'CONTACT', url: '/contact', type: 'link' }
];

const AdminHeaderSettings = () => {
  const [settings, setSettings] = useState({
    locationText: "SCO 205 FF, Sector 5, Panchkula – 134114",
    timingsText: "Mon - Sat: 10:00 AM - 8:00 PM",
    phoneText: "+91 97797 66933",
    badgeText: "Aevora Clinics",
    ctaText: "Book Appointment",
    ctaUrl: "tel:+919779766933",
    backgroundColor: "#ffffff",
    textColor: "#0f172a",
    logoUrl: "/aevora-logo-clean.png",
    logoWidth: "180",
    navItems: defaultNav
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Drag state for top-level nav items
  const [draggedItemIdx, setDraggedItemIdx] = useState(null);

  // Expanded submenu state (which nav item's submenus are open)
  const [expandedNavId, setExpandedNavId] = useState('3'); // default open TREATMENTS for quick access

  // Search filter for submenus (useful when editing 27 treatments)
  const [submenuSearchQuery, setSubmenuSearchQuery] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const saved = await getDbSetting('header_settings');
        if (saved) {
          setSettings(prev => {
            const navItems = (saved.navItems || prev.navItems).map(item => {
              if (item.type === 'mega-menu') {
                return {
                  ...item,
                  megaMenuItems: (item.megaMenuItems && item.megaMenuItems.length > 0)
                    ? item.megaMenuItems
                    : defaultMegaMenuItems
                };
              }
              if (item.type === 'dropdown') {
                return {
                  ...item,
                  dropdownItems: item.dropdownItems || []
                };
              }
              return item;
            });
            return {
              ...prev,
              ...saved,
              locationText: (saved.locationText && !saved.locationText.includes('Premium Aesthetics')) ? saved.locationText : "SCO 205 FF, Sector 5, Panchkula – 134114",
              phoneText: (saved.phoneText && !saved.phoneText.includes('98765 43210')) ? saved.phoneText : "+91 97797 66933",
              badgeText: (saved.badgeText && !saved.badgeText.includes('Certified Specialists')) ? saved.badgeText : "Aevora Clinics",
              navItems
            };
          });
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
    if (name === 'phoneText') {
      const cleanDigits = value.replace(/\D/g, '');
      const newTel = cleanDigits.length === 10 ? `tel:+91${cleanDigits}` : `tel:+${cleanDigits}`;
      setSettings(prev => ({
        ...prev,
        phoneText: value,
        ctaUrl: (prev.ctaUrl?.startsWith('tel:') || prev.ctaUrl === '#book') ? newTel : prev.ctaUrl
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  // Nav Handlers (Top-level items)
  const handleNavItemChange = (idx, field, value) => {
    const newItems = [...settings.navItems];
    newItems[idx][field] = value;
    if (field === 'type') {
      if (value === 'mega-menu' && !newItems[idx].megaMenuItems) {
        newItems[idx].megaMenuItems = defaultMegaMenuItems;
      }
      if (value === 'dropdown' && !newItems[idx].dropdownItems) {
        newItems[idx].dropdownItems = [];
      }
    }
    setSettings({ ...settings, navItems: newItems });
  };

  const addNavItem = () => {
    const newId = Date.now().toString();
    setSettings({
      ...settings,
      navItems: [
        ...settings.navItems,
        { id: newId, label: 'NEW LINK', url: '/', type: 'link' }
      ]
    });
  };

  const removeNavItem = (idx) => {
    const newItems = settings.navItems.filter((_, i) => i !== idx);
    setSettings({ ...settings, navItems: newItems });
  };

  // Drag & Drop for Top-Level Nav Items
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

  // ── SUBMENU / MEGA-MENU MANAGEMENT (WORDPRESS STYLE) ──────────────────────────
  const getSubmenuList = (item) => {
    if (item.type === 'mega-menu') {
      return item.megaMenuItems || defaultMegaMenuItems;
    }
    if (item.type === 'dropdown') {
      return item.dropdownItems || [];
    }
    return [];
  };

  const addSubmenuItem = (navIdx) => {
    const newItems = [...settings.navItems];
    const item = { ...newItems[navIdx] };
    const newSubItem = {
      id: `sub-${Date.now()}`,
      label: 'New Treatment / Link',
      url: '/treatments/new-service'
    };

    if (item.type === 'mega-menu') {
      item.megaMenuItems = [...(item.megaMenuItems || defaultMegaMenuItems), newSubItem];
    } else {
      item.dropdownItems = [...(item.dropdownItems || []), newSubItem];
    }

    newItems[navIdx] = item;
    setSettings({ ...settings, navItems: newItems });
    showToast("Added new submenu item! Scroll down and edit its label/link.", 'success');
  };

  const removeSubmenuItem = (navIdx, subIdx) => {
    const newItems = [...settings.navItems];
    const item = { ...newItems[navIdx] };

    if (item.type === 'mega-menu') {
      const list = [...(item.megaMenuItems || defaultMegaMenuItems)];
      const removed = list.splice(subIdx, 1)[0];
      item.megaMenuItems = list;
      showToast(`Removed "${removed.label}" from submenus. Click Save to publish.`, 'success');
    } else {
      const list = [...(item.dropdownItems || [])];
      const removed = list.splice(subIdx, 1)[0];
      item.dropdownItems = list;
      showToast(`Removed "${removed.label}" from submenus. Click Save to publish.`, 'success');
    }

    newItems[navIdx] = item;
    setSettings({ ...settings, navItems: newItems });
  };

  const handleSubmenuChange = (navIdx, subIdx, field, value) => {
    const newItems = [...settings.navItems];
    const item = { ...newItems[navIdx] };

    if (item.type === 'mega-menu') {
      const list = [...(item.megaMenuItems || defaultMegaMenuItems)];
      list[subIdx] = { ...list[subIdx], [field]: value };
      item.megaMenuItems = list;
    } else {
      const list = [...(item.dropdownItems || [])];
      list[subIdx] = { ...list[subIdx], [field]: value };
      item.dropdownItems = list;
    }

    newItems[navIdx] = item;
    setSettings({ ...settings, navItems: newItems });
  };

  const moveSubmenuItem = (navIdx, subIdx, direction) => {
    const newItems = [...settings.navItems];
    const item = { ...newItems[navIdx] };
    const list = item.type === 'mega-menu'
      ? [...(item.megaMenuItems || defaultMegaMenuItems)]
      : [...(item.dropdownItems || [])];

    const targetIdx = subIdx + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[subIdx];
    list[subIdx] = list[targetIdx];
    list[targetIdx] = temp;

    if (item.type === 'mega-menu') {
      item.megaMenuItems = list;
    } else {
      item.dropdownItems = list;
    }

    newItems[navIdx] = item;
    setSettings({ ...settings, navItems: newItems });
  };

  const resetMegaMenuToDefaults = (navIdx) => {
    if (window.confirm("Are you sure you want to restore all 27 default clinical services under TREATMENTS?")) {
      const newItems = [...settings.navItems];
      newItems[navIdx] = {
        ...newItems[navIdx],
        megaMenuItems: defaultMegaMenuItems
      };
      setSettings({ ...settings, navItems: newItems });
      showToast("TREATMENTS mega menu reset to 27 default clinical services!", 'success');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveDbSetting('header_settings', settings);
      if (res && res.success !== false) {
        if (res.offline) {
          showToast("Saved locally in cache! (Start backend to sync with MongoDB Atlas)");
        } else {
          showToast("Header navigation and all submenus saved and published to the live website!");
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

      {/* Header Bar */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Header Navigation &amp; Submenu Manager</h1>
          <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>
            WordPress-style Menu Editor: Add, delete, rename, or reorder top-level links and nested submenus (like Treatments &amp; About).
          </p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.95rem' }}
        >
          <Save size={18} />
          {isSaving ? 'Publishing...' : 'Save & Publish Menu'}
        </button>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
        
        {/* Left Column: Top Bar & Logo Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Bar Info Strip */}
          <div className="premium-card">
            <div className="card-header">
              <h2>Top Information Strip</h2>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.88rem' }}>Clinic Address</label>
                <input type="text" name="locationText" value={settings.locationText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.88rem' }}>Clinic Timings</label>
                <input type="text" name="timingsText" value={settings.timingsText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.88rem' }}>Appointment Phone</label>
                <input type="text" name="phoneText" value={settings.phoneText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                <small style={{ display: 'block', marginTop: '4px', fontSize: '0.8rem', color: '#64748b' }}>Calls this number directly when clicking the "Book Appointment" button or header phone link.</small>
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.88rem' }}>Trust Badge</label>
                <input type="text" name="badgeText" value={settings.badgeText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
            </div>
          </div>

          {/* Logo & CTA Settings */}
          <div className="premium-card">
            <div className="card-header">
              <h2>Logo &amp; Appointment Button</h2>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <ImageUploader 
                  currentUrl={settings.logoUrl} 
                  initialImage={settings.logoUrl} 
                  onSelect={(url) => setSettings(prev => ({ ...prev, logoUrl: url }))} 
                  label="Logo Image (Cloudinary)" 
                />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.88rem' }}>Logo Width (px)</label>
                <input type="number" name="logoWidth" value={settings.logoWidth} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.88rem' }}>CTA Button Text</label>
                <input type="text" name="ctaText" value={settings.ctaText} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div className="form-group mb-4">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.88rem' }}>CTA Button Link</label>
                <input type="text" name="ctaUrl" value={settings.ctaUrl} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                <small style={{ display: 'block', marginTop: '4px', fontSize: '0.8rem', color: '#64748b' }}>Default: <code>tel:+919779766933</code> (Direct phone call or custom link).</small>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Full WordPress-Style Menu & Submenu Editor */}
        <div className="premium-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Navigation Menu Structure</h2>
              <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.84rem' }}>
                Drag ☰ items to reorder top-level links. Click <strong>"Manage Submenus"</strong> on Treatments or About to add, edit or delete nested sub-links.
              </p>
            </div>
            <button onClick={addNavItem} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '0.85rem' }}>
              <Plus size={15} /> Add Menu Item
            </button>
          </div>

          <div className="card-body">
            <div className="nav-editor-list" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {settings.navItems.map((item, index) => {
                const isDropdownType = item.type === 'dropdown' || item.type === 'mega-menu';
                const submenus = getSubmenuList(item);
                const isExpanded = expandedNavId === item.id;

                // Filter submenus for search query
                const filteredSubmenus = isExpanded && submenuSearchQuery.trim()
                  ? submenus.filter(s => (s.label || '').toLowerCase().includes(submenuSearchQuery.toLowerCase()) || (s.url || '').toLowerCase().includes(submenuSearchQuery.toLowerCase()))
                  : submenus;

                return (
                  <div 
                    key={item.id}
                    style={{ 
                      background: isExpanded ? '#f0fdf4' : '#f8fafc', 
                      borderRadius: '10px', 
                      border: isExpanded ? '1.5px solid #10b981' : '1px solid #e2e8f0',
                      transition: 'all 0.2s ease',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Top Level Item Header Row */}
                    <div
                      draggable
                      onDragStart={(e) => onDragStart(e, index)}
                      onDragOver={(e) => onDragOver(e, index)}
                      onDrop={(e) => onDrop(e, index)}
                      style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        alignItems: 'center', 
                        padding: '12px 14px',
                        cursor: 'grab' 
                      }}
                    >
                      <GripVertical size={18} className="text-muted" style={{ cursor: 'grab', flexShrink: 0 }} />
                      
                      {/* Item Label */}
                      <input 
                        type="text" 
                        value={item.label} 
                        onChange={(e) => handleNavItemChange(index, 'label', e.target.value)}
                        placeholder="Label"
                        style={{ width: '130px', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 600, fontSize: '0.88rem' }}
                      />

                      {/* Item URL */}
                      <input 
                        type="text" 
                        value={item.url} 
                        onChange={(e) => handleNavItemChange(index, 'url', e.target.value)}
                        placeholder="URL (e.g. /about)"
                        style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />

                      {/* Item Type Selector */}
                      <select 
                        value={item.type} 
                        onChange={(e) => handleNavItemChange(index, 'type', e.target.value)}
                        style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '0.85rem', fontWeight: 500 }}
                      >
                        <option value="link">🔗 Standard Link</option>
                        <option value="dropdown">📂 Dropdown Menu</option>
                        <option value="mega-menu">✨ Mega Menu (3-Column Treatments)</option>
                      </select>

                      {/* Submenu Accordion Toggle Button */}
                      {isDropdownType && (
                        <button
                          type="button"
                          onClick={() => setExpandedNavId(isExpanded ? null : item.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: isExpanded ? '#0d382c' : '#ffffff',
                            color: isExpanded ? '#ffffff' : '#0d382c',
                            border: '1px solid #0d382c',
                            borderRadius: '6px',
                            padding: '7px 12px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                        >
                          <Layers size={14} />
                          <span>Submenus ({submenus.length})</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      )}

                      {/* Delete Top Level Nav Button */}
                      <button 
                        type="button"
                        onClick={() => removeNavItem(index)} 
                        className="action-icon-btn text-danger"
                        title="Remove menu item"
                        style={{ flexShrink: 0, padding: '6px', cursor: 'pointer', background: 'none', border: 'none', color: '#ef4444' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* ── NESTED SUBMENU EDITOR PANEL (ACCORDION) ── */}
                    {isDropdownType && isExpanded && (
                      <div 
                        style={{ 
                          borderTop: '1px solid #e2e8f0', 
                          background: '#ffffff', 
                          padding: '16px 18px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px'
                        }}
                      >
                        {/* Submenu Header Toolbar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                          <div>
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0d382c' }}>
                              Submenu Items for "{item.label}" ({submenus.length} total)
                            </span>
                            <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b' }}>
                              Add, delete or edit any submenu link below. Delete unwanted services with 1-click on the trash icon.
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {/* Search Filter for Quick Finding */}
                            {submenus.length > 5 && (
                              <div style={{ position: 'relative', width: '220px' }}>
                                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input 
                                  type="text" 
                                  value={submenuSearchQuery} 
                                  onChange={e => setSubmenuSearchQuery(e.target.value)} 
                                  placeholder="Filter submenus..." 
                                  style={{ width: '100%', padding: '6px 10px 6px 30px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                />
                              </div>
                            )}

                            {/* Add Submenu Button */}
                            <button
                              type="button"
                              onClick={() => addSubmenuItem(index)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: '#10b981',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '7px 12px',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              <Plus size={14} /> Add Submenu Item
                            </button>

                            {/* Reset to 27 defaults for mega-menu */}
                            {item.type === 'mega-menu' && (
                              <button
                                type="button"
                                onClick={() => resetMegaMenuToDefaults(index)}
                                title="Reset back to all original 27 clinic services"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  background: '#f1f5f9',
                                  color: '#475569',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '6px',
                                  padding: '7px 10px',
                                  fontSize: '0.78rem',
                                  fontWeight: 500,
                                  cursor: 'pointer'
                                }}
                              >
                                <RotateCcw size={12} /> Reset 27 Defaults
                              </button>
                            )}
                          </div>
                        </div>

                        {/* List of Submenu Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '480px', overflowY: 'auto', paddingRight: '4px' }}>
                          {filteredSubmenus.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', color: '#64748b', fontSize: '0.85rem' }}>
                              {submenuSearchQuery ? `No submenus match "${submenuSearchQuery}".` : 'No submenu items yet. Click "+ Add Submenu Item" above to add one.'}
                            </div>
                          ) : (
                            filteredSubmenus.map((sub, sIdx) => {
                              // Find actual index in parent's full array
                              const realIdx = submenus.findIndex(s => s.id === sub.id || s === sub);
                              const actualIdx = realIdx !== -1 ? realIdx : sIdx;

                              return (
                                <div 
                                  key={sub.id || actualIdx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 12px',
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '6px'
                                  }}
                                >
                                  {/* Submenu Order Index */}
                                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', width: '26px' }}>
                                    #{actualIdx + 1}
                                  </span>

                                  {/* Submenu Label */}
                                  <input 
                                    type="text" 
                                    value={sub.label} 
                                    onChange={(e) => handleSubmenuChange(index, actualIdx, 'label', e.target.value)}
                                    placeholder="Submenu Label / Service Name"
                                    style={{ flex: 1.3, padding: '6px 10px', fontSize: '0.84rem', borderRadius: '5px', border: '1px solid #cbd5e1' }}
                                  />

                                  {/* Submenu URL / Slug */}
                                  <input 
                                    type="text" 
                                    value={sub.url} 
                                    onChange={(e) => handleSubmenuChange(index, actualIdx, 'url', e.target.value)}
                                    placeholder="URL (e.g. /treatments/laser-hair-reduction)"
                                    style={{ flex: 1.7, padding: '6px 10px', fontSize: '0.84rem', borderRadius: '5px', border: '1px solid #cbd5e1' }}
                                  />

                                  {/* Reorder Buttons */}
                                  <div style={{ display: 'flex', gap: '3px' }}>
                                    <button
                                      type="button"
                                      disabled={actualIdx === 0}
                                      onClick={() => moveSubmenuItem(index, actualIdx, -1)}
                                      title="Move Up"
                                      style={{ padding: '5px 7px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: actualIdx === 0 ? 'not-allowed' : 'pointer', opacity: actualIdx === 0 ? 0.4 : 1 }}
                                    >
                                      <ArrowUp size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={actualIdx === submenus.length - 1}
                                      onClick={() => moveSubmenuItem(index, actualIdx, 1)}
                                      title="Move Down"
                                      style={{ padding: '5px 7px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: actualIdx === submenus.length - 1 ? 'not-allowed' : 'pointer', opacity: actualIdx === submenus.length - 1 ? 0.4 : 1 }}
                                    >
                                      <ArrowDown size={12} />
                                    </button>
                                  </div>

                                  {/* Delete Submenu Button */}
                                  <button
                                    type="button"
                                    onClick={() => removeSubmenuItem(index, actualIdx)}
                                    title="Delete this submenu link"
                                    style={{
                                      padding: '6px 9px',
                                      background: '#fee2e2',
                                      color: '#dc2626',
                                      border: '1px solid #fecaca',
                                      borderRadius: '5px',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      fontSize: '0.78rem',
                                      fontWeight: 600
                                    }}
                                  >
                                    <Trash2 size={13} /> Delete
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>

                        {/* Bottom Add Button */}
                        <div style={{ paddingTop: '8px', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            Changes take effect on live website after clicking <strong>"Save &amp; Publish Menu"</strong> at the top.
                          </span>
                          <button
                            type="button"
                            onClick={() => addSubmenuItem(index)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: '#f0fdf4',
                              color: '#0d382c',
                              border: '1px solid #10b981',
                              borderRadius: '6px',
                              padding: '6px 14px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={14} /> Add Another Submenu Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Info Banner */}
            <div style={{ marginTop: '24px', padding: '16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', fontSize: '0.85rem', color: '#065f46', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>WordPress-Style Navigation:</strong> You have full control over both top-level navigation links and all nested submenus. 
                When you add, delete or edit any treatment or dropdown link and click <em>"Save &amp; Publish Menu"</em>, the changes instantly reflect on both desktop mega-menu and the mobile slide-out drawer.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeaderSettings;
