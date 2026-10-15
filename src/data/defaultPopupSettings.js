export const defaultPopupSettings = {
  enabled: true,
  layout: 'banner', // 'banner' (focused on high-impact imagery) or 'split' (image + side content)
  badge: 'SPECIAL ANNOUNCEMENT',
  title: 'Radiance Reimagined at Aevora',
  subtitle: 'Experience world-class laser therapies, bespoke medical facials, and dermal restoration customized by certified aesthetic physicians.',
  showCta: true,
  ctaText: 'Book Free Consultation',
  ctaLink: '#book',
  secondaryCtaText: 'WhatsApp Us',
  secondaryCtaLink: 'https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Aevora%20treatments',
  displayDelay: 2, // seconds
  displayFrequency: 'session', // 'always' | 'session' | 'once_per_day'
  targetPage: 'all', // 'all' | 'home'
  autoPlay: true,
  autoPlayInterval: 4, // seconds
  showDots: true,
  showArrows: true,
  showCloseButton: true,
  closeOnBackdrop: true,
  maxWidth: '720px',
  // Array of images: 1 item = Single Image Mode, 2+ items = Multi-Image Carousel Slider
  images: [
    {
      id: 'popup-img-1',
      url: '/banners/popup-offer-banner.jpg',
      alt: 'Radiance Reimagined - Aesthetic Excellence',
      title: 'Precision Aesthetics & Timeless Radiance',
      subtitle: 'Complimentary 3D Skin Analysis with every consultation this month',
      link: '#book',
      buttonText: 'Book Consultation'
    },
    {
      id: 'popup-img-2',
      url: '/banners/popup-offer-banner-2.jpg',
      alt: 'Luxury Skincare & Advanced Laser Therapies',
      title: 'Advanced Laser Rejuvenation & Serum Infusions',
      subtitle: 'US-FDA approved technology with certified dermatologists',
      link: '/#treatments',
      buttonText: 'Explore Treatments'
    },
    {
      id: 'popup-img-3',
      url: '/banners/banner-wellness.jpg',
      alt: 'Cellular Longevity & Vitality Protocols',
      title: 'Cellular Longevity & NAD+ Infusion Lounge',
      subtitle: 'Unlock cellular wellness with tailored anti-aging protocols',
      link: '/#treatments',
      buttonText: 'View Programs'
    }
  ]
};
