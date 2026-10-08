import { useState } from 'react';
import { experience } from '../data/experience';
import { Collapse, Toggle } from './Collapse';
import { Reveal, Section } from './Section';

export function Work() {
  const [open, setOpen] = useState<string | null>(experience[0].id);

  return (
    <Section
      id="work"
      index="03"
      label="Work"
      register="field"
      source={{
        file: 'work.py',
        comment: 'exhibition entries — organizations are portfolio fiction.',
        name: 'EXPERIENCE',
        type: 'list[Role]',
        value: experience,
      }}
    >
      <Reveal className="section-intro">
        <p className="display-l">Where the practice happened.</p>
        <p className="lede">
          From casework to code, in reverse order. Each entry opens into what the work actually involved — and one note
          that didn’t fit anywhere else.
        </p>
      </Reveal>

      <ol className="roles">
        {experience.map((r) => {
          const isOpen = open === r.id;
          return (
            <li key={r.id} className={`role ${isOpen ? 'is-open' : ''}`}>
              <h3 className="role-h">
                <button
                  type="button"
                  className="role-head"
                  aria-expanded={isOpen}
                  aria-controls={`role-${r.id}`}
                  onClick={() => setOpen(isOpen ? null : r.id)}
                >
                  <span className="role-period mono">{r.period}</span>
                  <span className="role-title">{r.title}</span>
                  <span className="role-org">{r.org}</span>
                  <Toggle open={isOpen} />
                </button>
              </h3>
              <Collapse open={isOpen} id={`role-${r.id}`}>
                <div className="role-body">
                  <p className="role-summary">{r.summary}</p>
                  <dl className="role-facts mono">
                    <div>
                      <dt>Role</dt>
                      <dd>{r.title}</dd>
                    </div>
                    <div>
                      <dt>Period</dt>
                      <dd>{r.period}</dd>
                    </div>
                    <div>
                      <dt>Organization</dt>
                      <dd>
                        {r.org} <span className="dim">— {r.orgNote}</span>
                      </dd>
                    </div>
                  </dl>
                  <div className="role-cols">
                    <div>
                      <h4 className="label mono">Responsibilities</h4>
                      <ul className="dash-list">
                        {r.responsibilities.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="label mono">Selected outcomes</h4>
                      <ul className="dash-list">
                        {r.outcomes.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                      <h4 className="label mono">Technologies</h4>
                      <p className="tags mono">{r.technologies.join(' · ')}</p>
                    </div>
                  </div>
                  <blockquote className="field-note">
                    <span className="label mono">Field note</span>
                    <p>{r.fieldNote}</p>
                  </blockquote>
                </div>
              </Collapse>
            </li>
          );
        })}
      </ol>
      <p className="footnote mono">Exhibition edition: organizations and roles above are portfolio fiction, written to show the shape of the practice.</p>
    </Section>
  );
}
