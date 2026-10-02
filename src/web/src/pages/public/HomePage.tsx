import { Link, useNavigate } from 'react-router';
import { loc, useHome } from '../../api/discover';
import type { HomeDto } from '../../api/discover';
import { CourseCard } from '../../components/CourseCard';
import { SearchCombobox } from '../../components/discover/SearchCombobox';
import { CourseRow, PathwayCard, Toggletip } from '../../components/discover/Shared';
import { ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Badge, QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { RecentlyViewedRail } from './ComparePage';

function HomeRows({ home }: { home: HomeDto }) {
  const { t, lang, fmtNumber } = useI18n();
  const nothing =
    home.featured.length +
      home.new.length +
      home.recentlyUpdated.length +
      home.aiSkills.length +
      home.certificationPreparation.length +
      home.beginnerPathways.length ===
    0;
  if (nothing)
    return (
      <EmptyState title={t('home.emptyCollection')} description={t('discover.home.emptyAll')} />
    );
  return (
    <>
      {home.featured.map((c) => (
        <CourseRow
          key={c.id}
          id={`featured-${c.slug}`}
          title={loc(lang, c.titleEn, c.titleAr)}
          courses={c.courses.slice(0, 6)}
          more={{ to: `/collections/${c.slug}`, label: t('home.seeAll') }}
        />
      ))}
      <CourseRow
        id="home-new"
        title={t('home.new')}
        courses={home.new}
        more={{ to: '/courses?sort=newest', label: t('home.seeAll') }}
      />
      <CourseRow
        id="home-updated"
        title={t('home.updated')}
        courses={home.recentlyUpdated}
        more={{ to: '/courses?sort=updated', label: t('home.seeAll') }}
        extra={<p className="small muted">{t('discover.home.updatedRule')}</p>}
      />
      <CourseRow id="home-ai" title={t('discover.home.aiSkills')} courses={home.aiSkills} />
      <CourseRow
        id="home-cert"
        title={t('discover.home.certPrep')}
        courses={home.certificationPreparation}
        more={{ to: '/certifications', label: t('discover.home.certDirectory') }}
        extra={<p className="small muted">{t('discover.cert.noPartnership')}</p>}
      />
      {home.beginnerPathways.length > 0 ? (
        <section className="section" aria-labelledby="home-paths">
          <div className="section__head">
            <h2 className="section__title" id="home-paths">
              {t('discover.home.beginnerPathways')}
            </h2>
            <Link to="/pathways?level=Beginner">{t('home.seeAll')}</Link>
          </div>
          <ul className="dlist grid">
            {home.beginnerPathways.map((p) => (
              <PathwayCard key={p.id} p={p} />
            ))}
          </ul>
        </section>
      ) : null}
      {home.bestselling.length > 0 ? (
        <section className="section" aria-labelledby="home-best">
          <div className="section__head">
            <h2 className="section__title" id="home-best">
              {t('discover.home.bestselling')}
            </h2>
            <Link to="/bestseller-rule">{t('discover.best.howDecided')}</Link>
          </div>
          <div className="grid">
            {home.bestselling.map((b) => (
              <div key={b.course.id}>
                {b.bestsellerLabel ? (
                  <p className="small" style={{ margin: '0 0 var(--space-1)' }}>
                    <Badge tone="accent">{t('discover.best.label')}</Badge>{' '}
                    <Toggletip label={t('discover.best.why')}>
                      {home.bestsellerRule}{' '}
                      {t('discover.best.buyers', { n: fmtNumber(b.distinctBuyers) })}
                    </Toggletip>
                  </p>
                ) : null}
                <CourseCard course={b.course} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

export function HomePage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const home = useHome();
  usePageMeta(t('home.metaTitle'), t('home.metaDescription'));

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{t('home.heroTitle')}</h1>
          <p>{t('home.heroBody')}</p>
          <div className="hero-search">
            <SearchCombobox
              id="hero-q"
              label={t('courses.search')}
              placeholder={t('home.searchPlaceholder')}
              onSubmit={(q) => navigate(`/courses${q ? `?q=${encodeURIComponent(q)}` : ''}`)}
            />
          </div>
          <div className="row" style={{ marginBlockStart: 'var(--space-5)' }}>
            <ButtonLink to="/free-lessons" variant="secondary">
              {t('home.ctaFree')}
            </ButtonLink>
            <ButtonLink to="/certifications" variant="secondary">
              {t('discover.home.ctaCert')}
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
        <QueryState query={home}>{(h) => <HomeRows home={h} />}</QueryState>
      </div>
    </>
  );
}
