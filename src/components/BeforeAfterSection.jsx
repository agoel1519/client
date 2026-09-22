import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal,
  Calendar, 
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import './BeforeAfterSection.css';

const transformationCases = [
  {
    id: 'case-1',
    category: 'skin',
    categoryLabel: 'Skin Rejuvenation',
    title: 'Laser Skin Resurfacing & Deep Pigment Correction',
    subtitle: 'Signature Clarity & Collagen Restoration',
    beforeImage: 'https://images.unsplash.com/photo-1512290900672-1f4865181754?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    sessions: '3 Sessions',
    duration: '6 Weeks Protocol',
    concerns: ['Melasma & Sun Damage', 'Uneven Texture', 'Enlarged Pores'],
    result: 'Significant reduction in epidermal pigmentation, 92% improvement in overall skin clarity and luminous texture.',
    downtime: 'Zero Downtime',
    doctor: 'Dr. Meghna Mour'
  },
  {
    id: 'case-2',
    category: 'contouring',
    categoryLabel: 'Facial Contouring',
    title: 'Non-Surgical Jawline Definition & Lower Face Lift',
    subtitle: 'High-Intensity Ultrasound & Micro-Current Alignment',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    sessions: '2 Sessions',
    duration: '4 Weeks Protocol',
    concerns: ['Submental Fullness', 'Loss of Jawline Sharpness', 'Mild Jowling'],
    result: 'Sharper mandibular angle, lifted lower facial contour, and stimulated neocollagenesis without surgery.',
    downtime: 'Zero Downtime',
    doctor: 'Dr. Meghna Mour'
  },
  {
    id: 'case-3',
    category: 'hair',
    categoryLabel: 'Hair Restoration',
    title: 'Advanced GFC & Scalp Bio-Stimulation Protocol',
    subtitle: 'Targeted Follicular Regeneration & Density Booster',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    sessions: '4 Sessions',
    duration: '3 Months Protocol',
    concerns: ['Crown Thinning', 'Early Hairline Recession', 'Weak Follicles'],
    result: 'Marked increase in hair shaft thickness, dormant follicle activation, and stabilized shedding.',
    downtime: 'Same Day Recovery',
    doctor: 'Dr. Meghna Mour'
  },
  {
    id: 'case-4',
    category: 'body',
    categoryLabel: 'Body Sculpting',
    title: 'EXION Deep Tissue RF & Lymphatic Body Contour',
    subtitle: 'Abdominal Tightening & Localized Adipose Reduction',
    beforeImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80',
    sessions: '4 Sessions',
    duration: '8 Weeks Protocol',
    concerns: ['Postpartum Skin Laxity', 'Stubborn Flank Fat', 'Loss of Firmness'],
    result: 'Up to 22% reduction in subcutaneous adipose layer with 41% boost in hyaluronic acid & collagen density.',
    downtime: 'Zero Downtime',
    doctor: 'Dr. Meghna Mour'
  }
];

const BeforeAfterSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCase, setSelectedCase] = useState(transformationCases[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const filterTabs = [
    { id: 'all', label: 'All Cases' },
    { id: 'skin', label: 'Skin Rejuvenation' },
    { id: 'contouring', label: 'Facial Contouring' },
    { id: 'hair', label: 'Hair Restoration' },
    { id: 'body', label: 'Body Sculpting' }
  ];

  const filteredCases = activeTab === 'all' 
    ? transformationCases 
    : transformationCases.filter(c => c.category === activeTab);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const positionPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(positionPercentage);
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="before-after-section" id="results">
      <div className="ba-container">
        
        {/* Section Header */}
        <div className="ba-header">
          <div className="ba-subtitle-badge">
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>CLINICALLY PROVEN OUTCOMES</span>
          </div>
          <h2 className="ba-title">
            Real Transformations, <span>Naturally Undetectable</span>
          </h2>
          <p className="ba-desc">
            Explore authentic clinical case studies showcasing our nuanced, non-surgical approaches. 
            Drag the interactive slider to view real patient outcomes.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="ba-filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`ba-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                const matched = tab.id === 'all' 
                  ? transformationCases[0] 
                  : transformationCases.find(c => c.category === tab.id);
                if (matched) setSelectedCase(matched);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Master Comparison Showcase */}
        <div className="ba-showcase-card">
          {/* Left / Center: Interactive Drag Slider */}
          <div className="ba-slider-container">
            <div 
              className="ba-interactive-viewer" 
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Background) */}
              <div className="ba-image-layer after-layer">
                <img 
                  src={selectedCase.afterImage} 
                  alt={`${selectedCase.title} After Result`} 
                  className="ba-img"
                  draggable="false"
                />
                <span className="ba-tag after-tag">AFTER</span>
              </div>

              {/* Before Image (Clipped Overlay) */}
              <div 
                className="ba-image-layer before-layer"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img 
                  src={selectedCase.beforeImage} 
                  alt={`${selectedCase.title} Before Treatment`} 
                  className="ba-img"
                  draggable="false"
                />
                <span className="ba-tag before-tag">BEFORE</span>
              </div>

              {/* Drag Handle Divider */}
              <div 
                className="ba-slider-handle"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="handle-line"></div>
                <div className="handle-button">
                  <span className="handle-chevron">&lsaquo;</span>
                  <span className="handle-chevron">&rsaquo;</span>
                </div>
                <div className="handle-line"></div>
              </div>
            </div>

            <div className="ba-drag-hint">
              <SlidersHorizontal size={14} />
              <span>Drag slider or click anywhere to compare Before & After</span>
            </div>
          </div>

          {/* Right: Detailed Case Information */}
          <div className="ba-details-pane">
            <div className="ba-case-header">
              <span className="ba-case-category">{selectedCase.categoryLabel}</span>
              <h3 className="ba-case-title">{selectedCase.title}</h3>
              <p className="ba-case-subtitle">{selectedCase.subtitle}</p>
            </div>

            {/* Quick Metrics */}
            <div className="ba-metrics-grid">
              <div className="ba-metric-item">
                <div className="metric-icon-wrap">
                  <Layers size={16} />
                </div>
                <div>
                  <span className="metric-label">Treatment Plan</span>
                  <strong className="metric-val">{selectedCase.sessions}</strong>
                </div>
              </div>

              <div className="ba-metric-item">
                <div className="metric-icon-wrap">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="metric-label">Timeline</span>
                  <strong className="metric-val">{selectedCase.duration}</strong>
                </div>
              </div>

              <div className="ba-metric-item">
                <div className="metric-icon-wrap">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <span className="metric-label">Recovery</span>
                  <strong className="metric-val">{selectedCase.downtime}</strong>
                </div>
              </div>
            </div>

            {/* Clinical Concerns Addressed */}
            <div className="ba-concerns-box">
              <span className="concerns-heading">Key Indications Treated:</span>
              <div className="concerns-list">
                {selectedCase.concerns.map((c, i) => (
                  <span key={i} className="concern-pill">
                    <CheckCircle2 size={13} className="concern-check" />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinical Result Note */}
            <div className="ba-result-summary">
              <p className="result-text">
                <strong>Clinical Observation:</strong> {selectedCase.result}
              </p>
            </div>

            {/* CTA Button */}
            <div className="ba-action-row">
              <a href="#appointment" className="ba-consult-btn">
                <span>Book a Consultation for This Treatment</span>
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Case Studies Selector Thumbnails Grid */}
        <div className="ba-thumbnails-section">
          <div className="ba-thumb-header">
            <h4>Select a Clinical Case Study</h4>
            <span className="ba-thumb-count">{filteredCases.length} Cases Available</span>
          </div>

          <div className="ba-cases-grid">
            {filteredCases.map((item) => (
              <div 
                key={item.id}
                className={`ba-case-card ${selectedCase.id === item.id ? 'active-case' : ''}`}
                onClick={() => {
                  setSelectedCase(item);
                  setSliderPosition(50);
                }}
              >
                <div className="ba-card-dual-preview">
                  <div className="card-thumb-half">
                    <img src={item.beforeImage} alt="Before preview" />
                    <span className="thumb-label">Before</span>
                  </div>
                  <div className="card-thumb-half">
                    <img src={item.afterImage} alt="After preview" />
                    <span className="thumb-label gold">After</span>
                  </div>
                </div>

                <div className="ba-card-body">
                  <span className="ba-card-badge">{item.categoryLabel}</span>
                  <h5 className="ba-card-title">{item.title}</h5>
                  <div className="ba-card-meta">
                    <span>{item.sessions}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                  <div className="ba-card-select-link">
                    <span>View Transformation</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance & Medical Disclaimer */}
        <div className="ba-disclaimer-box">
          <p>
            <strong>Medical Disclaimer:</strong> Before and after photographs reflect real outcomes of individual patients treated at Aevora Clinic. Results may vary depending on patient anatomy, age, lifestyle, and individual biological response. A comprehensive in-person consultation is conducted prior to every medical aesthetic procedure.
          </p>
        </div>

      </div>
    </section>
  );
};

export default BeforeAfterSection;
