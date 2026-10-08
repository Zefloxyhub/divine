import { useMemo } from 'react';
import { toPython } from '../lib/pysource';
import type { Line, SourceSpec } from '../lib/pysource';

export function CodeLines({ lines, start = 1 }: { lines: Line[]; start?: number }) {
  return (
    <code className="code-lines">
      {lines.map((line, i) => {
        // Hanging indent: wrapped continuation lines align one level past the line's own indentation.
        const lead = line[0]?.k === 'plain' ? line[0].v.length - line[0].v.trimStart().length : 0;
        const hang = `${lead + 4}ch`;
        return (
          <span className="code-line" key={i}>
            <span className="code-ln" aria-hidden="true">
              {i + start}
            </span>
            <span className="code-lc" style={{ paddingLeft: hang, textIndent: `-${hang}` }}>
              {line.length === 0 ? ' ' : line.map((t, j) => <span key={j} className={`t-${t.k}`}>{t.v}</span>)}
            </span>
          </span>
        );
      })}
    </code>
  );
}

export function Source({ spec }: { spec: SourceSpec }) {
  const lines = useMemo(() => toPython(spec), [spec]);
  return (
    <div className="source">
      <div className="source-bar">
        <span>{spec.file}</span>
        <span className="source-bar-meta">
          {lines.length} lines · read-only · <kbd>M</kbd> to return
        </span>
      </div>
      <pre className="source-pre" tabIndex={0} aria-label={`Source view of ${spec.file}`}>
        <CodeLines lines={lines} />
      </pre>
    </div>
  );
}
