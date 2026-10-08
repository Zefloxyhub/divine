import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { flows, pairs } from '../data/domains';
import type { Pair } from '../data/types';
import { Flow } from './Flow';
import { Reveal, Section } from './Section';

function PairRow({ pair, i }: { pair: Pair; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'center 52%'] });
  const leftX = useTransform(scrollYProgress, [0, 1], ['-9%', '0%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['9%', '0%']);
  // The sign starts as × (separate disciplines) and becomes + (one team).
  const rotate = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const termOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.5, 1]);
  const noteOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const sign = useTransform(scrollYProgress, (v) => (v > 0.98 ? 'var(--accent)' : 'var(--fg-3)'));

  const s = reduce ? {} : undefined;
  return (
    <li ref={ref} className="pair">
      <span className="pair-n mono" aria-hidden="true">
        {String(i + 1).padStart(2, '0')} / {String(pairs.length).padStart(2, '0')}
      </span>
      <div className="pair-row">
        <motion.span className="pair-term pair-left" style={s ?? { x: leftX, opacity: termOpacity }}>
          {pair.left}
        </motion.span>
        <motion.span className="pair-sign" aria-label="plus" style={s ?? { rotate, color: sign }}>
          +
        </motion.span>
        <motion.span className="pair-term pair-right" style={s ?? { x: rightX, opacity: termOpacity }}>
          {pair.right}
        </motion.span>
      </div>
      <motion.p className="pair-note" style={s ?? { opacity: noteOpacity }}>
        {pair.note}
      </motion.p>
    </li>
  );
}

export function Domains() {
  return (
    <Section
      id="domains"
      index="03"
      label="One Team. Multiple Domains."
      register="idea"
      className="contra"
      source={{ file: 'domains.py', comment: 'the same problem, approached from several directions.', name: 'DOMAINS', type: 'dict', value: { pairs, flows } }}
    >
      <Reveal className="contra-intro">
        <p className="display-l">One team. Multiple domains.</p>
        <p className="lede">
          These usually live in different companies. Here they sit at the same table — scroll, and watch the separate
          disciplines become one approach.
        </p>
      </Reveal>
      <ol className="pairs">
        {pairs.map((p, i) => (
          <PairRow key={p.left} pair={p} i={i} />
        ))}
      </ol>

      <div className="mindset">
        {flows.map((f, i) => (
          <Reveal key={f.problem} delay={i * 0.08} className="mindset-col">
            <p className="label mono">Example {String(i + 1).padStart(2, '0')}</p>
            <p className="display-s">{f.problem}</p>
            <p className="mindset-instead mono">
              Instead of <s>“{f.instead}”</s> — think:
            </p>
            <Flow steps={f.steps} vertical />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
