import { Link } from 'react-router';
import type { CourseCardDto } from '../api/types';
import { useI18n } from '../i18n/I18nProvider';
import { Duration } from './Duration';
import { Badge } from './ui/misc';

export function CourseCard({ course, to }: { course: CourseCardDto; to?: string }) {
  const { t, fmtNumber } = useI18n();
  return (
    <Link to={to ?? `/courses/${course.slug}`} className="course-card">
      <span className="course-card__band" aria-hidden="true" />
      <h3 className="course-card__title">{course.title}</h3>
      {course.subtitle ? <p className="muted small">{course.subtitle}</p> : null}
      <div className="course-card__meta">
        <Badge>{t(`level.${course.level}`)}</Badge>
        <Badge>{t(`language.${course.language}`)}</Badge>
        {course.status === 'Updating' ? <Badge tone="info">{t('status.Updating')}</Badge> : null}
      </div>
      <div className="course-card__meta">
        {typeof course.videoCount === 'number' ? (
          <span>{t('course.videoCount', { n: fmtNumber(course.videoCount) })}</span>
        ) : null}
        {typeof course.questionCount === 'number' ? (
          <span>{t('course.mcqCount', { n: fmtNumber(course.questionCount) })}</span>
        ) : null}
        {course.totalDurationSeconds ? (
          <span>
            <Duration seconds={course.totalDurationSeconds} />
          </span>
        ) : null}
      </div>
      {course.instructors && course.instructors.length > 0 ? (
        <p className="small muted" style={{ margin: 0 }}>
          {course.instructors.map((i) => i.displayName).join(', ')}
        </p>
      ) : null}
      {course.ratingCount && course.ratingAverage ? (
        <p className="small" style={{ margin: 0 }}>
          {t('course.rating', {
            avg: course.ratingAverage.toFixed(1),
            n: fmtNumber(course.ratingCount),
          })}
        </p>
      ) : null}
    </Link>
  );
}
