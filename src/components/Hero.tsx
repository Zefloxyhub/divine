import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { hero } from '../data/site';
import { TOUCH, useMedia } from '../hooks/useMedia';
import { Section } from './Section';

const ease = [0.22, 1, 0.36, 1] as const;

function useTick(ms: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setN((x) => x + 1), ms);
    return () => window.clearInterval(t);
  }, [ms]);
  return n;
}

const pad = (n: number) => String(n).padStart(2, '0');

/* ───────── the signature: SYSTEM → its parts → TRADIFIER ───────── */

const WORD = 'SYSTEMS.';
const TARGET = 'TRADIFIER';
/** Where each letter drifts when the word breaks (deterministic, so it feels designed rather than random). */
const SCATTER = WORD.split('').map((_, i) => ({
  x: (i % 2 ? 1 : -1) * (14 + i * 6),
  y: ((i % 3) - 1) * 46,
  rotate: (i % 2 ? 1 : -1) * (6 + i * 2),
}));
/** Where the fragments land, as % of the word's box. */
const SPOTS = [
  { left: 6, top: -12 },
  { left: 36, top: -20 },
  { left: 70, top: -10 },
  { left: 98, top: 46 },
  { left: 80, top: 106 },
  { left: 46, top: 116 },
  { left: 12, top: 102 },
];

type Phase = 'idle' | 'split' | 'merge';

function SystemWord() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  const run = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setPhase('split');
    timers.current = [
      window.setTimeout(() => setPhase('merge'), reduce ? 400 : 900),
      window.setTimeout(() => {
        setPhase('idle');
        busy.current = false;
      }, reduce ? 2200 : 3100),
    ];
  }, [reduce]);

  useEffect(() => {
    const intro = window.setTimeout(run, 2400);
    return () => {
      window.clearTimeout(intro);
      timers.current.forEach(window.clearTimeout);
    };
  }, [run]);

  const word = phase === 'merge' ? TARGET : WORD;

  return (
    <button
      type="button"
      className={`sys is-${phase}`}
      onClick={run}
      onPointerEnter={(e) => e.pointerType === 'mouse' && run()}
      aria-label="Systems. Activate to break the word into its parts."
    >
      <span className="sys-word" aria-hidden="true">
        {word.split('').map((ch, i) => {
          const s = SCATTER[i % SCATTER.length];
          return (
            <motion.span
              key={`${word}-${i}`}
              className="sys-l"
              initial={word === TARGET ? { opacity: 0, y: '45%' } : { opacity: 0, y: '-25%' }}
              animate={
                phase === 'split'
                  ? reduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: s.x, y: s.y, rotate: s.rotate, filter: 'blur(6px)' }
                  : { opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.5, delay: phase === 'split' ? i * 0.02 : 0.15 + i * 0.035, ease }}
            >
              {ch}
            </motion.span>
          );
        })}
      </span>
      <span className={`sys-tap mono ${phase === 'idle' ? '' : 'is-hidden'}`} aria-hidden="true">
        tap
      </span>
      <AnimatePresence>
        {phase !== 'idle' &&
          hero.fragments.map((f, i) => (
            <motion.span
              key={f}
              className="sys-frag mono"
              aria-hidden="true"
              style={{ x: '-50%', y: '-50%' }}
              initial={{ opacity: 0, left: '50%', top: '50%', scale: 0.6 }}
              animate={
                phase === 'split'
                  ? { opacity: 1, left: `${SPOTS[i].left}%`, top: `${SPOTS[i].top}%`, scale: 1 }
                  : { opacity: 0, left: '50%', top: '50%', scale: 0.4 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: phase === 'split' ? 0.45 : 0.35, delay: i * 0.025, ease }}
            >
              {f}
            </motion.span>
          ))}
      </AnimatePresence>
    </button>
  );
}

/* ───────── status block + chain ───────── */

