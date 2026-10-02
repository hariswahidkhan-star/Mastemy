import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCategories, useCourses } from '../../api/hooks';
import type { CourseQuery } from '../../api/hooks';
import { CourseCard } from '../../components/CourseCard';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Input } from '../../components/ui/Field';
import { QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { RecentlyViewedRail } from './ComparePage';

function Collection({
  title,
  query,
  moreTo,
}: {
  title: string;
  query: CourseQuery;
  moreTo: string;
}) {
  const { t } = useI18n();
  const courses = useCourses({ ...query, page: 1 });
  return (
    <section className="section" aria-labelledby={`col-${title}`}>
      <div className="section__head">
        <h2 className="section__title" id={`col-${title}`}>
          {title}
        </h2>
        <Link to={moreTo}>{t('home.seeAll')}</Link>
      </div>
      <QueryState query={courses}>
        {(data) =>
          data.items.length === 0 ? (
            <EmptyState
              title={t('home.emptyCollection')}
              description={t('home.emptyCollectionBody')}
            />
          ) : (
            <div className="grid">
              {data.items.slice(0, 6).map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )
        }
      </QueryState>
    </section>
  );
}

function AcademyCollection() {
  const { t } = useI18n();
  const categories = useCategories();
  const academy =
    categories.data?.find((c) => c.isAcademy && c.parentId === null) ??
    categories.data?.find((c) => c.isAcademy);
  if (categories.isPending || categories.isError || !academy) {
    return (
      <section className="section">
        <div className="section__head">
          <h2 className="section__title">{t('home.academy')}</h2>
        </div>
        <QueryState query={categories}>
          {() => (
            <EmptyState title={t('home.emptyCollection')} description={t('home.academyEmpty')} />
          )}
        </QueryState>
      </section>
    );
  }
  return (
    <Collection
      title={t('home.academy')}
      query={{ category: academy.slug, sort: 'updated' }}
      moreTo={`/categories/${academy.slug}`}
    />
  );
}

export function HomePage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  usePageMeta(t('home.metaTitle'), t('home.metaDescription'));

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/courses${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{t('home.heroTitle')}</h1>
          <p>{t('home.heroBody')}</p>
          <form className="hero-search" role="search" onSubmit={onSearch}>
            <label htmlFor="hero-q" className="visually-hidden">
              {t('courses.search')}
            </label>
            <Input
              id="hero-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('home.searchPlaceholder')}
            />
            <Button type="submit">{t('courses.searchButton')}</Button>
          </form>
          <div className="row" style={{ marginBlockStart: 'var(--space-5)' }}>
            <ButtonLink to="/free-lessons" variant="secondary">
              {t('home.ctaFree')}
            </ButtonLink>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="section" aria-labelledby="pillars">
          <h2 className="visually-hidden" id="pillars">
            {t('home.howTitle')}
          </h2>
          <div className="pillars">
            {(['video', 'notes', 'mcq', 'cert'] as const).map((k) => (
              <div key={k} className="card card--flat pillar">
                <h3>{t(`home.pillar.${k}.title`)}</h3>
                <p className="muted small">{t(`home.pillar.${k}.body`)}</p>
              </div>
            ))}
          </div>
        </section>
        <RecentlyViewedRail />
        <Collection
          title={t('home.new')}
          query={{ sort: 'newest' }}
          moreTo="/courses?sort=newest"
        />
        <Collection
          title={t('home.updated')}
          query={{ sort: 'updated' }}
          moreTo="/courses?sort=updated"
        />
        <AcademyCollection />
      </div>
    </>
  );
}
