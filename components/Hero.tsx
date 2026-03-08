import React, { useEffect, useRef } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { PROFILE } from '../constants';
import { smoothScrollToElement } from '../utils/smoothScrollTo';

const SOCIAL = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/jaswindersingh1903' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/devjaswindersingh' },
  { icon: Mail,     label: 'Email',    href: `mailto:${PROFILE.email}` },
];

const Hero: React.FC = () => {
  const bgGradientRef = useRef<HTMLDivElement>(null);
  const bgGridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > window.innerHeight * 1.5) return;
      bgGradientRef.current && (bgGradientRef.current.style.transform = `translate3d(-50%, ${y * 0.4}px, 0)`);
      bgGridRef.current    && (bgGridRef.current.style.transform    = `translate3d(0, ${y * 0.2}px, 0)`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) smoothScrollToElement(contactSection, 80, 800);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) smoothScrollToElement(aboutSection, 80, 800);
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-16">

      {/* Background radial glow */}
      <div
        ref={bgGradientRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-white/10 to-transparent blur-3xl opacity-30 pointer-events-none will-change-transform"
      />
      {/* Grid overlay */}
      <div
        ref={bgGridRef}
        className="absolute inset-0 bg-grid z-0 pointer-events-none will-change-transform"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm opacity-0 animate-fade-in delay-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-300">Available for new projects</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-2 opacity-0 animate-fade-in-up delay-300">
          Full stack,{' '}
          <br className="hidden md:block" />
          front to back.
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up delay-500">
          I'm <span className="text-white font-medium">{PROFILE.name}</span> — a {PROFILE.title} with 7 years shipping production apps across healthcare, analytics, and SaaS. I own the whole stack: API design, React frontends, cloud deployment, and everything in between.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 opacity-0 animate-fade-in-up delay-700">
          <button
            onClick={scrollToContact}
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all hover:bg-gray-100 active:scale-95"
          >
            <span className="mr-2">Start Collaborating</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/5 px-8 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/30 active:scale-95 backdrop-blur-sm"
          >
            <Download className="mr-2 w-4 h-4" />
            Download Resume
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-1 opacity-0 animate-fade-in delay-700">
          {SOCIAL.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-all"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
          <div className="h-3 w-[1px] bg-white/10 mx-2" />
          <span className="text-xs text-gray-600 font-mono">{PROFILE.location}</span>
        </div>
      </div>

      {/* Scroll-down cue */}
      <button
        onClick={scrollToAbout}
        aria-label="Scroll down"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-600 hover:text-gray-400 transition-colors opacity-0 animate-fade-in delay-700"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
