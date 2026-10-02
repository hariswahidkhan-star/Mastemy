import { useState } from 'react';
import type { FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, downloadFile } from '../../api/client';
import {
  EMPTY_ORDER_FILTERS,
  fbKeys,
  ORDER_STATUSES,
  orderQuery,
  useCommercePolicy,
} from '../../api/finalb';
import type { AdminOrderDetailDto, OrderFilters, OrderPage } from '../../api/finalb';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Input, Select } from '../../components/ui/Field';
import { Notice, PageHeader, Pagination, QueryState } from '../../components/ui/misc';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { commerceError, CStatus } from '../commerce/shared';

/** Read-only commercial limits for instructors (`GET /api/studio/commerce/policy`). */
export function CommercePolicyPanel() {
  const { t, fmtNumber } = useI18n();
  const policy = useCommercePolicy();
  if (policy.isPending) return null;
  if (policy.isError) return <Notice tone="warning">{commerceError(policy.error, t)}</Notice>;
  const p = policy.data;
  const rows: [string, string][] = [
    ['couponMax', `${fmtNumber(p.instructorCouponMaxPercent)}%`],
    ['reservation', t('finalb.policy.minutes', { n: p.couponReservationMinutes })],
    ['promotionMax', `${fmtNumber(p.promotionMaxPercent)}%`],
    ['affiliateMax', `${fmtNumber(p.affiliateMaxPercent)}%`],
    ['refundWindow', t('finalb.policy.days', { n: p.refundWindowDays })],
    ['share', `${fmtNumber(p.instructorSharePercent)}%`],
    ['payoutMin', fmtNumber(p.payoutMinimumAmount)],
    ['scholarshipEmails', fmtNumber(p.maxScholarshipEmails)],
    ['scholarshipDomains', fmtNumber(p.maxScholarshipDomains)],
    ['regionalCountries', fmtNumber(p.maxRegionalCountriesPerPrice)],
  ];
  return (
    <details className="card" data-testid="commerce-policy">
      <summary>
        <strong>{t('finalb.policy.title')}</strong>
      </summary>
      <p className="small muted">{t('finalb.policy.note')}</p>
      <dl className="grid-2">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="small muted">{t(`finalb.policy.${k}`)}</dt>
            <dd style={{ margin: 0 }}>
              <strong>{v}</strong>
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

function OrderDetail({ id, onClose }: { id: string; onClose: () => void }) {
  const { t, fmtMoney, fmtDate } = useI18n();
  const q = useQuery({
    queryKey: fbKeys.order(id),
    queryFn: () => api<AdminOrderDetailDto>(`/api/admin/orders/${id}`),
  });
  const [pdfError, setPdfError] = useState<string | null>(null);
  return (
    <Dialog open wide title={t('finalb.orders.detailTitle')} onClose={onClose}>
      <QueryState query={q}>
        {(d) => {
          const cur = d.order.currency;
          return (
            <div className="stack" data-testid="order-detail">
              <p className="mono small">{d.order.id}</p>
              <dl className="grid-2">
                <div>
                  <dt className="small muted">{t('finalb.orders.buyer')}</dt>
                  <dd>{d.order.buyerEmail}</dd>
                </div>
                <div>
                  <dt className="small muted">{t('dashboard.status')}</dt>
                  <dd>
                    <CStatus status={d.order.status} /> · {d.order.kind}
                  </dd>
                </div>
                <div>
                  <dt className="small muted">{t('finalb.orders.total')}</dt>
                  <dd>
                    {fmtMoney(d.order.total, cur)}{' '}
                    <span className="small muted">
                      ({t('finalb.orders.list')} {fmtMoney(d.listAmount, cur)}
                      {d.order.discountAmount ? ` · −${fmtMoney(d.order.discountAmount, cur)}` : ''}
                      )
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="small muted">{t('finalb.orders.source')}</dt>
                  <dd>
                    {d.priceSource ?? '—'} · {d.country ?? '—'}
                    {d.order.couponCode ? ` · ${d.order.couponCode}` : ''}
                  </dd>
                </div>
              </dl>
              <section>
                <h3>{t('finalb.orders.items')}</h3>
                {d.items.length === 0 ? (
                  <p className="small muted">{t('finalb.orders.none')}</p>
                ) : (
                  <ul>
                    {d.items.map((i) => (
                      <li key={i.id}>
                        {i.courseTitle} · {fmtMoney(i.unitPrice, cur)}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section>
                <h3>{t('finalb.orders.payments')}</h3>
                {d.payments.length === 0 ? (
                  <p className="small muted">{t('finalb.orders.none')}</p>
                ) : (
                  <ul>
                    {d.payments.map((p) => (
                      <li key={p.id}>
                        {p.provider} <span className="mono small">{p.providerPaymentId}</span> ·{' '}
                        {fmtMoney(p.amount, p.currency)} · {fmtDate(p.createdAt)}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section>
                <h3>{t('finalb.orders.refunds')}</h3>
                {d.refunds.length === 0 ? (
                  <p className="small muted">{t('finalb.orders.none')}</p>
                ) : (
                  <ul>
                    {d.refunds.map((r) => (
                      <li key={r.id}>
                        {fmtMoney(r.amount, cur)} · <CStatus status={r.status} /> · {r.reason} ·{' '}
                        {fmtDate(r.createdAt)}
                        {r.providerRefundId ? (
                          <span className="mono small"> · {r.providerRefundId}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section>
                <h3>{t('finalb.orders.invoices')}</h3>
                {d.invoices.length === 0 ? (
                  <p className="small muted">{t('finalb.orders.none')}</p>
                ) : (
                  <ul>
                    {d.invoices.map((i) => (
                      <li key={i.id} className="row">
                        <span>
                          {i.number} · {i.kind} · {fmtMoney(i.total, i.currency)} ·{' '}
                          {fmtDate(i.issuedAt)}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            downloadFile(
                              `/api/admin/invoices/${i.id}/pdf`,
                              `${i.number}.pdf`,
                            ).catch((e: unknown) => setPdfError(commerceError(e, t)))
                          }
                        >
                          {t('finalb.orders.pdf')}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
                {pdfError ? <Notice tone="danger">{pdfError}</Notice> : null}
              </section>
              <section>
                <h3>{t('finalb.orders.ledger')}</h3>
                {d.ledger.length === 0 ? (
                  <p className="small muted">{t('finalb.orders.none')}</p>
                ) : (
                  <div className="table-wrap">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">{t('finalb.orders.kind')}</th>
                          <th scope="col">{t('finalb.orders.gross')}</th>
                          <th scope="col">{t('finalb.orders.instructor')}</th>
                          <th scope="col">{t('finalb.orders.platform')}</th>
                          <th scope="col">{t('finalb.orders.batch')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.ledger.map((l) => (
                          <tr key={l.id}>
                            <td>{l.kind}</td>
                            <td>{fmtMoney(l.grossAmount, l.currency)}</td>
                            <td>{fmtMoney(l.instructorAmount, l.currency)}</td>
                            <td>{fmtMoney(l.platformAmount, l.currency)}</td>
                            <td className="mono small">{l.payoutBatchId ?? '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
              <section>
                <h3>{t('finalb.orders.disputes')}</h3>
                {d.disputes.length === 0 ? (
                  <p className="small muted">{t('finalb.orders.none')}</p>
                ) : (
                  <ul>
                    {d.disputes.map((x) => (
                      <li key={x.id}>
                        {fmtMoney(x.amount, x.currency)} · <CStatus status={x.status} /> ·{' '}
                        {x.reason} · {fmtDate(x.createdAt)}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          );
        }}
      </QueryState>
    </Dialog>
  );
}

/** `/admin/orders`: Finance/Staff order browser with filters and a detail drawer. */
export function OrderBrowserPage() {
  const { t, fmtMoney, fmtDate } = useI18n();
  usePageMeta(t('finalb.orders.title'), undefined, { noindex: true });
  const [draft, setDraft] = useState<OrderFilters>(EMPTY_ORDER_FILTERS);
  const [filters, setFilters] = useState<OrderFilters>(EMPTY_ORDER_FILTERS);
  const [open, setOpen] = useState<string | null>(null);
  const query = orderQuery(filters);
  const list = useQuery({
    queryKey: fbKeys.orders(query),
    queryFn: () => api<OrderPage>(`/api/admin/orders${query}`),
    retry: false,
  });
  const set = (k: keyof OrderFilters) => (e: { target: { value: string } }) =>
    setDraft((d) => ({ ...d, [k]: e.target.value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setFilters({ ...draft, page: 1 });
  };
  return (
    <div className="page">
      <PageHeader title={t('finalb.orders.title')} subtitle={t('finalb.orders.subtitle')} />
      <form className="card" onSubmit={submit} aria-label={t('finalb.orders.filters')}>
        <div className="grid-2">
          <Field label={t('dashboard.status')}>
            <Select
              value={draft.status}
              onChange={set('status')}
              placeholder={t('finalb.orders.any')}
              options={ORDER_STATUSES.map((s) => ({ value: s, label: s }))}
            />
          </Field>
          <Field label={t('finalb.orders.email')}>
            <Input type="email" value={draft.email} onChange={set('email')} />
          </Field>
          <Field label={t('finalb.orders.courseId')} hint={t('finalb.orders.courseIdHint')}>
            <Input value={draft.courseId} onChange={set('courseId')} />
          </Field>
          <Field label={t('commerce.prices.currency')}>
            <Input value={draft.currency} maxLength={3} onChange={set('currency')} />
          </Field>
          <Field label={t('finalb.orders.from')}>
            <Input type="date" value={draft.from} onChange={set('from')} />
          </Field>
          <Field label={t('finalb.orders.to')}>
            <Input type="date" value={draft.to} onChange={set('to')} />
          </Field>
          <Field label={t('finalb.orders.coupon')}>
            <Input value={draft.coupon} onChange={set('coupon')} />
          </Field>
        </div>
        <div className="row">
          <Button type="submit">{t('finalb.orders.search')}</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setDraft(EMPTY_ORDER_FILTERS);
              setFilters(EMPTY_ORDER_FILTERS);
            }}
          >
            {t('finalb.orders.reset')}
          </Button>
        </div>
      </form>
      {list.isError ? (
        <Notice tone="danger">{commerceError(list.error, t)}</Notice>
      ) : (
        <QueryState query={list}>
          {(p) =>
            p.items.length === 0 ? (
              <EmptyState title={t('finalb.orders.empty')} />
            ) : (
              <>
                <p className="small muted">{t('finalb.orders.count', { n: p.total })}</p>
                <div className="table-wrap">
                  <table className="table" data-testid="order-table">
                    <thead>
                      <tr>
                        <th scope="col">{t('finalb.orders.created')}</th>
                        <th scope="col">{t('finalb.orders.buyer')}</th>
                        <th scope="col">{t('dashboard.status')}</th>
                        <th scope="col">{t('finalb.orders.total')}</th>
                        <th scope="col">{t('finalb.orders.coupon')}</th>
                        <th scope="col">{t('common.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.items.map((o) => (
                        <tr key={o.id} data-order-id={o.id}>
                          <td>{fmtDate(o.createdAt)}</td>
                          <td>{o.buyerEmail}</td>
                          <td>
                            <CStatus status={o.status} />
                          </td>
                          <td>
                            {fmtMoney(o.total, o.currency)}
                            {o.refundedAmount ? (
                              <span className="small muted">
                                {' '}
                                · {t('finalb.orders.refunded')}{' '}
                                {fmtMoney(o.refundedAmount, o.currency)}
                              </span>
                            ) : null}
                          </td>
                          <td>{o.couponCode ?? '—'}</td>
                          <td>
                            <Button size="sm" variant="secondary" onClick={() => setOpen(o.id)}>
                              {t('finalb.orders.view')}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  page={p.page}
                  pageSize={p.pageSize}
                  total={p.total}
                  onPage={(page) => setFilters((f) => ({ ...f, page }))}
                />
              </>
            )
          }
        </QueryState>
      )}
      {open ? <OrderDetail id={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}
