import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { PageHeader, QueryState } from '../../components/ui/misc';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

// ---------- Types ----------

interface SkillNodeDto {
  id: number;
  code: string;
  name: string;
  description: string | null;
  categoryCode: string | null;
  categoryId: number | null;
}
interface SkillEdgeDto {
  id: number;
  fromSkillId: number;
  toSkillId: number;
}
interface SkillGraphDto {
  nodes: SkillNodeDto[];
  edges: SkillEdgeDto[];
}
interface SkillMasteryDto {
  skillId: number;
  skillCode: string;
  skillName: string;
  masteryScore: number;
  evidenceCount: number;
  lastPracticedUtc: string;
  nextReviewUtc: string | null;
  stability: number;
  difficulty: number;
}
interface SkillMasterySummaryDto {
  totalSkills: number;
  masteredCount: number;
  inProgressCount: number;
  weakCount: number;
  dueForReviewCount: number;
  items: SkillMasteryDto[];
}
interface SkillGapDto {
  skillId: number;
  skillCode: string;
  skillName: string;
  masteryScore: number;
  depth: number;
}

// ---------- Layout ----------

interface LayoutNode {
  id: number;
  x: number;
  y: number;
  label: string;
  code: string;
  description: string | null;
}

function forceLayout(
  nodes: SkillNodeDto[],
  edges: SkillEdgeDto[],
  width: number,
  height: number,
): LayoutNode[] {
  const padding = 60;
  const cols = Math.ceil(Math.sqrt(nodes.length));
  const cellW = (width - padding * 2) / Math.max(cols, 1);
  const rows = Math.ceil(nodes.length / cols);
  const cellH = (height - padding * 2) / Math.max(rows, 1);

  // Initialize on grid
  const positions = nodes.map((n, i) => ({
    id: n.id,
    x: padding + (i % cols) * cellW + cellW / 2,
    y: padding + Math.floor(i / cols) * cellH + cellH / 2,
    vx: 0,
    vy: 0,
    label: n.name,
    code: n.code,
    description: n.description,
  }));

  const idxMap = new Map(positions.map((p, i) => [p.id, i]));

  // Force iterations
  for (let iter = 0; iter < 80; iter++) {
    const alpha = 0.3 * (1 - iter / 80);

    // Repulsion between all pairs
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        let dx = positions[j].x - positions[i].x;
        let dy = positions[j].y - positions[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (120 * 120) / dist;
        const fx = (dx / dist) * force * alpha;
        const fy = (dy / dist) * force * alpha;
        positions[i].x -= fx;
        positions[i].y -= fy;
        positions[j].x += fx;
        positions[j].y += fy;
      }
    }

    // Attraction along edges
    for (const e of edges) {
      const ai = idxMap.get(e.fromSkillId);
      const bi = idxMap.get(e.toSkillId);
      if (ai === undefined || bi === undefined) continue;
      const a = positions[ai];
      const b = positions[bi];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = (dist - 100) * 0.05 * alpha;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.x += fx;
      a.y += fy;
      b.x -= fx;
      b.y -= fy;
    }

    // Keep in bounds
    for (const p of positions) {
      p.x = Math.max(padding, Math.min(width - padding, p.x));
      p.y = Math.max(padding, Math.min(height - padding, p.y));
    }
  }

  return positions;
}

// ---------- Colors ----------

function masteryColor(score: number): string {
  if (score >= 80) return 'var(--c-success)';
  if (score >= 40) return 'var(--c-accent-mark)';
  if (score > 0) return 'var(--c-danger)';
  return 'var(--c-border)';
}

function masteryLabel(score: number): string {
  if (score >= 80) return 'Mastered';
  if (score >= 40) return 'In Progress';
  if (score > 0) return 'Weak';
  return 'Not Started';
}

// ---------- Component ----------

