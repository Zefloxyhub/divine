import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { vibe } from '../data/profile';
import { Reveal, Section } from './Section';

export function Vibe() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % vibe.steps.length), 1900);
    return () => window.clearInterval(t);
  }, [inView, paused, reduce]);

  return (
    <Section
      id="vibe"
      index="07"
      label="Vibe Coding"
      register="code"
      source={{ file: 'vibe.py', comment: 'the loop, with the log attached.', name: 'VIBE', type: 'dict', value: vibe }}
    >
      <div className="vibe">
        <div className="vibe-text">
          <Reveal>
            <p className="display-l">Vibe coder.</p>
            <p className="display-s vibe-statement">{vibe.statement}</p>
          </Reveal>
          {vibe.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <div
          className="vibe-loop"
          ref={ref}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <ol className="steps" aria-label="The vibe coding loop">
            {vibe.steps.map((s, i) => (
              <li key={s.name} className={`step ${i === step ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`}>
                <button type="button" onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined}>
                  <span className="step-name">{s.name}</span>
                  <span className="step-note">{s.note}</span>
                </button>
                {i < vibe.steps.length - 1 && (
                  <span className="step-arrow mono" aria-hidden="true">
                    ↓
                  </span>
                )}
              </li>
            ))}
            <li className="step-again mono" aria-hidden="true">
              ↺ again, until it is boring
            </li>
          </ol>
          <div className="vibe-log mono" aria-live="polite">
            <div className="source-bar">
              <span>vibe-01 / night-07.log</span>
              <span className="source-bar-meta">{paused ? 'paused' : 'live'}</span>
            </div>
            <ol>
              {vibe.steps.slice(0, step + 1).map((s, i) => (
                <motion.li key={s.name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={i === step ? 'is-on' : ''}>
                  <span className="dim">[{String(i).padStart(2, '0')}]</span> {s.log}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
