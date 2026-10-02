import { Navigate, NavLink, Outlet } from 'react-router';
import { ReviewQueuePage } from './ReviewQueuePage';
import type { Role } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { useI18n } from '../../i18n/I18nProvider';
import { DISCOVER_ADMIN_SECTIONS } from '../../routes/discoverNav';

export const ADMIN_SECTIONS: { to: string; key: string; roles: Role[]; label?: string }[] = [
  { to: '/admin', key: 'review', roles: ['Reviewer', 'Admin', 'SuperAdmin'] },
  { to: '/admin/applications', key: 'applications', roles: ['Reviewer', 'Admin', 'SuperAdmin'] },
  { to: '/admin/videos', key: 'videos', roles: ['Reviewer', 'Admin', 'SuperAdmin'] },
  { to: '/admin/packages', key: 'packages', roles: ['Admin', 'SuperAdmin', 'Finance'] },
  { to: '/admin/refunds', key: 'refunds', roles: ['Finance', 'Admin', 'SuperAdmin'] },
  { to: '/admin/users', key: 'users', roles: ['Support', 'Admin', 'SuperAdmin'] },
  { to: '/admin/orgs', key: 'orgs', roles: ['Admin', 'SuperAdmin'] },
  { to: '/admin/settings', key: 'settings', roles: ['Admin', 'SuperAdmin'] },
  { to: '/admin/audit', key: 'audit', roles: ['Finance', 'Admin', 'SuperAdmin'] },
  ...DISCOVER_ADMIN_SECTIONS,
];

export function AdminLayout() {
  const { t } = useI18n();
  const { hasRole } = useAuth();
  return (
    <div className="container side-layout">
      <nav aria-label={t('admin.nav')}>
        <ul className="side-nav">
          {ADMIN_SECTIONS.filter((s) => hasRole(...s.roles)).map((s) => (
            <li key={s.to}>
              <NavLink to={s.to} end>
                {t(s.label ?? `admin.section.${s.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

/** /admin landing: reviewers get the review queue; other staff go to their first permitted section. */
export function AdminIndex() {
  const { hasRole } = useAuth();
  if (hasRole('Reviewer', 'Admin', 'SuperAdmin')) return <ReviewQueuePage />;
  const first = ADMIN_SECTIONS.find((s) => s.to !== '/admin' && hasRole(...s.roles));
  return <Navigate to={first?.to ?? '/'} replace />;
}
