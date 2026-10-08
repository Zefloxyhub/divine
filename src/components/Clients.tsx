import { audiences } from '../data/site';
import { Reveal, Section } from './Section';

export function Clients() {
  return (
    <Section
      id="clients"
      index="06"
      label="Who We Work With"
      register="idea"
      source={{ file: 'clients.py', comment: 'people with a problem worth building around.', name: 'WORKS_WITH', type: 'dict[str, str]', value: Object.fromEntries(audiences) }}
    >
      <Reveal className="section-intro narrow">
        <p className="lede">Different starting points. The same need: something that actually works.</p>
      </Reveal>
      <ul className="domains audiences">
        {audiences.map(([name, line], i) => (
          <li key={name}>
            <Reveal delay={i * 0.03} className="domain audience">
              <span className="domain-n mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="domain-name">{name}</h3>
              <p className="domain-line">{line}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
