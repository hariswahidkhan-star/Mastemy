import type { ReactNode } from 'react';
import type { ChangedEntityDto, CourseDiffDto, FieldChangeDto } from '../api/wave2';
import { useI18n } from '../i18n/I18nProvider';
import type { TFunction } from '../i18n/I18nProvider';
import { Badge, Notice } from './ui/misc';

/** Field names the API compares; anything else is shown verbatim. */
export const DIFF_FIELDS = [
  'title',
  'subtitle',
  'description',
  'audience',
  'prerequisites',
  'outcomes',
  'language',
  'level',
  'credentialType',
  'passThresholdPercent',
  'promoVideoId',
  'categories',
  'moduleId',
  'objective',
  'sortOrder',
  'isPreview',
  'videoAssetId',
  'youtubeVideoId',
  'notesMarkdown',
  'premiumNotesMarkdown',
] as const;

export function fieldLabel(field: string, t: TFunction): string {
  return (DIFF_FIELDS as readonly string[]).includes(field) ? t(`diff.field.${field}`) : field;
}

export function diffCounts(d: CourseDiffDto) {
  return {
    course: d.courseFields.length,
    added: d.modulesAdded.length + d.lessonsAdded.length,
    removed: d.modulesRemoved.length + d.lessonsRemoved.length,
    changed: d.modulesChanged.length + d.lessonsChanged.length,
  };
}

function Value({ v }: { v: string | null }) {
  const { t } = useI18n();
  if (v === null || v === '') return <em className="muted">{t('diff.empty')}</em>;
  return <span className="pre-wrap">{v}</span>;
}

function FieldChanges({ changes }: { changes: FieldChangeDto[] }) {
  const { t } = useI18n();
  return (
    <dl className="diff-fields">
      {changes.map((c) => (
        <div key={c.field} className="diff-field">
          <dt>{fieldLabel(c.field, t)}</dt>
          <dd>
            <div className="diff-before">
              <span className="diff-tag">{t('diff.before')}</span> <Value v={c.before} />
            </div>
            <div className="diff-after">
              <span className="diff-tag">{t('diff.after')}</span> <Value v={c.after} />
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Group({ title, children, count }: { title: string; count: number; children: ReactNode }) {
  if (count === 0) return null;
  return (
    <section className="diff-group">
      <h3>
        {title} <Badge>{count}</Badge>
      </h3>
      {children}
    </section>
  );
}

function ChangedList({ items }: { items: ChangedEntityDto[] }) {
  return (
    <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
      {items.map((e) => (
        <li key={e.id} className="card card--flat">
          <strong>{e.title}</strong>
          <FieldChanges changes={e.changes} />
        </li>
      ))}
    </ul>
  );
}

/** Readable rendering of the structured working-copy vs published-snapshot diff. */
export function CourseDiffView({ diff }: { diff: CourseDiffDto }) {
  const { t } = useI18n();
  const counts = diffCounts(diff);
  return (
    <div className="stack diff">
      <p className="small muted">
        {diff.baseVersion === null
          ? t('diff.neverPublished')
          : t('diff.againstVersion', { v: diff.baseVersion })}
      </p>
      {!diff.hasChanges ? (
        <Notice tone="success">{t('diff.noChanges')}</Notice>
      ) : (
        <p className="row">
          <Badge tone="info">{t('diff.countCourse', { n: counts.course })}</Badge>
          <Badge tone="success">{t('diff.countAdded', { n: counts.added })}</Badge>
          <Badge tone="danger">{t('diff.countRemoved', { n: counts.removed })}</Badge>
          <Badge tone="warning">{t('diff.countChanged', { n: counts.changed })}</Badge>
        </p>
      )}
      <Group title={t('diff.courseFields')} count={diff.courseFields.length}>
        <FieldChanges changes={diff.courseFields} />
      </Group>
      <Group title={t('diff.modulesAdded')} count={diff.modulesAdded.length}>
        <ul className="diff-added">
          {diff.modulesAdded.map((m) => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      </Group>
      <Group title={t('diff.modulesRemoved')} count={diff.modulesRemoved.length}>
        <ul className="diff-removed">
          {diff.modulesRemoved.map((m) => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      </Group>
      <Group title={t('diff.modulesChanged')} count={diff.modulesChanged.length}>
        <ChangedList items={diff.modulesChanged} />
      </Group>
      <Group title={t('diff.lessonsAdded')} count={diff.lessonsAdded.length}>
        <ul className="diff-added">
          {diff.lessonsAdded.map((l) => (
            <li key={l.id}>{l.title}</li>
          ))}
        </ul>
      </Group>
      <Group title={t('diff.lessonsRemoved')} count={diff.lessonsRemoved.length}>
        <ul className="diff-removed">
          {diff.lessonsRemoved.map((l) => (
            <li key={l.id}>{l.title}</li>
          ))}
        </ul>
      </Group>
      <Group title={t('diff.lessonsChanged')} count={diff.lessonsChanged.length}>
        <ChangedList items={diff.lessonsChanged} />
      </Group>
    </div>
  );
}
