import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import type { Role } from '../api/types';
import { useAuth } from './AuthProvider';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { useI18n } from '../i18n/I18nProvider';

/**
 * Client-side route guard. It only improves UX; the server enforces every permission.
 * With no roles given, any signed-in user may pass.
 */
export function RequireRole({ roles, children }: { roles?: Role[]; children: ReactNode }) {
  const { user, initializing, hasRole } = useAuth();
  const { t } = useI18n();
  const location = useLocation();

  if (initializing) return <Spinner label={t('common.loading')} block />;
  if (!user) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }
  if (roles && roles.length > 0 && !hasRole(...roles)) {
    return (
      <EmptyState
        title={t('auth.forbiddenTitle')}
        description={t('auth.forbiddenBody')}
        action={{ label: t('nav.home'), to: '/' }}
      />
    );
  }
  return <>{children}</>;
}