export function SkillGraphView() {
  const { t } = useI18n();
  usePageMeta('Skill Graph', undefined, { noindex: true });

  const graphQ = useQuery({
    queryKey: ['skill-graph'],
    queryFn: () => api<SkillGraphDto>('/api/skills/graph'),
  });
  const masteryQ = useQuery({
    queryKey: ['skill-mastery'],
    queryFn: () => api<SkillMasterySummaryDto>('/api/skills/mastery'),
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [gapTargetId, setGapTargetId] = useState<number | null>(null);
  const [gaps, setGaps] = useState<SkillGapDto[] | null>(null);
  const [gapLoading, setGapLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const graphWidth = 900;
  const graphHeight = 600;

  const layout = useMemo(() => {
    if (!graphQ.data) return [];
    return forceLayout(graphQ.data.nodes, graphQ.data.edges, graphWidth, graphHeight);
  }, [graphQ.data]);

  const masteryMap = useMemo(() => {
    const m = new Map<number, SkillMasteryDto>();
    if (masteryQ.data) {
      for (const item of masteryQ.data.items) m.set(item.skillId, item);
    }
    return m;
  }, [masteryQ.data]);

  const gapSet = useMemo(() => {
    if (!gaps) return new Set<number>();
    return new Set(gaps.map((g) => g.skillId));
  }, [gaps]);

  const selectedNode = useMemo(
    () => (selectedId !== null ? layout.find((n) => n.id === selectedId) : null),
    [selectedId, layout],
  );
  const selectedMastery = selectedId !== null ? masteryMap.get(selectedId) : null;

  const findGaps = useCallback(
    async (skillId: number) => {
      setGapLoading(true);
      setGapTargetId(skillId);
      try {
        const result = await api<SkillGapDto[]>(`/api/skills/gaps/${skillId}`);
        setGaps(result);
      } catch {
        setGaps([]);
      }
      setGapLoading(false);
    },
    [],
  );

  const clearGaps = useCallback(() => {
    setGaps(null);
    setGapTargetId(null);
  }, []);

  const summary = masteryQ.data;

  return (
    <div className="container page">
      <PageHeader title="Skill Graph" subtitle="Your competency DNA — mastery, gaps, and next steps" />

      {/* Summary stats */}
      {summary && (
        <div className="ws-stats" style={{ marginBottom: 'var(--sp-6)' }}>
          <div className="ws-stat">
            <div className="ws-stat__label">Total Skills</div>
            <div className="ws-stat__value">{summary.totalSkills}</div>
          </div>
          <div className="ws-stat">
            <div className="ws-stat__label">Mastered</div>
            <div className="ws-stat__value" style={{ color: 'var(--c-success)' }}>
              {summary.masteredCount}
            </div>
          </div>
          <div className="ws-stat">
            <div className="ws-stat__label">In Progress</div>
            <div className="ws-stat__value" style={{ color: 'var(--c-accent-mark)' }}>
              {summary.inProgressCount}
            </div>
          </div>
          <div className="ws-stat">
            <div className="ws-stat__label">Due for Review</div>
            <div className="ws-stat__value" style={{ color: 'var(--c-danger)' }}>
              {summary.dueForReviewCount}
            </div>
          </div>
        </div>
      )}

      {/* Gap finder controls */}
      {gaps !== null && (
        <div className="card" style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="row row--between" style={{ alignItems: 'center' }}>
            <strong>
              Gap Analysis{' '}
              {gapTargetId !== null && selectedNode
                ? `for "${layout.find((n) => n.id === gapTargetId)?.label}"`
                : ''}
            </strong>
            <Button size="sm" variant="secondary" onClick={clearGaps}>
              Clear
            </Button>
          </div>
          {gaps.length === 0 ? (
            <p className="muted" style={{ margin: 'var(--sp-2) 0 0' }}>
              No prerequisite gaps found. All prerequisites are mastered.
            </p>
          ) : (
            <ul style={{ margin: 'var(--sp-2) 0 0', paddingInlineStart: 'var(--sp-4)' }}>
              {gaps.map((g) => (
                <li key={g.skillId} style={{ marginBottom: 'var(--sp-1)' }}>
                  <strong>{g.skillName}</strong>{' '}
                  <span className="small muted">
                    ({Math.round(g.masteryScore)}% mastery, depth {g.depth})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <QueryState query={graphQ}>
        {(graph) => {
          if (isMobile) {
            // Mobile list view
            return (
              <div className="stack">
                {graph.nodes
                  .map((n) => {
                    const m = masteryMap.get(n.id);
                    const score = m?.masteryScore ?? 0;
                    return { ...n, score };
                  })
                  .sort((a, b) => a.score - b.score)
                  .map((n) => (
                    <div
                      key={n.id}
                      className="card card--flat"
                      style={{
                        borderInlineStart: `4px solid ${masteryColor(n.score)}`,
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedId(n.id === selectedId ? null : n.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setSelectedId(n.id === selectedId ? null : n.id);
                      }}
                    >
                      <div className="row row--between">
                        <strong>{n.name}</strong>
                        <span
                          className="small"
                          style={{ color: masteryColor(n.score) }}
                        >
                          {Math.round(n.score)}% &mdash; {masteryLabel(n.score)}
                        </span>
                      </div>
                      {selectedId === n.id && (
                        <SkillDetail
                          node={{ id: n.id, label: n.name, code: n.code, description: n.description, x: 0, y: 0 }}
                          mastery={masteryMap.get(n.id) ?? null}
                          prereqs={graph.edges
                            .filter((e) => e.toSkillId === n.id)
                            .map((e) => {
                              const pn = graph.nodes.find((nn) => nn.id === e.fromSkillId);
                              const pm = masteryMap.get(e.fromSkillId);
                              return pn
                                ? { name: pn.name, score: pm?.masteryScore ?? 0 }
                                : null;
                            })
                            .filter(Boolean) as { name: string; score: number }[]}
                          onFindGaps={() => findGaps(n.id)}
                          gapLoading={gapLoading}
                        />
                      )}
                    </div>
                  ))}
              </div>
            );
          }

          // Desktop graph view
          return (
            <div style={{ display: 'flex', gap: 'var(--sp-4)' }}>
              <div
                style={{
                  flex: 1,
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-md, 8px)',
                  overflow: 'hidden',
                  background: 'var(--c-surface)',
                }}
              >
                <svg
                  viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  role="img"
                  aria-label="Skill prerequisite graph"
                >
                  {/* Edges */}
                  {graph.edges.map((e) => {
                    const from = layout.find((n) => n.id === e.fromSkillId);
                    const to = layout.find((n) => n.id === e.toSkillId);
                    if (!from || !to) return null;
                    const isGap = gapSet.has(e.fromSkillId) && gapSet.has(e.toSkillId);
                    return (
                      <line
                        key={e.id}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isGap ? 'var(--c-danger)' : 'var(--c-border-strong)'}
                        strokeWidth={isGap ? 2.5 : 1.5}
                        strokeOpacity={isGap ? 1 : 0.5}
                      />
                    );
                  })}

                  {/* Arrowheads */}
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="var(--c-border-strong)" />
                    </marker>
                  </defs>

                  {/* Nodes */}
                  {layout.map((n) => {
                    const m = masteryMap.get(n.id);
                    const score = m?.masteryScore ?? 0;
                    const isSelected = n.id === selectedId;
                    const isGap = gapSet.has(n.id);
                    const r = isSelected ? 28 : 22;
                    return (
                      <g
                        key={n.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedId(n.id === selectedId ? null : n.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ')
                            setSelectedId(n.id === selectedId ? null : n.id);
                        }}
                      >
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={r}
                          fill={masteryColor(score)}
                          opacity={0.85}
                          stroke={isSelected ? 'var(--c-primary)' : isGap ? 'var(--c-danger)' : 'none'}
                          strokeWidth={isSelected || isGap ? 3 : 0}
                        />
                        <text
                          x={n.x}
                          y={n.y + r + 14}
                          textAnchor="middle"
                          fontSize="10"
                          fill="var(--c-text-subtle)"
                          style={{ pointerEvents: 'none' }}
                        >
                          {n.label.length > 18 ? n.label.slice(0, 16) + '...' : n.label}
                        </text>
                        <text
                          x={n.x}
                          y={n.y + 4}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="600"
                          fill="#fff"
                          style={{ pointerEvents: 'none' }}
                        >
                          {Math.round(score)}%
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Side panel */}
              {selectedNode && (
                <div
                  className="card"
                  style={{
                    width: 300,
                    flexShrink: 0,
                    alignSelf: 'flex-start',
                    position: 'sticky',
                    top: 'var(--sp-4)',
                  }}
                >
                  <SkillDetail
                    node={selectedNode}
                    mastery={selectedMastery ?? null}
                    prereqs={graph.edges
                      .filter((e) => e.toSkillId === selectedNode.id)
                      .map((e) => {
                        const pn = graph.nodes.find((nn) => nn.id === e.fromSkillId);
                        const pm = masteryMap.get(e.fromSkillId);
                        return pn ? { name: pn.name, score: pm?.masteryScore ?? 0 } : null;
                      })
                      .filter(Boolean) as { name: string; score: number }[]}
                    onFindGaps={() => findGaps(selectedNode.id)}
                    gapLoading={gapLoading}
                  />
                </div>
              )}
            </div>
          );
        }}
      </QueryState>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--sp-4)',
          marginTop: 'var(--sp-4)',
          flexWrap: 'wrap',
          fontSize: '0.85rem',
        }}
      >
        {[
          { color: 'var(--c-success)', label: 'Mastered (80%+)' },
          { color: 'var(--c-accent-mark)', label: 'In Progress (40-79%)' },
          { color: 'var(--c-danger)', label: 'Weak (<40%)' },
          { color: 'var(--c-border)', label: 'Not Started' },
        ].map((item) => (
          <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: item.color,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- Detail panel ----------

function SkillDetail({
  node,
  mastery,
  prereqs,
  onFindGaps,
  gapLoading,
}: {
  node: LayoutNode;
  mastery: SkillMasteryDto | null;
  prereqs: { name: string; score: number }[];
  onFindGaps: () => void;
  gapLoading: boolean;
}) {
  const score = mastery?.masteryScore ?? 0;
  const barColor = masteryColor(score);

  return (
    <div className="stack" style={{ gap: 'var(--sp-3)' }}>
      <h3 style={{ margin: 0 }}>{node.label}</h3>
      {node.description && <p className="small muted" style={{ margin: 0 }}>{node.description}</p>}

      {/* Mastery bar */}
      <div>
        <div className="row row--between" style={{ marginBottom: 'var(--sp-1)' }}>
          <span className="small" style={{ fontWeight: 600 }}>
            Mastery
          </span>
          <span className="small" style={{ color: barColor, fontWeight: 600 }}>
            {Math.round(score)}% &mdash; {masteryLabel(score)}
          </span>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: 'var(--c-surface-2)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, Math.round(score))}%`,
              background: barColor,
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-2)' }}>
        <div>
          <div className="small muted">Evidence</div>
          <div style={{ fontWeight: 600 }}>{mastery?.evidenceCount ?? 0}</div>
        </div>
        <div>
          <div className="small muted">Last Practiced</div>
          <div style={{ fontWeight: 600 }}>
            {mastery && mastery.lastPracticedUtc !== '0001-01-01T00:00:00Z'
              ? new Date(mastery.lastPracticedUtc).toLocaleDateString()
              : 'Never'}
          </div>
        </div>
        <div>
          <div className="small muted">Next Review</div>
          <div style={{ fontWeight: 600 }}>
            {mastery?.nextReviewUtc
              ? new Date(mastery.nextReviewUtc).toLocaleDateString()
              : 'N/A'}
          </div>
        </div>
        <div>
          <div className="small muted">Stability</div>
          <div style={{ fontWeight: 600 }}>{mastery?.stability ? mastery.stability.toFixed(1) : '0'}</div>
        </div>
      </div>

      {/* Prerequisites */}
      {prereqs.length > 0 && (
        <div>
          <div className="small" style={{ fontWeight: 600, marginBottom: 'var(--sp-1)' }}>
            Prerequisites
          </div>
          <ul style={{ margin: 0, paddingInlineStart: 'var(--sp-4)' }}>
            {prereqs.map((p) => (
              <li key={p.name} className="small">
                {p.name}{' '}
                <span style={{ color: masteryColor(p.score) }}>({Math.round(p.score)}%)</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="row">
        <Button size="sm" onClick={onFindGaps} loading={gapLoading}>
          Find My Gaps
        </Button>
      </div>
    </div>
  );
}
