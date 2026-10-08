import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';
import type { PointerEvent } from 'react';
import { projects } from '../data/projects';
import { Collapse, Toggle } from './Collapse';
import { Reveal, Section } from './Section';

export function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const [peek, setPeek] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });
  const peeked = projects.find((p) => p.id === peek);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    x.set(e.clientX + 28);
    y.set(e.clientY - 60);
  };

  return (
    <Section
      id="projects"
      index="04"
      label="Projects"
      register="code"
      source={{ file: 'projects.py', comment: 'six things, built to be handed over.', name: 'PROJECTS', type: 'list[Project]', value: projects }}
    >
      <Reveal className="section-intro">
        <p className="display-l">Things built, mostly small.</p>
        <p className="lede">
          Tools, simulations and experiments. Small on purpose: everything here is designed to be maintained by
          someone other than its author.
        </p>
      </Reveal>

      <ol className="projects" onPointerMove={onMove} onPointerLeave={() => setPeek(null)}>
        {projects.map((p) => {
          const isOpen = open === p.id;
          return (
            <li key={p.id} className={`project ${isOpen ? 'is-open' : ''}`}>
              <h3 className="project-h">
                <button
                  type="button"
                  className="project-head"
                  aria-expanded={isOpen}
                  aria-controls={`project-${p.id}`}
                  onClick={() => {
                    setOpen(isOpen ? null : p.id);
                    setPeek(null);
                  }}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && !isOpen && setPeek(p.id)}
                  onPointerLeave={() => setPeek(null)}
                >
                  <span className="project-n mono">{p.index}</span>
                  <span className="project-name">{p.name}</span>
                  <span className="project-kind mono">{p.kind}</span>
                  <span className="project-year mono">{p.year}</span>
                  <Toggle open={isOpen} />
                </button>
              </h3>
              <Collapse open={isOpen} id={`project-${p.id}`}>
                <div className="project-body">
                  <div className="project-text">
                    <p className="project-summary">{p.summary}</p>
                    {p.body.map((b) => (
                      <p key={b}>{b}</p>
                    ))}
                    <p className="project-finding">
                      <span className="label mono">Finding</span>
                      {p.finding}
                    </p>
                  </div>
                  <div className="project-side">
                    <pre className="specimen mono" aria-hidden="true">
                      {p.specimen}
                    </pre>
                    <dl className="meta-table mono">
                      <div>
                        <dt>Stack</dt>
                        <dd>{p.stack.join(' / ')}</dd>
                      </div>
                      <div>
                        <dt>Status</dt>
                        <dd>{p.status}</dd>
                      </div>
                    </dl>
                    <ul className="dash-list small">
                      {p.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Collapse>
            </li>
          );
        })}
      </ol>

      <AnimatePresence>
        {peeked && (
          <motion.div
            className="peek mono"
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            <div className="peek-bar">
              <span>{peeked.name}</span>
              <span>{peeked.status}</span>
            </div>
            <pre>{peeked.specimen}</pre>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
