import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Copy, 
  FileText, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { getAllTreatments, deleteTreatmentPage, saveTreatmentPage, getTreatmentData } from '../../data/treatmentsData';
import './AdminDashboard.css';

const AdminPagesList = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [notification, setNotification] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'FACE / SKIN':
        return 'cat-badge-skin';
      case 'BODY':
      case 'BODY & LASER':
        return 'cat-badge-body';
      case 'IV THERAPY':
        return 'cat-badge-iv';
      case 'HAIR':
        return 'cat-badge-hair';
      case 'AESTHETIC GYNAECOLOGY':
        return 'cat-badge-gynae';
      default:
        return 'cat-badge-default';
    }
  };

  const loadPages = () => {
    const list = getAllTreatments();
    setPages(list);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (item) => {
    const success = deleteTreatmentPage(item.slug);
    if (success) {
      showToast(`Page "${item.name}" has been ${item.isCustom ? 'deleted' : 'reset to default'}!`);
      loadPages();
    } else {
      showToast(`Failed to delete page.`, 'error');
    }
    setDeleteConfirm(null);
  };

  const handleDuplicate = (item) => {
    const originalData = getTreatmentData(item.slug);
    if (!originalData) return;
    
    const newSlug = `${item.slug}-copy-${Date.now().toString().slice(-4)}`;
    const newData = {
      ...originalData,
      title: `${originalData.title} (Copy)`,
      breadcrumb: originalData.breadcrumb ? `${originalData.breadcrumb} (Copy)` : '',
      slug: newSlug
    };
    
    saveTreatmentPage(newSlug, newData);
    showToast(`Duplicated "${item.name}" as "${newSlug}"!`);
    loadPages();
    navigate(`/admin/pages/edit/${newSlug}`);
  };

  const categories = ['ALL', 'FACE / SKIN', 'BODY', 'IV THERAPY', 'HAIR', 'AESTHETIC GYNAECOLOGY', 'CUSTOM'];

  const filteredPages = pages.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' 
      ? true 
      : selectedCategory === 'CUSTOM' 
        ? item.isCustom 
        : item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const customCount = pages.filter(p => p.isCustomized).length;

  return (
    <div className="admin-content">
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          background: notification.type === 'error' ? '#ef4444' : 'var(--admin-primary)',
          color: '#fff',
          padding: '14px 24px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 600,
          animation: 'fadeIn 0.3s ease'
        }}>
          <CheckCircle2 size={18} />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '450px',
            width: '90%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', marginBottom: '16px' }}>
              <AlertTriangle size={28} />
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Confirm Deletion</h3>
            </div>
            <p style={{ color: 'var(--admin-text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
              Are you sure you want to {deleteConfirm.isCustom ? 'permanently delete' : 'reset'} the page for <strong>{deleteConfirm.name}</strong> ({deleteConfirm.url})?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn" 
                style={{ background: '#ef4444', color: '#fff' }}
                onClick={() => handleDelete(deleteConfirm)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>Treatment Pages Manager</h1>
          <p style={{ margin: '6px 0 0 0', color: 'var(--admin-text-muted)', fontSize: '0.95rem' }}>
            Manage, customize, create, and delete pages for every treatment in the Aevora ecosystem.
          </p>
        </div>
        <div className="page-actions">
          <Link to="/admin/pages/create" className="btn btn-primary">
            <Plus size={18} /> Create New Page
          </Link>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div style={{ background: '#fff', padding: '12px 20px', borderRadius: '10px', border: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={18} color="var(--admin-primary)" />
          <span style={{ fontSize: '0.88rem', color: 'var(--admin-text-muted)' }}>Total Pages:</span>
          <strong style={{ fontSize: '1rem', color: 'var(--admin-text-dark)' }}>{pages.length}</strong>
        </div>

        <div style={{ background: '#fff', padding: '12px 20px', borderRadius: '10px', border: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} color="var(--admin-accent)" />
          <span style={{ fontSize: '0.88rem', color: 'var(--admin-text-muted)' }}>Custom / Edited Pages:</span>
          <strong style={{ fontSize: '1rem', color: 'var(--admin-text-dark)' }}>{customCount}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: '280px', flexGrow: 1, maxWidth: '420px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} />
            <input 
              type="text" 
              placeholder="Search by treatment name or slug..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '42px' }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedCategory === cat ? '1px solid var(--admin-primary)' : '1px solid var(--admin-border)',
                  background: selectedCategory === cat ? 'var(--admin-primary)' : '#fff',
                  color: selectedCategory === cat ? '#fff' : 'var(--admin-text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pages Table */}
      <div className="card-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 20px', fontWeight: 600 }}>TREATMENT NAME</th>
                <th style={{ padding: '16px 20px', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '16px 20px', fontWeight: 600 }}>URL SLUG</th>
                <th style={{ padding: '16px 20px', fontWeight: 600 }}>STATUS</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                    No treatment pages found matching "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredPages.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--admin-border)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <strong style={{ display: 'block', color: 'var(--admin-text-dark)', fontSize: '0.95rem' }}>
                        {item.name}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)' }}>
                        {item.isCustom ? 'Custom created page' : 'Official catalog procedure'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span className={`category-badge ${getCategoryBadgeClass(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span className="slug-tag">
                        {item.url}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {item.isCustomized ? (
                        <span className="status-live-pill" style={{ background: '#fef3c7', color: '#92400e', borderColor: 'rgba(217, 119, 6, 0.3)' }}>
                          <span className="live-dot-pulse" style={{ background: '#d97706' }}></span>
                          Custom Edits Live
                        </span>
                      ) : (
                        <span className="status-live-pill">
                          <span className="live-dot-pulse"></span>
                          Live &bull; Published
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        {/* View Live */}
                        <Link 
                          to={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-remove" 
                          title="View Live Page"
                          style={{ color: 'var(--admin-text-muted)' }}
                        >
                          <ExternalLink size={16} />
                        </Link>

                        {/* Edit */}
                        <Link 
                          to={`/admin/pages/edit/${item.slug}`} 
                          className="btn-remove" 
                          title="Edit Page & Sections"
                          style={{ color: 'var(--admin-primary)' }}
                        >
                          <Edit3 size={16} />
                        </Link>

                        {/* Duplicate */}
                        <button 
                          className="btn-remove" 
                          onClick={() => handleDuplicate(item)} 
                          title="Duplicate Page"
                          style={{ color: 'var(--admin-accent)' }}
                        >
                          <Copy size={16} />
                        </button>

                        {/* Delete / Reset */}
                        <button 
                          className="btn-remove" 
                          onClick={() => setDeleteConfirm(item)} 
                          title={item.isCustom ? "Delete Custom Page" : "Reset Customizations"}
                          style={{ color: '#ef4444' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPagesList;
