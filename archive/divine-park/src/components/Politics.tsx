import { politics } from '../data/profile';
import { Reveal, Section } from './Section';

export function Politics() {
  return (
    <Section
      id="politics"
      index="06"
      label="Politics"
      register="field"
      source={{ file: 'politics.py', comment: 'a working question, not a slogan.', name: 'POLITICS', type: 'dict', value: politics }}
    >
      <div className="politics">
        <Reveal className="politics-word">
          <p className="politics-label mono">Politics</p>
          <p className="politics-big">
            {politics.label}
            <span className="politics-mark" aria-hidden="true">
              §06
            </span>
          </p>
          <p className="politics-aside mono">{politics.aside}</p>
        </Reveal>
        <div className="politics-text">
          {politics.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className={i === 0 ? 'display-s' : ''}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="label mono">Interested in</p>
            <ol className="interests mono">
              {politics.interests.map((x, i) => (
                <li key={x}>
                  <span className="dim">{String(i + 1).padStart(2, '0')}</span> {x}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
