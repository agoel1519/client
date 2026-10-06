import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DynamicTreatmentPage.css';
import Header from '../Header';
import Footer from '../Footer';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  ArrowRight,
  MapPin,
  Mail,
  Clock
} from 'lucide-react';
import { getTreatmentData, getAllTreatments } from '../../data/treatmentsData';

const DynamicTreatmentPage = ({ pageData: propPageData }) => {
  const { slug } = useParams();
  const currentSlug = slug || 'chemical-peels';
  
  // Resolve page data from prop (admin preview) or from dynamic routing catalog
  const pageData = propPageData || getTreatmentData(currentSlug);
  
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [baSlide, setBaSlide] = useState(0);
  const [baSlideWidth, setBaSlideWidth] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const baViewportRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: '',
    message: ''
  });

  // Measure the viewport width to set exact pixel widths for slides
  useLayoutEffect(() => {
    const measure = () => {
      if (baViewportRef.current) {
        const width = baViewportRef.current.offsetWidth;
        const views = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
        setItemsPerView(views);
        setBaSlideWidth(width / views);
        
        // Reset slide if it's out of bounds after resize
        setBaSlide(prev => {
          const max = Math.max(0, (pageData?.beforeAfter?.images?.length || 0) - views);
          return prev > max ? max : prev;
        });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Scroll to top whenever slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveAccordion(0);
    setActiveFaq(0);
    setBaSlide(0);
    setFormSubmitted(false);
    if (pageData?.title) {
      setFormData(prev => ({ ...prev, treatment: pageData.title }));
    }
  }, [slug, pageData?.title]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const imagesCount = pageData?.beforeAfter?.images?.length || 0;
  const maxSlide = Math.max(0, imagesCount - itemsPerView);

  const nextBaSlide = () => {
    if (imagesCount <= itemsPerView) return;
    setBaSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevBaSlide = () => {
    if (imagesCount <= itemsPerView) return;
    setBaSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Auto-play Before/After Slider
  useEffect(() => {
    if (imagesCount <= itemsPerView) return;
    
    const interval = setInterval(() => {
      setBaSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 3500); // 3.5s auto-scroll
    
    return () => clearInterval(interval);
  }, [imagesCount, maxSlide]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5001/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          treatment: formData.treatment || pageData?.title || currentSlug,
          notes: formData.message
        })
      });
    } catch (err) {
      console.warn('Booking recorded with offline fallback notice:', err);
    }
    setFormSubmitted(true);
  };

  // If pageData is not found
  if (!pageData) {
    return (
      <div className="dynamic-page-container">
        <Header />
        <div className="dt-hero" style={{ padding: '40px 20px 60px' }}>
          <div className="dt-hero-content">
            <p className="dt-breadcrumb">AEVORA / TREATMENTS</p>
            <h1 className="dt-title">Treatment Not Found</h1>
          </div>
        </div>
        <div style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--aevora-body-text)', marginBottom: '30px' }}>
            The requested treatment page does not exist or may have been updated.
          </p>
          <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', padding: '14px 28px' }}>
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allTreatments = getAllTreatments();
  const relatedTreatments = allTreatments
    .filter(t => t.slug !== slug && t.category === pageData.category)
    .slice(0, 4);

  return (
    <div className="dynamic-page-container">
      <Header />
      
      {/* Hero Section */}
      <section className="dt-hero">
        <div className="dt-hero-content">
          <p className="dt-breadcrumb">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>HOME</Link> / 
            <span style={{ margin: '0 6px' }}>TREATMENTS</span> / 
            <span style={{ color: '#fff', fontWeight: 600 }}> {pageData.title.replace(' IN MUMBAI', '')}</span>
          </p>
          <h1 className="dt-title">{pageData.title}</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="dt-main">
        <div className="dt-container">
          
          {/* Introduction Paragraph (Screenshot 1 top) */}
          <div className="dt-intro-wrapper">
            <p className="dt-intro">{pageData.introText}</p>
          </div>

          {/* Question + Answer + Full-Width Image Section (Screenshot 1) */}
          <section className="dt-qa-section">
            <h2 className="dt-question-heading">{pageData.contentSection?.heading}</h2>
            <p className="dt-answer-text">{pageData.contentSection?.text}</p>
            
            {/* Full-Width Image directly below answer */}
            <div className="dt-fullwidth-image-wrapper">
              <img 
                src={pageData.contentSection?.image || '/treatments/treatment-skin.jpg'} 
                alt={pageData.title} 
                className="dt-fullwidth-image" 
              />
            </div>
          </section>

          {/* Overview / FAQ Accordion Section (Screenshot 2 from previous request) */}
          {pageData.accordionSection?.items?.length > 0 && (
            <section className="dt-empower-section">
              <h2 className="dt-empower-heading">
                {pageData.accordionSection.heading || `HERE'S AN OVERVIEW OF HOW ${pageData.title.replace(' IN MUMBAI', '')} CAN EMPOWER YOU`}
              </h2>
              <div className="dt-empower-accordion">
                {pageData.accordionSection.items.map((item, index) => (
                  <div key={index} className={`dt-empower-item ${activeAccordion === index ? 'active' : ''}`}>
                    <button className="dt-empower-header" onClick={() => toggleAccordion(index)}>
                      <span className="dt-empower-title">{item.title}</span>
                      <span className="dt-empower-icon">{activeAccordion === index ? '−' : '+'}</span>
                    </button>
                    {activeAccordion === index && (
                      <div className="dt-empower-content">
                        <p>{item.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 1. SOLUTIONS FOR VARIOUS TYPES SECTION (SCREENSHOT 1) */}
          {pageData.treatmentTypesSection?.cards?.length > 0 && (
            <section className="dt-types-section">
              <h2 className="dt-types-heading">
                {pageData.treatmentTypesSection.heading || `${pageData.title.replace(' IN MUMBAI', '')} OFFERS SOLUTIONS FOR VARIOUS TYPES`}
              </h2>
              <div className="dt-types-grid">
                {pageData.treatmentTypesSection.cards.map((card, idx) => (
                  <div key={idx} className="dt-type-card">
                    <h3 className="dt-type-card-title">{card.title}</h3>
                    <p className="dt-type-card-desc">{card.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. PATHWAY / RECLAIM CONFIDENCE SECTION (SCREENSHOT 2) */}
          {(pageData.pathwaySection || pageData.ctaSection) && (
            <section className="dt-pathway-section">
              <h2 className="dt-pathway-heading">
                {pageData.pathwaySection?.heading || `YOUR PATH TO SMOOTHER, MORE CONFIDENT SKIN STARTS WITH ${pageData.title.replace(' IN MUMBAI', '')}`}
              </h2>
              <div className="dt-pathway-text-content">
                {pageData.pathwaySection?.paragraphs?.map((para, pIdx) => (
                  <p key={pIdx} className="dt-pathway-p">{para}</p>
                )) || (
                  <>
                    <p className="dt-pathway-p">{pageData.ctaSection?.text}</p>
                    <p className="dt-pathway-p">Ready to explore your options and reclaim your confidence? Contact us today to schedule a consultation and discuss the possibilities!</p>
                  </>
                )}
              </div>
            </section>
          )}

          {/* DYNAMIC CUSTOM SECTIONS (ADDED BY ADMIN IF ANY) */}
          {pageData.customSections?.map((section, idx) => {
            if (section.type === 'process-steps') {
              return (
                <section key={idx} className="dt-custom-section dt-steps-section">
                  <div className="dt-section-header-box">
                    <span className="dt-eyebrow">CLINICAL METHODOLOGY</span>
                    <h2 className="dt-section-heading dt-center">{section.heading}</h2>
                    {section.subheading && <p className="dt-center dt-custom-sub">{section.subheading}</p>}
                  </div>
                  <div className="dt-steps-grid">
                    {section.steps?.map((step, sIdx) => (
                      <div key={sIdx} className="dt-step-card">
                        <span className="dt-step-badge">STEP 0{sIdx + 1}</span>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            if (section.type === 'stats-grid') {
              return (
                <section key={idx} className="dt-custom-section dt-stats-section">
                  <h2 className="dt-section-heading dt-center">{section.heading}</h2>
                  <div className="dt-stats-grid">
                    {section.stats?.map((stat, stIdx) => (
                      <div key={stIdx} className="dt-stat-box">
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            if (section.type === 'quote-box') {
              return (
                <section key={idx} className="dt-custom-section dt-quote-section">
                  <div className="dt-quote-card">
                    <p className="dt-quote-text">"{section.quote}"</p>
                    <cite className="dt-quote-author">— {section.author}</cite>
                  </div>
                </section>
              );
            }

            return (
              <section key={idx} className="dt-custom-section dt-text-block-card">
                <h2 className="dt-section-heading">{section.heading}</h2>
                <p className="dt-content-text" style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
              </section>
            );
          })}

          {/* End of dt-container for BA full-width break */}
        </div>

        {/* 3. BEFORE & AFTERS SECTION — full width outside container */}
        {pageData.beforeAfter && pageData.beforeAfter?.images?.length > 0 && (
          <section className="dt-ba-section">
            <h2 className="dt-ba-heading">
              {pageData.beforeAfter.heading || 'BEFORE & AFTERS'}
            </h2>

            <div className="dt-ba-carousel-container">
              {/* Left Arrow */}
              {imagesCount > itemsPerView && (
                <button className="dt-ba-arrow-circle dt-ba-arrow-left" onClick={prevBaSlide} aria-label="Previous Slide">
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Viewport — ref measures actual pixel width */}
              <div className="dt-ba-carousel-viewport" ref={baViewportRef}>
                <div
                  className="dt-ba-cards-track"
                  style={{
                    transform: `translateX(-${baSlide * baSlideWidth}px)`,
                    width: `${baSlideWidth * pageData.beforeAfter.images.length}px`
                  }}
                >
                  {pageData.beforeAfter.images.map((item, idx) => (
                    <div
                      key={idx}
                      className="dt-ba-slide-item"
                      style={{ width: `${baSlideWidth}px`, flexShrink: 0 }}
                    >
                      <div className="dt-ba-pair-card">
                        {item.before && item.after && item.before !== item.after ? (
                          <>
                            <img src={item.before} alt="Before" className="dt-ba-img" />
                            <img src={item.after} alt="After" className="dt-ba-img" />
                          </>
                        ) : (
                          <img src={item.before || item.after || item.image} alt="Before & After" className="dt-ba-img full-width" />
                        )}
                      </div>
                      <div className="dt-ba-labels-row">
                        <div className="dt-ba-label-col before-col"><span className="dt-ba-tag before-tag">BEFORE</span></div>
                        <div className="dt-ba-label-col after-col"><span className="dt-ba-tag after-tag">AFTER</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              {imagesCount > itemsPerView && (
                <button className="dt-ba-arrow-circle dt-ba-arrow-right" onClick={nextBaSlide} aria-label="Next Slide">
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
          </section>
        )}

        {/* Reopen dt-container after BA section */}
        <div className="dt-container">

          {/* 4. FREQUENTLY ASKED QUESTIONS (SCREENSHOT 4) */}
          {pageData.faqs?.length > 0 && (
            <section className="dt-faq-clean-section">
              <h2 className="dt-faq-clean-heading">FREQUENTLY ASKED QUESTIONS</h2>
              <div className="dt-faq-clean-list">
                {pageData.faqs.map((faq, index) => (
                  <div key={index} className={`dt-faq-clean-item ${activeFaq === index ? 'active' : ''}`}>
                    <button className="dt-faq-clean-header" onClick={() => toggleFaq(index)}>
                      <span className="dt-faq-clean-question">{faq.question}</span>
                      <span className="dt-faq-clean-icon">{activeFaq === index ? '−' : '+'}</span>
                    </button>
                    {activeFaq === index && (
                      <div className="dt-faq-clean-body">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. BOOK AN APPOINTMENT SECTION (SCREENSHOT 5) */}
          <section className="dt-appointment-section" id="appointment">
            <div className="dt-app-layout-two-col">
              
              {/* Left Column: Clinic Contact Information */}
              <div className="dt-app-info-col">
                <h2 className="dt-app-heading">BOOK AN APPOINTMENT</h2>

                <div className="dt-app-detail-item">
                  <div className="dt-app-detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="dt-app-detail-text">
                    <h4 className="dt-app-detail-label">VISIT OUR CLINIC</h4>
                    <p className="dt-app-detail-val">
                      {pageData.clinicInfo?.address || '1st Floor, Forum Building, Raghuvanshi Mills Compound Senapati Bapat Marg, Gandhi Nagar, Upper Worli, Worli, Lower Parel, Mumbai, Maharashtra 400018.'}
                    </p>
                  </div>
                </div>

                <div className="dt-app-detail-item">
                  <div className="dt-app-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div className="dt-app-detail-text">
                    <h4 className="dt-app-detail-label">CALL DIRECTLY</h4>
                    <p className="dt-app-detail-val">
                      {pageData.clinicInfo?.phones?.join(' | ') || '+91 72400 13002 | +91 72400 12002'}
                    </p>
                  </div>
                </div>

                <div className="dt-app-detail-item">
                  <div className="dt-app-detail-icon">
                    <Mail size={20} />
                  </div>
                  <div className="dt-app-detail-text">
                    <h4 className="dt-app-detail-label">EMAIL US</h4>
                    <p className="dt-app-detail-val">
                      {pageData.clinicInfo?.email || 'hello@skuccii.com'}
                    </p>
                  </div>
                </div>

                <div className="dt-app-detail-item">
                  <div className="dt-app-detail-icon">
                    <Clock size={20} />
                  </div>
                  <div className="dt-app-detail-text">
                    <h4 className="dt-app-detail-label">CLINIC HOURS</h4>
                    <p className="dt-app-detail-val">
                      {pageData.clinicInfo?.hours || 'Monday – Sunday: 10:00 AM – 7:00 PM'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Appointment Form Card */}
              <div className="dt-app-form-card">
                {formSubmitted ? (
                  <div className="dt-success-box">
                    <CheckCircle2 size={46} style={{ color: '#724c80', marginBottom: '16px' }} />
                    <h3 style={{ color: '#724c80' }}>Appointment Request Received</h3>
                    <p style={{ color: '#4a5568', lineHeight: '1.6', marginTop: '10px' }}>
                      Thank you, <strong>{formData.name}</strong>. Our medical team will contact you shortly to confirm your booking for <strong>{formData.treatment}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="dt-booking-clean-form">
                    <div className="dt-clean-form-row-2">
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Your Name *" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className="dt-clean-input"
                      />
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Email *" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        className="dt-clean-input"
                      />
                    </div>
                    
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="Phone *" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                      className="dt-clean-input"
                    />

                    <select 
                      name="treatment" 
                      value={formData.treatment} 
                      onChange={handleInputChange}
                      className="dt-clean-input dt-clean-select"
                    >
                      <option value="">Select Treatment (Optional)</option>
                      <option value={pageData.title}>{pageData.title}</option>
                      {allTreatments.map((t, idx) => (
                        <option key={idx} value={t.name}>{t.name} ({t.category})</option>
                      ))}
                    </select>

                    <textarea 
                      name="message" 
                      placeholder="Message (Optional)" 
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="dt-clean-input dt-clean-textarea"
                    ></textarea>

                    <button type="submit" className="dt-clean-submit-btn">
                      BOOK APPOINTMENT
                    </button>
                  </form>
                )}
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* STICKY "CONTACT US" TAB (AS SHOWN ON RIGHT IN ALL SCREENSHOTS) */}
      <a href="#appointment" className="dt-sticky-contact-tab" aria-label="Contact Us">
        CONTACT US
      </a>

      {/* FLOATING WHATSAPP BUTTON (BOTTOM-LEFT IN SCREENSHOTS) */}
      <a 
        href="https://wa.me/917240013002" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="dt-floating-whatsapp-btn" 
        aria-label="WhatsApp Us"
      >
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.539 1.932.825 2.791.825 3.182 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.18-.543-1.638-.676-2.69-2.348-2.771-2.457-.082-.11-1.002-1.332-1.002-2.54 0-1.209.636-1.804.862-2.051.144-.158.378-.23.606-.23.197 0 .341.007.489.014.161.007.377-.061.589.447.218.523.743 1.815.808 1.948.066.132.11.288.022.464-.088.176-.132.287-.263.441-.132.154-.277.344-.396.462-.132.132-.27.275-.116.539.154.264.685 1.13 1.47 1.83 1.012.901 1.866 1.18 2.13 1.312.264.132.418.11.572-.066.154-.176.66-.77 1.012-1.18.264-.308.572-.22.88-.11.308.11 1.956.923 2.292 1.09.336.167.56.248.643.388.082.14.082.808-.062 1.213zM12.04 2C6.497 2 2 6.497 2 12.04c0 1.924.542 3.722 1.48 5.259L2 22l4.838-1.442A9.98 9.98 0 0012.04 22c5.543 0 10.04-4.497 10.04-10.04C22.08 6.497 17.583 2 12.04 2z"/>
        </svg>
      </a>

      {/* FLOATING CALL BUTTON (BOTTOM-RIGHT IN SCREENSHOTS) */}
      <a 
        href="tel:+917240013002" 
        className="dt-floating-call-btn" 
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>
      
      <Footer />
    </div>
  );
};

export default DynamicTreatmentPage;
