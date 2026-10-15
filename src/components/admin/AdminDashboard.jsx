import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Clock, 
  Plus, 
  LayoutTemplate,
  MonitorPlay,
  ArrowRight,
  Sparkles,
  Megaphone
} from 'lucide-react';
import { getDbPages, getDbMedia } from '../../api/mongoApi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    mediaAssets: 0
  });
  
  const [recentPages, setRecentPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pagesRes, mediaRes] = await Promise.all([
          getDbPages(),
          getDbMedia()
        ]);
        
        const pages = pagesRes.data || [];
        const published = pages.filter(p => p.status === 'Live').length;
        
        setStats({
          totalPages: pages.length,
          publishedPages: published,
          draftPages: pages.length - published,
          mediaAssets: mediaRes.data?.length || 0
        });

        // Mock recent activity for now, taking latest 5 pages
        setRecentPages(pages.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome Back</h1>
        <p>Here's what's happening with your website today.</p>
      </div>

      {loading ? (
        <div className="dashboard-loading">Loading your workspace...</div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper blue">
                <FileText size={24} />
              </div>
              <div className="stat-details">
                <span className="stat-label">Total Pages</span>
                <span className="stat-value">{stats.totalPages}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-wrapper green">
                <CheckCircle2 size={24} />
              </div>
              <div className="stat-details">
                <span className="stat-label">Published</span>
                <span className="stat-value">{stats.publishedPages}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-wrapper amber">
                <Clock size={24} />
              </div>
              <div className="stat-details">
                <span className="stat-label">Drafts</span>
                <span className="stat-value">{stats.draftPages}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-wrapper purple">
                <ImageIcon size={24} />
              </div>
              <div className="stat-details">
                <span className="stat-label">Media Assets</span>
                <span className="stat-value">{stats.mediaAssets}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-two-col">
            {/* Quick Actions */}
            <div className="dashboard-card quick-actions-card">
              <div className="card-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="card-body">
                <div className="action-grid">
                  <Link to="/admin/home-settings" className="action-btn">
                    <div className="action-icon"><MonitorPlay size={20} /></div>
                    <div className="action-text">
                      <strong>Home Page CMS</strong>
                      <span>Edit all 11 homepage sections</span>
                    </div>
                  </Link>
                  <Link to="/admin/pages" className="action-btn">
                    <div className="action-icon"><FileText size={20} /></div>
                    <div className="action-text">
                      <strong>Treatments &amp; Pages</strong>
                      <span>Manage and create treatment pages</span>
                    </div>
                  </Link>
                  <Link to="/admin/about-settings" className="action-btn">
                    <div className="action-icon"><Sparkles size={20} /></div>
                    <div className="action-text">
                      <strong>About Us CMS</strong>
                      <span>Philosophy, team, gallery &amp; hero</span>
                    </div>
                  </Link>
                  <Link to="/admin/experts-settings" className="action-btn">
                    <div className="action-icon"><CheckCircle2 size={20} /></div>
                    <div className="action-text">
                      <strong>Specialist Experts</strong>
                      <span>Edit doctor credentials &amp; profiles</span>
                    </div>
                  </Link>
                  <Link to="/admin/press-settings" className="action-btn">
                    <div className="action-icon"><LayoutTemplate size={20} /></div>
                    <div className="action-text">
                      <strong>Press &amp; Media</strong>
                      <span>Vogue, Elle &amp; Grazia spotlights</span>
                    </div>
                  </Link>
                  <Link to="/admin/blog-settings" className="action-btn">
                    <div className="action-icon"><FileText size={20} /></div>
                    <div className="action-text">
                      <strong>Blog &amp; Journal</strong>
                      <span>Publish and manage articles</span>
                    </div>
                  </Link>
                  <Link to="/admin/header-settings" className="action-btn">
                    <div className="action-icon"><LayoutTemplate size={20} /></div>
                    <div className="action-text">
                      <strong>Header Navigation</strong>
                      <span>Edit logo, menu items &amp; buttons</span>
                    </div>
                  </Link>
                  <Link to="/admin/footer-settings" className="action-btn">
                    <div className="action-icon"><LayoutTemplate size={20} /></div>
                    <div className="action-text">
                      <strong>Footer Settings</strong>
                      <span>Links, columns, copyright &amp; socials</span>
                    </div>
                  </Link>
                  <Link to="/admin/theme" className="action-btn">
                    <div className="action-icon"><Plus size={20} /></div>
                    <div className="action-text">
                      <strong>Theme &amp; Typography</strong>
                      <span>Customize palette &amp; Google fonts</span>
                    </div>
                  </Link>
                  <Link to="/admin/settings" className="action-btn">
                    <div className="action-icon"><Clock size={20} /></div>
                    <div className="action-text">
                      <strong>Clinic &amp; Contact</strong>
                      <span>Address, hours, phone &amp; maps</span>
                    </div>
                  </Link>
                  <Link to="/admin/media" className="action-btn">
                    <div className="action-icon"><ImageIcon size={20} /></div>
                    <div className="action-text">
                      <strong>Media Library</strong>
                      <span>Browse and upload images</span>
                    </div>
                  </Link>
                  <Link to="/admin/popup-settings" className="action-btn">
                    <div className="action-icon"><Megaphone size={20} /></div>
                    <div className="action-text">
                      <strong>Promo Popup</strong>
                      <span>Single or multi-image banner</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card recent-activity-card">
              <div className="card-header flex-between">
                <h2>Recently Edited Pages</h2>
                <Link to="/admin/pages" className="view-all-link">View All</Link>
              </div>
              <div className="card-body">
                {recentPages.length === 0 ? (
                  <div className="empty-state">No recent pages found.</div>
                ) : (
                  <ul className="recent-list">
                    {recentPages.map((page, i) => (
                      <li key={i} className="recent-list-item">
                        <div className="recent-item-info">
                          <FileText size={16} className="item-icon" />
                          <div>
                            <strong>{page.name || page.title}</strong>
                            <span>{page.slug}</span>
                          </div>
                        </div>
                        <div className="recent-item-meta">
                          <span className={`status-badge ${page.status === 'Live' ? 'live' : 'draft'}`}>
                            {page.status}
                          </span>
                          <Link to={`/admin/visual-editor?page=${page.slug}`} className="edit-link">
                            Edit <ArrowRight size={14} />
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
