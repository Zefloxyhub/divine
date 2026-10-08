import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { method } from '../data/domains';
import { Reveal, Section } from './Section';

/** FROM IDEA → SYSTEM. As the reader scrolls, a single line connects the stages into one system. */
export function Method() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] });
  const [reached, setReached] = useState(reduce ? method.length - 1 : -1);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    setReached(v <= 0.001 ? -1 : Math.min(method.length - 1, Math.floor(v * method.length)));
  });

  const current = Math.max(0, reached);

  return (
    <Section
      id="method"
      index="04"
      label="The Tradifier Method"
      register="system"
      source={{ file: 'method.py', comment: 'from idea to system, in eight stages.', name: 'METHOD', type: 'list[Stage]', value: method }}
    >
      <Reveal className="section-intro">
        <p className="display-l">From idea → system.</p>
        <p className="lede">Eight stages. Scroll through them — each one connects to the last until there’s a working system.</p>
      </Reveal>

      <div className="method">
        <ol className="method-list" ref={ref}>
          <span className="method-rail" aria-hidden="true">
            <motion.span className="method-rail-fill" style={{ scaleY: reduce ? 1 : scrollYProgress }} />
          </span>
          {method.map((s, i) => (
            <li key={s.name} className={`method-stage ${i <= reached ? 'is-on' : ''} ${i === reached ? 'is-current' : ''}`}>
              <span className="method-node" aria-hidden="true" />
              <span className="method-n mono">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="method-name">{s.name}</h3>
              <p className="method-q">{s.question}</p>
            </li>
          ))}
        </ol>

        {/* Mobile only: the log can't sit beside the stages, so the current stage rides along at the bottom. */}
        <div className="method-ticker mono" aria-hidden="true">
          <div className="method-ticker-top">
            <span>
              Stage <span className="accent">{String(current + 1).padStart(2, '0')}</span> / {String(method.length).padStart(2, '0')} ·{' '}
              {method[current].name}
            </span>
            <span className="dim">{reached === method.length - 1 ? 'running ✓' : 'building…'}</span>
          </div>
          <p className="method-ticker-log">{method[current].log}</p>
          <span className="method-ticker-bar">
            <motion.span style={{ scaleX: reduce ? 1 : scrollYProgress }} />
          </span>
        </div>

        <div className="method-side">
          <div className="vibe-log mono" aria-hidden="true">
            <div className="source-bar">
              <span>project.log</span>
              <span className="source-bar-meta">
                stage {String(current + 1).padStart(2, '0')} / {String(method.length).padStart(2, '0')}
              </span>
            </div>
            <ol>
              {method.slice(0, Math.max(1, reached + 1)).map((s, i) => (
                <motion.li
                  key={s.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === current ? 'is-on' : ''}
                >
                  <span className="dim">[{s.name.toLowerCase().padEnd(10, ' ')}]</span> {s.log}
                </motion.li>
              ))}
            </ol>
          </div>
          <p className={`method-result mono ${reached === method.length - 1 ? 'is-on' : ''}`}>
            idea → <span className="accent">system</span> {reached === method.length - 1 ? '✓ running' : '…'}
          </p>
        </div>
      </div>
    </Section>
  );
}
