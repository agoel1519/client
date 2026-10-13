import React, { useState, useEffect } from 'react';
import { EyeOff, Trash2, Edit } from 'lucide-react';
import './AdminSectionWrapper.css';

const AdminSectionWrapper = ({ children, sectionName, onHide, onDelete, editLink }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('aevora_admin_auth') === 'true');
    // Check if this section is hidden in localStorage
    const hiddenSections = JSON.parse(localStorage.getItem('aevora_hidden_sections') || '{}');
    if (hiddenSections[sectionName]) {
      setIsHidden(true);
    }
  }, [sectionName]);

  const toggleHide = () => {
    const hiddenSections = JSON.parse(localStorage.getItem('aevora_hidden_sections') || '{}');
    if (isHidden) {
      delete hiddenSections[sectionName];
    } else {
      hiddenSections[sectionName] = true;
    }
    localStorage.setItem('aevora_hidden_sections', JSON.stringify(hiddenSections));
    setIsHidden(!isHidden);
    if (onHide) onHide(!isHidden);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete the ${sectionName} section?`)) {
      toggleHide(); // For now, delete just hides it so they don't lose code
      if (onDelete) onDelete();
    }
  };

  if (!isAdmin) {
    return isHidden ? null : <>{children}</>;
  }

  return (
    <div className={`admin-section-wrapper ${isHidden ? 'is-hidden-section' : ''}`}>
      <div className="admin-section-toolbar">
        <span className="section-label">{sectionName}</span>
        <div className="section-actions">
          {editLink && (
            <a href={editLink} target="_blank" rel="noreferrer" className="action-btn" title="Edit in Admin Panel">
              <Edit size={14} />
            </a>
          )}
          <button className="action-btn" onClick={toggleHide} title={isHidden ? "Show Section" : "Hide Section"}>
            <EyeOff size={14} />
          </button>
          <button className="action-btn delete-btn" onClick={handleDelete} title="Delete Section">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="admin-section-content">
        {children}
      </div>
      {isHidden && <div className="hidden-overlay">HIDDEN FROM PUBLIC</div>}
    </div>
  );
};

export default AdminSectionWrapper;
