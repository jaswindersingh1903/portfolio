import React, { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Moon, Sun, Briefcase } from 'lucide-react';
import type { ThemeMode } from '../hooks/useTheme';
import { smoothScrollTo, smoothScrollToElement } from '../utils/smoothScrollTo';

const NAV_ITEMS = ['Projects', 'About', 'Skills', 'Experience', 'Education', 'Contact'];

const SIGNATURE_LETTERS = ['J', 'A', 'S'];
const STROKE_DELAY_MS = 380;

const SignatureLogo: React.FC<{ active: boolean }> = ({ active }) => {
  const [strokeIndex, setStrokeIndex] = useState(0);

  useEffect(() => {
    if (strokeIndex >= SIGNATURE_LETTERS.length) return;
    const t = setTimeout(() => setStrokeIndex((i) => i + 1), STROKE_DELAY_MS);
    return () => clearTimeout(t);
  }, [strokeIndex]);

  const isComplete = strokeIndex >= SIGNATURE_LETTERS.length;

  return (
    <span
      className={`font-signature text-3xl leading-none transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 inline-block origin-left -mt-1 relative ${
        active
          ? 'text-white drop-shadow-[0_1px_8px_rgba(255,255,255,0.35)]'
          : 'text-gray-200 group-hover:text-white'
      }`}
      style={{ fontFamily: '"Sacramento", cursive' }}
    >
      {SIGNATURE_LETTERS.map((letter, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-300 ease-out"
          style={{
            opacity: i < strokeIndex ? 1 : 0,
            transform: i < strokeIndex ? 'translateY(0)' : 'translateY(4px)',
          }}
        >
          {letter}
        </span>
      ))}
      {!isComplete && (
        <span
          aria-hidden
          className="inline-block w-[2px] h-6 bg-white align-middle ml-0.5 animate-pulse"
        />
      )}
    </span>
  );
};

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const doc = document.documentElement;
      const progress = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Creates a detection zone:
      // -100px from top (offsets header)
      // -60% from bottom (active when element is in upper 40% of view)
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // When 'home' intersects the top zone, clear active section
          if (id === 'home') {
            setActiveSection('home');
          } else {
             // Convert 'about' -> 'About'
             const sectionName = id.charAt(0).toUpperCase() + id.slice(1);
             setActiveSection(sectionName);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections including home
    const sections = ['home', ...NAV_ITEMS.map(item => item.toLowerCase())];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const sectionId = id.toLowerCase();

    const doScroll = () => {
      const element = document.getElementById(sectionId);
      if (!element) return false;

      smoothScrollToElement(element, 80, 760);
      return true;
    };

    if (doScroll()) return;

    window.dispatchEvent(new CustomEvent('app:ensure-section', { detail: { id: sectionId } }));

    let attempts = 0;
    const maxAttempts = 12;
    const retry = () => {
      attempts += 1;
      if (doScroll() || attempts >= maxAttempts) return;
      window.setTimeout(retry, 80);
    };

    window.setTimeout(retry, 50);
  };

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-black/50 backdrop-blur-md border-white/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      {/* Reading progress bar */}
      <div className="absolute top-0 left-0 h-[2px] bg-white/10 w-full">
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-white to-orange-500 transition-all duration-75"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => smoothScrollTo(0, 760)}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing Glow Effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-[4px] animate-pulse-slow"></div>

            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-white to-gray-500 flex items-center justify-center z-10 shadow-lg shadow-white/5 ring-1 ring-white/10">
               <span className="text-black font-bold text-sm">JS</span>
            </div>

            {/* Live Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 z-20 flex h-2.5 w-2.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-black"></span>
            </div>
          </div>
          <SignatureLogo active={activeSection === 'home'} />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`text-sm transition-all duration-300 relative ${
                activeSection === item
                  ? 'text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item}
              {/* Active Indicator */}
              <span className={`absolute -bottom-1.5 left-0 w-full h-[1px] bg-white transition-transform duration-300 origin-left ${activeSection === item ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </button>
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
          <button
            onClick={onToggleTheme}
            aria-label="Switch theme"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            type="button"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : theme === 'light' ? <Sun className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            <span>{theme === 'dark' ? 'Dark Mode' : theme === 'light' ? 'Light Mode' : 'Blue Mode'}</span>
          </button>
          <a href="https://www.linkedin.com/in/devjaswindersingh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black border-b border-white/10 p-4 flex flex-col gap-4">
          <button
            onClick={onToggleTheme}
            className="text-left text-sm py-2 transition-colors text-gray-400 hover:text-white flex items-center gap-2"
            type="button"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : theme === 'light' ? <Sun className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            {theme === 'dark' ? 'Dark Mode' : theme === 'light' ? 'Light Mode' : 'Blue Mode'}
          </button>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`text-left text-sm py-2 transition-colors ${
                activeSection === item ? 'text-white font-medium pl-2 border-l-2 border-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
