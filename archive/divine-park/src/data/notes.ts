import type { FieldNote } from './types';

export const archiveUpdated = '2026-09-28';

export const fieldNotes: FieldNote[] = [
  {
    number: '014',
    date: '2024-03-11',
    status: 'FILED',
    title: 'On building software for people who hate software.',
    tags: ['design', 'casework'],
    body: [
      'They don’t hate software. They hate being made to feel slow by it. They hate passwords that expire on the day they need help. They hate the moment a screen asks a question that has no box for their answer.',
      'Working rule since then: if a feature needs explaining twice, it is the feature that is wrong, not the person.',
    ],
    margin: 'cf. intake forms, 2019–2022',
  },
  {
    number: '019',
    date: '2024-07-02',
    status: 'FRAGMENT',
    title: 'The van.',
    tags: ['logistics'],
    body: [
      'Every mutual-aid group has exactly one van and at least three people who believe they have it on Saturday. Most of my scheduling code is downstream of this fact.',
    ],
  },
  {
    number: '021',
    date: '2024-10-19',
    status: 'FILED',
    title: 'Why every community eventually invents a database.',
    tags: ['systems', 'organizing'],
    body: [
      'It starts as a group chat. Then a pinned message. Then a shared document titled IMPORTANT. Then a spreadsheet with a tab called “do not edit.” That is a database. It just hasn’t been told yet.',
      'The mistake is to arrive with a real database and call the old one a mess. The old one has years of judgment in it. Migrate the judgment first; the rows can follow.',
    ],
    margin: 'see: COMMONS data model',
  },
  {
    number: '024',
    date: '2025-02-06',
    status: 'FILED',
    title: 'Notes from a reading group that turned into a hackathon.',
    tags: ['political economy', 'python'],
    body: [
      'We were reading about the working day. Someone asked how many hours the group itself spent on admin each week. Nobody knew. By eleven p.m. there was a script that counted, and the answer started a much better discussion than the reading had.',
    ],
  },
  {
    number: '027',
    date: '2025-05-23',
    status: 'FILED',
    title: 'Python, bureaucracy and the politics of repetitive work.',
    tags: ['automation', 'labor'],
    body: [
      'Repetitive work is rarely random. It is usually the residue of a decision made somewhere else — a form that doesn’t talk to another form, a rule nobody revisited. Automating it hides the decision; documenting it sometimes changes it.',
      'So: write the script, yes. But also write down why the script had to exist, and send it to whoever owns the form.',
    ],
    margin: 'the script is the symptom',
  },
  {
    number: '031',
    date: '2025-11-30',
    status: 'FILED',
    title: 'What happens when the programmer becomes the organizer.',
    tags: ['organizing', 'power'],
    body: [
      'When you build the tool, you quietly become the person who knows how things work. That is power, even when nobody calls it that.',
      'The organizer’s job is to give it away: train the second maintainer, publish the admin password policy, make yourself boring to replace. A tool that only works while I’m around is a tool I have failed to finish.',
    ],
  },
  {
    number: '033',
    date: '2026-04-14',
    status: 'DRAFT',
    title: 'Against the dashboard.',
    tags: ['design', 'draft'],
    body: [
      'Dashboards are where organizations go to feel informed without having to ask anyone anything. ███████ ████ ██████ ██ ███ ██████, and the people in the numbers ███ ███████ ██████ ██████.',
      '[draft — needs a better ending, or possibly a dashboard]',
    ],
    margin: 'unfinished',
  },
  {
    number: '036',
    date: '2026-09-21',
    status: 'FRAGMENT',
    title: 'Overheard at a tenants’ meeting.',
    tags: ['fieldwork'],
    body: ['“Can the computer do the minutes?” — “The computer can. The question is whether we agree with them.”'],
  },
];
