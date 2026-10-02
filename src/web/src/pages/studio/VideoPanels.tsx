import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from '../../lib/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';
import { keys, useApiMutation, useChannels } from '../../api/hooks';
import type { StudioLessonDto, UploadSessionDto, VideoAssetDto } from '../../api/types';
import { Duration } from '../../components/Duration';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { errorMessage } from '../../components/ui/ErrorState';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice, QueryStatus, StatusBadge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { fileFingerprint, recallUpload, rememberUpload, sendChunks } from '../../lib/upload';
import { youtubeWatchUrl } from '../../lib/youtube';

export function VideoStatusCard({ video, courseId }: { video: VideoAssetDto; courseId: string }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const recheck = useApiMutation(
    () => api(`/api/studio/videos/${video.id}/recheck`, { method: 'POST' }),
    [keys.studioCourse(courseId)],
    () => toast.success(t('video.rechecked')),
  );
  return (
    <div className="card card--flat">
      <div className="row row--between">
        <h3 style={{ margin: 0 }}>{video.title || video.youTubeVideoId}</h3>
        <StatusBadge status={video.status} />
      </div>
      {video.statusReason ? (
        <Notice
          tone={video.status === 'Ready' ? 'info' : 'warning'}
          title={t('video.statusReason')}
        >
          {video.statusReason}
        </Notice>
      ) : null}
      <dl className="kv small">
        <dt>{t('playlist.videoId')}</dt>
        <dd className="mono">
          <a href={youtubeWatchUrl(video.youTubeVideoId)} target="_blank" rel="noopener noreferrer">
            {video.youTubeVideoId}
          </a>
        </dd>
        <dt>{t('course.duration')}</dt>
        <dd>
          <Duration seconds={video.durationSeconds} />
        </dd>
        {video.privacyStatus ? (
          <>
            <dt>{t('video.privacy')}</dt>
            <dd>{video.privacyStatus}</dd>
          </>
        ) : null}
        {video.embeddable != null ? (
          <>
            <dt>{t('video.embeddable')}</dt>
            <dd>{video.embeddable ? t('common.yes') : t('common.no')}</dd>
          </>
        ) : null}
        {video.lastCheckedAt ? (
          <>
            <dt>{t('video.lastChecked')}</dt>
            <dd>{fmtDate(video.lastCheckedAt)}</dd>
          </>
        ) : null}
      </dl>
      <Button
        size="sm"
        variant="secondary"
        style={{ marginBlockStart: 'var(--space-3)' }}
        loading={recheck.isPending}
        onClick={() => recheck.mutate(undefined)}
      >
        {t('video.recheck')}
      </Button>
      {recheck.isError ? <Notice tone="danger">{errorMessage(recheck.error, t)}</Notice> : null}
    </div>
  );
}

export function VideoLinkForm({ lesson, courseId }: { lesson: StudioLessonDto; courseId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const channels = useChannels();
  const s = useMemo(
    () =>
      z.object({
        url: z.string().trim().min(5, t('validation.youtubeUrl')),
        channelId: z.string().min(1, t('video.channelRequired')),
        rightsDeclared: z.boolean().refine((v) => v, t('video.rightsRequired')),
        title: z.string().trim().max(200).optional(),
        durationMinutes: z
          .union([z.string(), z.number()])
          .transform((v) => (v === '' ? null : Number(v)))
          .refine((v) => v === null || (Number.isFinite(v) && v > 0), t('validation.positive')),
      }),
    [t],
  );
  type In = z.input<typeof s>;
  type Out = z.output<typeof s>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(s),
    defaultValues: {
      url: '',
      channelId: '',
      rightsDeclared: false,
      title: '',
      durationMinutes: '',
    },
  });
  const rightsText = t('video.rightsText');
  const link = useApiMutation(
    (v: Out) =>
      api<VideoAssetDto>(`/api/studio/lessons/${lesson.id}/video`, {
        method: 'POST',
        body: {
          url: v.url,
          channelId: v.channelId,
          rightsDeclared: v.rightsDeclared,
          rightsDeclarationText: rightsText,
          title: v.title || undefined,
          durationSeconds: v.durationMinutes ? Math.round(v.durationMinutes * 60) : undefined,
        },
      }),
    [keys.studioCourse(courseId)],
    (video) => toast.success(t('video.linked', { status: t(`status.${video.status}`) })),
  );
  return (
    <form onSubmit={handleSubmit((v) => link.mutate(v))} noValidate>
      <p className="small muted">{t('video.linkHelp')}</p>
      <Field label={t('video.url')} hint={t('video.urlHint')} error={errors.url?.message} required>
        <Input type="url" inputMode="url" {...register('url')} />
      </Field>
      <Field
        label={t('video.channel')}
        hint={t('video.channelHint')}
        error={errors.channelId?.message}
        required
      >
        <Select
          {...register('channelId')}
          placeholder={t('video.chooseChannel')}
          options={(channels.data ?? []).map((c) => ({
            value: c.id,
            label: `${c.title} (${t(`channelMode.${c.mode}`)})`,
          }))}
        />
      </Field>
      {channels.isSuccess && channels.data.length === 0 ? (
        <Notice tone="warning">{t('video.noChannels')}</Notice>
      ) : null}
      <details style={{ marginBlockEnd: 'var(--space-4)' }}>
        <summary>{t('video.manualMetadata')}</summary>
        <p className="small muted">{t('video.manualHint')}</p>
        <div className="split">
          <Field label={t('video.manualTitle')}>
            <Input {...register('title')} />
          </Field>
          <Field label={t('video.manualDuration')} error={errors.durationMinutes?.message}>
            <Input type="number" min="0" step="0.1" {...register('durationMinutes')} />
          </Field>
        </div>
      </details>
      <Checkbox
        label={rightsText}
        error={errors.rightsDeclared?.message}
        {...register('rightsDeclared')}
      />
      {link.isError ? <Notice tone="danger">{errorMessage(link.error, t)}</Notice> : null}
      <Button type="submit" loading={link.isPending}>
        {lesson.video ? t('video.replace') : t('video.link')}
      </Button>
    </form>
  );
}

