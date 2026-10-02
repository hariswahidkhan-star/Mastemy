import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router';
import { AUTHOR_ROLES, STAFF_ROLES } from './auth/AuthProvider';
import { RequireRole } from './auth/RequireRole';
import { Layout } from './components/layout/Layout';
import { Spinner } from './components/ui/Spinner';
import { useI18n } from './i18n/I18nProvider';
import { lazyNamed } from './lib/lazyNamed';
import { discoverRoutes } from './routes/discoverRoutes';
import { accountRoutes } from './routes/accountRoutes';
import { examsRoutes } from './routes/examsRoutes';
import { workspaceRoutes } from './routes/workspaceRoutes';
import { finalaRoutes } from './routes/finalaRoutes';
import { commerceAdminRoutes, commerceRoutes, commerceStudioRoutes } from './routes/commerceRoutes';
import { finalbAdminRoutes, finalbRoutes } from './routes/finalbRoutes';

const LoginPage = lazyNamed(() => import('./pages/public/AuthPages'), 'LoginPage');
const RegisterPage = lazyNamed(() => import('./pages/public/AuthPages'), 'RegisterPage');
const CourseDetailPage = lazyNamed(
  () => import('./pages/public/CourseDetailPage'),
  'CourseDetailPage',
);
const CategoryPage = lazyNamed(() => import('./pages/public/CoursesPage'), 'CategoryPage');
const CoursesPage = lazyNamed(() => import('./pages/public/CoursesPage'), 'CoursesPage');
const FreeLessonsPage = lazyNamed(
  () => import('./pages/public/FreeLessonsPage'),
  'FreeLessonsPage',
);
const HomePage = lazyNamed(() => import('./pages/public/HomePage'), 'HomePage');
const AboutPage = lazyNamed(() => import('./pages/public/StaticPages'), 'AboutPage');
const ContactPage = lazyNamed(() => import('./pages/public/StaticPages'), 'ContactPage');
const HelpPage = lazyNamed(() => import('./pages/public/StaticPages'), 'HelpPage');
const NotFoundPage = lazyNamed(() => import('./pages/public/StaticPages'), 'NotFoundPage');
const TeachPage = lazyNamed(() => import('./pages/public/TeachPage'), 'TeachPage');
const VerifyPage = lazyNamed(() => import('./pages/public/VerifyPage'), 'VerifyPage');
const ComparePage = lazyNamed(() => import('./pages/public/ComparePage'), 'ComparePage');
const ThreadPage = lazyNamed(() => import('./pages/engagement/Discussions'), 'ThreadPage');
const LearnPage = lazy(() =>
  import('./pages/learn/LearnPage').then((m) => ({ default: m.LearnPage })),
);
const AttemptPage = lazy(() =>
  import('./pages/assessment/AttemptPage').then((m) => ({ default: m.AttemptPage })),
);
const DashboardPage = lazy(() =>
  import('./pages/me/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const MyNotesPage = lazy(() =>
  import('./pages/me/DashboardPage').then((m) => ({ default: m.MyNotesPage })),
);
const StudioLayout = lazy(() =>
  import('./pages/studio/StudioLayout').then((m) => ({ default: m.StudioLayout })),
);
const StudioCoursesPage = lazy(() =>
  import('./pages/studio/StudioCoursesPage').then((m) => ({ default: m.StudioCoursesPage })),
);
const EarningsPage = lazy(() =>
  import('./pages/studio/StudioCoursesPage').then((m) => ({ default: m.EarningsPage })),
);
const CourseWizardPage = lazy(() =>
  import('./pages/studio/CourseWizardPage').then((m) => ({ default: m.CourseWizardPage })),
);
const CourseEditorPage = lazy(() =>
  import('./pages/studio/CourseEditorPage').then((m) => ({ default: m.CourseEditorPage })),
);
const LessonEditorPage = lazy(() =>
  import('./pages/studio/LessonEditorPage').then((m) => ({ default: m.LessonEditorPage })),
);
const AdminLayout = lazy(() =>
  import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })),
);
const AdminIndex = lazy(() =>
  import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminIndex })),
);
const admin = () => import('./pages/admin/AdminPages');
const meW2 = () => import('./pages/me/MeWave2');
const NotificationsPage = lazy(() => meW2().then((m) => ({ default: m.NotificationsPage })));
const NotificationSettingsPage = lazy(() =>
  meW2().then((m) => ({ default: m.NotificationSettingsPage })),
);
const WishlistPage = lazy(() =>
  import('./pages/public/ComparePage').then((m) => ({ default: m.WishlistPage })),
);
const CourseAnnouncementsPage = lazy(() =>
  import('./pages/engagement/LessonExtras').then((m) => ({ default: m.CourseAnnouncementsPage })),
);
const orgs = () => import('./pages/orgs/OrgPages');
const MyOrgsPage = lazy(() => orgs().then((m) => ({ default: m.MyOrgsPage })));
const OrgPage = lazy(() => orgs().then((m) => ({ default: m.OrgPage })));
const AdminOrgsPage = lazy(() => orgs().then((m) => ({ default: m.AdminOrgsPage })));
const AcceptInvitationPage = lazy(() => orgs().then((m) => ({ default: m.AcceptInvitationPage })));
const SettingsPage = lazy(() => admin().then((m) => ({ default: m.SettingsPage })));
const UsersPage = lazy(() => admin().then((m) => ({ default: m.UsersPage })));
const ApplicationsPage = lazy(() => admin().then((m) => ({ default: m.ApplicationsPage })));
const PackagesApprovalPage = lazy(() => admin().then((m) => ({ default: m.PackagesApprovalPage })));
const RefundsPage = lazy(() => admin().then((m) => ({ default: m.RefundsPage })));
const VideosPage = lazy(() => admin().then((m) => ({ default: m.VideosPage })));
const AuditPage = lazy(() => admin().then((m) => ({ default: m.AuditPage })));

