import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useI18n } from '../../i18n/I18nProvider';
import { Button } from './Button';
import { ErrorState, errorMessage } from './ErrorState';
import { Spinner } from './Spinner';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

const STATUS_TONES: Record<string, BadgeTone> = {
  Ready: 'success',
  Published: 'success',
  Approved: 'success',
  Active: 'success',
  Valid: 'success',
  Completed: 'success',
  Paid: 'success',
  Draft: 'neutral',
  Retired: 'neutral',
  Archived: 'neutral',
  Submitted: 'info',
  InReview: 'info',
  Reviewed: 'info',
  Processing: 'info',
  Uploading: 'info',
  Updating: 'info',
  Proposed: 'info',
  Requested: 'info',
  AwaitingApproval: 'warning',
  AwaitingSourceFile: 'warning',
  InContentReview: 'warning',
  ChangesRequested: 'warning',
  Restricted: 'danger',
  Failed: 'danger',
  Rejected: 'danger',
  Revoked: 'danger',
  Expired: 'danger',
  Cancelled: 'neutral',
};

/** Badge for any server enum status, translated via `status.<Value>`. */
export function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  return <Badge tone={STATUS_TONES[status] ?? 'neutral'}>{t(`status.${status}`)}</Badge>;
}

/** Renders loading / error / content for a react-query result. */
export function QueryState<T>({
  query,
  children,
  loadingLabel,
}: {
  query: UseQueryResult<T>;
  children: (data: T) => ReactNode;
  loadingLabel?: string;
}) {
  const { t } = useI18n();
  if (query.isPending) return <Spinner label={loadingLabel ?? t('common.loading')} block />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} />;
  return <>{children(query.data)}</>;
}

/**
 * Inline status for a secondary query (option lists, filters, side panels) whose data the page can do
 * without for a moment: a small spinner while it loads, a one-line error with a retry button when it
 * fails, nothing otherwise (also nothing while the query is disabled). Renders nothing on the server and
 * in the hydration pass, so a query that failed during SSR cannot cause a hydration mismatch.
 */
export function QueryStatus({
  query,
  label,
}: {
  query: Pick<
    UseQueryResult<unknown>,
    'isPending' | 'isError' | 'error' | 'fetchStatus' | 'refetch'
  >;
  label?: string;
}) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  if (query.isError)
    return (
      <p className="query-status small" role="alert">
        {label ? `${label}: ` : ''}
        {errorMessage(query.error, t)}{' '}
        <Button variant="ghost" size="sm" onClick={() => void query.refetch()}>
          {t('common.retry')}
        </Button>
      </p>
    );
  if (query.isPending && query.fetchStatus !== 'idle')
    return <Spinner label={label ? `${label}: ${t('common.loading')}` : t('common.loading')} />;
  return null;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPage,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPage: (page: number) => void;
}) {
  const { t } = useI18n();
  const pages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  if (pages <= 1) return null;
  return (
    <nav className="pagination" aria-label={t('common.pagination')}>
      <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        {t('common.previous')}
      </Button>
      <span aria-live="polite">{t('common.pageOf', { page, pages })}</span>
      <Button
        variant="secondary"
        size="sm"
        disabled={page >= pages}
        onClick={() => onPage(page + 1)}
      >
        {t('common.next')}
      </Button>
    </nav>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="page-header__actions">{actions}</div> : null}
    </header>
  );
}

export function Notice({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warning' | 'success' | 'danger';
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`notice notice--${tone}`} role={tone === 'danger' ? 'alert' : 'note'}>
      {title ? <strong className="notice__title">{title}</strong> : null}
      <div>{children}</div>
    </div>
  );
}
