import { useState } from 'react';
import { capabilities } from '../data/capabilities';
import { Collapse, Toggle } from './Collapse';
import { Flow } from './Flow';
import { Reveal, Section } from './Section';

export function Build() {
  const [open, setOpen] = useState<string | null>(capabilities[0].id);

  return (
    <Section
      id="build"
      index="02"
      label="What We Build"
      register="system"
      source={{ file: 'build.py', comment: 'six applications of the same capability.', name: 'CAPABILITIES', type: 'list[Capability]', value: capabilities }}
    >
      <Reveal className="section-intro">
        <p className="display-l">What we build.</p>
        <p className="lede">
          Software, automation, AI, trading technology, growth and experiments. Different applications of one
          capability: turning a messy idea into a system that works.
        </p>
      </Reveal>

      <ol className="roles">
        {capabilities.map((c) => {
          const isOpen = open === c.id;
          return (
            <li key={c.id} className={`role ${isOpen ? 'is-open' : ''}`}>
              <h3 className="role-h">
                <button
                  type="button"
                  className="role-head"
                  aria-expanded={isOpen}
                  aria-controls={`cap-${c.id}`}
                  onClick={() => setOpen(isOpen ? null : c.id)}
                >
                  <span className="role-period mono">
                    {c.index} — {c.world}
                  </span>
                  <span className="role-title">{c.name}</span>
                  <span className="role-org">{c.line}</span>
                  <Toggle open={isOpen} />
                </button>
              </h3>
              <Collapse open={isOpen} id={`cap-${c.id}`}>
                <div className="role-body">
                  <p className="role-summary">{c.summary}</p>
                  <div className="role-cols">
                    <div>
                      <h4 className="label mono">Services</h4>
                      <ul className="dash-list two-col">
                        {c.services.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      {c.flow && (
                        <>
                          <h4 className="label mono">{c.flowLabel}</h4>
                          <Flow steps={c.flow} />
                        </>
                      )}
                      <h4 className="label mono">Technologies</h4>
                      <p className="tags mono">{c.stack.join(' · ')}</p>
                    </div>
                  </div>
                  <blockquote className="field-note">
                    <span className="label mono">The point</span>
                    <p>{c.message}</p>
                  </blockquote>
                  {c.disclaimer && <p className="disclaimer mono">{c.disclaimer}</p>}
                </div>
              </Collapse>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
