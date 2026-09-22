import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for on-scroll reveal animations
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Optional: unobserve once revealed for smooth performance
          // observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px', // triggers slightly before scrolling fully into view
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.reveal-fade-up, .reveal-fade-in, .reveal-fade-left, .reveal-fade-right, .reveal-stagger-grid, .reveal-scale'
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
};

export default useScrollReveal;
