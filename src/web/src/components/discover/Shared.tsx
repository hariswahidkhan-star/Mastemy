import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { loc } from '../../api/discover';
import type { PathwaySummaryDto, PublicCertificationSummaryDto } from '../../api/discover';
import type { CourseCardDto } from '../../api/types';
import { useI18n } from '../../i18n/I18nProvider';
import { CourseCard } from '../CourseCard';
import { Duration } from '../Duration';
import { Badge } from '../ui/misc';
import '../../styles/discover.css';

/** A titled home/academy row of course cards; renders nothing when empty unless `empty` is given. */
export function CourseRow({
  id,
  title,
  courses,
  more,
  empty,
  extra,
}: {
  id: string;
  title: ReactNode;
  courses: CourseCardDto[];
  more?: { to: string; label: string };
  empty?: ReactNode;
  extra?: ReactNode;
}) {
  if (courses.length === 0 && !empty) return null;
  return (
    <section className="section" aria-labelledby={id}>
      <div className="section__head">
        <h2 className="section__title" id={id}>
          {title}
        </h2>
        {more ? <Link to={more.to}>{more.label}</Link> : null}
      </div>
      {extra}
      {courses.length === 0 ? (
        empty
      ) : (
        <div className="grid">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </section>
  );
}

export function PathwayCard({ p }: { p: PathwaySummaryDto }) {
  const { t, lang } = useI18n();
  return (
    <li className="card">
      <Link to={`/pathways/${p.slug}`} className="dcard">
        <h3 className="dcard__title">{loc(lang, p.titleEn, p.titleAr)}</h3>
        <p className="small muted" style={{ margin: 0 }}>
          {loc(lang, p.descriptionEn, p.descriptionAr)}
        </p>
        <div className="row small">
          <Badge>{t(`level.${p.level}`)}</Badge>
          <span>{t('discover.pathways.courseCount', { n: p.courseCount })}</span>
          {p.totalDurationSeconds > 0 ? <Duration seconds={p.totalDurationSeconds} /> : null}
        </div>
      </Link>
    </li>
  );
}

export function CertificationCard({ c }: { c: PublicCertificationSummaryDto }) {
  const { t, fmtDate } = useI18n();
  return (
    <li className="card">
      <Link to={`/certifications/${c.slug}`} className="dcard">
        <h3 className="dcard__title">{c.title}</h3>
        <p className="small muted" style={{ margin: 0 }}>
          {c.issuerName}
          {c.examCode ? ` · ${t('discover.cert.examCode')}: ${c.examCode}` : ''}
          {c.levelOrPart ? ` · ${c.levelOrPart}` : ''}
        </p>
        <div className="row small">
          <Badge tone="info">{t(`discover.certState.${c.state}`)}</Badge>
          <Badge>{t(`discover.certKind.${c.kind}`)}</Badge>
          <span>{t('discover.cert.lastChecked', { date: fmtDate(c.lastCheckedAt) })}</span>
          <span>{t('discover.cert.prepCount', { n: c.preparationCourseCount })}</span>
        </div>
      </Link>
    </li>
  );
}

/**
 * Accessible toggletip: a button reveals an explanation on click, focus or hover; Escape hides it.
 * Used for rule explanations such as the bestseller rule.
 */
export function Toggletip({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <span
      className="tip"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      <button
        type="button"
        className="tip__trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
      >
        <span aria-hidden="true">ⓘ</span> <span className="small">{label}</span>
      </button>
      <span id={id} role="status" className="tip__bubble" hidden={!open}>
        {children}
      </span>
    </span>
  );
}