/** Notification links for reported issues land on the course editor's engagement tab. */
function StudioIssuesRedirect() {
  const { id = '' } = useParams();
  return <Navigate to={`/studio/courses/${id}?tab=engagement`} replace />;
}

function Private({ children }: { children: ReactNode }) {
  return (
    <RequireRole>
      <Lazy>{children}</Lazy>
    </RequireRole>
  );
}

function Lazy({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <Suspense fallback={<Spinner label={t('common.loading')} block />}>{children}</Suspense>;
}

const REVIEWERS = ['Reviewer', 'Admin', 'SuperAdmin'] as const;

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <Lazy>
              <HomePage />
            </Lazy>
          }
        />
        <Route
          path="courses"
          element={
            <Lazy>
              <CoursesPage />
            </Lazy>
          }
        />
        <Route
          path="courses/:slug"
          element={
            <Lazy>
              <CourseDetailPage />
            </Lazy>
          }
        />
        <Route
          path="courses/:slug/discussions/:threadId"
          element={
            <Lazy>
              <ThreadPage />
            </Lazy>
          }
        />
        <Route
          path="courses/:slug/announcements"
          element={
            <Private>
              <CourseAnnouncementsPage />
            </Private>
          }
        />
        <Route
          path="compare"
          element={
            <Lazy>
              <ComparePage />
            </Lazy>
          }
        />
        <Route
          path="me/wishlist"
          element={
            <Private>
              <WishlistPage />
            </Private>
          }
        />
        <Route
          path="me/notifications"
          element={
            <Private>
              <NotificationsPage />
            </Private>
          }
        />
        <Route
          path="me/settings/notifications"
          element={
            <Private>
              <NotificationSettingsPage />
            </Private>
          }
        />
        <Route
          path="orgs"
          element={
            <Private>
              <MyOrgsPage />
            </Private>
          }
        />
        <Route
          path="orgs/:id"
          element={
            <Private>
              <OrgPage />
            </Private>
          }
        />
        <Route
          path="org-invitations/accept"
          element={
            <Private>
              <AcceptInvitationPage />
            </Private>
          }
        />
        <Route
          path="categories/:slug"
          element={
            <Lazy>
              <CategoryPage />
            </Lazy>
          }
        />
        <Route
          path="free-lessons"
          element={
            <Lazy>
              <FreeLessonsPage />
            </Lazy>
          }
        />
        <Route
          path="verify"
          element={
            <Lazy>
              <VerifyPage />
            </Lazy>
          }
        />
        <Route
          path="verify/:code"
          element={
            <Lazy>
              <VerifyPage />
            </Lazy>
          }
        />
        <Route
          path="teach"
          element={
            <Lazy>
              <TeachPage />
            </Lazy>
          }
        />
        <Route
          path="login"
          element={
            <Lazy>
              <LoginPage />
            </Lazy>
          }
        />
        <Route
          path="register"
          element={
            <Lazy>
              <RegisterPage />
            </Lazy>
          }
        />
        <Route
          path="help"
          element={
            <Lazy>
              <HelpPage />
            </Lazy>
          }
        />
        <Route
          path="about"
          element={
            <Lazy>
              <AboutPage />
            </Lazy>
          }
        />
        <Route
          path="contact"
          element={
            <Lazy>
              <ContactPage />
            </Lazy>
          }
        />
        {/* Video lessons are never gated: no RequireRole on /learn. */}
        <Route
          path="learn/:slug"
          element={
            <Lazy>
              <LearnPage />
            </Lazy>
          }
        />
        <Route
          path="learn/:slug/:lessonId"
          element={
            <Lazy>
              <LearnPage />
            </Lazy>
          }
        />
        <Route
          path="attempts/:id"
          element={
            <RequireRole>
              <Lazy>
                <AttemptPage />
              </Lazy>
            </RequireRole>
          }
        />
        <Route
          path="me"
          element={
            <RequireRole>
              <Lazy>
                <DashboardPage />
              </Lazy>
            </RequireRole>
          }
        />
        <Route
          path="me/notes"
          element={
            <RequireRole>
              <Lazy>
                <MyNotesPage />
              </Lazy>
            </RequireRole>
          }
        />
        <Route
          path="studio"
          element={
            <RequireRole roles={AUTHOR_ROLES}>
              <Lazy>
                <StudioLayout />
              </Lazy>
            </RequireRole>
          }
        >
          <Route
            index
            element={
              <Lazy>
                <StudioCoursesPage />
              </Lazy>
            }
          />
          <Route
            path="new"
            element={
              <Lazy>
                <CourseWizardPage />
              </Lazy>
            }
          />
          <Route
            path="earnings"
            element={
              <Lazy>
                <EarningsPage />
              </Lazy>
            }
          />
          <Route
            path="courses/:id"
            element={
              <Lazy>
                <CourseEditorPage />
              </Lazy>
            }
          />
          <Route path="courses/:id/issues" element={<StudioIssuesRedirect />} />
          {commerceStudioRoutes}
          <Route
            path="courses/:id/lessons/:lessonId"
            element={
              <Lazy>
                <LessonEditorPage />
              </Lazy>
            }
          />
        </Route>
        <Route
          path="admin"
          element={
            <RequireRole roles={STAFF_ROLES}>
              <Lazy>
                <AdminLayout />
              </Lazy>
            </RequireRole>
          }
        >
          <Route
            index
            element={
              <Lazy>
                <AdminIndex />
              </Lazy>
            }
          />
          <Route
            path="applications"
            element={
              <RequireRole roles={[...REVIEWERS]}>
                <Lazy>
                  <ApplicationsPage />
                </Lazy>
              </RequireRole>
            }
          />
          <Route
            path="videos"
            element={
              <RequireRole roles={[...REVIEWERS]}>
                <Lazy>
                  <VideosPage />
                </Lazy>
              </RequireRole>
            }
          />
          <Route
            path="packages"
            element={
              <RequireRole roles={['Admin', 'SuperAdmin', 'Finance']}>
                <Lazy>
                  <PackagesApprovalPage />
                </Lazy>
              </RequireRole>
            }
          />
          <Route
            path="refunds"
            element={
              <RequireRole roles={['Finance', 'Admin', 'SuperAdmin']}>
                <Lazy>
                  <RefundsPage />
                </Lazy>
              </RequireRole>
            }
          />
          <Route
            path="users"
            element={
              <RequireRole roles={['Support', 'Admin', 'SuperAdmin']}>
                <Lazy>
                  <UsersPage />
                </Lazy>
              </RequireRole>
            }
          />
          <Route
            path="orgs"
            element={
              <RequireRole roles={['Admin', 'SuperAdmin']}>
                <Lazy>
                  <AdminOrgsPage />
                </Lazy>
              </RequireRole>
            }
          />
          <Route
            path="settings"
            element={
              <RequireRole roles={['Admin', 'SuperAdmin']}>
                <Lazy>
                  <SettingsPage />
                </Lazy>
              </RequireRole>
            }
          />
          {commerceAdminRoutes}
          {finalbAdminRoutes}
          <Route
            path="audit"
            element={
              <RequireRole roles={['Finance', 'Admin', 'SuperAdmin']}>
                <Lazy>
                  <AuditPage />
                </Lazy>
              </RequireRole>
            }
          />
        </Route>
        {discoverRoutes}
        {accountRoutes}
        {examsRoutes}
        {workspaceRoutes}
        {commerceRoutes}
        {finalaRoutes}
        {finalbRoutes}
        <Route
          path="*"
          element={
            <Lazy>
              <NotFoundPage />
            </Lazy>
          }
        />
      </Route>
    </Routes>
  );
}
