/**
 * Aevora Clinical Services Catalog
 * Single unified listing of all 27 specialized medical and aesthetic services
 */
import { API_BASE } from '../config/api';

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\+/g, '-plus-')
    .replace(/&/g, '-and-')
    .replace(/[\/\(\)\.,]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Unified services list (27 services with no category separation)
export const allServicesList = [
  { name: 'Laser Hair Reduction', slug: 'laser-hair-reduction' },
  { name: 'Hydrafacials / Medifacials', slug: 'hydrafacials-medifacials' },
  { name: 'Laser Facial Toning (for Glow / Whitening / Acne scars / Korean Glass Skin)', slug: 'laser-facial-toning' },
  { name: 'De-Tan / De-pigmentation', slug: 'de-tan-de-pigmentation' },
  { name: 'Tattoo Removal', slug: 'tattoo-removal' },
  { name: 'Scar or mole removal', slug: 'scar-or-mole-removal' },
  { name: 'Glass-skin Clear Axilla / Neck / Elbow / Knee', slug: 'glass-skin-clear-body' },
  { name: 'Intimacy Rejuvenation', slug: 'intimacy-rejuvenation' },
  { name: 'Skin Tightening / Skin Lifting / Anti-ageing', slug: 'skin-tightening-lifting-anti-ageing' },
  { name: 'Hair Regrowth / Regeneration', slug: 'hair-regrowth-regeneration' },
  { name: 'Skin boosters / Fillers / Botox / Threads', slug: 'skin-boosters-fillers-botox-threads' },
  { name: 'Lip fillers or boosters', slug: 'lip-fillers-or-boosters' },
  { name: 'Face lift / Jawline sculpting / Double Chin', slug: 'face-lift-jawline-sculpting-double-chin' },
  { name: 'Muscle contouring (Abs, buttock lift, Biceps/Triceps/Thighs/calf)', slug: 'muscle-contouring' },
  { name: 'Weight loss programs', slug: 'weight-loss-programs' },
  { name: 'Bridal Packages', slug: 'bridal-packages' },
  { name: 'Mommy makeover / Post-partum Recovery', slug: 'mommy-makeover-post-partum-recovery' },
  { name: 'Intravenous Longevity drips', slug: 'intravenous-longevity-drips' },
  { name: 'Complete Body Analysis / Prophylactic Health Packages', slug: 'complete-body-analysis-prophylactic-health-packages' },
  { name: 'Sexual wellness (Premature ejaculation, Erectile dysfunction, Stapler circumcision)', slug: 'sexual-wellness' },
  { name: 'Laser surgery for Pilonidal sinus', slug: 'laser-surgery-pilonidal-sinus' },
  { name: 'Gastro-intestinal problems', slug: 'gastro-intestinal-problems' },
  { name: 'Liver, Gallbladder Stone, Gastro-oesophageal reflux disease, Pancreas, Acidity, Dyspepsia, Appendix', slug: 'liver-gallbladder-gerd-pancreas' },
  { name: 'Hernia, Abdominal Wall Reconstruction', slug: 'hernia-abdominal-wall-reconstruction' },
  { name: 'Bariatric (Weight-loss, Diabetes Surgery)', slug: 'bariatric-weight-loss-diabetes-surgery' },
  { name: 'Laser Proctology (Piles, Fissure, Fistula)', slug: 'laser-proctology-piles-fissure-fistula' },
  { name: 'Robotic Surgery', slug: 'robotic-surgery' }
];

export const treatmentsMenuData = allServicesList;

// Detailed predefined knowledge for treatments
export const treatmentDetails = {
  'laser-hair-reduction': {
    title: 'ADVANCED LASER HAIR REDUCTION',
    category: 'CLINICAL SERVICES',
    breadcrumb: 'HOME / SERVICES / LASER HAIR REDUCTION',
    introText: 'Experience effortless, silky-smooth skin with medical-grade, triple-wavelength diode and Alexandrite laser hair reduction. Engineered for painless precision, zero skin burns, and permanent reduction across all skin tones.',
    contentSection: {
      heading: 'US-FDA CLEARED PAIN-FREE LASER TECHNOLOGY',
      text: 'Our multi-wavelength laser system targets melanin deep inside the hair follicle root while maintaining epidermal cooling at -4°C. Say goodbye to painful waxing, ingrown hairs, folliculitis, and persistent razor bumps.',
      image: '/treatments/treatment-body.jpg'
    },
    accordionSection: {
      heading: 'WHY CHOOSE CLINICAL LASER HAIR REDUCTION?',
      items: [
        { title: 'Ice-Cool Contact Chilling', content: 'Continuous sapphire tip cooling ensures an ultra-comfortable, virtually painless session even on intimate or sensitive areas.' },
        { title: 'Safe for Indian & Sensitive Skin', content: 'Calibrated specifically for Fitzpatrick skin types III to V, avoiding hyperpigmentation or thermal damage.' },
        { title: 'Permanent Follicular Inactivation', content: 'Destroys germinative cells at the follicle base, leading to up to 90%+ long-lasting hair reduction.' }
      ]
    },
    featuresSection: {
      heading: 'POPULAR TREATMENT ZONES',
      features: [
        { title: 'Full Body & Silhouette', description: 'Comprehensive coverage from arms, legs, back, to chest with swift, uniform glide sweeps.' },
        { title: 'Bikini & Intimate Areas', description: 'Discreet, highly hygienic sessions conducted with physician-grade privacy.' },
        { title: 'Facial & Neck Precision', description: 'Upper lip, chin, sideburns, and beard-line shaping with pinpoint accuracy.' }
      ]
    },
    ctaSection: {
      heading: 'START YOUR SMOOTH SKIN JOURNEY',
      text: 'Book a patch test and personalized consultation with our certified laser specialists.'
    },
    beforeAfter: {
      heading: 'CLINICAL HAIR REDUCTION RESULTS',
      images: [
        { before: '/treatments/treatment-body.jpg', after: '/treatments/treatment-body.jpg', title: 'Underarms Smoothing' },
        { before: '/treatments/treatment-body.jpg', after: '/treatments/treatment-body.jpg', title: 'Facial Hair Reduction' }
      ]
    },
    faqs: [
      { question: 'Is laser hair reduction permanent?', answer: 'It provides long-term permanent hair reduction. Following the recommended 6 to 8 sessions, hair follicles become inactive with only occasional fine maintenance needed.' },
      { question: 'Is the procedure painful?', answer: 'With our advanced sapphire contact cooling technology, most clients feel only a mild warm tingling sensation.' },
      { question: 'How many sessions will I need?', answer: 'Typically 6 to 8 sessions spaced 4 to 6 weeks apart to target all hair cycles.' }
    ]
  },

  'hydrafacials-medifacials': {
    title: 'HYDRAFACIALS & MEDICAL FACIALS',
    category: 'CLINICAL SERVICES',
    breadcrumb: 'HOME / SERVICES / HYDRAFACIALS & MEDIFACIALS',
    introText: 'Deep pore vacuum extraction, medical-grade antioxidant infusion, and patented vortex-fusion hydration designed to instantly restore dewy radiance, clarity, and cellular vitality.',
    contentSection: {
      heading: 'MEDICAL-GRADE DERMAL NOURISHMENT',
      text: 'Unlike regular salon facials, our dermatologist-designed Hydrafacials combine vortex-cleansing, gentle chemical peeling, painless comedone extraction, and deep micro-serum infusion of peptides, hyaluronic acid, and vitamins.',
      image: '/treatments/treatment-skin.jpg'
    },
    accordionSection: {
      heading: 'THE 4-STEP MEDICAL FACIAL PROTOCOL',
      items: [
        { title: 'Vortex Cleansing & Exfoliation', content: 'Gently dislodges dead skin cells and environmental pollutants without physical abrasion.' },
        { title: 'Acid Peel Fusion', content: 'A gentle blend of glycolic and salicylic acids breaks down sebum buildup in stubborn pores.' },
        { title: 'Painless Automated Extraction', content: 'Patented vortex suction whisks away blackheads, whiteheads, and congestions.' },
        { title: 'Antioxidant & Hyaluronic Infusion', content: 'Floods fresh dermal layers with collagen-boosting peptides and intense hydration.' }
      ]
    },
    featuresSection: {
      heading: 'CLINICAL CONCERNS ADDRESSED',
      features: [
        { title: 'Clogged Pores & Blackheads', description: 'Instant, visible pore vacuuming that eliminates congested sebum.' },
        { title: 'Dull & Dehydrated Complexion', description: 'Restores high-gloss hydration and healthy lipid barrier function.' },
        { title: 'Pre-Event Red Carpet Glow', description: 'Zero downtime and instant illumination for weddings and media events.' }
      ]
    },
    ctaSection: {
      heading: 'EXPERIENCE THE INSTANT RADIANCE',
      text: 'Schedule your customized medical facial consultation today.'
    },
    beforeAfter: {
      heading: 'INSTANT COMPLEXION REFINEMENT',
      images: [
        { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg', title: 'Pore Clearance' },
        { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg', title: 'Dewy Skin Glow' }
      ]
    },
    faqs: [
      { question: 'Is there any downtime after a Hydrafacial?', answer: 'No downtime at all. You can apply makeup and return to normal activities immediately with a fresh, radiant glow.' },
      { question: 'How often should I get a medifacial?', answer: 'Once every 3 to 4 weeks is ideal for maintaining cellular clarity and balanced oil levels.' }
    ]
  },

  'laser-facial-toning': {
    title: 'LASER FACIAL TONING & KOREAN GLASS SKIN',
    category: 'CLINICAL SERVICES',
    breadcrumb: 'HOME / SERVICES / LASER FACIAL TONING',
    introText: 'Advanced Q-switched and picosecond photo-acoustic laser toning targeting melasma, stubborn hyperpigmentation, active acne marks, and uneven skin tone to unlock porcelain Korean glass skin.',
    contentSection: {
      heading: 'PRECISION PHOTO-ACOUSTIC SKIN PERFECTION',
      text: 'Laser Facial Toning delivers sub-nanosecond acoustic shockwaves that shatter deep dermal melanin deposits into microscopic dust without breaking the skin barrier or causing crusting. This stimulates collagen, refines pores, and imparts an ethereal glass-skin radiance.',
      image: '/treatments/treatment-skin.jpg'
    },
    accordionSection: {
      heading: 'BENEFITS OF LASER FACIAL TONING',
      items: [
        { title: 'Sub-Cellular Melanin Clearance', content: 'Selectively shatters stubborn pigment deposits, acne scars, and sun damage.' },
        { title: 'Neocollagenesis & Pore Shrinkage', content: 'Thermal acoustic stimulation tightens lax pores and improves dermal firmness.' },
        { title: 'Porcelain Korean Glass Glow', content: 'Even undertone with a luminous, light-reflecting glass skin finish.' }
      ]
    },
    featuresSection: {
      heading: 'TARGETED APPLICATIONS',
      features: [
        { title: 'Acne Scars & PIH', description: 'Fades post-inflammatory erythema and brown acne spots swiftly.' },
        { title: 'Melasma & Chloasma', description: 'Gentle, safe dispersion of deep hormonal pigmentation without rebound flare.' },
        { title: 'Dull & Photo-Aged Complexion', description: 'Restores youthful clarity and cellular reflectivity.' }
      ]
    },
    ctaSection: {
      heading: 'REVEAL FLAWLESS GLASS SKIN',
      text: 'Meet our senior dermatologists for a computerized VISIA® skin analysis.'
    },
    beforeAfter: {
      heading: 'CLINICAL PIGMENT TONING RESULTS',
      images: [
        { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg', title: 'Acne Marks Faded' },
        { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg', title: 'Melasma Clearance' }
      ]
    },
    faqs: [
      { question: 'Does laser toning cause redness or peeling?', answer: 'Laser toning is non-ablative. There is no peeling, scabbing, or prolonged redness; you leave with an immediate glow.' },
      { question: 'How many sessions are recommended?', answer: 'A protocol of 4 to 6 sessions spaced 2 weeks apart yields optimal glass skin luminosity.' }
    ]
  },

  'robotic-surgery': {
    title: 'ADVANCED ROBOTIC SURGERY',
    category: 'CLINICAL SERVICES',
    breadcrumb: 'HOME / SERVICES / ROBOTIC SURGERY',
    introText: 'State-of-the-art robotic-assisted minimally invasive surgery offering 3D high-definition magnification, tremor filtration, and sub-millimeter dexterity for accelerated healing and minimal scarring.',
    contentSection: {
      heading: 'NEXT-GENERATION SURGICAL EXCELLENCE',
      text: 'Robotic surgical systems empower our board-certified surgeons with 10x magnified 3D visualization and wristed instruments that bend and rotate far beyond the human hand, enabling micro-precise dissection with negligible blood loss and rapid recovery.',
      image: '/treatments/treatment-body.jpg'
    },
    accordionSection: {
      heading: 'ADVANTAGES OF ROBOTIC-ASSISTED PROCEDURES',
      items: [
        { title: 'Microscopic Precision', content: 'Tremor filtration and sub-millimeter navigation protect delicate nerve and vascular structures.' },
        { title: 'Minimal Incisions & Near-Invisible Scars', content: 'Tiny 8mm keyhole ports replace traditional open abdominal incisions.' },
        { title: 'Rapid Discharge & Pain Reduction', content: 'Significantly lower postoperative discomfort, minimal pain medication, and return to work within days.' }
      ]
    },
    featuresSection: {
      heading: 'PROCEDURAL SPECIALTIES',
      features: [
        { title: 'Complex Hernia & Abdominal Wall Repair', description: 'Precise robotic mesh placement and tension-free anatomical reconstruction.' },
        { title: 'Bariatric & Metabolic Procedures', description: 'Sleeve gastrectomy and gastric bypass performed with ergonomic robotic stability.' },
        { title: 'Gastrointestinal & Hepato-Biliary Surgery', description: 'Gallbladder, colorectal, and anti-reflux fundoplications with maximal safety.' }
      ]
    },
    ctaSection: {
      heading: 'CONSULT OUR ROBOTIC SURGERY SPECIALISTS',
      text: 'Schedule an in-depth clinical consultation with our surgical team.'
    },
    beforeAfter: {
      heading: 'MINIMAL SCARRING OUTCOMES',
      images: [
        { before: '/treatments/treatment-body.jpg', after: '/treatments/treatment-body.jpg', title: 'Keyhole Recovery' }
      ]
    },
    faqs: [
      { question: 'Does the robot perform the surgery automatically?', answer: 'No. The certified surgeon is in 100% control at every micro-second, translating their skilled hand movements into ultra-precise microscopic actions.' },
      { question: 'How long is the hospital stay?', answer: 'Most robotic gastro and hernia surgeries permit same-day or next-day discharge.' }
    ]
  }
};

// Aliases for seamless routing and legacy redirect matching
export const slugAliases = {
  'laser-hair-removal': 'laser-hair-reduction',
  'laser-hair': 'laser-hair-reduction',
  'hydrafacial': 'hydrafacials-medifacials',
  'medifacials': 'hydrafacials-medifacials',
  'medi-facial': 'hydrafacials-medifacials',
  'laser-toning': 'laser-facial-toning',
  'pigment-laser': 'laser-facial-toning',
  'chemical-peels': 'laser-facial-toning',
  'de-tan': 'de-tan-de-pigmentation',
  'scar': 'scar-or-mole-removal',
  'mole-removal': 'scar-or-mole-removal',
  'glass-skin': 'glass-skin-clear-body',
  'skin-tightening': 'skin-tightening-lifting-anti-ageing',
  'botox': 'skin-boosters-fillers-botox-threads',
  'fillers': 'skin-boosters-fillers-botox-threads',
  'filler': 'skin-boosters-fillers-botox-threads',
  'threads': 'skin-boosters-fillers-botox-threads',
  'skin-booster': 'skin-boosters-fillers-botox-threads',
  'lip-fillers': 'lip-fillers-or-boosters',
  'face-lift': 'face-lift-jawline-sculpting-double-chin',
  'emsculpt-neo': 'muscle-contouring',
  'body-contouring': 'muscle-contouring',
  'inch-loss': 'weight-loss-programs',
  'coolsculpting': 'weight-loss-programs',
  'nad-plus-iv-drip': 'intravenous-longevity-drips',
  'iv-therapy': 'intravenous-longevity-drips',
  'hair-regrowth': 'hair-regrowth-regeneration',
  'fue': 'hair-regrowth-regeneration',
  'emsella': 'intimacy-rejuvenation',
  'vulvo-vaginal': 'intimacy-rejuvenation'
};

// Returns standard service label
export const getTreatmentCategory = () => {
  return 'SERVICES';
};

// Format clean readable title from slug
export const formatTreatmentTitle = (slug) => {
  const normSlug = slugAliases[slug] || slug;
  const found = allServicesList.find(item => item.slug === normSlug || slugify(item.name) === normSlug);
  if (found) return found.name;
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

// Returns clinical image fallback
const getCategoryImage = () => {
  return '/treatments/treatment-skin.jpg';
};

/**
 * Intelligent Data Resolver for any Treatment Slug
 */
export const getTreatmentData = (rawSlug) => {
  if (!rawSlug) return null;

  const cleanSlug = slugify(rawSlug);
  const resolvedSlug = slugAliases[cleanSlug] || cleanSlug;

  // 1. Check local storage for admin edits
  try {
    const localSaved = localStorage.getItem(`aevora_treatment_${resolvedSlug}`);
    if (localSaved) {
      const parsed = JSON.parse(localSaved);
      if (parsed && parsed.title) return parsed;
    }
  } catch (e) {
    console.error('Error reading localStorage for treatment page:', e);
  }

  // 2. Check detailed catalog
  if (treatmentDetails[resolvedSlug]) {
    return {
      ...treatmentDetails[resolvedSlug],
      slug: resolvedSlug
    };
  }

  // 3. Procedural generator for all other treatments
  const rawTitle = formatTreatmentTitle(resolvedSlug);
  const displayTitle = `${rawTitle.toUpperCase()} IN MUMBAI`;
  const categoryImage = getCategoryImage();

  return {
    slug: resolvedSlug,
    title: displayTitle,
    category: 'CLINICAL SERVICES',
    breadcrumb: `HOME / SERVICES / ${rawTitle}`,
    introText: `Experience physician-led, evidence-based ${rawTitle} at Aevora Clinics. Utilizing state-of-the-art medical technology and tailored protocols, our specialists deliver undetectable, natural, and clinically proven results.`,
    contentSection: {
      heading: `WHAT IS ${rawTitle.toUpperCase()}?`,
      text: `${rawTitle} is a specialized clinical procedure formulated to address targeted medical and aesthetic goals with scientific precision. At Aevora, every protocol is tailored to your unique clinical profile, ensuring maximum safety, efficacy, and gentle comfort.`,
      image: categoryImage
    },
    accordionSection: {
      heading: `HERE'S AN OVERVIEW OF HOW ${rawTitle.toUpperCase()} CAN EMPOWER YOU`,
      items: [
        {
          title: 'Specialist-Led Medical Precision',
          content: 'Delivered by board-certified doctors utilizing US-FDA cleared medical devices and sterile, world-class clinical infrastructure.'
        },
        {
          title: 'Targeted Tissue Restoration & Comfort',
          content: 'Optimizes tissue resilience, physiological balance, and aesthetic symmetry while maintaining rapid healing thresholds.'
        },
        {
          title: 'Long-Term Vitality & Confidence',
          content: 'Achieves subtle, harmonious transformation and cellular rejuvenation that looks and feels completely authentic.'
        }
      ]
    },
    featuresSection: {
      heading: `KEY HIGHLIGHTS OF ${rawTitle.toUpperCase()}`,
      features: [
        {
          title: 'Evidence-Based Protocols',
          description: `Customized specifically for your physiological parameters and lifestyle needs.`
        },
        {
          title: 'Minimal Downtime & Gentle Care',
          description: `Engineered to respect patient comfort, privacy, and fast return to daily activities.`
        },
        {
          title: 'Long-Term Aesthetic & Health Harmony',
          description: `Comprehensive follow-up care and maintenance plans to ensure lasting results.`
        }
      ]
    },
    ctaSection: {
      heading: `START YOUR CLINICAL CONSULTATION TODAY`,
      text: `Consult with our senior specialists for an in-depth clinical evaluation and custom roadmap.`
    },
    treatmentTypesSection: {
      heading: `${rawTitle.toUpperCase()} CLINICAL ADVANTAGES`,
      cards: [
        {
          title: `Comprehensive Assessment`,
          description: `Diagnostic screening and computer-aided mapping prior to every intervention.`
        },
        {
          title: 'Advanced Medical Technology',
          description: `State-of-the-art workstations calibrated for highest safety and efficacy.`
        },
        {
          title: 'Dedicated Concierge Care',
          description: `Personalized support before, during, and after your session.`
        }
      ]
    },
    pathwaySection: {
      heading: `YOUR RECOVERY AND TREATMENT JOURNEY`,
      paragraphs: [
        `Our medical team guides you through every step—from pre-treatment evaluation to comprehensive aftercare guidance.`,
        `Ready to discover what is possible? Connect with our clinic concierge to reserve your private appointment.`
      ]
    },
    beforeAfter: {
      heading: 'CLINICAL TRANSFORMATIONS',
      images: [
        { before: categoryImage, after: categoryImage, title: 'Clinical Outcome 1' },
        { before: categoryImage, after: categoryImage, title: 'Clinical Outcome 2' }
      ]
    },
    faqs: [
      {
        question: `How is ${rawTitle} performed at Aevora?`,
        answer: `Every procedure is performed in sterile, medical-grade suites by qualified doctors utilizing custom-calibrated parameters for optimum safety and results.`
      },
      {
        question: `How many sessions or visits will I need?`,
        answer: `The exact protocol varies based on individual clinical evaluation. Our doctors outline a precise timeline during your initial consultation.`
      },
      {
        question: `Is the treatment safe and comfortable?`,
        answer: `Yes. All technologies used are international gold standards with safety certifications, ensuring comfortable and reliable care.`
      }
    ],
    clinicInfo: {
      address: 'SCO 205 FF, Sector 5, Panchkula – 134114',
      phones: ['+91 97797 66933'],
      email: 'concierge@aevoraclinics.com',
      hours: 'Mon – Sat: 10:00 AM – 8:00 PM | Sun: By Appointment'
    }
  };
};

// Retrieve custom pages registry from localStorage
export const getCustomPagesRegistry = () => {
  try {
    const raw = localStorage.getItem('aevora_custom_pages_list');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

// Save a custom page or edited page
export const saveTreatmentPage = async (slug, pageData) => {
  const cleanSlug = slugify(slug);
  try {
    try {
      localStorage.setItem(`aevora_treatment_${cleanSlug}`, JSON.stringify(pageData));
    } catch (quotaErr) {
      console.warn('localStorage quota exceeded (large image data), continuing with database sync:', quotaErr);
    }

    try {
      const registry = getCustomPagesRegistry();
      const existingIdx = registry.findIndex(item => item.slug === cleanSlug);
      if (existingIdx >= 0) {
        registry[existingIdx] = { name: pageData.title, slug: cleanSlug, category: 'CLINICAL SERVICES' };
      } else {
        registry.push({ name: pageData.title, slug: cleanSlug, category: 'CLINICAL SERVICES' });
      }
      localStorage.setItem('aevora_custom_pages_list', JSON.stringify(registry));
    } catch (regErr) {}

    // Persist to MongoDB backend
    try {
      await fetch(`${API_BASE}/treatments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: cleanSlug, ...pageData })
      });
    } catch (err) {
      console.warn('Backend sync notice:', err.message);
    }

    return true;
  } catch (e) {
    console.error('Failed to save treatment page:', e);
    return false;
  }
};

// Delete or reset a treatment page
export const deleteTreatmentPage = async (slug) => {
  const cleanSlug = slugify(slug);
  try {
    try {
      localStorage.removeItem(`aevora_treatment_${cleanSlug}`);
      const registry = getCustomPagesRegistry();
      const filtered = registry.filter(item => item.slug !== cleanSlug);
      localStorage.setItem('aevora_custom_pages_list', JSON.stringify(filtered));
    } catch (e) {}

    try {
      await fetch(`${API_BASE}/treatments/${cleanSlug}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Backend delete notice:', err.message);
    }

    return true;
  } catch (e) {
    console.error('Failed to delete treatment page:', e);
    return false;
  }
};

// Flat array of all treatments with urls
export const getAllTreatments = () => {
  const result = [];
  const addedSlugs = new Set();

  // Standard 27 services
  allServicesList.forEach(item => {
    addedSlugs.add(item.slug);
    const isCustomized = !!localStorage.getItem(`aevora_treatment_${item.slug}`);
    result.push({
      name: item.name,
      slug: item.slug,
      category: 'SERVICES',
      url: `/treatments/${item.slug}`,
      isCustomized
    });
  });

  // Custom pages created in admin
  const customPages = getCustomPagesRegistry();
  customPages.forEach(cp => {
    if (!addedSlugs.has(cp.slug)) {
      addedSlugs.add(cp.slug);
      result.push({
        name: cp.name,
        slug: cp.slug,
        category: 'CUSTOM',
        url: `/treatments/${cp.slug}`,
        isCustom: true,
        isCustomized: true
      });
    }
  });

  return result;
};
