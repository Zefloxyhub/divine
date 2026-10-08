import { useState } from 'react';
import { archiveUpdated, fieldNotes } from '../data/notes';
import type { FieldNote } from '../data/types';
import { Collapse, Toggle } from './Collapse';
import { Reveal, Section } from './Section';

const FILTERS = ['ALL', 'FILED', 'DRAFT', 'FRAGMENT'] as const;
type Filter = (typeof FILTERS)[number];

export function FieldNotes() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [open, setOpen] = useState<string | null>(null);
  const list = fieldNotes.filter((n: FieldNote) => filter === 'ALL' || n.status === filter);

  return (
    <Section
      id="notes"
      index="09"
      label="Field Notes"
      register="field"
      source={{ file: 'notes.py', comment: `archive, last updated ${archiveUpdated}.`, name: 'FIELD_NOTES', type: 'list[Note]', value: fieldNotes }}
    >
      <Reveal className="section-intro">
        <p className="display-l">Field notes.</p>
        <p className="lede">Fragments from an ongoing personal archive. Unedited where it matters; redacted where it doesn’t.</p>
      </Reveal>

      <div className="archive-bar mono">
        <span>
          Archive · {fieldNotes.length} entries · updated {archiveUpdated}
        </span>
        <div className="filters" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <ol className="notes">
        {list.map((n) => {
          const isOpen = open === n.number;
          return (
            <li key={n.number} className={`note ${isOpen ? 'is-open' : ''}`}>
              <h3 className="note-h">
                <button type="button" aria-expanded={isOpen} aria-controls={`note-${n.number}`} onClick={() => setOpen(isOpen ? null : n.number)}>
                  <span className="note-num mono">Field note {n.number}</span>
                  <span className="note-date mono">{n.date}</span>
                  <span className="note-title">{n.title}</span>
                  <span className={`note-status mono s-${n.status.toLowerCase()}`}>{n.status}</span>
                  <Toggle open={isOpen} />
                </button>
              </h3>
              <Collapse open={isOpen} id={`note-${n.number}`}>
                <div className="note-body">
                  <div className="note-text">
                    {n.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  <aside className="note-margin mono">
                    <span>tags: {n.tags.join(', ')}</span>
                    {n.margin && <span>margin: {n.margin}</span>}
                  </aside>
                </div>
              </Collapse>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
