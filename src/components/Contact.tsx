import { useState } from 'react';
import { contact } from '../data/site';
import { Reveal, Section } from './Section';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard unavailable — the address is visible and the mail link still works.
    }
  };

  return (
    <Section
      id="contact"
      index="13"
      label="Start a Project"
      register="idea"
      source={{ file: 'contact.py', comment: 'no form. just tell us the problem.', name: 'CONTACT', type: 'dict', value: contact }}
    >
      <div className="contact">
        <Reveal>
          <p className="contact-h">{contact.heading}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="lede contact-line">{contact.line}</p>
        </Reveal>
        <Reveal delay={0.08} className="contact-row">
          <button type="button" className="contact-email mono" onClick={copy} title="Copy address">
            {contact.email}
          </button>
          <div className="contact-ctas">
            <a className="cta cta-solid" href={`mailto:${contact.email}?subject=${encodeURIComponent('New project')}`}>
              <span>Start a project</span>
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="cta" href="#work">
              <span>See our work</span>
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </Reveal>
        <p className="contact-status mono" role="status">
          {copied && 'Address copied.'}
        </p>
        <Reveal delay={0.12}>
          <p className="label mono">We work on</p>
          <p className="tags mono">{contact.areas.join(' · ')}</p>
        </Reveal>
      </div>
    </Section>
  );
}
