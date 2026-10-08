import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'commons',
    index: '01',
    name: 'COMMONS',
    kind: 'Coordination platform',
    year: '2024—',
    status: 'v0.9 · in pilot',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    summary:
      'A lightweight system for coordinating community resources, requests, volunteers and local initiatives.',
    body: [
      'Four tables and one rule: nothing is a ticket. Requests, offers, people and initiatives are modelled as relationships between neighbours, not items in a queue.',
      'Intake works over SMS for people who will never install an app. Matching is suggested by the system and approved by a human, always.',
    ],
    details: [
      'SMS-first intake with plain-language replies',
      'Suggested matches, human approval, full audit trail',
      'Personal data expires automatically after 90 days',
      'Runs comfortably on a single small server',
    ],
    finding: 'The most important feature turned out to be the button that says “someone is on it.”',
    specimen: `  ┌─ request ─┐
  │  food ×2  │──┐
  └───────────┘  │   ┌ volunteer ┐
                 ├──▶│  J. (van) │
  ┌─ offer ───┐  │   └───────────┘
  │  van, sat │──┘        ✓ human`,
  },
  {
    id: 'redistribution',
    index: '02',
    name: 'REDISTRIBUTION ENGINE',
    kind: 'Research simulation',
    year: '2025',
    status: 'research · notebook',
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    summary:
      'An experimental simulation exploring how resources move through different community structures.',
    body: [
      'An agent-based model comparing hub-and-spoke charities, mutual-aid meshes and rotating savings circles under shocks: a lost hub, a bad month, a sudden influx of need.',
      'This is a research toy, deliberately. It models no real government system and recommends no policy. It exists to make intuitions argue with each other.',
    ],
    details: [
      '10,000-agent runs with configurable network topologies',
      'Shock scenarios: hub failure, demand spike, trust decay',
      'Every chart reproducible from a single seeded command',
    ],
    finding: 'Meshes are slower to start and much harder to break.',
    specimen: `  hub        mesh
   ○          ○─○
  ╱│╲        ╱ ╳ ╲
 ○ ○ ○      ○─○─○─○
  t=0  ✕     ╲ ╳ ╱
  t=1  ···    ○─○  still here`,
  },
  {
    id: 'mutual-aid-os',
    index: '03',
    name: 'MUTUAL AID OS',
    kind: 'Volunteer network toolkit',
    year: '2024',
    status: 'stable · forkable',
    stack: ['Python', 'FastAPI', 'SQLite', 'WebSockets'],
    summary: 'An experimental toolkit for organizing distributed volunteer networks.',
    body: [
      'Shift boards, a live request feed and handover notes, all in one small process with one SQLite file. Designed to be forked by the next group, not scaled by this one.',
      'The “OS” is half a joke: it is really a set of conventions for how a group remembers things, with software attached.',
    ],
    details: [
      'Real-time board over WebSockets, degrades to plain HTML',
      'Handover notes required to close a shift',
      'Backup is copying one file — on purpose',
    ],
    finding: 'Groups adopted the handover notes long after they stopped using the rest.',
    specimen: `$ maos status
  shifts      12 open · 3 unfilled
  requests    7 live
  handover    "door code changed,
               ask R. before sat"
  db          aid.sqlite  2.1 MB`,
  },
  {
    id: 'vibe-01',
    index: '04',
    name: 'VIBE/01',
    kind: 'AI-assisted coding experiment',
    year: '2025',
    status: 'complete · logged',
    stack: ['Python', 'LLM APIs', 'Automation', 'pytest'],
    summary:
      'How quickly can a functional software prototype be built through conversational programming — and what does it cost to understand afterwards?',
    body: [
      'Twelve prototypes in twelve evenings, each time-boxed to ninety minutes of conversation and thirty of reading. Every prompt logged. Every failure written up.',
      'The point was never speed. It was to measure the distance between “it runs” and “I know why it runs” — and to find out which of the two the people using it care about.',
    ],
    details: [
      '12 prototypes, 12 post-mortems, 1 public log',
      'Metric: time-to-first-run vs. time-to-understanding',
      'Rule: no prototype shipped with lines nobody had read',
    ],
    finding: 'Speed was never the bottleneck. Knowing when to stop was.',
    specimen: `night  first-run  understood
  01      0:22       1:40
  04      0:09       2:15  ⚠
  07      0:31       0:48
  12      0:14       0:35  ✓
         faster ≠ clearer`,
  },
  {
    id: 'people-platforms',
    index: '05',
    name: 'PEOPLE > PLATFORMS',
    kind: 'Design research',
    year: '2025—2026',
    status: 'ongoing · fieldwork',
    stack: ['Interviews', 'Design probes', 'Python'],
    summary:
      'A small research project asking whether community technology can be designed around people rather than engagement metrics.',
    body: [
      'Fieldwork with three community groups, plus a deliberately boring app with no feed, no streaks and no notifications except the ones a person explicitly asks for.',
      'The research question is simple and hard to answer honestly: what would software look like if success meant people needed it less?',
    ],
    details: [
      'Design probes: paper prototypes left in shared spaces',
      'An app measured by time not spent in it',
      'Findings written with, not about, participants',
    ],
    finding: 'The most-loved feature was the one that told people to close the app.',
    specimen: `  engagement   ▁▁▁▁▁▁▁▁
  usefulness   ▂▃▅▆▇▇▇█
  ─────────────────────
  goal: the lines should
        not move together`,
  },
  {
    id: 'parklab',
    index: '06',
    name: 'PARKLAB',
    kind: 'Personal laboratory',
    year: '2021—',
    status: 'always · unstable',
    stack: ['Python', 'CLI', 'Unix', 'plain text'],
    summary:
      'A personal experimental laboratory of small Python utilities, automation experiments, data tools and strange prototypes.',
    body: [
      'Where things go before they are useful, and sometimes where they stay. Most of it is small; a few pieces quietly run inside other people’s organizations.',
    ],
    details: [
      'queue-time — estimates who waits, and for how long',
      'rota — a shift scheduler that optimises for fairness, not coverage',
      'minutes — turns meeting notes into owned, dated actions',
      'deadsheet — finds abandoned shared spreadsheets',
      'bureaucrat.py — generates plausible forms (a joke that got used)',
    ],
    finding: 'The joke tools get adopted first. Nobody is sure what that means.',
    specimen: `parklab/
├── queue-time/
├── rota/
├── minutes/
├── deadsheet/
├── bureaucrat.py   # do not
└── TODO.txt        # 214 lines`,
  },
];
