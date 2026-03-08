import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('Start');
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        const target = e.target as HTMLElement;
        const isClickable =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          window.getComputedStyle(target).cursor === 'pointer';

        setIsHoveringClickable(!!isClickable);
      }

      if (!isVisible) setIsVisible(true);
    };

    // Hide cursor when mouse leaves the browser window
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Section label detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const map: Record<string, string> = {
              home: 'Start', about: 'About', skills: 'Skills',
              projects: 'Work', experience: 'XP', education: 'Study', contact: 'Contact',
            };
            if (map[id]) setLabel(map[id]);
          }
        });
      },
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    document.querySelectorAll('section').forEach(s => observer.observe(s));

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <style>{`
        body, a, button, input, textarea, select, label, summary,
        [role="button"], [tabindex], [draggable],
        .cursor-pointer, [class*="cursor-pointer"] {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[200] pointer-events-none mix-blend-difference flex items-center gap-3 transition-opacity duration-300 will-change-transform
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ marginTop: '-6px', marginLeft: '-6px' }}
      >
        {/* Dot */}
        <div
          className={`bg-white rounded-full shrink-0 transition-all duration-300 ease-out
            ${isHoveringClickable ? 'w-12 h-12 -ml-4 -mt-4 opacity-30' : 'w-3 h-3 opacity-100'}
          `}
        />

        {/* Label — hidden near clickable so it doesn't distract */}
        <span
          className={`text-xs font-mono tracking-[0.2em] uppercase text-white whitespace-nowrap transition-all duration-300
            ${isHoveringClickable ? 'opacity-0 translate-x-4' : 'opacity-70 translate-x-0'}
          `}
        >
          {label}
        </span>
      </div>
    </>
  );
};

export default CustomCursor;
