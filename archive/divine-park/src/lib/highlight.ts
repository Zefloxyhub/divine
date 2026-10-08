import type { Line, TokKind } from './pysource';

const KEYWORDS = new Set([
  'from', 'import', 'def', 'class', 'return', 'if', 'else', 'for', 'in', 'not', 'and', 'or',
  'None', 'True', 'False', 'with', 'as', 'while', 'lambda', 'yield', 'async', 'await',
]);

const RE = /(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(@\w+)|(\b[A-Za-z_]\w*\b)|(\s+)|([^\sA-Za-z_\d"'#]+)/g;

/** Minimal Python highlighter: good enough for short, hand-written samples. */
export function highlightPython(code: string): Line[] {
  return code.split('\n').map((raw) => {
    if (raw.trim().startsWith('"""')) return [{ k: 'com', v: raw }];
    const line: Line = [];
    for (const m of raw.matchAll(RE)) {
      const [text, com, str, num, deco, word] = m;
      let k: TokKind = 'plain';
      if (com) k = 'com';
      else if (str) k = 'str';
      else if (num) k = 'num';
      else if (deco) k = 'key';
      else if (word) k = KEYWORDS.has(word) ? 'kw' : /^[A-Z]/.test(word) ? 'name' : 'plain';
      else if (!/^\s+$/.test(text)) k = 'punc';
      line.push({ k, v: text });
    }
    return line;
  });
}