function Status() {
  const seconds = useTick(1000);
  const modeTick = useTick(3200);
  const reduce = useReducedMotion();
  const mode = hero.modes[modeTick % hero.modes.length];
  const [typed, setTyped] = useState(mode);

  useEffect(() => {
    if (reduce) return setTyped(mode);
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setTyped(mode.slice(0, i));
      if (i >= mode.length) window.clearInterval(t);
    }, 45);
    return () => window.clearInterval(t);
  }, [mode, reduce]);

  const uptime = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`;

  return (
    <motion.div
      className="status mono"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease }}
      aria-label="Status"
    >
      <div className="status-title">
        TRADIFIER_OS <span className="status-live" aria-hidden="true" />
      </div>
      <div className="status-rule" aria-hidden="true">
        ────────────────────────────────────────────────────────────
      </div>
      <dl>
        {hero.status.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>
              {v === '__cycle__' ? (
                <>
                  <span className="accent">{typed}</span>
                  <span className="caret" aria-hidden="true" />
                </>
              ) : (
                v
              )}
            </dd>
          </div>
        ))}
        <div>
          <dt>UPTIME</dt>
          <dd aria-hidden="true">{uptime}</dd>
        </div>
      </dl>
    </motion.div>
  );
}

function Chain() {
  const tick = useTick(1300);
  const words = hero.chain;
  const active = tick % words.length;
  return (
    <p className="chain mono" aria-label={words.join(' to ')}>
      {words.map((w, i) => (
        <span key={i} className="chain-item" aria-hidden="true">
          <span className={`chain-word ${i === active ? 'is-on' : ''}`}>
            {w}
            {i === active && (
              <motion.span layoutId="chain-cursor" className="chain-cursor" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
            )}
          </span>
          {i < words.length - 1 && <span className="chain-arrow">→</span>}
        </span>
      ))}
    </p>
  );
}

export function Hero() {
  const [hover, setHover] = useState<number | null>(null);
  const touch = useMedia(TOUCH);
  const reduce = useReducedMotion();
  const cycling = touch && !reduce;

  // Touch screens have no hover: walk through the disciplines instead, so the captions are still seen.
  useEffect(() => {
    if (!cycling) return;
    const t = window.setInterval(() => setHover((h) => ((h ?? -1) + 1) % hero.disciplines.length), 2600);
    return () => window.clearInterval(t);
  }, [cycling]);
  return (
    <Section
      id="index"
      label="Index"
      register="idea"
      bare
      className="hero"
      source={{
        file: 'index.py',
        comment: 'the studio, described as the thing it builds.',
        name: 'tradifier',
        type: 'System',
        value: {
          builds: 'systems',
          disciplines: hero.disciplines.map((d) => d.text.replace('.', '').toLowerCase()),
          intro: hero.intro,
          system: { breaks_into: hero.fragments, reassembles_as: 'TRADIFIER' },
          pipeline: hero.chain,
          status: Object.fromEntries(hero.status.map(([k, v]) => [k.toLowerCase(), v === '__cycle__' ? hero.modes : v])),
        },
      }}
    >
      <div className="hero-meta mono" aria-hidden="true">
        <span>Technology studio</span>
        <span className="hide-sm">Build / Automate / Trade / Grow / Experiment</span>
        <span>№ 00 — 2026</span>
      </div>

      <h1 className="hero-name">
        <span className="mask">
          <motion.span className="mask-inner" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ delay: 0.1, duration: 1, ease }}>
            {hero.headline[0]}
          </motion.span>
        </span>
        <motion.span
          className="hero-sys"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 1, ease }}
        >
          <SystemWord />
        </motion.span>
      </h1>

      <div className="hero-grid">
        <div>
          <ul
            className={`hero-roles ${cycling ? 'is-cycling' : ''}`}
            aria-label="Disciplines"
            onPointerLeave={() => !cycling && setHover(null)}
          >
            {hero.disciplines.map((r, i) => (
              <li
                key={r.text}
                className={`hero-role ${hover === i ? 'is-on' : ''}`}
                tabIndex={0}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => !cycling && setHover(null)}
                aria-describedby={hover === i ? 'hero-caption' : undefined}
              >
                <span className="mask">
                  <motion.span
                    className="mask-inner"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.45 + i * 0.1, duration: 0.9, ease }}
                  >
                    <span className="hero-role-n mono" aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    {r.text}
                  </motion.span>
                </span>
              </li>
            ))}
          </ul>
          <p id="hero-caption" className="hero-caption mono" aria-live={cycling ? 'off' : 'polite'}>
            <span className="accent">{hover === null ? '↑' : pad(hover + 1)}</span>{' '}
            {hover === null ? 'Five applications of one capability.' : hero.disciplines[hover].note}
          </p>
        </div>
        <Status />
      </div>

      <motion.div className="hero-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
        <div className="hero-intro">
          <p className="hero-tagline">{hero.intro}</p>
          <div className="hero-ctas">
            <a className="cta cta-solid" href="#contact">
              <span>Start a project</span>
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="cta" href="#build">
              <span>Explore what we build</span>
              <span className="cta-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
        <Chain />
        <p className="hero-hint mono">
          <span className="hint-key">
            Hover <span className="accent">systems.</span> to take it apart · Press <kbd>S</kbd> to see the system underneath
          </span>
          <span className="hint-touch">
            Tap <span className="accent">systems.</span> to take it apart · Menu → System shows what’s underneath
          </span>
        </p>
      </motion.div>
    </Section>
  );
}
