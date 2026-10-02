import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../../api/client';
import { calendarApi, msgKeys } from '../../api/finala';
import type { CalendarTokenDto, ModerationNoticeDto } from '../../api/finala';
import { useApiMutation } from '../../api/hooks';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/Dialog';
import { Field, Input } from '../../components/ui/Field';
import { Notice, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { AppealButton } from '../workspace/Trust';
import { FinalaError } from './shared';

// ---------- hidden discussion thread (author view) ----------

export function HiddenThreadNotice({ moderation }: { moderation?: ModerationNoticeDto | null }) {
  const { t, fmtDate } = useI18n();
  if (!moderation?.hidden) return null;
  const target =
    moderation.appealTargetType === 'DiscussionReply' ? 'DiscussionReply' : 'Discussion';
  return (
    <Notice tone="warning" title={t('finala.hiddenPost.title')}>
      <p style={{ marginBlockStart: 0 }} data-testid="hidden-reason">
        {t('finala.hiddenPost.reason', {
          reason: moderation.reason || t('finala.hiddenPost.noReason'),
        })}
        {moderation.hiddenAt ? ` (${fmtDate(moderation.hiddenAt)})` : ''}
      </p>
      <p className="small">{t('finala.hiddenPost.onlyYou')}</p>
      <div className="row">
        <AppealButton targetType={target} targetId={moderation.appealTargetId} />
        <Link
          className="btn btn--ghost btn--sm"
          to={moderation.appealsPage?.startsWith('/') ? moderation.appealsPage : '/account/appeals'}
        >
          {t('finala.hiddenPost.myAppeals')}
        </Link>
      </div>
    </Notice>
  );
}

// ---------- calendar subscription ----------

function absoluteFeedUrl(path: string): string {
  const raw = apiUrl(path);
  try {
    return new URL(raw, window.location.origin).href;
  } catch {
    return raw;
  }
}

export function CalendarSubscription() {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [fresh, setFresh] = useState<CalendarTokenDto | null>(null);
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const status = useQuery({ queryKey: msgKeys.calendarToken, queryFn: calendarApi.status });
  const create = useApiMutation(
    () => calendarApi.create(),
    [msgKeys.calendarToken],
    (r) => setFresh(r),
  );
  const revoke = useApiMutation(
    () => calendarApi.revoke(),
    [msgKeys.calendarToken],
    () => {
      setFresh(null);
      setConfirmRevoke(false);
      toast.success(t('finala.cal.revoked'));
    },
  );
  const url = fresh ? absoluteFeedUrl(fresh.url) : '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('finala.cal.copied'));
    } catch {
      toast.error(t('finala.cal.copyFailed'));
    }
  };
  return (
    <section className="card stack" aria-labelledby="cal-h">
      <h2 id="cal-h">{t('finala.cal.title')}</h2>
      <p className="small muted">{t('finala.cal.help')}</p>
      <QueryState query={status}>
        {(s) => (
          <>
            {s.active ? (
              <p className="small">
                {t('finala.cal.active', { date: fmtDate(s.createdAt) })}
                {s.lastUsedAt
                  ? ` ${t('finala.cal.lastUsed', { date: fmtDate(s.lastUsedAt) })}`
                  : ''}
              </p>
            ) : (
              <p className="small muted">{t('finala.cal.inactive')}</p>
            )}
            {fresh ? (
              <div className="stack">
                <Field label={t('finala.cal.url')} hint={t('finala.cal.urlHint')}>
                  <Input readOnly value={url} onFocus={(e) => e.currentTarget.select()} />
                </Field>
                <div className="row">
                  <Button size="sm" onClick={() => void copy()}>
                    {t('finala.cal.copy')}
                  </Button>
                </div>
              </div>
            ) : null}
            <div className="row">
              <Button
                size="sm"
                variant="secondary"
                loading={create.isPending}
                onClick={() => create.mutate(undefined)}
              >
                {s.active ? t('finala.cal.rotate') : t('finala.cal.create')}
              </Button>
              {s.active ? (
                <Button size="sm" variant="ghost" onClick={() => setConfirmRevoke(true)}>
                  {t('finala.cal.revoke')}
                </Button>
              ) : null}
            </div>
            {s.active && !fresh ? <p className="small muted">{t('finala.cal.shownOnce')}</p> : null}
          </>
        )}
      </QueryState>
      <FinalaError error={create.error} />
      <ConfirmDialog
        open={confirmRevoke}
        danger
        title={t('finala.cal.revokeTitle')}
        body={
          <>
            <p>{t('finala.cal.revokeBody')}</p>
            <FinalaError error={revoke.error} />
          </>
        }
        confirmLabel={t('finala.cal.revoke')}
        loading={revoke.isPending}
        onCancel={() => setConfirmRevoke(false)}
        onConfirm={() => revoke.mutate(undefined)}
      />
    </section>
  );
}
