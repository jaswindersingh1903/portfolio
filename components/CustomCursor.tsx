import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('Start');
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Mouse Movement Logic (Direct DOM manipulation for performance)
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Basic movement
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Detect hovering over clickable elements for hover states
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

    // 2. Section Detection Logic
    // We create a narrow detection zone in the middle of the screen
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          let newLabel = '';
          switch(id) {
            case 'home': newLabel = 'Start'; break;
            case 'about': newLabel = 'About'; break;
            case 'skills': newLabel = 'Skills'; break;
            case 'projects': newLabel = 'Work'; break;
            case 'experience': newLabel = 'Experience'; break;
            case 'contact': newLabel = 'Contact'; break;
            default: newLabel = '';
          }
          if (newLabel) setLabel(newLabel);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(s => observer.observe(s));

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, [isVisible]);

  // Don't render on mobile/touch devices to preserve native touch behavior
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
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
        className={`fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference flex items-center gap-3 transition-opacity duration-300 will-change-transform
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ marginTop: '-6px', marginLeft: '-6px' }} // Offset to center the dot
      >
        {/* Cursor Dot */}
        <div 
          className={`bg-white rounded-full transition-all duration-300 ease-out
            ${isHoveringClickable ? 'w-12 h-12 -ml-4 -mt-4 opacity-30' : 'w-3 h-3 opacity-100'}
          `}
        ></div>
        
        {/* Label Text */}
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