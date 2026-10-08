import { motion } from 'framer-motion';
import { about } from '../data/profile';
import { Reveal, Section } from './Section';

export function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      register="field"
      source={{ file: 'about.py', comment: 'biography, as structured data.', name: 'ABOUT', type: 'dict', value: about }}
    >
      <div className="about">
        <Reveal className="about-lead">
          <p className="display-m">{about.lead}</p>
        </Reveal>
        <div className="about-body">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={i === about.paragraphs.length - 1 ? 'about-last' : ''}>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="about-meta">
          <dl className="meta-table mono">
            {about.meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="registers">
        <p className="registers-title mono">One person, six registers</p>
        <ol>
          {about.registers.map(([name, line], i) => (
            <motion.li
              key={name}
              className="register-item"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mono dim">{String(i + 1).padStart(2, '0')}</span>
              <strong>{name}</strong>
              <span className="register-line">{line}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
