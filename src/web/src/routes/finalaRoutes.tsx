import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Route } from 'react-router';
import { RequireRole } from '../auth/RequireRole';
import type { Role } from '../api/types';
import { Spinner } from '../components/ui/Spinner';
import { useI18n } from '../i18n/I18nProvider';

const messaging = () => import('../pages/finala/Messaging');
const InboxPage = lazy(() => messaging().then((m) => ({ default: m.InboxPage })));
const ConversationPage = lazy(() => messaging().then((m) => ({ default: m.ConversationPage })));
const ModerationMessagesPage = lazy(() =>
  messaging().then((m) => ({ default: m.ModerationMessagesPage })),
);
const SupportPage = lazy(() =>
  import('../pages/finala/Admin').then((m) => ({ default: m.SupportPage })),
);

function Guard({ roles, children }: { roles?: Role[]; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <RequireRole roles={roles}>
      <Suspense fallback={<Spinner label={t('common.loading')} block />}>{children}</Suspense>
    </RequireRole>
  );
}

const MODERATORS: Role[] = ['Moderator', 'Admin', 'SuperAdmin'];
/** API policy "Support" admits Support, Admin and SuperAdmin. */
const SUPPORT_ROLES: Role[] = ['Support', 'Admin', 'SuperAdmin'];

/** Area "finala" routes (messaging, message moderation, support console), spread inside Layout. */
export const finalaRoutes = [
  <Route
    key="fa-inbox"
    path="messages"
    element={
      <Guard>
        <InboxPage />
      </Guard>
    }
  />,
  <Route
    key="fa-conv"
    path="messages/:id"
    element={
      <Guard>
        <ConversationPage />
      </Guard>
    }
  />,
  <Route
    key="fa-mod"
    path="moderation/messages"
    element={
      <Guard roles={MODERATORS}>
        <ModerationMessagesPage />
      </Guard>
    }
  />,
  <Route
    key="fa-support"
    path="support"
    element={
      <Guard roles={SUPPORT_ROLES}>
        <SupportPage />
      </Guard>
    }
  />,
];
