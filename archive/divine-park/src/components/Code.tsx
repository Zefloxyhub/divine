import { useMemo } from 'react';
import { highlightPython } from '../lib/highlight';
import { domains, sample, toolbox } from '../data/skills';
import { CodeLines } from './Source';
import { Reveal, Section } from './Section';

export function Code() {
  const lines = useMemo(() => highlightPython(sample.code), []);
  return (
    <Section
      id="code"
      index="05"
      label="Code"
      register="code"
      source={{ file: 'code.py', comment: 'competence, without the progress bars.', name: 'DOMAINS', type: 'list[Domain]', value: { domains, toolbox } }}
    >
      <Reveal className="section-intro">
        <p className="display-l">The technical half is not a side project.</p>
        <p className="lede">
          Python every day, for years — mostly the unglamorous layer where forms, spreadsheets and people meet. Areas of
          practice, rather than a list of logos:
        </p>
      </Reveal>

      <ul className="domains">
        {domains.map((d, i) => (
          <li key={d.name}>
            <Reveal delay={i * 0.04} className="domain">
              <span className="domain-n mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="domain-name">{d.name}</h3>
              <p className="domain-tags mono">{d.tags.join(' · ')}</p>
              <p className="domain-line">{d.line}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="code-feature">
        <Reveal className="code-feature-text">
          <p className="label mono">From the lab</p>
          <p className="display-s">A function that asks a political question.</p>
          <p>
            Before automating a process, Divine measures who was waiting before and who is waiting after. The function is a
            dozen lines. The conversation it starts usually takes an hour.
          </p>
          <p className="tags mono">{toolbox}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="codeblock">
            <figcaption className="source-bar mono">
              <span>{sample.file}</span>
              <span className="source-bar-meta">python · {lines.length} lines</span>
            </figcaption>
            <pre className="source-pre" tabIndex={0} aria-label={`Python source of ${sample.file}`}>
              <CodeLines lines={lines} />
            </pre>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
