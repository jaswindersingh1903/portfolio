import React, { useEffect } from 'react';

const MobileTikTokScroll: React.FC = () => {
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    const sections = Array.from(mainEl.querySelectorAll('section'));
    if (sections.length === 0) return;

    // Hero (index 0) is excluded:
    //   - It already has child-level opacity-0 + animate-fade-in-up
    //   - Must be visible immediately on load
    const nonHeroSections = sections.slice(1);

    nonHeroSections.forEach(s => s.classList.add('section-snap-target'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-revealed');
            observer.unobserve(entry.target); // one-shot, same pattern as Projects.tsx cards
          }
        });
      },
      {
        root: null,
        rootMargin: '-10px 0px -15% 0px',
        threshold: 0,
      }
    );

    nonHeroSections.forEach(s => observer.observe(s));

    return () => {
      observer.disconnect();
      sections.forEach(s => s.classList.remove('section-snap-target', 'section-revealed'));
    };
  }, []);

  return null;
};

export default MobileTikTokScroll;
