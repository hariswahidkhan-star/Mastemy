import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Route } from 'react-router';
import { RequireRole } from '../auth/RequireRole';
import { Spinner } from '../components/ui/Spinner';
import { useI18n } from '../i18n/I18nProvider';

const pub = () => import('../pages/commerce/PublicCommerce');
const PlansPage = lazy(() => pub().then((m) => ({ default: m.PlansPage })));
const BundlesPage = lazy(() => pub().then((m) => ({ default: m.BundlesPage })));
const BundleDetailPage = lazy(() => pub().then((m) => ({ default: m.BundleDetailPage })));
const GiftRedeemPage = lazy(() => pub().then((m) => ({ default: m.GiftRedeemPage })));
const checkout = () => import('../pages/commerce/CheckoutPage');
const PackageCheckoutPage = lazy(() =>
  checkout().then((m) => ({ default: m.PackageCheckoutPage })),
);
const BundleCheckoutPage = lazy(() => checkout().then((m) => ({ default: m.BundleCheckoutPage })));
const OrdersPage = lazy(() =>
  import('../pages/commerce/MeCommerce').then((m) => ({ default: m.OrdersPage })),
);
const studio = () => import('../pages/commerce/StudioCommerce');
const StudioCommercePage = lazy(() => studio().then((m) => ({ default: m.StudioCommercePage })));
const StudioPayoutsPage = lazy(() => studio().then((m) => ({ default: m.StudioPayoutsPage })));
const StaffCommercePage = lazy(() =>
  import('../pages/commerce/StaffCommerce').then((m) => ({ default: m.StaffCommercePage })),
);
const FinanceConsolePage = lazy(() =>
  import('../pages/commerce/FinanceConsole').then((m) => ({ default: m.FinanceConsolePage })),
);

function L({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <Suspense fallback={<Spinner label={t('common.loading')} block />}>{children}</Suspense>;
}

const signedIn = (el: ReactNode) => (
  <RequireRole>
    <L>{el}</L>
  </RequireRole>
);

/** Public and buyer routes (children of the main layout). */
export const commerceRoutes = [
  <Route
    key="c-plans"
    path="plans"
    element={
      <L>
        <PlansPage />
      </L>
    }
  />,
  <Route
    key="c-bundles"
    path="bundles"
    element={
      <L>
        <BundlesPage />
      </L>
    }
  />,
  <Route
    key="c-bundle"
    path="bundles/:id"
    element={
      <L>
        <BundleDetailPage />
      </L>
    }
  />,
  <Route key="c-gift" path="gift/redeem" element={signedIn(<GiftRedeemPage />)} />,
  <Route key="c-co-pkg" path="checkout/package/:id" element={signedIn(<PackageCheckoutPage />)} />,
  <Route key="c-co-bun" path="checkout/bundle/:id" element={signedIn(<BundleCheckoutPage />)} />,
  <Route key="c-orders" path="me/orders" element={signedIn(<OrdersPage />)} />,
];

/** Instructor workspace routes (children of /studio). */
export const commerceStudioRoutes = [
  <Route
    key="c-studio"
    path="commerce"
    element={
      <L>
        <StudioCommercePage />
      </L>
    }
  />,
  <Route
    key="c-payouts"
    path="payouts"
    element={
      <L>
        <StudioPayoutsPage />
      </L>
    }
  />,
];

/** Staff and finance consoles (children of /admin). */
export const commerceAdminRoutes = [
  <Route
    key="c-staff"
    path="commerce"
    element={
      <RequireRole roles={['Admin', 'SuperAdmin']}>
        <L>
          <StaffCommercePage />
        </L>
      </RequireRole>
    }
  />,
  <Route
    key="c-finance"
    path="finance"
    element={
      <RequireRole roles={['Finance', 'Admin', 'SuperAdmin']}>
        <L>
          <FinanceConsolePage />
        </L>
      </RequireRole>
    }
  />,
];
