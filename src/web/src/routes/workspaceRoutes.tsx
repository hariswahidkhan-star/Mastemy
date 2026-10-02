import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Route } from 'react-router';
import { RequireRole } from '../auth/RequireRole';
import { Spinner } from '../components/ui/Spinner';
import { useI18n } from '../i18n/I18nProvider';

const study = () => import('../pages/workspace/Study');
const trust = () => import('../pages/workspace/Trust');
const StudyPlanPage = lazy(() => study().then((m) => ({ default: m.StudyPlanPage })));
const FoldersPage = lazy(() => study().then((m) => ({ default: m.FoldersPage })));
const BookmarksPage = lazy(() => study().then((m) => ({ default: m.BookmarksPage })));
const MyAppealsPage = lazy(() => trust().then((m) => ({ default: m.MyAppealsPage })));
const TrustConsolePage = lazy(() => trust().then((m) => ({ default: m.TrustConsolePage })));
const OperationsPage = lazy(() => trust().then((m) => ({ default: m.OperationsPage })));
const AdminDashboardPage = lazy(() =>
  import('../pages/workspace/Analytics').then((m) => ({ default: m.AdminDashboardPage })),
);
const AdminAiUsagePage = lazy(() =>
  import('../pages/workspace/AiPanels').then((m) => ({ default: m.AdminAiUsagePage })),
);
const AdminLayout = lazy(() =>
  import('../pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })),
);

function Lazy({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <Suspense fallback={<Spinner label={t('common.loading')} block />}>{children}</Suspense>;
}

/** Staff policy on the API is Admin/SuperAdmin. */
const STAFF = ['Admin', 'SuperAdmin'] as const;

function Me({ children }: { children: ReactNode }) {
  return (
    <RequireRole>
      <Lazy>{children}</Lazy>
    </RequireRole>
  );
}

/** Wave 3 workspace routes, spread inside the Layout route in App.tsx. */
export const workspaceRoutes = [
  <Route
    key="ws-plan"
    path="me/study-plan"
    element={
      <Me>
        <StudyPlanPage />
      </Me>
    }
  />,
  <Route
    key="ws-folders"
    path="me/folders"
    element={
      <Me>
        <FoldersPage />
      </Me>
    }
  />,
  <Route
    key="ws-bookmarks"
    path="me/bookmarks"
    element={
      <Me>
        <BookmarksPage />
      </Me>
    }
  />,
  <Route
    key="ws-appeals"
    path="me/appeals"
    element={
      <Me>
        <MyAppealsPage />
      </Me>
    }
  />,
  // Notification links from the API point at /account/appeals.
  <Route
    key="ws-appeals-acc"
    path="account/appeals"
    element={
      <Me>
        <MyAppealsPage />
      </Me>
    }
  />,
  <Route
    key="ws-admin"
    path="admin"
    element={
      <RequireRole roles={[...STAFF]}>
        <Lazy>
          <AdminLayout />
        </Lazy>
      </RequireRole>
    }
  >
    <Route
      path="trust"
      element={
        <Lazy>
          <TrustConsolePage />
        </Lazy>
      }
    />
    <Route
      path="operations"
      element={
        <Lazy>
          <OperationsPage />
        </Lazy>
      }
    />
    <Route
      path="analytics"
      element={
        <Lazy>
          <AdminDashboardPage />
        </Lazy>
      }
    />
    <Route
      path="ai"
      element={
        <Lazy>
          <AdminAiUsagePage />
        </Lazy>
      }
    />
  </Route>,
];
