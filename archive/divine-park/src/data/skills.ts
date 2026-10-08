import type { Domain } from './types';

export const domains: Domain[] = [
  {
    name: 'Python',
    tags: ['backend', 'automation', 'data', 'tooling', 'APIs'],
    line: 'First language, daily language. Mostly the boring, dependable parts that other things stand on.',
  },
  {
    name: 'Systems',
    tags: ['architecture', 'databases', 'async processing', 'integrations'],
    line: 'Small systems designed to survive their author leaving the room.',
  },
  {
    name: 'Vibe coding',
    tags: ['LLMs', 'rapid prototyping', 'conversational development'],
    line: 'Sketching in software — then reading every line before anyone depends on it.',
  },
  {
    name: 'Research',
    tags: ['simulation', 'data analysis', 'experimentation', 'fieldwork'],
    line: 'Numbers checked against interviews, and interviews checked against numbers.',
  },
  {
    name: 'Unix',
    tags: ['shell', 'cron', 'ssh', 'plain text'],
    line: 'Where most of the automation actually lives, quietly, at 3 a.m.',
  },
  {
    name: 'Care work',
    tags: ['listening', 'intake', 'de-escalation', 'handover'],
    line: 'Not a technical skill. Which is the point.',
  },
];

export const toolbox =
  'python 3.12 · fastapi · postgres · sqlite · redis · pandas · numpy · pytest · uv · docker · playwright · neovim · git · cron';

/** A real, small piece of the practice — shown in the Code section. */
export const sample = {
  file: 'parklab/queue_time.py',
  code: `from dataclasses import dataclass
from statistics import median


@dataclass
class Request:
    who: str
    hours_waiting: float
    automated: bool


def who_waits(requests: list[Request]) -> dict[str, float]:
    """Before automating anything, ask whose time is being saved."""
    manual = [r.hours_waiting for r in requests if not r.automated]
    auto = [r.hours_waiting for r in requests if r.automated]
    return {
        "manual_median_h": median(manual) if manual else 0.0,
        "automated_median_h": median(auto) if auto else 0.0,
        # if this number goes up, the automation worked for us, not them
        "gap_h": (median(auto) if auto else 0.0) - (median(manual) if manual else 0.0),
    }`,
};