type Phase = 'form' | 'hashing' | 'waiting' | 'transferring' | 'done' | 'disabled';

export function UploadPanel({ lesson, courseId }: { lesson: StudioLessonDto; courseId: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const channels = useChannels();
  const stored = useMemo(() => recallUpload(lesson.id), [lesson.id]);
  const [phase, setPhase] = useState<Phase>(stored ? 'waiting' : 'form');
  const [sessionId, setSessionId] = useState<string | null>(stored?.sessionId ?? null);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState({
    channelId: '',
    title: lesson.title,
    description: '',
    privacyStatus: 'unlisted',
    notifySubscribers: false,
    syntheticMediaDisclosed: false,
  });
  const [progress, setProgress] = useState<{ sent: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const qc = useQueryClient();

  const status = useQuery({
    queryKey: ['upload', sessionId],
    queryFn: () => api<UploadSessionDto>(`/api/youtube/uploads/${sessionId}`),
    enabled: !!sessionId && phase === 'waiting',
    refetchInterval: 15_000,
  });

  useEffect(() => () => abortRef.current?.abort(), []);

  const create = async () => {
    if (!file) return;
    setError(null);
    setPhase('hashing');
    try {
      const fingerprint = await fileFingerprint(file);
      const session = await api<UploadSessionDto>('/api/youtube/uploads', {
        method: 'POST',
        body: {
          ...meta,
          lessonId: lesson.id,
          fileName: file.name,
          fileSize: file.size,
          fileFingerprint: fingerprint,
        },
      });
      rememberUpload(lesson.id, {
        sessionId: session.id,
        fileName: file.name,
        fileSize: file.size,
        fingerprint,
      });
      setSessionId(session.id);
      setPhase('waiting');
    } catch (e) {
      if (e instanceof ApiError && (e.is('uploads_disabled') || e.status === 403)) {
        setPhase('disabled');
        return;
      }
      setError(errorMessage(e, t));
      setPhase('form');
    }
  };

  const transfer = async () => {
    if (!file || !sessionId) return;
    setError(null);
    try {
      const fingerprint = await fileFingerprint(file);
      if (stored && (stored.fingerprint !== fingerprint || stored.fileSize !== file.size)) {
        setError(t('upload.wrongFile', { name: stored.fileName }));
        return;
      }
      const resumed = await api<UploadSessionDto>(`/api/youtube/uploads/${sessionId}/resume`, {
        method: 'POST',
        body: { fileFingerprint: fingerprint },
      });
      setPhase('transferring');
      const controller = new AbortController();
      abortRef.current = controller;
      setProgress({ sent: resumed.confirmedOffset, total: file.size });
      await sendChunks(sessionId, file, resumed.confirmedOffset, setProgress, controller.signal);
      rememberUpload(lesson.id, null);
      setPhase('done');
      void qc.invalidateQueries({ queryKey: keys.studioCourse(courseId) });
      toast.success(t('upload.transferred'));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      setError(errorMessage(e, t));
      setPhase('waiting');
    }
  };

  const cancel = async () => {
    abortRef.current?.abort();
    try {
      if (sessionId) await api(`/api/youtube/uploads/${sessionId}`, { method: 'DELETE' });
    } catch (e) {
      toast.error(errorMessage(e, t));
    }
    rememberUpload(lesson.id, null);
    setSessionId(null);
    setProgress(null);
    setConfirmCancel(false);
    setPhase('form');
  };

  if (phase === 'disabled') {
    return (
      <Notice tone="info" title={t('upload.disabledTitle')}>
        {t('upload.disabled')}
      </Notice>
    );
  }

  const st = status.data?.status;
  const canTransfer = st === 'Approved' || st === 'AwaitingSourceFile' || st === 'Uploading';

  return (
    <div className="stack">
      <Notice tone="info">{t('upload.explain')}</Notice>
      {error ? <Notice tone="danger">{error}</Notice> : null}
      {phase === 'form' || phase === 'hashing' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void create();
          }}
        >
          <Field label={t('upload.file')} hint={t('upload.fileHint')} required>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </Field>
          <Field label={t('video.channel')} required>
            <Select
              value={meta.channelId}
              onChange={(e) => setMeta({ ...meta, channelId: e.target.value })}
              placeholder={t('video.chooseChannel')}
              options={(channels.data ?? []).map((c) => ({ value: c.id, label: c.title }))}
            />
          </Field>
          <Field label={t('upload.ytTitle')} required>
            <Input
              value={meta.title}
              maxLength={100}
              onChange={(e) => setMeta({ ...meta, title: e.target.value })}
            />
          </Field>
          <Field label={t('upload.ytDescription')}>
            <Textarea
              value={meta.description}
              maxLength={5000}
              onChange={(e) => setMeta({ ...meta, description: e.target.value })}
            />
          </Field>
          <Field label={t('upload.privacy')} hint={t('upload.privacyHint')}>
            <Select
              value={meta.privacyStatus}
              onChange={(e) => setMeta({ ...meta, privacyStatus: e.target.value })}
              options={['unlisted', 'public', 'private'].map((p) => ({
                value: p,
                label: t(`upload.privacy_${p}`),
              }))}
            />
          </Field>
          <Checkbox
            label={t('upload.notify')}
            checked={meta.notifySubscribers}
            onChange={(e) => setMeta({ ...meta, notifySubscribers: e.target.checked })}
          />
          <Checkbox
            label={t('upload.synthetic')}
            hint={t('upload.syntheticHint')}
            checked={meta.syntheticMediaDisclosed}
            onChange={(e) => setMeta({ ...meta, syntheticMediaDisclosed: e.target.checked })}
          />
          <Button
            type="submit"
            loading={phase === 'hashing'}
            disabled={!file || !meta.channelId || !meta.title.trim()}
          >
            {t('upload.request')}
          </Button>
        </form>
      ) : null}
      {phase === 'waiting' && sessionId ? (
        <div className="card card--flat">
          <p>
            {t('upload.session')}: {st ? <StatusBadge status={st} /> : t('common.loading')}
          </p>
          <QueryStatus query={status} />
          {status.data?.failureReason ? (
            <Notice tone="danger">{status.data.failureReason}</Notice>
          ) : null}
          {st === 'AwaitingApproval' ? (
            <p className="small">{t('upload.awaitingApproval')}</p>
          ) : null}
          {st === 'Expired' ? <p className="small">{t('upload.expired')}</p> : null}
          {canTransfer ? (
            <>
              <p className="small">
                {stored
                  ? t('upload.reselect', { name: stored.fileName })
                  : t('upload.selectToStart')}
              </p>
              {!file ? (
                <Field label={t('upload.file')}>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                </Field>
              ) : null}
              <Button onClick={() => void transfer()} disabled={!file}>
                {st === 'Uploading' ? t('upload.resume') : t('upload.start')}
              </Button>
            </>
          ) : null}
          <div className="row" style={{ marginBlockStart: 'var(--space-3)' }}>
            <Button variant="ghost" size="sm" onClick={() => void status.refetch()}>
              {t('upload.refresh')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmCancel(true)}>
              {t('upload.cancel')}
            </Button>
          </div>
        </div>
      ) : null}
      {phase === 'transferring' && progress ? (
        <div className="card card--flat">
          <label htmlFor="up-prog">{t('upload.transferring')}</label>
          <progress id="up-prog" className="progress" max={progress.total} value={progress.sent} />
          <p className="small">
            {t('upload.percent', {
              n: Math.floor((progress.sent / Math.max(1, progress.total)) * 100),
            })}
          </p>
          <p className="small muted">{t('upload.keepOpen')}</p>
          <Button variant="secondary" size="sm" onClick={() => setConfirmCancel(true)}>
            {t('upload.cancel')}
          </Button>
        </div>
      ) : null}
      {phase === 'done' ? <Notice tone="success">{t('upload.doneBody')}</Notice> : null}
      <ConfirmDialog
        open={confirmCancel}
        danger
        title={t('upload.cancelTitle')}
        body={t('upload.cancelBody')}
        confirmLabel={t('upload.cancel')}
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => void cancel()}
      />
    </div>
  );
}
