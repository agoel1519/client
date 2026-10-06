import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle,
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Layers,
  LogOut
} from 'lucide-react';
import './AdminLayout.css';
import AdminLogin from './AdminLogin';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('aevora_admin_auth') === 'true'
  );
  
  // Check if current path is a settings path to auto-open menu
  const isSettingsActive = ['/admin/settings', '/admin/about-settings', '/admin/experts-settings', '/admin/press-settings', '/admin/blog-settings', '/admin/home-settings'].includes(location.pathname);
  
  const [isPagesOpen, setIsPagesOpen] = useState(isSettingsActive);

  const handleLogout = () => {
    localStorage.removeItem('aevora_admin_auth');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="admin-layout">
      {/* Sleek Luxury Emerald Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>AEVORA</h2>
          <span className="brand-badge">ADMIN PORTAL</span>
        </div>

        <div className="sidebar-divider" />

        <nav className="admin-nav">
          <div className="nav-section-label">MAIN NAVIGATION</div>

          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/pages" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <FileText size={19} />
            <span>Treatment Pages</span>
            <span className="nav-counter-pill">70 Live</span>
          </NavLink>

          <NavLink to="/admin/pages/create" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <PlusCircle size={19} />
            <span>Create Page</span>
            <span className="nav-new-pill">New</span>
          </NavLink>

          <div className="nav-section-label" style={{ marginTop: '16px' }}>MANAGEMENT</div>

          <a href="#" onClick={(e) => { e.preventDefault(); alert("Media Library will show all uploaded clinical before/after images."); }} className="admin-nav-item">
            <ImageIcon size={19} />
            <span>Media Library</span>
          </a>

          {/* PAGE SETTINGS SUBMENU */}
          <div className={`admin-nav-item ${isPagesOpen ? 'submenu-open' : ''} ${!isPagesOpen && isSettingsActive ? 'active' : ''}`} onClick={() => setIsPagesOpen(!isPagesOpen)} style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Layers size={19} />
              <span>Page Settings</span>
            </div>
            <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: isPagesOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
          </div>

          {isPagesOpen && (
            <div className="admin-submenu">
              <NavLink to="/admin/home-settings" className={({ isActive }) => `admin-submenu-item ${isActive ? 'active' : ''}`}>
                <span>Home Page</span>
              </NavLink>

              <NavLink to="/admin/settings" className={({ isActive }) => `admin-submenu-item ${isActive ? 'active' : ''}`}>
                <span>Contact Us</span>
              </NavLink>

              <NavLink to="/admin/about-settings" className={({ isActive }) => `admin-submenu-item ${isActive ? 'active' : ''}`}>
                <span>About Us</span>
              </NavLink>

              <NavLink to="/admin/experts-settings" className={({ isActive }) => `admin-submenu-item ${isActive ? 'active' : ''}`}>
                <span>Experts</span>
              </NavLink>

              <NavLink to="/admin/press-settings" className={({ isActive }) => `admin-submenu-item ${isActive ? 'active' : ''}`}>
                <span>Press & Media</span>
              </NavLink>

              <NavLink to="/admin/blog-settings" className={({ isActive }) => `admin-submenu-item ${isActive ? 'active' : ''}`}>
                <span>Blog Journal</span>
              </NavLink>
            </div>
          )}
        </nav>

        {/* Sidebar Footer with Live Status & Exit */}
        <div className="admin-nav-bottom">
          <div className="clinic-status-box">
            <div className="pulse-indicator">
              <span className="pulse-dot"></span>
              <span className="pulse-text">System Live</span>
            </div>
          </div>

          <Link to="/" target="_blank" className="admin-nav-item exit-btn">
            <ExternalLink size={18} />
            <span>View Public Site</span>
          </Link>

          <button onClick={handleLogout} className="admin-nav-item logout-btn">
            <LogOut size={18} />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="admin-main">
        {/* Topbar with Frosted Luxury Finish */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <div className="topbar-search">
              <Search size={16} className="text-muted" />
              <input type="text" placeholder="Search treatments, pages, or sections..." />
              <span className="search-shortcut">⌘K</span>
            </div>
          </div>

          <div className="topbar-actions">
            <Link to="/" target="_blank" className="btn-topbar-link">
              <ExternalLink size={15} />
              <span>Live Website</span>
            </Link>

            <button className="icon-btn" title="Notifications" onClick={() => alert("All 70 treatment URLs are live and synchronized.")}>
              <Bell size={19} />
              <span className="notification-dot"></span>
            </button>
          </div>
        </header>
        
        {/* Nested Routes */}
        <div className="admin-body-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
