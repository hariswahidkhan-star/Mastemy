import { useRef, useState } from 'react';
import { api, downloadFile } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import type { ImportPreview, StudioCourseDto } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Select } from '../../components/ui/Field';
import { Badge, Notice } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { newIdempotencyKey } from '../../lib/format';

/** Preview table for an MCQ import batch. Commit stays disabled while any row has errors (atomic import). */
export function ImportPreviewView({
  preview,
  onCommit,
  onDownloadErrors,
  committing,
}: {
  preview: ImportPreview;
  onCommit: () => void;
  onDownloadErrors: () => void;
  committing?: boolean;
}) {
  const { t } = useI18n();
  const hasErrors = preview.errorCount > 0 || preview.rows.some((r) => !r.ok);
  return (
    <section aria-labelledby="imp-prev">
      <h3 id="imp-prev">{t('import.previewTitle')}</h3>
      <p>
        <Badge tone="success">{t('import.valid', { n: preview.validCount })}</Badge>{' '}
        <Badge tone={hasErrors ? 'danger' : 'neutral'}>
          {t('import.errors', { n: preview.errorCount })}
        </Badge>
      </p>
      {hasErrors ? <Notice tone="warning">{t('import.fixErrors')}</Notice> : null}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t('import.row')}</th>
              <th scope="col">{t('question.externalId')}</th>
              <th scope="col">{t('import.result')}</th>
              <th scope="col">{t('import.problems')}</th>
            </tr>
          </thead>
          <tbody>
            {preview.rows.map((r) => (
              <tr key={`${r.row}-${r.externalId}`} className={r.ok ? undefined : 'row--error'}>
                <td>{r.row}</td>
                <td className="mono">{r.externalId || '—'}</td>
                <td>
                  {r.ok ? (
                    <Badge tone="success">{t('import.ok')}</Badge>
                  ) : (
                    <Badge tone="danger">{t('import.error')}</Badge>
                  )}
                </td>
                <td>
                  {r.errors.length > 0 ? (
                    <ul style={{ margin: 0, paddingInlineStart: '1.2em' }}>
                      {r.errors.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-actions">
        <Button
          onClick={onCommit}
          disabled={hasErrors || preview.validCount === 0}
          loading={committing}
        >
          {t('import.commit', { n: preview.validCount })}
        </Button>
        {hasErrors ? (
          <Button variant="secondary" onClick={onDownloadErrors}>
            {t('import.downloadErrors')}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

export function ImportPanel({ courseId, course }: { courseId: string; course?: StudioCourseDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'create' | 'update'>('create');
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const base = `/api/studio/courses/${courseId}/questions/import`;

  const runPreview = useApiMutation(
    () => {
      const fd = new FormData();
      fd.append('file', file as File);
      fd.append('mode', mode);
      fd.append('idempotencyKey', newIdempotencyKey());
      return api<ImportPreview>(`${base}/preview`, { method: 'POST', body: fd });
    },
    [],
    (p) => setPreview(p),
  );
  const commit = useApiMutation(
    () => api(`${base}/${preview?.batchId}/commit`, { method: 'POST' }),
    [['studio', 'questions', courseId]],
    () => {
      toast.success(t('import.committed', { n: preview?.validCount ?? 0 }));
      setPreview(null);
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
    },
  );

  return (
    <div className="stack">
      <p>{t('import.help')}</p>
      {course?.code ? (
        <Notice tone="info" title={t('import.codesTitle')}>
          <p style={{ margin: 0 }}>
            {t('import.courseCode')}: <span className="mono">{course.code}</span>
          </p>
          {course.modules.length > 0 ? (
            <ul className="small" style={{ marginBlockEnd: 0 }}>
              {course.modules.map((m) => (
                <li key={m.id}>
                  <span className="mono">{m.code}</span> {m.title}
                  {m.lessons.length > 0
                    ? ` — ${m.lessons.map((l) => `${l.code ?? ''} ${l.title}`.trim()).join('; ')}`
                    : ''}
                </li>
              ))}
            </ul>
          ) : null}
        </Notice>
      ) : null}
      <div className="row">
        <Button
          variant="secondary"
          onClick={() =>
            downloadFile('/api/templates/mcq-import.csv', 'mastemy-mcq-import-template.csv').catch(
              (e) => toast.error(errorMessage(e, t)),
            )
          }
        >
          {t('import.template')}
        </Button>
      </div>
      <form
        className="split"
        onSubmit={(e) => {
          e.preventDefault();
          if (file) runPreview.mutate(undefined);
        }}
      >
        <Field label={t('import.file')} hint={t('import.fileHint')} required>
          <Input
            ref={fileRef}
            type="file"
            accept=".csv,.json,text/csv,application/json"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setPreview(null);
            }}
          />
        </Field>
        <Field label={t('import.mode')} hint={t(`import.modeHint.${mode}`)}>
          <Select
            value={mode}
            onChange={(e) => setMode(e.target.value === 'update' ? 'update' : 'create')}
            options={[
              { value: 'create', label: t('import.modeCreate') },
              { value: 'update', label: t('import.modeUpdate') },
            ]}
          />
        </Field>
        <div>
          <Button type="submit" disabled={!file} loading={runPreview.isPending}>
            {t('import.preview')}
          </Button>
        </div>
      </form>
      {runPreview.isError ? (
        <Notice tone="danger">{errorMessage(runPreview.error, t)}</Notice>
      ) : null}
      {commit.isError ? <Notice tone="danger">{errorMessage(commit.error, t)}</Notice> : null}
      {preview ? (
        <ImportPreviewView
          preview={preview}
          committing={commit.isPending}
          onCommit={() => commit.mutate(undefined)}
          onDownloadErrors={() =>
            downloadFile(
              `${base}/${preview.batchId}/errors.csv`,
              `import-errors-${preview.batchId}.csv`,
            ).catch((e) => toast.error(errorMessage(e, t)))
          }
        />
      ) : null}
    </div>
  );
}
