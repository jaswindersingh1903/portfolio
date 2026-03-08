import React, { useEffect, useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { PROFILE } from '../constants';

const Hero: React.FC = () => {
  const bgGradientRef = useRef<HTMLDivElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Optimization: Stop animating if scrolled well past the hero section
      if (scrollPosition > windowHeight * 1.5) return;

      if (bgGradientRef.current) {
        // Gradient moves at 0.4x speed. Maintained translateX(-50%) for centering.
        // Using translate3d for hardware acceleration
        bgGradientRef.current.style.transform = `translate3d(-50%, ${scrollPosition * 0.4}px, 0)`;
      }

      if (bgGridRef.current) {
        // Grid moves at 0.2x speed for a different depth layer
        bgGridRef.current.style.transform = `translate3d(0, ${scrollPosition * 0.2}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Added pt-16 to offset fixed header, but pb-32 to visually bias the content upwards (reducing "top padding" feel)
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-16 pb-32">

      {/* Background Gradients - Parallax Layer 1 */}
      <div
        ref={bgGradientRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-white/10 to-transparent blur-3xl opacity-30 pointer-events-none will-change-transform"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm opacity-0 animate-fade-in delay-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-300">Available for new projects</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-2 opacity-0 animate-fade-in-up delay-300">
          Full stack, <br className="hidden md:block" /> front to back.
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up delay-500">
          I'm <span className="text-white font-medium">{PROFILE.name}</span> — a {PROFILE.title} with 6 years shipping production apps across healthcare, analytics, and SaaS. I own the whole stack: API design, React frontends, cloud deployment, and everything in between.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up delay-700">
          <button
            onClick={scrollToContact}
            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all hover:bg-gray-200"
          >
            <span className="mr-2">Start Collaborating</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <Download className="mr-2 w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>

      {/* Grid Pattern Overlay at bottom - Parallax Layer 2 */}
      <div
        ref={bgGridRef}
        className="absolute inset-0 bg-grid z-0 pointer-events-none will-change-transform"
      />
    </section>
  );
};

export default Hero;
