import React from 'react';
import { 
  Calendar, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Stethoscope, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import './TeamSpecialists.css';

const specialists = [
  {
    id: 1,
    name: 'Dr. Vivek Anand',
    role: 'Chief Consultant Dermatologist',
    qualification: 'MD, DNB (Dermatology) • Global Fellow',
    experience: '16+ Years Experience',
    specialties: ['Laser Fotona 4D', 'Ultherapy Prime', 'Pigmentation & Acne'],
    image: '/doctors/team-doc-1.jpg'
  },
  {
    id: 2,
    name: 'Dr. Ananya Sharma',
    role: 'Senior Aesthetic Physician & Injector',
    qualification: 'MBBS, FAM (Aesthetic Medicine - UK)',
    experience: '12+ Years Experience',
    specialties: ['Dermal Fillers', 'Botox & Threads', 'Liquid Facelift'],
    image: '/doctors/team-doc-2.jpg'
  },
  {
    id: 3,
    name: 'Dr. Kabir Oberoi',
    role: 'Consultant Plastic & Reconstructive Surgeon',
    qualification: 'MS, MCh (Plastic Surgery)',
    experience: '18+ Years Experience',
    specialties: ['Body Contouring', 'Blepharoplasty', 'Facial Sculpting'],
    image: '/doctors/team-doc-3.jpg'
  },
  {
    id: 4,
    name: 'Dr. Priya Singhania',
    role: 'Lead Trichologist & Hair Transplant Surgeon',
    qualification: 'MD, Member ISHRS (USA)',
    experience: '14+ Years Experience',
    specialties: ['FUE Mega Transplant', 'Exosome Hair Revival', 'PRP Therapy'],
    image: '/doctors/team-doc-4.jpg'
  }
];

const TeamSpecialists = () => {
  return (
    <section className="team-section" id="doctors">
      <div className="team-container">
        {/* Section Header */}
        <div className="team-header">
          <div className="team-badge">
            <Stethoscope size={14} className="team-badge-icon" />
            <span>MEDICAL MASTERY & CARE</span>
          </div>

          <h2 className="team-main-title">
            OUR TEAM OF <span className="gold-text">SPECIALISTS</span>
          </h2>

          <p className="team-subtitle">
            World-renowned aesthetic physicians, board-certified dermatologists, and reconstructive surgeons dedicated to your bespoke transformation.
          </p>
        </div>

        {/* 4 Specialists Grid */}
        <div className="team-grid">
          {specialists.map((doc) => (
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

                {/* Specialties Tags */}
                <div className="specialties-tags">
                  {doc.specialties.map((spec, sIdx) => (
                    <span key={sIdx} className="spec-pill">{spec}</span>
                  ))}
                </div>

                {/* Book Consultation Button */}
                <a href="#book" className="specialist-book-btn">
                  <Calendar size={14} />
                  <span>Book Consultation</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSpecialists;
