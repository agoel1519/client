import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Send, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
                src="/aevora-logo-clean.png" 
                alt="Aevora by Kian Clinics" 
                className="footer-brand-logo"
              />
            </a>

            <p className="footer-brand-tagline">
              A bespoke aesthetic and longevity sanctuary founded on clinical precision, US FDA-cleared science, and undetectable elegance.
            </p>

            <div className="footer-doctor-founder">
              <span className="founder-badge">FOUNDED &amp; LED BY</span>
              <strong className="founder-name">Dr. Meghna Mour</strong>
              <span className="founder-title">Chief Aesthetic Dermatologist</span>
            </div>

            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Treatments Mega Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">CLINICAL TREATMENTS</h4>
            <ul className="footer-nav-list">
              <li><a href="#treatments">Face &amp; Skin Rejuvenation</a></li>
              <li><a href="#treatments">Laser Pigment &amp; Melasma Toning</a></li>
              <li><a href="#treatments">EXION Non-Surgical Contouring</a></li>
              <li><a href="#treatments">GFC &amp; Hair Bio-Restoration</a></li>
              <li><a href="#treatments">Intravenous Longevity Infusions</a></li>
              <li><a href="#treatments">Ultherapy Prime &amp; Jawline Lift</a></li>
              <li><a href="#treatments">Medi-Facials &amp; HydraGlow</a></li>
              <li><a href="#treatments">Aesthetic Gynaecology</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Experience */}
          <div className="footer-col">
            <h4 className="footer-heading">THE SANCTUARY</h4>
            <ul className="footer-nav-list">
              <li><a href="#about">About Aevora &amp; Philosophy</a></li>
              <li><a href="#team">Our Specialist Doctors</a></li>
              <li><a href="#experience">The VIP Clinic Experience</a></li>
              <li><a href="#celebrities">Celebrity &amp; VIP Spotlight</a></li>
              <li><a href="#media">Press &amp; Media Features</a></li>
              <li><a href="#testimonials">Patient Reviews &amp; Testimonials</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
              <li><a href="#appointment">Book Private Consultation</a></li>
            </ul>
          </div>

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
                  <p>SCO 14-15, Sector 5, Panchkula, Haryana 134109</p>
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
                <a href="tel:+917018610136">+91 70186 10136 / 0172 258 0000</a>
              </div>
              <div className="contact-row">
                <Mail size={16} className="contact-icon" />
                <a href="mailto:concierge@aevoraclinics.com">concierge@aevoraclinics.com</a>
              </div>
              <div className="contact-row">
                <Clock size={16} className="contact-icon" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM | Sun: By Appointment</span>
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
              &copy; {new Date().getFullYear()} AEVORA by Kian Clinics. All rights reserved.
            </p>
            <p className="developer-credit-text">
              Developed by <a href="tel:7018610136" className="dev-highlight">Vikas</a> • <a href="tel:7018610136" className="dev-phone">7018610136</a>
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
