import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Route } from 'react-router';
import { RequireRole } from '../auth/RequireRole';
import { Spinner } from '../components/ui/Spinner';
import { useI18n } from '../i18n/I18nProvider';
import {
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '../pages/account/EmailPages';
import { InstructorProfilePage } from '../pages/account/InstructorProfilePage';

const profilePages = () => import('../pages/account/ProfilePages');
const ProfilePage = lazy(() => profilePages().then((m) => ({ default: m.ProfilePage })));
const WelcomePage = lazy(() => profilePages().then((m) => ({ default: m.WelcomePage })));
const SkillsPage = lazy(() => profilePages().then((m) => ({ default: m.SkillsPage })));
const PrivacyPage = lazy(() => profilePages().then((m) => ({ default: m.PrivacyPage })));
const SecurityPage = lazy(() =>
  import('../pages/account/SecurityPage').then((m) => ({ default: m.SecurityPage })),
);

function Loading({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <Suspense fallback={<Spinner label={t('common.loading')} block />}>{children}</Suspense>;
}

function Private({ children }: { children: ReactNode }) {
  return (
    <RequireRole>
      <Loading>{children}</Loading>
    </RequireRole>
  );
}

/** Account area routes (identity security + account module), mounted inside the main Layout route. */
export const accountRoutes = [
  <Route key="verify-email" path="verify-email" element={<VerifyEmailPage />} />,
  <Route key="forgot-password" path="forgot-password" element={<ForgotPasswordPage />} />,
  <Route key="reset-password" path="reset-password" element={<ResetPasswordPage />} />,
  <Route key="instructor" path="instructors/:id" element={<InstructorProfilePage />} />,
  <Route
    key="welcome"
    path="welcome"
    element={
      <Private>
        <WelcomePage />
      </Private>
    }
  />,
  <Route
    key="profile"
    path="me/profile"
    element={
      <Private>
        <ProfilePage />
      </Private>
    }
  />,
  <Route
    key="security"
    path="me/security"
    element={
      <Private>
        <SecurityPage />
      </Private>
    }
  />,
  <Route
    key="skills"
    path="me/skills"
    element={
      <Private>
        <SkillsPage />
      </Private>
    }
  />,
  <Route
    key="privacy"
    path="me/privacy"
    element={
      <Private>
        <PrivacyPage />
      </Private>
    }
  />,
];
