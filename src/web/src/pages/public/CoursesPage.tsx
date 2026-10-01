import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { useCategories, useCourses } from '../../api/hooks';
import type { CourseQuery } from '../../api/hooks';
import { COURSE_LEVELS } from '../../api/types';
import { CourseCard } from '../../components/CourseCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Input, Select } from '../../components/ui/Field';
import { PageHeader, Pagination, QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';

const SORTS = ['newest', 'updated', 'title'] as const;

function CourseBrowser({ fixedCategory }: { fixedCategory?: string }) {
  const { t, lang } = useI18n();
  const [params, setParams] = useSearchParams();
  const categories = useCategories();
  const [qInput, setQInput] = useState(params.get('q') ?? '');

  const sortParam = params.get('sort');
  const query: CourseQuery = {
    q: params.get('q') ?? undefined,
    category: fixedCategory ?? params.get('category') ?? undefined,
    level: params.get('level') ?? undefined,
    language: params.get('language') ?? undefined,
    sort: (SORTS as readonly string[]).includes(sortParam ?? '')
      ? (sortParam as CourseQuery['sort'])
      : 'newest',
    page: Math.max(1, Number(params.get('page') ?? '1') || 1),
  };
  const courses = useCourses(query);

  // Debounce free-text search into the URL.
  useEffect(() => {
    const handle = window.setTimeout(() => {
      const current = params.get('q') ?? '';
      if (qInput.trim() === current) return;
      const next = new URLSearchParams(params);
      if (qInput.trim()) next.set('q', qInput.trim());
      else next.delete('q');
      next.delete('page');
      setParams(next, { replace: true });
    }, 350);
    return () => window.clearTimeout(handle);
  }, [qInput, params, setParams]);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next);
  };

  return (
    <>
      <form className="filters card card--flat" role="search" onSubmit={(e) => e.preventDefault()}>
        <Field label={t('courses.search')}>
          <Input type="search" value={qInput} onChange={(e) => setQInput(e.target.value)} />
        </Field>
        {!fixedCategory ? (
          <Field label={t('courses.category')}>
            <Select
              value={query.category ?? ''}
              onChange={(e) => update('category', e.target.value)}
              placeholder={t('courses.allCategories')}
              options={(categories.data ?? []).map((c) => ({
                value: c.slug,
                label: (c.parentId ? '— ' : '') + (lang === 'ar' ? c.nameAr : c.nameEn),
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
        <Field label={t('courses.sort')}>
          <Select
            value={query.sort}
            onChange={(e) => update('sort', e.target.value)}
            options={SORTS.map((s) => ({ value: s, label: t(`courses.sort_${s}`) }))}
          />
        </Field>
      </form>
      <div style={{ marginBlockStart: 'var(--space-5)' }}>
        <QueryState query={courses}>
          {(data) =>
            data.items.length === 0 ? (
              <EmptyState title={t('courses.noResults')} description={t('courses.noResultsBody')} />
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
                  onPage={(p) => update('page', String(p))}
                />
              </>
            )
          }
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
  const name = category ? (lang === 'ar' ? category.nameAr : category.nameEn) : undefined;
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
                        {lang === 'ar' ? c.nameAr : c.nameEn}
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
