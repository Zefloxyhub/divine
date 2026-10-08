import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSite } from "../context/site";

const LINKS = [
  { id: "index", label: "Index" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "code", label: "Code" },
  { id: "ideas", label: "Ideas" },
  { id: "notes", label: "Field Notes" },
  { id: "contact", label: "Contact" },
];

/** Which nav item a section belongs to. */
const OWNER: Record<string, string> = {
  index: "index",
  about: "about",
  contradiction: "about",
  work: "work",
  projects: "work",
  code: "code",
  vibe: "code",
  politics: "ideas",
  ideas: "ideas",
  notes: "notes",
  shell: "notes",
  contact: "contact",
};

export function ModeSwitch({ compact = false }: { compact?: boolean }) {
  const { mode, toggleMode } = useSite();
  return (
    <button
      type="button"
      className={`mode-switch mono ${compact ? "is-compact" : ""}`}
      onClick={toggleMode}
      aria-pressed={mode === "source"}
      title="Read the site as source (M)"
    >
      <span className={mode === "human" ? "on" : ""}>Human</span>
      <span className="mode-switch-sep" aria-hidden="true">
        /
      </span>
      <span className={mode === "source" ? "on" : ""}>Source</span>
      {!compact && <kbd aria-hidden="true">M</kbd>}
    </button>
  );
}

function RegisterIndicator() {
  const { register } = useSite();
  return (
    <span
      className="register mono"
      aria-hidden="true"
      title="The register of the section you're reading"
    >
      <span className={register === "field" ? "on" : ""}>Field</span>
      <span className="register-track">
        <motion.span
          className="register-dot"
          animate={{ x: register === "field" ? 0 : 14 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </span>
      <span className={register === "code" ? "on" : ""}>Code</span>
    </span>
  );
}

export function Nav() {
  const { active } = useSite();
  const [open, setOpen] = useState(false);
  const current = OWNER[active] ?? "index";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a
            href="#index"
            className="nav-mark mono"
            onClick={() => setOpen(false)}
          >
            Divine Park
          </a>
          <nav aria-label="Primary" className="nav-links">
            <ol>
              {LINKS.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={current === l.id ? "is-active" : ""}
                    aria-current={current === l.id ? "location" : undefined}
                  >
                    <span className="nav-num">
                      {String(i).padStart(2, "0")}
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="nav-tools">
            <RegisterIndicator />
            <ModeSwitch />
          </div>
          <button
            type="button"
            className="nav-menu mono"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Rendered outside <header>: the header's backdrop-filter would otherwise trap this fixed sheet inside the bar. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              <ol>
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.04 * i,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={current === l.id ? "is-active" : ""}
                    >
                      <span className="mono">{String(i).padStart(2, "0")}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <div className="sheet-foot">
              <ModeSwitch compact />
              <span className="mono dim">people / systems / code</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
