import React from 'react';
import { Palette, Save } from 'lucide-react';
import './AdminDashboard.css';

const AdminThemeSettings = () => {
  return (
    <div className="premium-page-manager">
      <div className="page-manager-header">
        <div className="header-titles">
          <h1>Design & Typography Settings</h1>
          <p>Configure global fonts, colors, and layout spacing.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <Save size={18} />
            <span>Save Theme</span>
          </button>
        </div>
      </div>

      <div className="premium-card" style={{ padding: '32px' }}>
        <div className="empty-state">
          <Palette size={48} className="text-primary mb-4" />
          <h3>Global Theme Editor</h3>
          <p className="text-muted text-center" style={{ maxWidth: '400px', margin: '16px auto' }}>
            The new premium theme editor is under construction. It will allow you to edit global color palettes, Google Fonts, and spacing tokens without touching code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminThemeSettings;
