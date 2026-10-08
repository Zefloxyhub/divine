import type { Role } from './types';

/**
 * Exhibition entries. Organizations and roles below are portfolio fiction,
 * written to show the shape of the practice — not a verified employment record.
 */
export const experience: Role[] = [
  {
    id: 'independent',
    period: '2025 — Present',
    title: 'Independent Social Technology Practitioner',
    org: 'Self-directed practice',
    orgNote: 'Studio of one, network of many',
    summary:
      'Working across community technology, Python automation, research tooling and small digital systems for groups that have no IT department and no wish to acquire one.',
    responsibilities: [
      'Scope and build small tools with groups of three to forty people',
      'Run “paperwork audits” — mapping every repeated copy-paste in an organization before writing any code',
      'Maintain a set of open-source utilities under PARKLAB',
      'Train volunteers to maintain what gets built, so nothing depends on one person',
    ],
    technologies: ['Python', 'FastAPI', 'SQLite', 'PostgreSQL', 'Playwright', 'LLM APIs', 'cron', 'plain text'],
    outcomes: [
      'Replaced a nine-step volunteer intake with a two-step form and a nightly script',
      'Seven tools handed off to non-technical maintainers; five still running unattended',
      'Published utilities under permissive licences, documented for humans first',
    ],
    fieldNote: 'The best handoff document I ever wrote was a laminated card taped to a router.',
  },
  {
    id: 'common-ground',
    period: '2024 — 2025',
    title: 'Community Systems Coordinator',
    org: 'Common Ground Lab',
    orgNote: 'Neighbourhood technology collective',
    summary:
      'Developed lightweight digital systems for organizing community resources, volunteer coordination and information workflows across a federation of neighbourhood groups.',
    responsibilities: [
      'Designed a shared resource-request intake used by four neighbourhood groups',
      'Built volunteer scheduling with SMS reminders for people who do not use apps',
      'Wrote the collective’s data-minimisation policy, then enforced it in code',
      'Facilitated monthly “what broke” sessions open to every volunteer',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'HTMX', 'SMS gateway', 'Docker'],
    outcomes: [
      'Median response to resource requests fell from four days to nineteen hours',
      'Volunteer no-shows dropped by roughly a third after reminder flows went live',
      'Personal data retention capped at 90 days — by default, not by policy document',
    ],
    fieldNote:
      'Everyone asked for a dashboard. What they needed was for the same question to stop being asked six times.',
  },
  {
    id: 'civic-systems',
    period: '2023 — 2024',
    title: 'Python Developer',
    org: 'Civic Systems Project',
    orgNote: 'Small public-interest software team',
    summary:
      'Built internal automation tools and data-processing utilities in Python, mostly for the unloved middle of administrative work: imports, reconciliations, reports.',
    responsibilities: [
      'Turned messy spreadsheet exports into tested, repeatable data pipelines',
      'Parsed scanned PDF forms into structured records with a human review step',
      'Generated monthly reports that previously took a team three days',
      'Wrote tests for inherited scripts that nobody wanted to touch',
    ],
    technologies: ['Python', 'Pandas', 'pdfplumber', 'pytest', 'Docker', 'CI pipelines', 'SQL'],
    outcomes: [
      'Monthly reporting cycle reduced from three days to an afternoon',
      'Forty-odd legacy scripts brought under test and version control',
      'Every pipeline documented in plain language, not only in docstrings',
    ],
    fieldNote: 'A spreadsheet with thirty-one tabs is not a data problem. It is an organizational history.',
  },
  {
    id: 'neighborhood-commons',
    period: '2022 — 2023',
    title: 'Community Researcher',
    org: 'Neighborhood Commons',
    orgNote: 'Participatory research initiative',
    summary:
      'Worked on participatory research and documentation around access to community resources — who knows where help is, and how that knowledge travels.',
    responsibilities: [
      'Led listening sessions and one-to-one interviews with residents',
      'Co-designed survey instruments with the people being surveyed',
      'Mapped informal help networks — who helps whom, and through whom',
      'Wrote findings in formats residents could actually use',
    ],
    technologies: ['Python', 'Jupyter', 'NetworkX', 'QGIS', 'offline survey forms'],
    outcomes: [
      'Sixty-two conversations, three public report-backs, one very large wall map',
      'The hand-drawn help network later became the data model for COMMONS',
      'Research outputs returned to participants before they went to funders',
    ],
    fieldNote:
      'People knew exactly where help was. They had simply never been asked in a format a funder could read.',
  },
  {
    id: 'eastside',
    period: '2019 — 2022',
    title: 'Social Worker',
    org: 'Eastside Family Services',
    orgNote: 'Community casework & support',
    summary:
      'Casework, benefits navigation and community support. The place where the questions in everything that followed were first asked.',
    responsibilities: [
      'Held a caseload of families navigating housing, income and care systems',
      'Built and maintained a local referral network across services',
      'Ran peer-support groups and accompanied people to appointments',
      'Translated between institutional language and actual lives',
    ],
    technologies: ['Paper', 'then spreadsheets', 'then the first Python script'],
    outcomes: [
      'Built a referral directory that outlived the role by several years',
      'First automation: a script that filled the same form three times so a person didn’t have to',
    ],
    fieldNote: 'Every intake form is a theory of what a person is.',
  },
];
