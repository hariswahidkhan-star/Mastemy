import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, qs } from '../../api/client';
import type {
  AffiliateDto,
  DisputeDto,
  InvoiceDto,
  PayoutBatchDto,
  PayoutProfileDto,
  PayoutRequestDto,
  ReconciliationDto,
  RefundDto,
  TaxRateDto,
} from '../../api/commerce';
import { useApiMutation } from '../../api/hooks';
import { Button } from '../../components/ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '../../components/ui/Field';
import { Notice, PageHeader, QueryState } from '../../components/ui/misc';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';
import { useI18n } from '../../i18n/I18nProvider';
import { usePageMeta } from '../../lib/seo';
import { InvoicesTable } from './MeCommerce';
import { commerceError, CStatus } from './shared';
import { PayoutRequestTable, StatementDownload } from './StudioCommerce';

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Validates a partial/full refund amount entered by Finance (the server re-checks against the remaining amount). */
export function refundAmountError(raw: string, t: (k: string) => string): string | null {
  const n = Number(raw);
  if (raw.trim() === '' || !Number.isFinite(n) || n <= 0)
    return t('commerce.finance.amountPositive');
  if (!/^\d+(\.\d{1,2})?$/.test(raw.trim())) return t('commerce.finance.amountDecimals');
  return null;
}

function RefundForm({ orderId, onDone }: { orderId: string; onDone?: () => void }) {
  const { t, fmtMoney } = useI18n();
  const toast = useToast();
  const [order, setOrder] = useState(orderId);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [revoke, setRevoke] = useState(false);
  const [local, setLocal] = useState<string | null>(null);
  const refund = useApiMutation(
    () =>
      api<RefundDto>(`/api/admin/orders/${order.trim()}/refunds`, {
        method: 'POST',
        body: { amount: Number(amount), reason: reason.trim(), revokeEntitlements: revoke },
      }),
    [
      ['finance', 'invoices'],
      ['admin', 'refunds'],
    ],
    (r) => {
      toast.success(t('commerce.finance.refunded', { amount: fmtMoney(r.amount, r.currency) }));
      setAmount('');
      setReason('');
      onDone?.();
    },
  );
  return (
    <form
      className="card"
      aria-labelledby="refund-h"
      onSubmit={(e) => {
        e.preventDefault();
        const err = !GUID.test(order.trim())
          ? t('commerce.finance.orderIdInvalid')
          : refundAmountError(amount, t);
        setLocal(err);
        if (!err) refund.mutate(undefined);
      }}
    >
      <h3 id="refund-h">{t('commerce.finance.refundOrder')}</h3>
      <p className="small muted">{t('commerce.finance.refundExplain')}</p>
      <div className="grid-2">
        <Field label={t('commerce.finance.orderId')} required>
          <Input
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="mono"
            required
          />
        </Field>
        <Field label={t('commerce.finance.refundAmount')} required>
          <Input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Field>
      </div>
      <Field label={t('orders.reason')} required>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          maxLength={500}
        />
      </Field>
      <Checkbox
        label={t('commerce.finance.revoke')}
        hint={t('commerce.finance.revokeHint')}
        checked={revoke}
        onChange={(e) => setRevoke(e.target.checked)}
      />
      {local ? <Notice tone="warning">{local}</Notice> : null}
      {refund.isError ? <Notice tone="danger">{commerceError(refund.error, t)}</Notice> : null}
      <div className="form-actions">
        <Button type="submit" loading={refund.isPending}>
          {t('commerce.finance.issueRefund')}
        </Button>
      </div>
    </form>
  );
}

