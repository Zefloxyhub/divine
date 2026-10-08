import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Collapse({ open, id, children, className }: { open: boolean; id: string; children: ReactNode; className?: string }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          className={`collapse ${className ?? ''}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toggle({ open }: { open: boolean }) {
  return (
    <span className={`toggle ${open ? 'is-open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}
