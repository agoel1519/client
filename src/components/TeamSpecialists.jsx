import React, { useState, useEffect } from 'react';
import { 
  GraduationCap 
} from 'lucide-react';
import { getDbSetting } from '../api/mongoApi';
import './TeamSpecialists.css';

const defaultTeamData = {
  title: 'OUR TEAM OF',
  titleHighlight: 'SPECIALISTS',
  subtitle: 'Pioneering aesthetic medicine, surgical mastery, and longevity care led by globally qualified medical practitioners.',
  specialists: [
    {
      id: 1,
      name: 'Dr Misha Goel',
      role: 'Aesthetic Physician • Trained in UK',
      qualification: 'MBBS, MD, FFAC',
      experience: 'Aesthetic Physician',
      image: '/doctors/dr-misha-goel.jpg'
    },
    {
      id: 2,
      name: 'Dr Anupam Goel',
      role: 'Minimal Access Gastrointestinal, Bariatric (Weight-loss) & Robotic Surgeon',
      qualification: 'MBBS, MS, FNB',
      experience: 'Surgeon Specialist',
      image: '/doctors/dr-anupam-goel.jpg'
    }
  ]
};

const TeamSpecialists = () => {
  const [data, setData] = useState(defaultTeamData);

  const loadData = () => {
    getDbSetting('home_page').then((saved) => {
      if (saved && saved.teamSpecialists) {
        // If saved specialists still contain old template mock doctor "Vivek Anand", sanitize to user's doctors
        const specs = saved.teamSpecialists.specialists;
        const hasLegacyMock = specs && specs.some(s => s.name && (s.name.includes('Vivek Anand') || s.name.includes('Ananya Sharma')));
        if (hasLegacyMock) {
          setData(prev => ({ ...prev, ...saved.teamSpecialists, specialists: defaultTeamData.specialists }));
        } else {
          setData(prev => ({ ...prev, ...saved.teamSpecialists }));
        }
      }
    });
  };

  useEffect(() => {
    loadData();
    window.addEventListener('homeSettingsUpdated', loadData);
    return () => window.removeEventListener('homeSettingsUpdated', loadData);
  }, []);

  const docList = data.specialists && data.specialists.length > 0 ? data.specialists : defaultTeamData.specialists;

  return (
    <section className="team-section" id="doctors">
      <div className="team-container">
        {/* Section Header */}
        <div className="team-header">
          <h2 className="team-main-title">
            {data.title || 'OUR TEAM OF'} <span className="gold-text">{data.titleHighlight || 'SPECIALISTS'}</span>
          </h2>

          <p className="team-subtitle">
            {data.subtitle || defaultTeamData.subtitle}
          </p>
        </div>

        {/* 4 Specialists Grid */}
        <div className="team-grid">
          {docList.map((doc) => (
            <div key={doc.id} className="specialist-card">
              {/* Doctor Image Frame */}
              <div className="specialist-img-box">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="specialist-photo" 
                  loading="lazy"
                  decoding="async"
                />
                <span className="exp-badge">{doc.experience}</span>
              </div>

              {/* Doctor Information */}
              <div className="specialist-info">
                <h3 className="specialist-name">{doc.name}</h3>
                <p className="specialist-role">{doc.role}</p>

                <div className="specialist-qual">
                  <GraduationCap size={14} className="qual-icon" />
                  <span>{doc.qualification}</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSpecialists;
