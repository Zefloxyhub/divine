import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { contradictions } from '../data/contradictions';
import type { Contradiction as Pair } from '../data/types';
import { Reveal, Section } from './Section';

function PairRow({ pair, i }: { pair: Pair; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'center 52%'] });
  const leftX = useTransform(scrollYProgress, [0, 1], ['-9%', '0%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['9%', '0%']);
  // The sign starts as × (opposition) and turns into + (combination).
  const rotate = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const termOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.5, 1]);
  const noteOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const sign = useTransform(scrollYProgress, (v) => (v > 0.98 ? 'var(--accent)' : 'var(--fg-3)'));

  const s = reduce ? {} : undefined;
  return (
    <li ref={ref} className="pair">
      <span className="pair-n mono" aria-hidden="true">
        {String(i + 1).padStart(2, '0')} / {String(contradictions.length).padStart(2, '0')}
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

export function Contradiction() {
  return (
    <Section
      id="contradiction"
      index="02"
      label="The Contradiction"
      register="field"
      className="contra"
      source={{
        file: 'contradiction.py',
        comment: 'pairs that refuse to resolve. kept anyway.',
        name: 'PAIRS',
        type: 'list[tuple]',
        value: contradictions,
      }}
    >
      <Reveal className="contra-intro">
        <p className="display-l">The contradiction.</p>
        <p className="lede">
          Most people are asked to pick one. These are the pairs Divine kept instead — scroll, and watch the opposition
          turn into a combination.
        </p>
      </Reveal>
      <ol className="pairs">
        {contradictions.map((c, i) => (
          <PairRow key={c.left} pair={c} i={i} />
        ))}
      </ol>
    </Section>
  );
}
