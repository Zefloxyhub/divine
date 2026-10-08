import type { Pair, Stage } from './types';

/** "One team. Multiple domains." — capabilities that usually live in different companies. */
export const pairs: Pair[] = [
  { left: 'Software', right: 'Automation', note: 'The app and the workflow around it, designed as one thing.' },
  { left: 'AI', right: 'Workflows', note: 'A model is only as useful as the process it’s plugged into.' },
  { left: 'Markets', right: 'Engineering', note: 'Trading ideas, built with the discipline of production software.' },
  { left: 'Marketing', right: 'Infrastructure', note: 'Growth that runs on systems, not on one person remembering to follow up.' },
  { left: 'Experiment', right: 'Ship', note: 'Prototype fast, then build it properly.' },
];

export const flows = [
  {
    problem: 'A company needs more customers.',
    instead: 'Let’s run ads.',
    steps: ['website', 'landing experience', 'lead capture', 'CRM', 'AI qualification', 'follow-up', 'sales', 'analytics'],
  },
  {
    problem: 'A trader wants automation.',
    instead: 'Let’s build a bot.',
    steps: ['data', 'analysis', 'decision', 'risk', 'execution', 'monitoring', 'review'],
  },
];

export const method: Stage[] = [
  { name: 'Understand', question: 'What are we actually trying to solve?', log: 'problem.md — 1 page, no solutions allowed yet' },
  { name: 'Map', question: 'What people, systems, data and decisions are involved?', log: 'map: 6 actors · 9 tools · 3 places data goes missing' },
  { name: 'Design', question: 'What should the system look like before we write it?', log: 'architecture.svg — reviewed, simplified twice' },
  { name: 'Build', question: 'Turn the architecture into working software.', log: 'api/ workers/ ui/ — first end-to-end run' },
  { name: 'Connect', question: 'Integrate APIs, tools, data and existing infrastructure.', log: 'crm ✓ payments ✓ email ✓ webhook retries ✓' },
  { name: 'Test', question: 'Break it. Find the weak points. Fix them.', log: '412 tests · 2 race conditions found · 2 fixed' },
  { name: 'Deploy', question: 'Put the system into the real world.', log: 'docker · ci/cd · monitoring · rollback plan' },
  { name: 'Iterate', question: 'Measure what happens and improve it.', log: 'week 2: bottleneck moved downstream. good sign.' },
];
