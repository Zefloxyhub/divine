import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useSite } from '../context/site';
import { COMMANDS, run } from '../lib/shell';
import type { OutLine } from '../lib/shell';
import { Reveal, Section } from './Section';

const INTRO: OutLine[] = [
  { kind: 'dim', text: 'park-sh 0.4 — a small shell for a small archive.' },
  { kind: 'dim', text: "type 'help', or start with 'whoami'." },
];

export function Shell() {
  const { toggleMode } = useSite();
  const [out, setOut] = useState<OutLine[]>(INTRO);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [out]);

  useEffect(() => {
    const onFocus = () => {
      wrap.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => input.current?.focus({ preventScroll: true }), 350);
    };
    window.addEventListener('park:terminal', onFocus);
    return () => window.removeEventListener('park:terminal', onFocus);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = value;
    const res = run(cmd, history);
    const echo: OutLine = { kind: 'in', text: cmd };
    setValue('');
    setCursor(null);
    if (cmd.trim()) setHistory((h) => [...h, cmd.trim()]);

    if (res.effect?.type === 'clear') return setOut([]);
    setOut((o) => [...o, echo, ...res.lines].slice(-200));
    if (res.effect?.type === 'mode') window.setTimeout(toggleMode, 250);
    if (res.effect?.type === 'goto') {
      const id = res.effect.id;
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 250);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown' && cursor !== null) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setValue('');
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === 'Tab' && value.trim() && !value.includes(' ')) {
      const match = COMMANDS.filter((c) => c.startsWith(value.trim().toLowerCase()));
      if (match.length === 1) {
        e.preventDefault();
        setValue(match[0] + ' ');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setOut([]);
    }
  };

  return (
    <Section id="shell" index="10" label="Shell" register="code">
      <div className="shell">
        <Reveal className="shell-text">
          <p className="display-l">A terminal.</p>
          <p className="lede">Functional, intentionally limited, and slightly opinionated. Some commands are not in the help.</p>
          <p className="mono dim shell-hints">
            try: whoami · ls -a · cat .plan · git log
            <br />
            <span className="hint-key">
              press <kbd>`</kbd> anywhere to jump here
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="term" ref={wrap} onClick={() => window.getSelection()?.isCollapsed && input.current?.focus({ preventScroll: true })}>
            <div className="term-bar mono">
              <span className="term-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>divine@park: ~</span>
              <span className="dim">park-sh</span>
            </div>
            <div className="term-body mono" ref={body} role="log" aria-live="polite" aria-label="Terminal output">
              {out.map((l, i) => (
                <div key={i} className={`term-line k-${l.kind}`}>
                  {l.kind === 'in' ? (
                    <>
                      <span className="term-prompt" aria-hidden="true">
                        divine@park:~$
                      </span>{' '}
                      {l.text}
                    </>
                  ) : (
                    l.text || ' '
                  )}
                </div>
              ))}
              <form onSubmit={submit} className="term-form">
                <label htmlFor="term-input" className="term-prompt">
                  divine@park:~$<span className="sr-only"> terminal command</span>
                </label>
                <input
                  id="term-input"
                  ref={input}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="send"
                />
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
