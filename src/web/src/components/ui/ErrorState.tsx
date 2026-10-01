import { ApiError } from '../../api/client';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { Button } from './Button';

export function errorMessage(error: unknown, t: TFunction): string {
  if (error instanceof ApiError) {
    if (error.status === 0) return t('errors.network');
    if (error.status === 401) return t('errors.unauthorized');
    if (error.status === 403) return t('errors.forbidden');
    if (error.status === 404) return t('errors.notFound');
    if (error.status === 429) return t('errors.rateLimited');
    if (error.status >= 500 && !error.problem) return t('errors.server');
    return error.problem?.detail ?? error.message;
  }
  if (error instanceof TypeError) return t('errors.network');
  return t('errors.generic');
}

export function ErrorState({
  error,
  onRetry,
  title,
}: {
  error: unknown;
  onRetry?: () => void;
  title?: string;
}) {
  const { t } = useI18n();
  return (
    <div className="error-state" role="alert">
      <h2 className="error-state__title">{title ?? t('errors.title')}</h2>
      <p>{errorMessage(error, t)}</p>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      ) : null}
    </div>
  );
}
