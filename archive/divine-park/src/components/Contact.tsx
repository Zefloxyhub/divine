import { useState } from 'react';
import { contact } from '../data/profile';
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
      index="11"
      label="Contact"
      register="field"
      source={{ file: 'contact.py', comment: 'no form. just an address.', name: 'CONTACT', type: 'dict', value: contact }}
    >
      <div className="contact">
        <Reveal>
          <p className="contact-h">{contact.heading}</p>
        </Reveal>
        <Reveal delay={0.08} className="contact-row">
          <button type="button" className="contact-email mono" onClick={copy} title="Copy address">
            {contact.email}
          </button>
          <a className="cta" href={`mailto:${contact.email}`}>
            <span>Start a conversation</span>
            <span className="cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </Reveal>
        <p className="contact-status mono" role="status">
          {copied && 'Address copied.'}
        </p>
        <Reveal delay={0.12}>
          <p className="label mono">Open to</p>
          <p className="tags mono">{contact.open.join(' · ')}</p>
        </Reveal>
      </div>
    </Section>
  );
}
