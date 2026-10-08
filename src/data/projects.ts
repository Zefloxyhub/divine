import type { Project } from './types';

/**
 * Projects are organised by the problem they solve. Labels are honest:
 * internal, experimental and concept work is marked as such, and no revenue or client results are claimed.
 */
export const projects: Project[] = [
  {
    id: 'tradior',
    index: '01',
    name: 'TRADIOR',
    kind: 'Trading infrastructure',
    label: 'Internal',
    stack: ['Python', 'Binance', 'WebSockets', 'PostgreSQL', 'Redis'],
    summary:
      'A research-oriented algorithmic trading system designed around market structure, data ingestion, analysis, risk controls and execution infrastructure.',
    body: [
      'Market data streams in over WebSockets, is normalised and stored, and feeds a research layer where ideas are tested before they get anywhere near an order.',
      'Risk controls sit between every decision and every execution — position limits, exposure checks and kill switches are part of the architecture, not an afterthought.',
    ],
    details: [
      'Streaming ingestion with reconnect and gap detection',
      'Research and backtesting separated from live execution',
      'Pre-trade risk checks on every order',
      'Full audit log of signals, decisions and fills',
    ],
    demonstrates: 'How trading software is engineered: data, risk and execution as separate, testable layers. No performance claims.',
    specimen: `  ws ──▶ ingest ──▶ store
              │
           research
              │
  signal ──▶ RISK ──▶ execute
              ✕ blocked: exposure`,
  },
  {
    id: 'scoutos',
    index: '02',
    name: 'SCOUTOS',
    kind: 'Lead intelligence + automation',
    label: 'In development',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Automation'],
    summary:
      'A system for discovering potential business leads, organizing opportunities and supporting automated outreach workflows.',
    body: [
      'Sources are collected, de-duplicated and enriched into one opportunity record. Each lead gets a status, a history and a next action instead of living in a spreadsheet tab.',
      'Outreach is supported by automation but gated by a person: the system drafts and schedules, a human decides.',
    ],
    details: [
      'Lead discovery and de-duplication pipeline',
      'Opportunity pipeline with statuses and history',
      'Queued, rate-limited outreach workflows',
      'Human approval before anything is sent',
    ],
    demonstrates: 'Turning a messy prospecting process into a pipeline with state, rules and an audit trail.',
    specimen: `  sources ─▶ dedupe ─▶ enrich
                         │
  ┌ lead ─────────────┐  ▼
  │ status  qualified │ queue
  │ next    follow-up │  │
  └───────────────────┘  ✓ human`,
  },
  {
    id: 'tradifierhub',
    index: '03',
    name: 'TRADIFIERHUB',
    kind: 'Digital growth infrastructure',
    label: 'Internal',
    stack: ['React', 'TypeScript', 'CRM', 'Automation', 'Analytics'],
    summary:
      'A system combining business websites, lead generation, digital visibility and automated customer acquisition workflows.',
    body: [
      'One connected setup instead of five disconnected tools: the site captures, the CRM records, automation follows up and analytics shows what actually converts.',
      'Built as a reusable foundation for small businesses that need a working digital presence rather than a brochure.',
    ],
    details: [
      'Conversion-focused site templates',
      'Lead capture wired directly into CRM',
      'Automated follow-up over email and WhatsApp',
      'Analytics tied to leads, not just page views',
    ],
    demonstrates: 'The growth chain — attract, capture, qualify, follow up — as a single system.',
    specimen: `  visit ─▶ page ─▶ form
                    │
               crm ◀┘
                │
   follow-up ◀──┤
                └─▶ analytics`,
  },
  {
    id: 'ai-ops',
    index: '04',
    name: 'AI OPERATIONS ENGINE',
    kind: 'AI + automation',
    label: 'Experimental',
    stack: ['Python', 'LLM APIs', 'Webhooks', 'APIs', 'PostgreSQL'],
    summary: 'An experimental system connecting AI reasoning with business tools, APIs and automated workflows.',
    body: [
      'Requests arrive from email, forms or chat. A model classifies them, gathers context from connected tools and proposes an action — which is executed directly when it’s safe and routed to a person when it isn’t.',
    ],
    details: [
      'Tool-calling against real business APIs',
      'Confidence thresholds and human review queues',
      'Every model decision logged and replayable',
    ],
    demonstrates: 'AI that has somewhere to go: data → tools → decisions → actions, with guardrails.',
    specimen: `  inbox ─▶ classify (llm)
              │
       context ◀── crm, docs
              │
     conf ≥ 0.9 ─▶ act
     conf < 0.9 ─▶ human`,
  },
  {
    id: 'product-lab',
    index: '05',
    name: 'DIGITAL PRODUCT LAB',
    kind: 'Software development',
    label: 'Experimental',
    stack: ['Python', 'TypeScript', 'React', 'FastAPI', 'SQLite'],
    summary: 'A collection of experimental products, dashboards, internal tools and rapid prototypes.',
    body: [
      'Where ideas get a working version before they get a pitch deck. Some become products, some become components of client systems, most teach us something.',
    ],
    details: [
      'Rapid prototypes, usually within days',
      'Dashboards and internal tools',
      'Reusable components for later builds',
    ],
    demonstrates: 'Speed with discipline: prototype quickly, keep what survives contact with reality.',
    specimen: `lab/
├── dashboards/
├── internal-tools/
├── prototypes/
│   └── 31 and counting
└── graveyard/   # also useful`,
  },
];
