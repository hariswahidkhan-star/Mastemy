import { useState } from 'react';
import type { MouseEvent } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router';
import { api } from '../../api/client';
import { useApiMutation, useCategories, useCourses } from '../../api/hooks';
import {
  CERT_KINDS,
  loc,
  useAcademy,
  useCertification,
  useCollection,
  useHome,
  useInstructors,
  usePathway,
  usePathways,
  usePublicCertifications,
  useCatalogSearch,
} from '../../api/discover';
import type { PathwayEnrollResultDto } from '../../api/discover';
import { COURSE_LEVELS } from '../../api/types';
import type { CategoryDto } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { CourseCard } from '../../components/CourseCard';
import { Duration } from '../../components/Duration';
import { CertificationCard, CourseRow, PathwayCard } from '../../components/discover/Shared';
import { useDebounced } from '../../components/discover/SearchCombobox';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { errorMessage } from '../../components/ui/ErrorState';
import { Field, Input, Select } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, Pagination, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { ARTICLES, articleHtml, findArticle } from '../../lib/articles';
import { usePageMeta } from '../../lib/seo';
import { FreeVideoNotice } from '../public/CourseDetailPage';
import '../../styles/discover.css';

// ---------------- Categories index ----------------
export function CategoriesIndexPage() {
  const { t, lang } = useI18n();
  const categories = useCategories();
  usePageMeta(t('discover.categories.title'), t('discover.categories.subtitle'));
  const name = (c: CategoryDto) => loc(lang, c.nameEn, c.nameAr);
  return (
    <div className="container page">
      <PageHeader
        title={t('discover.categories.title')}
        subtitle={t('discover.categories.subtitle')}
      />
      <QueryState query={categories}>
        {(list) => {
          const roots = list.filter((c) => c.parentId === null);
          if (roots.length === 0) return <EmptyState title={t('discover.categories.empty')} />;
          return (
            <ul className="dlist grid">
              {roots.map((c) => {
                const children = list.filter((x) => x.parentId === c.id);
                return (
                  <li key={c.id} className="card">
                    <h2 className="dcard__title">
                      <Link to={c.isAcademy ? `/academies/${c.slug}` : `/categories/${c.slug}`}>
                        {name(c)}
                      </Link>
                    </h2>
                    <p className="small muted">
                      {t('category.subtitle', { n: c.courseCount })}
                      {c.isAcademy ? (
                        <>
                          {' '}
                          <Badge tone="accent">{t('discover.categories.academy')}</Badge>
                        </>
                      ) : null}
                    </p>
                    {children.length > 0 ? (
                      <ul className="mega__list">
                        {children.map((ch) => (
                          <li key={ch.id}>
                            <Link to={`/categories/${ch.slug}`}>{name(ch)}</Link>{' '}
                            <span className="small muted">({ch.courseCount})</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          );
        }}
      </QueryState>
    </div>
  );
}

// ---------------- Academy ----------------
export function AcademyPage() {
  const { slug = '' } = useParams();
  const { t, lang } = useI18n();
  const academy = useAcademy(slug);
  const title = academy.data
    ? loc(lang, academy.data.category.nameEn, academy.data.category.nameAr)
    : undefined;
  usePageMeta(
    title ?? t('discover.academy.title'),
    title ? t('discover.academy.meta', { name: title }) : undefined,
  );
  return (
    <div className="container page">
      <QueryState query={academy}>
        {(a) => (
          <>
            <PageHeader
              title={title}
              subtitle={t('discover.academy.subtitle', { n: a.category.courseCount })}
              actions={
                <ButtonLink to={`/categories/${a.category.slug}`} variant="secondary" size="sm">
                  {t('discover.academy.browseAll')}
                </ButtonLink>
              }
            />
            {a.featured.map((c) => (
              <CourseRow
                key={c.id}
                id={`acf-${c.slug}`}
                title={loc(lang, c.titleEn, c.titleAr)}
                courses={c.courses.slice(0, 6)}
                more={{ to: `/collections/${c.slug}`, label: t('home.seeAll') }}
              />
            ))}
            {a.pathways.length > 0 ? (
              <section className="section" aria-labelledby="ac-paths">
                <h2 className="section__title" id="ac-paths">
                  {t('discover.pathways.title')}
                </h2>
                <ul className="dlist grid">
                  {a.pathways.map((p) => (
                    <PathwayCard key={p.id} p={p} />
                  ))}
                </ul>
              </section>
            ) : null}
            <CourseRow
              id="ac-courses"
              title={t('discover.academy.latest')}
              courses={a.courses}
              empty={<EmptyState title={t('discover.academy.empty')} />}
            />
          </>
        )}
      </QueryState>
    </div>
  );
}

// ---------------- Certifications ----------------
export function CertificationsPage() {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const [qInput, setQInput] = useState(params.get('q') ?? '');
  const q = useDebounced(qInput.trim(), 300);
  const kind = params.get('kind') ?? '';
  const certs = usePublicCertifications({
    q: q || undefined,
    kind: (CERT_KINDS as readonly string[]).includes(kind) ? kind : undefined,
  });
  usePageMeta(t('discover.cert.title'), t('discover.cert.subtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('discover.cert.title')} subtitle={t('discover.cert.subtitle')} />
      <Notice tone="info" title={t('discover.cert.independentTitle')}>
        <p style={{ margin: 0 }}>{t('discover.cert.noPartnership')}</p>
      </Notice>
      <form
        className="filters card card--flat"
        role="search"
        onSubmit={(e) => e.preventDefault()}
        style={{ marginBlock: 'var(--space-4)' }}
      >
        <Field label={t('discover.cert.search')}>
          <Input type="search" value={qInput} onChange={(e) => setQInput(e.target.value)} />
        </Field>
        <Field label={t('discover.cert.kind')}>
          <Select
            value={kind}
            onChange={(e) => {
              const next = new URLSearchParams(params);
              if (e.target.value) next.set('kind', e.target.value);
              else next.delete('kind');
              setParams(next);
            }}
            placeholder={t('discover.filters.any')}
            options={CERT_KINDS.map((k) => ({ value: k, label: t(`discover.certKind.${k}`) }))}
          />
        </Field>
      </form>
      <QueryState query={certs}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState
              title={t('discover.cert.empty')}
              description={t('discover.cert.emptyBody')}
            />
          ) : (
            <ul className="dlist">
              {list.map((c) => (
                <CertificationCard key={c.id} c={c} />
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

export function CertificationDetailPage() {
  const { slug = '' } = useParams();
  const { t, fmtDate, fmtNumber } = useI18n();
  const cert = useCertification(slug);
  usePageMeta(
    cert.data?.title ?? t('discover.cert.title'),
    cert.data
      ? t('discover.cert.meta', { title: cert.data.title, issuer: cert.data.issuerName })
      : undefined,
  );
  return (
    <div className="container page">
      <QueryState query={cert}>
        {(c) => {
          const totalWeight = c.objectives.reduce((s, o) => s + o.weightPercent, 0);
          return (
            <>
              <nav className="small muted" aria-label={t('common.breadcrumb')}>
                <Link to="/certifications">{t('discover.cert.title')}</Link> / {c.title}
              </nav>
              <PageHeader
                title={c.title}
                subtitle={
                  <>
                    <Badge tone="info">{t(`discover.certState.${c.state}`)}</Badge>{' '}
                    <Badge>{t(`discover.certKind.${c.kind}`)}</Badge>
                  </>
                }
              />
              <Notice tone="info" title={t('discover.cert.independentTitle')}>
                <p style={{ margin: 0 }}>
                  {t('discover.cert.noPartnershipNamed', { issuer: c.issuerName })}
                </p>
              </Notice>
              {c.replacedBySlug ? (
                <Notice tone="warning">
                  {t('discover.cert.replaced')}{' '}
                  <Link to={`/certifications/${c.replacedBySlug}`}>
                    {t('discover.cert.seeReplacement')}
                  </Link>
                </Notice>
              ) : null}
              <section className="section card" aria-labelledby="cert-facts">
                <h2 className="section__title" id="cert-facts">
                  {t('discover.cert.facts')}
                </h2>
                <dl className="dfacts">
                  <dt>{t('discover.cert.issuer')}</dt>
                  <dd>{c.issuerName}</dd>
                  {c.examCode ? (
                    <>
                      <dt>{t('discover.cert.examCode')}</dt>
                      <dd className="mono">{c.examCode}</dd>
                    </>
                  ) : null}
                  {c.levelOrPart ? (
                    <>
                      <dt>{t('discover.cert.level')}</dt>
                      <dd>{c.levelOrPart}</dd>
                    </>
                  ) : null}
                  {c.version ? (
                    <>
                      <dt>{t('discover.cert.version')}</dt>
                      <dd>{c.version}</dd>
                    </>
                  ) : null}
                  {c.jurisdiction ? (
                    <>
                      <dt>{t('discover.cert.jurisdiction')}</dt>
                      <dd>{c.jurisdiction}</dd>
                    </>
                  ) : null}
                  {c.effectiveFrom || c.effectiveTo ? (
                    <>
                      <dt>{t('discover.cert.effective')}</dt>
                      <dd>
                        {fmtDate(c.effectiveFrom) || '…'} – {fmtDate(c.effectiveTo) || '…'}
                      </dd>
                    </>
                  ) : null}
                  <dt>{t('discover.cert.lastCheckedLabel')}</dt>
                  <dd>{fmtDate(c.lastCheckedAt)}</dd>
                  <dt>{t('discover.cert.officialSource')}</dt>
                  <dd>
                    <a href={c.officialSourceUrl} target="_blank" rel="noopener noreferrer">
                      {c.officialSourceUrl}
                    </a>
                  </dd>
                  {c.prerequisites ? (
                    <>
                      <dt>{t('discover.cert.prerequisites')}</dt>
                      <dd className="pre-wrap">{c.prerequisites}</dd>
                    </>
                  ) : null}
                  {c.renewalInfo ? (
                    <>
                      <dt>{t('discover.cert.renewal')}</dt>
                      <dd className="pre-wrap">{c.renewalInfo}</dd>
                    </>
                  ) : null}
                </dl>
                <p className="small muted">{t('discover.cert.officialWins')}</p>
              </section>
              {c.nonMcqDisclosure ? (
                <Notice tone="warning" title={t('discover.cert.nonMcqTitle')}>
                  <p className="pre-wrap" style={{ margin: 0 }}>
                    {c.nonMcqDisclosure}
                  </p>
                </Notice>
              ) : null}
              <section className="section" aria-labelledby="cert-blueprint">
                <h2 className="section__title" id="cert-blueprint">
                  {t('discover.cert.blueprint')}
                </h2>
                {c.objectives.length === 0 ? (
                  <p className="muted">{t('discover.cert.noBlueprint')}</p>
                ) : (
                  <div className="table-wrap">
                    <table className="table">
                      <caption className="visually-hidden">{t('discover.cert.blueprint')}</caption>
                      <thead>
                        <tr>
                          <th scope="col">{t('discover.cert.objCode')}</th>
                          <th scope="col">{t('discover.cert.objTitle')}</th>
                          <th scope="col">{t('discover.cert.objWeight')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {c.objectives.map((o) => (
                          <tr key={o.id}>
                            <td className="mono">{o.code}</td>
                            <td>{o.title}</td>
                            <td>
                              <span
                                className="weight-bar"
                                style={{ inlineSize: `${Math.max(2, o.weightPercent)}px` }}
                                aria-hidden="true"
                              />{' '}
                              {fmtNumber(o.weightPercent)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {c.objectives.length > 0 && totalWeight < 100 ? (
                  <p className="small muted">
                    {t('discover.cert.weightPartial', { n: fmtNumber(totalWeight) })}
                  </p>
                ) : null}
              </section>
              <CourseRow
                id="cert-courses"
                title={t('discover.cert.prepCourses')}
                courses={c.preparationCourses}
                empty={<EmptyState title={t('discover.cert.noCourses')} />}
                extra={<p className="small muted">{t('discover.cert.prepNote')}</p>}
              />
            </>
          );
        }}
      </QueryState>
    </div>
  );
}

// ---------------- Pathways ----------------
export function PathwaysPage() {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const level = params.get('level') ?? '';
  const valid = (COURSE_LEVELS as readonly string[]).includes(level) ? level : undefined;
  const pathways = usePathways(valid);
  usePageMeta(t('discover.pathways.title'), t('discover.pathways.subtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('discover.pathways.title')} subtitle={t('discover.pathways.subtitle')} />
      <div className="filters card card--flat" style={{ marginBlockEnd: 'var(--space-4)' }}>
        <Field label={t('courses.level')}>
          <Select
            value={valid ?? ''}
            onChange={(e) => setParams(e.target.value ? { level: e.target.value } : {})}
            placeholder={t('courses.allLevels')}
            options={COURSE_LEVELS.map((l) => ({ value: l, label: t(`level.${l}`) }))}
          />
        </Field>
      </div>
      <QueryState query={pathways}>
        {(list) =>
          list.length === 0 ? (
            <EmptyState title={t('discover.pathways.empty')} />
          ) : (
            <ul className="dlist grid">
              {list.map((p) => (
                <PathwayCard key={p.id} p={p} />
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

function EnrollAll({ slug, count }: { slug: string; count: number }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const toast = useToast();
  const location = useLocation();
  const [result, setResult] = useState<PathwayEnrollResultDto | null>(null);
  const enroll = useApiMutation(
    () =>
      api<PathwayEnrollResultDto>(`/api/pathways/${encodeURIComponent(slug)}/enroll`, {
        method: 'POST',
      }),
    [['me', 'dashboard']],
    (r) => {
      setResult(r);
      toast.success(t('discover.pathways.enrolled', { n: r.enrolled, m: r.alreadyEnrolled }));
    },
  );
  if (!user)
    return (
      <ButtonLink to={`/login?next=${encodeURIComponent(location.pathname)}`}>
        {t('discover.pathways.loginToEnroll')}
      </ButtonLink>
    );
  return (
    <div className="stack">
      <Button
        loading={enroll.isPending}
        disabled={count === 0}
        onClick={() =>
          enroll.mutate(undefined, { onError: (e) => toast.error(errorMessage(e, t)) })
        }
      >
        {t('discover.pathways.enrollAll', { n: count })}
      </Button>
      {result ? (
        <p className="small" role="status">
          {t('discover.pathways.enrolled', { n: result.enrolled, m: result.alreadyEnrolled })}{' '}
          <Link to="/me">{t('discover.pathways.goDashboard')}</Link>
        </p>
      ) : null}
    </div>
  );
}

export function PathwayDetailPage() {
  const { slug = '' } = useParams();
  const { t, lang } = useI18n();
  const pathway = usePathway(slug);
  const title = pathway.data ? loc(lang, pathway.data.titleEn, pathway.data.titleAr) : undefined;
  const desc = pathway.data
    ? loc(lang, pathway.data.descriptionEn, pathway.data.descriptionAr)
    : undefined;
  usePageMeta(title ?? t('discover.pathways.title'), desc || undefined);
  return (
    <div className="container page">
      <QueryState query={pathway}>
        {(p) => {
          const total = p.courses.reduce((s, c) => s + (c.totalDurationSeconds ?? 0), 0);
          return (
            <>
              <nav className="small muted" aria-label={t('common.breadcrumb')}>
                <Link to="/pathways">{t('discover.pathways.title')}</Link> / {title}
              </nav>
              <PageHeader
                title={title}
                subtitle={desc}
                actions={<EnrollAll slug={p.slug} count={p.courses.length} />}
              />
              <p className="row small">
                <Badge>{t(`level.${p.level}`)}</Badge>
                <span>{t('discover.pathways.courseCount', { n: p.courses.length })}</span>
                {total > 0 ? <Duration seconds={total} /> : null}
              </p>
              {p.skills.length > 0 ? (
                <p className="row small" aria-label={t('discover.pathways.skills')}>
                  {p.skills.map((s) => (
                    <Link
                      key={s.id}
                      to={`/courses?skill=${encodeURIComponent(s.code)}`}
                      className="badge badge--neutral"
                    >
                      {loc(lang, s.nameEn, s.nameAr)}
                    </Link>
                  ))}
                </p>
              ) : null}
              <p className="small muted">{t('discover.pathways.freeNote')}</p>
              <section className="section" aria-labelledby="pw-courses">
                <h2 className="section__title" id="pw-courses">
                  {t('discover.pathways.order')}
                </h2>
                <ol className="dlist">
                  {p.courses.map((c, i) => (
                    <li key={c.id} className="row" style={{ alignItems: 'flex-start' }}>
                      <span className="badge badge--accent" aria-hidden="true">
                        {i + 1}
                      </span>
                      <div className="grow">
                        <CourseCard course={c} />
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </>
          );
        }}
      </QueryState>
    </div>
  );
}

// ---------------- Collections ----------------
export function CollectionPage() {
  const { slug = '' } = useParams();
  const { t, lang } = useI18n();
  const collection = useCollection(slug);
  const title = collection.data
    ? loc(lang, collection.data.titleEn, collection.data.titleAr)
    : undefined;
  usePageMeta(
    title ?? t('discover.collection.title'),
    title ? t('discover.collection.meta', { title }) : undefined,
  );
  return (
    <div className="container page">
      <QueryState query={collection}>
        {(c) => (
          <>
            <PageHeader
              title={title}
              subtitle={t('discover.collection.count', { n: c.courses.length })}
            />
            <div className="grid">
              {c.courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </QueryState>
    </div>
  );
}

// ---------------- Instructors directory ----------------
export function InstructorsPage() {
  const { t, fmtNumber } = useI18n();
  const [params, setParams] = useSearchParams();
  const [qInput, setQInput] = useState(params.get('q') ?? '');
  const q = useDebounced(qInput.trim(), 300);
  const page = Math.max(1, Number(params.get('page') ?? '1') || 1);
  const list = useInstructors({ q: q || undefined, page, pageSize: 24 });
  usePageMeta(t('discover.instructors.title'), t('discover.instructors.subtitle'));
  return (
    <div className="container page">
      <PageHeader
        title={t('discover.instructors.title')}
        subtitle={t('discover.instructors.subtitle')}
      />
      <form className="filters card card--flat" role="search" onSubmit={(e) => e.preventDefault()}>
        <Field label={t('discover.instructors.search')}>
          <Input
            type="search"
            value={qInput}
            onChange={(e) => {
              setQInput(e.target.value);
              if (params.get('page')) setParams({});
            }}
          />
        </Field>
      </form>
      <div style={{ marginBlockStart: 'var(--space-4)' }}>
        <QueryState query={list}>
          {(data) =>
            data.items.length === 0 ? (
              <EmptyState title={t('discover.instructors.empty')} />
            ) : (
              <>
                <ul className="dlist grid">
                  {data.items.map((i) => (
                    <li key={i.id} className="card">
                      <Link to={`/instructors/${i.id}`} className="dcard">
                        <h2 className="dcard__title">{i.displayName}</h2>
                        <p className="small muted" style={{ margin: 0 }}>
                          {t('discover.instructors.courses', { n: fmtNumber(i.liveCourseCount) })}
                          {i.ratingCount > 0 && i.ratingAverage != null
                            ? ` · ${t('course.rating', { avg: i.ratingAverage.toFixed(1), n: fmtNumber(i.ratingCount) })}`
                            : ''}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Pagination
                  page={data.page}
                  pageSize={data.pageSize}
                  total={data.total}
                  onPage={(p) => setParams(p > 1 ? { page: String(p) } : {})}
                />
              </>
            )
          }
        </QueryState>
      </div>
    </div>
  );
}

// ---------------- Explanation / landing pages ----------------
function InfoSections({ prefix, keys }: { prefix: string; keys: string[] }) {
  const { t } = useI18n();
  return (
    <div className="stack" style={{ display: 'grid', gap: 'var(--space-4)' }}>
      {keys.map((k) => (
        <section key={k} className="card card--flat" aria-labelledby={`${prefix}-${k}`}>
          <h2 id={`${prefix}-${k}`} style={{ fontSize: 'var(--text-lg)', marginBlockStart: 0 }}>
            {t(`${prefix}.${k}.title`)}
          </h2>
          <p style={{ margin: 0 }}>{t(`${prefix}.${k}.body`)}</p>
        </section>
      ))}
    </div>
  );
}

export function PackagesPage() {
  const { t } = useI18n();
  usePageMeta(t('discover.packages.title'), t('discover.packages.subtitle'));
  const withPackages = useCatalogSearch({ minPrice: '0', sort: 'updated' });
  return (
    <div className="container page">
      <PageHeader title={t('discover.packages.title')} subtitle={t('discover.packages.subtitle')} />
      <FreeVideoNotice />
      <InfoSections prefix="discover.packages" keys={['what', 'never', 'review', 'compare']} />
      <QueryState query={withPackages}>
        {(d) => (
          <CourseRow
            id="pk-courses"
            title={t('discover.packages.withPackages')}
            courses={d.items.slice(0, 6)}
            more={d.total > 6 ? { to: '/courses?minPrice=0', label: t('home.seeAll') } : undefined}
            empty={<EmptyState title={t('discover.packages.none')} />}
          />
        )}
      </QueryState>
    </div>
  );
}

export function PracticePage() {
  const { t } = useI18n();
  usePageMeta(t('discover.practice.title'), t('discover.practice.subtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('discover.practice.title')} subtitle={t('discover.practice.subtitle')} />
      <InfoSections prefix="discover.practice" keys={['where', 'how', 'explain', 'limits']} />
      <div className="row" style={{ marginBlockStart: 'var(--space-5)' }}>
        <ButtonLink to="/courses">{t('discover.practice.browse')}</ButtonLink>
        <ButtonLink to="/articles/how-mcq-certificates-work" variant="secondary">
          {t('discover.practice.certs')}
        </ButtonLink>
      </div>
    </div>
  );
}

export function NotesLibraryPage() {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const courses = useCourses({ sort: 'updated', page });
  usePageMeta(t('discover.notes.title'), t('discover.notes.subtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('discover.notes.title')} subtitle={t('discover.notes.subtitle')} />
      <InfoSections prefix="discover.notes" keys={['free', 'premium', 'private']} />
      <section className="section" aria-labelledby="nl-courses">
        <h2 className="section__title" id="nl-courses">
          {t('discover.notes.liveCourses')}
        </h2>
        <p className="small muted">{t('discover.notes.liveNote')}</p>
        <QueryState query={courses}>
          {(data) =>
            data.items.length === 0 ? (
              <EmptyState title={t('free.empty')} />
            ) : (
              <>
                <ul className="dlist">
                  {data.items.map((c) => (
                    <li key={c.id} className="card card--flat row row--between">
                      <span>
                        <Link to={`/courses/${c.slug}`}>
                          <strong>{c.title}</strong>
                        </Link>
                        {c.videoCount ? (
                          <span className="small muted">
                            {' '}
                            · {t('course.videoCount', { n: c.videoCount })}
                          </span>
                        ) : null}
                      </span>
                      <Link className="btn btn--secondary btn--sm" to={`/learn/${c.slug}`}>
                        {t('discover.notes.openNotes')}
                      </Link>
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
      </section>
    </div>
  );
}

export function BusinessPage() {
  const { t } = useI18n();
  usePageMeta(t('discover.business.title'), t('discover.business.subtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('discover.business.title')} subtitle={t('discover.business.subtitle')} />
      <InfoSections prefix="discover.business" keys={['workspace', 'assign', 'progress', 'free']} />
      <div className="row" style={{ marginBlockStart: 'var(--space-5)' }}>
        <ButtonLink to="/contact">{t('discover.business.contact')}</ButtonLink>
        <ButtonLink to="/verify" variant="secondary">
          {t('discover.business.verify')}
        </ButtonLink>
      </div>
    </div>
  );
}

export function BestsellerRulePage() {
  const { t } = useI18n();
  const home = useHome();
  usePageMeta(t('discover.best.ruleTitle'), t('discover.best.ruleSubtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('discover.best.ruleTitle')} subtitle={t('discover.best.ruleSubtitle')} />
      <QueryState query={home}>
        {(h) => (
          <section className="card card--flat">
            <p>{h.bestsellerRule}</p>
            <p className="small muted" style={{ margin: 0 }}>
              {t('discover.best.ruleNote')}
            </p>
          </section>
        )}
      </QueryState>
    </div>
  );
}

// ---------------- Articles ----------------
export function ArticlesPage() {
  const { t, fmtDate } = useI18n();
  usePageMeta(t('discover.articles.title'), t('discover.articles.subtitle'));
  return (
    <div className="container page">
      <PageHeader title={t('discover.articles.title')} subtitle={t('discover.articles.subtitle')} />
      {ARTICLES.length === 0 ? (
        <EmptyState title={t('discover.articles.empty')} />
      ) : (
        <ul className="dlist">
          {ARTICLES.map((a) => (
            <li key={a.slug} className="card">
              <Link to={`/articles/${a.slug}`} className="dcard">
                <h2 className="dcard__title">{a.title}</h2>
                <p className="small muted" style={{ margin: 0 }}>
                  {a.description}
                </p>
                {a.published ? (
                  <p className="small" style={{ margin: 0 }}>
                    <time dateTime={a.published}>{fmtDate(a.published)}</time>
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ArticlePage() {
  const { slug = '' } = useParams();
  const { t, lang, fmtDate } = useI18n();
  const navigate = useNavigate();
  const article = findArticle(slug);
  usePageMeta(article?.title ?? t('notFound.title'), article?.description, { noindex: !article });
  if (!article)
    return (
      <div className="container page">
        <EmptyState
          title={t('notFound.title')}
          action={{ label: t('discover.articles.title'), to: '/articles' }}
        />
      </div>
    );
  // Internal links in the markdown navigate inside the app instead of reloading the page.
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest('a');
    const href = a?.getAttribute('href');
    if (href?.startsWith('/') && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      navigate(href);
    }
  };
  return (
    <div className="container page">
      <nav className="small muted" aria-label={t('common.breadcrumb')}>
        <Link to="/articles">{t('discover.articles.title')}</Link>
      </nav>
      <article style={{ maxInlineSize: '72ch' }}>
        <h1 className="page-title">{article.title}</h1>
        {article.published ? (
          <p className="small muted">
            <time dateTime={article.published}>{fmtDate(article.published)}</time>
          </p>
        ) : null}
        {lang === 'ar' ? (
          <p className="small muted" lang="en">
            {t('discover.articles.englishOnly')}
          </p>
        ) : null}
        <div
          className="prose"
          lang="en"
          dir="ltr"
          onClick={onClick}
          // First-party, build-time content (src/content/articles); not user input.
          dangerouslySetInnerHTML={{ __html: articleHtml(article) }}
        />
      </article>
    </div>
  );
}
