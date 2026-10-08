import type { Domain } from './types';

/** Organised by function. Not every project uses every technology. */
export const domains: Domain[] = [
  { name: 'Development', tags: ['Python', 'FastAPI', 'Django', 'React', 'TypeScript', 'PHP', 'Node.js'], line: 'Chosen per project, for the job and for whoever maintains it next.' },
  { name: 'Data', tags: ['PostgreSQL', 'Redis', 'SQLite', 'data pipelines'], line: 'Boring, reliable storage. Interesting things happen on top of it.' },
  { name: 'Automation', tags: ['n8n', 'Make', 'webhooks', 'APIs'], line: 'No-code where it’s enough, code where it isn’t.' },
  { name: 'Infrastructure', tags: ['Docker', 'Linux', 'cloud infrastructure', 'CI/CD'], line: 'Deployable, observable, and recoverable at 3 a.m.' },
  { name: 'AI', tags: ['LLM APIs', 'AI agents', 'RAG', 'automation'], line: 'Models connected to real data and real actions.' },
  { name: 'Web3', tags: ['Solidity', 'EVM', 'Web3 APIs'], line: 'Used when decentralisation is the requirement, not the pitch.' },
];

/** A real, small piece of the practice — shown in the Stack section. */
export const sample = {
  file: 'tradior/risk/pre_trade.py',
  code: `from dataclasses import dataclass


@dataclass
class Order:
    symbol: str
    side: str
    qty: float
    price: float


@dataclass
class Limits:
    max_position_value: float
    max_daily_loss: float


def pre_trade_check(order: Order, exposure: float, daily_pnl: float, limits: Limits) -> tuple[bool, str]:
    """Every order passes through here. The strategy does not get a vote."""
    if daily_pnl <= -limits.max_daily_loss:
        return False, "daily loss limit reached — trading halted"
    if exposure + order.qty * order.price > limits.max_position_value:
        return False, "order would exceed position limit"
    # good engineering can't make a strategy profitable. it can make it fail safely.
    return True, "ok"`,
};
