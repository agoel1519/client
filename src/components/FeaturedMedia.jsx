import React from 'react';
import './FeaturedMedia.css';

const logosList = [
  {
    name: 'VOGUE',
    svg: (
      <svg viewBox="0 0 160 38" className="featured-brand-svg">
        <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Didot', 'Playfair Display', serif" fontSize="34" fontWeight="800" letterSpacing="4" fill="#000000">
          VOGUE
        </text>
      </svg>
    )
  },
  {
    name: 'zoom',
    svg: (
      <svg viewBox="0 0 140 38" className="featured-brand-svg">
        <g fill="#E31E24">
          {/* ZOOM RED BRAND */}
          <text x="50%" y="74%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="32" fontWeight="900" letterSpacing="0">
            z<tspan fill="#E31E24" fontSize="36">O</tspan>OM
          </text>
        </g>
      </svg>
    )
  },
  {
    name: 'mid-day',
    svg: (
      <svg viewBox="0 0 140 38" className="featured-brand-svg">
        <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Arial Black', 'Montserrat', sans-serif" fontSize="24" fontWeight="900" fill="#0066B2">
          mid<tspan fill="#E31E24">·</tspan>day
        </text>
      </svg>
    )
  },
  {
    name: 'abp',
    svg: (
      <svg viewBox="0 0 150 40" className="featured-brand-svg">
        <g transform="translate(15, 4)">
          {/* ABP Red Arrow Shape */}
          <path d="M14 0 L28 28 L0 28 Z" fill="#D31F26" />
          <text x="42" y="24" fontFamily="'Arial Black', sans-serif" fontSize="26" fontWeight="900" fill="#D31F26">
            abp
          </text>
        </g>
      </svg>
    )
  },
  {
    name: 'THE TIMES OF INDIA',
    svg: (
      <svg viewBox="0 0 180 44" className="featured-brand-svg">
        <rect x="0" y="2" width="180" height="40" fill="#C8232C" rx="2" />
        <text x="90" y="19" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="13" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
          THE TIMES
        </text>
        <text x="90" y="34" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="13" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
          OF INDIA
        </text>
      </svg>
    )
  },
  {
    name: 'INDIA TODAY',
    svg: (
      <svg viewBox="0 0 120 38" className="featured-brand-svg">
        <text x="60" y="16" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontSize="10" fontWeight="900" fill="#990000" letterSpacing="1">
          INDIA
        </text>
        <text x="60" y="29" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontSize="13" fontWeight="900" fill="#990000" letterSpacing="1.5">
          TODAY
        </text>
      </svg>
    )
  },
  {
    name: 'Forbes',
    svg: (
      <svg viewBox="0 0 140 38" className="featured-brand-svg">
        <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Georgia', 'Times New Roman', serif" fontSize="30" fontWeight="800" fill="#000000">
          Forbes
        </text>
      </svg>
    )
  },
  {
    name: 'ELLE',
    svg: (
      <svg viewBox="0 0 120 38" className="featured-brand-svg">
        <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Didot', serif" fontSize="32" fontWeight="800" letterSpacing="4" fill="#000000">
          ELLE
        </text>
      </svg>
    )
  },
  {
    name: 'GRAZIA',
    svg: (
      <svg viewBox="0 0 140 38" className="featured-brand-svg">
        <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Bodoni MT', serif" fontSize="28" fontWeight="800" letterSpacing="3" fill="#000000">
          GRAZIA
        </text>
      </svg>
    )
  }
];

const FeaturedMedia = () => {
  // Duplicate array for infinite seamless marquee slide
  const marqueeItems = [...logosList, ...logosList];

  return (
    <section className="featured-media-section" id="media">
      <div className="featured-media-container">
        
        {/* Section Title */}
        <h2 className="featured-section-title">
          FEATURED ON
        </h2>

        {/* Infinite Sliding Logo Track */}
        <div className="featured-logos-slider-track-wrap">
          <div className="featured-logos-slider-track">
            {marqueeItems.map((item, index) => (
              <div key={index} className="featured-logo-item">
                {item.svg}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedMedia;
