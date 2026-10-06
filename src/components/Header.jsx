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
import { slugify } from '../data/treatmentsData';
import './Header.css';

const treatmentsData = {
  faceSkinCol1: [
    'SCAR',
    'CHEMICAL PEELS',
    'DERMA MELAN PEEL',
    'PLASMA PEN',
    'PIGMENT LASER',
    'COSMELAN PEEL',
    'MEDI-FACIAL',
    'PEEL + WHITENING',
    'SKIN BOOSTER',
    'HIFU FACIAL',
    'TATTOO REMOVAL',
    'KELOID TREATMENT',
    'THREADS',
    'BOTOX',
    'WART REMOVAL'
  ],
  faceSkinCol2: [
    'SKIN POLISHING',
    'MILIA EXTRACTION',
    'FILLER',
    'MOLE REMOVAL',
    'PEELS (ALL)',
    'EXION MNRF (BTL)',
    'BIOREPEEL',
    'YELLOW PEEL',
    'EXION FACE (BTL)',
    'EMFACE (BTL)',
    'MICROBLADING',
    'DERMA PEN',
    'LASER / FOTONA',
    'MICRO DERMABRASION',
    'MANDELIC PEEL',
    'MOLLUSCUM REMOVAL',
    'ULTHERAPY PRIME'
  ],
  body: [
    'EMSCULPT NEO',
    'EMERALD LASER',
    'BALLANCER PRO',
    'EXION - RF',
    'BODY CONTOURING',
    'INCH LOSS',
    'COOLSCULPTING'
  ],
  ivTherapy: [
    'NAD+ IV DRIP',
    'LIMITLESS',
    'SIGNATURE',
    'FITNESS',
    'INSTAGLO',
    'HAIR HEALTH',
    'REWIND',
    'HANGOVER',
    'SHIELD',
    'SUPER WOMAN'
  ],
  hair: [
    'HAIR CONSULTATION',
    'HAIR REGROWTH',
    'IV THERAPY FOR HAIRFALL',
    'DERMAROLLER',
    'HAIR GROWTH LASERS',
    'SCALP MICRO PIGMENTATION',
    'DERMAPEN',
    'EXOSOMES & BIOSTEMCELLS',
    'FUE',
    'HIGH-DENSITY FUE',
    'EYEBROW TRANSPLANT',
    'MEGA HAIR TRANSPLANT',
    'BEARD TRANSPLANT',
    'HAIR FUE - NO ROOT TOUCH'
  ],
  aestheticGynaecology: [
    'VULVO-VAGINAL',
    'EMSELLA',
    'ORGASM SHOT',
    'VAGINISMUS',
    'VULVAR AUGMENTATION',
    'LABIAPLASTY'
  ]
};

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

  return (
    <>
      <header className={`aevora-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Information Strip */}
        <div className="top-bar">
          <div className="top-bar-container">
            <div className="top-bar-left">
              <span className="top-bar-item">
                <MapPin size={13} className="top-icon" />
                <span>Premium Aesthetics & Wellness Clinic</span>
              </span>
              <span className="top-bar-divider">|</span>
              <span className="top-bar-item">
                <Clock size={13} className="top-icon" />
                <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
              </span>
            </div>
            <div className="top-bar-right">
              <a href="tel:+919876543210" className="top-bar-item top-phone">
                <Phone size={13} className="top-icon" />
                <span>+91 98765 43210</span>
              </a>
              <span className="top-bar-badge">
                <ShieldCheck size={12} /> Certified Specialists
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
                src="/aevora-logo-clean.png" 
                alt="Aevora by Kian Clinics" 
                className="aevora-logo"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <ul className="nav-list">
                <li>
                  <Link to="/" className="nav-link active">HOME</Link>
                </li>

                {/* ABOUT DROPDOWN */}
                <li 
                  className="dropdown-wrapper"
                  onMouseEnter={() => handleDropdownEnter('about')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link to="/about" className="nav-link dropdown-trigger">
                    ABOUT <ChevronDown size={13} className={`chevron ${activeDropdown === 'about' ? 'rotate' : ''}`} />
                  </Link>
                  {activeDropdown === 'about' && (
                    <div 
                      className="dropdown-menu"
                      onMouseEnter={() => handleDropdownEnter('about')}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <a href="/about#philosophy" className="dropdown-item">PHILOSOPHY</a>
                      <a href="/about#founding-team" className="dropdown-item">FOUNDING TEAM</a>
                      <a href="/about#experience" className="dropdown-item">EXPERIENCE</a>
                      <a href="/about#gallery" className="dropdown-item">GALLERY</a>
                    </div>
                  )}
                </li>

                {/* TREATMENTS MEGA MENU */}
                <li 
                  className="mega-menu-wrapper"
                  onMouseEnter={() => handleDropdownEnter('treatments')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <a href="/#treatments" className="nav-link dropdown-trigger">
                    TREATMENTS <ChevronDown size={13} className={`chevron ${activeDropdown === 'treatments' ? 'rotate' : ''}`} />
                  </a>
                  {activeDropdown === 'treatments' && (
                    <div 
                      className="mega-menu-dropdown"
                      onMouseEnter={() => handleDropdownEnter('treatments')}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="mega-menu-container">
                        {/* Column 1 & 2: FACE / SKIN */}
                        <div className="mega-column mega-col-face">
                          <h4 className="mega-category-title">FACE / SKIN</h4>
                          <div className="face-subgrid">
                            <ul className="mega-list">
                              {treatmentsData.faceSkinCol1.map((item, idx) => (
                                <li key={idx}>
                                  <Link 
                                    to={`/treatments/${slugify(item)}`} 
                                    className="mega-link"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <ul className="mega-list">
                              {treatmentsData.faceSkinCol2.map((item, idx) => (
                                <li key={idx}>
                                  <Link 
                                    to={`/treatments/${slugify(item)}`} 
                                    className="mega-link"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Column 3: BODY + IV THERAPY + LASER HAIR REMOVAL */}
                        <div className="mega-column mega-col-body">
                          <h4 className="mega-category-title">BODY</h4>
                          <ul className="mega-list" style={{ marginBottom: '1.2rem' }}>
                            {treatmentsData.body.map((item, idx) => (
                              <li key={idx}>
                                <Link 
                                  to={`/treatments/${slugify(item)}`} 
                                  className="mega-link"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <h4 className="mega-category-title">IV THERAPY</h4>
                          <ul className="mega-list" style={{ marginBottom: '1.2rem' }}>
                            {treatmentsData.ivTherapy.map((item, idx) => (
                              <li key={idx}>
                                <Link 
                                  to={`/treatments/${slugify(item)}`} 
                                  className="mega-link"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <h4 className="mega-category-title">
                            <Link 
                              to="/treatments/laser-hair-removal" 
                              className="mega-category-link"
                              onClick={() => setActiveDropdown(null)}
                            >
                              LASER HAIR REMOVAL
                            </Link>
                          </h4>
                        </div>

                        {/* Column 4: HAIR */}
                        <div className="mega-column mega-col-hair">
                          <h4 className="mega-category-title">HAIR</h4>
                          <ul className="mega-list">
                            {treatmentsData.hair.map((item, idx) => (
                              <li key={idx}>
                                <Link 
                                  to={`/treatments/${slugify(item)}`} 
                                  className="mega-link"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 5: AESTHETIC GYNAECOLOGY */}
                        <div className="mega-column mega-col-gynae">
                          <h4 className="mega-category-title">AESTHETIC GYNAECOLOGY</h4>
                          <ul className="mega-list">
                            {treatmentsData.aestheticGynaecology.map((item, idx) => (
                              <li key={idx}>
                                <Link 
                                  to={`/treatments/${slugify(item)}`} 
                                  className="mega-link"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>



                {/* EXPERTS */}
                <li>
                  <Link to="/experts" className="nav-link">EXPERTS</Link>
                </li>

                {/* MEDIA DROPDOWN */}
                <li 
                  className="dropdown-wrapper"
                  onMouseEnter={() => handleDropdownEnter('media')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <a href="#media" className="nav-link dropdown-trigger">
                    MEDIA <ChevronDown size={13} className={`chevron ${activeDropdown === 'media' ? 'rotate' : ''}`} />
                  </a>
                  {activeDropdown === 'media' && (
                    <div 
                      className="dropdown-menu"
                      onMouseEnter={() => handleDropdownEnter('media')}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link to="/press" className="dropdown-item">PRESS</Link>
                      <Link to="/blog" className="dropdown-item">BLOGS</Link>
                    </div>
                  )}
                </li>

                {/* A-LISTER */}
                <li>
                  <a href="#a-lister" className="nav-link">A-LISTER</a>
                </li>

                {/* CONTACT */}
                <li>
                  <Link to="/contact" className="nav-link">CONTACT</Link>
                </li>
              </ul>
            </nav>

            {/* Right Action Button & Mobile Toggle */}
            <div className="nav-actions">
              <a href="#book" className="btn-book desktop-btn-book">
                <Calendar size={15} />
                <span>Book Appointment</span>
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
              src="/aevora-logo-clean.png" 
              alt="Aevora Logo" 
              className="mobile-drawer-logo"
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
                  <a href="/about#philosophy" onClick={closeMobileMenu}>Philosophy</a>
                  <a href="/about#founding-team" onClick={closeMobileMenu}>Founding Team</a>
                  <a href="/about#experience" onClick={closeMobileMenu}>Experience</a>
                  <a href="/about#gallery" onClick={closeMobileMenu}>Gallery</a>
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
                  <div className="mobile-category-block">
                    <h5>FACE / SKIN</h5>
                    <div className="mobile-tag-grid">
                      {['Chemical Peels', 'Botox', 'Filler', 'Laser Fotona', 'Ultherapy Prime', 'Skin Booster', 'HIFU Facial', 'Derma Pen', 'Scar', 'Threads'].map((t, i) => (
                        <Link key={i} to={`/treatments/${slugify(t)}`} onClick={closeMobileMenu} className="mobile-treatment-tag">{t}</Link>
                      ))}
                    </div>
                  </div>

                  <div className="mobile-category-block">
                    <h5>BODY & IV THERAPY</h5>
                    <div className="mobile-tag-grid">
                      {['Emsculpt Neo', 'Emerald Laser', 'Coolsculpting', 'Body Contouring', 'NAD+ IV Drip', 'Limitless', 'Instaglo', 'Laser Hair Removal'].map((t, i) => (
                        <Link key={i} to={`/treatments/${slugify(t)}`} onClick={closeMobileMenu} className="mobile-treatment-tag">{t}</Link>
                      ))}
                    </div>
                  </div>

                  <div className="mobile-category-block">
                    <h5>HAIR & GYNAECOLOGY</h5>
                    <div className="mobile-tag-grid">
                      {['Hair Regrowth', 'FUE', 'High-Density FUE', 'Dermapen', 'Scalp Micro Pigmentation', 'Emsella', 'Vulvo-Vaginal', 'Labiaplasty'].map((t, i) => (
                        <Link key={i} to={`/treatments/${slugify(t)}`} onClick={closeMobileMenu} className="mobile-treatment-tag">{t}</Link>
                      ))}
                    </div>
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

            {/* MEDIA ACCORDION */}
            <li className="mobile-menu-item">
              <div 
                className="mobile-accordion-header"
                onClick={() => toggleMobileAccordion('media')}
              >
                <span className="mobile-link-text">MEDIA</span>
                <ChevronDown size={18} className={`mobile-chevron ${mobileAccordions.media ? 'open' : ''}`} />
              </div>
              {mobileAccordions.media && (
                <div className="mobile-submenu">
                  <Link to="/press" onClick={closeMobileMenu}>Press & Publications</Link>
                  <Link to="/blog" onClick={closeMobileMenu}>Blogs & Articles</Link>
                </div>
              )}
            </li>

            {/* A-LISTER */}
            <li className="mobile-menu-item">
              <a href="#a-lister" className="mobile-link" onClick={closeMobileMenu}>
                A-LISTER
              </a>
            </li>

            {/* CONTACT */}
            <li className="mobile-menu-item">
              <Link to="/contact" className="mobile-link" onClick={closeMobileMenu}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {/* Drawer Footer CTA */}
        <div className="mobile-drawer-footer">
          <a href="tel:+919876543210" className="mobile-phone-cta">
            <Phone size={16} />
            <span>Call: +91 98765 43210</span>
          </a>
          <a href="#book" className="mobile-action-book-btn" onClick={closeMobileMenu}>
            <Calendar size={16} />
            <span>Book Consultation</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Header;
