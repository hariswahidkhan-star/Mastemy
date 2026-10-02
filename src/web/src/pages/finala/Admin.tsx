import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';
import { supportApi } from '../../api/finala';
import type { AiUsageSummaryDto, SupportOrderDto, UserLookupDto } from '../../api/finala';
import { useApiMutation } from '../../api/hooks';
import type { VideoAssetDto } from '../../api/types';
import { useAuth } from '../../auth/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Badge, Notice, PageHeader, QueryState, StatusBadge } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { CredentialKindBadge } from './Credentials';
import { UserPicker } from './Pickers';
import { FinalaError } from './shared';

// ---------- MFA reset (SuperAdmin) ----------

export function MfaResetButton({ user }: { user: { id: string; displayName: string } }) {
  const { t } = useI18n();
  const { hasRole, user: me, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const ok = reason.trim().length >= 10 && reason.trim().length <= 500;
  const reset = useApiMutation(
    () => supportApi.mfaReset(user.id, reason.trim()),
    [['admin', 'users']],
    () => {
      setOpen(false);
      setReason('');
      toast.success(t('finala.mfa.done', { name: user.displayName }));
    },
  );
  if (!hasRole('SuperAdmin') || me?.id === user.id) return null;
  const needsFresh = reset.error instanceof ApiError && reset.error.is('fresh_mfa_required');
  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
        {t('finala.mfa.button')}
      </Button>
      <Dialog
        open={open}
        title={t('finala.mfa.title', { name: user.displayName })}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="danger"
              disabled={!ok}
              loading={reset.isPending}
              onClick={() => reset.mutate(undefined)}
            >
              {t('finala.mfa.confirm')}
            </Button>
          </>
        }
      >
        <p>{t('finala.mfa.explain')}</p>
        <Notice tone="warning">{t('finala.mfa.fresh')}</Notice>
        <Field
          label={t('finala.mfa.reason')}
          hint={t('finala.mfa.reasonHint', { n: reason.trim().length })}
          required
        >
          <Textarea
            rows={3}
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Field>
        {needsFresh ? (
          <Notice tone="danger" title={t('finala.errors.fresh_mfa_required')}>
            <p style={{ marginBlockStart: 0 }}>{t('finala.mfa.reauthBody')}</p>
            <Button
              size="sm"
              onClick={() => {
                void logout().then(() =>
                  navigate(`/login?next=${encodeURIComponent('/admin/users')}&reason=fresh_mfa`),
                );
              }}
            >
              {t('finala.mfa.reauth')}
            </Button>
          </Notice>
        ) : (
          <FinalaError error={reset.error} />
        )}
      </Dialog>
    </>
  );
}

// ---------- video status override ----------

const PIPELINE = ['Draft', 'AwaitingApproval', 'AwaitingSourceFile', 'Uploading'];

export function VideoMarkButton({ video }: { video: VideoAssetDto }) {
  const { t } = useI18n();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'Restricted' | 'Failed'>('Restricted');
  const [reason, setReason] = useState('');
  const ok = reason.trim().length >= 1 && reason.trim().length <= 1000;
  const mark = useApiMutation(
    () =>
      api<VideoAssetDto>(`/api/admin/youtube/videos/${video.id}/mark`, {
        method: 'POST',
        body: { status, reason: reason.trim() },
      }),
    [['admin', 'videos']],
    (v) => {
      setOpen(false);
      setReason('');
      toast.success(t('finala.video.marked', { status: t(`status.${v.status}`) }));
    },
  );
  if (PIPELINE.includes(video.status)) return null;
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setOpen(true)}
        aria-label={t('finala.video.markFor', { title: video.title })}
      >
        {t('finala.video.mark')}
      </Button>
      <Dialog
        open={open}
        title={t('finala.video.title', { title: video.title })}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="danger"
              disabled={!ok}
              loading={mark.isPending}
              onClick={() => mark.mutate(undefined)}
            >
              {t('finala.video.confirm')}
            </Button>
          </>
        }
      >
        <p className="small muted">{t('finala.video.help')}</p>
        <Field label={t('finala.video.status')}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Restricted' | 'Failed')}
            options={[
              { value: 'Restricted', label: t('status.Restricted') },
              { value: 'Failed', label: t('status.Failed') },
            ]}
          />
        </Field>
        <Field label={t('finala.video.reason')} required>
          <Textarea
            rows={3}
            maxLength={1000}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Field>
        <FinalaError error={mark.error} />
      </Dialog>
    </>
  );
}

// ---------- AI usage (admin dashboard) ----------

