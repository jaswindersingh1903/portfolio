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
import MobileTikTokScroll from './components/MobileTikTokScroll';
import { useTheme } from './hooks/useTheme';

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

const InitialLoader: React.FC<{ hidden: boolean }> = ({ hidden }) => (
  <div className={`initial-loader ${hidden ? 'initial-loader--hidden' : ''}`} aria-hidden={hidden}>
    <div className="initial-loader__ring" />
    <p className="initial-loader__text">Loading portfolio...</p>
  </div>
);

const App: React.FC = () => {
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isContactMounted, setIsContactMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const ensureSectionMounted = (sectionId?: string) => {
    if (!sectionId) return;
    if (sectionId !== 'contact') return;
    void import('./components/Contact');
    setIsContactMounted(true);
  };

  useEffect(() => {
    let active = true;
    const onReady = () => {
      window.setTimeout(() => {
        if (active) {
          setIsBootComplete(true);
        }
      }, 250);
    };

    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady, { once: true });
    }

    return () => {
      active = false;
      window.removeEventListener('load', onReady);
    };
  }, []);

  useEffect(() => {
    const experienceEl = document.getElementById('experience');
    if (!experienceEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // n-1 behavior for contact only: load as experience becomes visible
          if (entry.isIntersecting) {
            void import('./components/Contact');
            setIsContactMounted(true);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30% 0px',
        threshold: 0.05,
      }
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
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
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
      <InitialLoader hidden={isBootComplete} />
      <CustomCursor />
      <ScrollTrace />
      <MobileTikTokScroll />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        {isContactMounted && (
          <Suspense fallback={<SectionSkeleton id="contact" />}>
            <Contact />
          </Suspense>
        )}
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default App;
