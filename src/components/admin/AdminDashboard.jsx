import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  ExternalLink, 
  Search, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Layers,
  Copy,
  Database,
  Phone,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllTreatments } from '../../data/treatmentsData';
import { getDbAppointments } from '../../api/mongoApi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const allTreatments = getAllTreatments();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch live patient consultation appointments from backend MongoDB
    getDbAppointments().then(data => {
      if (data && Array.isArray(data)) {
        setAppointments(data);
      }
    });
  }, []);

  const filteredTreatments = allTreatments.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['ALL', 'FACE / SKIN', 'BODY', 'IV THERAPY', 'HAIR', 'AESTHETIC GYNAECOLOGY'];

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

  const copyToClipboard = (url, slug) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="admin-content">
      {/* Luxury Stats Metric Cards Grid */}
      <div className="dashboard-stats-grid">
        
        {/* Card 1: Active URLs */}
        <div className="stat-card stat-card-emerald">
          <div className="stat-card-top">
            <div className="stat-icon-box icon-emerald">
              <FileText size={22} />
            </div>
            <span className="stat-trend trend-positive">
              <Activity size={13} /> 100% Synced
            </span>
          </div>
          <div className="stat-card-bottom">
            <span className="adm-stat-label">Active Treatment URLs</span>
            <div className="stat-value-row">
              <h3 className="adm-stat-value">{allTreatments.length}</h3>
              <span className="stat-subtag">All Live</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Visitors */}
        <div className="stat-card stat-card-gold">
          <div className="stat-card-top">
            <div className="stat-icon-box icon-gold">
              <Users size={22} />
            </div>
            <span className="stat-trend trend-positive">
              <ArrowUpRight size={13} /> +18.4% this mo
            </span>
          </div>
          <div className="stat-card-bottom">
            <span className="adm-stat-label">Total Unique Visitors</span>
            <div className="stat-value-row">
              <h3 className="adm-stat-value">8,432</h3>
              <span className="stat-subtag">High Intent</span>
            </div>
          </div>
        </div>

        {/* Card 3: Consultations */}
        <div className="stat-card stat-card-blue">
          <div className="stat-card-top">
            <div className="stat-icon-box icon-blue">
              <Calendar size={22} />
            </div>
            <span className="stat-trend trend-blue">
              <ShieldCheck size={13} /> 98% Confirmed
            </span>
          </div>
          <div className="stat-card-bottom">
            <span className="adm-stat-label">Consultations Booked</span>
            <div className="stat-value-row">
              <h3 className="adm-stat-value">145</h3>
              <span className="stat-subtag">This Month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Conversion Rate */}
        <div className="stat-card stat-card-purple">
          <div className="stat-card-top">
            <div className="stat-icon-box icon-purple">
              <TrendingUp size={22} />
            </div>
            <span className="stat-trend trend-positive">
              <Sparkles size={13} /> Top 5% Tier
            </span>
          </div>
          <div className="stat-card-bottom">
            <span className="adm-stat-label">Visitor Conversion Rate</span>
            <div className="stat-value-row">
              <h3 className="adm-stat-value">4.2%</h3>
              <span className="stat-subtag">Industry High</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Treatments Data Panel */}
      <div className="card-panel luxury-table-panel">
        <div className="panel-header-row">
          <div>
            <div className="table-title-row">
              <h3 className="panel-title">Clinical Treatment Pages Directory</h3>
              <span className="live-counter-pill">{filteredTreatments.length} Available</span>
            </div>
            <p className="panel-desc-clean">
              All submenu procedures have dedicated live URLs. Click "Edit" to modify or "View Live" to preview on website.
            </p>
          </div>

          {/* Search Box */}
          <div className="table-search-box">
            <Search size={16} className="search-icon-inside" />
            <input 
              type="text" 
              placeholder="Search by treatment or slug..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="table-search-input"
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')}>&times;</button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="category-capsules-row">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`cat-capsule ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="luxury-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>TREATMENT PROCEDURE</th>
                <th style={{ width: '22%' }}>CATEGORY</th>
                <th style={{ width: '24%' }}>URL SLUG</th>
                <th style={{ width: '12%' }}>STATUS</th>
                <th style={{ width: '14%', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTreatments.slice(0, 35).map((item, idx) => (
                <tr key={idx} className="table-hover-row">
                  {/* Name */}
                  <td>
                    <div className="treatment-name-cell">
                      <div>
                        <strong className="treatment-title-text">{item.name}</strong>
                        <span className="treatment-sub-text">
                          {item.isCustom ? 'Custom Admin Page' : 'Clinical Medical Protocol'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className={`category-badge ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>
                  </td>

                  {/* URL Slug with click-to-copy */}
                  <td>
                    <div className="slug-cell" onClick={() => copyToClipboard(item.url, item.slug)} title="Click to copy URL">
                      <span className="slug-tag">{item.url}</span>
                      <Copy size={13} className="slug-copy-icon" />
                      {copiedSlug === item.slug && <span className="copied-tooltip">Copied!</span>}
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <span className="status-live-pill">
                      <span className="live-dot-pulse"></span>
                      Live &bull; Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group">
                      <Link 
                        to={`/admin/pages/edit/${item.slug}`} 
                        className="btn-action-edit"
                        title="Edit Page Content"
                      >
                        <Edit3 size={14} /> Edit
                      </Link>

                      <Link 
                        to={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-action-view"
                        title="Open Live Website Page"
                      >
                        <ExternalLink size={14} /> View Live
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTreatments.length > 35 && (
            <div className="table-footer-notice">
              <span>Showing 35 of {filteredTreatments.length} treatments. Use category filter or search above to view others.</span>
              <Link to="/admin/pages" className="link-view-all">Open Full Pages Directory &rarr;</Link>
            </div>
          )}
        </div>
      </div>

      {/* Patient Consultation Leads from MongoDB Atlas */}
      <div className="card-panel luxury-table-panel" style={{ marginTop: '32px' }}>
        <div className="panel-header-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Calendar size={16} color="var(--admin-accent)" />
              <h2 className="panel-title" style={{ margin: 0 }}>Recent Patient Consultations</h2>
            </div>
            <p className="panel-subtitle">Real-time consultation booking requests submitted through treatment pages</p>
          </div>
          <span className="badge-count-pill" style={{ background: '#dcfce7', color: '#15803d' }}>
            {appointments.length} Inquiries Logged
          </span>
        </div>

        <div className="table-wrapper">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Contact Info</th>
                <th>Requested Treatment</th>
                <th>Date & Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--admin-text-muted)' }}>
                    No bookings logged yet. Appointments submitted through treatment pages appear here.
                  </td>
                </tr>
              ) : (
                appointments.map((lead) => (
                  <tr key={lead._id || lead.phone}>
                    <td>
                      <strong style={{ color: 'var(--admin-primary)', fontSize: '0.92rem' }}>{lead.name}</strong>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.8rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {lead.phone}</span>
                        {lead.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--admin-text-muted)' }}><Mail size={12} /> {lead.email}</span>}
                      </div>
                    </td>
                    <td>
                      <span className="cat-badge cat-badge-skin">{lead.treatment}</span>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {lead.preferredDate ? `${lead.preferredDate} • ${lead.preferredTime || 'Flexible'}` : 'ASAP / Flexible'}
                    </td>
                    <td>
                      <span className="status-live-pill" style={{ background: lead.status === 'confirmed' ? '#dcfce7' : '#fef3c7', color: lead.status === 'confirmed' ? '#15803d' : '#b45309' }}>
                        {lead.status === 'confirmed' ? 'Confirmed' : 'New Lead'}
                      </span>
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

export default AdminDashboard;
