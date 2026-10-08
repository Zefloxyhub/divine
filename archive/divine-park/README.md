# Divine Park

A dark, editorial personal portfolio for **Divine Park**: social worker, communist, Python developer, vibe coder.
It's built as an exhibition piece. All organizations, roles and projects are portfolio fiction. Contact: divinepark110@gmail.com.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production bundle in dist/
npm run preview   # serve the production bundle
```

## The one big idea: Human / Source

Press **M** (or use the `Human / Source` switch in the nav) and every section turns into its own data, written as Python source.
Your place on the page stays put. A small **FIELD / CODE** indicator in the nav shows which register the section you're reading belongs to.

Other things to find:

- **`** jumps to the terminal (`help`, `whoami`, `ls -a`, `cat .plan`, `git log`… plus some commands that aren't listed in `help`)
- The Contradiction section: as you scroll, each × turns into a +
- Hovering a project name shows a small ASCII preview of it
- The tab title changes when you switch away

## Editing content

All copy lives in `src/data/` as typed local data:

| File | Content |
| --- | --- |
| `profile.ts` | hero, about, politics, vibe coding, contact |
| `contradictions.ts` | the paired identities |
| `experience.ts` | work timeline (expandable entries) |
| `projects.ts` | projects, incl. ASCII specimens |
| `skills.ts` | code domains, toolbox, featured Python sample |
| `ideas.ts` | statements + notes |
| `notes.ts` | field-note archive |

Terminal commands live in `src/lib/shell.ts`. The Python serializer for Source mode is `src/lib/pysource.ts`.

## Stack

React 18 · TypeScript · Vite · Framer Motion · plain CSS (`src/styles/global.css`) · self-hosted Inter Tight + JetBrains Mono.
`prefers-reduced-motion` is respected throughout.
