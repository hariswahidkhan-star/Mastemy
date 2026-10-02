import { useMemo, useState } from 'react';
import type { RefObject } from 'react';
import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError, downloadFile, qs } from '../../api/client';
import { useApiMutation, useCourse } from '../../api/hooks';
import { formatBytes, ISSUE_CATEGORIES, w2keys } from '../../api/wave2';
import type {
  AnnouncementDto,
  CaptionTrackDto,
  EngagementPage,
  LearnerResourceDto,
  TranscriptMatch,
} from '../../api/wave2';
import { useAuth } from '../../auth/AuthProvider';
import type { PlayerHandle } from '../../components/YouTubePlayer';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, Pagination, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { formatTimestamp } from '../../lib/format';
import { usePageMeta } from '../../lib/seo';
import { ReportContentButton } from '../workspace/Trust';

// ---------- Announcements ----------

export function AnnouncementsList({ courseId }: { courseId: string }) {
  const { t, fmtDate } = useI18n();
  const [page, setPage] = useState(1);
  const list = useQuery({
    queryKey: [...w2keys.announcements(courseId), page],
    queryFn: () =>
      api<EngagementPage<AnnouncementDto>>(
        `/api/courses/${courseId}/announcements${qs({ page, pageSize: 10 })}`,
      ),
    retry: false,
  });
  if (list.isError && list.error instanceof ApiError && list.error.status === 403)
    return <p className="muted">{t('announcements.enrollToSee')}</p>;
  return (
    <QueryState query={list}>
      {(data) =>
        data.items.length === 0 ? (
          <p className="muted">{t('announcements.none')}</p>
        ) : (
          <>
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {data.items.map((a) => (
                <li key={a.id} className="card card--flat">
                  <h3 style={{ margin: 0 }}>{a.title}</h3>
                  <p className="small muted" style={{ marginBlock: 'var(--space-1)' }}>
                    {a.authorName} · {fmtDate(a.createdAt)}
                  </p>
                  <p className="pre-wrap" style={{ margin: 0 }}>
                    {a.body}
                  </p>
                </li>
              ))}
            </ul>
            <Pagination
              page={data.page}
              pageSize={data.pageSize}
              total={data.total}
              onPage={setPage}
            />
          </>
        )
      }
    </QueryState>
  );
}

/** /courses/:slug/announcements (target of announcement notifications). */
export function CourseAnnouncementsPage() {
  const { slug = '' } = useParams();
  const { t } = useI18n();
  const course = useCourse(slug);
  usePageMeta(t('announcements.title'), undefined, { noindex: true });
  return (
    <div className="container page">
      <QueryState query={course}>
        {(c) => (
          <>
            <nav aria-label={t('common.breadcrumb')} className="small muted">
              <Link to={`/courses/${c.slug}`}>{c.title}</Link> / {t('announcements.title')}
            </nav>
            <PageHeader title={t('announcements.title')} subtitle={c.title} />
            <AnnouncementsList courseId={c.id} />
          </>
        )}
      </QueryState>
    </div>
  );
}

// ---------- Resources ----------

