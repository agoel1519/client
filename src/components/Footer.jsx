import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Send, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [clinicSettings, setClinicSettings] = useState({
    address: "SCO 205 FF, Sector 5, Panchkula – 134114",
    phone: "+91 97797 66933",
    email: "concierge@aevoraclinics.com",
    hours: "Mon – Sat: 10:00 AM – 8:00 PM | Sun: By Appointment",
    website: "www.Aevoraclinics.com"
  });

  const [footerSettings, setFooterSettings] = useState({
    tagline: "A bespoke aesthetic and longevity sanctuary founded on clinical precision, US FDA-cleared science, and undetectable elegance.",
    founderName: "Dr Misha Goel & Dr Anupam Goel",
    founderTitle: "Clinical Aesthetics & Minimal Access Surgery",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    youtubeUrl: "https://youtube.com",
    copyrightText: "AEVORA by Kian Clinics. All rights reserved.",
    columns: [
      { id: '1', title: 'CLINICAL SERVICES', links: [
        { label: 'Hydrafacials & Medical Facials', url: '/treatments/hydrafacials-medifacials' },
        { label: 'Laser Facial Toning & Glass Skin', url: '/treatments/laser-facial-toning' },
        { label: 'Laser Hair Reduction', url: '/treatments/laser-hair-reduction' },
        { label: 'Muscle Contouring & Sculpting', url: '/treatments/muscle-contouring' },
        { label: 'Intravenous Longevity Drips', url: '/treatments/intravenous-longevity-drips' },
        { label: 'Hair Regrowth & Regeneration', url: '/treatments/hair-regrowth-regeneration' },
        { label: 'Intimacy & Sexual Wellness', url: '/treatments/intimacy-rejuvenation' },
        { label: 'Advanced Robotic Surgery', url: '/treatments/robotic-surgery' }
      ] },
      { id: '2', title: 'THE SANCTUARY', links: [
        { label: 'About Aevora & Philosophy', url: '#about' },
        { label: 'Our Specialist Doctors', url: '#doctors' },
        { label: 'The VIP Clinic Experience', url: '#about' },
        { label: 'Celebrity & VIP Spotlight', url: '#celebrity' },
        { label: 'Press & Media Features', url: '#media' },
        { label: 'Patient Reviews & Testimonials', url: '#testimonials' },
        { label: 'Frequently Asked Questions', url: '#faq' },
        { label: 'Book Private Consultation', url: '#book' }
      ] }
    ],
    logoUrl: "/aevora-logo-clean.png",
    logoWidth: "150"
  });

  const loadSettings = () => {
    import('../api/mongoApi').then(({ getDbSetting }) => {
      getDbSetting('clinic_settings').then(saved => {
        if (saved) {
          setClinicSettings(prev => ({
            ...prev,
            ...saved,
            address: (saved.address && !saved.address.includes('SCO 14-15')) ? saved.address : "SCO 205 FF, Sector 5, Panchkula – 134114",
            phone: (saved.phone && !saved.phone.includes('0172')) ? saved.phone : "+91 97797 66933",
            website: saved.website || "www.Aevoraclinics.com"
          }));
        }
      });
      getDbSetting('footer_settings').then(saved => {
        if (saved) {
          setFooterSettings(prev => ({
            ...prev,
            ...saved,
            founderName: (saved.founderName && !saved.founderName.includes('Meghna Mour')) ? saved.founderName : "Dr Misha Goel & Dr Anupam Goel"
          }));
        }
      });
    });
  };

  React.useEffect(() => {
    loadSettings();
    window.addEventListener('footerSettingsUpdated', loadSettings);
    window.addEventListener('clinicSettingsUpdated', loadSettings);
    return () => {
      window.removeEventListener('footerSettingsUpdated', loadSettings);
      window.removeEventListener('clinicSettingsUpdated', loadSettings);
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="aevora-footer" id="contact">
      {/* Top Privilege Circle Newsletter Banner */}
      <div className="footer-privilege-banner">
        <div className="footer-privilege-container">
          <div className="privilege-text-col">
            <h3 className="privilege-title">
              Receive Private Invitations &amp; Clinical Insights
            </h3>
            <p className="privilege-desc">
              Subscribe to receive curated longevity science, private clinic announcements, and priority seasonal consultations.
            </p>
          </div>

          <div className="privilege-form-col">
            {subscribed ? (
              <div className="privilege-success-msg">
                <CheckCircle2 size={20} className="success-icon" />
                <span>Thank you for joining. Welcome to the Aevora Circle.</span>
              </div>
            ) : (
              <form className="privilege-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="privilege-input"
                />
                <button type="submit" className="privilege-submit-btn">
                  <span>Join</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main-container">
        <div className="footer-grid">
          
          {/* Column 1: Brand & Bio */}
          <div className="footer-col footer-brand-col">
            <a href="#home" className="footer-logo-link">
              <img 
                src={footerSettings.logoUrl} 
                alt="Aevora by Kian Clinics" 
                className="footer-brand-logo"
                style={{ width: `${footerSettings.logoWidth}px` }}
              />
            </a>

            <p className="footer-brand-tagline">
              {footerSettings.tagline}
            </p>

            <div className="footer-doctor-founder">
              <span className="founder-badge">FOUNDED &amp; LED BY</span>
              <strong className="founder-name">{footerSettings.founderName}</strong>
              <span className="founder-title">{footerSettings.founderTitle}</span>
            </div>

            <div className="footer-social-links">
              <a href={footerSettings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href={footerSettings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href={footerSettings.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href={footerSettings.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Dynamic Columns */}
          {footerSettings.columns?.map(col => (
            <div className="footer-col" key={col.id}>
              <h4 className="footer-heading">{col.title}</h4>
              <ul className="footer-nav-list">
                {col.links?.map((link, i) => (
                  <li key={i}>
                    {link.url.startsWith('/') && !link.url.includes('#') ? 
                      <Link to={link.url}>{link.label}</Link> : 
                      <a href={link.url}>{link.label}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact & Locations (With Coming Soon) */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-heading">CLINIC LOCATIONS</h4>
            
            {/* Active Flagship Clinic */}
            <div className="footer-location-item active-clinic">
              <div className="loc-badge-row">
                <span className="loc-flagship-tag">FLAGSHIP CLINIC</span>
              </div>
              <div className="loc-info-row">
                <MapPin size={18} className="loc-icon" />
                <div>
                  <strong>Panchkula Sanctuary</strong>
                  <p>
                    {clinicSettings.address.split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}<br/></React.Fragment>
                    ))}
                  </p>
                  <span className="valet-tag">Valet Parking Available</span>
                </div>
              </div>
            </div>

            {/* Coming Soon Locations */}
            <div className="footer-coming-soon-block">
              <span className="coming-soon-heading">EXPANDING DESTINATIONS:</span>
              <div className="coming-soon-cities">
                <span className="city-pill">
                  <span className="dot pulse"></span>
                  Chandigarh <small>(Coming Soon)</small>
                </span>
                <span className="city-pill">
                  <span className="dot pulse"></span>
                  Mohali <small>(Coming Soon)</small>
                </span>
                <span className="city-pill">
                  <span className="dot pulse"></span>
                  Delhi NCR <small>(Coming Soon)</small>
                </span>
              </div>
            </div>

            {/* Direct Connect */}
            <div className="footer-direct-contact">
              <div className="contact-row">
                <Phone size={16} className="contact-icon" />
                <a href={`tel:${clinicSettings.phone.split('\n')[0]}`}>{clinicSettings.phone.split('\n')[0]}</a>
              </div>
              <div className="contact-row">
                <Mail size={16} className="contact-icon" />
                <a href={`mailto:${clinicSettings.email}`}>{clinicSettings.email}</a>
              </div>
              <div className="contact-row">
                <Clock size={16} className="contact-icon" />
                <span>{clinicSettings.hours}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <div className="bottom-left">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} {footerSettings.copyrightText}
            </p>
          </div>

          <div className="bottom-right-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="sep">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="sep">•</span>
            <a href="#disclaimer">Clinical Disclaimer</a>
            <span className="sep">•</span>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
