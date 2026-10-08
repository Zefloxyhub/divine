import { motion } from 'framer-motion';

/** A system diagram: steps joined by arrows, drawn in sequence when it enters view. */
export function Flow({ steps, vertical = false, label }: { steps: string[]; vertical?: boolean; label?: string }) {
  return (
    <ol className={`flow mono ${vertical ? 'is-vertical' : ''}`} aria-label={label ?? steps.join(' then ')}>
      {steps.map((s, i) => (
        <motion.li
          key={s + i}
          className={`flow-step ${i === steps.length - 1 ? 'is-last' : ''}`}
          initial={{ opacity: 0, [vertical ? 'y' : 'x']: -8 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="flow-box">{s}</span>
          {i < steps.length - 1 && (
            <span className="flow-arrow" aria-hidden="true">
              {vertical ? '↓' : '→'}
            </span>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
