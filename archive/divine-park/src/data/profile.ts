export const profile = {
  name: 'Divine Park',
  year: 2026,
  roles: [
    { text: 'Social worker.', note: 'by training — learned systems from the waiting-room side' },
    { text: 'Communist.', note: 'by conviction — see §06' },
    { text: 'Python developer.', note: 'by daily practice — since the first form-filling script' },
    { text: 'Vibe coder.', note: 'by experiment — see VIBE/01' },
  ],
  tagline:
    'Building systems, studying people, and occasionally refusing to tell the difference.',
  chain: ['people', 'systems', 'code', 'communities', 'machines', 'people'],
  status: [
    ['STATUS', 'ACTIVE'],
    ['MODE', '__cycle__'],
    ['LOCATION', 'BETWEEN ROOMS'],
    ['STACK', 'PYTHON / AI / UNIX'],
    ['INTERESTS', 'PEOPLE / SYSTEMS / POWER'],
  ] as [string, string][],
  modes: ['BUILDING', 'LISTENING', 'READING', 'DEBUGGING', 'ORGANIZING'],
  email: 'divinepark110@gmail.com',
};

export const about = {
  lead: 'Divine Park works somewhere between the social and the technical — and has stopped apologizing for not choosing.',
  paragraphs: [
    'The work started in rooms: intake desks, community halls, waiting areas where the forms were always longer than anyone’s patience. Social work teaches you to read a system from the bottom — from the position of the person it is happening to.',
    'Python came later, and for a practical reason. Too much of the job was copying the same information between the same three spreadsheets. The first script saved forty minutes a week. The second one raised a question nobody had asked: who decided the work should be organized this way?',
    'Since then the practice has moved between casework, organizing, research and software — treating each as a different way of asking how people coordinate, and who carries the cost when they can’t.',
    'Divine is interested in what technology does to people, and what people could do with technology if they stopped treating it as neutral.',
  ],
  meta: [
    ['PRACTICE', 'social work / organizing / python / research'],
    ['CURRENTLY', 'small tools for groups that can’t afford large ones'],
    ['READING', 'political economy, cybernetics, old unix manuals'],
    ['AVOIDING', 'dashboards nobody asked for'],
  ] as [string, string][],
  registers: [
    ['Social worker', 'Learned systems from the waiting-room side.'],
    ['Organizer', 'Learned that a meeting is a protocol.'],
    ['Programmer', 'Learned that a protocol can be a program.'],
    ['Vibe coder', 'Learned to sketch in software.'],
    ['Researcher', 'Learned to check the sketch against people.'],
    ['Builder', 'Went back to the waiting room — with better tools.'],
  ] as [string, string][],
};

export const politics = {
  label: 'communist',
  paragraphs: [
    'Divine identifies as a communist — less as a slogan than as a working question: who owns the things we all depend on, and who decides how they run?',
    'The question turns up in software more often than people expect. In who can edit the database. In who maintains a tool after the grant ends. In whose time an automation saves, and whose it quietly consumes.',
    'It is a politics practiced mostly in small rooms: reading groups, tenant meetings, shared spreadsheets, the unglamorous work of keeping things running for everyone.',
  ],
  interests: [
    'collective ownership',
    'labor',
    'community',
    'technology',
    'resource distribution',
    'political economy',
  ],
  aside: 'Prefers reading groups to rallies, and maintenance to manifestos.',
};

export const vibe = {
  statement:
    'Vibe coding is less about abandoning engineering discipline and more about changing the interface between thought and implementation.',
  paragraphs: [
    'The idea arrives as a sentence. The sentence becomes a prompt. The prompt becomes something that runs — badly, at first. Then the actual work begins: breaking it on purpose, reading what the machine wrote, and rebuilding the parts that matter by hand.',
    'Taken seriously, it is a way of thinking out loud in software. Taken lazily, it is a way of shipping things nobody understands. The difference is entirely in steps four and five.',
  ],
  steps: [
    { name: 'IDEA', note: 'A sentence, usually from someone else’s problem.', log: 'note: "volunteers keep double-booking the van"' },
    { name: 'PROMPT', note: 'Describe the shape, not the solution.', log: '> a shift board where conflicts are impossible, not just flagged' },
    { name: 'PROTOTYPE', note: 'Something runs within the hour.', log: 'uvicorn app:app — 214 lines, 0 tests, 1 working page' },
    { name: 'BREAK IT', note: 'Feed it the real, messy inputs.', log: 'IntegrityError: two drivers, one van, overlapping 14:00' },
    { name: 'UNDERSTAND IT', note: 'Read every line the machine wrote.', log: 'the model guessed the rules. the rules were wrong. so was I.' },
    { name: 'REBUILD IT', note: 'By hand where it matters.', log: '96 lines, 11 tests, an exclusion constraint, one happy coordinator' },
  ],
};

export const contact = {
  heading: 'Have something interesting?',
  email: 'divinepark110@gmail.com',
  open: ['community technology', 'small tools for small groups', 'research collaborations', 'strange prototypes'],
};
