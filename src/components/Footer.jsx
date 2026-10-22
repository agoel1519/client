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
import { getDbSetting } from '../api/mongoApi';
import './Footer.css';

export const defaultFooterTreatmentColumns = [
  {
    id: '1',
    title: 'CLINICAL SERVICES',
    links: [
      { label: 'Laser Hair Reduction', url: '/treatments/laser-hair-reduction' },
      { label: 'Hydrafacials & Medical Facials', url: '/treatments/hydrafacials-medifacials' },
      { label: 'Laser Facial Toning & Glass Skin', url: '/treatments/laser-facial-toning' },
      { label: 'De-Tan / De-Pigmentation', url: '/treatments/de-tan-de-pigmentation' },
      { label: 'Tattoo Removal', url: '/treatments/tattoo-removal' },
      { label: 'Scar or Mole Removal', url: '/treatments/scar-or-mole-removal' },
      { label: 'Glass-Skin Clear Body & Axilla', url: '/treatments/glass-skin-clear-body' },
      { label: 'Intimacy Rejuvenation', url: '/treatments/intimacy-rejuvenation' },
      { label: 'Skin Tightening, Lifting & Anti-Ageing', url: '/treatments/skin-tightening-lifting-anti-ageing' },
      { label: 'Hair Regrowth & Regeneration', url: '/treatments/hair-regrowth-regeneration' },
      { label: 'Skin Boosters, Botox & Fillers', url: '/treatments/skin-boosters-fillers-botox-threads' },
      { label: 'Lip Fillers & Boosters', url: '/treatments/lip-fillers-or-boosters' },
      { label: 'Face Lift & Jawline Sculpting', url: '/treatments/face-lift-jawline-sculpting-double-chin' },
      { label: 'Muscle Contouring & Sculpting', url: '/treatments/muscle-contouring' }
    ]
  },
  {
    id: '2',
    title: '',
    links: [
      { label: 'Weight Loss Programs', url: '/treatments/weight-loss-programs' },
      { label: 'Bridal Packages', url: '/treatments/bridal-packages' },
      { label: 'Mommy Makeover & Post-Partum', url: '/treatments/mommy-makeover-post-partum-recovery' },
      { label: 'Intravenous Longevity Drips', url: '/treatments/intravenous-longevity-drips' },
      { label: 'Complete Body Health Packages', url: '/treatments/complete-body-analysis-prophylactic-health-packages' },
      { label: 'Sexual Wellness & Circumcision', url: '/treatments/sexual-wellness' },
      { label: 'Laser Surgery for Pilonidal Sinus', url: '/treatments/laser-surgery-pilonidal-sinus' },
      { label: 'Gastro-Intestinal Treatments', url: '/treatments/gastro-intestinal-problems' },
      { label: 'Liver, Gallbladder, GERD & Appendix', url: '/treatments/liver-gallbladder-gerd-pancreas' },
      { label: 'Hernia & Abdominal Wall Repair', url: '/treatments/hernia-abdominal-wall-reconstruction' },
      { label: 'Bariatric & Diabetes Surgery', url: '/treatments/bariatric-weight-loss-diabetes-surgery' },
      { label: 'Laser Proctology (Piles, Fissure)', url: '/treatments/laser-proctology-piles-fissure-fistula' },
      { label: 'Advanced Robotic Surgery', url: '/treatments/robotic-surgery' }
    ]
  }
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [clinicSettings, setClinicSettings] = useState({
    clinicName: "Aevora By Kian Clinics",
    address: "SCO 205 FF, Sector 5, Panchkula – 134114",
    phone: "+91 97797 66933",
    email: "contact@aevoraclinics.com",
    hours: "Mon – Sat: 10:00 AM – 8:00 PM | Sun: By Appointment",
    website: "www.Aevoraclinics.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27451.450192191256!2d76.84114488101572!3d30.678139625046214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93cadd2281e5%3A0x154181fc7bda7840!2sAevora%20by%20Kian%20Clinics!5e0!3m2!1sen!2sin!4v1792574395440!5m2!1sen!2sin"
  });

  const [footerSettings, setFooterSettings] = useState({
    tagline: "A bespoke aesthetic and longevity sanctuary founded on clinical precision, US FDA-cleared science, and undetectable elegance.",
    founderName: "Dr. Meghna Mour",
    founderTitle: "Chief Aesthetic Dermatologist",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    youtubeUrl: "https://youtube.com",
    copyrightText: "AEVORA by Kian Clinics. All rights reserved.",
    columns: defaultFooterTreatmentColumns,
    logoUrl: "/aevora-logo-clean.png",
    logoWidth: "150"
  });

  const loadSettings = () => {
    getDbSetting('clinic_settings').then(saved => {
      if (saved) {
        setClinicSettings(prev => ({
          ...prev,
          ...saved,
          clinicName: (saved.clinicName && !saved.clinicName.toLowerCase().includes('sanctuary')) ? saved.clinicName : "Aevora By Kian Clinics",
          address: (saved.address && !saved.address.includes('SCO 14-15')) ? saved.address : "SCO 205 FF, Sector 5, Panchkula – 134114",
          phone: (saved.phone && !saved.phone.includes('0172')) ? saved.phone : "+91 97797 66933",
          email: (saved.email && !saved.email.includes('concierge@')) ? saved.email : "contact@aevoraclinics.com",
          website: saved.website || "www.Aevoraclinics.com"
        }));
      }
    }).catch(err => console.warn('Footer clinic settings notice:', err));

    getDbSetting('footer_settings').then(saved => {
      if (saved) {
        let columnsToUse = defaultFooterTreatmentColumns;

        if (Array.isArray(saved.columns) && saved.columns.length > 0) {
          const hasSanctuary = saved.columns.some(col => 
            col.title?.trim().toUpperCase() === 'THE SANCTUARY' || (col.id === '2' && col.links?.some(l => l.url === '#about'))
          );
          if (hasSanctuary) {
            columnsToUse = defaultFooterTreatmentColumns;
          } else {
            columnsToUse = saved.columns.map(c => 
              c.title?.trim().toUpperCase() === 'SURGICAL & WELLNESS' ? { ...c, title: '' } : c
            );
          }
        }

        setFooterSettings(prev => ({
          ...prev,
          ...saved,
          columns: columnsToUse
        }));
      }
    }).catch(err => console.warn('Footer settings notice:', err));
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
        <div className={`footer-grid cols-${(footerSettings.columns?.length || 0) + 2}`}>
          
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
              {col.title ? (
                <h4 className="footer-heading">{col.title}</h4>
              ) : (
                <h4 className="footer-heading footer-heading-empty" aria-hidden="true">&nbsp;</h4>
              )}
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

          {/* Column 4: Contact & Location */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-heading">CLINIC LOCATION</h4>
            
            {/* Active Clinic */}
            <div className="footer-location-item active-clinic">
              <div className="loc-info-row">
                <MapPin size={18} className="loc-icon" />
                <div>
                  <strong>{clinicSettings.clinicName || "Aevora By Kian Clinics"}</strong>
                  <p>
                    {clinicSettings.address.split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}<br/></React.Fragment>
                    ))}
                  </p>
                </div>
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
                <a href={`mailto:${clinicSettings.email || 'contact@aevoraclinics.com'}`}>{clinicSettings.email || 'contact@aevoraclinics.com'}</a>
              </div>
              <div className="contact-row">
                <Clock size={16} className="contact-icon" />
                <span>{clinicSettings.hours}</span>
              </div>
            </div>

            {/* Mini Map */}
            <div className="footer-map-container">
              <iframe
                src={clinicSettings.mapUrl}
                width="100%"
                height="140"
                style={{ border: 0, borderRadius: '10px', opacity: 0.85 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aevora Clinic Location"
              />
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
