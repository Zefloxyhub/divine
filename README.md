# Tradifier — We build systems.

The website for Tradifier, a technology studio working across software, automation, AI, trading technology,
digital growth and emerging technology.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production bundle in dist/
npm run preview   # serve the production bundle
```

Deploys to Netlify as-is (`netlify.toml` builds with `npm run build` and publishes `dist/`).

## Signature interactions

- **SYSTEMS.** — hover, tap or focus the word in the hero. It breaks into CODE · DATA · PEOPLE · AUTOMATION ·
  MARKETS · AI · DESIGN, then reassembles as TRADIFIER. It also plays once on load.
- **Interface / System** — press **S** (or use the nav switch) and every section shows the data it's built from,
  as Python source. Your place on the page is kept.
- **Method** — as you scroll, a rail connects the eight stages into one system while a project log fills in.
- **Outcome** — each deliverable is struck through as you scroll, leading to "The outcome is a system that actually works."
- **Terminal** — press **`** to jump to it. Try `whoami`, `services`, `git log`, and a few commands that aren't in `help`.

## Editing content

All copy lives in `src/data/` as typed local data:

| File | Content |
| --- | --- |
| `site.ts` | brand, hero, core idea, outcome, about, audiences, contact, footer |
| `capabilities.ts` | What We Build — the six expandable capability sections |
| `domains.ts` | One Team / Multiple Domains pairs, mindset flows, the 8-stage method |
| `projects.ts` | projects (with honest labels and ASCII specimens) |
| `lab.ts` | Tradifier Lab archive entries |
| `stack.ts` | technology by function + the featured Python sample |
| `thinking.ts` | How We Think principles |

Terminal commands live in `src/lib/shell.ts`. Component styles: `src/styles/global.css` (design system) and
`src/styles/tradifier.css` (Tradifier-specific pieces).

The previous Divine Park version of the site is kept in `archive/divine-park/`.

## Stack

React 18 · TypeScript · Vite · Framer Motion · plain CSS · self-hosted Inter Tight + JetBrains Mono.
`prefers-reduced-motion` is respected throughout.
