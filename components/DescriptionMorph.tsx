import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

/**
 * Shows `short` by default and morphs into `full` while the parent `.project-card`
 * is hovered or keyboard-focused. Words the two versions share slide from their
 * spot in the short text to their spot in the full text, words only in the short
 * text (like a trailing "...") fade out, and new words fade in. The motion itself
 * is plain CSS (see `.morph*` in index.html); this component only measures where
 * every word sits in each version and hands those positions to CSS.
 */

interface Token {
  text: string;
  /** Punctuation glued to the previous word, so no space before it. */
  attached: boolean;
}

const tokenize = (s: string): Token[] => {
  const tokens: Token[] = [];
  for (const word of s.trim().split(/\s+/)) {
    const [, core, punct] = word.match(/^(.*?)([.,!?…]+)?$/) ?? [word, word, undefined];
    if (core) tokens.push({ text: core, attached: false });
    if (punct) tokens.push({ text: punct, attached: Boolean(core) });
  }
  return tokens;
};

/** One rendered word: present in the short text, the full text, or both. */
interface Unit {
  key: string;
  shortIndex?: number;
  fullIndex?: number;
  shortText?: string;
  fullText?: string;
}

/** Longest common subsequence of the two token lists (case-insensitive). */
const buildUnits = (short: Token[], full: Token[]): Unit[] => {
  const norm = (t: Token) => t.text.toLowerCase();
  const n = short.length;
  const m = full.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = norm(short[i]) === norm(full[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const units: Unit[] = [];
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && norm(short[i]) === norm(full[j])) {
      units.push({ key: `b${i}-${j}`, shortIndex: i, fullIndex: j, shortText: short[i].text, fullText: full[j].text });
      i++;
      j++;
    } else if (j >= m || (i < n && dp[i + 1][j] >= dp[i][j + 1])) {
      units.push({ key: `s${i}`, shortIndex: i, shortText: short[i].text });
      i++;
    } else {
      units.push({ key: `f${j}`, fullIndex: j, fullText: full[j].text });
      j++;
    }
  }
  return units;
};

interface Layout {
  short: { x: number; y: number }[];
  full: { x: number; y: number }[];
  shortHeight: number;
  fullHeight: number;
}

/** Invisible copy of one version, used only to measure where each word lands. */
const MeasureLayer = React.forwardRef<HTMLParagraphElement, { tokens: Token[] }>(({ tokens }, ref) => {
  // Keep a word and its glued punctuation on the same line.
  const groups: Token[][] = [];
  for (const t of tokens) {
    if (t.attached && groups.length) groups[groups.length - 1].push(t);
    else groups.push([t]);
  }
  let index = 0;
  return (
    <p ref={ref} className="morph-measure" aria-hidden="true">
      {groups.map((group, g) => (
        <React.Fragment key={g}>
          {g > 0 && ' '}
          <span className="whitespace-nowrap">
            {group.map((t) => (
              <span key={index} data-i={index++} className="inline-block">
                {t.text}
              </span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </p>
  );
});

export const DescriptionMorph: React.FC<{ short: string; full: string; className?: string }> = ({ short, full, className }) => {
  const shortTokens = useMemo(() => tokenize(short), [short]);
  const fullTokens = useMemo(() => tokenize(full), [full]);
  const units = useMemo(() => buildUnits(shortTokens, fullTokens), [shortTokens, fullTokens]);

  const rootRef = useRef<HTMLDivElement>(null);
  const shortRef = useRef<HTMLParagraphElement>(null);
  const fullRef = useRef<HTMLParagraphElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  // The measure layers exist only in the browser. In the prerendered HTML they would
  // just repeat the description twice more as broken-up words, which is noise for
  // crawlers and AI tools reading the page as text. Both layout effects run before
  // the first paint, so visitors never see the in-between state.
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const measure = () => {
      const read = (layer: HTMLParagraphElement | null) => {
        if (!layer) return [];
        const origin = layer.getBoundingClientRect();
        return Array.from(layer.querySelectorAll<HTMLSpanElement>('[data-i]')).map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left - origin.left, y: r.top - origin.top };
        });
      };
      setLayout({
        short: read(shortRef.current),
        full: read(fullRef.current),
        shortHeight: shortRef.current?.offsetHeight ?? 0,
        fullHeight: fullRef.current?.offsetHeight ?? 0,
      });
    };
    measure();
    // Re-measure when the card changes width (breakpoints) and once web fonts load.
    const observer = new ResizeObserver(measure);
    if (rootRef.current) observer.observe(rootRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [shortTokens, fullTokens, mounted]);

  let newWordCount = 0;

  return (
    <div
      ref={rootRef}
      className={`morph ${className ?? ''}`}
      style={
        layout
          ? ({ '--h-short': `${layout.shortHeight}px`, '--h-full': `${layout.fullHeight}px` } as React.CSSProperties)
          : undefined
      }
    >
      <span className="sr-only">{full}</span>
      {mounted && (
        <>
          <MeasureLayer ref={shortRef} tokens={shortTokens} />
          <MeasureLayer ref={fullRef} tokens={fullTokens} />
        </>
      )}

      {layout ? (
        units.map((u) => {
          const a = u.shortIndex !== undefined ? layout.short[u.shortIndex] : undefined;
          const b = u.fullIndex !== undefined ? layout.full[u.fullIndex] : undefined;
          const from = a ?? b ?? { x: 0, y: 0 };
          const to = b ?? a ?? { x: 0, y: 0 };
          const kind = a && b ? 'morph-both' : a ? 'morph-short' : 'morph-full';
          const style = {
            '--ax': `${from.x}px`,
            '--ay': `${from.y}px`,
            '--bx': `${to.x}px`,
            '--by': `${to.y}px`,
            ...(kind === 'morph-full' ? { '--stagger': `${Math.min(newWordCount++, 8) * 25}ms` } : {}),
          } as React.CSSProperties;

          // A shared word whose spelling changes (e.g. "Dining" → "dining") cross-fades while it moves.
          const content =
            kind === 'morph-both' && u.shortText !== u.fullText ? (
              <>
                <span className="morph-text-short">{u.shortText}</span>
                <span className="morph-text-full">{u.fullText}</span>
              </>
            ) : (
              u.fullText ?? u.shortText
            );

          return (
            <span key={u.key} className={`morph-tok ${kind}`} style={style} aria-hidden="true">
              {content}
            </span>
          );
        })
      ) : (
        <p aria-hidden="true">{short}</p>
      )}
    </div>
  );
};
