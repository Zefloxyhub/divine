import { useMemo } from 'react';
import { highlightPython } from '../lib/highlight';
import { domains, sample } from '../data/stack';
import { CodeLines } from './Source';
import { Reveal, Section } from './Section';

export function Stack() {
  const lines = useMemo(() => highlightPython(sample.code), []);
  return (
    <Section
      id="stack"
      index="09"
      label="Technology"
      register="system"
      source={{ file: 'stack.py', comment: 'by function. not every project uses every tool.', name: 'STACK', type: 'list[Domain]', value: domains }}
    >
      <Reveal className="section-intro">
        <p className="display-l">We use whatever solves the problem.</p>
        <p className="lede">
          Organised by what it’s for, not by logo. Each project uses the smallest set of tools that does the job — not
          everything on this list.
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
          <p className="label mono">From the codebase</p>
          <p className="display-s">A function that can say no.</p>
          <p>
            Inside TRADIOR, every order passes a pre-trade risk check before it reaches an exchange. The strategy doesn’t
            get a vote. Engineering can’t make a strategy profitable — it can make it fail safely.
          </p>
          <p className="disclaimer mono">
            Trading involves substantial risk. Software cannot guarantee profitability. Trading systems are tools, not
            financial advice.
          </p>
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
