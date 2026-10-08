import { projects } from '../data/projects';
import { ideas } from '../data/ideas';
import { fieldNotes } from '../data/notes';
import { domains } from '../data/skills';
import { politics, profile } from '../data/profile';

export type OutKind = 'in' | 'out' | 'dim' | 'accent' | 'err';
export interface OutLine {
  kind: OutKind;
  text: string;
}
export type Effect = { type: 'clear' } | { type: 'mode' } | { type: 'goto'; id: string };
export interface Result {
  lines: OutLine[];
  effect?: Effect;
}

const o = (text: string, kind: OutKind = 'out'): OutLine => ({ kind, text });
const lines = (...t: (string | OutLine)[]) => t.map((x) => (typeof x === 'string' ? o(x) : x));

const SECTIONS = ['index', 'about', 'work', 'projects', 'code', 'politics', 'vibe', 'ideas', 'notes', 'contact'];

const FILES: Record<string, string[]> = {
  'about.txt': [
    'Divine Park works between the social and the technical.',
    'Casework → organizing → research → Python → back again.',
  ],
  'manifesto.txt': [
    'there is no manifesto.',
    'there is a shared document, a rota, and a meeting on thursday.',
    'that is usually better.',
  ],
  'ideas.md': ideas.map((i) => `- ${i.statement}`),
  '.plan': [
    'q4: hand COMMONS to its second maintainer',
    'q4: finish field note 033, or admit it is a dashboard',
    'always: fewer features, more handovers',
  ],
  '.secrets': ['nice try.', 'there are no secrets here. that is sort of the point.'],
};

export const COMMANDS = [
  'help', 'about', 'whoami', 'projects', 'python', 'ideas', 'notes', 'politics', 'vibe',
  'contact', 'ls', 'cat', 'goto', 'mode', 'clear', 'date', 'uptime', 'echo', 'history', 'git',
];

const started = Date.now();

