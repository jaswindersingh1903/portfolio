import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { smoothScrollToElement } from '../utils/smoothScrollTo';

const SECTION_ORDER = ['home', 'projects', 'about', 'skills', 'experience', 'education', 'contact'] as const;

const MobileSectionNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<(typeof SECTION_ORDER)[number]>('home');
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      // The active section is the last one whose top edge is above 40% of the viewport.
      // This is stable regardless of section height.
      const threshold = window.scrollY + window.innerHeight * 0.4;
      let best: (typeof SECTION_ORDER)[number] = SECTION_ORDER[0];
      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) best = id;
      }
      setActiveSection(best);
    };

    const onScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(update);
    };

    update(); // run once on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameRef.current);
    };
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
