import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSite } from '../context/site';

const LINKS = [
  { id: 'index', label: 'Index' },
  { id: 'build', label: 'Build' },
  { id: 'method', label: 'Method' },
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'stack', label: 'Stack' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

/** Which nav item a section belongs to. */
const OWNER: Record<string, string> = {
  index: 'index',
  idea: 'index',
  build: 'build',
  domains: 'build',
  method: 'method',
  outcome: 'method',
  clients: 'work',
  work: 'work',
  lab: 'lab',
  stack: 'stack',
  thinking: 'about',
  about: 'about',
  shell: 'contact',
  contact: 'contact',
};

/** Section names, in page order — shown beside the logo when the links collapse. */
const WHERE: [string, string][] = [
  ['index', 'Index'],
  ['idea', 'Core idea'],
  ['build', 'What we build'],
  ['domains', 'Domains'],
  ['method', 'Method'],
  ['outcome', 'Outcome'],
  ['clients', 'Clients'],
  ['work', 'Work'],
  ['lab', 'Lab'],
  ['stack', 'Stack'],
  ['thinking', 'Thinking'],
  ['about', 'About'],
  ['shell', 'Shell'],
  ['contact', 'Contact'],
];

export function ModeSwitch({ compact = false }: { compact?: boolean }) {
  const { mode, toggleMode } = useSite();
  return (
    <button
      type="button"
      className={`mode-switch mono ${compact ? 'is-compact' : ''}`}
      onClick={toggleMode}
      aria-pressed={mode === 'source'}
      title="See the system underneath (S)"
    >
      <span className={mode === 'human' ? 'on' : ''}>Interface</span>
      <span className="mode-switch-sep" aria-hidden="true">
        /
      </span>
      <span className={mode === 'source' ? 'on' : ''}>System</span>
      {!compact && <kbd aria-hidden="true">S</kbd>}
    </button>
  );
}

function RegisterIndicator() {
  const { register } = useSite();
  return (
    <span className="register mono" aria-hidden="true" title="Is this section about the idea, or the system?">
      <span className={register === 'idea' ? 'on' : ''}>Idea</span>
      <span className="register-track">
        <motion.span
          className="register-dot"
          animate={{ x: register === 'idea' ? 0 : 14 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </span>
      <span className={register === 'system' ? 'on' : ''}>System</span>
    </span>
  );
}

export function Nav() {
  const { active } = useSite();
  const [open, setOpen] = useState(false);
  const current = OWNER[active] ?? 'index';
  const { scrollYProgress } = useScroll();
  const whereIndex = Math.max(0, WHERE.findIndex(([id]) => id === active));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a href="#index" className="nav-mark mono" onClick={() => setOpen(false)}>
            Tradifier
          </a>
          <span className="nav-where mono" aria-hidden="true">
            <span className="accent">{String(whereIndex).padStart(2, '0')}</span> {WHERE[whereIndex][1]}
          </span>
          <nav aria-label="Primary" className="nav-links">
            <ol>
              {LINKS.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={current === l.id ? 'is-active' : ''}
                    aria-current={current === l.id ? 'location' : undefined}
                  >
                    <span className="nav-num">{String(i).padStart(2, '0')}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="nav-tools">
            <RegisterIndicator />
            <ModeSwitch />
          </div>
          <button
            type="button"
            className="nav-menu mono"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <motion.span className="nav-progress" aria-hidden="true" style={{ scaleX: scrollYProgress }} />
      </header>

      {/* Rendered outside <header>: the header's backdrop-filter would otherwise trap this fixed sheet inside the bar. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              <ol>
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a href={`#${l.id}`} onClick={() => setOpen(false)} className={current === l.id ? 'is-active' : ''}>
                      <span className="mono">{String(i).padStart(2, '0')}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <div className="sheet-foot">
              <ModeSwitch compact />
              <span className="mono dim">we build systems</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
