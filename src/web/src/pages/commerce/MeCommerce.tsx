import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { api, ApiError, downloadFile } from '../../api/client';
import type { GiftCodeDto, InvoiceDto, OrderDto, SubscriptionDto } from '../../api/commerce';
import {
  commerceKeys,
  problemCode,
  useMyInvoices,
  useMyOrders,
  useMySubscriptions,
} from '../../api/commerce';
import { useApiMutation } from '../../api/hooks';
import { Button, ButtonLink } from '../../components/ui/Button';
import { ConfirmDialog, Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import type { TFunction } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { commerceError, CStatus, StudyServicesNotice } from './shared';

/** Downloads an invoice/credit-note PDF; 503 invoicing_not_configured becomes an explanation, not a failure toast. */
export async function downloadInvoice(
  inv: InvoiceDto,
  admin: boolean,
  t: TFunction,
): Promise<string | null> {
  try {
    await downloadFile(
      `/api/${admin ? 'admin' : 'me'}/invoices/${inv.id}/pdf`,
      `${inv.number}.pdf`,
    );
    return null;
  } catch (e) {
    if (e instanceof ApiError && problemCode(e) === 'invoicing_not_configured')
      return t('commerce.invoices.notConfigured');
    return commerceError(e, t);
  }
}

export function InvoicesTable({ list, admin }: { list: InvoiceDto[]; admin?: boolean }) {
  const { t, fmtDate, fmtMoney } = useI18n();
  const [problem, setProblem] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  if (list.length === 0) return <p className="muted">{t('commerce.invoices.none')}</p>;
  return (
    <>
      {problem ? <Notice tone="warning">{problem}</Notice> : null}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t('commerce.invoices.number')}</th>
              <th scope="col">{t('commerce.invoices.kind')}</th>
              <th scope="col">{t('commerce.invoices.issued')}</th>
              <th scope="col">{t('commerce.invoices.total')}</th>
              <th scope="col">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((inv) => (
              <tr key={inv.id}>
                <td className="mono">{inv.number}</td>
                <td>
                  {inv.kind === 'CreditNote'
                    ? t('commerce.invoices.creditNote')
                    : t('commerce.invoices.invoice')}
                </td>
                <td>{fmtDate(inv.issuedAt)}</td>
                <td>{fmtMoney(inv.total, inv.currency)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="secondary"
                    loading={busy === inv.id}
                    aria-label={t('commerce.invoices.downloadNamed', { number: inv.number })}
                    onClick={() => {
                      setBusy(inv.id);
                      setProblem(null);
                      void downloadInvoice(inv, !!admin, t).then((p) => {
                        setProblem(p);
                        setBusy(null);
                      });
                    }}
                  >
                    {t('commerce.invoices.download')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function GiftCodeButton({ order }: { order: OrderDto }) {
  const { t } = useI18n();
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<GiftCodeDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reveal = async () => {
    setBusy(true);
    setError(null);
    try {
      setResult(await api<GiftCodeDto>(`/api/me/orders/${order.id}/gift-code`));
      setConfirm(false);
    } catch (e) {
      setError(
        e instanceof ApiError && e.status === 404
          ? t('commerce.gift.notAGift')
          : commerceError(e, t),
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setConfirm(true)}>
        {t('commerce.gift.showCode')}
      </Button>
      <ConfirmDialog
        open={confirm}
        title={t('commerce.gift.showCode')}
        body={
          <>
            <p>{t('commerce.gift.showOnce')}</p>
            {error ? <Notice tone="warning">{error}</Notice> : null}
          </>
        }
        confirmLabel={t('commerce.gift.reveal')}
        loading={busy}
        onCancel={() => {
          setConfirm(false);
          setError(null);
        }}
        onConfirm={() => void reveal()}
      />
      <Dialog open={!!result} title={t('commerce.gift.codeTitle')} onClose={() => setResult(null)}>
        {result ? (
          <>
            <p className="mono" style={{ fontSize: '1.25rem' }} data-testid="gift-code">
              {result.code}
            </p>
            <p className="small">{result.notice}</p>
            <p className="small muted">{t('commerce.gift.redeemAt', { path: '/gift/redeem' })}</p>
          </>
        ) : null}
      </Dialog>
    </>
  );
}

function OrdersTable() {
  const { t, fmtDate, fmtMoney } = useI18n();
  const toast = useToast();
  const orders = useMyOrders();
  const [refunding, setRefunding] = useState<{ order: OrderDto; reason: string } | null>(null);
  const request = useApiMutation(
    (p: { id: string; reason: string }) =>
      api(`/api/me/orders/${p.id}/refund-request`, { method: 'POST', body: { reason: p.reason } }),
    [commerceKeys.orders],
    () => {
      setRefunding(null);
      toast.success(t('orders.refundRequested'));
    },
  );
  return (
    <QueryState query={orders}>
      {(list) =>
        list.length === 0 ? (
          <EmptyState
            title={t('orders.none')}
            action={{ label: t('courses.title'), to: '/courses' }}
          />
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">{t('dashboard.date')}</th>
                  <th scope="col">{t('orders.items')}</th>
                  <th scope="col">{t('orders.total')}</th>
                  <th scope="col">{t('dashboard.status')}</th>
                  <th scope="col">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.id} data-order-id={o.id}>
                    <td>{fmtDate(o.paidAt ?? o.createdAt)}</td>
                    <td>
                      {o.items.length === 0
                        ? t('commerce.orders.subscriptionOrder')
                        : o.items.map((i) => (
                            <div key={i.packageId}>
                              {i.packageTitle}{' '}
                              <span className="small muted">· {i.courseTitle}</span>
                            </div>
                          ))}
                    </td>
                    <td>{fmtMoney(o.total, o.currency)}</td>
                    <td>
                      <CStatus status={o.status} />{' '}
                      {o.isGift ? (
                        <span className="small" data-testid="gift-status">
                          {t('finalb.orders.gift')}
                          {o.giftStatus ? (
                            <>
                              {' '}
                              <CStatus status={o.giftStatus} />
                            </>
                          ) : null}{' '}
                        </span>
                      ) : null}
                      {o.refundStatus ? (
                        <span className="small">
                          {t('commerce.orders.refundStatus')} <CStatus status={o.refundStatus} />
                        </span>
                      ) : null}
                    </td>
                    <td>
                      <div className="row">
                        {o.refundEligible ? (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setRefunding({ order: o, reason: '' })}
                          >
                            {t('orders.requestRefund')}
                          </Button>
                        ) : null}
                        {o.isGift &&
                        o.status === 'Paid' &&
                        o.giftStatus === 'Active' &&
                        !o.giftCodeRevealed ? (
                          <GiftCodeButton order={o} />
                        ) : null}
                        {o.isGift && o.giftCodeRevealed ? (
                          <span className="small muted">{t('finalb.orders.codeRevealed')}</span>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ConfirmDialog
              open={!!refunding}
              title={t('orders.requestRefund')}
              body={
                refunding ? (
                  <>
                    <p className="small">{t('commerce.orders.refundRemaining')}</p>
                    <Field
                      label={t('orders.reason')}
                      required
                      hint={t('commerce.orders.reasonHint')}
                    >
                      <Textarea
                        value={refunding.reason}
                        maxLength={500}
                        onChange={(e) => setRefunding({ ...refunding, reason: e.target.value })}
                      />
                    </Field>
                    {request.isError ? (
                      <Notice tone="danger">{commerceError(request.error, t)}</Notice>
                    ) : null}
                  </>
                ) : null
              }
              confirmLabel={t('orders.submitRefund')}
              loading={request.isPending}
              onCancel={() => setRefunding(null)}
              onConfirm={() => {
                if (refunding && refunding.reason.trim().length >= 3)
                  request.mutate({ id: refunding.order.id, reason: refunding.reason.trim() });
              }}
            />
          </div>
        )
      }
    </QueryState>
  );
}

export function OrdersPage() {
  const { t } = useI18n();
  const [params] = useSearchParams();
  const invoices = useMyInvoices();
  usePageMeta(t('commerce.orders.title'), undefined, { noindex: true });
  return (
    <div className="container page">
      <PageHeader
        title={t('commerce.orders.title')}
        actions={
          <ButtonLink to="/gift/redeem" variant="secondary">
            {t('commerce.gift.redeemTitle')}
          </ButtonLink>
        }
      />
      {params.get('paid') ? (
        <Notice tone="success" title={t('commerce.orders.paidTitle')}>
          {t('commerce.orders.paidBody')}
        </Notice>
      ) : null}
      <StudyServicesNotice />
      <div className="stack" style={{ marginBlockStart: 'var(--space-4)' }}>
        <section className="card" aria-labelledby="orders-h">
          <h2 id="orders-h">{t('orders.title')}</h2>
          <OrdersTable />
        </section>
        <section className="card" aria-labelledby="invoices-h">
          <h2 id="invoices-h">{t('commerce.invoices.title')}</h2>
          <QueryState query={invoices}>{(list) => <InvoicesTable list={list} />}</QueryState>
        </section>
      </div>
    </div>
  );
}

function SubscriptionRow({ sub }: { sub: SubscriptionDto }) {
  const { t, fmtDate } = useI18n();
  const toast = useToast();
  const [confirm, setConfirm] = useState(false);
  const change = useApiMutation(
    (cancel: boolean) =>
      api<SubscriptionDto>(`/api/me/subscriptions/${sub.id}/${cancel ? 'cancel' : 'resume'}`, {
        method: 'POST',
      }),
    [commerceKeys.subscriptions],
    (_r, cancel) => {
      setConfirm(false);
      toast.success(cancel ? t('commerce.subs.cancelled') : t('commerce.subs.resumed'));
    },
  );
  const live = sub.status === 'Active' || sub.status === 'PastDue';
  return (
    <li className="card card--flat" data-testid="subscription">
      <div className="row row--between">
        <strong>{sub.planName}</strong>
        <CStatus status={sub.status} />
      </div>
      {sub.status === 'PastDue' && sub.graceUntil ? (
        <Notice tone="warning" title={t('commerce.subs.graceTitle')}>
          {t('commerce.subs.grace', { date: fmtDate(sub.graceUntil) })}
        </Notice>
      ) : null}
      {live && sub.currentPeriodEnd ? (
        <p>
          {sub.cancelAtPeriodEnd
            ? t('commerce.subs.endsOn', { date: fmtDate(sub.currentPeriodEnd) })
            : t('commerce.subs.renewsOn', { date: fmtDate(sub.currentPeriodEnd) })}
        </p>
      ) : null}
      {sub.endedAt ? <p>{t('commerce.subs.endedOn', { date: fmtDate(sub.endedAt) })}</p> : null}
      <p className="small muted">{sub.renewalTerms}</p>
      {change.isError ? <Notice tone="danger">{commerceError(change.error, t)}</Notice> : null}
      {live ? (
        sub.cancelAtPeriodEnd ? (
          <Button
            size="sm"
            variant="secondary"
            loading={change.isPending}
            onClick={() => change.mutate(false)}
          >
            {t('commerce.subs.resume')}
          </Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={() => setConfirm(true)}>
            {t('commerce.subs.cancel')}
          </Button>
        )
      ) : null}
      <ConfirmDialog
        open={confirm}
        danger
        title={t('commerce.subs.cancel')}
        body={
          <p>
            {t('commerce.subs.cancelExplain', {
              date: sub.currentPeriodEnd ? fmtDate(sub.currentPeriodEnd) : '—',
            })}
          </p>
        }
        confirmLabel={t('commerce.subs.confirmCancel')}
        loading={change.isPending}
        onCancel={() => setConfirm(false)}
        onConfirm={() => change.mutate(true)}
      />
    </li>
  );
}

/** Subscription management on /me. */
export function SubscriptionsSection() {
  const { t } = useI18n();
  const subs = useMySubscriptions();
  return (
    <section className="card" aria-labelledby="subs-h">
      <div className="row row--between">
        <h2 id="subs-h">{t('commerce.subs.title')}</h2>
        <Link to="/me/orders">{t('commerce.orders.title')}</Link>
      </div>
      <QueryState query={subs}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">
              {t('commerce.subs.none')} <Link to="/plans">{t('commerce.plans.title')}</Link>
            </p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((s) => (
                <SubscriptionRow key={s.id} sub={s} />
              ))}
            </ul>
          )
        }
      </QueryState>
    </section>
  );
}
