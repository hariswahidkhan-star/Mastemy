import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Route } from 'react-router';
import { STAFF_ROLES } from '../auth/AuthProvider';
import { RequireRole } from '../auth/RequireRole';
import { Spinner } from '../components/ui/Spinner';
import { useI18n } from '../i18n/I18nProvider';
import { lazyNamed } from '../lib/lazyNamed';

const pub = () => import('../pages/discover/PublicDiscoverPages');
const AcademyPage = lazyNamed(pub, 'AcademyPage');
const ArticlePage = lazyNamed(pub, 'ArticlePage');
const ArticlesPage = lazyNamed(pub, 'ArticlesPage');
const BestsellerRulePage = lazyNamed(pub, 'BestsellerRulePage');
const BusinessPage = lazyNamed(pub, 'BusinessPage');
const CategoriesIndexPage = lazyNamed(pub, 'CategoriesIndexPage');
const CertificationDetailPage = lazyNamed(pub, 'CertificationDetailPage');
const CertificationsPage = lazyNamed(pub, 'CertificationsPage');
const CollectionPage = lazyNamed(pub, 'CollectionPage');
const InstructorsPage = lazyNamed(pub, 'InstructorsPage');
const NotesLibraryPage = lazyNamed(pub, 'NotesLibraryPage');
const PackagesPage = lazyNamed(pub, 'PackagesPage');
const PathwayDetailPage = lazyNamed(pub, 'PathwayDetailPage');
const PathwaysPage = lazyNamed(pub, 'PathwaysPage');

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
    <Route
      path="categories"
      element={
        <Lazy>
          <CategoriesIndexPage />
        </Lazy>
      }
    />
    <Route
      path="academies/:slug"
      element={
        <Lazy>
          <AcademyPage />
        </Lazy>
      }
    />
    <Route
      path="certifications"
      element={
        <Lazy>
          <CertificationsPage />
        </Lazy>
      }
    />
    <Route
      path="certifications/:slug"
      element={
        <Lazy>
          <CertificationDetailPage />
        </Lazy>
      }
    />
    <Route
      path="pathways"
      element={
        <Lazy>
          <PathwaysPage />
        </Lazy>
      }
    />
    <Route
      path="pathways/:slug"
      element={
        <Lazy>
          <PathwayDetailPage />
        </Lazy>
      }
    />
    <Route
      path="collections/:slug"
      element={
        <Lazy>
          <CollectionPage />
        </Lazy>
      }
    />
    <Route
      path="instructors"
      element={
        <Lazy>
          <InstructorsPage />
        </Lazy>
      }
    />
    <Route
      path="packages"
      element={
        <Lazy>
          <PackagesPage />
        </Lazy>
      }
    />
    {/* /practice is served by examsRoutes (hub when signed in, this public page otherwise). */}
    <Route
      path="notes-library"
      element={
        <Lazy>
          <NotesLibraryPage />
        </Lazy>
      }
    />
    <Route
      path="business"
      element={
        <Lazy>
          <BusinessPage />
        </Lazy>
      }
    />
    <Route
      path="bestseller-rule"
      element={
        <Lazy>
          <BestsellerRulePage />
        </Lazy>
      }
    />
    <Route
      path="articles"
      element={
        <Lazy>
          <ArticlesPage />
        </Lazy>
      }
    />
    <Route
      path="articles/:slug"
      element={
        <Lazy>
          <ArticlePage />
        </Lazy>
      }
    />
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
