import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Files, 
  Palette, 
  Settings, 
  LogOut, 
  ExternalLink,
  Image as ImageIcon,
  Users,
  Menu,
  ChevronDown,
  LayoutTemplate,
  MonitorPlay,
  Search,
  Bell,
  Megaphone,
  BookOpen,
  Images,
  Database,
  RefreshCw,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { API_BASE } from '../../config/api';
import './AdminLayout.css';
import AdminLogin from './AdminLogin';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('aevora_admin_auth') === 'true'
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pagesMenuOpen, setPagesMenuOpen] = useState(false);
  const [dbState, setDbState] = useState({
    connected: false,
    loading: true,
    host: '',
    error: null,
    actionRequired: null
  });
  const [dismissBanner, setDismissBanner] = useState(false);

  const fetchDbHealth = async (reconnect = false) => {
    setDbState(prev => ({ ...prev, loading: true }));
    try {
      const url = `${API_BASE}/health${reconnect ? '?reconnect=true' : ''}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      const json = await res.json();
      const isConn = json?.database?.connected === true;
      setDbState({
        connected: isConn,
        loading: false,
        host: json?.database?.host || 'MongoDB Atlas',
        error: json?.database?.lastError || null,
        actionRequired: json?.database?.actionRequired || null
      });
    } catch (err) {
      setDbState({
        connected: false,
        loading: false,
        host: 'Backend Offline',
        error: err.message,
        actionRequired: 'Backend server is not responding'
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDbHealth();
      const interval = setInterval(() => fetchDbHealth(), 20000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('aevora_admin_auth');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`premium-admin-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <aside className="premium-sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">
            <span className="brand-icon">A</span>
            {sidebarOpen && <span className="brand-text">Aevora CMS</span>}
          </div>
        </div>

        <div className="sidebar-scrollable">
          <nav className="premium-nav">
            <div className="nav-group">
              {sidebarOpen && <span className="nav-label">Overview</span>}
              <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={20} />
                {sidebarOpen && <span>Dashboard</span>}
              </NavLink>
            </div>

            <div className="nav-group">
              {sidebarOpen && <span className="nav-label">Content</span>}
              
              <div 
                className={`nav-item has-submenu ${pagesMenuOpen ? 'submenu-open' : ''}`}
                onClick={() => {
                  if (!sidebarOpen) setSidebarOpen(true);
                  setPagesMenuOpen(!pagesMenuOpen);
                }}
              >
                <Files size={20} />
                {sidebarOpen && (
                  <>
                    <span style={{ flex: 1 }}>Pages</span>
                    <ChevronDown size={16} className="submenu-arrow" />
                  </>
                )}
              </div>
              
              {sidebarOpen && pagesMenuOpen && (
                <div className="submenu-list">
                  <NavLink to="/admin/pages" end className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}>
                    All Custom Pages
                  </NavLink>
                  <NavLink to="/admin/home-settings" className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}>
                    Home Page
                  </NavLink>
                  <NavLink to="/admin/about-settings" className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}>
                    About Us
                  </NavLink>
                  <NavLink to="/admin/experts-settings" className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}>
                    Experts
                  </NavLink>
                  <NavLink to="/admin/press-settings" className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}>
                    Press & Media
                  </NavLink>
                  <NavLink to="/admin/blog-settings" className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}>
                    Blog & Journal
                  </NavLink>
                  <NavLink to="/admin/gallery-settings" className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}>
                    Gallery
                  </NavLink>
                  <NavLink to="/admin/settings" className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}>
                    Contact & Clinic
                  </NavLink>
                </div>
              )}
              <NavLink to="/admin/blog-settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <BookOpen size={20} />
                {sidebarOpen && <span>Blog / Journal CMS</span>}
              </NavLink>

              <NavLink to="/admin/gallery-settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Images size={20} />
                {sidebarOpen && <span>Gallery CMS</span>}
              </NavLink>

              <NavLink to="/admin/media" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <ImageIcon size={20} />
                {sidebarOpen && <span>Media Library</span>}
              </NavLink>
            </div>

            <div className="nav-group">
              {sidebarOpen && <span className="nav-label">Design & Layout</span>}
              <NavLink to="/admin/home-settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <MonitorPlay size={20} />
                {sidebarOpen && <span>Homepage CMS</span>}
              </NavLink>
              <NavLink to="/admin/header-settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <LayoutTemplate size={20} />
                {sidebarOpen && <span>Header Navigation</span>}
              </NavLink>
              <NavLink to="/admin/footer-settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <LayoutTemplate size={20} />
                {sidebarOpen && <span>Footer Settings</span>}
              </NavLink>
              <NavLink to="/admin/theme" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Palette size={20} />
                {sidebarOpen && <span>Theme &amp; Typography</span>}
              </NavLink>
              <NavLink to="/admin/popup-settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Megaphone size={20} />
                {sidebarOpen && <span>Promo Popup</span>}
              </NavLink>
            </div>

            <div className="nav-group">
              {sidebarOpen && <span className="nav-label">Configuration</span>}
              <NavLink to="/admin/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Settings size={20} />
                {sidebarOpen && <span>Clinic &amp; Contact Info</span>}
              </NavLink>
            </div>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="collapse-btn" onClick={toggleSidebar}>
            <Menu size={20} />
            {sidebarOpen && <span>Collapse Menu</span>}
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="premium-workspace">
        {/* Top Navbar */}
        <header className="premium-topbar">
          <div className="topbar-left">
            <div className="global-search">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search pages, settings..." />
            </div>
          </div>

          <div className="topbar-right">
            {/* MongoDB Cloud Live Connection Indicator */}
            <div 
              className={`db-connection-pill ${dbState.connected ? 'is-connected' : 'is-disconnected'}`}
              title={dbState.connected ? `Connected to ${dbState.host}. Changes saved to MongoDB Atlas permanently.` : `Database offline: ${dbState.error || 'Changes will revert when server sleeps'}`}
            >
              <Database size={14} className="pill-db-icon" />
              <span className="pill-dot"></span>
              <span className="pill-label">
                {dbState.loading ? 'Checking DB...' : dbState.connected ? 'MongoDB Atlas Active' : 'DB Offline (Fallback)'}
              </span>
              <button 
                className={`pill-refresh-btn ${dbState.loading ? 'spinning' : ''}`}
                onClick={() => fetchDbHealth(true)}
                title="Refresh / Reconnect to MongoDB"
              >
                <RefreshCw size={12} />
              </button>
            </div>

            <Link to="/" target="_blank" className="view-live-btn">
              <ExternalLink size={16} />
              <span>View Live Website</span>
            </Link>
            
            <div className="topbar-actions">
              <button className="icon-btn">
                <Bell size={20} />
              </button>
            </div>

            <div className="user-profile-dropdown">
              <div className="avatar">AD</div>
              <div className="user-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">Super Admin</span>
              </div>
              <ChevronDown size={16} className="dropdown-arrow" />
              
              <div className="dropdown-menu">
                <button onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Offline Warning Banner if MongoDB is disconnected */}
        {!dbState.connected && !dbState.loading && !dismissBanner && (
          <div className="admin-mongo-warning-banner">
            <div className="warning-content">
              <AlertTriangle size={18} className="warning-icon" />
              <div className="warning-text">
                <strong>Live Database Disconnected (Local Fallback Active):</strong> Edits are currently stored in temporary memory. On Render free tier, content reverts after ~15-20 minutes when the server sleeps.
                <div className="warning-steps">
                  <span>To fix permanently: Open <strong>MongoDB Atlas &gt; Network Access &gt; Add IP: <code>0.0.0.0/0</code></strong> (Allow Access from Anywhere).</span>
                </div>
              </div>
            </div>
            <div className="warning-actions">
              <button className="btn-reconnect-now" onClick={() => fetchDbHealth(true)}>
                <RefreshCw size={13} />
                <span>Retry Now</span>
              </button>
              <button className="btn-dismiss-banner" onClick={() => setDismissBanner(true)}>
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="workspace-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
