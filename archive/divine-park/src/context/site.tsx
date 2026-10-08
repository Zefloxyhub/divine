import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Register } from '../data/types';

export type Mode = 'human' | 'source';

interface SiteState {
  mode: Mode;
  toggleMode: () => void;
  active: string;
  register: Register;
}

const SiteContext = createContext<SiteState | null>(null);

export const focusTerminal = () => window.dispatchEvent(new Event('park:terminal'));

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

export function SiteProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('human');
  const [active, setActive] = useState('index');
  const [register, setRegister] = useState<Register>('field');
  const anchor = useRef<string | null>(null);

  const toggleMode = useCallback(() => {
    // Remember which section the reader is in, so the switch doesn't lose their place.
    anchor.current = active;
    setMode((m) => (m === 'human' ? 'source' : 'human'));
  }, [active]);

  useLayoutEffect(() => {
    document.documentElement.dataset.mode = mode;
    const id = anchor.current;
    anchor.current = null;
    const head = id && id !== 'index' ? document.querySelector(`#${id} .shead`) : null;
    if (head) {
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 56;
      window.scrollTo({ top: window.scrollY + head.getBoundingClientRect().top - navH - 24, behavior: 'instant' });
    }
  }, [mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMode();
      } else if (e.key === '`') {
        e.preventDefault();
        focusTerminal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleMode]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          setActive(el.id);
          setRegister((el.dataset.register as Register) ?? 'field');
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return <SiteContext.Provider value={{ mode, toggleMode, active, register }}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
