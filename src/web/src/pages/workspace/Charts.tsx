import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

export interface Point {
  label: string;
  value: number;
}

/** "Nice" axis maximum: 1, 2, 2.5 or 5 × 10^n at or above the data maximum (min 1). */
export function niceMax(max: number): number {
  if (!(max > 0)) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(max)));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * exp >= max) return m * exp;
  return 10 * exp;
}

/**
 * Single-series column chart (one hue, so no legend: the title names the series). Every bar is a focusable
 * hit target with a tooltip on hover/focus; a data table is always available under "Show data".
 */
export function ColumnChart({
  title,
  points,
  format,
  height = 180,
}: {
  title: string;
  points: Point[];
  format?: (n: number) => string;
  height?: number;
}) {
  const { t, fmtNumber } = useI18n();
  const fmt = format ?? fmtNumber;
  const id = useId();
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(0, ...points.map((p) => p.value)));
  const W = 600;
  const padL = 44;
  const padB = 22;
  const plotW = W - padL - 8;
  const plotH = height - padB - 8;
  const step = points.length ? plotW / points.length : plotW;
  const barW = Math.max(2, Math.min(36, step - 2));
  const y = (v: number) => 8 + plotH - (v / max) * plotH;
  const ticks = [0, max / 2, max];
  const labelEvery = Math.max(1, Math.ceil(points.length / 8));
  return (
    <figure className="ws-chart">
      <figcaption id={`${id}-t`} className="ws-chart__title">
        {title}
      </figcaption>
      {points.length === 0 || points.every((p) => p.value === 0) ? (
        <p className="muted small">{t('workspace.charts.noData')}</p>
      ) : (
        <div className="ws-chart__plot">
          <svg
            viewBox={`0 0 ${W} ${height}`}
            role="img"
            aria-labelledby={`${id}-t`}
            preserveAspectRatio="none"
            style={{ direction: 'ltr' }}
          >
            {ticks.map((tk) => (
              <g key={tk}>
                <line x1={padL} x2={W - 8} y1={y(tk)} y2={y(tk)} className="ws-chart__grid" />
                <text x={padL - 6} y={y(tk) + 4} textAnchor="end" className="ws-chart__axis">
                  {fmt(tk)}
                </text>
              </g>
            ))}
            {points.map((p, i) => {
              const x = padL + i * step + (step - barW) / 2;
              const top = y(p.value);
              const h = Math.max(0, 8 + plotH - top);
              return (
                <g key={p.label}>
                  {/* Hit target larger than the mark. */}
                  <rect
                    x={padL + i * step}
                    y={8}
                    width={step}
                    height={plotH}
                    className="ws-chart__hit"
                    tabIndex={0}
                    role="img"
                    aria-label={`${p.label}: ${fmt(p.value)}`}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  />
                  <path
                    d={roundedTop(x, top, barW, h)}
                    className={active === i ? 'ws-chart__bar ws-chart__bar--on' : 'ws-chart__bar'}
                    pointerEvents="none"
                  />
                  {i % labelEvery === 0 ? (
                    <text
                      x={x + barW / 2}
                      y={height - 6}
                      textAnchor="middle"
                      className="ws-chart__axis"
                    >
                      {p.label.slice(5)}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
          {active !== null && points[active] ? (
            <div
              className="ws-chart__tip"
              style={{ insetInlineStart: `${((padL + (active + 0.5) * step) / W) * 100}%` }}
              role="status"
            >
              <strong>{fmt(points[active].value)}</strong>
              <span className="muted"> {points[active].label}</span>
            </div>
          ) : null}
        </div>
      )}
      <DataTable
        caption={title}
        head={[t('workspace.charts.period'), t('workspace.charts.value')]}
        rows={points.map((p) => [p.label, fmt(p.value)])}
      />
    </figure>
  );
}

function roundedTop(x: number, top: number, w: number, h: number): string {
  if (h <= 0) return '';
  const r = Math.min(4, w / 2, h);
  const bottom = top + h;
  return `M${x},${bottom}V${top + r}Q${x},${top} ${x + r},${top}H${x + w - r}Q${x + w},${top} ${x + w},${top + r}V${bottom}Z`;
}

/** Horizontal meter rows (e.g. a lesson completion funnel): started vs completed as text + bar of completed share. */
export function MeterList({
  title,
  rows,
}: {
  title: string;
  rows: { key: string; label: ReactNode; value: number; max: number; text: string }[];
}) {
  const { t } = useI18n();
  return (
    <section className="ws-chart">
      <h3 className="ws-chart__title">{title}</h3>
      {rows.length === 0 ? (
        <p className="muted small">{t('workspace.charts.noData')}</p>
      ) : (
        <ul className="ws-meters">
          {rows.map((r) => (
            <li key={r.key}>
              <div className="row row--between small">
                <span>{r.label}</span>
                <span>{r.text}</span>
              </div>
              <div
                className="ws-meter"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={r.max || 1}
                aria-valuenow={r.value}
                aria-valuetext={r.text}
              >
                <span style={{ inlineSize: `${r.max ? (r.value / r.max) * 100 : 0}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: ReactNode[][];
}) {
  const { t } = useI18n();
  if (rows.length === 0) return null;
  return (
    <details className="ws-chart__data">
      <summary>{t('workspace.charts.showData')}</summary>
      <div className="table-wrap">
        <table className="table">
          <caption className="visually-hidden">{caption}</caption>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="ws-stat">
      <div className="ws-stat__label">{label}</div>
      <div className="ws-stat__value">{value}</div>
      {hint ? <div className="ws-stat__hint small muted">{hint}</div> : null}
    </div>
  );
}
