import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  ChevronDown, 
  Clock, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { slugify, allServicesList } from '../data/treatmentsData';
import { getDbSetting } from '../api/mongoApi';
import './Header.css';

export const defaultMegaMenuItems = allServicesList.map((t, idx) => ({
  id: `t-${idx + 1}`,
  label: t.name,
  url: `/treatments/${t.slug}`
}));

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Mobile accordion state for expandable menus
  const [mobileAccordions, setMobileAccordions] = useState({
    about: false,
    treatments: false,
    programs: false,
    media: false
  });

  const [headerSettings, setHeaderSettings] = useState({
    locationText: "SCO 205 FF, Sector 5, Panchkula – 134114",
    timingsText: "Mon - Sat: 10:00 AM - 8:00 PM",
    phoneText: "+91 97797 66933",
    badgeText: "Aevora Clinics",
    ctaText: "Book Appointment",
    ctaUrl: "tel:+919779766933",
    backgroundColor: "#ffffff",
    textColor: "#0f172a",
    navItems: [
      { id: '1', label: 'HOME', url: '/', type: 'link' },
      { id: '2', label: 'ABOUT', url: '/about', type: 'dropdown', dropdownItems: [
        { id: 'a-2', label: 'FOUNDING TEAM', url: '/about#founding-team' }
      ]},
      { id: '3', label: 'TREATMENTS', url: '/#treatments', type: 'mega-menu', megaMenuItems: defaultMegaMenuItems },
      { id: '4', label: 'EXPERTS', url: '/experts', type: 'link' },
      { id: '5', label: 'BLOG', url: '/blog', type: 'link' },
      { id: '6', label: 'GALLERY', url: '/gallery', type: 'link' },
      { id: '7', label: 'CONTACT', url: '/contact', type: 'link' }
    ],
    logoUrl: "/aevora-logo-clean.png",
    logoWidth: "180"
  });

  const loadHeaderSettings = () => {
    getDbSetting('header_settings').then(saved => {
      if (saved) {
        setHeaderSettings(prev => {
          const navItems = (saved.navItems || prev.navItems).map(item => {
            if (item.type === 'mega-menu') {
              return {
                ...item,
                megaMenuItems: (item.megaMenuItems && item.megaMenuItems.length > 0)
                  ? item.megaMenuItems
                  : defaultMegaMenuItems
              };
            }
            if (item.label === 'MEDIA' || item.id === '5') {
              return {
                ...item,
                label: 'BLOG',
                type: 'link',
                url: '/blog'
              };
            }
            if (item.label === 'A-LISTER' || item.label === 'Gallery' || item.id === '6') {
              return {
                ...item,
                label: 'GALLERY',
                type: 'link',
                url: '/gallery'
              };
            }
            return item;
          });
          return {
            ...prev,
            ...saved,
            navItems,
            locationText: (saved.locationText && !saved.locationText.includes('Premium Aesthetics')) ? saved.locationText : "SCO 205 FF, Sector 5, Panchkula – 134114",
            phoneText: (saved.phoneText && !saved.phoneText.includes('98765 43210')) ? saved.phoneText : "+91 97797 66933",
            badgeText: (saved.badgeText && !saved.badgeText.includes('Certified Specialists')) ? saved.badgeText : "Aevora Clinics"
          };
        });
      }
    });
  };

  useEffect(() => {
    loadHeaderSettings();
    window.addEventListener('headerSettingsUpdated', loadHeaderSettings);
    return () => {
      window.removeEventListener('headerSettingsUpdated', loadHeaderSettings);
    };
  }, []);

  const timeoutRef = useRef(null);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Scroll listener for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDropdownEnter = (menuName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menuName);
  };

  const handleDropdownLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 240);
  };

  const toggleMobileAccordion = (menuKey) => {
    setMobileAccordions(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileAccordions({
      about: false,
      treatments: false,
      programs: false,
      media: false
    });
  };

  const getCtaLink = () => {
    if (headerSettings.ctaUrl && headerSettings.ctaUrl !== '#book' && headerSettings.ctaUrl !== '') {
      if (headerSettings.ctaUrl.startsWith('tel:') || headerSettings.ctaUrl.startsWith('http') || headerSettings.ctaUrl.startsWith('/')) {
        return headerSettings.ctaUrl;
      }
      const digits = headerSettings.ctaUrl.replace(/\D/g, '');
      if (digits.length >= 10) {
        return `tel:${digits.length === 10 ? `+91${digits}` : `+${digits}`}`;
      }
      return headerSettings.ctaUrl;
    }
    const rawPhone = headerSettings.phoneText || '+91 97797 66933';
    const digits = rawPhone.replace(/\D/g, '');
    return `tel:${digits.length === 10 ? `+91${digits}` : `+${digits}`}`;
  };

  return (
    <>
      <header className={`aevora-header ${isScrolled ? 'scrolled' : ''}`} style={{ backgroundColor: headerSettings.backgroundColor }}>
        <style>{`
          .aevora-header { --header-text-color: ${headerSettings.textColor}; }
          .nav-link { color: var(--header-text-color) !important; }
          .top-bar { border-bottom-color: rgba(0,0,0,0.05); }
        `}</style>
        {/* Top Information Strip */}
        <div className="top-bar">
          <div className="top-bar-container">
            <div className="top-bar-left">
              <span className="top-bar-item">
                <MapPin size={13} className="top-icon" />
                <span>{headerSettings.locationText}</span>
              </span>
              <span className="top-bar-divider">|</span>
              <span className="top-bar-item">
                <Clock size={13} className="top-icon" />
                <span>{headerSettings.timingsText}</span>
              </span>
            </div>
            <div className="top-bar-right">
              <a href={`tel:${headerSettings.phoneText.replace(/\s+/g, '')}`} className="top-bar-item top-phone">
                <Phone size={13} className="top-icon" />
                <span>{headerSettings.phoneText}</span>
              </a>
              <span className="top-bar-badge">
                <ShieldCheck size={12} /> {headerSettings.badgeText}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="main-nav">
          <div className="nav-container">
            {/* Brand Logo */}
            <Link to="/" className="logo-wrapper" title="Aevora by Kian Clinics">
              <img 
                src={headerSettings.logoUrl} 
                alt="Aevora by Kian Clinics" 
                className="aevora-logo"
                style={{ width: `${headerSettings.logoWidth}px` }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <ul className="nav-list">
                {headerSettings.navItems?.map(item => {
                  if (item.type === 'mega-menu') {
                    return (
                      <li 
                        key={item.id}
                        className="mega-menu-wrapper"
                        onMouseEnter={() => handleDropdownEnter('treatments')}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <a href={item.url} className="nav-link dropdown-trigger">
                          {item.label} <ChevronDown size={13} className={`chevron ${activeDropdown === 'treatments' ? 'rotate' : ''}`} />
                        </a>
                        {activeDropdown === 'treatments' && (
                          <div 
                            className="mega-menu-dropdown"
                            onMouseEnter={() => handleDropdownEnter('treatments')}
                            onMouseLeave={handleDropdownLeave}
                          >
                            <div className="mega-menu-container">
                              {(() => {
                                const megaList = (item.megaMenuItems && item.megaMenuItems.length > 0)
                                  ? item.megaMenuItems
                                  : defaultMegaMenuItems;
                                const colSize = Math.max(1, Math.ceil(megaList.length / 3));
                                const col1 = megaList.slice(0, colSize);
                                const col2 = megaList.slice(colSize, colSize * 2);
                                const col3 = megaList.slice(colSize * 2);

                                return (
                                  <>
                                    <div className="mega-column">
                                      <ul className="mega-list">
                                        {col1.map((t, idx) => (
                                          <li key={t.id || idx}>
                                            <Link to={t.url} className="mega-link" onClick={() => setActiveDropdown(null)}>
                                              {t.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="mega-column">
                                      <ul className="mega-list">
                                        {col2.map((t, idx) => (
                                          <li key={t.id || idx}>
                                            <Link to={t.url} className="mega-link" onClick={() => setActiveDropdown(null)}>
                                              {t.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="mega-column">
                                      <ul className="mega-list">
                                        {col3.map((t, idx) => (
                                          <li key={t.id || idx}>
                                            <Link to={t.url} className="mega-link" onClick={() => setActiveDropdown(null)}>
                                              {t.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

                  if (item.type === 'dropdown') {
                    return (
                      <li 
                        key={item.id}
                        className="dropdown-wrapper"
                        onMouseEnter={() => handleDropdownEnter(item.id)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <a href={item.url} className="nav-link dropdown-trigger">
                          {item.label} <ChevronDown size={13} className={`chevron ${activeDropdown === item.id ? 'rotate' : ''}`} />
                        </a>
                        {activeDropdown === item.id && (
                          <div 
                            className="dropdown-menu header-dropdown-menu"
                            onMouseEnter={() => handleDropdownEnter(item.id)}
                            onMouseLeave={handleDropdownLeave}
                          >
                            {item.dropdownItems?.map((dropItem, idx) => (
                              dropItem.url.startsWith('/') ? 
                                <Link key={idx} to={dropItem.url} className="dropdown-item" onClick={() => setActiveDropdown(null)}>{dropItem.label}</Link> :
                                <a key={idx} href={dropItem.url} className="dropdown-item" onClick={() => setActiveDropdown(null)}>{dropItem.label}</a>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  }

                  // Standard Link
                  return (
                    <li key={item.id}>
                      {item.url.startsWith('/') && !item.url.includes('#') ? 
                        <Link to={item.url} className="nav-link">{item.label}</Link> :
                        <a href={item.url} className="nav-link">{item.label}</a>
                      }
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right Action Button & Mobile Toggle */}
            <div className="nav-actions">
              <a href={getCtaLink()} className="btn-book desktop-btn-book">
                <Calendar size={15} />
                <span>{headerSettings.ctaText}</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button 
                className="mobile-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay when Mobile Drawer is open */}
      <div 
        className={`mobile-backdrop ${mobileMenuOpen ? 'visible' : ''}`} 
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer (Slide in from Right / Top Accordion) */}
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div className="mobile-drawer-header">
          <Link to="/" onClick={closeMobileMenu}>
            <img 
              src={headerSettings.logoUrl} 
              alt="Aevora Logo" 
              className="mobile-drawer-logo"
              style={{ width: `${headerSettings.logoWidth}px` }}
            />
          </Link>
          <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          <ul className="mobile-menu-list">
            {/* HOME */}
            <li className="mobile-menu-item">
              <Link to="/" className="mobile-link" onClick={closeMobileMenu}>
                HOME
              </Link>
            </li>

            {/* ABOUT ACCORDION */}
            <li className="mobile-menu-item">
              <div 
                className="mobile-accordion-header"
                onClick={() => toggleMobileAccordion('about')}
              >
                <span className="mobile-link-text">ABOUT</span>
                <ChevronDown size={18} className={`mobile-chevron ${mobileAccordions.about ? 'open' : ''}`} />
              </div>
              {mobileAccordions.about && (
                <div className="mobile-submenu">
                  <a href="/about#founding-team" onClick={closeMobileMenu}>Founding Team</a>
                </div>
              )}
            </li>

            {/* TREATMENTS ACCORDION */}
            <li className="mobile-menu-item">
              <div 
                className="mobile-accordion-header"
                onClick={() => toggleMobileAccordion('treatments')}
              >
                <span className="mobile-link-text">TREATMENTS</span>
                <ChevronDown size={18} className={`mobile-chevron ${mobileAccordions.treatments ? 'open' : ''}`} />
              </div>
              {mobileAccordions.treatments && (
                <div className="mobile-submenu mobile-treatments-submenu">
                  <div className="mobile-tag-grid">
                    {(() => {
                      const treatmentsItem = headerSettings.navItems?.find(n => n.type === 'mega-menu');
                      const mList = (treatmentsItem?.megaMenuItems && treatmentsItem.megaMenuItems.length > 0)
                        ? treatmentsItem.megaMenuItems
                        : defaultMegaMenuItems;
                      return mList.map((t, i) => (
                        <Link key={t.id || i} to={t.url} onClick={closeMobileMenu} className="mobile-treatment-tag">
                          {t.label}
                        </Link>
                      ));
                    })()}
                  </div>
                </div>
              )}
            </li>



            {/* EXPERTS */}
            <li className="mobile-menu-item">
              <Link to="/experts" className="mobile-link" onClick={closeMobileMenu}>
                EXPERTS
              </Link>
            </li>

            {/* BLOG */}
            <li className="mobile-menu-item">
              <Link to="/blog" className="mobile-link" onClick={closeMobileMenu}>
                BLOG
              </Link>
            </li>

            {/* GALLERY */}
            <li className="mobile-menu-item">
              <Link to="/gallery" className="mobile-link" onClick={closeMobileMenu}>
                GALLERY
              </Link>
            </li>

            {/* CONTACT */}
            <li className="mobile-menu-item">
              <Link to="/contact" className="mobile-link" onClick={closeMobileMenu}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        <div className="mobile-drawer-footer">
          <a href={`tel:${headerSettings.phoneText.replace(/\s+/g, '')}`} className="mobile-phone-cta">
            <Phone size={16} />
            <span>Call: {headerSettings.phoneText}</span>
          </a>
          <a href={getCtaLink()} className="mobile-action-book-btn" onClick={closeMobileMenu}>
            <Calendar size={16} />
            <span>{headerSettings.ctaText}</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Header;
