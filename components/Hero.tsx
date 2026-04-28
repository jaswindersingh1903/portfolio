import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { PROFILE } from '../constants';
import { smoothScrollToElement } from '../utils/smoothScrollTo';
import { YEARS_OF_EXPERIENCE } from '../utils/yearsOfExperience';

// ── Tech stack carousel ────────────────────────────────────────────────────────
type Tech = { name: string; abbr: string; color: string; isReact?: boolean };
type StackPage = { label: string; items: Tech[] };

const STACK_PAGES: StackPage[] = [
  {
    label: 'MEAN Stack',
    items: [
      { name: 'MongoDB',  abbr: 'Mn', color: '#47A248' },
      { name: 'Express',  abbr: 'Ex', color: '#9CA3AF' },
      { name: 'Angular',  abbr: 'Ng', color: '#DD0031' },
      { name: 'Node.js',  abbr: 'N',  color: '#68A063' },
    ],
  },
  {
    label: 'MERN Stack',
    items: [
      { name: 'MongoDB',  abbr: 'Mn', color: '#47A248' },
      { name: 'Express',  abbr: 'Ex', color: '#9CA3AF' },
      { name: 'React',    abbr: 'Re', color: '#61DAFB', isReact: true },
      { name: 'Node.js',  abbr: 'N',  color: '#68A063' },
    ],
  },
  {
    label: 'LAMP Stack',
    items: [
      { name: 'Linux',    abbr: 'Lx', color: '#FCC624' },
      { name: 'Apache',   abbr: 'Ap', color: '#D22128' },
      { name: 'MySQL',    abbr: 'My', color: '#4479A1' },
      { name: 'PHP',      abbr: 'PH', color: '#8892BF' },
    ],
  },
  {
    label: 'DevOps',
    items: [
      { name: 'Docker',   abbr: 'D',  color: '#2496ED' },
      { name: 'AWS',      abbr: 'AW', color: '#FF9900' },
      { name: 'Azure',    abbr: 'Az', color: '#0078D4' },
      { name: 'Linux',    abbr: 'Lx', color: '#FCC624' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React',       abbr: 'Re', color: '#61DAFB', isReact: true },
      { name: 'TypeScript',  abbr: 'TS', color: '#3178C6' },
      { name: 'Angular',     abbr: 'Ng', color: '#DD0031' },
      { name: 'SASS',        abbr: 'Sc', color: '#CC6699' },
      { name: 'Figma',       abbr: 'Fg', color: '#F24E1E' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js',     abbr: 'N',   color: '#68A063' },
      { name: 'Python',      abbr: 'Py',  color: '#FFD43B' },
      { name: 'PHP',         abbr: 'PH',  color: '#8892BF' },
      { name: 'MySQL',       abbr: 'My',  color: '#4479A1' },
      { name: 'WebSockets',  abbr: 'WS',  color: '#6366F1' },
      { name: 'REST APIs',   abbr: 'API', color: '#10B981' },
    ],
  },
  {
    label: 'AI',
    items: [
      { name: 'Agentic AI',  abbr: 'AI', color: '#8B5CF6' },
      { name: 'Claude Code', abbr: 'CC', color: '#D97706' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git',      abbr: 'Gi', color: '#F05032' },
      { name: 'Redis',    abbr: 'Rd', color: '#DC382D' },
      { name: 'Webpack',  abbr: 'Wp', color: '#8DD6F9' },
      { name: 'CI/CD',    abbr: 'CI', color: '#EF4444' },
      { name: 'Agile',    abbr: 'Ag', color: '#6366F1' },
    ],
  },
];

const ReactAtom: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(-60 12 12)" />
  </svg>
);

const TechIcon: React.FC<{ tech: Tech }> = ({ tech }) => {
  if (tech.isReact) return <ReactAtom />;
  const darkText = ['#FCC624', '#9CA3AF', '#FFD43B', '#8DD6F9'].includes(tech.color);
  return (
    <span
      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-[3px] text-[8px] font-bold leading-none shrink-0"
      style={{ background: tech.color, color: darkText ? '#1a1a1a' : '#fff' }}
    >
      {tech.abbr}
    </span>
  );
};

const TechCarousel: React.FC = () => {
  const [pageIdx, setPageIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPageIdx(p => (p + 1) % STACK_PAGES.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const { label, items } = STACK_PAGES[pageIdx];

  return (
    <div className="flex flex-col items-center sm:items-start gap-2.5 opacity-0 animate-fade-in delay-500">
      <div
        className="flex flex-col items-center gap-2 transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono">{label}</span>
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 max-w-xs sm:max-w-none">
          {items.map(tech => (
            <div
              key={tech.name}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border"
              style={{
                color: tech.color,
                borderColor: `${tech.color}38`,
                background: `${tech.color}10`,
              }}
            >
              <TechIcon tech={tech} />
              {tech.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 w-full">
        {STACK_PAGES.map((_, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full transition-all duration-300"
            style={{
              width: i === pageIdx ? 14 : 4,
              background: i === pageIdx ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ── Subtle mountain ranges ────────────────────────────────────────────────────
const Mountains: React.FC = () => (
  <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none" style={{ zIndex: 1 }}>
    <svg
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="w-full"
      style={{ display: 'block' }}
    >
      {/* Back range — lowest opacity, tallest peaks */}
      <path
        d="M0 320 L0 200 L80 155 L160 195 L260 120 L360 175 L440 130 L520 165 L620 95 L720 145 L820 105 L900 150 L980 115 L1060 160 L1160 100 L1260 150 L1360 120 L1440 155 L1440 320 Z"
        fill="rgba(255,255,255,0.022)"
      />
      {/* Mid range */}
      <path
        d="M0 320 L0 235 L100 200 L200 220 L300 175 L400 210 L500 180 L600 215 L700 170 L800 200 L900 178 L1000 210 L1100 182 L1200 215 L1300 188 L1440 210 L1440 320 Z"
        fill="rgba(255,255,255,0.032)"
      />
      {/* Front range — most visible, lowest peaks */}
      <path
        d="M0 320 L0 268 L120 245 L220 262 L340 238 L460 258 L560 240 L680 260 L780 242 L900 262 L1020 244 L1140 264 L1260 248 L1380 262 L1440 252 L1440 320 Z"
        fill="rgba(255,255,255,0.045)"
      />
    </svg>
  </div>
);

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
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">

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

        {/* Heading + inline tech stack */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-2 opacity-0 animate-fade-in-up delay-300 shrink-0">
            Full stack.
          </h1>
          <TechCarousel />
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up delay-500">
          I'm <span className="text-white font-medium">{PROFILE.name}</span> — a {PROFILE.title} with {YEARS_OF_EXPERIENCE} years shipping production apps across healthcare, analytics, and SaaS. I own the whole stack: API design, React frontends, cloud deployment, and everything in between.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 opacity-0 animate-fade-in-up delay-700">
          {/* <button
            onClick={scrollToContact}
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all hover:bg-gray-100 active:scale-95"
          >
            <span className="mr-2">Start Collaborating</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button> */}

          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Jaswinder_Singh_Resume.pdf"
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all hover:bg-gray-100 active:scale-95"
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

      <Mountains />

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
