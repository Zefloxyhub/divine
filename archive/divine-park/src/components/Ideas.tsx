import { useState } from 'react';
import { ideas } from '../data/ideas';
import { Collapse } from './Collapse';
import { Reveal, Section } from './Section';

export function Ideas() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Section
      id="ideas"
      index="08"
      label="Ideas"
      register="field"
      source={{ file: 'ideas.py', comment: 'statements, each with a short note attached.', name: 'IDEAS', type: 'list[Idea]', value: ideas }}
    >
      <Reveal className="section-intro narrow">
        <p className="lede">Working beliefs, held loosely. Open one for the note behind it.</p>
      </Reveal>
      <ol className={`ideas ${open ? 'has-open' : ''}`}>
        {ideas.map((idea, i) => {
          const isOpen = open === idea.id;
          return (
            <li key={idea.id} className={`idea ${isOpen ? 'is-open' : ''}`}>
              <Reveal>
                <h3 className="idea-h">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`idea-${idea.id}`}
                    onClick={() => setOpen(isOpen ? null : idea.id)}
                  >
                    <span className="idea-n mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="idea-text">{idea.statement}</span>
                  </button>
                </h3>
              </Reveal>
              <Collapse open={isOpen} id={`idea-${idea.id}`}>
                <div className="idea-note">
                  <span className="label mono">Note {String(i + 1).padStart(2, '0')}</span>
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
