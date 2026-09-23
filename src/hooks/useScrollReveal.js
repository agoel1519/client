import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for on-scroll reveal animations.
 * Features:
 * - Dynamic element detection with MutationObserver
 * - Graceful fallback if IntersectionObserver is unavailable
 * - Eager check for elements already in viewport
 */
export const useScrollReveal = () => {
  useEffect(() => {
    // Fallback if IntersectionObserver is not supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll(
        '.reveal-fade-up, .reveal-fade-in, .reveal-fade-left, .reveal-fade-right, .reveal-stagger-grid, .reveal-scale'
      ).forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '60px 0px 60px 0px', // Trigger smoothly slightly before viewport
      threshold: 0.05
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeElements = () => {
      const animatedElements = document.querySelectorAll(
        '.reveal-fade-up:not(.is-revealed), .reveal-fade-in:not(.is-revealed), .reveal-fade-left:not(.is-revealed), .reveal-fade-right:not(.is-revealed), .reveal-stagger-grid:not(.is-revealed), .reveal-scale:not(.is-revealed)'
      );
      animatedElements.forEach((el) => {
        // If element is already within viewport height on load, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 50 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial pass
    observeElements();

    // Delayed pass after images / styles settle
    const t1 = setTimeout(observeElements, 100);
    const t2 = setTimeout(observeElements, 500);

    // Dynamic observer for dynamically mounted components
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    if (document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};

export default useScrollReveal;
