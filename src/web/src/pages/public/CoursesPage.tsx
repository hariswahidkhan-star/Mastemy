import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { useCategories } from '../../api/hooks';
import {
  DURATIONS,
  FRESHNESS_DAYS,
  MIN_RATINGS,
  SORTS,
  activeFilterCount,
  readCatalogQuery,
  useCatalogSearch,
  useInstructors,
  usePublicCertifications,
  usePublicSkills,
  withFilter,
  loc,
} from '../../api/discover';
import type { CatalogQuery, SearchParamKey } from '../../api/discover';
import { COURSE_LEVELS } from '../../api/types';
import { CourseCard } from '../../components/CourseCard';
import { SearchCombobox } from '../../components/discover/SearchCombobox';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Input, Select } from '../../components/ui/Field';
import { PageHeader, Pagination, QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import '../../styles/discover.css';

/** Price inputs commit on blur/Enter so typing does not fire a request per keystroke. */
function PriceInput({
  label,
  value,
  onCommit,
}: {
  label: string;
  value: string;
  onCommit: (v: string) => void;
}) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);
  return (
    <Field label={label}>
      <Input
        type="number"
        min={0}
        step="0.01"
        inputMode="decimal"
        value={v}
        onChange={(e) => setV(e.target.value)}
        onBlur={() => v !== value && onCommit(v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onCommit(v);
          }
        }}
      />
    </Field>
  );
}

