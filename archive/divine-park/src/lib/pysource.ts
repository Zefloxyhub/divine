/**
 * Serializes plain data into Python-flavoured source, as highlighted tokens.
 * Powers "source mode": every section can be read as the data it is made of.
 */
export type TokKind = 'key' | 'str' | 'num' | 'kw' | 'com' | 'punc' | 'name' | 'plain';
export interface Tok {
  k: TokKind;
  v: string;
}
export type Line = Tok[];

const INDENT = '    ';

const pyString = (s: string) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;

const isScalar = (v: unknown) => v === null || ['string', 'number', 'boolean'].includes(typeof v);

function scalar(v: unknown): Tok {
  if (v === null || v === undefined) return { k: 'kw', v: 'None' };
  if (typeof v === 'boolean') return { k: 'kw', v: v ? 'True' : 'False' };
  if (typeof v === 'number') return { k: 'num', v: String(v) };
  return { k: 'str', v: pyString(String(v)) };
}

function inlineLength(v: unknown[]): number {
  return v.reduce<number>((n, x) => n + String(x).length + 4, 2);
}

function emit(value: unknown, depth: number, lines: Line[], cur: Line): Line {
  const pad = INDENT.repeat(depth);
  const inner = INDENT.repeat(depth + 1);

  if (isScalar(value) || value === undefined) {
    cur.push(scalar(value));
    return cur;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      cur.push({ k: 'punc', v: '[]' });
      return cur;
    }
    if (value.every(isScalar) && inlineLength(value) < 96) {
      cur.push({ k: 'punc', v: '[' });
      value.forEach((x, i) => {
        if (i) cur.push({ k: 'punc', v: ', ' });
        cur.push(scalar(x));
      });
      cur.push({ k: 'punc', v: ']' });
      return cur;
    }
    cur.push({ k: 'punc', v: '[' });
    lines.push(cur);
    for (const item of value) {
      let line: Line = [{ k: 'plain', v: inner }];
      line = emit(item, depth + 1, lines, line);
      line.push({ k: 'punc', v: ',' });
      lines.push(line);
    }
    return [{ k: 'plain', v: pad }, { k: 'punc', v: ']' }];
  }

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) {
    cur.push({ k: 'punc', v: '{}' });
    return cur;
  }
  cur.push({ k: 'punc', v: '{' });
  lines.push(cur);
  for (const [key, v] of entries) {
    let line: Line = [
      { k: 'plain', v: inner },
      { k: 'key', v: pyString(key) },
      { k: 'punc', v: ': ' },
    ];
    line = emit(v, depth + 1, lines, line);
    line.push({ k: 'punc', v: ',' });
    lines.push(line);
  }
  return [{ k: 'plain', v: pad }, { k: 'punc', v: '}' }];
}

export interface SourceSpec {
  file: string;
  name: string;
  type?: string;
  value: unknown;
  comment?: string;
}

export function toPython(spec: SourceSpec): Line[] {
  const lines: Line[] = [];
  lines.push([{ k: 'com', v: `# ${spec.file}` }]);
  if (spec.comment) lines.push([{ k: 'com', v: `# ${spec.comment}` }]);
  lines.push([]);
  const head: Line = [{ k: 'name', v: spec.name }];
  if (spec.type) head.push({ k: 'punc', v: ': ' }, { k: 'kw', v: spec.type });
  head.push({ k: 'punc', v: ' = ' });
  lines.push(emit(spec.value, 0, lines, head));
  return lines;
}
