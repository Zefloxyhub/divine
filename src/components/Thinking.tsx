import { useState } from 'react';
import { thinking } from '../data/thinking';
import { Collapse } from './Collapse';
import { Reveal, Section } from './Section';

export function Thinking() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Section
      id="thinking"
      index="10"
      label="How We Think"
      register="idea"
      source={{ file: 'thinking.py', comment: 'working principles.', name: 'PRINCIPLES', type: 'list[Idea]', value: thinking }}
    >
      <Reveal className="section-intro narrow">
        <p className="lede">Six working principles. Open one for the reasoning behind it.</p>
      </Reveal>
      <ol className={`ideas ${open ? 'has-open' : ''}`}>
        {thinking.map((idea, i) => {
          const isOpen = open === idea.id;
          return (
            <li key={idea.id} className={`idea ${isOpen ? 'is-open' : ''}`}>
              <Reveal>
                <h3 className="idea-h">
                  <button type="button" aria-expanded={isOpen} aria-controls={`idea-${idea.id}`} onClick={() => setOpen(isOpen ? null : idea.id)}>
                    <span className="idea-n mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="idea-text">{idea.statement}</span>
                  </button>
                </h3>
              </Reveal>
              <Collapse open={isOpen} id={`idea-${idea.id}`}>
                <div className="idea-note">
                  <span className="label mono">Principle {String(i + 1).padStart(2, '0')}</span>
                  {idea.note.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Collapse>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