function RefundsTab() {
  const { t, fmtMoney, fmtDate } = useI18n();
  const [prefill, setPrefill] = useState('');
  const [formKey, setFormKey] = useState(0);
  const refunds = useQuery({
    queryKey: ['admin', 'refunds', 'all'],
    queryFn: () => api<RefundDto[]>('/api/admin/refunds'),
  });
  return (
    <div className="stack">
      <RefundForm key={formKey} orderId={prefill} />
      <section className="card" aria-labelledby="refund-list-h">
        <h3 id="refund-list-h">{t('commerce.finance.recentRefunds')}</h3>
        <QueryState query={refunds}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('commerce.finance.noRefunds')}</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('dashboard.date')}</th>
                      <th scope="col">{t('commerce.finance.orderId')}</th>
                      <th scope="col">{t('commerce.payouts.amount')}</th>
                      <th scope="col">{t('orders.reason')}</th>
                      <th scope="col">{t('dashboard.status')}</th>
                      <th scope="col">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((r) => (
                      <tr key={r.id}>
                        <td>{fmtDate(r.createdAt)}</td>
                        <td className="mono small">{r.orderId}</td>
                        <td>{fmtMoney(r.amount, r.currency)}</td>
                        <td>{r.reason}</td>
                        <td>
                          <CStatus status={r.status} />
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setPrefill(r.orderId);
                              setFormKey((k) => k + 1);
                            }}
                          >
                            {t('commerce.finance.refundThis')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </QueryState>
        <p className="small muted">{t('commerce.finance.learnerRequestsHint')}</p>
      </section>
    </div>
  );
}

