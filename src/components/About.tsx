import { about } from '../data/site';
import { Reveal, Section } from './Section';

export function About() {
  return (
    <Section
      id="about"
      index="11"
      label="About Tradifier"
      register="idea"
      source={{ file: 'about.py', comment: 'a builder’s company.', name: 'ABOUT', type: 'dict', value: about }}
    >
      <div className="politics">
        <Reveal className="politics-word">
          <p className="politics-label mono">About</p>
          <p className="politics-big">
            {about.word}
            <span className="politics-mark" aria-hidden="true">
              est. studio
            </span>
          </p>
          <p className="politics-aside mono">A technology studio. Not a consultancy, not a collection of freelancers.</p>
        </Reveal>
        <div className="politics-text">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className={i === 0 ? 'display-s' : ''}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="label mono">We are</p>
            <ol className="interests one-col mono">
              {about.traits.map((x, i) => (
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
