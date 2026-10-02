import { Link, useLocation, useNavigate } from 'react-router';
import { api } from '../api/client';
import { useApiMutation } from '../api/hooks';
import { useWishlist, w2keys } from '../api/wave2';
import type { CourseCardLiteDto } from '../api/wave2';
import { useAuth } from '../auth/AuthProvider';
import { useI18n } from '../i18n/I18nProvider';
import { canCompare, COMPARE_MAX, compareHref, useCompareTray } from '../lib/compare';
import type { CompareItem } from '../lib/compare';
import { Button, ButtonLink } from './ui/Button';
import { errorMessage } from './ui/ErrorState';
import { Badge } from './ui/misc';
import { useToast } from './ui/Toast';

/** Signed-in only: renders inside components that already know a user exists. */
function WishlistToggle({ courseId, title }: { courseId: string; title: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const wishlist = useWishlist();
  const saved = !!wishlist.data?.some((w) => w.course.id === courseId);
  const toggle = useApiMutation(
    (add: boolean) => api(`/api/me/wishlist/${courseId}`, { method: add ? 'POST' : 'DELETE' }),
    [w2keys.wishlist],
    (_r, add) => toast.success(add ? t('wishlist.added') : t('wishlist.removed')),
  );
  return (
    <Button
      size="sm"
      variant={saved ? 'secondary' : 'ghost'}
      aria-pressed={saved}
      aria-label={saved ? t('wishlist.removeNamed', { title }) : t('wishlist.addNamed', { title })}
      loading={toggle.isPending}
      disabled={wishlist.isPending}
      onClick={() => toggle.mutate(!saved, { onError: (e) => toast.error(errorMessage(e, t)) })}
    >
      <span aria-hidden="true">{saved ? '♥' : '♡'}</span>{' '}
      {saved ? t('wishlist.saved') : t('wishlist.save')}
    </Button>
  );
}

export function WishlistButton({ courseId, title }: { courseId: string; title: string }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return (
      <ButtonLink
        size="sm"
        variant="ghost"
        to={`/login?next=${encodeURIComponent(location.pathname)}`}
        aria-label={t('wishlist.loginToSave', { title })}
      >
        <span aria-hidden="true">♡</span> {t('wishlist.save')}
      </ButtonLink>
    );
  return <WishlistToggle courseId={courseId} title={title} />;
}

export function CompareToggle({ item }: { item: CompareItem }) {
  const { t } = useI18n();
  const toast = useToast();
  const tray = useCompareTray();
  const selected = tray.has(item.id);
  return (
    <Button
      size="sm"
      variant={selected ? 'secondary' : 'ghost'}
      aria-pressed={selected}
      aria-label={
        selected
          ? t('compare.removeNamed', { title: item.title })
          : t('compare.addNamed', { title: item.title })
      }
      onClick={() => {
        if (!tray.toggle(item)) toast.info(t('compare.full', { n: COMPARE_MAX }));
      }}
    >
      {selected ? t('compare.selected') : t('compare.add')}
    </Button>
  );
}

/** Fixed tray listing the selected courses; rendered once in the layout. */
export function CompareTray() {
  const { t } = useI18n();
  const tray = useCompareTray();
  const navigate = useNavigate();
  const location = useLocation();
  if (tray.items.length === 0 || location.pathname === '/compare') return null;
  const ready = canCompare(tray.items);
  return (
    <aside className="compare-tray" aria-label={t('compare.tray')}>
      <div className="container compare-tray__inner">
        <strong>{t('compare.trayTitle', { n: tray.items.length, max: COMPARE_MAX })}</strong>
        <ul className="compare-tray__list">
          {tray.items.map((c) => (
            <li key={c.id}>
              <span>{c.title}</span>
              <button
                type="button"
                className="ts-button"
                onClick={() => tray.remove(c.id)}
                aria-label={t('compare.removeNamed', { title: c.title })}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className="row">
          {!ready ? <span className="small">{t('compare.needMore')}</span> : null}
          <Button size="sm" variant="ghost" onClick={tray.clear}>
            {t('compare.clear')}
          </Button>
          <Button size="sm" disabled={!ready} onClick={() => navigate(compareHref(tray.items))}>
            {t('compare.go')}
          </Button>
        </div>
      </div>
    </aside>
  );
}

/** Compact card for the lite course shape used by wishlist / recently viewed / related lists. */
export function LiteCourseCard({ course, extra }: { course: CourseCardLiteDto; extra?: string }) {
  const { t, fmtMoney } = useI18n();
  return (
    <div className="course-card-wrap">
      <Link to={`/courses/${course.slug}`} className="course-card">
        <span className="course-card__band" aria-hidden="true" />
        <h3 className="course-card__title">{course.title}</h3>
        {course.subtitle ? <p className="muted small">{course.subtitle}</p> : null}
        <div className="course-card__meta">
          <Badge>{t(`level.${course.level}`)}</Badge>
          <Badge>{t(`language.${course.language}`)}</Badge>
        </div>
        <p className="small" style={{ margin: 0 }}>
          {course.minPrice != null && course.currency
            ? t('discovery.fromPrice', { price: fmtMoney(course.minPrice, course.currency) })
            : t('discovery.freeOnly')}
        </p>
        {extra ? (
          <p className="small muted" style={{ margin: 0 }}>
            {extra}
          </p>
        ) : null}
      </Link>
      <div className="course-card__actions">
        <WishlistButton courseId={course.id} title={course.title} />
        <CompareToggle item={{ id: course.id, slug: course.slug, title: course.title }} />
      </div>
    </div>
  );
}
