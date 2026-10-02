import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, qs } from '../../api/client';
import type { AssessmentPickerDto, ImageResourceDto, UserLookupDto } from '../../api/finala';
import type { CourseCardDto, Paged } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Field, Input } from '../../components/ui/Field';
import { Badge, QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';

/** Generic search-then-choose picker: type at least 2 characters, submit, pick from the results. */
function SearchPicker<T extends { id: string }>({
  label,
  hint,
  queryKey,
  search,
  renderItem,
  selected,
  renderSelected,
  onChange,
  minChars = 2,
}: {
  label: string;
  hint?: string;
  queryKey: string;
  search: (q: string) => Promise<T[]>;
  renderItem: (item: T) => ReactNode;
  selected: T | null;
  renderSelected: (item: T) => ReactNode;
  onChange: (item: T | null) => void;
  minChars?: number;
}) {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [term, setTerm] = useState('');
  const listId = useId();
  const results = useQuery({
    queryKey: ['finala', 'picker', queryKey, term],
    queryFn: () => search(term),
    enabled: term.length >= minChars,
  });
  if (selected)
    return (
      <div className="finala-picked" role="group" aria-label={label}>
        <span className="small muted">{label}:</span> {renderSelected(selected)}{' '}
        <Button size="sm" variant="ghost" onClick={() => onChange(null)}>
          {t('finala.picker.change')}
        </Button>
      </div>
    );
  const submit = () => setTerm(text.trim());
  return (
    <div className="stack finala-picker" style={{ gap: 'var(--space-2)' }}>
      <div className="row" style={{ alignItems: 'flex-end' }}>
        <Field label={label} hint={hint ?? t('finala.picker.hint', { n: minChars })}>
          <Input
            type="search"
            value={text}
            aria-controls={listId}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                submit();
              }
            }}
          />
        </Field>
        <Button
          type="button"
          variant="secondary"
          disabled={text.trim().length < minChars}
          onClick={submit}
        >
          {t('finala.picker.search')}
        </Button>
      </div>
      <div id={listId} aria-live="polite">
        {term.length >= minChars ? (
          <QueryState query={results}>
            {(items) =>
              items.length === 0 ? (
                <p className="small muted">{t('finala.picker.none')}</p>
              ) : (
                <ul
                  className="stack"
                  style={{ listStyle: 'none', padding: 0, gap: 'var(--space-1)' }}
                >
                  {items.map((it) => (
                    <li key={it.id}>
                      <button
                        type="button"
                        className="finala-picker__option"
                        onClick={() => onChange(it)}
                      >
                        {renderItem(it)}
                      </button>
                    </li>
                  ))}
                </ul>
              )
            }
          </QueryState>
        ) : null}
      </div>
    </div>
  );
}

/** Staff user picker (GET /api/admin/users/lookup or the Support equivalent); emails are masked. */
export function UserPicker({
  label,
  selected,
  onChange,
  endpoint = '/api/admin/users/lookup',
}: {
  label: string;
  selected: UserLookupDto | null;
  onChange: (u: UserLookupDto | null) => void;
  endpoint?: string;
}) {
  const { t } = useI18n();
  const show = (u: UserLookupDto) => (
    <>
      <strong>{u.displayName}</strong> <span className="small muted">{u.maskedEmail}</span>{' '}
      {u.isSuspended ? <Badge tone="danger">{t('finala.picker.suspended')}</Badge> : null}
    </>
  );
  return (
    <SearchPicker
      label={label}
      hint={t('finala.picker.userHint')}
      queryKey={endpoint}
      search={(q) => api<UserLookupDto[]>(`${endpoint}${qs({ q, limit: 10 })}`)}
      selected={selected}
      onChange={onChange}
      renderItem={show}
      renderSelected={show}
    />
  );
}

/** Staff assessment picker (GET /api/admin/assessments). */
export function AssessmentPicker({
  label,
  selected,
  onChange,
}: {
  label: string;
  selected: AssessmentPickerDto | null;
  onChange: (a: AssessmentPickerDto | null) => void;
}) {
  const { t } = useI18n();
  const show = (a: AssessmentPickerDto) => (
    <>
      <strong>{a.title}</strong>{' '}
      <span className="small muted">
        {a.courseCode} · {a.courseTitle}
      </span>{' '}
      <Badge>{t(`assessment.mode.${a.mode}`)}</Badge>
    </>
  );
  return (
    <SearchPicker
      label={label}
      hint={t('finala.picker.assessmentHint')}
      queryKey="assessments"
      search={(q) => api<AssessmentPickerDto[]>(`/api/admin/assessments${qs({ q, limit: 20 })}`)}
      selected={selected}
      onChange={onChange}
      renderItem={show}
      renderSelected={show}
    />
  );
}

/**
 * Picks a non-premium image resource for a certificate logo: choose a course from the public catalog, then
 * one of its image resources (GET /api/studio/courses/{id}/resources?type=image).
 */
export function ImageResourcePicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string | null) => void;
}) {
  const { t } = useI18n();
  const [course, setCourse] = useState<{ id: string; title: string } | null>(null);
  const images = useQuery({
    queryKey: ['finala', 'images', course?.id],
    queryFn: () =>
      api<ImageResourceDto[]>(
        `/api/studio/courses/${course?.id}/resources${qs({ type: 'image' })}`,
      ),
    enabled: !!course,
  });
  return (
    <fieldset className="stack finala-imagepicker">
      <legend>{t('finala.picker.logo')}</legend>
      {value ? (
        <p className="small">
          {t('finala.picker.logoSelected')} <span className="mono">{value.slice(0, 8)}</span>{' '}
          <Button size="sm" variant="ghost" onClick={() => onChange(null)}>
            {t('finala.picker.logoRemove')}
          </Button>
        </p>
      ) : (
        <p className="small muted">{t('finala.picker.logoNone')}</p>
      )}
      <SearchPicker<{ id: string; title: string }>
        label={t('finala.picker.course')}
        queryKey="courses"
        search={(q) =>
          api<Paged<CourseCardDto>>(`/api/courses${qs({ q, page: 1, pageSize: 10 })}`).then((p) =>
            p.items.map((c) => ({ id: c.id, title: c.title })),
          )
        }
        selected={course}
        onChange={setCourse}
        renderItem={(c) => c.title}
        renderSelected={(c) => <strong>{c.title}</strong>}
      />
      {course ? (
        <QueryState query={images}>
          {(list) => {
            const usable = list.filter((r) => !r.isPremium && r.contentType.startsWith('image/'));
            return usable.length === 0 ? (
              <p className="small muted">{t('finala.picker.noImages')}</p>
            ) : (
              <ul
                className="stack"
                style={{ listStyle: 'none', padding: 0, gap: 'var(--space-1)' }}
              >
                {usable.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      className="finala-picker__option"
                      aria-pressed={value === r.id}
                      onClick={() => onChange(r.id)}
                    >
                      {r.fileName} <span className="small muted">{r.contentType}</span>
                    </button>
                  </li>
                ))}
              </ul>
            );
          }}
        </QueryState>
      ) : null}
    </fieldset>
  );
}
