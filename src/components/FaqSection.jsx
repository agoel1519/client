import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Sparkles, 
  HelpCircle, 
  MessageCircle, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import './FaqSection.css';

const faqData = [
  {
    id: 1,
    category: 'general',
    question: 'What makes Aevora by Kian Clinics different from other aesthetic clinics?',
    answer: 'At Aevora, we adhere to the philosophy of "Natural Outcomes & Undetectable Refinement." Every treatment plan is personally curated by certified dermatologists and aesthetic physicians using US FDA-cleared technology. We never offer one-size-fits-all packages; every protocol is engineered around your unique facial anatomy, skin tone, and wellness objectives.'
  },
  {
    id: 2,
    category: 'treatments',
    question: 'Are treatments painful, and will there be visible downtime or bruising?',
    answer: 'Most of our flagship procedures—including Medi-Facials, Laser Pigment Toning, Exion RF Contouring, and IV Wellness Drips—are non-invasive, virtually painless, and require zero downtime. You can comfortably return to work, events, or daily routines immediately following your session.'
  },
  {
    id: 3,
    category: 'consultation',
    question: 'How do I know which treatment is right for my specific skin or hair concerns?',
    answer: 'Your aesthetic journey begins with a comprehensive, private 1-on-1 clinical consultation. Our specialists conduct an in-depth dermal analysis, review your medical history, and evaluate your goals before designing a bespoke treatment blueprint.'
  },
  {
    id: 4,
    category: 'safety',
    question: 'Are all machines, lasers, and injectable products US FDA-approved?',
    answer: 'Yes, absolutely. Safety, sterility, and international compliance are our highest priorities. All laser systems, ultrasound platforms (BTL EXION, etc.), and clinical injectables used at Aevora are 100% genuine, US FDA-approved, and procured through authorized medical channels.'
  },
  {
    id: 5,
    category: 'treatments',
    question: 'How many sessions are typically required to see noticeable results?',
    answer: 'Instant-glow treatments like our Medi-Facials, Chemical Peels, and IV Infusions deliver immediate radiance after just 1 session. For structural rejuvenation such as Hair Regrowth (GFC), Skin Resurfacing, or Jawline Tightening, a structured course of 3 to 6 sessions spaced 3–4 weeks apart delivers optimal, long-lasting outcomes.'
  },
  {
    id: 6,
    category: 'treatments',
    question: 'Can I combine multiple aesthetic or wellness treatments in a single visit?',
    answer: 'Yes! Our doctors frequently design "Same-Day Combination Therapies"—such as pairing a laser skin rejuvenation with an IV longevity infusion—to maximize clinical synergy and save valuable time for our busy clients.'
  },
  {
    id: 7,
    category: 'consultation',
    question: 'How can I schedule a consultation, and where is the clinic located?',
    answer: 'You can easily schedule a consultation by clicking the "Book Appointment" button on our website, messaging our concierge directly on WhatsApp, or calling our clinic reception. Our flagship clinic is centrally located in Sector 5, Panchkula with private valet parking and dedicated VIP consultation suites.'
  }
];

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(1); // First item open by default
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'About Clinic' },
    { id: 'treatments', label: 'Treatments & Results' },
    { id: 'safety', label: 'Safety & Technology' },
    { id: 'consultation', label: 'Appointments' }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleFaq = (id) => {
    setOpenFaq(prev => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        
        {/* Header */}
        <div className="faq-header">
          <h2 className="faq-title">
            Frequently Asked <span>Questions</span>
          </h2>

          <p className="faq-subtitle">
            Everything you need to know about our specialized clinical treatments, 
            safety standards, and consultation process.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="faq-filter-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`faq-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Content Layout: FAQ Accordion + Quick Help Card */}
        <div className="faq-main-layout">
          
          {/* Accordion List */}
          <div className="faq-accordion-list">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`faq-item-card ${isOpen ? 'is-open' : ''}`}
                >
                  <button 
                    className="faq-question-btn"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-index-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <div className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}>
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Help / Concierge Side Card */}
          <div className="faq-concierge-sidebar">
            <div className="concierge-card">
              <div className="concierge-icon-box">
                <HelpCircle size={28} />
              </div>

              <h3 className="concierge-card-title">Still have questions?</h3>
              <p className="concierge-card-desc">
                Our medical concierge and patient care specialists are here to guide you with personalized advice.
              </p>

              <div className="concierge-actions">
                <a 
                  href="https://wa.me/919136100000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="concierge-btn whatsapp-btn"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </a>

                <a 
                  href="#appointment" 
                  className="concierge-btn appointment-btn"
                >
                  <PhoneCall size={18} />
                  <span>Book a Consultation</span>
                </a>
              </div>

              <div className="concierge-trust-note">
                <ShieldCheck size={16} />
                <span>100% Confidential & Physician Led</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqSection;
