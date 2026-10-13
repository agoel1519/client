import React, { useState, useEffect } from 'react';
import { getDbSetting } from '../api/mongoApi';
import './FeaturedMedia.css';

export const defaultBrandSvgs = {
  'VOGUE': (
    <svg viewBox="0 0 160 38" className="featured-brand-svg">
      <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Didot', 'Playfair Display', serif" fontSize="34" fontWeight="800" letterSpacing="4" fill="#000000">
        VOGUE
      </text>
    </svg>
  ),
  'zoom': (
    <svg viewBox="0 0 140 38" className="featured-brand-svg">
      <g fill="#E31E24">
        <text x="50%" y="74%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="32" fontWeight="900" letterSpacing="0">
          z<tspan fill="#E31E24" fontSize="36">O</tspan>OM
        </text>
      </g>
    </svg>
  ),
  'mid-day': (
    <svg viewBox="0 0 140 38" className="featured-brand-svg">
      <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Arial Black', 'Montserrat', sans-serif" fontSize="24" fontWeight="900" fill="#0066B2">
        mid<tspan fill="#E31E24">·</tspan>day
      </text>
    </svg>
  ),
  'abp': (
    <svg viewBox="0 0 150 40" className="featured-brand-svg">
      <g transform="translate(15, 4)">
        <path d="M14 0 L28 28 L0 28 Z" fill="#D31F26" />
        <text x="42" y="24" fontFamily="'Arial Black', sans-serif" fontSize="26" fontWeight="900" fill="#D31F26">
          abp
        </text>
      </g>
    </svg>
  ),
  'THE TIMES OF INDIA': (
    <svg viewBox="0 0 180 44" className="featured-brand-svg">
      <rect x="0" y="2" width="180" height="40" fill="#C8232C" rx="2" />
      <text x="90" y="19" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="13" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
        THE TIMES
      </text>
      <text x="90" y="34" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="13" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
        OF INDIA
      </text>
    </svg>
  ),
  'INDIA TODAY': (
    <svg viewBox="0 0 120 38" className="featured-brand-svg">
      <text x="60" y="16" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontSize="10" fontWeight="900" fill="#990000" letterSpacing="1">
        INDIA
      </text>
      <text x="60" y="29" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontSize="13" fontWeight="900" fill="#990000" letterSpacing="1.5">
        TODAY
      </text>
    </svg>
  ),
  'Forbes': (
    <svg viewBox="0 0 140 38" className="featured-brand-svg">
      <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Georgia', 'Times New Roman', serif" fontSize="30" fontWeight="800" fill="#000000">
        Forbes
      </text>
    </svg>
  ),
  'ELLE': (
    <svg viewBox="0 0 120 38" className="featured-brand-svg">
      <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Didot', serif" fontSize="32" fontWeight="800" letterSpacing="4" fill="#000000">
        ELLE
      </text>
    </svg>
  ),
  'GRAZIA': (
    <svg viewBox="0 0 140 38" className="featured-brand-svg">
      <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Bodoni MT', serif" fontSize="28" fontWeight="800" letterSpacing="3" fill="#000000">
        GRAZIA
      </text>
    </svg>
  )
};

export const defaultMediaLogos = [
  { id: 1, name: 'Forbes', image: '' },
  { id: 2, name: 'ELLE', image: '' },
  { id: 3, name: 'GRAZIA', image: '' },
  { id: 4, name: 'VOGUE', image: '' },
  { id: 5, name: 'zoom', image: '' },
  { id: 6, name: 'mid-day', image: '' },
  { id: 7, name: 'abp', image: '' },
  { id: 8, name: 'THE TIMES OF INDIA', image: '' },
  { id: 9, name: 'INDIA TODAY', image: '' }
];

export const defaultFeaturedData = {
  title: 'FEATURED ON',
  logos: defaultMediaLogos
};

export const renderBrandLogo = (item) => {
  if (item && item.image) {
    return <img src={item.image} alt={item.name || 'Brand Logo'} className="featured-brand-img" />;
  }
  const match = Object.keys(defaultBrandSvgs).find(
    k => k.toLowerCase() === (item.name || '').toLowerCase()
  );
  if (match) {
    return defaultBrandSvgs[match];
  }
  return (
    <span className="featured-brand-text-fallback">
      {item.name || 'Brand'}
    </span>
  );
};

const FeaturedMedia = () => {
  const [data, setData] = useState(defaultFeaturedData);

  const loadData = () => {
    getDbSetting('home_page').then((saved) => {
      if (saved && saved.featuredMedia) {
        setData(prev => ({
          ...prev,
          title: saved.featuredMedia.title || defaultFeaturedData.title,
          logos: Array.isArray(saved.featuredMedia.logos) && saved.featuredMedia.logos.length > 0
            ? saved.featuredMedia.logos
            : defaultMediaLogos
        }));
      }
    });
  };

  useEffect(() => {
    loadData();
    window.addEventListener('homeSettingsUpdated', loadData);
    return () => window.removeEventListener('homeSettingsUpdated', loadData);
  }, []);

  const logos = data.logos && data.logos.length > 0 ? data.logos : defaultMediaLogos;
  const marqueeItems = [...logos, ...logos];

  return (
    <section className="featured-media-section" id="media">
      <div className="featured-media-container">
        
        {/* Section Title */}
        <h2 className="featured-section-title">
          {data.title || defaultFeaturedData.title}
        </h2>

        {/* Infinite Sliding Logo Track */}
        <div className="featured-logos-slider-track-wrap">
          <div className="featured-logos-slider-track">
            {marqueeItems.map((item, index) => (
              <div key={`${item.id || index}-${index}`} className="featured-logo-item">
                {renderBrandLogo(item)}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedMedia;
