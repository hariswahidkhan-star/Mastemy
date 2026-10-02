import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Route } from 'react-router';
import { STAFF_ROLES } from '../auth/AuthProvider';
import { RequireRole } from '../auth/RequireRole';
import { Spinner } from '../components/ui/Spinner';
import { useI18n } from '../i18n/I18nProvider';
import {
  AcademyPage,
  ArticlePage,
  ArticlesPage,
  BestsellerRulePage,
  BusinessPage,
  CategoriesIndexPage,
  CertificationDetailPage,
  CertificationsPage,
  CollectionPage,
  InstructorsPage,
  NotesLibraryPage,
  PackagesPage,
  PathwayDetailPage,
  PathwaysPage,
  PracticePage,
} from '../pages/discover/PublicDiscoverPages';

const adminPages = () => import('../pages/discover/AdminDiscoverPages');
const AdminLayout = lazy(() =>
  import('../pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })),
);
const AdminSkillsPage = lazy(() => adminPages().then((m) => ({ default: m.AdminSkillsPage })));
const AdminCertificationsPage = lazy(() =>
  adminPages().then((m) => ({ default: m.AdminCertificationsPage })),
);
const AdminCertificationDetailPage = lazy(() =>
  adminPages().then((m) => ({ default: m.AdminCertificationDetailPage })),
);
const AdminPathwaysPage = lazy(() => adminPages().then((m) => ({ default: m.AdminPathwaysPage })));
const AdminCollectionsPage = lazy(() =>
  adminPages().then((m) => ({ default: m.AdminCollectionsPage })),
);
const AdminBestsellersPage = lazy(() =>
  adminPages().then((m) => ({ default: m.AdminBestsellersPage })),
);
const AdminIdeasPage = lazy(() => adminPages().then((m) => ({ default: m.AdminIdeasPage })));

const STAFF = ['Admin', 'SuperAdmin'] as const;
const REVIEWERS = ['Reviewer', 'Admin', 'SuperAdmin'] as const;

function Lazy({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <Suspense fallback={<Spinner label={t('common.loading')} block />}>{children}</Suspense>;
}

function Guard({ roles, children }: { roles: readonly string[]; children: ReactNode }) {
  return (
    <RequireRole roles={[...roles] as typeof STAFF_ROLES}>
      <Lazy>{children}</Lazy>
    </RequireRole>
  );
}

/**
 * Discovery routes (public directory pages + admin taxonomy screens). Public pages are imported eagerly so
 * the SSR server renders them; admin screens are lazy chunks behind role guards. The admin branch reuses
 * AdminLayout so the side navigation stays the same.
 */
export const discoverRoutes = (
  <>
    <Route path="categories" element={<CategoriesIndexPage />} />
    <Route path="academies/:slug" element={<AcademyPage />} />
    <Route path="certifications" element={<CertificationsPage />} />
    <Route path="certifications/:slug" element={<CertificationDetailPage />} />
    <Route path="pathways" element={<PathwaysPage />} />
    <Route path="pathways/:slug" element={<PathwayDetailPage />} />
    <Route path="collections/:slug" element={<CollectionPage />} />
    <Route path="instructors" element={<InstructorsPage />} />
    <Route path="packages" element={<PackagesPage />} />
    <Route path="practice" element={<PracticePage />} />
    <Route path="notes-library" element={<NotesLibraryPage />} />
    <Route path="business" element={<BusinessPage />} />
    <Route path="bestseller-rule" element={<BestsellerRulePage />} />
    <Route path="articles" element={<ArticlesPage />} />
    <Route path="articles/:slug" element={<ArticlePage />} />
    <Route
      path="admin"
      element={
        <Guard roles={STAFF_ROLES}>
          <AdminLayout />
        </Guard>
      }
    >
      <Route
        path="skills"
        element={
          <Guard roles={STAFF}>
            <AdminSkillsPage />
          </Guard>
        }
      />
      <Route
        path="certifications"
        element={
          <Guard roles={REVIEWERS}>
            <AdminCertificationsPage />
          </Guard>
        }
      />
      <Route
        path="certifications/:id"
        element={
          <Guard roles={REVIEWERS}>
            <AdminCertificationDetailPage />
          </Guard>
        }
      />
      <Route
        path="pathways"
        element={
          <Guard roles={STAFF}>
            <AdminPathwaysPage />
          </Guard>
        }
      />
      <Route
        path="collections"
        element={
          <Guard roles={STAFF}>
            <AdminCollectionsPage />
          </Guard>
        }
      />
      <Route
        path="bestsellers"
        element={
          <Guard roles={STAFF}>
            <AdminBestsellersPage />
          </Guard>
        }
      />
      <Route
        path="course-ideas"
        element={
          <Guard roles={STAFF}>
            <AdminIdeasPage />
          </Guard>
        }
      />
    </Route>
  </>
);
