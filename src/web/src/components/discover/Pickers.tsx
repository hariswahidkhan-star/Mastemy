import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, qs } from '../../api/client';
import type { CourseCardDto, Paged, UserDto } from '../../api/types';
import { useI18n } from '../../i18n/I18nProvider';
import { Button } from '../ui/Button';
import { Field, Input } from '../ui/Field';
import { useDebounced } from './SearchCombobox';

export interface PickedCourse {
  id: string;
  title?: string;
}

/** Moves item `index` by `delta` positions; out-of-range moves return the list unchanged. */
export function move<T>(list: T[], index: number, delta: number): T[] {
  const to = index + delta;
  if (index < 0 || index >= list.length || to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(index, 1);
  next.splice(to, 0, item);
  return next;
}

/** Live-course search (public catalogue). Only live courses can appear in pathways and collections. */
export function CourseSearch({
  label,
  exclude = [],
  onPick,
  pickLabel,
}: {
  label: string;
  exclude?: string[];
  onPick: (c: CourseCardDto) => void;
  pickLabel: (title: string) => string;
}) {
  const { t } = useI18n();
  const [q, setQ] = useState('');
  const term = useDebounced(q.trim(), 300);
  const results = useQuery({
    queryKey: ['courses', 'picker', term],
    queryFn: () =>
      api<Paged<CourseCardDto>>(`/api/courses${qs({ q: term, pageSize: 10, sort: 'title' })}`),
    enabled: term.length >= 2,
  });
  const items = (results.data?.items ?? []).filter((c) => !exclude.includes(c.id));
  return (
    <div className="stack">
      <Field label={label} hint={t('discover.admin.pickerHint')}>
        <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} />
      </Field>
      {term.length >= 2 ? (
        results.isPending ? (
          <p className="small muted">{t('common.loading')}</p>
        ) : items.length === 0 ? (
          <p className="small muted">{t('discover.admin.noCourseMatch')}</p>
        ) : (
          <ul className="ordered-picker" aria-label={t('discover.admin.searchResults')}>
            {items.map((c) => (
              <li key={c.id}>
                <span>{c.title}</span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onPick(c)}
                  aria-label={pickLabel(c.title)}
                >
                  {t('discover.admin.add')}
                </Button>
              </li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
}

/** Ordered list of courses with keyboard-operable move up/down/remove buttons and a live-course search. */
export function OrderedCoursePicker({
  value,
  onChange,
}: {
  value: PickedCourse[];
  onChange: (v: PickedCourse[]) => void;
}) {
  const { t } = useI18n();
  const name = (c: PickedCourse) => c.title ?? t('discover.admin.unknownCourse', { id: c.id });
  return (
    <fieldset className="stack" style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="field__label">{t('discover.admin.courses')}</legend>
      {value.length === 0 ? (
        <p className="small muted">{t('discover.admin.noCourses')}</p>
      ) : (
        <ol className="ordered-picker">
          {value.map((c, i) => (
            <li key={c.id}>
              <span>
                {i + 1}. {name(c)}
              </span>
              <Button
                size="sm"
                variant="ghost"
                disabled={i === 0}
                aria-label={t('discover.admin.moveUp', { title: name(c) })}
                onClick={() => onChange(move(value, i, -1))}
              >
                ↑
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={i === value.length - 1}
                aria-label={t('discover.admin.moveDown', { title: name(c) })}
                onClick={() => onChange(move(value, i, 1))}
              >
                ↓
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label={t('discover.admin.remove', { title: name(c) })}
                onClick={() => onChange(value.filter((x) => x.id !== c.id))}
              >
                ✕
              </Button>
            </li>
          ))}
        </ol>
      )}
      <CourseSearch
        label={t('discover.admin.findCourse')}
        exclude={value.map((v) => v.id)}
        onPick={(c) => onChange([...value, { id: c.id, title: c.title }])}
        pickLabel={(title) => t('discover.admin.addNamed', { title })}
      />
    </fieldset>
  );
}

/** Staff user search for owner fields (admin users API). Shows the chosen user's id when not resolved. */
export function UserPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (id: string | null, user?: UserDto) => void;
}) {
  const { t } = useI18n();
  const [q, setQ] = useState('');
  const [chosen, setChosen] = useState<UserDto | null>(null);
  const term = useDebounced(q.trim(), 300);
  const results = useQuery({
    queryKey: ['admin', 'users', 'picker', term],
    queryFn: () => api<Paged<UserDto>>(`/api/admin/users${qs({ q: term, page: 1 })}`),
    enabled: term.length >= 2,
  });
  const current = chosen && chosen.id === value ? chosen.displayName : value;
  return (
    <div className="stack">
      <Field
        label={label}
        hint={
          current ? t('discover.admin.currentUser', { name: current }) : t('discover.admin.noUser')
        }
      >
        <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} />
      </Field>
      {results.isError ? (
        <p className="small muted">{t('discover.admin.userSearchUnavailable')}</p>
      ) : null}
      {term.length >= 2 && results.data ? (
        <ul className="ordered-picker">
          {results.data.items.slice(0, 6).map((u) => (
            <li key={u.id}>
              <span>
                {u.displayName} <span className="small muted">{u.email}</span>
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setChosen(u);
                  setQ('');
                  onChange(u.id, u);
                }}
              >
                {t('discover.admin.choose')}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
      {value ? (
        <div>
          <Button size="sm" variant="ghost" onClick={() => onChange(null)}>
            {t('discover.admin.clearUser')}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
