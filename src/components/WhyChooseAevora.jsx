import React, { useState } from 'react';
import { getDbSetting, saveDbSetting } from '../api/mongoApi';
import { 
  Sliders, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Award,
  Users,
  Activity
} from 'lucide-react';
import './WhyChooseAevora.css';

const features = [
  {
    id: 1,
    icon: Sliders,
    title: 'Tailored Approach',
    tagline: 'Every treatment is designed around you',
    description: 'We reject one-size-fits-all solutions. Each protocol begins with comprehensive facial and body mapping to craft a bespoke treatment plan unique to your anatomy and goals.',
    colorAccent: 'rgba(197, 157, 95, 0.15)'
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Clinical Expertise',
    tagline: 'Led by experienced specialists',
    description: 'Our team comprises board-certified aesthetic physicians, master dermatologists, and trichologists dedicated to the highest standards of safety, ethics, and medical mastery.',
    colorAccent: 'rgba(13, 56, 44, 0.15)'
  },
  {
    id: 3,
    icon: Cpu,
    title: 'Advanced Technology',
    tagline: 'Globally recognised systems',
    description: 'Powered by world-leading US-FDA approved aesthetic workstations, including Ultherapy Prime, Fotona 4D, Emsculpt NEO, and medical-grade cellular diagnostics.',
    colorAccent: 'rgba(6, 182, 212, 0.15)'
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Natural Outcomes',
    tagline: 'Refinement without obvious change',
    description: 'Our philosophy centers on undetectable elegance. We enhance and restore your natural contours, delivering refreshed youthfulness without visible artificial alteration.',
    colorAccent: 'rgba(16, 185, 129, 0.15)'
  }
];

const defaultStats = [
  { value: '15,000+', label: 'Successful Procedures' },
  { value: '100%', label: 'US-FDA Approved Tech' },
  { value: '15+ Yrs', label: 'Clinical Experience' },
  { value: '99.4%', label: 'Patient Satisfaction' }
];

const WhyChooseAevora = () => {
  const [content, setContent] = useState({
    title: 'Why Choose',
    titleHighlight: 'AEVORA',
    subtitle: 'Redefining aesthetic excellence through customized clinical science, world-class technology, and harmonized natural results.',
    stats: defaultStats,
    pillars: features
  });

  const loadContent = () => {
    getDbSetting('home_page').then((saved) => {
      if (saved && saved.whyChoose) {
        setContent(prev => ({ 
          ...prev, 
          ...saved.whyChoose, 
          stats: saved.whyChoose.stats || prev.stats,
          pillars: saved.whyChoose.pillars || prev.pillars 
        }));
      }
    });
  };

  React.useEffect(() => {
    loadContent();
    window.addEventListener('homeSettingsUpdated', loadContent);
    return () => window.removeEventListener('homeSettingsUpdated', loadContent);
  }, []);

  const currentPillars = content.pillars && content.pillars.length > 0 ? content.pillars : features;

  return (
    <section className="why-choose-section" id="why-choose-us">
      <div className="why-choose-container">
        {/* Section Header */}
        <div className="why-choose-header">
          <h2 className="why-choose-title">
            {content.title} <span className="gold-text">{content.titleHighlight}</span>
          </h2>
          <p className="why-choose-subtitle">
            {content.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="pillars-grid">
          {currentPillars.map((item, index) => {
            const IconComponent = item.icon || Sparkles;
            return (
              <div key={item.id} className="pillar-card">
                <div className="card-top-row">
                  <div className="pillar-icon-box">
                    <IconComponent size={26} className="pillar-icon" />
                  </div>
                  <span className="pillar-number">0{index + 1}</span>
                </div>

                <h3 className="pillar-title">{item.title}</h3>
                <h4 className="pillar-tagline">{item.tagline}</h4>
                <p className="pillar-desc">{item.description}</p>

                <div className="pillar-card-footer">
                  <span className="pillar-check">
                    <CheckCircle2 size={15} color="#10b981" />
                    <span>Gold Standard Care</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Metrics / Stats Bar - Hidden as requested */}
      </div>
    </section>
  );
};

export default WhyChooseAevora;
