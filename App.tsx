import React, { Suspense, lazy, useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollTrace from './components/ScrollTrace';
import CustomCursor from './components/CustomCursor';
import Background from './components/Background';
import MobileTikTokScroll from './components/MobileTikTokScroll';
import MobileSectionNav from './components/MobileSectionNav';
import { useTheme } from './hooks/useTheme';
import { smoothScrollToElement } from './utils/smoothScrollTo';

const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));

const SectionSkeleton: React.FC<{ id: string }> = ({ id }) => (
  <section id={id} className="min-h-screen border-t border-white/5 relative">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10" />
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="h-9 w-56 rounded-md bg-white/10 animate-pulse mb-10" />
      <div className="space-y-4">
        <div className="h-4 w-full max-w-2xl rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-full max-w-xl rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-full max-w-3xl rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  </section>
);

const SIGNATURE_LOADER_LETTERS = ['J', 'A', 'S'];

const InitialLoader: React.FC<{ hidden: boolean; progress: number }> = ({ hidden, progress }) => {
  const lettersShown = Math.min(
    SIGNATURE_LOADER_LETTERS.length,
    Math.floor((progress / 100) * SIGNATURE_LOADER_LETTERS.length) + (progress > 0 ? 1 : 0)
  );
  const isSignatureComplete = lettersShown >= SIGNATURE_LOADER_LETTERS.length;

  return (
    <div className={`initial-loader ${hidden ? 'initial-loader--hidden' : ''}`} aria-hidden={hidden}>
      <div className="initial-loader__signature-stage">
        <span
          className={`initial-loader__signature ${isSignatureComplete ? 'initial-loader__signature--complete' : ''}`}
          style={{ fontFamily: '"Sacramento", cursive' }}
          aria-label="JAS"
        >
          {SIGNATURE_LOADER_LETTERS.map((letter, i) => (
            <span
              key={i}
              className={`initial-loader__signature-letter ${i < lettersShown ? 'is-written' : ''}`}
            >
              {letter}
            </span>
          ))}
          {!isSignatureComplete && <span aria-hidden className="initial-loader__signature-pen" />}
        </span>
        <span aria-hidden className={`initial-loader__signature-underline ${isSignatureComplete ? 'is-visible' : ''}`} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isEducationMounted, setIsEducationMounted] = useState(false);
  const [isContactMounted, setIsContactMounted] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(1);
  const { theme, toggleTheme } = useTheme();

  const ensureSectionMounted = (sectionId?: string) => {
    if (!sectionId) return;
    if (sectionId === 'education' || sectionId === 'contact') {
      void import('./components/Education');
      void import('./components/Contact');
      setIsEducationMounted(true);
      setIsContactMounted(true);
    }
  };

  useEffect(() => {
    let active = true;
    const startedAt = performance.now();
    let frameId = 0;

    const updateProgress = () => {
      const elapsed = performance.now() - startedAt;
      const nextProgress = Math.min(100, Math.max(1, Math.round((elapsed / 2500) * 100)));
      if (active) {
        setLoaderProgress(nextProgress);
        if (nextProgress < 100) {
          frameId = window.requestAnimationFrame(updateProgress);
        }
      }
    };

    frameId = window.requestAnimationFrame(updateProgress);

    const onReady = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, 2500 - elapsed);

      window.setTimeout(() => {
        if (active) {
          setLoaderProgress(100);
          setIsBootComplete(true);
        }
      }, remaining);
    };

    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady, { once: true });
    }

    return () => {
      active = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('load', onReady);
    };
  }, []);

  // Mount Education + Contact when Experience enters view
  useEffect(() => {
    const experienceEl = document.getElementById('experience');
    if (!experienceEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void import('./components/Education');
            void import('./components/Contact');
            setIsEducationMounted(true);
            setIsContactMounted(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin: '0px 0px -30% 0px', threshold: 0.05 }
    );

    observer.observe(experienceEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEnsureSection = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>;
      ensureSectionMounted(customEvent.detail?.id);
    };

    window.addEventListener('app:ensure-section', handleEnsureSection as EventListener);
    return () => window.removeEventListener('app:ensure-section', handleEnsureSection as EventListener);
  }, []);

  useEffect(() => {
    const scrollToHashTarget = (hash: string) => {
      const id = hash.replace('#', '').trim();
      if (!id) return;

      ensureSectionMounted(id);

      let tries = 0;
      const maxTries = 14;
      const tryScroll = () => {
        tries += 1;
        const el = document.getElementById(id);
        if (el) {
          smoothScrollToElement(el, 80, 760);
          return;
        }
        if (tries < maxTries) window.setTimeout(tryScroll, 70);
      };
      window.setTimeout(tryScroll, 20);
    };

    if (window.location.hash) scrollToHashTarget(window.location.hash);

    const onHashChange = () => {
      if (window.location.hash) scrollToHashTarget(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className={`app-shell theme-${theme} min-h-screen font-sans relative`}>
      <InitialLoader hidden={isBootComplete} progress={loaderProgress} />
      <div className={`app-content ${isBootComplete ? 'app-content--visible' : ''}`}>
        <CustomCursor />
        <Background />
        <ScrollTrace />
        <MobileTikTokScroll />
        <MobileSectionNav />
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main className="relative z-10">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Experience />
          {isEducationMounted && (
            <Suspense fallback={<SectionSkeleton id="education" />}>
              <Education />
            </Suspense>
          )}
          {isContactMounted && (
            <Suspense fallback={<SectionSkeleton id="contact" />}>
              <Contact />
            </Suspense>
          )}
        </main>
        <ChatWidget />
        <Footer />
      </div>
    </div>
  );
};

export default App;
