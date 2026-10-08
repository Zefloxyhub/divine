import type { LabItem } from './types';

export const labUpdated = '2026-09-30';

export const lab: LabItem[] = [
  { number: '019', project: 'Webhook Doctor', type: 'API experiment', stack: 'Python / FastAPI', status: 'Prototype', note: 'Replays failed webhooks and shows exactly where the payload changed.' },
  { number: '021', project: 'Spread Watch', type: 'Trading research', stack: 'Python / WebSockets / Redis', status: 'Research', note: 'Watches cross-exchange spreads to study latency — research only, no execution.' },
  { number: '022', project: 'Chain Ledger', type: 'Web3 prototype', stack: 'Solidity / EVM / TypeScript', status: 'Prototype', note: 'An on-chain audit trail for workflow approvals.' },
  { number: '023', project: 'Form → Flow', type: 'Automation', stack: 'n8n / Webhooks / CRM', status: 'Experimental', note: 'Turns any form submission into a routed, tracked workflow in minutes.' },
  { number: '024', project: 'Quiet Dashboard', type: 'Data visualization', stack: 'React / D3', status: 'Concept', note: 'A dashboard that only shows what changed since you last looked.' },
  { number: '025', project: 'Prompt Diff', type: 'AI tooling', stack: 'Python / LLM APIs', status: 'Experimental', note: 'Compares model outputs across prompt versions on the same test set.' },
  { number: '026', project: 'Market Memory', type: 'Research', stack: 'Python / PostgreSQL', status: 'Experimental', note: 'Stores market regimes so research can ask “when did this happen before?”' },
  { number: '027', project: 'Agent Relay', type: 'AI / Automation', stack: 'Python / APIs / LLM', status: 'Prototype', note: 'Hands tasks between specialised agents with a human checkpoint in the middle.' },
  { number: '028', project: 'Terminal UI Kit', type: 'Weird interface', stack: 'TypeScript / React', status: 'Concept', note: 'Admin panels that feel like a shell. You are looking at one of its ideas.' },
];
