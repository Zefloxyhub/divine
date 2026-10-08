import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { outcome } from '../data/site';
import { Section } from './Section';

function Line({ thing, rest }: { thing: string; rest: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 50%'] });
  const strike = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const dim = useTransform(scrollYProgress, [0.2, 1], [1, 0.35]);
  return (
    <li ref={ref} className="outcome-line">
      <motion.span className="outcome-thing" style={reduce ? { opacity: 0.35 } : { opacity: dim }}>
        {thing}
        <motion.span className="outcome-strike" aria-hidden="true" style={{ scaleX: reduce ? 1 : strike }} />
      </motion.span>{' '}
      <span className="outcome-rest">{rest}</span>
    </li>
  );
}

export function Outcome() {
  return (
    <Section
      id="outcome"
      index="05"
      label="Not Just An Agency"
      register="idea"
      source={{ file: 'outcome.py', comment: 'deliverables are not the point.', name: 'OUTCOME', type: 'dict', value: outcome }}
    >
      <p className="outcome-h">{outcome.headline}</p>
      <ul className="outcome-list">
        {outcome.lines.map((l) => (
          <Line key={l.thing} {...l} />
        ))}
      </ul>
      <motion.p
        className="outcome-final"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {outcome.final}
      </motion.p>
    </Section>
  );
}
