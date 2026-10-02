import '../../styles/finala.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nProvider';

// ---------- re-authentication banner ----------

/** Non-blocking: shown when /api/auth/me reports that roles or MFA changed since sign-in. */
export function ReauthBanner() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);
  if (!user?.requiresReauth || dismissed) return null;
  return (
    <div className="container" style={{ paddingBlockStart: 'var(--space-3)' }}>
      <div className="notice notice--warning finala-reauth" role="status">
        <strong className="notice__title">{t('finala.reauth.title')}</strong>
        <div className="row row--between" style={{ flexWrap: 'wrap' }}>
          <span>{t('finala.reauth.body')}</span>
          <span className="row">
            <Button
              size="sm"
              onClick={() => {
                const next = location.pathname + location.search;
                void logout().then(() =>
                  navigate(`/login?next=${encodeURIComponent(next)}&reason=reauth`),
                );
              }}
            >
              {t('finala.reauth.button')}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setDismissed(true)}>
              {t('finala.reauth.later')}
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
