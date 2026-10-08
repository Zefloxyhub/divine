import { capabilities } from '../data/capabilities';
import { method } from '../data/domains';
import { lab } from '../data/lab';
import { projects } from '../data/projects';
import { brand } from '../data/site';
import { domains } from '../data/stack';
import { thinking } from '../data/thinking';

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

const SECTIONS = ['index', 'idea', 'build', 'domains', 'method', 'outcome', 'clients', 'work', 'lab', 'stack', 'thinking', 'about', 'contact'];

const FILES: Record<string, string[]> = {
  'about.txt': [
    'Tradifier is a technology studio.',
    'Software, automation, AI, trading technology, digital growth — one capability: building systems.',
  ],
  'manifesto.txt': ['there is no manifesto.', 'there is a backlog, a test suite and a deploy on friday.', '(we do not deploy on friday.)'],
  'principles.md': thinking.map((t) => `- ${t.statement}`),
  '.plan': ['ship scoutos v1', 'move two lab prototypes into real products', 'delete one dashboard nobody opens'],
  '.env': ['nice try.', 'secrets live in a vault, not in a portfolio.'],
};

export const COMMANDS = [
  'help', 'whoami', 'services', 'projects', 'lab', 'stack', 'method', 'principles', 'contact',
  'ls', 'cat', 'goto', 'mode', 'clear', 'date', 'uptime', 'echo', 'history', 'git',
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
          '  whoami      services   projects   lab',
          '  stack       method     principles contact',
          '  ls          cat <file> goto <section>',
          '  mode        history    date       clear',
          o('some commands are not listed. engineers will find them.', 'dim'),
        ),
      };
    case 'whoami':
      return {
        lines: lines(o('tradifier@studio:~$', 'dim'), '', 'software', 'automation', 'ai', 'trading technology', 'digital growth', '', o('> we build systems', 'accent')),
      };
    case 'services':
    case 'build':
      return { lines: lines(...capabilities.map((c) => `  ${c.index}  ${c.name.padEnd(24)} ${c.line}`), o("'goto build' for the details.", 'dim')) };
    case 'projects':
    case 'work':
      return { lines: lines(...projects.map((p) => `  ${p.index}  ${p.name.padEnd(21)} ${p.label.toLowerCase()}`), o("'goto work' to open them.", 'dim')) };
    case 'lab':
      return { lines: lines(...lab.map((l) => `  LAB/${l.number}  ${l.project.padEnd(16)} ${l.status.toLowerCase()}`)) };
    case 'stack':
      return { lines: lines(...domains.map((d) => `  ${d.name.toLowerCase().padEnd(15)} ${d.tags.join(' · ')}`), o('whatever solves the problem.', 'dim')) };
    case 'method':
      return { lines: lines(method.map((m) => m.name.toLowerCase()).join(' → '), o('then iterate.', 'dim')) };
    case 'principles':
      return { lines: lines(...thinking.map((t, i) => `  ${String(i + 1).padStart(2, '0')}  ${t.statement}`)) };
    case 'contact':
      return { lines: lines(brand.email, o("tell us what you're trying to make, automate, fix or grow.", 'dim')) };
    case 'ls': {
      const all = args.includes('-a') || args.includes('-la') || args.includes('-al');
      const names = Object.keys(FILES).filter((f) => all || !f.startsWith('.'));
      return { lines: lines([...(all ? ['.', '..'] : []), ...names, 'projects/', 'lab/'].join('   ')) };
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
    case 'system':
      return { lines: [o('showing the system underneath…', 'dim')], effect: { type: 'mode' } };
    case 'clear':
      return { lines: [], effect: { type: 'clear' } };
    case 'date':
      return { lines: [o(new Date().toString())] };
    case 'uptime': {
      const s = Math.floor((Date.now() - started) / 1000);
      return { lines: [o(`up ${Math.floor(s / 60)}m ${s % 60}s on this page. all systems nominal.`)] };
    }
    case 'echo':
      return { lines: [o(rest)] };
    case 'history':
      return { lines: history.map((h, i) => o(`  ${String(i + 1).padStart(3)}  ${h}`)) };
    case 'git':
      if (args[0] === 'log')
        return {
          lines: lines(
            o('commit 9c1e4fa (HEAD -> main)', 'accent'),
            '    add pre-trade risk check. strategy no longer gets a vote.',
            o('commit 5b72d10', 'accent'),
            '    replace 6 tools with 1 webhook',
            o('commit 0000001', 'accent'),
            '    initial commit: we build systems',
          ),
        };
      return { lines: [o("git: only 'git log' is public.", 'dim')] };

    /* — unlisted — */
    case 'make':
      if (/profit|money|rich/i.test(rest))
        return {
          lines: [
            o(`make: *** No rule to make target '${rest}'.`, 'err'),
            o("we build trading technology. we don't sell certainty.", 'dim'),
          ],
        };
      return { lines: [o(`make: building '${rest || 'all'}'… just kidding. tell us what it should do first.`, 'dim')] };
    case 'sudo':
      return { lines: [o('permission denied.', 'err'), o('good systems have access control. this one too.', 'dim')] };
    case 'rm':
      return { lines: [o('refusing. we prefer rollbacks to regrets.', 'err')] };
    case 'exit':
    case 'logout':
      return { lines: [o("you can leave. the cron jobs can't.", 'dim')] };
    case 'import':
      if (rest === 'this')
        return {
          lines: lines(
            o('The Zen of Tradifier', 'accent'),
            'Build less. Connect more.',
            'Automate the boring.',
            'Software should have a job.',
            'Experiment early.',
            'Complexity is not a flex.',
            'Ship.',
          ),
        };
      return { lines: [o(`ModuleNotFoundError: No module named '${rest}'`, 'err')] };
    case 'ai':
    case 'chatgpt':
      return { lines: [o('not another chatbot. ai becomes useful when it has somewhere to go.', 'dim')] };
    case 'coffee':
      return { lines: lines('   ( (', '    ) )', '  ........', '  |      |]', '  \\      /', "   `----'", o('deploy fuel loaded.', 'dim')) };
    case 'hello':
    case 'hi':
      return { lines: [o('hello. you found the terminal. most people scroll past it.')] };
    case 'ping':
      return { lines: [o('pong — 0.4ms. systems online.')] };
    default:
      return { lines: [o(`tradifier-sh: command not found: ${cmd}. try 'help'.`, 'err')] };
  }
}
