import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { lab, labUpdated } from '../data/lab';
import type { LabItem } from '../data/types';
import { Reveal, Section } from './Section';

const FILTERS = ['All', 'Experimental', 'Prototype', 'Research', 'Concept'] as const;
type Filter = (typeof FILTERS)[number];

export function Lab() {
  const [filter, setFilter] = useState<Filter>('All');
  const list = lab.filter((n: LabItem) => filter === 'All' || n.status === filter);

  return (
    <Section
      id="lab"
      index="08"
      label="Tradifier Lab"
      register="system"
      source={{ file: 'lab.py', comment: `archive, last updated ${labUpdated}.`, name: 'LAB', type: 'list[LabItem]', value: lab }}
    >
      <Reveal className="section-intro">
        <p className="display-l">Tradifier Lab.</p>
        <p className="lede">
          Where the studio experiments. Agents, Python tools, trading research, Web3 prototypes and the occasional weird
          interface — most never become products, all of them teach us something.
        </p>
      </Reveal>

      <div className="archive-bar mono">
        <span>
          Archive · {lab.length} entries · updated {labUpdated}
        </span>
        <div className="filters" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="lab-swipe mono" aria-hidden="true">
        Swipe <span className="accent">→</span> {list.length} entries
      </p>
      <motion.ol className="lab-grid" layout>
        <AnimatePresence initial={false}>
          {list.map((n) => (
            <motion.li
              key={n.number}
              layout
              className="lab-card mono"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <p className="lab-num">
                LAB / <span className="accent">{n.number}</span>
              </p>
              <dl>
                <div>
                  <dt>Project</dt>
                  <dd className="lab-project">{n.project}</dd>
                </div>
                <div>
                  <dt>Type</dt>
                  <dd>{n.type}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{n.stack}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd className={`lab-status s-${n.status.toLowerCase()}`}>{n.status}</dd>
                </div>
              </dl>
              <p className="lab-note">{n.note}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ol>
    </Section>
  );
}
