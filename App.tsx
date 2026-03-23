import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { LOADER_FACTS } from './loaderFacts';
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

const InitialLoader: React.FC<{ hidden: boolean; progress: number }> = ({ hidden, progress }) => {
  const fact = useMemo(() => LOADER_FACTS[Math.floor(Math.random() * LOADER_FACTS.length)], []);
  const factIndex = useMemo(() => LOADER_FACTS.indexOf(fact) + 1, [fact]);

  return (
    <div className={`initial-loader ${hidden ? 'initial-loader--hidden' : ''}`} aria-hidden={hidden}>
      <div className="initial-loader__card">
        <div className="initial-loader__card-header">
          <span className="initial-loader__card-tag">// dev fact #{String(factIndex).padStart(2, '0')}</span>
          <span className="initial-loader__card-dots">
            <span /><span /><span />
          </span>
        </div>
        <div className="initial-loader__card-body">
          <span className="initial-loader__quote-mark">&ldquo;</span>
          <p className="initial-loader__fact">{fact}</p>
          <span className="initial-loader__quote-mark initial-loader__quote-mark--close">&rdquo;</span>
        </div>
        <div className="initial-loader__card-footer">
          <div className="initial-loader__meter" aria-label={`Loading ${progress}%`}>
            <div className="initial-loader__meter-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="initial-loader__text">{progress < 100 ? 'Loading…' : 'Ready'}</p>
        </div>
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