function DisputesTab() {
  const { t, fmtMoney, fmtDate } = useI18n();
  const [status, setStatus] = useState('');
  const disputes = useQuery({
    queryKey: ['finance', 'disputes', status],
    queryFn: () => api<DisputeDto[]>(`/api/admin/disputes${qs({ status })}`),
  });
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.finance.disputesExplain')}</Notice>
      <Field label={t('commerce.finance.filterStatus')}>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: '', label: t('commerce.common.all') },
            { value: 'Open', label: t('commerce.status.Open') },
            { value: 'Won', label: t('commerce.status.Won') },
            { value: 'Lost', label: t('commerce.status.Lost') },
          ]}
        />
      </Field>
      <QueryState query={disputes}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('commerce.finance.noDisputes')}</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('dashboard.date')}</th>
                    <th scope="col">{t('commerce.finance.dispute')}</th>
                    <th scope="col">{t('commerce.finance.orderId')}</th>
                    <th scope="col">{t('commerce.payouts.amount')}</th>
                    <th scope="col">{t('orders.reason')}</th>
                    <th scope="col">{t('dashboard.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((d) => (
                    <tr key={d.id}>
                      <td>{fmtDate(d.createdAt)}</td>
                      <td className="mono small">{d.providerDisputeId}</td>
                      <td className="mono small">{d.orderId}</td>
                      <td>{fmtMoney(d.amount, d.currency)}</td>
                      <td>{d.reason || '—'}</td>
                      <td>
                        <CStatus status={d.status} />
                        {d.closedAt ? (
                          <div className="small muted">{fmtDate(d.closedAt)}</div>
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
    </div>
  );
}

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

function ReconciliationTab() {
  const { t, fmtMoney } = useI18n();
  const today = new Date();
  const [from, setFrom] = useState(isoDay(new Date(today.getTime() - 29 * 86_400_000)));
  const [to, setTo] = useState(isoDay(today));
  const [range, setRange] = useState({ from, to });
  const rec = useQuery({
    queryKey: ['finance', 'reconciliation', range],
    queryFn: () => api<ReconciliationDto>(`/api/admin/reconciliation${qs(range)}`),
  });
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.finance.reconExplain')}</Notice>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          setRange({ from, to });
        }}
      >
        <Field label={t('commerce.finance.from')}>
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </Field>
        <Field label={t('commerce.finance.to')}>
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </Field>
        <Button type="submit" variant="secondary">
          {t('commerce.finance.show')}
        </Button>
      </form>
      <QueryState query={rec}>
        {(r) => (
          <>
            <p>
              {r.mismatchedDays === 0
                ? t('commerce.finance.reconOk')
                : t('commerce.finance.reconMismatch', { n: r.mismatchedDays })}
            </p>
            {r.rows.length === 0 ? (
              <p className="muted">{t('commerce.finance.reconEmpty')}</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('commerce.finance.day')}</th>
                      <th scope="col">{t('commerce.prices.currency')}</th>
                      <th scope="col">{t('commerce.finance.payments')}</th>
                      <th scope="col">{t('commerce.finance.subscriptionPayments')}</th>
                      <th scope="col">{t('commerce.finance.ledgerSales')}</th>
                      <th scope="col">{t('commerce.finance.salesDiff')}</th>
                      <th scope="col">{t('commerce.finance.refunds')}</th>
                      <th scope="col">{t('commerce.finance.reversals')}</th>
                      <th scope="col">{t('commerce.finance.refundDiff')}</th>
                      <th scope="col">{t('commerce.finance.chargebacks')}</th>
                      <th scope="col">{t('dashboard.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.rows.map((row) => (
                      <tr key={row.day + row.currency}>
                        <td>{row.day}</td>
                        <td>{row.currency}</td>
                        <td>{fmtMoney(row.payments, row.currency)}</td>
                        <td>{fmtMoney(row.subscriptionPayments, row.currency)}</td>
                        <td>{fmtMoney(row.ledgerSales, row.currency)}</td>
                        <td>{fmtMoney(row.salesDifference, row.currency)}</td>
                        <td>{fmtMoney(row.refunds, row.currency)}</td>
                        <td>{fmtMoney(row.ledgerRefundReversals, row.currency)}</td>
                        <td>{fmtMoney(row.refundDifference, row.currency)}</td>
                        <td>{fmtMoney(row.chargebacks, row.currency)}</td>
                        <td>
                          <CStatus status={row.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </QueryState>
    </div>
  );
}

function PayoutsTab() {
  const { t, fmtDate, fmtMoney } = useI18n();
  const toast = useToast();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const requests = useQuery({
    queryKey: ['finance', 'payout-requests'],
    queryFn: () => api<PayoutRequestDto[]>('/api/admin/payout-requests'),
  });
  const batches = useQuery({
    queryKey: ['finance', 'payout-batches'],
    queryFn: () => api<PayoutBatchDto[]>('/api/admin/payout-batches'),
  });
  const profiles = useQuery({
    queryKey: ['finance', 'payout-profiles'],
    queryFn: () => api<PayoutProfileDto[]>('/api/admin/payout-profiles'),
  });
  const batch = useApiMutation(
    (ids: string[]) =>
      api<{ payoutBatchId: string }>('/api/admin/payout-requests/batch', {
        method: 'POST',
        body: { requestIds: ids },
      }),
    [
      ['finance', 'payout-requests'],
      ['finance', 'payout-batches'],
    ],
    () => {
      setSelected(new Set());
      toast.success(t('commerce.finance.batchCreated'));
    },
  );
  const reject = useApiMutation(
    (id: string) =>
      api(`/api/admin/payout-requests/${id}/reject`, { method: 'POST', body: { notes: null } }),
    [['finance', 'payout-requests']],
  );
  const approve = useApiMutation(
    (id: string) => api(`/api/admin/payout-batches/${id}/approve`, { method: 'POST' }),
    [['finance', 'payout-batches']],
    () => toast.success(t('commerce.finance.batchApproved')),
  );
  const taxForm = useApiMutation(
    (p: { userId: string; status: string }) =>
      api(`/api/admin/payout-profiles/${p.userId}/tax-form-status`, {
        method: 'PUT',
        body: { status: p.status },
      }),
    [['finance', 'payout-profiles']],
  );
  const err = batch.error ?? reject.error ?? approve.error ?? taxForm.error;
  return (
    <div className="stack">
      {err ? <Notice tone="danger">{commerceError(err, t)}</Notice> : null}
      <section className="card" aria-labelledby="preq-h">
        <h3 id="preq-h">{t('commerce.payouts.requests')}</h3>
        <QueryState query={requests}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('commerce.payouts.noRequests')}</p>
            ) : (
              <PayoutRequestTable
                list={list}
                fmtDate={fmtDate}
                select={{
                  selected,
                  toggle: (id) =>
                    setSelected((s) => {
                      const n = new Set(s);
                      if (n.has(id)) n.delete(id);
                      else n.add(id);
                      return n;
                    }),
                }}
                actions={(r) =>
                  r.status === 'Requested' ? (
                    <Button
                      size="sm"
                      variant="danger"
                      loading={reject.isPending && reject.variables === r.id}
                      onClick={() => reject.mutate(r.id)}
                    >
                      {t('commerce.common.reject')}
                    </Button>
                  ) : null
                }
              />
            )
          }
        </QueryState>
        <div className="form-actions">
          <Button
            disabled={selected.size === 0}
            loading={batch.isPending}
            onClick={() => batch.mutate([...selected])}
          >
            {t('commerce.finance.createBatch', { n: selected.size })}
          </Button>
        </div>
      </section>
      <section className="card" aria-labelledby="batch-h">
        <h3 id="batch-h">{t('commerce.finance.batches')}</h3>
        <p className="small muted">{t('commerce.finance.batchesExplain')}</p>
        <QueryState query={batches}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('commerce.finance.noBatches')}</p>
            ) : (
              <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
                {list.map((b) => (
                  <li key={b.id} className="card card--flat">
                    <div className="row row--between">
                      <span>
                        {fmtDate(b.createdAt)} ·{' '}
                        {b.lines.map((l) => fmtMoney(l.amount, l.currency)).join(', ') || '—'}
                      </span>
                      <CStatus status={b.status} />
                    </div>
                    {b.status === 'Draft' ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        loading={approve.isPending && approve.variables === b.id}
                        onClick={() => approve.mutate(b.id)}
                      >
                        {t('commerce.common.approve')}
                      </Button>
                    ) : null}
                  </li>
                ))}
              </ul>
            )
          }
        </QueryState>
      </section>
      <section className="card" aria-labelledby="pprof-h">
        <h3 id="pprof-h">{t('commerce.finance.profiles')}</h3>
        <QueryState query={profiles}>
          {(list) =>
            list.length === 0 ? (
              <p className="muted">{t('commerce.finance.noProfiles')}</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{t('commerce.payouts.legalName')}</th>
                      <th scope="col">{t('commerce.payouts.country')}</th>
                      <th scope="col">{t('commerce.payouts.destination')}</th>
                      <th scope="col">{t('commerce.payouts.taxForm')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((p) => (
                      <tr key={p.userId}>
                        <td>{p.legalName}</td>
                        <td>{p.country}</td>
                        <td className="mono">{p.destinationMasked}</td>
                        <td>
                          <Select
                            aria-label={t('commerce.finance.taxFormFor', { name: p.legalName })}
                            value={p.taxFormStatus}
                            disabled={taxForm.isPending}
                            onChange={(e) =>
                              taxForm.mutate({ userId: p.userId, status: e.target.value })
                            }
                            options={['NotSubmitted', 'Submitted', 'Verified', 'Rejected'].map(
                              (s) => ({ value: s, label: t(`commerce.status.${s}`) }),
                            )}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </QueryState>
      </section>
      <section className="card" aria-labelledby="ist-h">
        <h3 id="ist-h">{t('commerce.finance.instructorStatement')}</h3>
        <InstructorStatement />
      </section>
    </div>
  );
}

function InstructorStatement() {
  const { t } = useI18n();
  const [id, setId] = useState('');
  return (
    <div className="stack">
      <Field label={t('commerce.finance.instructorId')}>
        <Input value={id} className="mono" onChange={(e) => setId(e.target.value.trim())} />
      </Field>
      {GUID.test(id) ? (
        <StatementDownload path={`/api/admin/instructors/${id}/statements`} />
      ) : (
        <p className="small muted">{t('commerce.finance.instructorIdHint')}</p>
      )}
    </div>
  );
}

function InvoicesTab() {
  const { t } = useI18n();
  const [year, setYear] = useState(String(new Date().getUTCFullYear()));
  const [orderId, setOrderId] = useState('');
  const [filter, setFilter] = useState({ year, orderId: '' });
  const invoices = useQuery({
    queryKey: ['finance', 'invoices', filter],
    queryFn: () => api<InvoiceDto[]>(`/api/admin/invoices${qs(filter)}`),
  });
  return (
    <div className="stack">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          setFilter({ year, orderId: GUID.test(orderId.trim()) ? orderId.trim() : '' });
        }}
      >
        <Field label={t('commerce.payouts.year')}>
          <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </Field>
        <Field label={t('commerce.finance.orderId')} hint={t('commerce.common.optional')}>
          <Input value={orderId} className="mono" onChange={(e) => setOrderId(e.target.value)} />
        </Field>
        <Button type="submit" variant="secondary">
          {t('commerce.finance.show')}
        </Button>
      </form>
      <QueryState query={invoices}>{(list) => <InvoicesTable list={list} admin />}</QueryState>
    </div>
  );
}

function TaxRatesTab() {
  const { t, fmtDate } = useI18n();
  const rates = useQuery({
    queryKey: ['finance', 'tax-rates'],
    queryFn: () => api<TaxRateDto[]>('/api/admin/tax-rates'),
  });
  const [country, setCountry] = useState('');
  const [rate, setRate] = useState('');
  const save = useApiMutation(
    () =>
      api(`/api/admin/tax-rates/${country.trim().toUpperCase()}`, {
        method: 'PUT',
        body: { ratePercent: Number(rate) },
      }),
    [['finance', 'tax-rates']],
    () => {
      setCountry('');
      setRate('');
    },
  );
  const remove = useApiMutation(
    (c: string) => api(`/api/admin/tax-rates/${c}`, { method: 'DELETE' }),
    [['finance', 'tax-rates']],
  );
  return (
    <div className="stack">
      <Notice tone="info">{t('commerce.finance.taxExplain')}</Notice>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate(undefined);
        }}
      >
        <Field label={t('commerce.payouts.country')} required>
          <Input
            value={country}
            maxLength={2}
            onChange={(e) => setCountry(e.target.value.toUpperCase())}
            required
          />
        </Field>
        <Field label={t('commerce.finance.ratePercent')} required>
          <Input
            type="number"
            min="0"
            max="50"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </Field>
        <Button type="submit" variant="secondary" loading={save.isPending}>
          {t('commerce.common.save')}
        </Button>
      </form>
      {save.isError || remove.isError ? (
        <Notice tone="danger">{commerceError(save.error ?? remove.error, t)}</Notice>
      ) : null}
      <QueryState query={rates}>
        {(list) =>
          list.length === 0 ? (
            <p className="muted">{t('commerce.finance.noTaxRates')}</p>
          ) : (
            <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
              {list.map((r) => (
                <li key={r.country} className="row row--between">
                  <span>
                    {r.country} · {r.ratePercent}% · {fmtDate(r.updatedAt)}
                  </span>
                  <Button
                    size="sm"
                    variant="danger"
                    loading={remove.isPending && remove.variables === r.country}
                    onClick={() => remove.mutate(r.country)}
                  >
                    {t('commerce.common.delete')}
                  </Button>
                </li>
              ))}
            </ul>
          )
        }
      </QueryState>
    </div>
  );
}

