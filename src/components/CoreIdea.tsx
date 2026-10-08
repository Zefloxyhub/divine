import { motion } from 'framer-motion';
import { coreIdea } from '../data/site';
import { Reveal, Section } from './Section';

export function CoreIdea() {
  return (
    <Section
      id="idea"
      index="01"
      label="The Core Idea"
      register="idea"
      source={{ file: 'idea.py', comment: 'the infrastructure between an idea and its execution.', name: 'CORE_IDEA', type: 'dict', value: coreIdea }}
    >
      <div className="about">
        <Reveal className="about-lead">
          <p className="display-m">{coreIdea.lead}</p>
        </Reveal>
        <div className="about-body">
          {coreIdea.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={i === 0 ? 'about-last' : ''}>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="about-meta">
          <p className="label mono">A business may need</p>
          <ul className="needs mono">
            {coreIdea.needs.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="needs-foot mono">
            <span className="accent">→</span> we treat these as one system
          </p>
        </Reveal>
      </div>

      <div className="registers">
        <p className="registers-title mono">Five worlds, one capability</p>
        <ol className="worlds">
          {coreIdea.worlds.map(([name, line], i) => (
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
