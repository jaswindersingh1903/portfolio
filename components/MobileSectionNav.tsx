import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { smoothScrollToElement } from '../utils/smoothScrollTo';

const SECTION_ORDER = ['home', 'about', 'skills', 'projects', 'experience', 'contact'] as const;

const MobileSectionNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<(typeof SECTION_ORDER)[number]>('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          const id = visibleEntry.target.id as (typeof SECTION_ORDER)[number];
          setActiveSection(id);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: [0.2, 0.5, 0.8],
      }
    );

    const observedSections = SECTION_ORDER
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeIndex = SECTION_ORDER.indexOf(activeSection);

  const scrollToSection = (targetId: (typeof SECTION_ORDER)[number]) => {
    const attemptScroll = () => {
      const element = document.getElementById(targetId);
      if (!element) return false;

      smoothScrollToElement(element, 80, 760);
      return true;
    };

    if (attemptScroll()) return;

    window.dispatchEvent(new CustomEvent('app:ensure-section', { detail: { id: targetId } }));

    let attempts = 0;
    const retry = () => {
      attempts += 1;
      if (attemptScroll() || attempts >= 12) return;
      window.setTimeout(retry, 80);
    };

    window.setTimeout(retry, 60);
  };

  const goToPrevious = () => {
    if (activeIndex <= 0) return;
    scrollToSection(SECTION_ORDER[activeIndex - 1]);
  };

  const goToNext = () => {
    if (activeIndex >= SECTION_ORDER.length - 1) return;
    scrollToSection(SECTION_ORDER[activeIndex + 1]);
  };

  return (
    <div className="fixed right-4 bottom-6 z-[120] flex items-center gap-2 md:right-6 md:bottom-8">
      <button
        type="button"
        aria-label="Go to previous section"
        onClick={goToPrevious}
        disabled={activeIndex <= 0}
        className="h-11 w-11 rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition-all disabled:opacity-35 disabled:cursor-not-allowed"
      >
        <ChevronUp className="mx-auto h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Go to next section"
        onClick={goToNext}
        disabled={activeIndex >= SECTION_ORDER.length - 1}
        className="h-11 w-11 rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition-all disabled:opacity-35 disabled:cursor-not-allowed"
      >
        <ChevronDown className="mx-auto h-5 w-5" />
      </button>
    </div>
  );
};

export default MobileSectionNav;
