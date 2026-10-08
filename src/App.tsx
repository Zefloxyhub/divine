import { MotionConfig } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SiteProvider, useSite } from './context/site';
import { About } from './components/About';
import { Build } from './components/Build';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { CoreIdea } from './components/CoreIdea';
import { Domains } from './components/Domains';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Lab } from './components/Lab';
import { Method } from './components/Method';
import { Nav } from './components/Nav';
import { Outcome } from './components/Outcome';
import { Projects } from './components/Projects';
import { Shell } from './components/Shell';
import { Stack } from './components/Stack';
import { Thinking } from './components/Thinking';

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
      document.title = document.hidden ? '← still building systems' : original;
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
          <CoreIdea />
          <Build />
          <Domains />
          <Method />
          <Outcome />
          <Clients />
          <Projects />
          <Lab />
          <Stack />
          <Thinking />
          <About />
          <Shell />
          <Contact />
        </main>
        <Footer />
      </SiteProvider>
    </MotionConfig>
  );
}
