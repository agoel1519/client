/**
 * Aevora Aesthetic & Longevity Clinic
 * Treatments Catalog & Comprehensive Dynamic Routing Data
 */

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\+/g, '-plus-')
    .replace(/&/g, '-and-')
    .replace(/[\/\(\)\.]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const treatmentsMenuData = {
  faceSkinCol1: [
    { name: 'SCAR', slug: 'scar' },
    { name: 'CHEMICAL PEELS', slug: 'chemical-peels' },
    { name: 'DERMA MELAN PEEL', slug: 'derma-melan-peel' },
    { name: 'PLASMA PEN', slug: 'plasma-pen' },
    { name: 'PIGMENT LASER', slug: 'pigment-laser' },
    { name: 'COSMELAN PEEL', slug: 'cosmelan-peel' },
    { name: 'MEDI-FACIAL', slug: 'medi-facial' },
    { name: 'PEEL + WHITENING', slug: 'peel-whitening' },
    { name: 'SKIN BOOSTER', slug: 'skin-booster' },
    { name: 'HIFU FACIAL', slug: 'hifu-facial' },
    { name: 'TATTOO REMOVAL', slug: 'tattoo-removal' },
    { name: 'KELOID TREATMENT', slug: 'keloid-treatment' },
    { name: 'THREADS', slug: 'threads' },
    { name: 'BOTOX', slug: 'botox' },
    { name: 'WART REMOVAL', slug: 'wart-removal' }
  ],
  faceSkinCol2: [
    { name: 'SKIN POLISHING', slug: 'skin-polishing' },
    { name: 'MILIA EXTRACTION', slug: 'milia-extraction' },
    { name: 'FILLER', slug: 'filler' },
    { name: 'MOLE REMOVAL', slug: 'mole-removal' },
    { name: 'PEELS (ALL)', slug: 'peels' },
    { name: 'EXION MNRF (BTL)', slug: 'exion-mnrf' },
    { name: 'BIOREPEEL', slug: 'biorepeel' },
    { name: 'YELLOW PEEL', slug: 'yellow-peel' },
    { name: 'EXION FACE (BTL)', slug: 'exion-face' },
    { name: 'EMFACE (BTL)', slug: 'emface' },
    { name: 'MICROBLADING', slug: 'microblading' },
    { name: 'DERMA PEN', slug: 'derma-pen' },
    { name: 'LASER / FOTONA', slug: 'laser-fotona' },
    { name: 'MICRO DERMABRASION', slug: 'micro-dermabrasion' },
    { name: 'MANDELIC PEEL', slug: 'mandelic-peel' },
    { name: 'MOLLUSCUM REMOVAL', slug: 'molluscum-removal' },
    { name: 'ULTHERAPY PRIME', slug: 'ultherapy-prime' }
  ],
  body: [
    { name: 'EMSCULPT NEO', slug: 'emsculpt-neo' },
    { name: 'EMERALD LASER', slug: 'emerald-laser' },
    { name: 'BALLANCER PRO', slug: 'ballancer-pro' },
    { name: 'EXION - RF', slug: 'exion-rf' },
    { name: 'BODY CONTOURING', slug: 'body-contouring' },
    { name: 'INCH LOSS', slug: 'inch-loss' },
    { name: 'COOLSCULPTING', slug: 'coolsculpting' }
  ],
  ivTherapy: [
    { name: 'NAD+ IV DRIP', slug: 'nad-plus-iv-drip' },
    { name: 'LIMITLESS', slug: 'limitless-iv' },
    { name: 'SIGNATURE', slug: 'signature-iv' },
    { name: 'FITNESS', slug: 'fitness-iv' },
    { name: 'INSTAGLO', slug: 'instaglo-iv' },
    { name: 'HAIR HEALTH', slug: 'hair-health-iv' },
    { name: 'REWIND', slug: 'rewind-iv' },
    { name: 'HANGOVER', slug: 'hangover-iv' },
    { name: 'SHIELD', slug: 'shield-iv' },
    { name: 'SUPER WOMAN', slug: 'super-woman-iv' }
  ],
  hair: [
    { name: 'HAIR CONSULTATION', slug: 'hair-consultation' },
    { name: 'HAIR REGROWTH', slug: 'hair-regrowth' },
    { name: 'IV THERAPY FOR HAIRFALL', slug: 'iv-therapy-for-hairfall' },
    { name: 'DERMAROLLER', slug: 'dermaroller' },
    { name: 'HAIR GROWTH LASERS', slug: 'hair-growth-lasers' },
    { name: 'SCALP MICRO PIGMENTATION', slug: 'scalp-micro-pigmentation' },
    { name: 'DERMAPEN', slug: 'dermapen' },
    { name: 'EXOSOMES & BIOSTEMCELLS', slug: 'exosomes-biostemcells' },
    { name: 'FUE', slug: 'fue' },
    { name: 'HIGH-DENSITY FUE', slug: 'high-density-fue' },
    { name: 'EYEBROW TRANSPLANT', slug: 'eyebrow-transplant' },
    { name: 'MEGA HAIR TRANSPLANT', slug: 'mega-hair-transplant' },
    { name: 'BEARD TRANSPLANT', slug: 'beard-transplant' },
    { name: 'HAIR FUE - NO ROOT TOUCH', slug: 'hair-fue-no-root-touch' }
  ],
  aestheticGynaecology: [
    { name: 'VULVO-VAGINAL', slug: 'vulvo-vaginal' },
    { name: 'EMSELLA', slug: 'emsella' },
    { name: 'ORGASM SHOT', slug: 'orgasm-shot' },
    { name: 'VAGINISMUS', slug: 'vaginismus' },
    { name: 'VULVAR AUGMENTATION', slug: 'vulvar-augmentation' },
    { name: 'LABIAPLASTY', slug: 'labiaplasty' }
  ],
  laserHairRemoval: [
    { name: 'LASER HAIR REMOVAL', slug: 'laser-hair-removal' }
  ]
};

// Detailed predefined knowledge for prominent treatments
export const treatmentDetails = {
  'scar': {
    title: 'ACNE SCAR TREATMENT IN MUMBAI',
    category: 'FACE / SKIN',
    breadcrumb: 'HOME / TREATMENTS / ACNE SCAR TREATMENT IN MUMBAI',
    introText: "Scars can be a constant reminder of past injuries or surgeries. While they tell a story, they don't have to define your appearance. Scar treatment offers a variety of options to improve the look and feel of scars, allowing you to embrace your skin with confidence.",
    contentSection: {
      heading: 'WHAT IS SCAR TREATMENT?',
      text: 'Scar treatment encompasses various techniques designed to minimise the appearance and discomfort of scars. The specific approach will depend on the type, severity, and age of your scar.',
      image: '/treatments/treatment-skin.jpg'
    },
    accordionSection: {
      heading: "HERE'S AN OVERVIEW OF HOW SCAR TREATMENT CAN EMPOWER YOU",
      items: [
        {
          title: 'Reduced Scar Visibility',
          content: 'Advanced clinical modalities break down rigid fibrous tissue and stimulate fresh neocollagenesis to visibly smooth and fade hypertrophic, atrophic, or post-surgical scars.'
        },
        {
          title: 'Improved Scar Comfort',
          content: 'Restores tissue suppleness and dermal elasticity, alleviating sensations of tight pulling, itching, and heightened sensitivity in healed areas.'
        },
        {
          title: 'Enhanced Self-Confidence',
          content: 'By smoothing irregular dermal contours and evening out pigment variations, you can embrace your natural skin with renewed self-assurance.'
        }
      ]
    },
    treatmentTypesSection: {
      heading: 'SCAR TREATMENT OFFERS SOLUTIONS FOR VARIOUS SCAR TYPES',
      cards: [
        {
          title: 'Acne Scars',
          description: 'Whether the extent of the scar is rolling or the ice pick type, acne scar treatment offers a range of solutions that strengthen the surface of the skin, leading to a beautiful and even skin complexion.'
        },
        {
          title: 'Surgical Scars',
          description: 'Scar treatments can minimise the appearance of surgical scars, making them less noticeable and improving overall cosmetic outcomes.'
        },
        {
          title: 'Burn Scars',
          description: 'Face scar treatment in Mumbai options can help improve the appearance and comfort of burn scars, promoting better healing and a more even skin surface.'
        },
        {
          title: 'Keloid Scars',
          description: 'These raised and thickened scars can be effectively treated with various techniques, including injections and silicone therapy.'
        }
      ]
    },
    pathwaySection: {
      heading: 'YOUR PATH TO SMOOTHER, MORE CONFIDENT SKIN STARTS WITH SCAR TREATMENT',
      paragraphs: [
        "Scars are a natural part of the healing process, but they don't have to be permanent reminders. Our scar treatment in Mumbai offers a multitude of options to improve the appearance and comfort of scars, allowing you to embrace your skin with newfound confidence.",
        "Ready to explore your scar treatment options and reclaim your confidence? Contact us today to schedule a consultation and discuss the possibilities!"
      ]
    },
    beforeAfter: {
      heading: 'BEFORE & AFTERS',
      images: [
        {
          before: 'https://images.unsplash.com/photo-1512290900672-1f4865181754?auto=format&fit=crop&w=800&q=80',
          after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
          title: 'Acne Scar Smoothing'
        },
        {
          before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
          after: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
          title: 'Deep Rolling Scars'
        },
        {
          before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
          after: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
          title: 'Skin Resurfacing'
        }
      ],
      showcaseImage: '/treatments/scar-before-after.png'
    },
    faqs: [
      {
        question: 'What are the different types of scar treatments available?',
        answer: 'Scar treatment options include fractional laser resurfacing, chemical peels, subcision, microneedling radiofrequency (MNRF), PRP/exosome therapy, and targeted dermal fillers depending on scar depth and type.'
      },
      {
        question: 'How effective is scar treatment?',
        answer: 'Modern scar therapies are highly effective in softening scar margins, rebuilding lost collagen, and leveling skin depressions, typically delivering 60% to 85% visible improvement.'
      },
      {
        question: 'Is scar treatment painful?',
        answer: 'Procedures are performed with prescription topical numbing creams and gentle cooling, ensuring very minimal discomfort during the session.'
      },
      {
        question: 'How long will it take to see results with scar treatment?',
        answer: 'Initial texture refinement is often noticeable within 2 to 3 weeks, with progressive collagen remodeling continuing over 3 to 6 months.'
      },
      {
        question: 'Is scar treatment safe for everyone?',
        answer: 'Yes, when administered by qualified dermatologists using wavelengths and parameters tailored to your specific Fitzpatrick skin phototype.'
      },
      {
        question: 'What is the best treatment for acne scars?',
        answer: 'A combination approach—such as subcision for tethered scars, fractional lasers or MNRF for textural remodeling, and peels for pigment—yields the most comprehensive clinical outcomes.'
      },
      {
        question: 'How can I clear my acne scars?',
        answer: 'Scheduling an in-depth dermatological skin assessment allows us to formulate a personalized multi-modality protocol combining clinical resurfacing with medical-grade barrier repair skincare.'
      }
    ],
    clinicInfo: {
      address: '1st Floor, Forum Building, Raghuvanshi Mills Compound Senapati Bapat Marg, Gandhi Nagar, Upper Worli, Worli, Lower Parel, Mumbai, Maharashtra 400018.',
      phones: ['+91 72400 13002', '+91 72400 12002'],
      email: 'hello@skuccii.com',
      hours: 'Monday – Sunday: 10:00 AM – 7:00 PM'
    }
  },
  'chemical-peels': {
    title: 'CHEMICAL PEELS IN MUMBAI',
    category: 'FACE / SKIN',
    breadcrumb: 'HOME / TREATMENTS / FACE & SKIN / CHEMICAL PEELS',
    introText: 'Chemical peels represent a cornerstone in clinical dermatology, offering a refined, evidence-based approach to skin resurfacing. By gently lifting damaged cellular layers, our medical-grade formulations reveal an intensely radiant, smoother, and deeply clarified complexion.',
    contentSection: {
      heading: 'WHAT ARE CLINICAL CHEMICAL PEELS?',
      text: 'A chemical peel is an advanced dermatological procedure utilizing physician-calibrated fruit acids, AHAs, BHAs, and trichloroacetic acids (TCA) to dissolve cellular bonds binding aged keratin. At Aevora, every peel formulation is custom-blended to your skin barrier threshold—effectively addressing stubborn hyperpigmentation, active cystic acne, sun lentigines, and textural irregularity without uninvited downtime.',
      image: '/treatments/treatment-skin.jpg'
    },
    accordionSection: {
      heading: "HOW PEELS BECOME YOUR ALLY IN REVITALIZING YOUR COMPLEXION",
      items: [
        { title: 'Physician-Controlled Cellular Exfoliation', content: 'Unlike aggressive mechanical scrubs, clinical peels dissolve dead cellular matrices uniformly with precise penetration depth controlled by certified dermatologists.' },
        { title: 'Bespoke Multi-Acid Customization', content: 'We calibrate glycolic, salicylic, lactic, and mandelic ratios based on your Fitzpatrick phototype, sensitivity, and cellular turnover rates.' },
        { title: 'Accelerated Collagen & Elastic Synthesis', content: 'Epidermal renewal signals fibroblasts in the papillary dermis to generate fresh elastin, tightening fine lines and refining enlarged pores.' }
      ]
    },
    featuresSection: {
      heading: 'TARGETED DERMATOLOGICAL CONCERNS ADDRESSED',
      features: [
        { title: 'Stubborn Melasma & Hyperpigmentation', description: 'Inhibits tyrosinase enzyme activity and lifts surface melanin deposits to restore an illuminated, even undertone.' },
        { title: 'Post-Acne Erythema & Textural Scarring', description: 'Clears follicular plugs, softens jagged scar margins, and smooths out congested epidermis.' },
        { title: 'Photoaging & Environmental Dullness', description: 'Reactivates stagnant cellular turnover, shedding oxidative damage and infusing radiant dermal vitality.' }
      ]
    },
    ctaSection: {
      heading: 'REVEAL YOUR TRUE DERMAL RADIANCE',
      text: 'Schedule an in-depth VISIA® skin analysis with our senior aesthetic dermatologists and discover your personalized peel regimen.'
    },
    beforeAfter: {
      heading: 'CLINICAL BEFORE & AFTERS',
      images: [
        { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg' },
        { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg' }
      ]
    },
    faqs: [
      { question: 'Is there noticeable peeling or downtime?', answer: 'Downtime depends on the peel depth. Our superficial brightening peels have zero peeling, while medium-depth clinical peels may produce subtle microscopic flaking for 3–5 days.' },
      { question: 'How many sessions are recommended for optimal results?', answer: 'For pigment correction and textural renewal, a protocol of 4 to 6 sessions spaced 2 to 3 weeks apart delivers sustained, long-term clarity.' },
      { question: 'Can chemical peels be safely performed on Indian skin types?', answer: 'Yes. At Aevora, we specialize in high-safety protocols specifically calibrated for Fitzpatrick skin types III to V to prevent post-inflammatory hyperpigmentation.' }
    ]
  },

  'botox': {
    title: 'BOTOX® & ANTI-WRINKLE INJECTIONS IN MUMBAI',
    category: 'FACE / SKIN',
    breadcrumb: 'HOME / TREATMENTS / FACE & SKIN / BOTOX',
    introText: 'Experience undetectable, physician-administered neuromodulator artistry. Our micro-dosing philosophy preserves your authentic facial mobility while softening dynamic expression lines, crow’s feet, and forehead creases with refined subtlety.',
    contentSection: {
      heading: 'THE SCIENCE OF UNDETECTABLE NEUROMODULATION',
      text: 'Botox® (Botulinum Toxin Type A) works by gently intercepting neurotransmitter signals at hyperactive facial muscles. In the hands of Aevora’s master injectors, treatments are never frozen or rigid; we apply micro-targeted droplet injections to relax stress lines while highlighting your natural expressions, brow lift, and jawline definition.',
      image: '/treatments/treatment-skin.jpg'
    },
    accordionSection: {
      heading: 'WHY DISCERNING CLIENTS CHOOSE AEVORA FOR BOTOX',
      items: [
        { title: 'Certified Master Dermatologist Injectors', content: 'Every injection is mapped by anatomy experts who understand vascular layers and facial kinetic vectors.' },
        { title: '100% Authentic US FDA-Cleared Formulations', content: 'We exclusively utilize Allergan Botox® reconstituted to exact clinical potency in cold-chain monitored environments.' },
        { title: 'Micro-Targeted Baby Botox Approach', content: 'Prevents the frozen mask look, leaving your face rested, refreshed, and completely natural.' }
      ]
    },
    featuresSection: {
      heading: 'KEY INDICATIONS FOR BOTOX INJECTIONS',
      features: [
        { title: 'Dynamic Forehead & Glabellar Lines', description: 'Smooths vertical frown lines (11s) and horizontal brow creases caused by daily expression.' },
        { title: 'Crow’s Feet & Periorbital Lift', description: 'Softens delicate smile lines radiating from lateral eye contours while subtly lifting the brow tail.' },
        { title: 'Masseter Slimming & Bruxism Relief', description: 'Relaxes overdeveloped jaw muscles for a sleek V-line facial contour and significant relief from teeth grinding.' }
      ]
    },
    ctaSection: {
      heading: 'REFRESH YOUR LOOK WITH CLINICAL PRECISION',
      text: 'Book a discreet consultation to assess your facial kinematics and receive a tailored treatment plan.'
    },
    beforeAfter: {
      heading: 'PATIENT TRANSFORMATIONS',
      images: [
        { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg' }
      ]
    },
    faqs: [
      { question: 'How quickly will I see results and how long do they last?', answer: 'Initial relaxation begins within 3 to 5 days, reaching peak perfection at day 14. Results typically maintain elegance for 4 to 6 months.' },
      { question: 'Will my face feel stiff or unnatural?', answer: 'Never. Our micro-dosing technique targets only the specific hyperactive muscle fibers, leaving full emotional mobility and authentic smiles.' },
      { question: 'Is there any downtime after Botox?', answer: 'Virtually zero downtime. You can return to work immediately. We only advise avoiding strenuous workouts and lying flat for 4 hours post-procedure.' }
    ]
  },

  'filler': {
    title: 'DERMAL FILLERS & HYALURONIC CONTOURING IN MUMBAI',
    category: 'FACE / SKIN',
    breadcrumb: 'HOME / TREATMENTS / FACE & SKIN / DERMAL FILLERS',
    introText: 'Restore youthful structural volume, sculpt refined cheekbones, soften tear troughs, and define lips with premium hyaluronic acid dermal fillers injected with microscopic cannula precision.',
    contentSection: {
      heading: 'ARCHITECTURAL FACIAL REJUVENATION',
      text: 'As we age, facial fat pads descend and bone resorption reduces midface support. Using advanced US FDA-cleared cohesive hyaluronic gels (Juvéderm®, Restylane®), Aevora restores deep structural scaffolding. The result is an elevated cheek apex, rested under-eyes, harmonized chin projection, and hydrated lip contours.',
      image: '/treatments/treatment-skin.jpg'
    },
    accordionSection: {
      heading: 'AEVORA ARTISTRY IN FACIAL ARCHITECTURE',
      items: [
        { title: 'Micro-Cannula Safety Technique', content: 'Blunt-tip flexible cannulas dramatically reduce bruising, minimize discomfort, and enhance vascular safety.' },
        { title: 'Cross-Linked Bio-Compatible Hyaluronic Acid', content: 'Natural sugar compounds seamlessly integrate into facial tissues for a supple, invisible finish.' },
        { title: 'Golden Ratio Golden Facial Proportion Mapping', content: 'Every injection aligns with bespoke aesthetic angles tailored to your unique bone framework.' }
      ]
    },
    featuresSection: {
      heading: 'SIGNATURE TREATMENT ZONES',
      features: [
        { title: 'Under-Eye Tear Troughs', description: 'Lifts hollows and diminishes dark orbital shadowing for an instantly rested, luminous gaze.' },
        { title: 'Midface Cheeks & Nasolabial Softening', description: 'Replenishes lost structural projection and lifts descending lower face folds naturally.' },
        { title: 'Jawline & Chin Definition', description: 'Sculpts a sharp, razor-defined mandibular angle and balances facial profile symmetry.' }
      ]
    },
    ctaSection: {
      heading: 'RESTORE YOUR NATURAL VOLUME PROFILE',
      text: 'Schedule a private facial contouring consultation with our senior aesthetic physicians.'
    },
    beforeAfter: {
      heading: 'BEFORE & AFTER RESULTS',
      images: [
        { before: '/treatments/treatment-skin.jpg', after: '/treatments/treatment-skin.jpg' }
      ]
    },
    faqs: [
      { question: 'How long do hyaluronic dermal fillers last?', answer: 'Depending on the product density and treatment zone, results last between 12 to 24 months.' },
      { question: 'Can dermal fillers be reversed if needed?', answer: 'Yes, hyaluronic acid fillers can be instantly and safely dissolved using the natural enzyme hyaluronidase.' },
      { question: 'Is the filler procedure painful?', answer: 'Minimal to no pain. Fillers are formulated with integrated lidocaine anaesthetic, and topical numbing cream is applied beforehand.' }
    ]
  },

  'emsculpt-neo': {
    title: 'EMSCULPT NEO® BODY SCULPTING IN MUMBAI',
    category: 'BODY',
    breadcrumb: 'HOME / TREATMENTS / BODY / EMSCULPT NEO',
    introText: 'The world’s first and only non-invasive procedure that simultaneously delivers synchronized radiofrequency and high-intensity focused electromagnetic (HIFEM+) energy for simultaneous fat burning and muscle building.',
    contentSection: {
      heading: 'SIMULTANEOUS 30% FAT REDUCTION & 25% MUSCLE GROWTH',
      text: 'EMSCULPT NEO® by BTL revolutionizes non-surgical body sculpting. In a single 30-minute session, synchronized RF heating elevates subcutaneous fat temperatures to induce permanent apoptosis (fat cell breakdown), while supramaximal HIFEM+ contractions force muscle fibers to adapt and multiply far beyond voluntary gym capacity.',
      image: '/treatments/treatment-body.jpg'
    },
    accordionSection: {
      heading: 'CLINICALLY PROVEN SCIENCE BEHIND EMSCULPT NEO',
      items: [
        { title: 'Supramaximal Muscle Contractions (HIFEM+)', content: 'Delivers 24,000 supramaximal contractions per 30-minute session—equivalent to 24,000 crunches or squats.' },
        { title: 'Dual-Energy Synchronized Radiofrequency', content: 'Preheats muscles while destroying fat cells permanently via programmed cell death (apoptosis).' },
        { title: 'Zero Surgery, Zero Anaesthesia, Zero Downtime', content: 'Walk into your session during lunch break and return to routine tasks immediately after.' }
      ]
    },
    featuresSection: {
      heading: 'TARGET TREATMENT REGIONS',
      features: [
        { title: 'Abdomen & Core Definition', description: 'Burns stubborn belly fat and defines sculpted rectus abdominis and oblique muscle lines.' },
        { title: 'Buttocks Non-Invasive Lift', description: 'Lifts and tones the gluteal complex without fat loss, providing an authentic sculpted athletic shape.' },
        { title: 'Arms & Thighs Contouring', description: 'Tones biceps, triceps, quadriceps, and inner/outer thighs for leaner, firmer limbs.' }
      ]
    },
    ctaSection: {
      heading: 'SCULPT YOUR IDEAL PHYSIQUE',
      text: 'Consult with Aevora’s certified body contouring specialists to tailor your 4-session EMSCULPT NEO® protocol.'
    },
    beforeAfter: {
      heading: 'CLINICAL TRANSFORMATIONS',
      images: [
        { before: '/treatments/treatment-body.jpg', after: '/treatments/treatment-body.jpg' }
      ]
    },
    faqs: [
      { question: 'What does an EMSCULPT NEO treatment feel like?', answer: 'It feels like an intense workout accompanied by a warming sensation comparable to a hot stone massage.' },
      { question: 'How many sessions are necessary?', answer: 'A clinical protocol typically consists of 4 sessions scheduled 5 to 10 days apart for maximum hypertrophic response.' },
      { question: 'When do I see tangible results?', answer: 'Tangible muscle tone is felt right after the first session, with full fat reduction and definition visible 8 to 12 weeks post-treatment.' }
    ]
  },

  'nad-plus-iv-drip': {
    title: 'NAD+ CELLULAR LONGEVITY IV DRIP IN MUMBAI',
    category: 'IV THERAPY',
    breadcrumb: 'HOME / TREATMENTS / IV THERAPY / NAD+ IV DRIP',
    introText: 'Recharge cellular energy at the mitochondrial level. NAD+ (Nicotinamide Adenine Dinucleotide) intravenous therapy is the gold standard in cellular repair, cognitive clarity, anti-aging, and metabolic revitalisation.',
    contentSection: {
      heading: 'MITOCHONDRIAL RESTORATION & CELLULAR REPAIR',
      text: 'NAD+ is an indispensable coenzyme present in every living cell, responsible for converting nutrients into ATP energy and fueling sirtuins—the longevity proteins that repair damaged DNA. As NAD+ levels drop by up to 50% by middle age, intravenous infusion bypasses GI degradation for 100% bioavailability, restoring youthfulness from within.',
      image: '/treatments/treatment-iv.jpg'
    },
    accordionSection: {
      heading: 'BIOLOGICAL BENEFITS OF INTRAVENOUS NAD+',
      items: [
        { title: 'DNA Repair via Sirtuin Enzyme Activation', content: 'Activates SIRT1 and PARP-1 enzymes to repair double-strand DNA damage and mitigate oxidative stress.' },
        { title: 'Neuroprotection & Brain Fog Clearance', content: 'Elevates neurotransmitter synthesis, improving memory consolidation, alertness, and mental stamina.' },
        { title: 'Deep Mitochondrial ATP Resynthesis', content: 'Boosts the energy currency of your cells, vanquishing chronic fatigue and accelerating physical recovery.' }
      ]
    },
    featuresSection: {
      heading: 'TRANSFORMATIVE SYSTEMIC IMPACT',
      features: [
        { title: 'Anti-Aging & Cellular Longevity', description: 'Reverses biological markers of aging and restores cellular vitality.' },
        { title: 'Metabolic Optimization & Energy', description: 'Supports insulin sensitivity, fatty acid oxidation, and physical athletic endurance.' },
        { title: 'Stress & Circadian Rhythm Reset', description: 'Restores restorative sleep cycles and resets cortisol stress responses.' }
      ]
    },
    ctaSection: {
      heading: 'EXPERIENCE CELLULAR LONGEVITY INFUSION',
      text: 'Book your private medical screening in our serene IV Lounge and revitalize your cellular health.'
    },
    beforeAfter: {
      heading: 'PATIENT HEALTH BIOMARKERS',
      images: [
        { before: '/treatments/treatment-iv.jpg', after: '/treatments/treatment-iv.jpg' }
      ]
    },
    faqs: [
      { question: 'How long does a NAD+ infusion take?', answer: 'Due to cellular uptake dynamics, NAD+ is infused gradually over 90 to 120 minutes in our luxury private suite.' },
      { question: 'How often should I receive NAD+ IV Therapy?', answer: 'A loading protocol of 3 to 4 sessions, followed by monthly maintenance infusions, provides maximum cellular longevity benefits.' },
      { question: 'Are there any side effects during the drip?', answer: 'Some clients feel a warm sensation or mild chest pressure if dripped too quickly; our nurses monitor drip rates continuously to ensure complete comfort.' }
    ]
  },

  'fue': {
    title: 'ADVANCED FUE HAIR TRANSPLANT IN MUMBAI',
    category: 'HAIR',
    breadcrumb: 'HOME / TREATMENTS / HAIR / FUE TRANSPLANT',
    introText: 'Natural hairline restoration through Follicular Unit Extraction (FUE). Micro-precision graft extraction and artistic recipient site angling ensure undetectable density with minimal recovery time.',
    contentSection: {
      heading: 'ARTISTRY MEETS MICROSURGICAL PRECISION',
      text: 'Our FUE hair restoration protocol combines high-magnification stereomicroscopes with 0.7–0.8mm titanium punches. Individual follicular units are extracted from the permanent donor zone and implanted at exact anatomical angles mimicking your natural hair growth direction for lifelong permanence.',
      image: '/treatments/treatment-hair.jpg'
    },
    accordionSection: {
      heading: 'ADVANTAGES OF THE AEVORA FUE TECHNIQUE',
      items: [
        { title: 'Zero Linear Scarring', content: 'Individual extraction leaves no linear scar, enabling you to wear short hairstyles with total confidence.' },
        { title: 'Ultra-High Density Graft Survival', content: 'Cold graft preservation solutions preserve follicle viability, delivering over 95% graft survival.' },
        { title: 'Natural Hairline Architecture', content: 'We handcraft the frontal transition zone using single-hair grafts for an undetectable hairline.' }
      ]
    },
    featuresSection: {
      heading: 'RESTORATION SPECIFICITY',
      features: [
        { title: 'Receding Hairlines & Temple Peaks', description: 'Rebuilds natural temporal triangles and restores youthful facial framing.' },
        { title: 'Crown & Vertex Thinning', description: 'Recreates the natural whorl spiral with multi-hair grafts for maximum density.' },
        { title: 'Beard & Eyebrow Density', description: 'Micro-precision transplantation for patchy beards, mustaches, and brows.' }
      ]
    },
    ctaSection: {
      heading: 'REGAIN YOUR LIFELONG HAIR CONFIDENCE',
      text: 'Schedule an in-depth Trichoscopy graft assessment with our senior hair restoration surgeons.'
    },
    beforeAfter: {
      heading: 'HAIR RESTORATION BEFORE & AFTERS',
      images: [
        { before: '/treatments/treatment-hair.jpg', after: '/treatments/treatment-hair.jpg' }
      ]
    },
    faqs: [
      { question: 'Is the FUE hair transplant procedure painful?', answer: 'Local anaesthesia is administered beforehand, ensuring complete numbness throughout the procedure.' },
      { question: 'When will the transplanted hair start growing?', answer: 'New hairs begin sprouting at 3 to 4 months, with full dense maturation achieved between 9 to 12 months.' },
      { question: 'Is the transplanted hair permanent?', answer: 'Yes. Grafts harvested from the genetic donor zone at the back of the scalp are resistant to DHT hormone shedding.' }
    ]
  },

  'emsella': {
    title: 'BTL EMSELLA® INCONTINENCE & INTIMATE WELLNESS IN MUMBAI',
    category: 'AESTHETIC GYNAECOLOGY',
    breadcrumb: 'HOME / TREATMENTS / AESTHETIC GYNAECOLOGY / EMSELLA',
    introText: 'Breakthrough non-invasive pelvic floor strengthening. Fully clothed, effortless treatment using High-Intensity Focused Electromagnetic (HIFEM) technology to treat urinary incontinence and restore intimate wellness.',
    contentSection: {
      heading: 'REVOLUTIONARY PELVIC FLOOR RESTORATION',
      text: 'BTL EMSELLA® utilizes patented HIFEM technology to stimulate thousands of supramaximal pelvic floor muscle contractions in a single 28-minute session. Equivalent to 11,000 Kegel exercises, it re-educates the neuromuscular control of the bladder and restores pelvic floor tightness without surgery, downtime, or disrobing.',
      image: '/treatments/treatment-body.jpg'
    },
    accordionSection: {
      heading: 'CLINICAL ADVANTAGES OF EMSELLA CHAIR',
      items: [
        { title: 'Remain Fully Clothed Throughout', content: 'A completely comfortable, non-invasive experience where you simply sit on the ergonomic treatment chair.' },
        { title: '11,000 Supramaximal Kegel Contractions', content: 'Stimulates the entire pelvic floor musculature far beyond what is physiologically possible through voluntary exercise.' },
        { title: 'US FDA-Cleared Clinical Efficacy', content: 'Clinically proven 95% satisfaction rate for stress, urge, and mixed urinary incontinence.' }
      ]
    },
    featuresSection: {
      heading: 'KEY WELLNESS INDICATIONS',
      features: [
        { title: 'Stress Urinary Incontinence', description: 'Prevents unwanted bladder leakage when coughing, laughing, sneezing, or exercising.' },
        { title: 'Post-Pregnancy Pelvic Rehabilitation', description: 'Restores tone and core stability to lax pelvic ligaments following childbirth.' },
        { title: 'Intimate Wellness & Sensation', description: 'Enhances muscle tone, neuromuscular coordination, and sexual satisfaction.' }
      ]
    },
    ctaSection: {
      heading: 'RESTORE CONFIDENCE & BLADDER CONTROL',
      text: 'Schedule a private, empathetic consultation with our female gynaecology specialists.'
    },
    beforeAfter: {
      heading: 'CLINICAL OUTCOMES',
      images: [
        { before: '/treatments/treatment-body.jpg', after: '/treatments/treatment-body.jpg' }
      ]
    },
    faqs: [
      { question: 'What does the EMSELLA chair feel like?', answer: 'You will feel a tingling sensation followed by rhythmic contractions of the pelvic floor muscles. It is comfortable and completely pain-free.' },
      { question: 'How many sessions do I need?', answer: 'The standard protocol consists of 6 sessions, performed twice weekly for three weeks.' },
      { question: 'How quickly will I notice an improvement?', answer: 'Many patients notice noticeable improvements in bladder control and tone after just 2 to 3 sessions.' }
    ]
  }
};

// Aliases for smooth URL matching
export const slugAliases = {
  'peels-all': 'peels',
  'peels': 'peels',
  'peel-whitening': 'peel-whitening',
  'peel-plus-whitening': 'peel-whitening',
  'nad-iv-drip': 'nad-plus-iv-drip',
  'nad-plus-iv': 'nad-plus-iv-drip',
  'nad-plus-iv-drip': 'nad-plus-iv-drip',
  'fue-transplant': 'fue',
  'fue': 'fue',
  'laser-fotona': 'laser-fotona',
  'laser-and-fotona': 'laser-fotona',
  'exosomes-biostemcells': 'exosomes-biostemcells',
  'exosomes-and-biostemcells': 'exosomes-biostemcells',
  'laser-hair': 'laser-hair-removal',
  'laser-hair-removal': 'laser-hair-removal',
  'exion-mnrf-btl': 'exion-mnrf',
  'exion-face-btl': 'exion-face',
  'emface-btl': 'emface',
  'dermapen-hair': 'dermapen',
  'iv-therapy-hairfall': 'iv-therapy-for-hairfall',
  'iv-therapy-for-hairfall': 'iv-therapy-for-hairfall'
};

// Find category name for any given treatment slug
export const getTreatmentCategory = (slug) => {
  const normSlug = slugAliases[slug] || slug;
  
  for (const [catKey, items] of Object.entries(treatmentsMenuData)) {
    if (items.some(item => item.slug === normSlug || slugify(item.name) === normSlug)) {
      switch (catKey) {
        case 'faceSkinCol1':
        case 'faceSkinCol2':
          return 'FACE / SKIN';
        case 'body':
          return 'BODY';
        case 'ivTherapy':
          return 'IV THERAPY';
        case 'hair':
          return 'HAIR';
        case 'aestheticGynaecology':
          return 'AESTHETIC GYNAECOLOGY';
        case 'laserHairRemoval':
          return 'BODY & LASER';
        default:
          return 'TREATMENTS';
      }
    }
  }
  return 'CLINICAL TREATMENTS';
};

// Format clean readable title from slug
export const formatTreatmentTitle = (slug) => {
  // Check if item is in menu
  for (const items of Object.values(treatmentsMenuData)) {
    const found = items.find(item => item.slug === slug || slugify(item.name) === slug);
    if (found) return found.name;
  }
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

// Returns category image fallback
const getCategoryImage = (category) => {
  switch (category) {
    case 'FACE / SKIN':
      return '/treatments/treatment-skin.jpg';
    case 'BODY':
    case 'BODY & LASER':
      return '/treatments/treatment-body.jpg';
    case 'IV THERAPY':
      return '/treatments/treatment-iv.jpg';
    case 'HAIR':
      return '/treatments/treatment-hair.jpg';
    case 'AESTHETIC GYNAECOLOGY':
      return '/treatments/treatment-body.jpg';
    default:
      return '/treatments/treatment-skin.jpg';
  }
};

/**
 * Intelligent Data Resolver for any Treatment Slug
 * 1. Checks localStorage for custom admin-saved pages
 * 2. Checks detailed predefined catalog
 * 3. Dynamically generates high-grade clinical content for all 70+ treatments!
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
  const category = getTreatmentCategory(resolvedSlug);
  const rawTitle = formatTreatmentTitle(resolvedSlug);
  const displayTitle = `${rawTitle} IN MUMBAI`;
  const categoryImage = getCategoryImage(category);

  return {
    slug: resolvedSlug,
    title: displayTitle,
    category: category,
    breadcrumb: `HOME / TREATMENTS / ${category} / ${rawTitle}`,
    introText: `Experience physician-led, evidence-based ${rawTitle.toLowerCase()} at Aevora Clinics. Utilizing advanced medical technology and customized protocol design, we deliver undetectable, natural, and clinically proven results.`,
    contentSection: {
      heading: `WHAT IS ${rawTitle}?`,
      text: `${rawTitle} is a specialized clinical procedure formulated to address targeted aesthetic and dermatological concerns with microscopic precision. At Aevora, every protocol is tailored to your unique anatomical profile and skin tolerance, ensuring maximum efficacy with gentle comfort.`,
      image: categoryImage
    },
    accordionSection: {
      heading: `HERE'S AN OVERVIEW OF HOW ${rawTitle} CAN EMPOWER YOU`,
      items: [
        {
          title: `Reduced ${rawTitle} Visibility & Concerns`,
          content: 'Advanced clinical modalities target underlying tissue layers to noticeably improve aesthetic harmony and skin clarity.'
        },
        {
          title: 'Improved Tissue Comfort & Resilience',
          content: 'Optimizes skin hydration and biological resilience while soothing sensitive or irritated areas.'
        },
        {
          title: 'Enhanced Self-Confidence & Vitality',
          content: 'Delivers subtle, undetectable refinement that enhances your natural elegance and skin vitality.'
        }
      ]
    },
    featuresSection: {
      heading: `TARGET CONCERNS RESOLVED BY ${rawTitle}`,
      features: [
        {
          title: 'Enhanced Structural Tone & Texture',
          description: `Revitalizes tissue integrity and refines surface micro-contours for long-term health and vitality.`
        },
        {
          title: 'Targeted Cellular Regeneration',
          description: `Promotes natural cellular turnover and biological repair mechanisms from within.`
        },
        {
          title: 'Subtle, Undetectable Aesthetic Longevity',
          description: `Achieves effortless elegance and restorative harmony that looks completely authentic.`
        }
      ]
    },
    ctaSection: {
      heading: `START YOUR TRANSFORMATION TODAY`,
      text: `Consult with our senior specialists for an in-depth clinical evaluation and custom treatment roadmap.`
    },
    treatmentTypesSection: {
      heading: `${rawTitle} OFFERS SOLUTIONS FOR VARIOUS CONCERNS`,
      cards: [
        {
          title: `Targeted ${rawTitle}`,
          description: `Personalized protocols designed to address your exact clinical profile with maximum precision and gentle care.`
        },
        {
          title: 'Advanced Dermal Rejuvenation',
          description: `Strengthens the biological integrity of treated tissue, encouraging an illuminated and naturally refined appearance.`
        },
        {
          title: 'Restorative Care & Comfort',
          description: `Specialized options that promote optimal healing, deep hydration, and sustained skin vitality.`
        },
        {
          title: 'Long-Term Aesthetic Harmony',
          description: `Effective treatment modalities formulated to maintain subtle, youthful elegance and radiant confidence.`
        }
      ]
    },
    pathwaySection: {
      heading: `YOUR PATH TO SMOOTHER, MORE CONFIDENT SKIN STARTS WITH ${rawTitle}`,
      paragraphs: [
        `${rawTitle} offers evidence-based dermatological solutions to restore balance, youthfulness, and comfort to your skin, allowing you to embrace your appearance with renewed confidence.`,
        `Ready to explore your personalized treatment options? Contact our clinical team today to schedule an evaluation and discuss the possibilities!`
      ]
    },
    beforeAfter: {
      heading: 'BEFORE & AFTERS',
      images: [
        { before: categoryImage, after: categoryImage, title: 'Clinical Result 1' },
        { before: categoryImage, after: categoryImage, title: 'Clinical Result 2' }
      ]
    },
    clinicInfo: {
      address: '1st Floor, Forum Building, Raghuvanshi Mills Compound Senapati Bapat Marg, Gandhi Nagar, Upper Worli, Worli, Lower Parel, Mumbai, Maharashtra 400018.',
      phones: ['+91 72400 13002', '+91 72400 12002'],
      email: 'hello@skuccii.com',
      hours: 'Monday – Sunday: 10:00 AM – 7:00 PM'
    },
    faqs: [
      {
        question: `How many sessions of ${rawTitle.toLowerCase()} are recommended?`,
        answer: `Most clinical protocols recommend 3 to 6 sessions spaced over recommended intervals for optimal and long-lasting results.`
      },
      {
        question: `Is there any recovery time or downtime?`,
        answer: `Most clients experience zero to minimal downtime and return to regular daily routines immediately following treatment.`
      },
      {
        question: `How do I prepare for my ${rawTitle.toLowerCase()} appointment?`,
        answer: `Avoid excessive sun exposure, retinol, or harsh chemical exfoliants for 48 hours prior to your clinical session.`
      }
    ]
  };
};

// Storage key for custom registered pages list
const CUSTOM_PAGES_KEY = 'aevora_custom_pages_registry';

export const getCustomPagesRegistry = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_PAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveTreatmentPage = (slug, data) => {
  if (!slug || !data) return false;
  try {
    const cleanSlug = slugify(slug);
    const enrichedData = {
      ...data,
      slug: cleanSlug,
      updatedAt: new Date().toISOString(),
      isCustom: true
    };
    
    // Save page data in local cache
    localStorage.setItem(`aevora_treatment_${cleanSlug}`, JSON.stringify(enrichedData));
    
    // Update registry list
    const registry = getCustomPagesRegistry();
    const existingIndex = registry.findIndex(p => p.slug === cleanSlug);
    const summary = {
      name: enrichedData.title?.replace(' IN MUMBAI', '') || cleanSlug,
      slug: cleanSlug,
      category: enrichedData.category || 'TREATMENTS',
      url: `/treatments/${cleanSlug}`,
      updatedAt: enrichedData.updatedAt
    };
    
    if (existingIndex >= 0) {
      registry[existingIndex] = summary;
    } else {
      registry.push(summary);
    }
    localStorage.setItem(CUSTOM_PAGES_KEY, JSON.stringify(registry));

    // Asynchronously synchronize to MongoDB Atlas
    fetch('http://localhost:5001/api/treatments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrichedData)
    }).catch(err => {
      console.warn('MongoDB sync notice:', err.message);
    });

    return true;
  } catch (e) {
    console.error('Failed to save treatment page:', e);
    return false;
  }
};

export const deleteTreatmentPage = (slug) => {
  if (!slug) return false;
  try {
    const cleanSlug = slugify(slug);
    localStorage.removeItem(`aevora_treatment_${cleanSlug}`);
    
    // Remove from registry
    const registry = getCustomPagesRegistry().filter(p => p.slug !== cleanSlug);
    localStorage.setItem(CUSTOM_PAGES_KEY, JSON.stringify(registry));

    // Asynchronously remove from MongoDB Atlas
    fetch(`http://localhost:5001/api/treatments/${cleanSlug}`, {
      method: 'DELETE'
    }).catch(err => {
      console.warn('MongoDB delete notice:', err.message);
    });

    return true;
  } catch (e) {
    console.error('Failed to delete treatment page:', e);
    return false;
  }
};

// Flat array of all treatments with categories and urls (including custom created ones)
export const getAllTreatments = () => {
  const result = [];
  const addedSlugs = new Set();
  
  // 1. Standard catalog
  for (const [catKey, items] of Object.entries(treatmentsMenuData)) {
    const categoryName = getTreatmentCategory(items[0]?.slug || '');
    items.forEach(item => {
      addedSlugs.add(item.slug);
      
      // Check if customized
      const isCustomized = !!localStorage.getItem(`aevora_treatment_${item.slug}`);
      result.push({
        name: item.name,
        slug: item.slug,
        category: categoryName,
        url: `/treatments/${item.slug}`,
        isCustomized
      });
    });
  }
  
  // 2. Additional custom pages created in admin
  const customPages = getCustomPagesRegistry();
  customPages.forEach(cp => {
    if (!addedSlugs.has(cp.slug)) {
      addedSlugs.add(cp.slug);
      result.push({
        name: cp.name,
        slug: cp.slug,
        category: cp.category || 'CUSTOM',
        url: `/treatments/${cp.slug}`,
        isCustom: true,
        isCustomized: true
      });
    }
  });
  
  return result;
};
