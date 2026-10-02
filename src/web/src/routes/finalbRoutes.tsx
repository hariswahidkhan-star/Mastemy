import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Route } from 'react-router';
import type { Role } from '../api/types';
import { RequireRole } from '../auth/RequireRole';
import { Spinner } from '../components/ui/Spinner';
import { useI18n } from '../i18n/I18nProvider';

const sso = () => import('../pages/finalb/Sso');
const SsoStartPage = lazy(() => sso().then((m) => ({ default: m.SsoStartPage })));
const SsoCompletePage = lazy(() => sso().then((m) => ({ default: m.SsoCompletePage })));
const AdminCategoriesPage = lazy(() =>
  import('../pages/finalb/CategoriesAdmin').then((m) => ({ default: m.AdminCategoriesPage })),
);
const OrderBrowserPage = lazy(() =>
  import('../pages/finalb/CommerceB').then((m) => ({ default: m.OrderBrowserPage })),
);
const StaffEnterprisePage = lazy(() =>
  import('../pages/finalb/Enterprise').then((m) => ({ default: m.StaffEnterprisePage })),
);

function L({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <Suspense fallback={<Spinner label={t('common.loading')} block />}>{children}</Suspense>;
}

const STAFF: Role[] = ['Admin', 'SuperAdmin'];
const FINANCE: Role[] = ['Finance', 'Admin', 'SuperAdmin'];

/** Admin navigation entries for this area (spread into ADMIN_SECTIONS). */
export const FINALB_ADMIN_SECTIONS: { to: string; key: string; roles: Role[]; label?: string }[] = [
  { to: '/admin/orders', key: 'fbOrders', roles: FINANCE, label: 'finalb.nav.orders' },
  { to: '/admin/categories', key: 'fbCategories', roles: STAFF, label: 'finalb.nav.categories' },
  { to: '/admin/enterprise', key: 'fbEnterprise', roles: STAFF, label: 'finalb.nav.enterprise' },
];

/** Public routes (children of the main layout). */
export const finalbRoutes = [
  <Route
    key="fb-sso-complete"
    path="sso/complete"
    element={
      <L>
        <SsoCompletePage />
      </L>
    }
  />,
  <Route
    key="fb-sso-start"
    path="sso/:slug"
    element={
      <L>
        <SsoStartPage />
      </L>
    }
  />,
];

/** Staff/finance routes (children of /admin). */
export const finalbAdminRoutes = [
  <Route
    key="fb-orders"
    path="orders"
    element={
      <RequireRole roles={FINANCE}>
        <L>
          <OrderBrowserPage />
        </L>
      </RequireRole>
    }
  />,
  <Route
    key="fb-categories"
    path="categories"
    element={
      <RequireRole roles={STAFF}>
        <L>
          <AdminCategoriesPage />
        </L>
      </RequireRole>
    }
  />,
  <Route
    key="fb-enterprise"
    path="enterprise"
    element={
      <RequireRole roles={STAFF}>
        <L>
          <StaffEnterprisePage />
        </L>
      </RequireRole>
    }
  />,
];
