import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Route } from 'react-router';
import { AUTHOR_ROLES } from '../auth/AuthProvider';
import { RequireRole } from '../auth/RequireRole';
import type { Role } from '../api/types';
import { Spinner } from '../components/ui/Spinner';
import { useI18n } from '../i18n/I18nProvider';

const practice = () => import('../pages/exams/PracticePages');
const staff = () => import('../pages/exams/StaffExamsPages');
const PracticeHubPage = lazy(() => practice().then((m) => ({ default: m.PracticeHubPage })));
const PracticeBuilderPage = lazy(() =>
  practice().then((m) => ({ default: m.PracticeBuilderPage })),
);
const PracticeSessionPage = lazy(() =>
  practice().then((m) => ({ default: m.PracticeSessionPage })),
);
const ReviewDuePage = lazy(() => practice().then((m) => ({ default: m.ReviewDuePage })));
const StudioExamsPage = lazy(() =>
  import('../pages/exams/StudioExamsPage').then((m) => ({ default: m.StudioExamsPage })),
);
const StaffExamsLayout = lazy(() => staff().then((m) => ({ default: m.StaffExamsLayout })));
const StaffExamsIndex = lazy(() => staff().then((m) => ({ default: m.StaffExamsIndex })));
const ChallengesQueuePage = lazy(() => staff().then((m) => ({ default: m.ChallengesQueuePage })));
const RegradesPage = lazy(() => staff().then((m) => ({ default: m.RegradesPage })));
const CertificateFlagsPage = lazy(() => staff().then((m) => ({ default: m.CertificateFlagsPage })));
const AccommodationsPage = lazy(() => staff().then((m) => ({ default: m.AccommodationsPage })));
const TemplatesPage = lazy(() => staff().then((m) => ({ default: m.TemplatesPage })));
const CorrectionsQueuePage = lazy(() => staff().then((m) => ({ default: m.CorrectionsQueuePage })));
const AppealsQueuePage = lazy(() => staff().then((m) => ({ default: m.AppealsQueuePage })));
const ReusableBankPage = lazy(() => staff().then((m) => ({ default: m.ReusableBankPage })));

const REVIEW: Role[] = ['Reviewer', 'Admin', 'SuperAdmin'];
const STAFF: Role[] = ['Admin', 'SuperAdmin'];

function Lazy({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <Suspense fallback={<Spinner label={t('common.loading')} block />}>{children}</Suspense>;
}

function Guard({ roles, children }: { roles?: Role[]; children: ReactNode }) {
  return (
    <RequireRole roles={roles}>
      <Lazy>{children}</Lazy>
    </RequireRole>
  );
}

/** Wave 3 "exams" area routes (practice, spaced review, studio exam tools, staff queues). */
export const examsRoutes = [
  <Route
    key="ex-practice"
    path="practice"
    element={
      <Guard>
        <PracticeHubPage />
      </Guard>
    }
  />,
  <Route
    key="ex-builder"
    path="practice/session/new"
    element={
      <Guard>
        <PracticeBuilderPage />
      </Guard>
    }
  />,
  <Route
    key="ex-session"
    path="practice/sessions/:id"
    element={
      <Guard>
        <PracticeSessionPage />
      </Guard>
    }
  />,
  <Route
    key="ex-review"
    path="review"
    element={
      <Guard>
        <ReviewDuePage />
      </Guard>
    }
  />,
  <Route
    key="ex-studio"
    path="studio/courses/:id/exams"
    element={
      <Guard roles={AUTHOR_ROLES}>
        <div className="container page">
          <StudioExamsPage />
        </div>
      </Guard>
    }
  />,
  <Route
    key="ex-staff"
    path="staff/exams"
    element={
      <Guard roles={REVIEW}>
        <StaffExamsLayout />
      </Guard>
    }
  >
    <Route
      index
      element={
        <Lazy>
          <StaffExamsIndex />
        </Lazy>
      }
    />
    <Route
      path="challenges"
      element={
        <Lazy>
          <ChallengesQueuePage />
        </Lazy>
      }
    />
    <Route
      path="regrades"
      element={
        <Lazy>
          <RegradesPage />
        </Lazy>
      }
    />
    <Route
      path="flags"
      element={
        <Guard roles={STAFF}>
          <CertificateFlagsPage />
        </Guard>
      }
    />
    <Route
      path="accommodations"
      element={
        <Guard roles={STAFF}>
          <AccommodationsPage />
        </Guard>
      }
    />
    <Route
      path="templates"
      element={
        <Guard roles={STAFF}>
          <TemplatesPage />
        </Guard>
      }
    />
    <Route
      path="corrections"
      element={
        <Guard roles={STAFF}>
          <CorrectionsQueuePage />
        </Guard>
      }
    />
    <Route
      path="appeals"
      element={
        <Guard roles={STAFF}>
          <AppealsQueuePage />
        </Guard>
      }
    />
    <Route
      path="reusable"
      element={
        <Guard roles={STAFF}>
          <ReusableBankPage />
        </Guard>
      }
    />
  </Route>,
];
