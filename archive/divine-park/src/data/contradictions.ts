import type { Contradiction } from './types';

export const contradictions: Contradiction[] = [
  {
    left: 'Social worker',
    right: 'Software engineer',
    note: 'Both are jobs about edge cases. Only one of them calls the edge case a person.',
  },
  {
    left: 'Collective thinker',
    right: 'Individual builder',
    note: 'Writes the code alone at 1 a.m. Ships it to a group chat of forty.',
  },
  {
    left: 'Political theory',
    right: 'Automation',
    note: 'Every automation is a decision about labor, whether or not it was made on purpose.',
  },
  {
    left: 'Human problems',
    right: 'Machine solutions',
    note: 'Usually the wrong order. Occasionally, carefully, the right one.',
  },
  {
    left: 'Care',
    right: 'Cron jobs',
    note: 'Some care is just remembering — on schedule, for someone who can’t.',
  },
];