function CourseBrowser({ fixedCategory }: { fixedCategory?: string }) {
  const { t, lang } = useI18n();
  const [params, setParams] = useSearchParams();
  const categories = useCategories();
  const skills = usePublicSkills();
  const certs = usePublicCertifications();
  const instructors = useInstructors({ page: 1, pageSize: 50 });
  const query: CatalogQuery = readCatalogQuery(params, fixedCategory);
  const courses = useCatalogSearch(query);
  const update = (key: SearchParamKey, value: string) =>
    setParams(withFilter(params, key, value), { replace: key === 'q' });
  const filters = activeFilterCount(query, fixedCategory);

  const instructorOptions = (instructors.data?.items ?? []).map((i) => ({
    value: i.id,
    label: i.displayName,
  }));
  if (query.instructor && !instructorOptions.some((o) => o.value === query.instructor))
    instructorOptions.unshift({ value: query.instructor, label: t('discover.filters.selected') });
  const skillOptions = (skills.data ?? []).map((s) => ({
    value: s.code,
    label: loc(lang, s.nameEn, s.nameAr),
  }));
  if (query.skill && !skillOptions.some((o) => o.value === query.skill))
    skillOptions.unshift({ value: query.skill, label: query.skill });
  const certOptions = (certs.data ?? []).map((c) => ({
    value: c.slug,
    label: c.examCode ? `${c.title} (${c.examCode})` : c.title,
  }));
  if (query.certification && !certOptions.some((o) => o.value === query.certification))
    certOptions.unshift({ value: query.certification, label: query.certification });

  const clearFilters = () => {
    const next = new URLSearchParams();
    for (const k of ['q', 'sort'] as const) if (query[k]) next.set(k, query[k]!);
    setParams(next);
  };

  return (
    <>
      <div className="card card--flat stack" style={{ display: 'grid', gap: 'var(--space-4)' }}>
        <SearchCombobox
          label={t('courses.search')}
          initial={query.q ?? ''}
          placeholder={t('home.searchPlaceholder')}
          onSubmit={(q) => update('q', q)}
        />
        <div className="dfilters" role="group" aria-label={t('discover.filters.label')}>
          {!fixedCategory ? (
            <Field label={t('courses.category')}>
              <Select
                value={query.category ?? ''}
                onChange={(e) => update('category', e.target.value)}
                placeholder={t('courses.allCategories')}
                options={(categories.data ?? []).map((c) => ({
                  value: c.slug,
                  label: (c.parentId ? '— ' : '') + loc(lang, c.nameEn, c.nameAr),
                }))}
              />
            </Field>
          ) : null}
          <Field label={t('courses.level')}>
            <Select
              value={query.level ?? ''}
              onChange={(e) => update('level', e.target.value)}
              placeholder={t('courses.allLevels')}
              options={COURSE_LEVELS.map((l) => ({ value: l, label: t(`level.${l}`) }))}
            />
          </Field>
          <Field label={t('courses.language')}>
            <Select
              value={query.language ?? ''}
              onChange={(e) => update('language', e.target.value)}
              placeholder={t('courses.allLanguages')}
              options={[
                { value: 'en', label: t('language.en') },
                { value: 'ar', label: t('language.ar') },
              ]}
            />
          </Field>
          <Field label={t('discover.filters.instructor')}>
            <Select
              value={query.instructor ?? ''}
              onChange={(e) => update('instructor', e.target.value)}
              placeholder={t('discover.filters.any')}
              options={instructorOptions}
            />
          </Field>
          <Field label={t('discover.filters.duration')}>
            <Select
              value={query.duration ?? ''}
              onChange={(e) => update('duration', e.target.value)}
              placeholder={t('discover.filters.any')}
              options={DURATIONS.map((d) => ({ value: d, label: t(`discover.duration.${d}`) }))}
            />
          </Field>
          <Field label={t('discover.filters.freshness')}>
            <Select
              value={query.updatedWithinDays ?? ''}
              onChange={(e) => update('updatedWithinDays', e.target.value)}
              placeholder={t('discover.filters.any')}
              options={FRESHNESS_DAYS.map((d) => ({
                value: String(d),
                label: t('discover.filters.withinDays', { n: d }),
              }))}
            />
          </Field>
          <Field label={t('discover.filters.rating')}>
            <Select
              value={query.minRating ?? ''}
              onChange={(e) => update('minRating', e.target.value)}
              placeholder={t('discover.filters.any')}
              options={MIN_RATINGS.map((r) => ({
                value: r,
                label: t('discover.filters.ratingAtLeast', { n: r }),
              }))}
            />
          </Field>
          <Field label={t('discover.filters.skill')}>
            <Select
              value={query.skill ?? ''}
              onChange={(e) => update('skill', e.target.value)}
              placeholder={t('discover.filters.any')}
              options={skillOptions}
            />
          </Field>
          <Field label={t('discover.filters.certification')}>
            <Select
              value={query.certification ?? ''}
              onChange={(e) => update('certification', e.target.value)}
              placeholder={t('discover.filters.any')}
              options={certOptions}
            />
          </Field>
          <div className="dfilters__price">
            <PriceInput
              label={t('discover.filters.minPrice')}
              value={query.minPrice ?? ''}
              onCommit={(v) => update('minPrice', v)}
            />
            <PriceInput
              label={t('discover.filters.maxPrice')}
              value={query.maxPrice ?? ''}
              onCommit={(v) => update('maxPrice', v)}
            />
          </div>
          <Field label={t('courses.sort')}>
            <Select
              value={query.sort ?? 'newest'}
              onChange={(e) => update('sort', e.target.value === 'newest' ? '' : e.target.value)}
              options={SORTS.map((s) => ({ value: s, label: t(`courses.sort_${s}`) }))}
            />
          </Field>
        </div>
        {query.minPrice || query.maxPrice ? (
          <p className="small muted" style={{ margin: 0 }}>
            {t('discover.filters.priceNote')}
          </p>
        ) : null}
        {filters > 0 ? (
          <div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              {t('discover.filters.clear', { n: filters })}
            </Button>
          </div>
        ) : null}
      </div>
      <div style={{ marginBlockStart: 'var(--space-5)' }}>
        <QueryState query={courses}>
          {(data) => (
            <>
              {data.didYouMean ? (
                <p className="did-you-mean" role="status">
                  {t('discover.search.didYouMean')}{' '}
                  <Link
                    to={`?${withFilter(params, 'q', data.didYouMean).toString()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      update('q', data.didYouMean ?? '');
                    }}
                  >
                    <strong>{data.didYouMean}</strong>
                  </Link>
                  {data.items.length > 0 ? ` ${t('discover.search.showingFor')}` : ''}
                </p>
              ) : null}
              {data.items.length === 0 ? (
                <EmptyState
                  title={t('courses.noResults')}
                  description={t('courses.noResultsBody')}
                />
              ) : (
                <>
                  <p className="muted small" aria-live="polite">
                    {t('courses.resultCount', { n: data.total })}
                  </p>
                  <div className="grid">
                    {data.items.map((c) => (
                      <CourseCard key={c.id} course={c} />
                    ))}
                  </div>
                  <Pagination
                    page={data.page}
                    pageSize={data.pageSize}
                    total={data.total}
                    onPage={(p) => update('page', p > 1 ? String(p) : '')}
                  />
                </>
              )}
            </>
          )}
        </QueryState>
      </div>
    </>
  );
}

export function CoursesPage() {
  const { t } = useI18n();
  usePageMeta(t('courses.title'), t('courses.metaDescription'));
  return (
    <div className="container page">
      <PageHeader title={t('courses.title')} subtitle={t('courses.subtitle')} />
      <CourseBrowser />
    </div>
  );
}

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { t, lang } = useI18n();
  const categories = useCategories();
  const category = categories.data?.find((c) => c.slug === slug);
  const name = category ? loc(lang, category.nameEn, category.nameAr) : undefined;
  usePageMeta(
    name ?? t('courses.category'),
    name ? t('category.metaDescription', { name }) : undefined,
  );

  return (
    <div className="container page">
      <QueryState query={categories}>
        {(list) =>
          !category ? (
            <EmptyState
              title={t('category.notFound')}
              action={{ label: t('courses.title'), to: '/courses' }}
            />
          ) : (
            <>
              <PageHeader
                title={name}
                subtitle={t('category.subtitle', { n: category.courseCount })}
              />
              {category.isAcademy ? (
                <p>
                  <Link to={`/academies/${category.slug}`}>{t('discover.academy.visit')}</Link>
                </p>
              ) : null}
              {list.some((c) => c.parentId === category.id) ? (
                <nav
                  aria-label={t('category.sub')}
                  className="row"
                  style={{ marginBlockEnd: 'var(--space-4)' }}
                >
                  {list
                    .filter((c) => c.parentId === category.id)
                    .map((c) => (
                      <Link
                        key={c.id}
                        className="btn btn--secondary btn--sm"
                        to={`/categories/${c.slug}`}
                      >
                        {loc(lang, c.nameEn, c.nameAr)}
                      </Link>
                    ))}
                </nav>
              ) : null}
              <CourseBrowser fixedCategory={category.slug} />
            </>
          )
        }
      </QueryState>
    </div>
  );
}