export function LessonResources({
  lessonId,
  courseSlug,
}: {
  lessonId: string;
  courseSlug: string;
}) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const list = useQuery({
    queryKey: w2keys.lessonResources(lessonId),
    queryFn: () => api<LearnerResourceDto[]>(`/api/learn/lessons/${lessonId}/resources`),
  });
  const download = (r: LearnerResourceDto) => {
    setBusy(r.id);
    downloadFile(r.downloadUrl ?? `/api/learn/resources/${r.id}/download`, r.fileName)
      .catch((e) => {
        if (e instanceof ApiError && e.is('premium_required'))
          toast.error(t('resources.premiumRequired'));
        else toast.error(errorMessage(e, t));
      })
      .finally(() => setBusy(null));
  };
  return (
    <QueryState query={list}>
      {(items) => {
        const files = items.filter((r) => r.kind !== 'Caption');
        if (files.length === 0) return <p className="muted">{t('resources.none')}</p>;
        const anyLocked = files.some((r) => r.locked);
        return (
          <div className="stack">
            <ul className="resource-list">
              {files.map((r) => (
                <li key={r.id} className="resource-item">
                  <div>
                    <strong>{r.fileName}</strong>{' '}
                    {r.isPremium ? <Badge tone="accent">{t('resources.premium')}</Badge> : null}
                    <div className="small muted">
                      {formatBytes(r.sizeBytes, lang)} · {t('resources.version', { n: r.version })}
                    </div>
                  </div>
                  {r.locked ? (
                    <span className="small">
                      <span aria-hidden="true">🔒 </span>
                      {t('resources.locked')}
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      loading={busy === r.id}
                      onClick={() => download(r)}
                      aria-label={t('resources.downloadNamed', { name: r.fileName })}
                    >
                      {t('resources.download')}
                    </Button>
                  )}
                  <ReportContentButton targetType="Resource" targetId={r.id} />
                </li>
              ))}
            </ul>
            {anyLocked ? (
              <Notice tone="info" title={t('resources.lockedTitle')}>
                <p style={{ marginBlockStart: 0 }}>{t('resources.lockedBody')}</p>
                <ButtonLink size="sm" to={`/courses/${courseSlug}`}>
                  {t('learn.seePackages')}
                </ButtonLink>
              </Notice>
            ) : null}
          </div>
        );
      }}
    </QueryState>
  );
}

// ---------- Transcript ----------

export interface Cue {
  start: number;
  end: number;
  text: string;
}

function parseTime(s: string): number | null {
  const m = /^(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{1,3})$/.exec(s.trim());
  if (!m) return null;
  const [, h, mm, ss, ms] = m;
  return Number(h ?? 0) * 3600 + Number(mm) * 60 + Number(ss) + Number(ms.padEnd(3, '0')) / 1000;
}

/** Minimal WebVTT cue parser (the API converts SRT to VTT). Tags are stripped; text stays plain. */
export function parseVtt(vtt: string): Cue[] {
  const cues: Cue[] = [];
  const blocks = vtt.replace(/\r\n?/g, '\n').split(/\n{2,}/);
  for (const block of blocks) {
    const lines = block.split('\n').filter((l) => l.length > 0);
    const idx = lines.findIndex((l) => l.includes('-->'));
    if (idx < 0) continue;
    const [a, rest] = lines[idx].split('-->');
    const start = parseTime(a);
    const end = parseTime((rest ?? '').trim().split(/\s+/)[0] ?? '');
    if (start === null || end === null) continue;
    const text = lines
      .slice(idx + 1)
      .join(' ')
      .replace(/<[^>]*>/g, '')
      .trim();
    if (text) cues.push({ start, end, text });
  }
  return cues;
}