export function run(input: string, history: string[]): Result {
  const raw = input.trim();
  if (!raw) return { lines: [] };
  const [cmd, ...args] = raw.split(/\s+/);
  const rest = args.join(' ');

  switch (cmd.toLowerCase()) {
    case 'help':
      return {
        lines: lines(
          o('available — intentionally limited:', 'dim'),
          '  whoami      about      projects   python',
          '  ideas       notes      politics   vibe',
          '  contact     ls         cat <file> goto <section>',
          '  mode        history    date       clear',
          o('some commands are not listed. that is how archives work.', 'dim'),
        ),
      };
    case 'whoami':
      return {
        lines: lines(
          o('divine@park:~$', 'dim'),
          '',
          'social worker',
          'communist',
          'python developer',
          'vibe coder',
          'human',
          '',
          o('> still building', 'accent'),
        ),
      };
    case 'about':
      return { lines: lines(...FILES['about.txt'], o("try 'goto about' for the long version.", 'dim')) };
    case 'projects':
      return {
        lines: lines(
          ...projects.map((p) => `  ${p.index}  ${p.name.padEnd(22)} ${p.status}`),
          o("'goto projects' to open them.", 'dim'),
        ),
      };
    case 'python':
      return {
        lines: lines(
          o('Python 3.12 — the daily language', 'dim'),
          ...domains.slice(0, 4).map((d) => `  ${d.name.toLowerCase().padEnd(12)} ${d.tags.join(' · ')}`),
          o('>>> import antigravity', 'dim'),
          o("you're flying. (no, this one is just a reference.)", 'dim'),
        ),
      };
    case 'ideas':
      return { lines: lines(...ideas.map((i, n) => `  ${String(n + 1).padStart(2, '0')}  ${i.statement}`)) };
    case 'notes':
      return {
        lines: lines(...fieldNotes.map((n) => `  FN ${n.number}  ${n.status.padEnd(9)} ${n.title}`)),
      };
    case 'politics':
      return {
        lines: lines(o(politics.label, 'accent'), ...politics.interests.map((i) => `  · ${i}`), o(politics.aside, 'dim')),
      };
    case 'vibe':
      return {
        lines: lines('idea → prompt → prototype → break it → understand it → rebuild it', o('↺ repeat until it is boring', 'dim')),
      };
    case 'contact':
      return { lines: lines(profile.email, o("'goto contact' for the long version.", 'dim')) };
    case 'ls': {
      const all = args.includes('-a') || args.includes('-la') || args.includes('-al');
      const names = Object.keys(FILES).filter((f) => all || !f.startsWith('.'));
      return { lines: lines([...(all ? ['.', '..'] : []), ...names, 'projects/', 'field-notes/'].join('   ')) };
    }
    case 'cat': {
      if (!rest) return { lines: [o('cat: missing file operand', 'err')] };
      const file = FILES[rest];
      if (file) return { lines: lines(...file) };
      if (rest.endsWith('/')) return { lines: [o(`cat: ${rest}: is a directory`, 'err')] };
      return { lines: [o(`cat: ${rest}: no such file`, 'err')] };
    }
    case 'cd':
      return { lines: [o("there is only ~. try 'goto <section>'.", 'dim')] };
    case 'goto': {
      const id = rest.toLowerCase().replace(/^#/, '');
      if (SECTIONS.includes(id)) return { lines: [o(`→ ${id}`, 'dim')], effect: { type: 'goto', id } };
      return { lines: [o(`goto: unknown section. one of: ${SECTIONS.join(', ')}`, 'err')] };
    }
    case 'mode':
    case 'source':
      return { lines: [o('switching register…', 'dim')], effect: { type: 'mode' } };
    case 'clear':
      return { lines: [], effect: { type: 'clear' } };
    case 'date':
      return { lines: [o(new Date().toString())] };
    case 'uptime': {
      const s = Math.floor((Date.now() - started) / 1000);
      return { lines: [o(`up ${Math.floor(s / 60)}m ${s % 60}s on this page. considerably longer elsewhere.`)] };
    }
    case 'echo':
      return { lines: [o(rest)] };
    case 'history':
      return { lines: history.map((h, i) => o(`  ${String(i + 1).padStart(3)}  ${h}`)) };
    case 'git':
      if (args[0] === 'log')
        return {
          lines: lines(
            o('commit 7f3a1c2 (HEAD -> main)', 'accent'),
            '    hand off rota to second maintainer',
            o('commit 41be09d', 'accent'),
            '    remove dashboard (nobody looked at it)',
            o('commit 0000001', 'accent'),
            '    initial commit: a script that fills the same form three times',
          ),
        };
      return { lines: [o("git: only 'git log' is public.", 'dim')] };

    /* — unlisted — */
    case 'sudo':
      return {
        lines: [o('divine is not in the sudoers file.', 'err'), o('this incident will be raised at the next general meeting.', 'dim')],
      };
    case 'rm':
      return { lines: [o('refusing. some things should stay collectively owned — including this filesystem.', 'err')] };
    case 'exit':
    case 'logout':
      return { lines: [o('there is no exit. only better systems.', 'dim')] };
    case 'make':
      if (/revolution/i.test(rest))
        return {
          lines: [o("make: *** No rule to make target 'revolution'.", 'err'), o('hint: try organizing first. it takes longer than compiling.', 'dim')],
        };
      return { lines: [o(`make: *** No rule to make target '${rest || 'all'}'.`, 'err')] };
    case 'import':
      if (rest === 'this')
        return {
          lines: lines(
            o('The Zen of Park', 'accent'),
            'Boring is better than clever.',
            'Handover is better than heroics.',
            'The person waiting counts more than the person building.',
            'If nobody can maintain it, it is not finished.',
            'If it needs a dashboard, ask a person first.',
            'Collective is better than central.',
            'Now is better than never — but next Thursday is fine.',
          ),
        };
      return { lines: [o(`ModuleNotFoundError: No module named '${rest}'`, 'err')] };
    case 'coffee':
    case 'tea':
      return { lines: lines('   ( (', '    ) )', '  ........', '  |      |]', '  \\      /', "   `----'", o('brewing. organizing runs on this.', 'dim')) };
    case 'hello':
    case 'hi':
      return { lines: [o('hello. you found the terminal. most people scroll past it.')] };
    case 'ping':
      return { lines: [o('pong — 0.4ms, from somewhere between rooms')] };
    case 'man':
      return { lines: [o(`No manual entry for ${rest || 'that'}. People do not come with manuals. Ask.`, 'dim')] };
    case 'vim':
    case 'nvim':
    case 'emacs':
      return { lines: [o('the editor wars were settled collectively: use whatever your comrade can maintain.', 'dim')] };
    default:
      return { lines: [o(`park-sh: command not found: ${cmd}. try 'help'.`, 'err')] };
  }
}
