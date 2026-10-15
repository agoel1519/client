import React, { useState } from 'react';
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
  Megaphone
} from 'lucide-react';
import './AdminLayout.css';
import AdminLogin from './AdminLogin';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('aevora_admin_auth') === 'true'
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pagesMenuOpen, setPagesMenuOpen] = useState(false);

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
                    Blog
                  </NavLink>
                </div>
              )}
              <NavLink to="/admin/media" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <ImageIcon size={20} />
                {sidebarOpen && <span>Media Library</span>}
              </NavLink>
            </div>

            <div className="nav-group">
              {sidebarOpen && <span className="nav-label">Design & Layout</span>}
              <NavLink to="/admin/visual-editor" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <MonitorPlay size={20} />
                {sidebarOpen && <span>Visual Editor</span>}
              </NavLink>
              <NavLink to="/admin/theme" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Palette size={20} />
                {sidebarOpen && <span>Design & Typography</span>}
              </NavLink>
              <NavLink to="/admin/header-settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <LayoutTemplate size={20} />
                {sidebarOpen && <span>Header & Footer</span>}
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
                {sidebarOpen && <span>Global Settings</span>}
              </NavLink>
              <NavLink to="/admin/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Users size={20} />
                {sidebarOpen && <span>Users & Roles</span>}
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

        {/* Content Area */}
        <div className="workspace-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
