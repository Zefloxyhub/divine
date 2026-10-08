import { MotionConfig } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SiteProvider, useSite } from './context/site';
import { About } from './components/About';
import { Code } from './components/Code';
import { Contact } from './components/Contact';
import { Contradiction } from './components/Contradiction';
import { FieldNotes } from './components/FieldNotes';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Ideas } from './components/Ideas';
import { Nav } from './components/Nav';
import { Politics } from './components/Politics';
import { Projects } from './components/Projects';
import { Shell } from './components/Shell';
import { Vibe } from './components/Vibe';
import { Work } from './components/Work';

/** A single scanline that sweeps the screen when the register flips. */
function ModeWipe() {
  const { mode } = useSite();
  const prev = useRef(mode);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (prev.current === mode) return;
    prev.current = mode;
    setN((x) => x + 1);
  }, [mode]);
  return n > 0 ? <div key={n} className="wipe" aria-hidden="true" /> : null;
}

function useAwayTitle() {
  useEffect(() => {
    const original = document.title;
    const onVis = () => {
      document.title = document.hidden ? '← still building' : original;
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
}

export default function App() {
  useAwayTitle();
  return (
    <MotionConfig reducedMotion="user">
      <SiteProvider>
        <a className="skip mono" href="#main">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <ModeWipe />
        <Nav />
        <main id="main">
          <Hero />
          <About />
          <Contradiction />
          <Work />
          <Projects />
          <Code />
          <Politics />
          <Vibe />
          <Ideas />
          <FieldNotes />
          <Shell />
          <Contact />
        </main>
        <Footer />
      </SiteProvider>
    </MotionConfig>
  );
}
