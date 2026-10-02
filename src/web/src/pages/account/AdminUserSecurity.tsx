import { api } from '../../api/client';
import { useApiMutation } from '../../api/hooks';
import type { AdminUserDto } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { accountError } from './Mfa';

/** Users & roles: email-verification / MFA state plus staff actions (resend link, mark verified). */
export function AdminUserSecurityCell({ user }: { user: AdminUserDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const resend = useApiMutation(
    () => api(`/api/admin/users/${user.id}/email-verification/resend`, { method: 'POST' }),
    [],
    () => toast.success(t('account.admin.resent')),
  );
  const mark = useApiMutation(
    () =>
      api<AdminUserDto>(`/api/admin/users/${user.id}/email-verification/mark-verified`, {
        method: 'POST',
      }),
    [['admin', 'users']],
    () => toast.success(t('account.admin.marked')),
  );
  const error = resend.error ?? mark.error;
  return (
    <div className="stack" style={{ gap: 'var(--space-1)' }}>
      <span>
        {user.emailVerified ? (
          <Badge tone="success">{t('account.admin.verified')}</Badge>
        ) : (
          <Badge tone="warning">{t('account.admin.unverified')}</Badge>
        )}{' '}
        {user.mfaEnabled ? (
          <Badge tone="success">{t('account.admin.mfaOn')}</Badge>
        ) : (
          <Badge tone="neutral">{t('account.admin.mfaOff')}</Badge>
        )}
      </span>
      {!user.emailVerified ? (
        <span className="row">
          <Button
            size="sm"
            variant="ghost"
            loading={resend.isPending}
            onClick={() => resend.mutate(undefined)}
          >
            {t('account.admin.resend')}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            loading={mark.isPending}
            onClick={() => mark.mutate(undefined)}
          >
            {t('account.admin.markVerified')}
          </Button>
        </span>
      ) : null}
      {error ? (
        <span role="alert" className="small field__error">
          {accountError(error, t)}
        </span>
      ) : null}
    </div>
  );
}
