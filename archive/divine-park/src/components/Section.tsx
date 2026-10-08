import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useSite } from '../context/site';
import type { Register } from '../data/types';
import type { SourceSpec } from '../lib/pysource';
import { Source } from './Source';

interface Props {
  id: string;
  index?: string;
  label: string;
  register: Register;
  source?: SourceSpec;
  bare?: boolean;
  className?: string;
  children: ReactNode;
}

export function SectionHead({ id, index, label, register }: { id: string; index: string; label: string; register: Register }) {
  const { mode } = useSite();
  return (
    <header className="shead">
      <span className="shead-index mono">{index}</span>
      <motion.span
        className="shead-rule"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <h2 id={`${id}-label`} className="shead-label mono">
        {label}
      </h2>
      <span className="shead-meta mono" aria-hidden="true">
        {register === 'field' ? 'FIELD' : 'CODE'} · {mode === 'source' ? `${id}.py` : 'human'}
      </span>
    </header>
  );
}

export function Section({ id, index = '', label, register, source, bare, className, children }: Props) {
  const { mode } = useSite();
  const showSource = mode === 'source' && !!source;
  return (
    <section
      id={id}
      data-section
      data-register={register}
      className={`section ${className ?? ''}`}
      {...(bare ? { 'aria-label': label } : { 'aria-labelledby': `${id}-label` })}
    >
      <div className="wrap">
        {!bare && <SectionHead id={id} index={index} label={label} register={register} />}
        <motion.div
          key={showSource ? 'source' : 'human'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {showSource && source ? <Source spec={source} /> : children}
        </motion.div>
      </div>
    </section>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
