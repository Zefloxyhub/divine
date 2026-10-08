import type { Idea } from './types';

export const ideas: Idea[] = [
  {
    id: 'never-only',
    statement: 'Technology is never only technical.',
    note: [
      'Every system encodes somebody’s answer to questions it never asks out loud: who is a user, what counts as an error, whose time is cheap. The code compiles either way.',
      'Calling a tool “just technical” is usually a way of keeping those questions out of the meeting. Divine prefers to bring them in early, while they are still cheap to change.',
    ],
  },
  {
    id: 'who-waits',
    statement: 'Automation changes who has to wait.',
    note: [
      'An automated phone line saves a receptionist an hour and costs a hundred callers ten minutes each. On the organization’s spreadsheet, that is efficiency.',
      'The useful question is never “is this faster?” but “faster for whom, and paid for by whose patience?” Measure the waiting on both sides before celebrating.',
    ],
  },
  {
    id: 'community-is-info',
    statement: 'A community is also an information system.',
    note: [
      'Who knows the door code. Who knows which landlord ignores repairs. Whose aunt runs the food bank on Thursdays. None of it is written down, and all of it is infrastructure.',
      'Respecting that system — rather than replacing it with a database — is most of the job. The database is for when the aunt is on holiday.',
    ],
  },
  {
    id: 'code-decisions',
    statement: 'Code is a way of organizing decisions.',
    note: [
      'An if-statement is a policy. A required field is a rule about who gets served. A default value is a decision made once on behalf of everyone who never changes it.',
      'Programmers are already doing governance. The only question is whether they do it in the open.',
    ],
  },
  {
    id: 'social-problem',
    statement: 'The most interesting software sometimes begins as a social problem.',
    note: [
      'Not “how do we scale?” but “why do the same four people do all the work?” Not “what’s the stack?” but “who will maintain this when the volunteer moves away?”',
      'Problems like these rarely produce impressive software. They tend to produce useful software, which is rarer.',
    ],
  },
  {
    id: 'maintenance',
    statement: 'Maintenance is a political act.',
    note: [
      'Launching is celebrated; maintaining is assumed. It is the same pattern as care work everywhere — indispensable, invisible, under-resourced.',
      'Any tool built for a community should come with an honest answer to one question: who keeps this alive, and what do they get for it?',
    ],
  },
];
