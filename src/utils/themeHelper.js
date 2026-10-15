/**
 * Dynamic Theme & Typography Engine for Aevora
 * Automatically fetches and injects Google Fonts on-the-fly and synchronizes styling
 */
import { getDbSetting } from '../api/mongoApi';

export const defaultTheme = {
  emerald: "#0d382c",
  emeraldDark: "#07221a",
  emeraldLight: "#164e3e",
  gold: "#c59d5f",
  goldHover: "#b38a4d",
  goldLight: "#ffd899",
  sageBg: "#f4f8f5",
  darkText: "#111e19",
  bodyText: "#4b5e55",
  fontMain: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  fontSerif: "'Playfair Display', Georgia, serif",
  fontOutfit: "'Outfit', sans-serif",
  baseFontSize: "16px",
  headingScale: "1.0",
  headingWeight: "600",
  headingLetterSpacing: "normal",
  headingLineHeight: "1.25",
  customCss: ""
};

/**
 * Dynamically loads any Google Font directly into <head>
 */
export const loadGoogleFont = (fontFamilyString) => {
  if (!fontFamilyString || typeof fontFamilyString !== 'string') return;
  if (fontFamilyString === 'default') return;

  // Extract clean primary font name (e.g. "'Cormorant Garamond', serif" -> "Cormorant Garamond")
  const primaryName = fontFamilyString.split(',')[0].replace(/['"]/g, '').trim();
  const systemFonts = [
    'system-ui', '-apple-system', 'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy',
    'arial', 'helvetica', 'times new roman', 'times', 'georgia', 'courier new', 'verdana', 'tahoma',
    'inherit', 'initial'
  ];

  if (!primaryName || systemFonts.includes(primaryName.toLowerCase())) {
    return;
  }

  const safeId = `google-font-${primaryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  if (!document.getElementById(safeId)) {
    const link = document.createElement('link');
    link.id = safeId;
    link.rel = 'stylesheet';
    const formattedFont = encodeURIComponent(primaryName).replace(/%20/g, '+');
    // Try rich weights first, fallback to basic family if weights don't exist
    link.href = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@300;400;500;600;700;800&display=swap`;
    link.onerror = () => {
      link.href = `https://fonts.googleapis.com/css2?family=${formattedFont}&display=swap`;
    };
    document.head.appendChild(link);
  }
};

export const applyThemeToDom = (theme) => {
  if (!theme) return;
  const root = document.documentElement;

  // 1. Dynamically download Google Fonts for headings, body, and accents
  if (theme.fontSerif) loadGoogleFont(theme.fontSerif);
  if (theme.fontMain) loadGoogleFont(theme.fontMain);
  if (theme.fontOutfit) loadGoogleFont(theme.fontOutfit);
  
  // 2. Set Typography CSS Custom Properties on :root
  if (theme.fontSerif) {
    root.style.setProperty('--font-serif', theme.fontSerif);
    root.style.setProperty('--font-playfair', theme.fontSerif);
    root.style.setProperty('--font-heading', theme.fontSerif);
  }
  if (theme.fontMain) {
    root.style.setProperty('--font-main', theme.fontMain);
    root.style.setProperty('--font-body', theme.fontMain);
  }
  if (theme.fontOutfit) {
    root.style.setProperty('--font-outfit', theme.fontOutfit);
  }

  // 3. Set Color CSS Custom Properties
  if (theme.emerald) root.style.setProperty('--aevora-emerald', theme.emerald);
  if (theme.emeraldDark) root.style.setProperty('--aevora-emerald-dark', theme.emeraldDark);
  if (theme.emeraldLight) root.style.setProperty('--aevora-emerald-light', theme.emeraldLight);
  if (theme.gold) root.style.setProperty('--aevora-gold', theme.gold);
  if (theme.goldHover) root.style.setProperty('--aevora-gold-hover', theme.goldHover);
  if (theme.goldLight) root.style.setProperty('--aevora-gold-light', theme.goldLight);
  if (theme.sageBg) root.style.setProperty('--aevora-sage-bg', theme.sageBg);
  if (theme.darkText) root.style.setProperty('--aevora-dark-text', theme.darkText);
  if (theme.bodyText) root.style.setProperty('--aevora-body-text', theme.bodyText);

  // 4. Set Sizing & Font Scales
  if (theme.baseFontSize) {
    root.style.fontSize = theme.baseFontSize;
    root.style.setProperty('--base-font-size', theme.baseFontSize);
  }
  if (theme.headingScale) {
    root.style.setProperty('--heading-scale', theme.headingScale);
  }
  if (theme.headingWeight) {
    root.style.setProperty('--heading-weight', theme.headingWeight);
  }
  if (theme.headingLetterSpacing) {
    root.style.setProperty('--heading-letter-spacing', theme.headingLetterSpacing);
  }
  if (theme.headingLineHeight) {
    root.style.setProperty('--heading-line-height', theme.headingLineHeight);
  }

  // 5. Universal Typography Style Tag Enforcement
  let typoStyleEl = document.getElementById('aevora-universal-typography');
  if (!typoStyleEl) {
    typoStyleEl = document.createElement('style');
    typoStyleEl.id = 'aevora-universal-typography';
    document.head.appendChild(typoStyleEl);
  }
  
  const headingFont = theme.fontSerif || "'Playfair Display', Georgia, serif";
  const bodyFont = theme.fontMain || "'Plus Jakarta Sans', system-ui, sans-serif";
  const accentFont = theme.fontOutfit || bodyFont;
  const weight = theme.headingWeight || '600';
  const spacing = theme.headingLetterSpacing || 'normal';
  const lineHeight = theme.headingLineHeight || '1.25';

  typoStyleEl.innerHTML = `
    h1, h2, h3, h4, h5, h6,
    .hero-title, .section-heading, .section-title,
    .slide-title, .doctor-name, .expert-name,
    .treatment-title, .testimonial-title, .faq-question,
    .contact-page-title, .blog-hero-title, .about-hero-title,
    .contact-heading, .privilege-title, .footer-heading,
    .dt-title, .about-intro-heading, .experts-section-title,
    .press-section-title, .story-quote, .value-card h3 {
      font-family: ${headingFont} !important;
      font-weight: ${weight} !important;
      letter-spacing: ${spacing} !important;
      line-height: ${lineHeight} !important;
    }
    body, p, li, label, input, textarea, select, .contact-details p, .about-lead, .blog-card-excerpt {
      font-family: ${bodyFont} !important;
    }
    .footer, .footer-nav a, .btn-primary, .btn-secondary, .slide-badge, .dt-badge, .pill-badge {
      font-family: ${accentFont};
    }
  `;

  // 6. Inject or update custom CSS overrides
  let customStyleEl = document.getElementById('aevora-dynamic-css');
  if (theme.customCss && theme.customCss.trim()) {
    if (!customStyleEl) {
      customStyleEl = document.createElement('style');
      customStyleEl.id = 'aevora-dynamic-css';
      document.head.appendChild(customStyleEl);
    }
    customStyleEl.innerHTML = theme.customCss;
  } else if (customStyleEl) {
    customStyleEl.innerHTML = '';
  }
};

export const initGlobalTheme = () => {
  // Apply default theme immediately so values are always present
  applyThemeToDom(defaultTheme);

  // Check fast local storage cache
  const cached = localStorage.getItem('aevora_theme_settings');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      applyThemeToDom({ ...defaultTheme, ...parsed });
    } catch (e) {}
  }

  // Fetch from database/backend
  getDbSetting('global_theme_settings').then(saved => {
    if (saved) {
      const merged = { ...defaultTheme, ...saved };
      applyThemeToDom(merged);
      localStorage.setItem('aevora_theme_settings', JSON.stringify(merged));
    }
  }).catch(() => {});

  window.addEventListener('themeSettingsUpdated', (e) => {
    if (e.detail) {
      applyThemeToDom({ ...defaultTheme, ...e.detail });
    } else {
      getDbSetting('global_theme_settings').then(saved => {
        if (saved) applyThemeToDom({ ...defaultTheme, ...saved });
      });
    }
  });
};
