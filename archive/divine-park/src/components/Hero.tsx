import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
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

function Status() {
  const seconds = useTick(1000);
  const modeTick = useTick(3200);
  const reduce = useReducedMotion();
  const mode = profile.modes[modeTick % profile.modes.length];
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
        DIVINE_PARK <span className="status-live" aria-hidden="true" />
      </div>
      <div className="status-rule" aria-hidden="true">
        ────────────────────────────────────────────────────────────
      </div>
      <dl>
        {profile.status.map(([k, v]) => (
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
  const tick = useTick(1500);
  const words = profile.chain;
  // The chain loops: the final "people" hands back to the first.
  const active = tick % (words.length - 1);
  return (
    <p className="chain mono" aria-label={words.join(' to ')}>
      {words.map((w, i) => (
        <span key={i} className="chain-item" aria-hidden="true">
          <span className={`chain-word ${i === active ? 'is-on' : ''}`}>
            {w}
            {i === active && <motion.span layoutId="chain-cursor" className="chain-cursor" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
          </span>
          {i < words.length - 1 && <span className="chain-arrow">→</span>}
        </span>
      ))}
    </p>
  );
}

export function Hero() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Section
      id="index"
      label="Index"
      register="field"
      bare
      className="hero"
      source={{
        file: 'index.py',
        comment: 'a person, serialized. lossy by design.',
        name: 'divine_park',
        type: 'Person',
        value: {
          roles: profile.roles.map((r) => r.text.replace('.', '').toLowerCase()),
          tagline: profile.tagline,
          loop: profile.chain,
          status: Object.fromEntries(profile.status.map(([k, v]) => [k.toLowerCase(), v === '__cycle__' ? profile.modes : v])),
        },
      }}
    >
      <div className="hero-meta mono" aria-hidden="true">
        <span>Personal exhibition</span>
        <span className="hide-sm">People / Systems / Code</span>
        <span>№ 00 — {profile.year}</span>
      </div>

      <h1 className="hero-name">
        {['Divine', 'Park'].map((w, i) => (
          <span className="mask" key={w}>
            <motion.span
              className="mask-inner"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 1, ease }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h1>

      <div className="hero-grid">
        <div>
        <ul className="hero-roles" aria-label="Roles" onPointerLeave={() => setHover(null)}>
          {profile.roles.map((r, i) => (
            <li
              key={r.text}
              className={`hero-role ${hover === i ? 'is-on' : ''}`}
              tabIndex={0}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              aria-describedby={hover === i ? 'hero-caption' : undefined}
            >
              <span className="mask">
                <motion.span
                  className="mask-inner"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.45 + i * 0.12, duration: 0.9, ease }}
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
        <p id="hero-caption" className="hero-caption mono" aria-live="polite">
          <span className="accent">{hover === null ? '↑' : pad(hover + 1)}</span>{' '}
          {hover === null ? 'Four answers to “what do you do?” — none of them complete.' : profile.roles[hover].note}
        </p>
        </div>
        <Status />
      </div>

      <motion.div
        className="hero-foot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        <p className="hero-tagline">{profile.tagline}</p>
        <Chain />
        <p className="hero-hint mono">
          <span className="hide-sm">Scroll ↓ &nbsp;·&nbsp; </span>
          <span className="hint-key">
            Press <kbd>M</kbd> to read this person as source
          </span>
          <span className="hint-touch">Menu → Source reads this person as data</span>
        </p>
      </motion.div>
    </Section>
  );
}
