import React, { useState, useEffect } from 'react';
import { Palette, Save, CheckCircle2, AlertTriangle, RotateCcw, Sparkles, Type, Eye } from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import { defaultTheme, applyThemeToDom } from '../../utils/themeHelper';
import './AdminDashboard.css';

const presets = [
  {
    name: "Aevora Signature (Emerald & Gold)",
    theme: {
      emerald: "#0d382c",
      emeraldDark: "#07221a",
      emeraldLight: "#164e3e",
      gold: "#c59d5f",
      goldHover: "#b38a4d",
      goldLight: "#ffd899",
      sageBg: "#f4f8f5",
      darkText: "#111e19",
      bodyText: "#4b5e55",
      fontMain: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      fontSerif: "'Playfair Display', Georgia, serif",
      fontOutfit: "'Outfit', sans-serif"
    }
  },
  {
    name: "Midnight Royale (Obsidian & Champagne)",
    theme: {
      emerald: "#141d26",
      emeraldDark: "#0a0f14",
      emeraldLight: "#243342",
      gold: "#d4af37",
      goldHover: "#be9a29",
      goldLight: "#fae29c",
      sageBg: "#f8f9fa",
      darkText: "#0d1117",
      bodyText: "#4a5568",
      fontMain: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      fontSerif: "'Cormorant Garamond', Georgia, serif",
      fontOutfit: "'Outfit', sans-serif"
    }
  },
  {
    name: "Rose Quartz & Bronze Sanctuary",
    theme: {
      emerald: "#2d1b24",
      emeraldDark: "#1a0d14",
      emeraldLight: "#482b3a",
      gold: "#c88d76",
      goldHover: "#b0735d",
      goldLight: "#f4d0c4",
      sageBg: "#faf6f4",
      darkText: "#20121a",
      bodyText: "#5c4d54",
      fontMain: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      fontSerif: "'Playfair Display', Georgia, serif",
      fontOutfit: "'Outfit', sans-serif"
    }
  },
  {
    name: "Nordic Minimalist (Slate & Warm Sand)",
    theme: {
      emerald: "#1e293b",
      emeraldDark: "#0f172a",
      emeraldLight: "#334155",
      gold: "#b89768",
      goldHover: "#a28254",
      goldLight: "#ecd9be",
      sageBg: "#f8fafc",
      darkText: "#0f172a",
      bodyText: "#475569",
      fontMain: "'Inter', system-ui, -apple-system, sans-serif",
      fontSerif: "'Cinzel', Georgia, serif",
      fontOutfit: "'Outfit', sans-serif"
    }
  }
];

const headingFontOptions = [
  { label: "Playfair Display (Editorial High-Fashion Serif)", value: "'Playfair Display', Georgia, serif" },
  { label: "Cormorant Garamond (Classical Luxury Elegance)", value: "'Cormorant Garamond', Georgia, serif" },
  { label: "Cinzel (Roman Architectural Luxury)", value: "'Cinzel', serif" },
  { label: "Cinzel Decorative (Ornate Classical Luxury)", value: "'Cinzel Decorative', serif" },
  { label: "Bodoni Moda (Vogue Editorial High-Contrast)", value: "'Bodoni Moda', serif" },
  { label: "Prata (Didone Delicate Luxury Serif)", value: "'Prata', serif" },
  { label: "Marcellus (Sculpted Roman Classic)", value: "'Marcellus', serif" },
  { label: "Italiana (Italian Haute Couture)", value: "'Italiana', serif" },
  { label: "Tenor Sans (Clean Subtle Editorial)", value: "'Tenor Sans', sans-serif" },
  { label: "DM Serif Display (Modern Punchy Serif)", value: "'DM Serif Display', serif" },
  { label: "Lora (Contemporary Editorial Literary)", value: "'Lora', serif" },
  { label: "Merriweather (Refined Classical Reader)", value: "'Merriweather', serif" },
  { label: "Baskervville (Traditional Heritage Serif)", value: "'Baskervville', serif" },
  { label: "Plus Jakarta Sans (Modern Executive Sans)", value: "'Plus Jakarta Sans', sans-serif" },
  { label: "Outfit (Ultra-Clean Contemporary)", value: "'Outfit', sans-serif" },
  { label: "Montserrat (Geometric Premium Brand)", value: "'Montserrat', sans-serif" },
  { label: "Poppins (Modern Geometric Rounded)", value: "'Poppins', sans-serif" }
];

