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
  AlertTriangle,
  MonitorPlay
} from 'lucide-react';
import { getAllTreatments, deleteTreatmentPage, saveTreatmentPage, getTreatmentData } from '../../data/treatmentsData';
import './AdminPagesList.css';

const AdminPagesList = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [notification, setNotification] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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
    showToast(`Duplicated "${item.name}" successfully!`);
    loadPages();
  };

  const categories = ['ALL', 'CUSTOM'];

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
    <div className="premium-page-manager">
      {/* Toast Notification */}
      {notification && (
        <div className={`premium-toast ${notification.type}`}>
          {notification.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="premium-modal-overlay">
          <div className="premium-modal">
            <div className="modal-header">
              <AlertTriangle size={24} className="text-danger" />
              <h3>Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to {deleteConfirm.isCustom ? 'permanently delete' : 'reset'} the page for <strong>{deleteConfirm.name}</strong>?
              </p>
              <p className="text-muted text-sm">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteConfirm)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="page-manager-header">
        <div className="header-titles">
          <h1>Website Pages</h1>
          <p>Manage, create, and organize your website's content and structure.</p>
        </div>
        <div className="header-actions">
          <Link to="/admin/pages/create" className="btn-primary">
            <Plus size={18} />
            <span>Create New Page</span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="page-stats-row">
        <div className="stat-card-mini">
          <div className="stat-icon bg-blue-light text-blue">
            <FileText size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{pages.length}</span>
            <span className="stat-label">Total Pages</span>
          </div>
        </div>
        
        <div className="stat-card-mini">
          <div className="stat-icon bg-amber-light text-amber">
            <MonitorPlay size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{customCount}</span>
            <span className="stat-label">Customized / Edited</span>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="premium-card">
        {/* Toolbar: Search and Filters */}
        <div className="card-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search pages by name or URL..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-pills">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Page Name</th>
                <th>Category</th>
                <th>URL Slug</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state-cell">
                    <div className="empty-state">
                      <FileText size={32} className="text-muted" />
                      <h4>No pages found</h4>
                      <p>Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPages.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="page-name-cell">
                        <strong>{item.name}</strong>
                        <span>{item.isCustom ? 'Custom Layout' : 'Standard Layout'}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{item.category}</span>
                    </td>
                    <td>
                      <span className="code-text">{item.url}</span>
                    </td>
                    <td>
                      {item.isCustomized ? (
                        <span className="badge badge-warning">
                          <span className="dot"></span> Modified
                        </span>
                      ) : (
                        <span className="badge badge-success">
                          <span className="dot"></span> Published
                        </span>
                      )}
                    </td>
                    <td className="actions-cell text-right">
                      <div className="action-buttons">
                        <Link to={item.url} target="_blank" className="action-icon-btn" title="View Live">
                          <ExternalLink size={16} />
                        </Link>
                        <Link to={`/admin/visual-editor?page=${item.slug}`} className="action-icon-btn text-primary" title="Visual Editor">
                          <MonitorPlay size={16} />
                        </Link>
                        <Link to={`/admin/pages/edit/${item.slug}`} className="action-icon-btn text-blue" title="Edit Settings">
                          <Edit3 size={16} />
                        </Link>
                        <button onClick={() => handleDuplicate(item)} className="action-icon-btn text-amber" title="Duplicate">
                          <Copy size={16} />
                        </button>
                        <button onClick={() => setDeleteConfirm(item)} className="action-icon-btn text-danger" title="Delete">
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
