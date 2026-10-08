import type { Idea } from './types';

export const thinking: Idea[] = [
  {
    id: 'connect',
    statement: 'Build less. Connect more.',
    note: [
      'The value of software often comes from making existing systems work together. Before we build something new, we check whether the tools you already pay for can be connected properly.',
      'The best project is sometimes three integrations and a well-placed webhook.',
    ],
  },
  {
    id: 'boring',
    statement: 'Automate the boring.',
    note: [
      'Human attention is expensive. Don’t waste it on repetitive tasks.',
      'If someone copies the same data between the same tools every week, that is not a job. That is a missing integration.',
    ],
  },
  {
    id: 'job',
    statement: 'Software should have a job.',
    note: [
      'Every feature should solve something. If we can’t say what a feature is for, we don’t build it.',
      'A smaller system that does its job beats a larger one that does everything halfway.',
    ],
  },
  {
    id: 'early',
    statement: 'Experiment early.',
    note: [
      'A prototype can answer questions that meetings cannot.',
      'We build rough versions quickly, put them in front of real use, and let the results decide what gets built properly.',
    ],
  },
  {
    id: 'flex',
    statement: 'Complexity is not a flex.',
    note: [
      'Good engineering makes complicated systems understandable.',
      'If only one person can explain how it works, it isn’t finished yet.',
    ],
  },
  {
    id: 'ship',
    statement: 'Ship.',
    note: ['Ideas become useful when they leave the notebook.', 'Then measure, learn, and ship again.'],
  },
];