function AffiliatesTab() {
  const { t } = useI18n();
  const toast = useToast();
  const list = useQuery({
    queryKey: ['finance', 'affiliates'],
    queryFn: () => api<AffiliateDto[]>('/api/admin/affiliates'),
  });
  const [form, setForm] = useState({ name: '', email: '', code: '', percent: '10', days: '30' });
  const create = useApiMutation(
    () =>
      api<AffiliateDto>('/api/admin/affiliates', {
        method: 'POST',
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          code: form.code.trim(),
          commissionPercent: Number(form.percent),
          attributionWindowDays: Number(form.days),
        },
      }),
    [['finance', 'affiliates']],
    () => {
      toast.success(t('commerce.affiliates.created'));
      setForm({ name: '', email: '', code: '', percent: '10', days: '30' });
    },
  );
  const toggle = useApiMutation(
    (p: { id: string; active: boolean }) =>
      api(`/api/admin/affiliates/${p.id}/active`, { method: 'POST', body: { active: p.active } }),
    [['finance', 'affiliates']],
  );
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  return (
    <div className="stack">
      <form
        className="card"
        aria-labelledby="aff-h"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate(undefined);
        }}
      >
        <h3 id="aff-h">{t('commerce.affiliates.new')}</h3>
        <div className="grid-2">
          <Field label={t('commerce.affiliates.name')} required>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Field>
          <Field label={t('commerce.affiliates.email')} required>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Field>
          <Field label={t('commerce.coupons.code')} required>
            <Input
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              required
            />
          </Field>
          <Field
            label={t('commerce.affiliates.percent')}
            required
            hint={t('commerce.affiliates.percentHint')}
          >
            <Input
              type="number"
              min="0.01"
              step="0.01"
              value={form.percent}
              onChange={(e) => setForm({ ...form, percent: e.target.value })}
              required
            />
          </Field>
          <Field label={t('commerce.affiliates.window')} required>
            <Input
              type="number"
              min="1"
              max="90"
              value={form.days}
              onChange={(e) => setForm({ ...form, days: e.target.value })}
              required
            />
          </Field>
        </div>
        {create.isError ? <Notice tone="danger">{commerceError(create.error, t)}</Notice> : null}
        <div className="form-actions">
          <Button type="submit" loading={create.isPending}>
            {t('commerce.affiliates.create')}
          </Button>
        </div>
      </form>
      {toggle.isError ? <Notice tone="danger">{commerceError(toggle.error, t)}</Notice> : null}
      <QueryState query={list}>
        {(items) =>
          items.length === 0 ? (
            <p className="muted">{t('commerce.affiliates.none')}</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t('commerce.affiliates.name')}</th>
                    <th scope="col">{t('commerce.coupons.code')}</th>
                    <th scope="col">{t('commerce.affiliates.percent')}</th>
                    <th scope="col">{t('commerce.affiliates.window')}</th>
                    <th scope="col">{t('commerce.affiliates.link')}</th>
                    <th scope="col">{t('dashboard.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>
                        {a.name}
                        <div className="small muted">{a.email}</div>
                      </td>
                      <td className="mono">{a.code}</td>
                      <td>{a.commissionPercent}%</td>
                      <td>{t('commerce.affiliates.days', { n: a.attributionWindowDays })}</td>
                      <td className="mono small">{`${origin}/?aff=${encodeURIComponent(a.code)}`}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          aria-pressed={a.isActive}
                          loading={toggle.isPending && toggle.variables?.id === a.id}
                          onClick={() => toggle.mutate({ id: a.id, active: !a.isActive })}
                        >
                          {a.isActive
                            ? t('commerce.common.deactivate')
                            : t('commerce.common.activate')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </QueryState>
    </div>
  );
}

export function FinanceConsolePage() {
  const { t } = useI18n();
  const [tab, setTab] = useState('refunds');
  usePageMeta(t('commerce.finance.title'), undefined, { noindex: true });
  return (
    <div className="page">
      <PageHeader title={t('commerce.finance.title')} subtitle={t('commerce.finance.subtitle')} />
      <Tabs
        label={t('commerce.finance.title')}
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'refunds', label: t('commerce.finance.refundsTab'), content: <RefundsTab /> },
          { id: 'disputes', label: t('commerce.finance.disputesTab'), content: <DisputesTab /> },
          { id: 'recon', label: t('commerce.finance.reconTab'), content: <ReconciliationTab /> },
          { id: 'payouts', label: t('commerce.finance.payoutsTab'), content: <PayoutsTab /> },
          { id: 'invoices', label: t('commerce.invoices.title'), content: <InvoicesTab /> },
          { id: 'tax', label: t('commerce.finance.taxTab'), content: <TaxRatesTab /> },
          { id: 'affiliates', label: t('commerce.affiliates.title'), content: <AffiliatesTab /> },
        ]}
      />
    </div>
  );
}