const bodyFontOptions = [
  { label: "Plus Jakarta Sans (Modern Clean & Balanced)", value: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" },
  { label: "Inter (Crisp & High Legibility)", value: "'Inter', system-ui, -apple-system, sans-serif" },
  { label: "Montserrat (Geometric Aesthetic)", value: "'Montserrat', sans-serif" },
  { label: "Outfit (Contemporary Minimalist)", value: "'Outfit', sans-serif" },
  { label: "Poppins (Rounded Friendly Luxury)", value: "'Poppins', sans-serif" },
  { label: "Manrope (Semi-Geometric Clean)", value: "'Manrope', sans-serif" },
  { label: "Urbanist (Modernist Sans)", value: "'Urbanist', sans-serif" },
  { label: "Lato (Warm & Professional)", value: "'Lato', sans-serif" },
  { label: "Roboto (Neutral Technical Precision)", value: "'Roboto', sans-serif" },
  { label: "Open Sans (Clean Universal)", value: "'Open Sans', sans-serif" }
];

const accentFontOptions = [
  { label: "Outfit (Ultra-Clean Contemporary Minimalist)", value: "'Outfit', sans-serif" },
  { label: "Plus Jakarta Sans (Modern Executive Sans)", value: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { label: "Inter (Crisp High Legibility)", value: "'Inter', sans-serif" },
  { label: "Montserrat (Geometric Luxury Brand)", value: "'Montserrat', sans-serif" },
  { label: "Poppins (Rounded Friendly Modern)", value: "'Poppins', sans-serif" },
  { label: "Cinzel (Roman Architectural Luxury)", value: "'Cinzel', serif" },
  { label: "Manrope (Semi-Geometric Clean)", value: "'Manrope', sans-serif" },
  { label: "Urbanist (Clean Architectural)", value: "'Urbanist', sans-serif" }
];

const AdminThemeSettings = () => {
  const [theme, setTheme] = useState(defaultTheme);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [customHeadingFont, setCustomHeadingFont] = useState('');
  const [customBodyFont, setCustomBodyFont] = useState('');
  const [customAccentFont, setCustomAccentFont] = useState('');
  const [liveTestText, setLiveTestText] = useState('Science of Ageless Cellular Elegance');

  const applyCustomHeading = () => {
    if (customHeadingFont.trim()) {
      const fontVal = `'${customHeadingFont.trim()}', serif`;
      handleColorChange('fontSerif', fontVal);
      showToast(`Loaded & applied Google Font: "${customHeadingFont.trim()}"`);
    }
  };

  const applyCustomBody = () => {
    if (customBodyFont.trim()) {
      const fontVal = `'${customBodyFont.trim()}', sans-serif`;
      handleColorChange('fontMain', fontVal);
      showToast(`Loaded & applied Google Font: "${customBodyFont.trim()}"`);
    }
  };

  const applyCustomAccent = () => {
    if (customAccentFont.trim()) {
      const fontVal = `'${customAccentFont.trim()}', sans-serif`;
      handleColorChange('fontOutfit', fontVal);
      showToast(`Loaded & applied Google Font: "${customAccentFont.trim()}"`);
    }
  };

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const saved = await getDbSetting('global_theme_settings');
        if (saved) {
          setTheme(prev => ({ ...prev, ...saved }));
        } else {
          const cached = localStorage.getItem('aevora_theme_settings');
          if (cached) {
            try {
              setTheme(prev => ({ ...prev, ...JSON.parse(cached) }));
            } catch (e) {}
          }
        }
      } catch (e) {
        console.error("Failed to load theme settings", e);
      }
    };
    fetchTheme();
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleColorChange = (key, value) => {
    const updated = { ...theme, [key]: value };
    setTheme(updated);
    applyThemeToDom(updated);
  };

  const handlePresetApply = (presetTheme) => {
    setTheme(presetTheme);
    applyThemeToDom(presetTheme);
    showToast("Preset applied! Click 'Save Theme' to publish.");
  };

  const handleReset = () => {
    if (window.confirm("Reset all colors and typography back to default Aevora branding?")) {
      setTheme(defaultTheme);
      applyThemeToDom(defaultTheme);
      showToast("Theme reset to defaults. Click 'Save Theme' to confirm.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveDbSetting('global_theme_settings', theme);
      localStorage.setItem('aevora_theme_settings', JSON.stringify(theme));
      applyThemeToDom(theme);
      window.dispatchEvent(new CustomEvent('themeSettingsUpdated', { detail: theme }));

      if (res && res.offline) {
        showToast("Theme cached locally! (Backend will sync on port 5001)");
      } else {
        showToast("Theme & typography successfully published to live website!");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving theme settings.", "error");
    } finally {
      setIsSaving(false);
    }
  };

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
          <h1>Global Theme &amp; Typography Customizer</h1>
          <p>Instantly change brand colors, gold accents, heading serifs, and body fonts across the entire website.</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={handleReset} title="Reset to Aevora Defaults">
            <RotateCcw size={16} /> Reset
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
            <Save size={18} />
            <span>{isSaving ? 'Saving...' : 'Save & Publish Theme'}</span>
          </button>
        </div>
      </div>

      {/* Preset Palettes */}
      <div className="premium-card mb-4" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} className="text-primary" /> Curated Luxury Presets
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {presets.map((p, i) => (
            <div 
              key={i} 
              onClick={() => handlePresetApply(p.theme)}
              style={{
                cursor: 'pointer',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid var(--admin-border)',
                background: 'var(--admin-bg, #f8fafc)',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: p.theme.emerald, border: '1px solid rgba(0,0,0,0.1)' }}></span>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: p.theme.gold, border: '1px solid rgba(0,0,0,0.1)' }}></span>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: p.theme.sageBg, border: '1px solid rgba(0,0,0,0.1)' }}></span>
              </div>
              <strong style={{ fontSize: '0.9rem', color: 'var(--admin-text)' }}>{p.name}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-two-col">
        {/* Left Col: Color & Typography Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Colors Card */}
          <div className="premium-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={18} className="text-primary" /> Brand Color Palette
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Primary Emerald / Brand Tone</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Main headers, luxury hero accents, buttons</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="color" value={theme.emerald} onChange={(e) => handleColorChange('emerald', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <input type="text" value={theme.emerald} onChange={(e) => handleColorChange('emerald', e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Emerald Dark (Backgrounds &amp; Overlays)</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Deep contrast sections and dark cards</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="color" value={theme.emeraldDark} onChange={(e) => handleColorChange('emeraldDark', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <input type="text" value={theme.emeraldDark} onChange={(e) => handleColorChange('emeraldDark', e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Emerald Light / Hover State</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Button hovers and active pill borders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="color" value={theme.emeraldLight} onChange={(e) => handleColorChange('emeraldLight', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <input type="text" value={theme.emeraldLight} onChange={(e) => handleColorChange('emeraldLight', e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.85rem' }} />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '6px 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Gold Accent Color</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>VIP badges, stars, icons, subtitle tags</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="color" value={theme.gold} onChange={(e) => handleColorChange('gold', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <input type="text" value={theme.gold} onChange={(e) => handleColorChange('gold', e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Gold Hover &amp; Border</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Secondary accents &amp; highlight rings</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="color" value={theme.goldHover} onChange={(e) => handleColorChange('goldHover', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <input type="text" value={theme.goldHover} onChange={(e) => handleColorChange('goldHover', e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.85rem' }} />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '6px 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Subtle Sage / Soft Section Background</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Alternating section backgrounds &amp; card fills</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="color" value={theme.sageBg} onChange={(e) => handleColorChange('sageBg', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <input type="text" value={theme.sageBg} onChange={(e) => handleColorChange('sageBg', e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Dark Heading Text</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Titles, headings, high-contrast labels</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="color" value={theme.darkText} onChange={(e) => handleColorChange('darkText', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <input type="text" value={theme.darkText} onChange={(e) => handleColorChange('darkText', e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Muted Body Copy Text</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>Paragraphs, descriptions, clinical notes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="color" value={theme.bodyText} onChange={(e) => handleColorChange('bodyText', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                  <input type="text" value={theme.bodyText} onChange={(e) => handleColorChange('bodyText', e.target.value)} style={{ width: '85px', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.85rem' }} />
                </div>
              </div>

            </div>
          </div>

          {/* Typography Card */}
          <div className="premium-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Type size={18} className="text-primary" /> Global Typography &amp; Font Family
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Heading Font Select */}
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                  Heading &amp; Titles Font Family ({headingFontOptions.length} Presets)
                </label>
                <select 
                  value={theme.fontSerif} 
                  onChange={(e) => handleColorChange('fontSerif', e.target.value)}
                  className="form-control"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                >
                  {headingFontOptions.map((f, i) => (
                    <option key={i} value={f.value}>{f.label}</option>
                  ))}
                </select>

                {/* Custom Google Font input for Headings */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Or type any Google Font name (e.g. Bodoni Moda, Syne, Poppins)..." 
                    value={customHeadingFont} 
                    onChange={(e) => setCustomHeadingFont(e.target.value)}
                    className="form-control"
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '13px' }}
                  />
                  <button 
                    type="button" 
                    onClick={applyCustomHeading}
                    className="btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '13px', whiteSpace: 'nowrap' }}
                  >
                    Load &amp; Apply Font
                  </button>
                </div>
              </div>

              {/* Body Font Select */}
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                  Main Body &amp; Paragraphs Font Family ({bodyFontOptions.length} Presets)
                </label>
                <select 
                  value={theme.fontMain} 
                  onChange={(e) => handleColorChange('fontMain', e.target.value)}
                  className="form-control"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                >
                  {bodyFontOptions.map((f, i) => (
                    <option key={i} value={f.value}>{f.label}</option>
                  ))}
                </select>

                {/* Custom Google Font input for Body */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Or type any Google Font for body (e.g. Urbanist, Poppins, Inter)..." 
                    value={customBodyFont} 
                    onChange={(e) => setCustomBodyFont(e.target.value)}
                    className="form-control"
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '13px' }}
                  />
                  <button 
                    type="button" 
                    onClick={applyCustomBody}
                    className="btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '13px', whiteSpace: 'nowrap' }}
                  >
                    Load &amp; Apply Font
                  </button>
                </div>
              </div>

              {/* Accent / Badges / Footer Font Select */}
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                  Accent, Badges &amp; Buttons Font Family ({accentFontOptions.length} Presets)
                </label>
                <select 
                  value={theme.fontOutfit || "'Outfit', sans-serif"} 
                  onChange={(e) => handleColorChange('fontOutfit', e.target.value)}
                  className="form-control"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                >
                  {accentFontOptions.map((f, i) => (
                    <option key={i} value={f.value}>{f.label}</option>
                  ))}
                </select>

                {/* Custom Google Font input for Accent */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Or type any Google Font for accent/buttons (e.g. Cinzel, Outfit, Montserrat)..." 
                    value={customAccentFont} 
                    onChange={(e) => setCustomAccentFont(e.target.value)}
                    className="form-control"
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '13px' }}
                  />
                  <button 
                    type="button" 
                    onClick={applyCustomAccent}
                    className="btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '13px', whiteSpace: 'nowrap' }}
                  >
                    Load &amp; Apply Font
                  </button>
                </div>
              </div>

              {/* Sizing & Scales */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Global Base Font Size</label>
                  <select 
                    value={theme.baseFontSize || '16px'} 
                    onChange={(e) => handleColorChange('baseFontSize', e.target.value)}
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                  >
                    <option value="14px">14px (Ultra Compact)</option>
                    <option value="15px">15px (Compact)</option>
                    <option value="16px">16px (Standard Default)</option>
                    <option value="17px">17px (Enhanced Legibility - 105%)</option>
                    <option value="18px">18px (Large &amp; Crisp - 112%)</option>
                    <option value="20px">20px (Extra Large - 125%)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Heading Scale</label>
                  <select 
                    value={theme.headingScale || '1.0'} 
                    onChange={(e) => handleColorChange('headingScale', e.target.value)}
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                  >
                    <option value="0.9">0.9x (Subtle)</option>
                    <option value="1.0">1.0x (Standard Default)</option>
                    <option value="1.15">1.15x (Large &amp; Dramatic)</option>
                    <option value="1.3">1.3x (Heroic Editorial)</option>
                  </select>
                </div>
              </div>

              {/* Weight & Letter Spacing */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Heading Weight</label>
                  <select 
                    value={theme.headingWeight || '600'} 
                    onChange={(e) => handleColorChange('headingWeight', e.target.value)}
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                  >
                    <option value="400">Regular (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi-Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Letter Spacing</label>
                  <select 
                    value={theme.headingLetterSpacing || 'normal'} 
                    onChange={(e) => handleColorChange('headingLetterSpacing', e.target.value)}
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                  >
                    <option value="-0.5px">Tight (-0.5px)</option>
                    <option value="normal">Normal (Default)</option>
                    <option value="0.5px">Subtle (+0.5px)</option>
                    <option value="1.5px">Luxury Wide (+1.5px)</option>
                    <option value="2.5px">High Fashion (+2.5px)</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* WordPress Additional CSS Card */}
          <div className="premium-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={18} className="text-primary" /> Additional Custom CSS (WordPress Style)
            </h3>
            <p style={{ fontSize: '0.83rem', color: 'var(--admin-muted)', marginBottom: '14px' }}>
              Write custom CSS rules to fine-tune spacing, typography, colors, or animations across the entire website.
            </p>
            <div className="form-group">
              <textarea 
                rows="6"
                value={theme.customCss || ''} 
                onChange={(e) => handleColorChange('customCss', e.target.value)}
                placeholder="/* Custom CSS overrides e.g. */&#10;.hero-title { letter-spacing: 1px; }&#10;.btn-primary { border-radius: 20px; }"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.88rem' }}
              />
            </div>
          </div>

        </div>

        {/* Right Col: Live Interactive Component Preview & Typography Sandbox */}
        <div>
          <div className="premium-card" style={{ padding: '28px', position: 'sticky', top: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={18} className="text-primary" /> Live Design &amp; Typography Sandbox
            </h3>

            {/* Active Fonts Inspector Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.74rem', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '20px', fontWeight: 600 }}>
                Heading: {theme.fontSerif ? theme.fontSerif.split(',')[0].replace(/['"]/g, '') : 'Playfair Display'}
              </span>
              <span style={{ fontSize: '0.74rem', background: '#f0fdf4', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontWeight: 600 }}>
                Body: {theme.fontMain ? theme.fontMain.split(',')[0].replace(/['"]/g, '') : 'Plus Jakarta Sans'}
              </span>
              <span style={{ fontSize: '0.74rem', background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '20px', fontWeight: 600 }}>
                Accent: {theme.fontOutfit ? theme.fontOutfit.split(',')[0].replace(/['"]/g, '') : 'Outfit'}
              </span>
            </div>

            {/* Interactive Live Headline Input */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--admin-muted)', marginBottom: '4px' }}>
                Type Test Headline (Updates Live Below):
              </label>
              <input 
                type="text" 
                value={liveTestText} 
                onChange={(e) => setLiveTestText(e.target.value)} 
                placeholder="Type your own headline..."
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '0.9rem' }}
              />
            </div>

            <div 
              style={{
                padding: '24px',
                borderRadius: '12px',
                background: theme.sageBg,
                border: `1px solid ${theme.goldLight || '#e2e8f0'}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', padding: '4px 12px', borderRadius: '20px', background: `${theme.gold}25`, color: theme.gold, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', fontFamily: theme.fontOutfit || theme.fontMain }}>
                <Sparkles size={12} /> CLINICAL SANCTUARY
              </div>

              <h2 style={{ 
                fontFamily: theme.fontSerif, 
                color: theme.darkText, 
                fontSize: '1.75rem', 
                lineHeight: theme.headingLineHeight || 1.25, 
                fontWeight: theme.headingWeight || 600,
                letterSpacing: theme.headingLetterSpacing || 'normal',
                margin: 0 
              }}>
                {liveTestText || 'Science of Ageless Cellular Elegance'}
              </h2>

              <p style={{ fontFamily: theme.fontMain, color: theme.bodyText, fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Bespoke treatments formulated by certified dermatologists and regenerative medicine pioneers. Undetectable results backed by US FDA clearance.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '6px' }}>
                <button 
                  style={{
                    background: theme.emerald,
                    color: '#ffffff',
                    padding: '11px 20px',
                    borderRadius: '6px',
                    border: 'none',
                    fontFamily: theme.fontOutfit || theme.fontMain,
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Book Private Consultation
                </button>

                <button 
                  style={{
                    background: 'transparent',
                    color: theme.darkText,
                    border: `1.5px solid ${theme.emerald}`,
                    padding: '11px 18px',
                    borderRadius: '6px',
                    fontFamily: theme.fontOutfit || theme.fontMain,
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Explore Treatments
                </button>
              </div>

              {/* Sample Mini Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                <div style={{ padding: '12px', background: '#ffffff', borderRadius: '8px', border: `1px solid ${theme.emerald}20` }}>
                  <strong style={{ display: 'block', color: theme.emerald, fontSize: '0.85rem', fontFamily: theme.fontSerif }}>EXION™ MNRF</strong>
                  <span style={{ fontSize: '0.78rem', color: theme.bodyText, fontFamily: theme.fontMain }}>Non-surgical facial remodeling</span>
                </div>
                <div style={{ padding: '12px', background: '#ffffff', borderRadius: '8px', border: `1px solid ${theme.emerald}20` }}>
                  <strong style={{ display: 'block', color: theme.gold, fontSize: '0.85rem', fontFamily: theme.fontSerif }}>NAD+ INFUSIONS</strong>
                  <span style={{ fontSize: '0.78rem', color: theme.bodyText, fontFamily: theme.fontMain }}>Cellular longevity drips</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminThemeSettings;