export function AiUsagePanel({ usage }: { usage: AiUsageSummaryDto | null | undefined }) {
  const { t, fmtNumber } = useI18n();
  if (!usage || typeof usage !== 'object') return null;
  const cost = (n: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(n);
  return (
    <section className="card stack" aria-labelledby="ai-usage-h" data-testid="ai-usage">
      <h2 id="ai-usage-h">{t('finala.ai.title')}</h2>
      <dl className="facts">
        <div>
          <dt>{t('finala.ai.calls')}</dt>
          <dd>{fmtNumber(usage.calls)}</dd>
        </div>
        <div>
          <dt>{t('finala.ai.users')}</dt>
          <dd>{fmtNumber(usage.distinctUsers)}</dd>
        </div>
        <div>
          <dt>{t('finala.ai.input')}</dt>
          <dd>{fmtNumber(usage.inputTokens)}</dd>
        </div>
        <div>
          <dt>{t('finala.ai.output')}</dt>
          <dd>{fmtNumber(usage.outputTokens)}</dd>
        </div>
        <div>
          <dt>{t('finala.ai.cacheRead')}</dt>
          <dd>{fmtNumber(usage.cacheReadTokens)}</dd>
        </div>
        <div>
          <dt>{t('finala.ai.cacheWrite')}</dt>
          <dd>{fmtNumber(usage.cacheWriteTokens)}</dd>
        </div>
        <div>
          <dt>{t('finala.ai.cost')}</dt>
          <dd>{cost(usage.costEstimate)}</dd>
        </div>
      </dl>
      {usage.byFeature.length === 0 ? (
        <p className="small muted">{t('finala.ai.none')}</p>
      ) : (
        <div className="table-wrap">
          <table className="table small">
            <caption>{t('finala.ai.byFeature')}</caption>
            <thead>
              <tr>
                <th scope="col">{t('finala.ai.feature')}</th>
                <th scope="col">{t('finala.ai.calls')}</th>
                <th scope="col">{t('finala.ai.input')}</th>
                <th scope="col">{t('finala.ai.output')}</th>
                <th scope="col">{t('finala.ai.cost')}</th>
              </tr>
            </thead>
            <tbody>
              {usage.byFeature.map((f) => (
                <tr key={f.feature}>
                  <td>{f.feature}</td>
                  <td>{fmtNumber(f.calls)}</td>
                  <td>{fmtNumber(f.inputTokens)}</td>
                  <td>{fmtNumber(f.outputTokens)}</td>
                  <td>{cost(f.costEstimate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="small muted">{t('finala.ai.estimate')}</p>
    </section>
  );
}

// ---------- Support console ----------

function SupportUserDetail({ id }: { id: string }) {
  const { t, fmtDate, fmtMoney } = useI18n();
  const toast = useToast();
  const detail = useQuery({
    queryKey: ['finala', 'support-user', id],
    queryFn: () => supportApi.user(id),
  });
  const resend = useApiMutation(
    () => supportApi.resend(id),
    [],
    () => toast.success(t('finala.support.resent')),
  );
  return (
    <QueryState query={detail}>
      {(u) => (
        <section className="card stack" aria-labelledby="su-h">
          <h2 id="su-h">{u.displayName}</h2>
          <dl className="kv">
            <dt>{t('finala.support.email')}</dt>
            <dd className="mono">{u.maskedEmail}</dd>
            <dt>{t('finala.support.verified')}</dt>
            <dd>{u.emailVerified ? t('finala.support.yes') : t('finala.support.no')}</dd>
            <dt>{t('finala.support.mfa')}</dt>
            <dd>{u.mfaEnabled ? t('finala.support.yes') : t('finala.support.no')}</dd>
            <dt>{t('finala.support.suspended')}</dt>
            <dd>{u.isSuspended ? t('finala.support.yes') : t('finala.support.no')}</dd>
            <dt>{t('finala.support.joined')}</dt>
            <dd>{fmtDate(u.createdAt)}</dd>
          </dl>
          {!u.emailVerified ? (
            <div>
              <Button
                size="sm"
                variant="secondary"
                loading={resend.isPending}
                onClick={() => resend.mutate(undefined)}
              >
                {t('finala.support.resend')}
              </Button>
              <FinalaError error={resend.error} />
            </div>
          ) : null}
          <h3>{t('finala.support.enrollments')}</h3>
          {u.enrollments.length === 0 ? (
            <p className="small muted">{t('finala.support.none')}</p>
          ) : (
            <ul>
              {u.enrollments.map((e) => (
                <li key={e.courseId}>
                  {e.courseTitle} <span className="small muted">{fmtDate(e.enrolledAt)}</span>
                </li>
              ))}
            </ul>
          )}
          <h3>{t('finala.support.orders')}</h3>
          {u.orders.length === 0 ? (
            <p className="small muted">{t('finala.support.none')}</p>
          ) : (
            <ul>
              {u.orders.map((o) => (
                <li key={o.id}>
                  <span className="mono small">{o.id.slice(0, 8)}</span>{' '}
                  <StatusBadge status={o.status} /> {fmtMoney(o.total, o.currency)}{' '}
                  <span className="small muted">{fmtDate(o.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
          <h3>{t('finala.support.credentials')}</h3>
          {u.certificates.length === 0 ? (
            <p className="small muted">{t('finala.support.none')}</p>
          ) : (
            <ul>
              {u.certificates.map((c) => (
                <li key={c.id}>
                  <CredentialKindBadge kind={c.kind} /> {c.courseTitle}{' '}
                  <StatusBadge status={c.status} />{' '}
                  <span className="small muted">{fmtDate(c.issuedAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </QueryState>
  );
}

function SupportOrders() {
  const { t, fmtDate, fmtMoney } = useI18n();
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [params, setParams] = useState<{ email?: string; orderId?: string } | null>(null);
  const guidOk = !orderId.trim() || /^[0-9a-f-]{36}$/i.test(orderId.trim());
  const orders = useQuery({
    queryKey: ['finala', 'support-orders', params],
    queryFn: () => supportApi.orders(params ?? {}),
    enabled: !!params,
  });
  return (
    <section className="card stack" aria-labelledby="so-h">
      <h2 id="so-h">{t('finala.support.orderLookup')}</h2>
      <form
        className="row"
        style={{ alignItems: 'flex-end' }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!guidOk || (!email.trim() && !orderId.trim())) return;
          setParams({ email: email.trim() || undefined, orderId: orderId.trim() || undefined });
        }}
      >
        <Field label={t('finala.support.orderEmail')}>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field
          label={t('finala.support.orderId')}
          error={guidOk ? undefined : t('finala.support.orderIdRule')}
        >
          <Input value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        </Field>
        <Button type="submit" variant="secondary" disabled={!email.trim() && !orderId.trim()}>
          {t('finala.picker.search')}
        </Button>
      </form>
      {params ? (
        <QueryState query={orders}>
          {(list: SupportOrderDto[]) =>
            list.length === 0 ? (
              <p className="small muted">{t('finala.support.noOrders')}</p>
            ) : (
              <div className="table-wrap">
                <table className="table small">
                  <thead>
                    <tr>
                      <th scope="col">{t('finala.support.order')}</th>
                      <th scope="col">{t('finala.support.buyer')}</th>
                      <th scope="col">{t('dashboard.status')}</th>
                      <th scope="col">{t('finala.support.total')}</th>
                      <th scope="col">{t('finala.support.courses')}</th>
                      <th scope="col">{t('finala.support.payments')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((o) => (
                      <tr key={o.id}>
                        <td className="mono">
                          {o.id.slice(0, 8)}
                          <div className="muted">{fmtDate(o.createdAt)}</div>
                        </td>
                        <td className="mono">{o.maskedBuyerEmail}</td>
                        <td>
                          <StatusBadge status={o.status} />
                          {o.refunds.length > 0 ? (
                            <div>
                              {o.refunds.map((r, i) => (
                                <Badge key={i}>
                                  {t('finala.support.refund', {
                                    amount: fmtMoney(r.amount, o.currency),
                                    status: r.status,
                                  })}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                        </td>
                        <td>{fmtMoney(o.total, o.currency)}</td>
                        <td>{o.courseTitles.join(', ')}</td>
                        <td className="mono">
                          {o.maskedPaymentIds.join(', ') || '—'}
                          {o.invoiceNumbers.length ? (
                            <div className="muted">{o.invoiceNumbers.join(', ')}</div>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </QueryState>
      ) : null}
    </section>
  );
}

export function SupportPage() {
  const { t } = useI18n();
  usePageMeta(t('finala.support.title'), undefined, { noindex: true });
  const [picked, setPicked] = useState<UserLookupDto | null>(null);
  return (
    <div className="container page stack">
      <PageHeader title={t('finala.support.title')} subtitle={t('finala.support.subtitle')} />
      <section className="card stack">
        <UserPicker
          label={t('finala.support.findUser')}
          selected={picked}
          onChange={setPicked}
          endpoint="/api/support/users/lookup"
        />
      </section>
      {picked ? (
        <SupportUserDetail key={picked.id} id={picked.id} />
      ) : (
        <EmptyState title={t('finala.support.pickUser')} />
      )}
      <SupportOrders />
    </div>
  );
}