export function TranscriptPanel({
  lessonId,
  player,
}: {
  lessonId: string;
  player: RefObject<PlayerHandle | null>;
}) {
  const { t } = useI18n();
  const tracks = useQuery({
    queryKey: w2keys.captions(lessonId),
    queryFn: () => api<CaptionTrackDto[]>(`/api/learn/lessons/${lessonId}/captions`),
  });
  const [chosen, setChosen] = useState<string | null>(null);
  const track = tracks.data?.find((c) => c.id === chosen) ?? tracks.data?.[0];
  const vtt = useQuery({
    queryKey: ['learn', 'vtt', track?.id, track?.version],
    queryFn: () =>
      api<string>(`/api/learn/captions/${track!.id}/vtt`, { headers: { Accept: 'text/vtt' } }),
    enabled: !!track,
  });
  const cues = useMemo(() => (vtt.data ? parseVtt(String(vtt.data)) : []), [vtt.data]);
  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const matches = useQuery({
    queryKey: ['learn', 'transcript', lessonId, search, track?.language],
    queryFn: () =>
      api<TranscriptMatch[]>(
        `/api/learn/lessons/${lessonId}/transcript${qs({ q: search, language: track?.language })}`,
      ),
    enabled: search.length >= 2,
  });
  const seek = (s: number) => player.current?.seekTo(s);

  return (
    <QueryState query={tracks}>
      {(list) =>
        list.length === 0 ? (
          <p className="muted">{t('transcript.none')}</p>
        ) : (
          <div className="stack">
            <div className="row">
              {list.length > 1 ? (
                <Field label={t('transcript.language')}>
                  <Select
                    value={track?.id ?? ''}
                    onChange={(e) => setChosen(e.target.value)}
                    options={list.map((c) => ({ value: c.id, label: c.language }))}
                  />
                </Field>
              ) : (
                <p className="small muted">
                  {t('transcript.languageIs', { lang: track?.language ?? '' })}
                </p>
              )}
              <form
                role="search"
                className="row grow"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearch(q.trim());
                }}
              >
                <Field
                  label={t('transcript.search')}
                  hint={t('transcript.searchHint')}
                  className="grow"
                >
                  <Input
                    type="search"
                    value={q}
                    minLength={2}
                    maxLength={200}
                    onChange={(e) => {
                      setQ(e.target.value);
                      if (!e.target.value.trim()) setSearch('');
                    }}
                  />
                </Field>
                <Button type="submit" variant="secondary" disabled={q.trim().length < 2}>
                  {t('courses.searchButton')}
                </Button>
              </form>
            </div>
            {search.length >= 2 ? (
              <QueryState query={matches}>
                {(m) =>
                  m.length === 0 ? (
                    <p className="muted">{t('transcript.noMatches')}</p>
                  ) : (
                    <ol className="cue-list" aria-label={t('transcript.results')}>
                      {m.map((c, i) => (
                        <li key={`${c.captionId}-${c.startSeconds}-${i}`}>
                          <button
                            type="button"
                            className="cue"
                            onClick={() => seek(c.startSeconds)}
                          >
                            <span className="mono">{formatTimestamp(c.startSeconds)}</span>
                            <span>{c.text}</span>
                          </button>
                        </li>
                      ))}
                    </ol>
                  )
                }
              </QueryState>
            ) : (
              <QueryState query={vtt}>
                {() =>
                  cues.length === 0 ? (
                    <p className="muted">{t('transcript.empty')}</p>
                  ) : (
                    <ol className="cue-list" aria-label={t('transcript.title')}>
                      {cues.map((c, i) => (
                        <li key={`${c.start}-${i}`}>
                          <button
                            type="button"
                            className="cue"
                            onClick={() => seek(c.start)}
                            aria-label={t('transcript.seek', {
                              time: formatTimestamp(c.start),
                              text: c.text,
                            })}
                          >
                            <span className="mono">{formatTimestamp(c.start)}</span>
                            <span>{c.text}</span>
                          </button>
                        </li>
                      ))}
                    </ol>
                  )
                }
              </QueryState>
            )}
          </div>
        )
      }
    </QueryState>
  );
}

// ---------- Report an issue ----------

export function ReportIssueButton({ courseId, lessonId }: { courseId: string; lessonId?: string }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>('ContentError');
  const [body, setBody] = useState('');
  const [invalid, setInvalid] = useState(false);
  const send = useApiMutation(
    () =>
      api(`/api/courses/${courseId}/issues`, {
        method: 'POST',
        body: { lessonId: lessonId ?? null, category, body: body.trim() },
      }),
    [],
    () => {
      setOpen(false);
      setBody('');
      toast.success(t('issues.sent'));
    },
  );
  if (!user) return null;
  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
        {t('issues.report')}
      </Button>
      <Dialog
        open={open}
        title={t('issues.report')}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              loading={send.isPending}
              onClick={() => {
                if (body.trim().length < 5) {
                  setInvalid(true);
                  return;
                }
                setInvalid(false);
                send.mutate(undefined);
              }}
            >
              {t('issues.send')}
            </Button>
          </>
        }
      >
        <p className="small">{t('issues.intro')}</p>
        <Field label={t('issues.category')}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={ISSUE_CATEGORIES.map((c) => ({ value: c, label: t(`issues.cat.${c}`) }))}
          />
        </Field>
        <Field
          label={t('issues.body')}
          required
          error={invalid ? t('issues.bodyTooShort') : undefined}
        >
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={2000} />
        </Field>
        {send.isError ? <Notice tone="danger">{errorMessage(send.error, t)}</Notice> : null}
      </Dialog>
    </>
  );
}

export function NotFoundInline() {
  const { t } = useI18n();
  return <EmptyState title={t('errors.notFound')} />;
}
