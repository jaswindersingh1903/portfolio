import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollTrace from './components/ScrollTrace';
import CustomCursor from './components/CustomCursor';
import MobileTikTokScroll from './components/MobileTikTokScroll';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500/30 selection:text-white relative">
      <CustomCursor />
      <ScrollTrace />
      <MobileTikTokScroll />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default App;
